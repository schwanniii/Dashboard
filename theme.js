// 1. SOFORTIGER BUILD (Wird direkt im Head ausgeführt gegen Flackern)
const savedTheme = localStorage.getItem('theme') || 'system';
applyTheme(savedTheme);

function applyTheme(theme) {
    const systemQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = theme === 'dark' || (theme === 'system' && systemQuery.matches);
    
    document.documentElement.classList.toggle('dark', isDark);
    if (document.body) {
        document.body.classList.toggle('dark', isDark);
    }
}

// System-Präferenz-Änderungen im Hintergrund live überwachen
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if ((localStorage.getItem('theme') || 'system') === 'system') {
        document.documentElement.classList.toggle('dark', e.matches);
        if (document.body) document.body.classList.toggle('dark', e.matches);
    }
});

// 2. INTERAKTIONS-LOGIK (Wartet, bis das HTML bereitsteht)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.theme-menu-container');
    const toggleBtn = document.getElementById('themeToggleBtn');
    const dropdown = document.getElementById('themeDropdown');
    const options = document.querySelectorAll('.theme-option');

    if (!container || !toggleBtn || !dropdown) return;

    // Setze das initiale Icon auf dem Button und markiere die Option im Menü
    container.setAttribute('data-current', savedTheme);
    document.querySelector(`.theme-option[data-value="${savedTheme}"]`)?.classList.add('selected');

    // Menü öffnen / schließen
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = container.classList.toggle('active');
        toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Klick auf eine Option im Dropdown
    options.forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            
            // UI aktualisieren
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            container.setAttribute('data-current', value);
            
            // Theme anwenden & speichern
            localStorage.setItem('theme', value);
            applyTheme(value);
            
            // Schließen
            container.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Schließen, wenn man irgendwo außerhalb des Dropdowns hinklickt
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            container.classList.remove('active');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
});