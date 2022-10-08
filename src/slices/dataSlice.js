import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPokemon, getPokemonDetails, getPokemonList } from "../api";
import { setLoading } from "./uiSlice";

const initialState = {
    pokemons: [],
    offset: 0,
    textSearch: ''
}

export const fetchPokemonsWithDetails = createAsyncThunk(
    'data/fetchPokemonsWithDetails',
    async (_, { dispatch }) => {
        dispatch(setLoading(true));
        const pokemonRes = await getPokemon();
        const pokemonDetail = await Promise.all(
            pokemonRes.map(pokemon => getPokemonDetails(pokemon))
        )
        // const pokemonListSearcher = await getPokemonList();
        // dispatch(setPokemonSearch(pokemonListSearcher))

        dispatch(setPokemons(pokemonDetail))
        dispatch(setLoading(false));
    }

)

export const fetchPokemonListSearcher = createAsyncThunk(
    'data/fetchPokemonListSearcher',
    async (_, { dispatch }) => {
        const pokemonListSearcher = await getPokemonList();
        dispatch(setPokemonSearch(pokemonListSearcher))

    }
)

export const fetchPokemonsOffset = createAsyncThunk(
    'data/fetchPokemonsOffset',
    async (offset, { dispatch }) => {
        dispatch(setLoading(true));
        const pokemonRes = await getPokemon(offset);
        const pokemonDetail = await Promise.all(
            pokemonRes.map(pokemon => getPokemonDetails(pokemon))
        )
        dispatch(setPokemons(pokemonDetail))
        dispatch(setLoading(false));
    }

)

export const fetchPokemonFilter = createAsyncThunk(
    'data/fetchPokemonFilter',
    async (pokemons, {dispatch}) => {
        dispatch(setLoading(true));
        const pokemonDetail = await Promise.all(
            pokemons.map(pokemon => getPokemonDetails(pokemon))
        )

        dispatch(setPokemons(pokemonDetail))
        dispatch(setLoading(false));
    }
)

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload
        },
        setFavorite: (state, action) => {
            const currentPokemon = state.pokemons.findIndex(pokemon => {
                return pokemon.id === action.payload.pokemonId
            });

            if (currentPokemon >= 0) {
                const isFavorite = state.pokemons[currentPokemon].isFavorite;
                state.pokemons[currentPokemon].isFavorite = !isFavorite;
            }
        },
        setPokemonSearch: (state, action) => {
            state.list = action.payload;
        },

        setPokemonOffset: (state, action) => {
            state.offset = action.payload;
        },
        setPokemoFilterList: (state, action) => {
            state.textSearch = action.payload;
        }


    }
})


export const { setFavorite, setPokemons, setPokemonSearch, setPokemonOffset, setPokemoFilterList } = dataSlice.actions

export default dataSlice.reducer;