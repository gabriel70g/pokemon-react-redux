import axios from 'axios';
import { POKEMON_URL, POKEMON_URL_151, POKEMON_URL_LIST, POKEMON_URL_LIST_PROBE } from '../utils/constantes';

export const getPokemon = (offSet) => {
    return axios
        .get(POKEMON_URL_151 + '&offset=' + offSet)
        .then(res => res.data.results.map(pok => {
            return { ...pok, id: parseInt(pok.url.split('/')[pok.url.split('/').length - 2]), isFavorite: false }
        })
        )
        .catch((err) => console.log(err));
};

export const getPokemonDetails = async (pokemon) => {

    return await axios
        .get(pokemon.url)
        .then(res => {
            return { ...res.data, isFavorite: false }
        }
        )
        .catch((err) => console.log(err));
}

const getPokemonListProbe = async () => {
    return await axios
        .get(POKEMON_URL_LIST_PROBE)
        .then(res => res.data.count)
        .catch((err) => console.log(err));
}

export const getPokemonList = async () => {
    const pokemonLimit = await getPokemonListProbe();

    return await axios
        .get(POKEMON_URL_LIST + pokemonLimit)
        .then(res => res.data.results)
        .catch((err) => console.log(err));
}




