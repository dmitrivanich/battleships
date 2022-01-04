import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BattleField from '../components/BattleField';
import { removePlayer } from '../redux/gameSlice'
import { Link } from 'react-router-dom';

function Battle() {
  const playersNames = useSelector(state => state.games.playersNames)
  const playersColors = useSelector(state => state.games.playersColors)
  const dispatch = useDispatch()
  const allIndices = playersNames.map((el, ind) => ind)
  const [attakerIndex, setAttakerIndex] = useState(0)
  const ataсkedIndices = allIndices.filter((el, ind) => ind !== attakerIndex)
  const [attakedIndex, setAttakedIndex] = useState(0)
  const [battleStatus, setBattleStatus] = useState(true)

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

  function deleteLoser() {
    setTimeout(() => { dispatch(removePlayer(ataсkedIndices[attakedIndex])) }, 500)
  }

  function gameOver(index) {
    console.log('корабли закончились у игрока с индексом', index)
    if (playersNames.length === 2) {
      setBattleStatus(false)
    } else {
      deleteLoser()
    }
  }

  return (<>
    {!battleStatus &&
      <div className="resultOfBattle">
        <h1><span style={{ color: playersColors[attakerIndex] }}>{playersNames[attakerIndex]}</span> IS A WINNER!</h1>
        <Link to='/' ><h3 className='restart'>BACK TO MENU</h3></Link>
      </div>
    }

    {battleStatus &&

      <div className="battle">
        <h1>BATTLE!</h1>
        <h2>
          <span style={{ color: playersColors[attakerIndex] }}
          >{playersNames[attakerIndex]}</span> атакует <span style={{
            color: playersColors[ataсkedIndices[attakedIndex]]
          }}>{playersNames[ataсkedIndices[attakedIndex]]}</span>
        </h2>

        {!battleStatus && <div className='gameOver'>

        </div>}


        <BattleField
          index={ataсkedIndices[attakedIndex]}
          miss={shoot}
          shipsOut={gameOver}
        />
      </div>}
  </>
  )
}

export default Battle
