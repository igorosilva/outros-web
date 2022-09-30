const pokemonImage = document.querySelector('.pokemon__image')
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();

        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonNumber.innerHTML = 0
    pokemonName.innerHTML = 'Loading...'

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'inline';
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;

        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonNumber.innerHTML = 0
        pokemonName.innerHTML = 'Not found'
        searchPokemon = 0;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
    } else {
        searchPokemon = 905
    }

    renderPokemon(searchPokemon);
});

buttonNext.addEventListener('click', (event) => {
    if (searchPokemon >= 905) {
        searchPokemon = 1;
    } else {
        searchPokemon += 1;
    }

    renderPokemon(searchPokemon)
});

renderPokemon(searchPokemon);
