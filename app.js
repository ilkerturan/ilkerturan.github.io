// --- Mermaid Config ---
try {
  mermaid.initialize({ startOnLoad: false, theme: 'default' });
} catch (e) { console.error(e); }

// --- Marked Config (Copy Button Dahil) ---
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

// --- DOM Elementleri ---
const homeView = document.getElementById('home-view');
const noteView = document.getElementById('note-view');
const notesGrid = document.getElementById('notes-grid');
const filterContainer = document.getElementById('category-filters');
const contentArea = document.getElementById('note-content-area');
const tocArea = document.getElementById('toc-area');
const searchInput = document.getElementById('searchInput');

// --- Başlangıç ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadNotesConfig(); // Veriyi çek
    
    // Hash değişimini dinle (Geri/İleri butonları ve Link tıklamaları için)
    window.addEventListener('hashchange', handleRouting);
    
    // Sayfa ilk açıldığında (veya F5 atıldığında) rotayı kontrol et
    handleRouting();
    
    setupEventListeners();
});

// --- Rota Yöneticisi (ROUTER) ---
function handleRouting() {
    const hash = window.location.hash; // örn: #/not/csharp/oop.md

    if (!hash || hash === '#/') {
        // Hash yoksa veya boşsa -> Ana Sayfa
        showHome();
    } else if (hash.startsWith('#/not/')) {
        // Hash bir notu işaret ediyorsa -> Notu Yükle
        // Hash formatı: #/not/{dosya-yolu}
        const notePath = hash.substring(6); // '#/not/' kısmını at
        loadNoteByPath(notePath);
    }
}

async function loadNotesConfig() {
    try {
        const r = await fetch('notes.json');
        notesData = await r.json();
        
        // Düzleştirilmiş liste (Arama ve Routing için)
        notesData.categories.forEach(cat => {
            cat.notes.forEach(note => {
                allNotesFlat.push({ ...note, category: cat.name });
            });
        });

        renderFilters();
        renderGrid(allNotesFlat);
        
    } catch (err) {
        console.error("Veri yüklenemedi:", err);
        notesGrid.innerHTML = '<div class="alert alert-danger">Veriler yüklenemedi.</div>';
    }
}

// --- Görünüm Fonksiyonları ---

// Ana sayfayı göster
function showHome() {
    noteView.classList.add('d-none');
    homeView.classList.remove('d-none');
    
    // Scroll pozisyonunu sıfırlayabiliriz veya kullanıcıyı listeye odaklayabiliriz
    // window.scrollTo(0,0); 
}

// Belirli bir yolu (path) olan notu bul ve aç
async function loadNoteByPath(path) {
    // 1. Notun başlığını bulmak için veride ara
    const note = allNotesFlat.find(n => n.path === path);
    const title = note ? note.title : "Not";

    // 2. Ekranı değiştir
    homeView.classList.add('d-none');
    noteView.classList.remove('d-none');
    window.scrollTo(0,0);

    // 3. Yükleniyor durumu
    contentArea.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-success" role="status"></div><p class="mt-2 text-muted">Not yükleniyor...</p></div>';
    tocArea.innerHTML = '';

    try {
        const r = await fetch(path);
        if(!r.ok) throw new Error('Dosya bulunamadı: ' + path);
        const md = await r.text();

        // Markdown İşleme
        contentArea.innerHTML = marked.parse(md);

        // KaTeX (Matematik)
        renderMathInElement(contentArea, {
             delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}]
        });

        // Mermaid (Diyagram)
        const mermaidContainers = contentArea.querySelectorAll('.mermaid');
        mermaidContainers.forEach(c => mermaid.init(undefined, c));

        // TOC
        generateTOC();

    } catch (err) {
        contentArea.innerHTML = `<div class="alert alert-warning">
            <h4>Hata</h4>
            <p>Bu not yüklenemedi veya dosya yolu hatalı.</p>
            <small>${err.message}</small>
            <br><br>
            <a href="#/" class="btn btn-outline-dark btn-sm">Ana Sayfaya Dön</a>
        </div>`;
    }
}

