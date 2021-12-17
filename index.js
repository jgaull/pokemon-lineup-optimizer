
import fs from 'fs-extra'
import Pokedex from 'pokedex-promise-v2'
const pokedex = new Pokedex()

async function buildCache() {

    const generation = await pokedex.getResource('https://pokeapi.co/api/v2/generation/4/')
    fs.writeJsonSync('./generation-4.json', generation)

    const pokemon = await pokedex.getPokemonByName(1)
    fs.writeJsonSync('./pokedex.json', pokemon)

    const move = await pokedex.getMoveByName(1)
    fs.writeJsonSync('./moves.json', move)

    console.log('done!')
}

buildCache()