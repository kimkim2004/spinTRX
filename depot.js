// script.js

document.addEventListener('DOMContentLoaded', function () {
    const depositAmount = document.getElementById('depositAmount');
    const validateDeposit = document.getElementById('validateDeposit');
    const tempMessage = document.getElementById('tempMessage');
    const tronAddressSection = document.getElementById('tronAddressSection');
    const tronAddress = document.getElementById('tronAddress');
    const copyAddress = document.getElementById('copyAddress');
    const submitButton = document.getElementById('submitButton');

    // Adresse TRON
    const tronWalletAddress = "TSaMPleAdDRessForTrOn1234567";

    // Validation du montant
    validateDeposit.addEventListener('click', function () {
        const amount = parseFloat(depositAmount.value);

        if (isNaN(amount) || amount < 100) {
            showTemporaryMessage("Le dépôt minimum est de 100 TRX.");
        } else {
            tronAddress.value = tronWalletAddress; // Mettre l'adresse dans le champ
            tronAddressSection.classList.remove('hidden'); // Afficher la section d'adresse
        }
    });

    // Copier l'adresse dans le presse-papier
    copyAddress.addEventListener('click', function () {
        tronAddress.select();
        tronAddress.setSelectionRange(0, 99999); // Pour mobile
        navigator.clipboard.writeText(tronAddress.value).then(() => {
            showTemporaryMessage("Adresse copiée dans le presse-papier !");
        });
    });

    // Soumettre
    submitButton.addEventListener('click', function () {
        showTemporaryMessage("Ce service n'est pas disponible.");
    });

    // Fonction pour afficher un message temporaire
    function showTemporaryMessage(message) {
        tempMessage.textContent = message;
        tempMessage.classList.remove('hidden');
        setTimeout(() => {
            tempMessage.classList.add('hidden');
        }, 3000);
    }
});

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