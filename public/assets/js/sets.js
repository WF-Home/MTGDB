const api = "https://api.scryfall.com/sets/"

// Fetch Api Call

async function getSets() {
    const response = await fetch(api);
    const obj = await response.json();

    // Filtering any sets that has less than 20 cards

    const filteredData = obj.data.filter( (set) => set.card_count > 20)
    console.log(filteredData)

    // Grouping sets by their release year
    const groupedSets = Object.groupBy(filteredData, ({ released_at }) => new Date(released_at).getFullYear());

    generateSetSelection(groupedSets);
}

// Generate the html for the sets

function generateSetSelection(sets) {

    // Sorts the years by descending order

    const orderedYears = Object.keys(sets).sort((a,b) => b - a);

    let setSelection = document.getElementById("setSelection");

    let template = ``;

    orderedYears.forEach( year => {
        template += `
            <section class="sets">
                <h2>${year}</h2>
                <section class="sets-container">
        `

        // Sorts the sets within the years by most recent releases 

        const sortedSet = sets[year].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        sortedSet.forEach( set => {
            template += createSetButton(set);
        });

        template += `
                </section>
            </section>
        `
    })

    setSelection.innerHTML = template;

}

// Creates the set buttons

function createSetButton(set) {
    return `
        <div class="sets-button">
            <img src="${set.icon_svg_uri}"> 
            <a href="/cards.html?set=${set.code}&name=${set.name}">${set.name}</a>
        </div>
    `
}

getSets();