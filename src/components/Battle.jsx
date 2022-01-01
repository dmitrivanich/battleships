import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

function Battle() {

  const playersNames = useSelector(state => state.games.playersNames)
  const playersFields = useSelector(state => state.games.playersFields)


  return (
    <div className='battle'>
      {playersNames.map((name, ind) => (
        <p>{name}</p>
      ))
      }

    </div>
  )
}

export default Battle
