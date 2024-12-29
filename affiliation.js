document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('visible');
        });

        document.addEventListener('click', (event) => {
            const isClickInsideSidebar = sidebar.contains(event.target);
            const isClickOnToggle = toggleButton.contains(event.target);

            if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('visible')) {
                sidebar.classList.add('hidden');
                sidebar.classList.remove('visible');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const generateLinkButton = document.getElementById('generateLinkBtn');
    const tempMessage = document.getElementById('tempMessage');

    if (generateLinkButton && tempMessage) {
        generateLinkButton.addEventListener('click', function() {
            // Afficher le message temporaire
            tempMessage.classList.add('show');

            // Masquer le message après 3 secondes
            setTimeout(function() {
                tempMessage.classList.remove('show');
            }, 3000); // 3000 ms = 3 secondes
        });
    }
});