// --- Render İşlemleri ---

function renderFilters() {
    notesData.categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-sm btn-filter';
        btn.textContent = cat.name;
        btn.dataset.category = cat.name;
        btn.onclick = () => filterByCategory(cat.name, btn);
        filterContainer.appendChild(btn);
    });
    document.querySelector('[data-category="all"]').onclick = (e) => filterByCategory('all', e.target);
}

function renderGrid(notesToRender) {
    if(notesToRender.length === 0) {
        notesGrid.innerHTML = '<div class="text-center text-muted py-5">Aradığınız kriterde not bulunamadı.</div>';
        return;
    }

    let html = '<div class="row g-4">';
    notesToRender.forEach(note => {
        // Tıklama olayında artık fonksiyon çağırmıyoruz, HASH değiştiriyoruz.
        // Router bunu yakalayıp sayfayı açacak.
        html += `
        <div class="col-md-6 col-lg-4">
          <a href="#/not/${note.path}" class="text-decoration-none">
              <div class="note-card h-100 p-4 d-flex flex-column">
                 <span class="card-category-badge">${note.category}</span>
                 <h5 class="card-title mb-3">${note.title}</h5>
                 <div class="mt-auto pt-3 border-top border-light d-flex justify-content-between align-items-center">
                    <small class="text-muted">Okumaya başla</small>
                    <i class="bi bi-arrow-right-circle-fill text-success fs-5" style="opacity:0.6;"></i>
                 </div>
              </div>
          </a>
        </div>
        `;
    });
    html += '</div>';
    notesGrid.innerHTML = html;
}

// --- Etkileşimler ---

function filterByCategory(categoryName, activeBtn) {
    document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
    
    if (categoryName === 'all') {
        renderGrid(allNotesFlat);
    } else {
        const filtered = allNotesFlat.filter(n => n.category === categoryName);
        renderGrid(filtered);
    }
}

function setupEventListeners() {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allNotesFlat.filter(note => 
            note.title.toLowerCase().includes(term) || 
            note.category.toLowerCase().includes(term)
        );
        renderGrid(filtered);
    });
}

// --- Yardımcılar (TOC & Copy) ---

function generateTOC() {
    const headers = contentArea.querySelectorAll('h2, h3');
    let html = '';
    
    if (headers.length === 0) {
        tocArea.innerHTML = '<span class="text-muted small ps-2">Bu notta başlık yok.</span>';
        return;
    }

    headers.forEach((header, index) => {
        if (!header.id) header.id = `header-${index}`;
        const isH3 = header.tagName === 'H3';
        const padding = isH3 ? 'ps-4' : 'ps-2 fw-medium';
        html += `<a href="#${header.id}" class="${padding}" onclick="scrollToHeader(event, '${header.id}')">${header.textContent}</a>`;
    });
    
    tocArea.innerHTML = html;
}

// Sayfa içi kaydırma (Hash Router ile çakışmaması için özel fonksiyon)
window.scrollToHeader = function(e, id) {
    e.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

window.copyCode = function(btn) {
    const pre = btn.nextElementSibling;
    const code = pre.innerText;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Kopyalandı!';
        btn.classList.add('bg-success');
        setTimeout(() => { btn.textContent = originalText; btn.classList.remove('bg-success'); }, 2000);
    });
}

// Geri Dön Butonu için (HTML'deki onclick güncellenmeli)
// Ancak HTML'de onclick="showHome()" kalabilir mi? 
// Hayır, rotayı temizlememiz daha doğru.
window.goBack = function() {
    // Hash'i temizle, router otomatik olarak showHome yapacak
    window.location.hash = ''; 
    // Veya history.back() de kullanılabilir ama hash silmek daha garantidir.
}
