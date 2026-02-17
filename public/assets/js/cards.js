const api = "https://api.scryfall.com/cards/search"


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const set = urlParams.get('set'); 
const setName = urlParams.get('name');
const userSearch = urlParams.get('search')

window.addEventListener("load", () => {
    getCards();
})

// Fetch Card list based on set

async function getCards() {
    let response = ""
    if (set) {
        const URI = `e:${set}`
        response = await fetch(`${api}?order=color&q=${encodeURIComponent(URI)}`);
    } else {
        response = await fetch(`${api}?q=${userSearch}`)
    }

    const data = await response.json();
    generateCards(data.data)
}

// Generates Cards

function generateCards(cards) {
    // Create card list view
    let main = document.querySelector("main")

    if (cards !== undefined) {
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

        // Create card details view

        let cardDetailsContainer = document.createElement("article")
        cardDetailsContainer.setAttribute("id", "cardDetailsContainer")

        let closeButton = document.createElement("button")
            closeButton.addEventListener("click", function() {
            cardDetailsView.classList.remove("isDisplayed")
            cardDetailsView.style.display = "none"
        })
        
        cardDetailsView.append(cardDetailsContainer)
        cardDetailsView.append(closeButton)

        closeButton.innerHTML = "Go Back To List"

        // create interactable cards to open details view
        cards.forEach( card => {
            if (Object.hasOwn(card, 'image_uris')) {

                let cardObj = document.createElement("img")

                cardObj.setAttribute("class", "imgCards")
                cardObj.setAttribute("src", card.image_uris.normal)
                cardObj.addEventListener("click", function() {
                    cardDetailsContainer.innerHTML = cardDetails(card)
                    cardDetailsView.style.display = "flex"
                    cardDetailsView.classList.add("isDisplayed")
                })

                cardContainer.append(cardObj)

            }
        });
    } else {
        main.innerHTML = `<h1 id="searchError">Sorry! There were no available results for "${userSearch}"</h1>`
    }
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