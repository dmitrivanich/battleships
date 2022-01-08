import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import BattleField from '../components/BattleField';
import { removePlayer } from '../redux/gameSlice'
import { Link } from 'react-router-dom';

function Battle() {
  const playersNames = useSelector(state => state.games.playersNames)
  const playersColors = useSelector(state => state.games.playersColors)
  const vsBot = useSelector(state => state.games.vsBot)
  const dispatch = useDispatch()
  const allIndices = playersNames.map((el, ind) => ind)
  const [attakerIndex, setAttakerIndex] = useState(0)
  const attaсkedIndices = allIndices.filter((el, ind) => ind !== attakerIndex)
  const [attakedIndex, setAttakedIndex] = useState(0)
  const [battleStatus, setBattleStatus] = useState(true)
  const [winner, setWinner] = useState(null)

  function shoot() {
    setTimeout(() => changePlayer(), 500)
  }

  function changePlayer() {
    if (attakedIndex === attaсkedIndices.length - 1) {
      setAttakedIndex(0)
      if (attakerIndex === allIndices.length - 1) { setAttakerIndex(0) }
      else { setAttakerIndex(attakerIndex + 1) }
    } else { setAttakedIndex(attakedIndex + 1) }
  }

  function deleteDestroyed() {
    setTimeout(() => { dispatch(removePlayer(attaсkedIndices[attakedIndex])) }, 500)
  }

  function gameOver(index) {
    console.log('корабли закончились у игрока с индексом', index)
    if (!vsBot) {
      if (playersNames.length === 2) {
        setTimeout(() => setBattleStatus(false), 500)
      } else {
        deleteDestroyed()
      }
    } else {
      if (index === 1) {
        setWinner(0)
        console.log('Победил - ЧЕЛОВЕК')
      } else {
        setWinner(1)
        console.log('Победил - КОМПЬЮТЕР')
      }
    }
  }

  return (<>
    {!vsBot && !battleStatus &&
      <div className="resultOfBattle">
        <h1><span style={{ color: playersColors[attakerIndex] }}>{playersNames[attakerIndex]}</span> IS A WINNER!</h1>
        <Link to='/' ><h3 className='restart'>BACK TO MENU</h3></Link>
      </div>
    }

    {vsBot && !battleStatus &&
      <div className="resultOfBattle">
        <h1><span style={{ color: playersColors[attakerIndex] }}>{playersNames[attakerIndex]}</span> IS A WINNER!</h1>
        <Link to='/' ><h3 className='restart'>BACK TO MENU</h3></Link>
      </div>
    }

    {battleStatus && !vsBot && //ДЛЯ БОЯ ПРОТИВ ИГРОКОВ
      <div className="battle">
        <div className="field">
          <h2>
            <span style={{ color: playersColors[attakerIndex] }}
            >{playersNames[attakerIndex]}</span> атакует <span style={{
              color: playersColors[attaсkedIndices[attakedIndex]]
            }}>{playersNames[attaсkedIndices[attakedIndex]]}</span>
          </h2>

          <BattleField
            index={attaсkedIndices[attakedIndex]}
            miss={shoot}
            shipsOut={gameOver}
          />
        </div>
      </div>}

    {battleStatus && vsBot && //ДЛЯ БОЯ ПРОТИВ КОМПЬЮТЕРА

      <div className="battle">
        <div className="field">
          <h2>ПОЛЕ <span style={{ color: playersColors[1] }}>КОМПЬЮТЕРА</span></h2>
          <BattleField
            index={1}
            miss={shoot}
            shipsOut={gameOver}
            winner={winner}
          />
        </div>
        <div className="field">
          <h2>ПОЛЕ <span style={{ color: playersColors[0] }}>ЧЕЛОВЕКА</span></h2>
          <BattleField
            index={0}
            miss={shoot}
            shipsOut={gameOver}
            winner={winner}
          />
        </div>

      </div>}
  </>
  )
}

export default Battle
