import {StarButton} from './StarButton'
import { Card } from 'antd';
import { Capitalize } from '../utils/functions';
import { PokemonHabilities } from './PokemonHabilities';
import './PokemonList.css';
import { useDispatch } from 'react-redux';
import { setFavorite } from '../slices/dataSlice';

const PokemonCard = ({ pokemon }) => {

  const dispatch = useDispatch();

    const handlerOnFavorite = () => {
      dispatch(setFavorite({pokemonId:  pokemon.id}))
    }

  return (
    <Card
      title={Capitalize(pokemon.name) || ''}
      cover={
        <img 
          src={pokemon.sprites.other.home.front_default || ''}
          alt={pokemon.name}
        />
      }
      extra={<StarButton pokemon={pokemon} onClick={handlerOnFavorite}/>}
    >   
    <PokemonHabilities pokemon={pokemon} />
    </Card>
  );
};


export default PokemonCard;