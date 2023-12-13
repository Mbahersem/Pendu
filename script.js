let attempts = 10; // Nombre de tentatives
let isFinished = false; // Variable pour savoir si le jeu est terminé
const counter = document.querySelector('.counter');
const word = document.querySelector('.word');
const reponse = document.querySelector('input');
const sendReponse = document.querySelector('button');
let hidden = "";
let mask = [];

const initialization = async () => {
    let res = await fetch('http://localhost:3000/word');
    let promise = res.json();
    hidden = await promise;
    hidden = hidden.data;
    console.log(hidden);
    // Affiche les étoiles
    for(let i = 0; i < hidden.length; i++) {
        mask.push('*');
    } 
    mask = mask.join('');
    updateCounter();
}

// Met à jour le texte des étoiles
const updateCounter = () => {
    word.innerText = mask;
    counter.innerText = `Il vous reste ${attempts} tentatives.`
};
// Pour vérifier si la lettre entrée fait partie du mot ou si on a le mot exact à la fin
const compareWords = (e) => {
    if(isFinished) return;
    e.preventDefault();

    const [lettre] = reponse.value.toLowerCase();
    reponse.value = '';
    if(lettre != '') attempts--;

    for(let i = 0; i < hidden.length; i++) {
        if(lettre === hidden.charAt(i)) {
            mask = mask.split('');
            mask[i] = lettre;
            mask = mask.join('');
        }
    }
    updateCounter();
    if(mask == hidden) {
        isFinished = true;
    }
    endGame();
}

const endGame = () => {
    if(isFinished) {
        reponse.disabled = true;
        counter.innerText = 'Vous avez gagné !';
        return;
    }
    if(attempts == 0 && !isFinished) {
        reponse.disabled = true;
        counter.innerText = 'Vous avez perdu !';
        isFinished = true;
    }
}

initialization();

sendReponse.addEventListener('click', compareWords);