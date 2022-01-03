import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Creation__Players from './Creation__Players';
import Creation__Fields from "./Creation__Fields";
import Battle from "./Battle.jsx";
import { NextIcon } from "../icons";

import { useSelector, useDispatch } from 'react-redux';
import { changeSizeOfField, changeShipsRate } from '../redux/gameSlice'

function Menu() {
  const dispatch = useDispatch()
  const [rules, setRules] = useState('standard')

  const standartRef = useRef(null)
  const anotherRef = useRef(null)

  const fieldSize = useSelector(state => state.games.fieldSize)
  const shipsRate = useSelector(state => state.games.shipsRate)

  useEffect(() => {
    if (rules === 'standard') {
      dispatch(changeShipsRate([4, 3, 2, 1, 0.4].map(value => Math.round(value * (fieldSize / 10)))))
      if (standartRef.current !== null) { standartRef.current.checked = true }
    } else {
      if (anotherRef.current !== null) { anotherRef.current.checked = true }
    }
  }, [fieldSize, rules])

  const changeSize = (size) => {
    dispatch(changeSizeOfField(size))
  }
  const changeRate = (ind, value) => {
    let newRate = shipsRate.slice()
    newRate.splice(ind, 1, value)
    dispatch(changeShipsRate(newRate))
  }

  return (
    <div className="menu">
      <Routes>
        <Route path="/" element={
          <>
            <h1>МОРСКОЙ БОЙ</h1>

            <div className="options">
              <div className="size">
                <p>РАЗМЕР ПОЛЕЙ:</p>
                <p className='fieldSizeValue'>{`${fieldSize}x${fieldSize}`}</p>
                <input
                  onChange={(e) => {
                    changeSize(+e.target.value)
                  }}
                  id='fieldSize'
                  type="range"
                  min='10'
                  max='200'
                  step="2"
                  value={fieldSize} />

              </div>

              <div className="ships">
                <p>КОЛИЧЕСТВО КОРАБЛЕЙ:</p>




                <ul className="choices">
                  <li>
                    <input
                      type="radio"
                      id="choice1"
                      name="mod"
                      value="standard"
                      ref={standartRef}
                      onClick={(e) => { setRules(e.target.value); e.target.checked = false }}

                    />
                    <label htmlFor="choice1"> СТАНДАРТНОЕ</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      id="choice2"
                      name="mod"
                      value="another"
                      ref={anotherRef}
                      onClick={(e) => setRules(e.target.value)}

                    />
                    <label htmlFor="choice2"> ДРУГОЕ</label>
                  </li>


                </ul>



                {(rules === 'another') &&
                  <>
                    <ul className="shipsValues">
                      {shipsRate.map((el, ind) => (
                        <div key={ind}>
                          <li id="valueShip"
                            style={{
                              color: `rgb(0,${100 - (ind * 20)},${200 - (ind * 20)})`
                            }}
                          >{el} ({"■".repeat(ind + 1)})</li>
                          <input
                            type="range"
                            name=""
                            id="shipsRate"
                            min='0'
                            max='200'
                            value={el}
                            onChange={(e) => changeRate(ind, e.target.value)}
                            style={{
                              background: `rgb(0,${100 - (ind * 20)},${200 - (ind * 20)})`,
                            }} />
                        </div>

                      ))}
                    </ul>
                  </>
                }

              </div>
            </div>

            <Link
              to="/players"
              className="toCreate players"
            >СОЗДАТЬ ИГРОКОВ <NextIcon /></Link>
          </>
        } />

        <Route path="/players" element={<Creation__Players />} />
        <Route path="/fields" element={<Creation__Fields />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </div>
  );
}

export default Menu; 