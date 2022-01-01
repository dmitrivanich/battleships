import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayer, removePlayer, clearPlayers } from '../redux/gameSlice'
import { CreateIcon, TrashIcon } from "../icons"


export default function CreationPlayers() {
  const playersNames = useSelector(state => state.games.playersNames)
  const [playerName, setPlayerName] = useState('')
  const fieldSize = useSelector(state => state.games.fieldSize)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clearPlayers()) //Если меняется размер полей - удаляются предыдущие игроки
  }, [fieldSize])

  const createPlayer = () => {
    dispatch(addPlayer(playerName))
    setPlayerName('')
  }

  const deletePlayer = (index) => {
    dispatch(removePlayer(index))
  }



  return (
    <div className='creationPlayers'>
      <h1>Список игроков:</h1>

      <ul className='playersList'>
        {playersNames.map((name, ind) => (
          <div key={ind}>
            {name} <button onClick={() => deletePlayer(ind)}>
              <TrashIcon />
            </button>
          </div>

        ))}
      </ul>
      <div className="options">

        <input type="text"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
        />

        <button className="createPlayer" onClick={createPlayer}>Create <CreateIcon /></button>
      </div>

      <Link to="/fields" className='toCreate fields'>Создать поля</Link>

    </div>
  )
}
