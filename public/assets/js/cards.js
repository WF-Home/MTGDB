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
    let main = document.querySelector("main")
    let cardListView = document.getElementById("cards-list-view");
    let title = document.createElement("h1")
    let cardContainer = document.createElement("section")

    cardContainer.setAttribute("id", "cards-container")

    title.innerHTML = setName

    cardListView.append(title)
    cardListView.append(cardContainer)

    let cardDetailsView = document.createElement("section")
    cardDetailsView.setAttribute("id", "cardDetailsView")

    main.append(cardDetailsView)

    let cardDetailsContainer = document.createElement("article")
    cardDetailsContainer.setAttribute("id", "cardDetailsContainer")

    let closeButton = document.createElement("button")
    closeButton.addEventListener("click", function() {
        cardDetailsView.classList.remove("isDisplayed")
    })
    
    cardDetailsView.append(cardDetailsContainer)
    cardDetailsView.append(closeButton)

    closeButton.innerHTML = "Go Back To List"

    cards.forEach( card => {
        if (Object.hasOwn(card, 'image_uris')) {

            let cardObj = document.createElement("img")

            cardObj.setAttribute("class", "imgCards")
            cardObj.setAttribute("src", card.image_uris.small)
            cardObj.addEventListener("click", function() {
                console.log(card)
                cardDetailsContainer.innerHTML = cardDetails(card)
                cardDetailsView.classList.add("isDisplayed")
            })

            cardContainer.append(cardObj)

        }
    });
}

function cardDetails(card) {
    return `
        <img src=${card.image_uris.normal}>
        <section>
            <div>
                <h1>${card.name}</h1>
                <p class="type">${card.type_line}</p>
            </div>
            <p class="oracle">${card.oracle_text}</p>
            <p class="flavour">${card.flavor_text ? card.flavor_text : ""}</p>
            <p class="artist">Artist: ${card.artist}</p>
        <section>
    `
}