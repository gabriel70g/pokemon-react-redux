import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import { setPokemoFilterList } from '../slices/dataSlice';
import  useDebounce  from '../hooks/useDebounce'
import { useEffect, useState } from 'react';

const Searcher = () => {

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 500)

  const dispatch = useDispatch();

  const searchPokemon = (e) => {
    setValue(e.target.value);
  }

  useEffect(() => {
    dispatch(setPokemoFilterList(value))
  },[debouncedValue])

  return <Input.Search placeholder='Buscar...' onChange={searchPokemon}/>;
};

export default Searcher;
