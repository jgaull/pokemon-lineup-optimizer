
import fs from 'fs-extra'
import { combinations } from 'combinatorial-generators'
import cloneDeep from 'clone-deep'

function buildList() {

    const moves = buildMovesLookup()
    const pokemonList = fs.readJsonSync('./cache/pokemon.json')

    /*
    const list = []
    pokemonList.forEach(pokemon => {
        
        const sequences = [...combinations(pokemon.moves, 2)]
        //console.log(`there are ${sequences.length} possible permutations of ${firstPokemon.name}`)
        list.push(...sequences)
    })
    */

    const pokemon = pokemonList[0]
    const newPokemon = cloneDeep(pokemon)
    const moveCombinations = [...combinations(pokemon.moves, 4)]
    console.log(`There are ${moveCombinations.length} permutations of ${pokemon.name}`)
    let i = 0
    const pokemonPermutations = moveCombinations.map(moves => {

        const newPokemon = cloneDeep(pokemon)
        newPokemon.moves = moves

        if (i % 10000 == 0) {
            console.log(`Mapped ${Math.round((i / moveCombinations.length) * 100)}% of ${pokemon.name}'s permutations`)
        }

        i++
        return newPokemon
    })

    fs.writeJsonSync('./cache/turtwig.json', pokemonPermutations)
    
    //console.log(`there are ${pokemonPermutations.length} possible permutations of ${pokemon.name}`)
    //console.log(`Generated a list of ${list.length} possible pokemon permutations.`)
}

function buildMovesLookup() {

    const moves = fs.readJsonSync('./cache/moves.json')

    const hash = {}
    moves.forEach(move => {
        hash[move.name] = move
    })

    return hash
}

buildList()