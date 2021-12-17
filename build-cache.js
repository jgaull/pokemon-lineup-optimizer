
import fs from 'fs-extra'
import Pokedex from 'pokedex-promise-v2'
const pokedexAPI = new Pokedex()

const REGEX = /https:\/\/pokeapi.co\/api\/v2\/[a-z\-]+\/([0-9]+)\//

async function buildCache() {

    const generation = await pokedexAPI.getResource('https://pokeapi.co/api/v2/generation/4/')
    fs.writeJsonSync('./cache/generation.json', generation)

    // ID 5 is Sinnoh Regions Brilliant Diamond and Shining Pearl https://pokeapi.co/api/v2/pokedex/5/
    const pokedex = await pokedexAPI.getPokedexByName(5)
    fs.writeJsonSync('./cache/pokedex.json', pokedex)

    const pokemonRequests = pokedex.pokemon_entries.map(pokemon => {
        
        const name = pokemon.pokemon_species.name
        //need the example URL
        const id = pokemon.pokemon_species.url.match(REGEX)[1]
        return pokedexAPI.getPokemonByName(id)
    })

    let pokemon
    try {
        pokemon = await Promise.all(pokemonRequests)
    } 
    catch (error) {
        console.log(`error building pokemon list: ${error.message}`)
    }

    fs.writeJsonSync('./cache/pokemon.json', pokemon)

    const movesRequests = generation.moves.map(move => {
        const id = move.url.match(REGEX)[1]
        return pokedexAPI.getMoveByName(id)
    })

    const moves = await Promise.all(movesRequests)
    fs.writeJsonSync('./cache/moves.json', moves)

    console.log('done building cache!')
}

buildCache()