const api = "https://api.scryfall.com/cards/search"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const set = urlParams.get('set'); 
const setName = urlParams.get('name');

window.addEventListener("load", () => {
    getCards();
})

// Fetch Card list based on set

async function getCards() {
    const URI = `e:${set}`
    const response = await fetch(`${api}?q=${encodeURIComponent(URI)}`);
    const data = await response.json();
    generateCards(data.data)
}

// Generates Cards

function generateCards(cards) {

    let cardListView = document.getElementById("cards-list-view");

    let template = `
        <h1>${setName}</h1>
        <section id="cards-container">
    `;

    cards.forEach( card => {
        if (Object.hasOwn(card, 'image_uris')) {
              template += `<img class="imgCards" src="${card.image_uris.large}">`;
        }
    });

    template += `</section>`

    cardListView.innerHTML = template;
}