import React from 'react'
import { Capitalize } from '../utils/functions';

export const PokemonHabilities = ({ pokemon }) => {

  const abilityName = pokemon.types.map(abi => Capitalize(abi.type.name)).join(', ');

  return (
    <>
      {
        <span>{abilityName}</span>
      }
    </>
  )
}
