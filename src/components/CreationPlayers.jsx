import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addPlayerName, removePlayerName } from '../redux/gameSlice'
import { CreateIcon, TrashIcon } from "../icons"


export default function CreationPlayers() {
  const playersNames = useSelector(state => state.games.playersNames)
  const [playerName, setPlayerName] = useState('')

  const dispatch = useDispatch()

  const createPlayer = () => {
    dispatch(addPlayerName(playerName))
    setPlayerName('')
  }

  const deletePlayer = (index) => {
    dispatch(removePlayerName(index))
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

        <button className="create" onClick={createPlayer}>Create <CreateIcon /></button>
      </div>

      <Link to="/fields" className='toCreate fields'>Создать поля</Link>

    </div>
  )
}