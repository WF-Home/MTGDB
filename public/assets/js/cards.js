const api = "https://api.scryfall.com/cards/search"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const set = urlParams.get('set'); 
const setName = urlParams.get('name');

window.addEventListener("load", () => {
    getCards();
})

async function getCards() {
    const URI = `e:${set}`
    const response = await fetch(`${api}?q=${encodeURIComponent(URI)}`);
    const data = await response.json();
    generateCards(data.data)
}

function generateCards(cards) {

    let cardListView = document.getElementById("cards-list-view");

    let template = `
        <h1>${setName}</h1>
        <section id="cards-container">
    `;

    cards.forEach( card => {
        if (Object.hasOwn(card, 'image_uris')) {
              template += `<img src="${card.image_uris.small}">`;
        }
    });

    template += `</section>`

    cardListView.innerHTML = template;
}