import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Col, Spin } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
import logo from './statics/logo.svg';
import { fetchPokemonFilter, fetchPokemonsOffset, fetchPokemonListSearcher, fetchPokemonsWithDetails, setPokemonOffset } from './slices/dataSlice';
import './App.css';
import ButtonsNav from './components/ButtonsNav';


function App() {

  const offSet = useSelector(state => (state.data.offset))

  const pokemons = useSelector(state => (state.data.pokemons), shallowEqual)

  const loading = useSelector(state => state.ui.loading);

  const textSearch = useSelector(state => (state.data.textSearch))

  const pokemonList = useSelector(state => (state.data.list))

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(fetchPokemonListSearcher());
  }, [])


  useEffect(() => {
    dispatch(fetchPokemonsOffset(offSet));
  }, [offSet]);

  useEffect(() => {

    if (textSearch.length > 0) {
      const pokemonFilter = pokemonList;

      const pokemonListFilter = pokemonFilter.filter(pok => pok.name.includes(textSearch))

      if (pokemonFilter.length > 0) {
        dispatch(fetchPokemonFilter(pokemonListFilter));
        dispatch(setPokemonOffset(0));
      }
    }

    if (textSearch.length === 0) {
      dispatch(fetchPokemonsWithDetails());
      dispatch(setPokemonOffset(0));
    }

  }, [textSearch])


  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      <Col span={8} offset={2}>
        <ButtonsNav />
      </Col>
      {loading ? (
        <Col offset={12} className="spin">
          <Spin spinning size='large' />
        </Col>
      ) : (
        <PokemonList pokemons={pokemons} />
      )}
    </div>
  );
}

export default App;
