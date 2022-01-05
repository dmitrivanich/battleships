import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import Creation__Players from './Creation__Players';
import Creation__Fields from "./Creation__Fields";
import Battle from "./Battle.jsx";
import { NextIcon } from "../icons";

import { useSelector, useDispatch } from 'react-redux';
import { changeSizeOfField, changeShipsRate, addBot, addPlayer } from '../redux/gameSlice'

function Menu() {
  const dispatch = useDispatch()
  const [rules, setRules] = useState('standard')

  const standartRef = useRef(null)
  const anotherRef = useRef(null)

  const fieldSize = useSelector(state => state.games.fieldSize)
  const shipsRate = useSelector(state => state.games.shipsRate)

  const shipsRule = [4, 3, 2, 1, 0.4].map(value => Math.round(value * (fieldSize / 10)))

  useEffect(() => {
    dispatch(addBot(false))
    if (rules === 'standard') {
      dispatch(changeShipsRate(shipsRule))
      if (standartRef.current !== null) { standartRef.current.checked = true }
    } else {
      if (anotherRef.current !== null) { anotherRef.current.checked = true }
    }
  }, [fieldSize, rules])

  const changeSize = (size) => {
    dispatch(changeSizeOfField(size))
    setRules('standard')
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
                  max='30'
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
                      onClick={(e) => { setRules(e.target.value); e.target.checked = true }}

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
                            max={shipsRule[ind]}
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

            {//Для своего кол-ва кораблей убирает возможность выбрать 0 кораблей
              ((rules === 'standard') ||
                (rules === 'another' && shipsRate.some((el) => { return el > 0 }))
              ) &&
              <>
                <h2>ПРОТИВНИК:</h2>
                <Link
                  to="/players"
                  className="toCreate players"
                >ЧЕЛОВЕК<NextIcon /></Link>

                <Link
                  to="/fields"
                  className="toCreate bot"
                  onClick={() => {
                    dispatch(addBot(true))
                    dispatch(addPlayer('HUMAN'))
                  }}
                >КОМПЬЮТЕР<NextIcon /></Link>
              </>

            }


          </>
        } />

        <Route path="/players" element={<Creation__Players />} />
        <Route path="/fields" element={<Creation__Fields />} />
        <Route path="/battle" element={<Battle />} />
      </Routes>
    </div >
  );
}

export default Menu; 