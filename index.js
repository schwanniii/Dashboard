function wakeUpCodememes() {
    // Wir nehmen die reine Domain ohne das /#/ (das Hash-Routing passiert nur im Browser)
    const url = 'https://codememes.onrender.com/';
    
    // Ein stummer "Klopfer" im Hintergrund
    fetch(url, { mode: 'no-cors' })
        .then(() => console.log('Codememes-Weckruf erfolgreich gesendet!'))
        .catch(err => console.log('Weckruf fehlgeschlagen (nicht schlimm):', err));
}

// Sofort ausführen, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', wakeUpCodememes);