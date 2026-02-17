
let header = document.querySelector("header")

generateHeaderContent();

function generateHeaderContent() {

    let heading = document.createElement("h1")
    heading.innerHTML = "Magic The Gathering Card Database"
    header.append(heading)
    heading.addEventListener("click", function() {
        window.location.href = "/index.html"
    })

    let searchBar = document.createElement("section")
    header.append(searchBar)


    let searchInput = document.createElement("input")
    searchInput.setAttribute("type", "text")

    let searchButton = document.createElement("button")
    searchButton.innerHTML = "Search"
    searchButton.addEventListener("click", function() {
        window.location.href = `/cards.html?search=${searchInput.value}`;
    })

    searchBar.append(searchInput)
    searchBar.append(searchButton)
}