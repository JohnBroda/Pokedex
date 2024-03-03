let pokemonNames = []
let pokeInfo = []
currentPokemon = 0;
let loadCount = 0;

async function loadPokemon(searchTerm = '') {
    let pokeCard = document.getElementById('pokeCard');
    pokeCard.innerHTML = '';
    pokemonNames.splice(0)
    let url = `https://pokeapi.co/api/v2/pokemon?offset=&limit=1302`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    Pokemons = responseAsJson['results'];
    if (searchTerm) {
        Pokemons = Pokemons.filter(pokemon => pokemon.name.includes(searchTerm.toLowerCase()));
    }
    let visiblePokemons = Pokemons.slice(loadCount, 20 + loadCount);
    pokemonCount();
    forCard(visiblePokemons);
}

async function forCard(visiblePokemons) {
    for (let i = 0; i < visiblePokemons.length; i++) {
        const pokemonName = visiblePokemons[i];
        if (!pokemonNames.includes(pokemonName['name'])) {
            showLoad()
            let url2 = `https://pokeapi.co/api/v2/pokemon/${pokemonName['name']}`;
            let response2 = await fetch(url2);
            let responseAsJson2 = await response2.json();
            pokemonNames.push(responseAsJson2['name'])
            pokeInfo.push(responseAsJson2)
            let types = responseAsJson2['types']
            pokeCardInner(i, responseAsJson2)
            forType(i, types)
            hideLoad()
        }
    }
}

function forType(i, types) {
    for (let j = 0; j < types.length; j++) {
        const type = types[j]['type']['name'];
        const modtype = type[0].toUpperCase() + type.slice(1);
        let typeInner = document.getElementById(`type${i}`)
        let typeId = `types${i}-${j}`;

        typeInner.innerHTML +=
            `
        <b id="${typeId}">${modtype}</b>
    `;
        typeColor(typeId, modtype)
    }
}

function forTypeZoom(i, types) {
    for (let j = 0; j < types.length; j++) {
        const type = types[j]['type']['name'];
        const modtype = type[0].toUpperCase() + type.slice(1);
        let typeInner = document.getElementById(`typeZoom${i}`)
        let typeId = `types${i}-${j}-${currentPokemon}`;

        typeInner.innerHTML +=
            `
        <b id="${typeId}">${modtype}</b>
    `;
        typeColor(typeId, modtype)
    }
}

function typeColor(typeId, type) {
    let types = document.getElementById(typeId);
    const typeColors = {
        Normal: '#a8a878', Fire: '#f08030', Water: '#6890f0', Electric: '#f8d030', Grass: '#78c850', Ice: '#98d8d8', Fighting: '#c03028',
        Poison: '#a040a0', Ground: '#e0c068', Flying: '#a890f0', Psychic: '#f85888', Bug: '#a8b820', Rock: '#b8a038', Ghost: '#705898',
        Dragon: '#7038f8', Dark: '#705848', Steel: '#b8b8d0', Fairy: '#f0b6bc', Stellar: '#35ace7'
    };
    if (typeColors[type]) {
        types.style.backgroundColor = typeColors[type];
    }
}

function loadCountPlus() {
    if (loadCount < 1302) {
        loadCount += 20
        pokeInfo.splice(0)
        loadPokemon()
    }
}

function loadCountMinus() {
    if (loadCount > 0) {
        loadCount -= 20
        pokeInfo.splice(0)
        loadPokemon()
    }
}

function searchPokemon() {
    loadCount = 0;
    pokeInfo.splice(0)
    let searchTerm = document.getElementById('searchPokemon').value;
    loadPokemon(searchTerm);
}

function pokeZoom(i) {
    let pokeZoomInner = document.getElementById('pokeZoom');
    pokeZoomInner.classList.replace('d-none', 'pokeZoom');
    currentPokemon = i;

    pokeZoomInnerHTML(i)
    chart(i)
}

function chart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: ['Health', 'Attack', 'Defense', 'Speed'],
            datasets: [{
                data: [pokeInfo[currentPokemon]['stats'][0]['base_stat'], pokeInfo[currentPokemon]['stats'][1]['base_stat'], pokeInfo[currentPokemon]['stats'][2]['base_stat'], pokeInfo[currentPokemon]['stats'][5]['base_stat']],
                borderWidth: 1
            }]
        },
    });
}

function closePokeZoom() {
    let pokeZoomInner = document.getElementById('pokeZoom')
    pokeZoomInner.classList.replace('pokeZoom', 'd-none')
    pokeZoomInner.innerHTML = ``;
}

function next(i) {
    currentPokemon++;
    if (currentPokemon == pokeInfo.length) {
        currentPokemon = 0
    }
    pokeZoomInnerHTML(i)
    chart(i)
}


function back(i) {
    currentPokemon--;
    if (currentPokemon == -1) {
        currentPokemon = pokeInfo.length-1
    }
    pokeZoomInnerHTML(i)
    chart(i)
}

function showLoad(){
    document.getElementById('load').style.display = ``;
}

function hideLoad(){
    document.getElementById('load').style.display = 'none';
}