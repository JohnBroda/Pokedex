function pokemonCount() {
    let pokeCount = document.getElementById('pokeCount');
    pokeCount.innerHTML = `
    <div class="loadPokemonStyle">
        <h1 onclick="loadCountMinus()">-20</h1>
        <h2>${loadCount + 20} von 1302</h2>
        <h3 onclick="loadCountPlus()">+20</h3>
    </div>
    `;
}

function pokeCardInner(i, responseAsJson2) {
    pokeCard.innerHTML += `
        <div id="card${i}" class="card" onclick="pokeZoom(${i})">
            <h3>${responseAsJson2['name'][0].toUpperCase() + responseAsJson2['name'].slice(1)}</h3>
            <img src="${responseAsJson2['sprites']['front_default']}">
            <div id="type${i}" class="type">
            </div>
        </div>
        `;
}

function pokeZoomInnerHTML(i) {
    let pokeZoomInner = document.getElementById('pokeZoom');
    let types = pokeInfo[currentPokemon]['types']
    pokeZoomInner.innerHTML = `
    <div class="cardZoomFlex">
        <h1 onclick="back(${i})"> 
            <
        </h1>
        <div class="zoomBackground" onclick="closePokeZoom()"></div>
        <div class="cardZoom">
            <div class="cardZoomDescription">
                <img src="${pokeInfo[currentPokemon]['sprites']['front_default']}">
                <div>
                    <h2>
                        ${pokeInfo[currentPokemon]['name'][0].toUpperCase() + pokeInfo[currentPokemon]['name'].slice(1)} #${pokeInfo[currentPokemon]['id']}
                    </h3>
                    <h3>
                        Height: ${pokeInfo[currentPokemon]['height']}0cm
                    </h3>
                    <h3>
                        Weight: ${pokeInfo[currentPokemon]['weight'] / 10}kg
                    </h3>
                    <div id="typeZoom${i}" class="type"> </div>
                </div>
            </div>
            <div class="myChart">
                <canvas id="myChart"></canvas>
            </div>
        </div>
        <h1 onclick="next(${i})">
            >
        </h1>
    </div>
`;
forTypeZoom(i, types)
}