// Récupérer le solde depuis localStorage au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    // Si un solde existe dans localStorage, on le charge. Sinon, on initialise à 1000.
    balance = parseFloat(localStorage.getItem('balance')) || 1000;

    // Met à jour l'affichage du solde sur la page
    updateBalanceDisplay();
});


// Sélection des éléments
let balance = 1000; // Solde initial
const balanceValue = document.getElementById('balanceValue');
let wheel = document.querySelector('.wheel');
let inner = document.querySelector('.inner');
let spinBtn = document.querySelector('.spinBtn');
const resultModal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const resultMultiplier = document.getElementById('resultMultiplier');
const resultGain = document.getElementById('resultGain');
const claimButton = document.getElementById('claimButton');
const betInput = document.getElementById('betInput');
const betError = document.getElementById('betError');
const sidebar = document.querySelector('.sidebar');
const toggleBtn = document.getElementById('toggleSidebar');


// Tableau des segments avec les multiplicateurs corrects
const segments = [
    "x100", "x1", "x0", "x2", 
    "x1", "x0", "x2", "x0", 
    "x5", "x0", "x1", "x10", 
    "x0", "x2", "x0", "x5"
];

// Variables pour la rotation
let currentAngle = 0; // Angle actuel de la roue
const segmentAngle = 360 / segments.length; // 22.5° par segment

// Pondération : chaque groupe a une probabilité spécifique
const weightedGroups = [
    { probability: 50, indices: [2, 5, 7, 9, 12, 14] }, // 50% des cas
    { probability: 30, indices: [1, 4, 10] },           // 30% des cas
    { probability: 15, indices: [3, 6, 13] },           // 15% des cas
    { probability: 3, indices: [8, 15] },               // 3% des cas
    { probability: 1.9, indices: [11] },                // 1.9% des cas
    { probability: 0.1, indices: [0] }                  // 0.1% des cas
];

// Fonction pour choisir un index pondéré
function getRandomWeightedIndex() {
    const random = Math.random() * 100; // Génère un nombre entre 0 et 100
    let cumulativeProbability = 0;

    for (const group of weightedGroups) {
        cumulativeProbability += group.probability;
        if (random <= cumulativeProbability) {
            // Sélectionne un index aléatoire parmi les indices du groupe choisi
            const groupIndices = group.indices;
            return groupIndices[Math.floor(Math.random() * groupIndices.length)];
        }
    }

    return 0; // Sécurité, ne devrait pas arriver
}

// Vérifie la mise avant de tourner la roue
function validateBet() {
    const betValue = parseFloat(betInput.value);
    // Vérifiez si le solde est nul
    if (balance <= 0) {
        showTemporaryMessage("Fonds insuffisants. Rechargez votre compte.", 3000); // Message temporaire
        return false;
    }
    if (isNaN(betValue)) {
        showTemporaryMessage("Entrez votre mise !");
        return false;
    }
    if (betValue < 10) {
        showTemporaryMessage("La mise minimale est de 10 TRX.");
        return false;
    }
    if(betValue > balance) {
        showTemporaryMessage("Fonds insuffisants!!")
        return false;
    }
    balance -= betValue; // Déduire la mise
    updateBalanceDisplay();
    betError.classList.add('hidden');
    return true;
    
}


// Gestion du clic sur le bouton "Spin"
spinBtn.onclick = function () {
    // Valider la mise
    if (!validateBet()) {
        return; // Ne pas tourner la roue si la mise est invalide
    }
    // Sélection aléatoire d'un segment pondéré
    const randomIndex = getRandomWeightedIndex();
    const targetSegment = segments[randomIndex];

    // Calcul de l'angle cible pour aligner le segment choisi avec l'axe positif des ordonnées
    const targetAngle = randomIndex * segmentAngle;
    const offsetAngle = 360 - (currentAngle % 360) - targetAngle;
    console.log(`Segment : ${randomIndex}`);
    console.log(`Angle : ${targetAngle}`);
    console.log(`segAngle : ${segmentAngle}`);
    console.log(`roueAngle : ${currentAngle}`);

    // Ajout de plusieurs tours complets pour l'animation
    const fullRotations = 360 * 5;
    const totalAngle = fullRotations + offsetAngle -segmentAngle;

    // Met à jour l'angle actuel
    currentAngle += totalAngle;

    // Rotation de la roue
    wheel.style.transform = `rotate(${currentAngle}deg)`;
    inner.style.transform = `rotate(${currentAngle}deg)`;

    // Affichage du cadran après l'animation
    setTimeout(() => {
        showResult(targetSegment);
    }, 5000); // Temps égal à la durée de l'animation (5s)
};

// Fonction pour afficher le cadran
function showResult(targetSegment) {
    const betValue = parseFloat(betInput.value);
    const multiplier = parseFloat(targetSegment.replace('x', ''));
    const winnings = betValue * multiplier;

    if (multiplier === 0) {
        resultMessage.textContent = "Dommage 😢";
        resultMultiplier.textContent = `Vous avez perdu ${betValue} TRX.`;
        resultGain.textContent = `0 TRX !`;
    } else {
        balance += winnings; // Ajouter les gains au solde
        updateBalanceDisplay();
        resultMessage.textContent = "Félicitations 🎉";
        resultMultiplier.textContent = `Vous avez gagné : x${multiplier} `;
        resultGain.textContent = `${winnings.toFixed(2)} TRX !`;
    }

    resultModal.classList.remove('hidden');
}


// Gestion du bouton "Claim"
claimButton.onclick = function () {
    // Cache le cadran
    resultModal.classList.add('hidden');
    console.log("Récompense réclamée !");
};

function showTemporaryMessage(message) {
    const tempMessage = document.getElementById('tempMessage');
    tempMessage.textContent = message;
    tempMessage.classList.remove('hidden');
    tempMessage.classList.add('visible');

    // Masquer le message après 3 secondes
    setTimeout(() => {
        tempMessage.classList.remove('visible');
        setTimeout(() => tempMessage.classList.add('hidden'), 500); // Attendre que l'opacité disparaisse
    }, 3000);
}

function updateBalanceDisplay() {
    // Met à jour le solde localStorage
    localStorage.setItem('balance', balance.toFixed(2));

    // Affiche le solde sur la page de la roulette
    balanceValue.textContent = balance.toFixed(2); // Afficher le solde avec deux décimales
}



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