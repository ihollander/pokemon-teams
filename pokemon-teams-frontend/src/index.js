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

    renderPokemons(trainerCard, trainerObj.pokemons)

    //add the render pokemon as inner HTML
}

function renderPokemons(trainerCard, pokemonArray) {
    const pokemonContainer = document.createElement("ul")
    trainerCard.append(pokemonContainer)
    pokemonArray.forEach(pokemonObj => {
        renderPokemon(pokemonContainer, pokemonObj)
    })
}

function renderPokemon(pokemonContainer, pokemonObj) {
    const pokemonLI = document.createElement("li")
    pokemonLI.innerText = `${pokemonObj.nickname} (${pokemonObj.species})`
    const releaseButton = document.createElement("button")
    releaseButton.setAttribute("data-pokemon-id", pokemonObj.id)
    releaseButton.innerText = "Release"
    releaseButton.className = "release"
    releaseButton.addEventListener("click", releasePokemon)
    pokemonLI.append(releaseButton)
    pokemonContainer.append(pokemonLI)
}

const addPokemon = event => {
    const team = event.target.parentNode.querySelector("ul")

    fetch(POKEMONS_URL, {

        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({

            "trainer_id": event.target.parentNode.dataset.id
            // "trainer_id": event.target.parentNode.dataset[`data-trainer-id`]

        }) 

    })
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => renderPokemon(team, data))
    // .then(console.log)

}

const releasePokemon = event => {
    const pokemonToRemove = event.target.parentNode

    fetch(`${POKEMONS_URL}/${event.target.parentNode.dataset.id}`, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => { pokemonToRemove.remove() })

}

init();