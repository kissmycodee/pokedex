let allPokemon = [];
let url ='https://pokeapi.co/api/v2/pokemon/'
let numberOfPokemon = 30


async function loadPokemon() {
    for (let i = 0; i < numberOfPokemon; i++) {
        const pokemon_url = url + (i + 1);
        let response = await fetch(pokemon_url);
        currentPokemon = await response.json();
        allPokemon.push(currentPokemon);
        renderPokemonInfoMain(i);
        setTimeout(() => {
            document.getElementById(`load-sccren`).classList.add(`d-none`);
        }, "1600")

    }
}

function renderPokemonInfoMain(i) {
    let name = allPokemon[i][`name`];
    let types = allPokemon[i][`types`][0][`type`][`name`];
    let img = allPokemon[i][`sprites`][`other`][`dream_world`][`front_default`];
    let mainContainer = document.getElementById('pokedex');
    mainContainer.innerHTML += '';
    mainContainer.innerHTML += generateMainHtml(i, name, types, img);
    bgColor(i);
}


function generateMainHtml(i, name, types, img) {
    return `
     <div onclick="renderDialog(${i})"  class="container-main" id="background-color-main(${i})">
     <div class="main-info-container">

     <h1 id="pokemon-name">${name}</h1>
     <div class="second-home-info">
         <p id="home-info"> ${types} </p>
     </div>
 </div>
 <div class="main-container-image">
     <img src="${img}" id="pokomon-Image">
 </div>
 </div>
     `;
}


function bgColor(i) {
    let name = allPokemon[i].types[0].type.name;
    if (name) document.getElementById(`background-color-main(${i})`).classList.add(name);

}


// counts the types- 1, 2, 3, 4, 5 ...
function renderPokemonTypes(pokemon) {
    for (let index = 0; index < pokemon.types.length; index++) {
        const pokemonType = pokemon['types'][index]['type']['name'];
        document.getElementById(`types${pokemon.id}`).innerHTML += `<span id="pokemonFeature" class="${pokemonType}">${pokemonType}</span>`
    }
}

// pokemon 1,2,3,4,5,...
async function loadPokemonUrl(pokemonUrl) {
  const response = await fetch(pokemonUrl);
  const pokemonAsJSON = await response.json();
  return pokemonAsJSON;
}

function openPokemonHTML(pokemonId) {
    document.getElementById('openPokemon').classList.add('detail')
    openPokemon.innerHTML = openPokemonDetailHTML(pokemonId)
}

function closePokemonHTML() {
    document.getElementById('openPokemon').classList.remove('detail')
    openPokemon.innerHTML = ''
}

// return this function in openPokemon
function renderDialog(i) {
    let name = allPokemon[i][`name`];
    let types = allPokemon[i][`types`][0][`type`][`name`];
    let img = allPokemon[i][`sprites`][`other`][`dream_world`][`front_default`];
    let height = allPokemon[i][`height`];
    let weight = allPokemon[i][`weight`];
    document.getElementById(`dialog`).classList.remove(`d-none`);
    let mainContainer = document.getElementById('dialog');
    mainContainer.innerHTML = generateRenderDialogHtml(name, img, types, height, weight, i);
    for (let j = 0; j < 6; j++) {
        let attack = allPokemon[i][`stats`][j][`stat`][`name`];
        let nr = allPokemon[i][`stats`][j][`base_stat`];
        let nrBar = nr / 1.25;
        let mainContainer = document.getElementById('second-info-dialog');
        mainContainer.innerHTML += generateSpezInfoHtml(attack, nrBar, nr);
    }
    cardColor(i);
}


function notClose(event) {
    event.stopPropagation();
}


function closeDialog() {
    document.getElementById(`dialog`).classList.add(`d-none`);
}

function moveRight(i) {
    if (i < allPokemon.length - 1) {
        i++
    } else {
        i = 0
    }
    document.getElementById('dialog').innerHTML = ``;
    renderDialog(i);
}


function moveLeft(i) {
    if (i !== 0) {
        i--
    } else {
        i = allPokemon.length - 1
    }
    document.getElementById('dialog').innerHTML = ``;
    renderDialog(i);
}


function generateRenderDialogHtml(name, img, types, height, weight, i) {
    return `
<div class="container-spez-info" >
<div class="container-spez-info-width" onclick="notClose(event)" >
<div class="dialog-info" id="background-color-card(${i})" >
<h1>${name}</h1>
</div>
<div id="second-info-dialog" >
<div class="image" >
<img src="img/left.png" id="left-Image" onclick="moveLeft(${i})">
<img src="${img}" id="pokomon-Image">
<img src="img/right.png" id="right-Image" onclick="moveRight(${i})">
</div>
<div class="spez-over-info-container" >
<div class="spez-over-info" >
<span class="margin-bottom-spez" > <b> Typ </b> </span>
<span>${types}</span>
</div>
<div class="spez-over-info" >
<span class="margin-bottom-spez" > <b> Height</b></span>
<span>${height} ft</span>
</div>
<div class="spez-over-info" >
<span class="margin-bottom-spez" > <b> Weight</b></span>
<span>${weight} lbs</span>
</div>
</div>
</div>
</div>
</div>
`;
}

function generateSpezInfoHtml(attack, nrBar, nr) {
    return `
        <div class="spez-info-container">
    <div class="spez-info" >
    <div class="attack" > <b> ${attack}</b> </div>
    <div class="nr-diagram" > 
    <div class="nr-digram-bar" style="width: ${nrBar}%; background-color: green"> ${nr} </div>
    </div>
    </div>
    `
}

function cardColor(i) {
    let name = allPokemon[i].types[0].type.name;
    if (name) document.getElementById(`background-color-card(${i})`).classList.add(name)

}


// it renders the searched name if its in array 
function searchPokemon() {
    let input = document.getElementById('search').value;
    const filteredPokemons = pushedPokemons.filter(p => p.name.includes(input));

    if (search == '') {
        renderPokemons(pushedPokemons)
    } else {
        console.log(filteredPokemons);
        renderPokemons(filteredPokemons);
    }
}


