// =================================================================
// --- YENİ EKLENEN BÖLÜM: Mermaid ve Marked.js Yapılandırması ---
// =================================================================

// 1. Mermaid.js'yi manuel olarak tetiklenecek şekilde ayarlayın.
//    (Sayfa yüklenince otomatik çalışmasın, biz 'loadNote' içinde çağıracağız)
try {
  mermaid.initialize({ startOnLoad: false });
} catch (e) {
  console.error("Mermaid.js kütüphanesi yüklenemedi veya initialize edilemedi.", e);
}


// 2. Marked.js için özel bir 'renderer' (işleyici) oluşturun.
const customRenderer = {
  code(code, infostring, escaped) {
    // Kod bloğunun dili 'mermaid' olarak belirtilmişse (```mermaid)
    if (infostring === 'mermaid') {
      // ...onu <pre><code> ile değil, mermaid.js'nin 
      // anlayacağı bir <div class="mermaid"> ile döndür.
      return `<div class="mermaid">${code}</div>`;
    }
    
    // Diğer tüm kod blokları için varsayılan davranışı taklit et.
    // (infostring || '') dil belirtilmediğinde (örn: ```) hata olmasını engeller.
    return `<pre><code class="language-${infostring || ''}">${code}</code></pre>`;
  }
};

// 3. Marked.js'ye bu özel işleyiciyi kullanmasını söyleyin.
try {
  marked.use({ renderer: customRenderer });
} catch (e) {
  console.error("Marked.js kütüphanesi yüklenemedi veya 'use' metodu ayarlanamadı.", e);
}

// =================================================================
// --- SİZİN MEVCUT KODUNUZ (loadNote içinde küçük bir ekleme ile) ---
// =================================================================

const navbarCategories = document.getElementById('navbarCategories');
const content = document.getElementById('content');

let notesData = null;

async function loadNotesConfig(){
    try {
        const r = await fetch('notes.json');
        if(!r.ok) throw new Error('Network response was not ok');
        notesData = await r.json();
        renderNavbar();
    } catch(err) {
        console.error("notes.json yüklenirken hata:", err);
        navbarCategories.innerHTML = `<li class="nav-item"><span class="nav-link text-danger">notes.json okunamadı.</span></li>`;
    }
}

function renderNavbar(){
    let html = "";
    notesData.categories.forEach((cat, idx)=>{
        const dropdownId = "cat" + idx;
        html += `
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="${dropdownId}" data-bs-toggle="dropdown">
            ${cat.name}
          </a>
          <ul class="dropdown-menu" aria-labelledby="${dropdownId}">
        `;
        cat.notes.forEach(n=>{
            html += `
            <li>
              <a class="dropdown-item note-link" href="#" data-path="${n.path}">
                ${n.title}
              </a>
            </li>`;
        });
        html += `</ul></li>`;
    });

    navbarCategories.innerHTML = html;

    document.querySelectorAll('.note-link').forEach(a=>{
        a.onclick = e => {
            e.preventDefault();
            loadNote(a.getAttribute('data-path'), a);
        };
    });
}

async function loadNote(path, el){
    content.innerHTML = `<div class="py-5 text-center text-muted">yükleniyor...</div>`;
    try {
        const r = await fetch(path);
        if(!r.ok){
            throw new Error(`Dosya yüklenemedi: ${r.statusText}`);
        }
        const md = await r.text();
        
        // 1. Marked.js içeriği DÖNÜŞTÜRÜR (customRenderer sayesinde mermaid div'leri oluşur)
        content.innerHTML = marked.parse(md);

        // =====================================================
        // --- YENİ EKLENEN SATIR: Mermaid'i Tetikleme ---
        // 2. Mermaid'e "Şimdi sayfadaki .mermaid class'lı div'leri bul ve çiz" komutunu ver.
        try {
            mermaid.run();
        } catch (e) {
            console.error("Mermaid.run() çalışırken hata:", e);
        }
        // --- YENİ EKLEME SONU ---
        // =====================================================

        document.querySelectorAll('.note-link').forEach(x=>x.classList.remove('active-note'));
        el.classList.add('active-note');

    } catch (err) {
        console.error("Not yüklenirken hata:", err);
        content.innerHTML = `<div class="alert alert-warning">Dosya okunamadı: ${path}</div>`;
        return;
    }
}

// Uygulamayı başlat
loadNotesConfig();
