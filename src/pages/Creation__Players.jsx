import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer, clearPlayers } from '../redux/gameSlice'
import { CreateIcon } from "../icons"


export default function Creation__Players() {
  const playersNames = useSelector(state => state.games.playersNames)
  const [playerName, setPlayerName] = useState('')
  const fieldSize = useSelector(state => state.games.fieldSize)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPlayers()) //Если меняется размер полей - удаляются предыдущие игроки
  }, [fieldSize])

  const createPlayer = () => {
    if (playerName.length > 0) {
      dispatch(addPlayer(playerName))
      setPlayerName('')
    }
  }

  const deletePlayer = (index) => {
    dispatch(removePlayer(index))
  }



  return (
    <div className='creationPlayers'>
      <h1>СОЗДАНИЕ ИГРОКОВ</h1>

      <ul className='playersList'>
        {playersNames.map((name, ind) => (
          <div key={ind} className='playersList__li' onClick={() => deletePlayer(ind)}>
            {name}
          </div>

        ))
        }
      </ul >
      <div className="createPlayers">

        <input type="text"
          className='textInput'
          value={playerName}
          placeholder='Введите имя игрока...'
          onChange={e => setPlayerName(e.target.value)}
        />


        <button className="createPlayerBtn" onClick={createPlayer}>CREATE <CreateIcon /></button>
        {(playersNames.length > 1) &&
          <Link to="/fields" className='toCreate fields'>CREATE FIELDS</Link>
        }
      </div>




    </div >
  )
}
