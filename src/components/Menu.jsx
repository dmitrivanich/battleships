import React from "react";
import { Routes, Route, Link } from 'react-router-dom';
import CreationPlayers from './CreationPlayers';
import CreationField from "./CreationField.jsx";
import Battle from "./Battle.jsx";
import { NextIcon } from "../icons";

import { useSelector, useDispatch } from 'react-redux';
import { changeSizeOfField } from '../redux/gameSlice'

function Menu() {
  // const [fieldSize, setFieldSize] = useState(10)

  const fieldSize = useSelector(state => state.games.fieldSize)

  const dispatch = useDispatch()

  const changeSize = (size) => {
    dispatch((changeSizeOfField(size)))
  }

  return (
    <div className="menu">
      <Routes>
        <Route path="/" element={
          <>
            <h1>МОРСКОЙ БОЙ</h1>

            <div className="options">
              <p>Размер поля:</p>
              <p className='fieldSizeValue'>{`${fieldSize}x${fieldSize}`}</p>
              <input
                onChange={(e) => {
                  changeSize(+e.target.value)
                  console.log('1')
                }}
                id='fieldSize'
                type="range"
                min='8'
                max='20'
                step="2"
                value={fieldSize} />
            </div>

            <Link
              to="/players"
              className="toCreate players"
            >СОЗДАТЬ ИГРОКОВ <NextIcon /></Link>
          </>
        } />

        <Route path="/players" element={<CreationPlayers />} />
        <Route path="/fields" element={<CreationField />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </div>
  );
}

export default Menu; 