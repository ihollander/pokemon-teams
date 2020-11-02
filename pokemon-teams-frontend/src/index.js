const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainDiv = document.querySelector("main")

function init() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(data => renderTrainers(data))
}

function renderTrainers(arr) {
    arr.forEach(trainerObj => renderTrainer(trainerObj))
}

function renderTrainer(trainerObj) {
    const trainerCard = document.createElement("div")
    trainerCard.className = "card";
    trainerCard.dataset.id = trainerObj.id
    trainerCard.innerText = trainerObj.name
    const button = document.createElement("button")
    button.setAttribute("data-trainer-id", trainerObj.id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", addPokemon)
    trainerCard.append(button)
    mainDiv.append(trainerCard)

    //add the render pokemon as inner HTML
}

function renderPokemon() {

}

const addPokemon = event => {

}

// function addPokemon(event) {

// }

init();