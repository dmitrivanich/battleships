import React from 'react'
import { useSelector } from 'react-redux'
import Field from "./Field"

export default function CreationField() {
  const size = useSelector(state => state.games.fieldSize)
  const playersNames = useSelector(state => state.games.playersNames)
  const playersFields = useSelector(state => state.games.playersFields)


  return <div className='creationFields'>

    <h1>СОЗДАНИЕ ПОЛЕЙ</h1>

    {playersNames.map((player, index) => (
      <div className="grid" key={index}>
        <Field names={playersNames} fields={playersFields} fieldSize={size} index={index} />
      </div>
    ))}

    <button onClick={() => { }}>TEST</button>
  </div >
}

