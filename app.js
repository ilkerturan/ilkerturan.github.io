// 1. Mermaid.js'yi "sayfa yüklenince otomatik çalışma" (startOnLoad: false) 
  //    olarak ayarlayın. Biz onu manuel olarak çağıracağız.
  mermaid.initialize({ startOnLoad: false });

  // 2. Marked.js için özel bir 'renderer' (işleyici) oluşturun.
  const customRenderer = {
    code(code, infostring, escaped) {
      // Kod bloğunun dili 'mermaid' olarak belirtilmişse...
      if (infostring === 'mermaid') {
        // ...onu <pre><code> ile değil, mermaid.js'nin 
        // anlayacağı bir <div class="mermaid"> ile döndür.
        return `<div class="mermaid">${code}</div>`;
      }
      // Diğer tüm kod blokları için varsayılan işleyiciyi kullan
      // (Bunu yapmak daha sağlamdır ancak bu örnek için es geçilebilir.
      // Basitçe varsayılan davranışı taklit edelim:)
      return `<pre><code class="language-${infostring}">${code}</code></pre>`;
    }
  };

  // 3. Marked.js'ye bu özel işleyiciyi kullanmasını söyleyin.
  marked.use({ renderer: customRenderer });
const navbarCategories = document.getElementById('navbarCategories');
const content = document.getElementById('content');

let notesData = null;

async function loadNotesConfig(){
    try {
        const r = await fetch('notes.json');
        if(!r.ok) throw new Error();
        notesData = await r.json();
        renderNavbar();
    } catch {
        navbarCategories.innerHTML = `<li class="nav-item"><span class="nav-link text-danger">notes.json yok</span></li>`;
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
    const r = await fetch(path);
    if(!r.ok){
        content.innerHTML = `<div class="alert alert-warning">dosya okunamadı</div>`;
        return;
    }
    const md = await r.text();
    content.innerHTML = marked.parse(md);

    document.querySelectorAll('.note-link').forEach(x=>x.classList.remove('active-note'));
    el.classList.add('active-note');
}

loadNotesConfig();
