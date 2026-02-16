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
    let title = document.createElement("h1")
    let cardContainer = document.createElement("section")

    cardContainer.setAttribute("id", "card-container")

    title.innerHTML = setName

    cardListView.append(title);
    cardListView.append(cardContainer);

    cards.forEach( card => {
        if (Object.hasOwn(card, 'image_uris')) {

            let cardObj = document.createElement("img")

            cardObj.setAttribute("class", "imgCards")
            cardObj.setAttribute("src", card.image_uris.small)
            cardObj.addEventListener("click", function() {
                console.log(card)
            })

            cardContainer.append(cardObj)

        }
    });
}