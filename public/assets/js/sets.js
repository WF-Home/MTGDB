const api = "https://api.scryfall.com/sets/"

async function getSets() {
    const response = await fetch(api);
    const obj = await response.json();

    const filteredData = obj.data.filter( (set) => set.card_count > 20)
    console.log(filteredData)

    const groupedSets = Object.groupBy(filteredData, ({ released_at }) => new Date(released_at).getFullYear());

    generateSetSelection(groupedSets);
}

function generateSetSelection(sets) {

    const orderedYears = Object.keys(sets).sort((a,b) => b - a);

    let setSelection = document.getElementById("setSelection");

    let template = ``;

    orderedYears.forEach( year => {
        template += `
            <section class="sets">
                <h2>${year}</h2>
                <section class="sets-container">
        `
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

function createSetButton(set) {
    return `
        <a class="sets-button" href="/cards.html?set=${set.code}&name=${set.name}">${set.name}</a>
    `
}

getSets();