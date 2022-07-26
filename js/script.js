const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let pokemonId = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    } 
}

const rederPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];    
        input.value = '';
        pokemonId = data.id;
    }else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
    }   
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    rederPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if(pokemonId > 1) {
        pokemonId -= 1;
        rederPokemon(pokemonId);
    }    
});

buttonNext.addEventListener('click', () => {
    pokemonId += 1;
    rederPokemon(pokemonId);
});

rederPokemon('1');