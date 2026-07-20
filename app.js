// --- Tema Yönetimi (Dark/Light) ---
const themeToggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggleBtn.querySelector('i');

function setTheme(theme) {
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeIcon.classList.remove('bi-moon-stars');
        themeIcon.classList.add('bi-sun');
    } else {
        themeIcon.classList.remove('bi-sun');
        themeIcon.classList.add('bi-moon-stars');
    }
}

// İlk açılışta temayı belirle
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

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
      return `<img src="${href}" alt="${text}" class="img-fluid" title="${title || ''}">`;
  }
};
marked.use({ renderer: customRenderer });

// --- Global Değişkenler ---
let notesData = null;
let allNotesFlat = [];
let currentCategory = 'all';

// --- DOM Elementleri ---
const sidebarList = document.getElementById('category-sidebar-list');
const notesGrid = document.getElementById('notes-grid');
const homeView = document.getElementById('home-view');
const noteView = document.getElementById('note-view');
const contentArea = document.getElementById('note-content-area');
const tocArea = document.getElementById('toc-area');
const catTitle = document.getElementById('currentCategoryTitle');
const catDesc = document.getElementById('currentCategoryDesc');

const searchDesktop = document.getElementById('searchInputDesktop');
const searchMobile = document.getElementById('searchInputMobile');

// --- Başlangıç ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadNotesConfig();
    window.addEventListener('hashchange', handleRouting);
    handleRouting();
    setupSearchListeners();
});

async function loadNotesConfig() {
    try {
        const r = await fetch('notes.json');
        notesData = await r.json();
        
        notesData.categories.forEach(cat => {
            cat.notes.forEach(note => {
                allNotesFlat.push({ ...note, category: cat.name });
            });
        });

        renderSidebar();
    } catch (err) {
        console.error("Veri yüklenemedi:", err);
    }
}

// --- Rota ve View Transition ---
function handleRouting() {
    const hash = decodeURIComponent(window.location.hash);
    
    const changeView = () => {
        if (!hash || hash === '#/') {
            showHome('all');
        } else if (hash.startsWith('#/kategori/')) {
            const catName = hash.substring(11);
            showHome(catName);
        } else if (hash.startsWith('#/not/')) {
            const notePath = hash.substring(6);
            loadNoteByPath(notePath);
        }
    };

    // View Transitions API (Destekliyorsa kullan)
    if (document.startViewTransition) {
        document.startViewTransition(() => changeView());
    } else {
        changeView();
    }
}

function showHome(categoryName) {
    noteView.classList.add('d-none');
    homeView.classList.remove('d-none');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    currentCategory = categoryName;
    updateSidebarActiveState();

    if (categoryName === 'all') {
        catTitle.textContent = "Tüm Notlar";
        catDesc.textContent = "Kütüphanedeki tüm dokümanları inceliyorsunuz.";
        renderGrid(allNotesFlat);
    } else {
        const catObj = notesData.categories.find(c => c.name === categoryName);
        catTitle.textContent = catObj ? catObj.name : categoryName;
        catDesc.textContent = catObj && catObj.description ? catObj.description : "";
        const filtered = allNotesFlat.filter(n => n.category === categoryName);
        renderGrid(filtered);
    }
}

async function loadNoteByPath(path) {
    homeView.classList.add('d-none');
    noteView.classList.remove('d-none');
    window.scrollTo(0,0);

    contentArea.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary"></div></div>';
    tocArea.innerHTML = '';

    // Menüde aktif state'i kaldır
    currentCategory = null;
    updateSidebarActiveState();

    try {
        const r = await fetch(path);
        if(!r.ok) throw new Error('Dosya bulunamadı.');
        const md = await r.text();

        contentArea.innerHTML = marked.parse(md);
        renderMathInElement(contentArea, {
             delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]
        });

        const mermaidContainers = contentArea.querySelectorAll('.mermaid');
        mermaidContainers.forEach(c => mermaid.init(undefined, c));

        generateTOC();
    } catch (err) {
        contentArea.innerHTML = `<div class="alert alert-danger">Hata: ${err.message}</div>`;
    }
}

