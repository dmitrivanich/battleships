import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import BattleField from './BattleField';

function Battle() {
  const [attakerIndex, setAttakerIndex] = useState(0)
  const [attakedIndex, setAttakedIndex] = useState(0)
  const playersNames = useSelector(state => state.games.playersNames)
  const allIndices = playersNames.map((el, ind) => ind)
  const ataсkedIndices = allIndices.filter((el, ind) => ind !== attakerIndex)

  function shoot() {
    function changePlayer() {
      if (attakedIndex === ataсkedIndices.length - 1) {
        setAttakedIndex(0)
        if (attakerIndex === allIndices.length - 1) { setAttakerIndex(0) }
        else { setAttakerIndex(attakerIndex + 1) }
      } else { setAttakedIndex(attakedIndex + 1) }
    }
    setTimeout(changePlayer, 500)
  }

  return (
    <div className="battle">

      <h2>{playersNames[attakerIndex]} атакует {playersNames[ataсkedIndices[attakedIndex]]}</h2>


      <BattleField
        index={ataсkedIndices[attakedIndex]}
        miss={shoot}
      />
    </div>
  )
}

export default Battle
