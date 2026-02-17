
let header = document.querySelector("header")

generateHeaderContent();

function generateHeaderContent() {

    let heading = document.createElement("h1")
    heading.innerHTML = "Magic The Gathering Card Database"

    header.append(heading)

}