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

document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éléments HTML
    const balanceValue = document.getElementById('balanceValue');
    const withdrawAmountInput = document.getElementById('withdrawAmount');
    const tronAddressGroup = document.getElementById('tronAddressGroup');
    const tronAddressInput = document.getElementById('tronAddress');
    const submitButton = document.getElementById('submitButton');
    const tempMessage = document.getElementById('tempMessage');

    // Récupérer le solde depuis localStorage
    let balance = parseFloat(localStorage.getItem('balance')) || 0;

    // Afficher le solde
    balanceValue.textContent = balance.toFixed(2);

    // Fonction pour afficher un message temporaire
    function showTemporaryMessage(message, duration = 3000) {
        tempMessage.textContent = message;
        tempMessage.classList.add('visible');

        setTimeout(() => {
            tempMessage.classList.remove('visible');
        }, duration);
    }

    // Gestion de l'entrée du montant de retrait
    withdrawAmountInput.addEventListener('input', function () {
        const withdrawAmount = parseFloat(withdrawAmountInput.value);

        if (isNaN(withdrawAmount) || withdrawAmount < 100) {
            showTemporaryMessage('La somme minimum de retrait est 100 TRX.');
            tronAddressGroup.style.display = 'none';
        } else if (withdrawAmount > balance) {
            showTemporaryMessage('Fonds insuffisants.');
            tronAddressGroup.style.display = 'none';
        } else {
            tronAddressGroup.style.display = 'block';
        }
    });

    // Gestion du clic sur le bouton "Soumettre"
    submitButton.addEventListener('click', function () {
        const withdrawAmount = parseFloat(withdrawAmountInput.value);
        const tronAddress = tronAddressInput.value.trim();

        if (isNaN(withdrawAmount) || withdrawAmount < 100) {
            showTemporaryMessage('La somme minimum de retrait est 100 TRX.');
        } else if (withdrawAmount > balance) {
            showTemporaryMessage('Fonds insuffisants.');
        } else if (!tronAddress) {
            showTemporaryMessage('Veuillez entrer une adresse TRON valide.');
        } else {
            showTemporaryMessage('Ce service n\'est pas disponible.');
        }
    });
});
