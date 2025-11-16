// =================================================================
// --- Mermaid ve Marked.js Yapılandırması (Dokunulmadı) ---
// =================================================================
try {
  mermaid.initialize({ startOnLoad: false });
} catch (e) {
  console.error("Mermaid.js kütüphanesi yüklenemedi veya initialize edilemedi.", e);
}
const customRenderer = {
  code(code, infostring, escaped) {
    if (infostring === 'mermaid') {
      return `<div class="mermaid">${code}</div>`;
    }
    return `<pre><code class="language-${infostring || ''}">${code}</code></pre>`;
  }
};
try {
  marked.use({ renderer: customRenderer });
} catch (e) {
  console.error("Marked.js kütüphanesi yüklenemedi veya 'use' metodu ayarlanamadı.", e);
}

// =================================================================
// --- YENİ UYGULAMA MANTIĞI ---
// =================================================================

// Değişkenleri burada deklare et, ama DOM'a bağlı olanları atama
let content;
let notesData = null;

/**
 * Ana notlar yapılandırmasını yükler ve ana sayfayı çizer.
 */
async function loadNotesConfig(){
    try {
        const r = await fetch('notes.json');
        if(!r.ok) throw new Error('Network response was not ok');
        notesData = await r.json();
        // Navbar yerine ana sayfayı (kartları) çiz
        renderHomepage();
    } catch(err) {
        console.error("notes.json yüklenirken hata:", err);
        // content artık null olmayacak çünkü main() içinde atandı.
        content.innerHTML = `<div class="container"><div class="alert alert-danger">notes.json okunamadı.</div></div>`;
    }
}

/**
 * YENİ FONKSİYON:
 * Ana sayfadaki kategori başlıklarını ve not kartlarını oluşturur.
 */
function renderHomepage(){
    if (!notesData) return;

    let html = '<div class="container pb-5">'; // Ana container

    notesData.categories.forEach((cat, idx)=>{
        // Kategori Başlığı
        html += `
        <h2 class="display-6 border-bottom pb-3 mb-4 mt-4">
          <i class="bi bi-bookmark-star-fill me-2 text-primary-emphasis"></i>
          ${cat.name}
        </h2>
        `;
        
        // Not Kartları için Satır
        html += '<div class="row g-4">';
        
        cat.notes.forEach(n=>{
            html += `
            <div class="col-md-4 col-lg-3">
              <div class="card h-100 shadow-sm border-0 note-card" data-path="${n.path}" role="button">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title mb-2">${n.title} <i class="bi bi-arrow-right-short text-primary icon-link icon-link-hover"></i> </h5>
                </div>
              </div>
            </div>
            `;
        });
        
        html += '</div>'; // row kapanışı
    });

    html += '</div>'; // container kapanışı
    content.innerHTML = html;

    // Kartlara tıklama olaylarını ata
    document.querySelectorAll('.note-card').forEach(card =>{
        card.onclick = () => {
            loadNote(card.getAttribute('data-path'));
        };
    });
}

/**
 * GÜNCELLENEN FONKSİYON:
 * Bir notu yükler, gösterir ve "Geri Dön" butonu ekler.
 */
async function loadNote(path){
    // "el" parametresine artık gerek yok
    content.innerHTML = `<div class="py-5 text-center text-muted">yükleniyor...</div>`;
    try {
        const r = await fetch(path);
        if(!r.ok){
            throw new Error(`Dosya yüklenemedi: ${r.statusText}`);
        }
        const md = await r.text();
        
        // Not içeriğini ve Geri butonunu oluştur
        let noteHtml = `
        <div class="container py-4">
          <div class="row">
            <div class="col-lg-10 mx-auto">
              <!-- YENİ: Geri Dön Butonu -->
              <button id="back-to-home" class="btn btn-outline-primary mb-4">
                <i class="bi bi-arrow-left me-2"></i> Ana Sayfaya Dön
              </button>
              
              <!-- Markdown İçeriği -->
              <div class="bg-white p-4 p-md-5 rounded shadow-sm">
                ${marked.parse(md)}
              </div>
            </div>
          </div>
        </div>
        `;
        
        content.innerHTML = noteHtml;

        // Mermaid diyagramlarını çiz
        try {
            mermaid.run();
        } catch (e) {
            console.error("Mermaid.run() çalışırken hata:", e);
        }

        // Geri Dön butonuna olay ata
        document.getElementById('back-to-home').onclick = renderHomepage;
        
    } catch (err) {
        console.error("Not yüklenirken hata:", err);
        content.innerHTML = `<div class="container"><div class="alert alert-warning">Dosya okunamadı: ${path}</div></div>`;
        return;
    }
}

// YENİ: Ana Başlatıcı Fonksiyon
function main() {
    // 1. DOM yüklendikten SONRA #content elementini bul
    content = document.getElementById('content');
    
    // Güvenlik kontrolü
    if (!content) {
        console.error("KRİTİK HATA: #content elementi sayfada bulunamadı.");
        document.body.innerHTML = '<div class="alert alert-danger">Kritik hata: #content elementi bulunamadı.</div>';
        return;
    }
    
    // 2. Uygulamayı başlat
    loadNotesConfig();
}

// YENİ: 'DOMContentLoaded' olayını bekle
// Bu, tüm HTML elementleri yüklendikten sonra main() fonksiyonunu çalıştırır.
document.addEventListener('DOMContentLoaded', main);
