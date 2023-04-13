let pushedPokemons = [];

async function loadPokemon() {
  let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=51`;
  let response = await fetch(url);
  let amount = await response.json();

  console.log("Hier sind die Anzahl Resultate", amount);

  renderPokemonAmount(amount);
}

// renders the items with each url and pushes it to array with 50 pokemons
async function renderPokemonAmount(amount) {
  for (let i = 0; i < amount.results.length; i++) {
    const pokemon = await loadPokemonUrl(amount["results"][i]["url"]);
    pushedPokemons.push(pokemon);
    renderPokemon(pokemon)
  }
}


function renderPokemon(pokemon) {
    const pokemonName = pokemon['forms'][0]['name']
    const pokemonImage = pokemon ['sprites']['other']['dream_world']['front_default']
    const pokemonType = pokemon['types'][0]['type']['name']
    const pokemonID =  pokemon['id']

     document.getElementById('pokemon-card').innerHTML += `

        <div class="pokemon-cards" onclick="openPokemonHTML(${pokemon.id})">
            <div>
                <div class="pokemon-id"><h2>#${pokemonID}</h2></div>
                <img id="pokemon-image" class="pokemon-image" src="${pokemonImage}">
                <h3 id="pokemon-name">${pokemonName}</h3>
                <div id="types${pokemon.id}"></div>
            </div>
        </div>
     `
     renderPokemonTypes(pokemon) 
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
function openPokemonDetailHTML(pokemonId) {
    const pokemon = pushedPokemons.find(p => p.id == pokemonId)

    const pokemonName = pokemon['forms'][0]['name']
    const pokemonImage = pokemon ['sprites']['other']['dream_world']['front_default']
    const pokemonType = pokemon['types'][0]['type']['name']
    const pokemonID =  pokemon['id']
    const pokemonAbility = pokemon['abilities'][0]['ability']['name']
    const pokemonHeight = pokemon['height']
    const pokemonWeight = pokemon['weight']
    const pokemonStat = pokemon['stats'][0]['base_stat']
    const pokemonAttack = pokemon['stats'][0]['base_stat']

    return `
    <div class="detail">
    <div class="detailCard ${pokemonType}">
       
        <div class="detailButton" >
            <h2>#${pokemonID}</h2>
            <button onclick="closePokemonHTML()" class="btn" style="color: #020506;">X</button>
        </div>
        <div class="detailName">
        <h2>
            ${pokemonName}
        </h2>
        </div>
        <div class="detailImg">
            <img src="${pokemonImage}">
        </div>
        <div class="containerSkills">
        <div class="skills">
            <p>Ability: <span> ${pokemonAbility}</span></p>
            <p>Height: <span> ${pokemonHeight}m</span></p>
            <p>Weight: <span> ${pokemonWeight}kg</span></p>
            <p>Base-State: <span> ${pokemonStat}</span> </p>
            <p>Attack: <span> ${pokemonAttack}</span> </p>
         </div>
        </div>
    </div>
</div>    
    `
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


function renderPokemons(pokemons) {
    document.getElementById('pokemon-card').innerHTML = '';
    for (let j = 0; j < pokemons.length; j++) {
        renderPokemon(pokemons[j])
    }
}