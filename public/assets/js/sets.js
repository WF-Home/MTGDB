const api = "https://api.magicthegathering.io/v1"

async function getSets() {
    const response = await fetch(`${api}/sets`);
    const data = await response.json();

    const groupedSets = Object.groupBy(data.sets, ({ releaseDate }) => new Date(releaseDate).getFullYear());

    generateSetSelection(groupedSets);
}

function generateSetSelection(sets) {

    const orderedYears = Object.keys(sets).sort((a,b) => b - a);

    let setSelection = document.getElementById("setSelection");

    let template = ``;

    orderedYears.forEach( year => {
        template += `
            <section>
                <h2>${year}</h2>
        `
        const sortedSet = sets[year].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate))
        sortedSet.forEach( set => {
            template += createSetButton(set);
        });

        template += `</section>`
    })

    setSelection.innerHTML = template;

}

function createSetButton(set) {
    return `
        <button>${set.name}</button>
    `
}

getSets();