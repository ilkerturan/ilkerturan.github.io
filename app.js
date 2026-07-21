// --- Kütüphane Ayarları ---
try { mermaid.initialize({ startOnLoad: false, theme: 'neutral' }); } catch (e) { console.error(e); }

const customRenderer = {
  code(code, infostring) {
    if (infostring === 'mermaid') return `<div class="mermaid">${code}</div>`;
    const lang = infostring || 'text';
    return `
      <div class="code-wrapper">
        <button class="btn-copy" onclick="copyCode(this)">Kopyala</button>
        <pre><code class="language-${lang}">${code}</code></pre>
      </div>
    `;
  },
  image(href, title, text) {
      return `<img src="${href}" alt="${text}" title="${title || ''}">`;
  }
};
marked.use({ renderer: customRenderer });

// --- Global Değişkenler ---
let notesData = null;
let allNotesFlat = [];
let activeNotePath = null;

// --- DOM Elementleri ---
const sidebarList = document.getElementById('category-sidebar-list');
const homeView = document.getElementById('home-view');
const noteView = document.getElementById('note-view');
const contentArea = document.getElementById('note-content-area');
const tocArea = document.getElementById('toc-area');
const searchInput = document.getElementById('searchInput');

// --- Başlangıç ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadNotesConfig();
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    setupSearch();
});

async function loadNotesConfig() {
    try {
        const r = await fetch('notes.json');
        notesData = await r.json();
        
        notesData.categories.forEach(cat => {
            if (cat.notes) {
                cat.notes.forEach(note => {
                    allNotesFlat.push({ ...note, category: cat.name });
                });
            }
        });

        renderSidebar();
    } catch (err) {
        console.error("Veri yüklenemedi:", err);
    }
}

// --- Rota Yönetimi ---
function handleRouting() {
    const hash = decodeURIComponent(window.location.hash);
    
    if (!hash || hash === '#/') {
        activeNotePath = null;
        showHome();
    } else if (hash.startsWith('#/not/')) {
        activeNotePath = hash.substring(6);
        loadNoteByPath(activeNotePath);
    }
    updateSidebarActiveState();
}

function showHome() {
    noteView.classList.add('d-none');
    homeView.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function loadNoteByPath(path) {
    homeView.classList.add('d-none');
    noteView.classList.remove('d-none');
    window.scrollTo(0,0);

    contentArea.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-secondary"></div></div>';
    tocArea.innerHTML = '';

    try {
        const r = await fetch(path);
        if(!r.ok) throw new Error('Dosya bulunamadı.');
        const md = await r.text();

        contentArea.innerHTML = marked.parse(md);
        
        // KaTeX Matematik Formülleri
        renderMathInElement(contentArea, {
             delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]
        });

        // Mermaid
        const mermaidContainers = contentArea.querySelectorAll('.mermaid');
        mermaidContainers.forEach(c => mermaid.init(undefined, c));

        generateTOC();
    } catch (err) {
        contentArea.innerHTML = `<div class="alert alert-danger border-0 bg-light text-danger">Hata: ${err.message}</div>`;
    }
}

