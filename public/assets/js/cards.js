const api = "https://api.magicthegathering.io/v1"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const set = urlParams.get('set'); 
const setName = urlParams.get('name');

window.addEventListener("load", () => {
    getCards();
})

async function getCards() {
    const response = await fetch(`${api}/cards?set=${set}`);
    const data = await response.json();

    generateCards(data.cards)
}

function generateCards(cards) {

    let cardListView = document.getElementById("cards-list-view");

    let template = `
        <h1>${setName}</h1>
        <section id="cards-container">
    `;

    cards.forEach( card => {
        template += `<img src="${card.imageUrl}">`;
    });

    template += `</section>`

    cardListView.innerHTML = template;
}