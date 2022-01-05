import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Field from "../components/GeneratedField"


export default function CreationField() {
  const playersNames = useSelector(state => state.games.playersNames)
  const playersColors = useSelector(state => state.games.playersColors)
  const [selectedPlayer, setSelectedPlayer] = useState(0)

  const nextPlayer = () => {
    setSelectedPlayer(+selectedPlayer + 1)
  }

  return <div className='creationFields'>
    {playersNames.map((name, index) => {
      if (selectedPlayer === index) {
        return (<div key={index}>
          <h1>СОЗДАНИЕ ПОЛЯ ДЛЯ: <span style={{ color: playersColors[index] }}>{name}</span></h1>
          <Field
            index={index}
            numberOfSelectedPlayer={selectedPlayer + 1}
            nextPlayer={nextPlayer}
          />
        </div>)
      } else return (null)
    })}
  </div >
}

