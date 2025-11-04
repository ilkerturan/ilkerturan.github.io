const sidebarContent = document.getElementById('sidebarContent');
const content = document.getElementById('content');
let notesData = null;

async function loadNotesConfig() {
    try {
        const response = await fetch('notes.json');
        if (!response.ok) throw new Error('notes.json yüklenemedi');

        notesData = await response.json();
        renderSidebar();
    } catch (error) {
        sidebarContent.innerHTML = `
        <div class="alert alert-warning mt-2">
          <strong>Hata:</strong> notes.json dosyası okunamadı.
        </div>`;
    }
}

function renderSidebar() {
    if (!notesData || !notesData.categories) {
        sidebarContent.innerHTML = `<div class="alert alert-warning">Kategori yok</div>`;
        return;
    }

    let html = '';
    notesData.categories.forEach(cat => {
        html += `
        <div class="mb-3">
          <div class="fw-bold text-uppercase small mb-1">${cat.name}</div>
          <ul class="list-unstyled">
        `;
        cat.notes.forEach(note => {
            html += `
            <li class="note-item mb-1">
              <a href="#" data-path="${note.path}" class="d-block py-1 px-2 text-decoration-none text-secondary rounded">
                ${note.title}
              </a>
            </li>`;
        });

        html += `</ul></div>`;
    });

    sidebarContent.innerHTML = html;

    document.querySelectorAll('.note-item a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadNote(link.getAttribute('data-path'), link);
        });
    });
}

async function loadNote(path, linkElement) {
    try {
        content.innerHTML = `<div class="text-center text-muted py-3">Not yükleniyor...</div>`;
        const response = await fetch(path);
        if (!response.ok) throw new Error('Dosya yüklenemedi');

        const markdown = await response.text();
        const html = marked.parse(markdown);
        content.innerHTML = html;

        document.querySelectorAll('.note-item a').forEach(a => a.classList.remove('active'));
        linkElement.classList.add('active');

        window.scrollTo(0, 0);
    } catch (error) {
        content.innerHTML = `
          <div class="alert alert-warning">
            <strong>Hata:</strong> Not yüklenemedi.
            <br>Yol: ${path}
          </div>`;
    }
}

loadNotesConfig();
