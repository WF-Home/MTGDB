
let header = document.querySelector("header")

header.innerHTML = headerContent();

function headerContent() {
    return `
        <h1>Magic The Gathering Card Database</h1>
        <section id="search-container">
            <input>
            <button>search</button>
        </section>
    `
}