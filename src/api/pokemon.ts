import { GetAllPokemonParams } from "../type/pokemon";

async function getAllPokemon(params: GetAllPokemonParams) {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${params.limit}&offset=${params.offset}`
  ).then((res) => res.json());
}

async function getPokemon(url: string) {
  return fetch(url).then((res) => res.json());
}

export { getAllPokemon, getPokemon };
