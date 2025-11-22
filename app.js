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
    // YENİ: Kod bloklarına dil sınıfını ekleyerek vurgulamayı (highlighting) etkinleştir
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
// YENİ: Modal değişkenleri
let noteModal = null;
let noteContentArea = null;
let noteModalTitle = null;


/**
 * YENİ YARDIMCI FONKSİYON:
 * Modal nesnesini alır ve modal'ın DOM elementlerini atar.
 */
function getNoteModal() {
    if (!noteModal) {
        const modalElement = document.getElementById('noteModal');
        noteModal = new bootstrap.Modal(modalElement);
        noteContentArea = document.getElementById('note-content-area');
        noteModalTitle = document.getElementById('noteModalLabel');
        
        // Modal gizlendiğinde içeriği temizle
        modalElement.addEventListener('hidden.bs.modal', function () {
            noteModalTitle.textContent = 'Not Başlığı';
            noteContentArea.innerHTML = '<div class="py-5 text-center text-muted">İçerik Yüklenemedi.</div>';
        });
    }
    return noteModal;
}

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
 * GÜNCELLENEN FONKSİYON:
 * Ana sayfadaki kategori başlıklarını ve not kartlarını oluşturur.
 * Not: Kartlara data-title eklendi.
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
            // YENİ: n.title'ı da data-title olarak kartta sakla
            html += `
            <div class="col-md-4 col-lg-3">
              <div class="card h-100 shadow-sm border-0 note-card" data-path="${n.path}" data-title="${n.title}" role="button">
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
            // data-title'ı da loadNote'a gönder
            loadNote(card.getAttribute('data-path'), card.getAttribute('data-title'));
        };
    });
}

/**
 * GÜNCELLENEN FONKSİYON:
 * Bir notu yükler, Modal içinde gösterir.
 */
async function loadNote(path, title){
    const modal = getNoteModal();
    
    // Modal başlığını ayarla
    noteModalTitle.textContent = title || 'Not İçeriği';
    // Yükleniyor durumunu göster
    noteContentArea.innerHTML = `<div class="py-5 text-center text-muted">Not yükleniyor...</div>`;

    // Modal'ı göster
    modal.show();
    
    try {
        const r = await fetch(path);
        if(!r.ok){
            throw new Error(`Dosya yüklenemedi: ${r.statusText}`);
        }
        const md = await r.text();
        
        // Markdown içeriğini HTML'e dönüştür
        const renderedHtml = marked.parse(md);

        // Markdown İçeriğini Modal'a Yerleştir (Bootstrap stili için içerik div'i kaldırıldı, sadece content-area güncellendi)
        noteContentArea.innerHTML = renderedHtml;

        // YENİ: KaTeX ile LaTeX/Matematiksel İfadeleri Çiz
        if (typeof renderMathInElement === 'function') {
            // renderMathInElement fonksiyonu KaTeX auto-render kütüphanesinden gelir.
            // Bu fonksiyon, modal içeriği yüklendikten sonra matematiksel ifadeleri bulur ve KaTeX ile HTML'e dönüştürür.
            renderMathInElement(noteContentArea, {
                // KaTeX varsayılan ayrıştırıcıları
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false},
                    {left: '\\(', right: '\\)', display: false},
                    {left: '\\[', right: '\\]', display: true}
                ],
                errorCallback: function(msg, err) {
                    console.error("KaTeX Hata:", msg, err);
                }
            });
        }


        // Mermaid diyagramlarını çiz
        try {
            // Sadece yeni yüklenen içerikteki div'lerde mermaid çalıştırmak için daha spesifik seçici kullanılabilir
            const mermaidContainers = noteContentArea.querySelectorAll('.mermaid');
            mermaidContainers.forEach(container => {
                mermaid.init(undefined, container);
            });
            
        } catch (e) {
            console.error("Mermaid.init() çalışırken hata:", e);
        }
        
    } catch (err) {
        console.error("Not yüklenirken hata:", err);
        noteContentArea.innerHTML = `<div class="alert alert-warning">Dosya okunamadı: ${path}</div>`;
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

    // 3. YENİ: Modal'ı bir kez başlat
    getNoteModal(); 
}

// YENİ: 'DOMContentLoaded' olayını bekle
// Bu, tüm HTML elementleri yüklendikten sonra main() fonksiyonunu çalıştırır.
document.addEventListener('DOMContentLoaded', main);
