import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Field from "./Field"

export default function CreationField() {
  const size = useSelector(state => state.games.fieldSize)
  const playersNames = useSelector(state => state.games.playersNames)
  const playersFields = useSelector(state => state.games.playersFields)
  const [selectedPlayer, setSelectedPlayer] = useState(0)

  const nextPlayer = () => {
    setSelectedPlayer(+selectedPlayer + 1)
  }

  return <div className='creationFields'>

    <h1>СОЗДАНИЕ ПОЛЕЙ</h1>

    {playersNames.map((name, index) => {
      if (selectedPlayer === index) {
        return (<div className="grid" key={index}>
          <Field
            names={playersNames}
            fields={playersFields}
            fieldSize={size}
            index={index}
            numberOfSelectedPlayer={selectedPlayer + 1}
            nextPlayer={nextPlayer}
          />
        </div>)
      } else return (null)
    })}

    <button onClick={() => { }}>TEST</button>
  </div >
}

