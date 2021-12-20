import React from 'react'
import { Link } from 'react-router-dom'

function Players() {
  

  return (
    <>
      <h1>Список игроков:</h1>
      <ul>
        <li>Шмедов</li>
        <li>Снобедов</li>
        <li>Помадов</li>
        <li>Тумаков</li>
      </ul>
      <Link to="/fields" className='toCreate fields'>Создать поля</Link>
    </>
  )
}

export default Players