// --- Render Metotları ---
function renderSidebar() {
    let html = `
      <a href="#/" class="sidebar-link ${currentCategory === 'all' ? 'active' : ''}" data-cat="all">
        <i class="bi bi-grid-fill me-2"></i>Tümü
      </a>
      <hr class="border-secondary opacity-25 my-2">
    `;
    
    notesData.categories.forEach(cat => {
        html += `
          <a href="#/kategori/${encodeURIComponent(cat.name)}" class="sidebar-link" data-cat="${cat.name}">
             ${cat.name}
          </a>
        `;
    });
    sidebarList.innerHTML = html;
}

function updateSidebarActiveState() {
    document.querySelectorAll('.sidebar-link').forEach(link => {
        if (link.dataset.cat === currentCategory) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function renderGrid(notesToRender) {
    if(notesToRender.length === 0) {
        notesGrid.innerHTML = '<div class="col-12 text-muted">Kayıt bulunamadı.</div>';
        return;
    }

    let html = '';
    notesToRender.forEach(note => {
        html += `
        <div class="col-md-6 col-xl-4">
          <a href="#/not/${note.path}" class="text-decoration-none h-100 d-block">
              <div class="note-card p-4 h-100 d-flex flex-column">
                 <span class="card-category-badge">${note.category}</span>
                 <h5 class="card-title mb-3">${note.title}</h5>
                 <div class="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
                    <small class="text-muted fw-medium">İncele</small>
                    <i class="bi bi-arrow-right text-primary fs-5"></i>
                 </div>
              </div>
          </a>
        </div>
        `;
    });
    notesGrid.innerHTML = html;
}

// --- Arama ---
function setupSearchListeners() {
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        
        // Arama yapılıyorsa Home view'e geç (eğer Not okuyorsa)
        if (noteView.classList.contains('d-none') === false) {
            window.location.hash = '#/';
        }

        if (term === '') {
            showHome(currentCategory || 'all');
            return;
        }

        catTitle.textContent = "Arama Sonuçları";
        catDesc.textContent = `"${term}" için bulunan sonuçlar`;
        
        const filtered = allNotesFlat.filter(note => 
            note.title.toLowerCase().includes(term) || 
            note.category.toLowerCase().includes(term)
        );
        renderGrid(filtered);
    };

    searchDesktop.addEventListener('input', handleSearch);
    searchMobile.addEventListener('input', handleSearch);
}

// --- TOC ve ScrollSpy ---
function generateTOC() {
    const headers = contentArea.querySelectorAll('h2, h3');
    let html = '';
    
    if (headers.length === 0) {
        tocArea.innerHTML = '<span class="text-muted small">Başlık bulunamadı.</span>';
        return;
    }

    headers.forEach((header, index) => {
        if (!header.id) header.id = `header-${index}`;
        const isH3 = header.tagName === 'H3';
        const padding = isH3 ? 'ps-4' : 'fw-medium';
        html += `<a href="#${header.id}" class="toc-link ${padding}" data-target="${header.id}" onclick="scrollToHeader(event, '${header.id}')">${header.textContent}</a>`;
    });
    
    tocArea.innerHTML = html;
    setupScrollSpy();
}

window.scrollToHeader = function(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    // Navbar yüksekliğini hesaplayarak kaydır
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({top: y, behavior: 'smooth'});
}

function setupScrollSpy() {
    const headers = contentArea.querySelectorAll('h2, h3');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aktif linki bul ve rengini değiştir
                tocLinks.forEach(link => {
                    if (link.dataset.target === entry.target.id) {
                        link.classList.add('active-toc');
                    } else {
                        link.classList.remove('active-toc');
                    }
                });
            }
        });
    }, { rootMargin: '-100px 0px -70% 0px', threshold: 0 });

    headers.forEach(h => observer.observe(h));
}

// --- Yardımcılar ---
window.copyCode = function(btn) {
    const pre = btn.nextElementSibling;
    const code = pre.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i>';
        btn.classList.add('bg-primary', 'text-white');
        setTimeout(() => { 
            btn.innerHTML = originalText; 
            btn.classList.remove('bg-primary', 'text-white'); 
        }, 2000);
    });
}

window.goBack = function() {
    // Eğer View Transitions destekleniyorsa animasyonlu geri dön
    if (document.startViewTransition) {
        document.startViewTransition(() => { window.location.hash = ''; });
    } else {
        window.location.hash = ''; 
    }
}