// --- Render Sidebar (Accordion) ---
function renderSidebar() {
    let html = '<div class="accordion accordion-flush" id="sidebarAccordion">';
    
    notesData.categories.forEach((cat, index) => {
        const collapseId = `collapseCat${index}`;
        const headerId = `headingCat${index}`;
        
        let notesHtml = '';
        if (cat.notes) {
            cat.notes.forEach(note => {
                notesHtml += `<a href="#/not/${note.path}" class="note-link" data-path="${note.path}">${note.title}</a>`;
            });
        }

        html += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="${headerId}">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}">
              ${cat.name}
            </button>
          </h2>
          <div id="${collapseId}" class="accordion-collapse collapse" data-bs-parent="#sidebarAccordion">
            <div class="accordion-body">
              ${notesHtml}
            </div>
          </div>
        </div>
        `;
    });
    html += '</div>';
    sidebarList.innerHTML = html;
    
    // Eğer sayfada aktif bir not varsa, o akordiyonu açık tut
    updateSidebarActiveState();
}

function updateSidebarActiveState() {
    if (!activeNotePath) {
        document.querySelectorAll('.note-link').forEach(link => link.classList.remove('active'));
        return;
    }

    document.querySelectorAll('.note-link').forEach(link => {
        if (link.dataset.path === activeNotePath) {
            link.classList.add('active');
            // Parent accordion'ı bul ve aç
            const collapseDiv = link.closest('.accordion-collapse');
            if (collapseDiv && !collapseDiv.classList.contains('show')) {
                // Bootstrap JS nesnesi yoksa düz class ekleyerek açabiliriz veya instance oluşturabiliriz
                const bsCollapse = new bootstrap.Collapse(collapseDiv, { toggle: false });
                bsCollapse.show();
            }
        } else {
            link.classList.remove('active');
        }
    });
}

// --- Arama ---
function setupSearch() {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        
        document.querySelectorAll('.accordion-item').forEach(item => {
            const catName = item.querySelector('.accordion-button').textContent.toLowerCase();
            const noteLinks = item.querySelectorAll('.note-link');
            
            let hasMatchInCat = false;
            
            if (catName.includes(term)) {
                hasMatchInCat = true;
                noteLinks.forEach(l => l.style.display = 'block');
            } else {
                noteLinks.forEach(link => {
                    const noteTitle = link.textContent.toLowerCase();
                    if (noteTitle.includes(term)) {
                        link.style.display = 'block';
                        hasMatchInCat = true;
                    } else {
                        link.style.display = 'none';
                    }
                });
            }
            
            // Sonuç varsa Kategoriyi göster ve Akordiyonu aç
            if (hasMatchInCat) {
                item.style.display = 'block';
                if (term !== '') {
                    const collapseDiv = item.querySelector('.accordion-collapse');
                    collapseDiv.classList.add('show');
                }
            } else {
                item.style.display = 'none';
            }
        });
        
        // Arama boşsa tüm akordiyonları kapat (aktif olan hariç)
        if (term === '') {
            document.querySelectorAll('.note-link').forEach(l => l.style.display = 'block');
            document.querySelectorAll('.accordion-item').forEach(i => i.style.display = 'block');
            updateSidebarActiveState(); // Sadece aktif olan açık kalsın
        }
    });
}

// --- TOC ve ScrollSpy ---
function generateTOC() {
    const headers = contentArea.querySelectorAll('h2, h3');
    let html = '';
    
    if (headers.length === 0) {
        tocArea.innerHTML = '<span class="text-muted small">Bu sayfada başlık yok.</span>';
        return;
    }

    headers.forEach((header, index) => {
        if (!header.id) header.id = `header-${index}`;
        const isH3 = header.tagName === 'H3';
        const padding = isH3 ? 'ps-3' : 'fw-medium';
        html += `<a href="#${header.id}" class="toc-link ${padding}" data-target="${header.id}" onclick="scrollToHeader(event, '${header.id}')">${header.textContent}</a>`;
    });
    
    tocArea.innerHTML = html;
    setupScrollSpy();
}

window.scrollToHeader = function(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    const y = el.getBoundingClientRect().top + window.scrollY - 30; // Biraz pay bırak
    window.scrollTo({top: y, behavior: 'smooth'});
}

function setupScrollSpy() {
    const headers = contentArea.querySelectorAll('h2, h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => {
                    if (link.dataset.target === entry.target.id) {
                        link.classList.add('active-toc');
                    } else {
                        link.classList.remove('active-toc');
                    }
                });
            }
        });
    }, { rootMargin: '-30px 0px -70% 0px', threshold: 0 });

    headers.forEach(h => observer.observe(h));
}

// --- Kopyala Butonu ---
window.copyCode = function(btn) {
    const pre = btn.nextElementSibling;
    const code = pre.innerText;
    navigator.clipboard.writeText(code).then(() => {
        btn.innerText = 'Kopyalandı';
        setTimeout(() => { btn.innerText = 'Kopyala'; }, 2000);
    });
}
