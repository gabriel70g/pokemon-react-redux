import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setPokemonOffset } from '../slices/dataSlice';
import './ButtonsNav.css';



const ButtonsNav = () => {

    const dispatch =  useDispatch();

    const [count, setCount] = useState(0);
  
  
    const increase = () => {
      setCount(count + 1);
    };
  
    const decline = () => {
      let newCount = count - 1;
      if (newCount < 0) {
        newCount = 0;
      }
      setCount(newCount);
    };
    const declineFive = () => {
        let newCount = count - 5;
        if (newCount < 0) {
          newCount = 0;
        }
        setCount(newCount);
      };
  
    const increaseFive = () => {
      let newCount = count + 5;
      setCount(newCount);
    };
  

    useEffect(() => {
        dispatch(setPokemonOffset(count*20))
        }, [count])
    

    return (

        <>
        <Badge count={count} className="badge" >
          <Avatar shape="square" size="large" />
        </Badge>
        <ButtonGroup className='buttonGroup'>
        <Button onClick={declineFive}>
            -5
          </Button>
          <Button onClick={decline}>
            <MinusOutlined />
          </Button>
          <Button onClick={increase}>
            <PlusOutlined />
          </Button>
          <Button onClick={increaseFive}>
            +5
          </Button>
        </ButtonGroup>
      </>
    )
}

export default ButtonsNav;