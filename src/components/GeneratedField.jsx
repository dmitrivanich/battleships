import React, { useRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addField } from "../redux/gameSlice"
import { Link } from "react-router-dom"

function Field({ index, nextPlayer, numberOfSelectedPlayer }) {
  const playersFields = useSelector(state => state.games.playersFields)
  const field = playersFields[index]
  const size = useSelector(state => state.games.fieldSize)
  const shipsRate = useSelector(state => state.games.shipsRate)
  const names = useSelector(state => state.games.playersNames)

  const [quantityShips, setQuantityShips] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 })
  const [minimumOfShips, setMinimumOfShips] = useState(shipsRate)
  const [arrayBoxes, setArrayBoxes] = useState(field)


  const canvasRef = useRef(null)
  const shipListRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setMinimumOfShips([...shipsRate].map(value => Math.round(value)))
    setArrayBoxes(doRules(field).field)
    canvasRef.current.style.width = `${size * 50}px`
    canvasRef.current.style.height = canvasRef.current.style.width
  }, [field, size])

  useEffect(() => {
    function drawGrid() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      const box = {
        width: canvas.width / arrayBoxes.length,
        height: canvas.height / arrayBoxes.length
      }

      function fillField() {//Заполняет поле квадратами, учитывая цвет клетки
        if (arrayBoxes.length > 0) {
          for (let i = 0; i < arrayBoxes.length; i++) {
            arrayBoxes[i].forEach((el, ind) => {
              let space = 500 / size
              let x = Math.round((box.width) * (ind))
              let y = Math.round(box.height * i)
              // В массиве ArrayBoxes содержатся элементы 0(пустая клетка) и 1(корабль)
              // space - отступ между клетками 
              function drawBox() {//рисует клетку
                ctx.lineWidth = 200 / size
                ctx.fillStyle = "#8da6bb"
                ctx.fillRect(x, y, box.width, box.height)
                ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
                ctx.fillStyle = "#b8c9d6";
                // ctx.fillRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
              }

              switch (el) {
                case 5:
                  ctx.strokeStyle = `rgb(0,0,0)`;
                  drawBox();
                  break;
                case 4:
                  ctx.strokeStyle = `rgb(0,${10 * 2},${20 * 4})`;
                  drawBox();
                  break;
                case 3:
                  ctx.strokeStyle = `rgb(0,${10 * 6},${20 * 6})`;
                  drawBox();
                  break;
                case 2:
                  ctx.strokeStyle = `rgb(0,${10 * 8},${20 * 8})`;
                  drawBox();
                  break;
                case 1:
                  ctx.strokeStyle = `rgb(0,${10 * 10},${20 * 10})`;
                  drawBox();
                  break;
                default:
                  ctx.strokeStyle = "white";
                  ctx.lineWidth = 300 / size
                  ctx.fillStyle = `#b8c9d6`
                  ctx.fillRect(x, y, box.width, box.height)
                  ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
                  ctx.fillStyle = "#a3b7c5";
                  ctx.fillRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
                  break;

              }
            })
          }
        }
      }

      fillField()
    }
    drawGrid()
    //рендерит сетку и корабли
  }, [arrayBoxes])


  function drawBoxes(e) {
    const rect = e.target.getBoundingClientRect()
    // const ctx = e.target.getContext('2d')

    // Координаты, относительно начала координат canvas
    const x = e.clientX - Math.round(rect.left)
    const y = e.clientY - Math.round(rect.top)

    //Размер квадрата на координатной плоскости, с учётом размера поля
    var boxWidth = e.target.width / size
    var boxHeight = e.target.height / size

    //Координаты, с учётом динамической переменной rect.width и rect.height
    //По формуле, высчитываю координату,которая учитывает размер экрана :
    var normalX = (e.target.width * x) / rect.width
    var normalY = (e.target.height * y) / rect.height


    //Квадрат вмещает в себя несколько пар координат, что бы привязать только
    // одну пару к квадрату:
    //Координаты квадратов
    var coordBoxX = Math.floor(Math.floor(normalX / boxWidth) * boxWidth)
    var coordBoxY = Math.floor(Math.floor(normalY / boxHeight) * boxHeight)

    // Выдаёт округлённые координаты
    // console.log("x:", coordBoxX, "y:", coordBoxY)

    // Выдаёт квадрат по счёту, который можно подставить, как индекс
    // для массива arrayBoxes
    var indexBoxX = Math.floor(coordBoxX / Math.floor(e.target.width / size))
    var indexBoxY = Math.floor(coordBoxY / Math.floor(e.target.height / size))
    // console.log("x:", indexBoxX, "y:", indexBoxY)

    //Теперь, по клику на Canvas, я получаю индкесы для двумерного
    //массива arrayBoxes


    function drawBox(i, k) {
      //Для массива arrayBoxes, где :
      //k - индекс строки с которой взаимодействует пользователь(y)
      //i - индекс элемента этой строки (x) 

      const editedArray = arrayBoxes.slice()
      const newRow = [...editedArray[k]]

      newRow.splice(i, 1, +!newRow[i]) //+!newRow[i] обновляет элемент строки новым

      newRow.forEach((el, ind) => { //Диагональное удаление
        if (newRow[ind] !== 0) {
          if ((editedArray[k + 1] && editedArray[k + 1][ind + 1]) ||
            (editedArray[k + 1] && editedArray[k + 1][ind - 1]) ||
            (editedArray[k - 1] && editedArray[k - 1][ind - 1]) ||
            (editedArray[k - 1] && editedArray[k - 1][ind + 1])) {
            console.log('Мешает клетка по диагонали!')
            newRow[ind] = 0
          }
        }
      })

      editedArray.splice(k, 1, newRow)//обновляет изменённую строку

      setArrayBoxes(doRules(editedArray).field)
    }

    drawBox(indexBoxX, indexBoxY)
  }

  function doRules(field) { //подставляет массив под правила игры и считает кол-во кораблей
    const ships = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    }

    field = JSON.parse(JSON.stringify(field))

    field.forEach((row, y) => { //для каждой сткоки
      field[y].forEach((elRow, x) => { //для каждого элемента
        if (field[y][x] !== 0) { // если клетка активна
          field[y][x] = 1
          row.splice(x, 1, 1)
          if (field[y - 1] && field[y - 1][x]) {
            field[y - 1][x] = 2
            field[y][x] = 2
            if (field[y - 2] && field[y - 2][x]) {
              field[y - 1][x] = 3
              field[y - 2][x] = 3
              field[y][x] = 3
              if (field[y - 3] && field[y - 3][x]) {
                field[y - 1][x] = 4
                field[y - 2][x] = 4
                field[y - 3][x] = 4
                field[y][x] = 4
                if (field[y - 4] && field[y - 4][x]) {
                  field[y - 1][x] = 5
                  field[y - 2][x] = 5
                  field[y - 3][x] = 5
                  field[y - 4][x] = 5
                  field[y][x] = 5
                  if (field[y - 5] && field[y - 5][x]) {
                    field[y][x] = 0
                  }
                }
              }
            }
          }

          if (field[x - 1] && field[y][x - 1]) {//Применяет правила для строки
            field[y][x - 1] = 2
            field[y][x] = 2
            if (field[x - 2] && field[y][x - 2]) {
              field[y][x - 1] = 3
              field[y][x - 2] = 3
              field[y][x] = 3
              if (field[x - 3] && field[y][x - 3]) {
                field[y][x - 1] = 4
                field[y][x - 2] = 4
                field[y][x - 3] = 4
                field[y][x] = 4
                if (field[x - 4] && field[y][x - 4]) {
                  field[y][x - 1] = 5
                  field[y][x - 2] = 5
                  field[y][x - 3] = 5
                  field[y][x - 4] = 5
                  field[y][x] = 5
                  if (field[x - 5] && field[y][x - 5]) {
                    field[y][x] = 0
                  }
                }
              }
            }
          }
        }
      })
    })

    field.forEach((row, y) => { //для каждой сткоки
      field[y].forEach((elRow, x) => { //для каждого элемента
        if (field[y][x] !== 0) { // если клетка активна
          if (elRow === 1) { ships[0].push(elRow) }
          if (elRow === 2) { ships[1].push(elRow) }
          if (elRow === 3) { ships[2].push(elRow) }
          if (elRow === 4) { ships[3].push(elRow) }
          if (elRow === 5) { ships[4].push(elRow) }
        }
      })

    })

    const newQuantityShips = {
      0: ships[0].length,
      1: ships[1].length / 2,
      2: ships[2].length / 3,
      3: ships[3].length / 4,
      4: ships[4].length / 5
    }

    setQuantityShips(newQuantityShips)

    return { field: field, newQuantityShips: newQuantityShips }
  }

  function createField() {
    dispatch(addField({ index: index, field: arrayBoxes }))
  }

  function randomizeField(size) {
    const shipsFor_10_size = [4, 3, 2, 1, 0.4]
    //Массив с числом кораблей всех типов, для размера поля "10"
    const newField = new Array(size).fill(new Array(size).fill(0)) //новое поле

    const shipsCounter = shipsFor_10_size.map(value => Math.round(value * (size / 10)))
    //Массив с колличествами незаполненных кораблей для всех типов, в зависимости от размера поля

    for (let i = 0; i < shipsCounter[4]; i++) {//для пятиклеточных

      let X = Math.floor(Math.random() * size) //случайный индекс для строки
      let Y = Math.floor(Math.random() * size) //случайный индекс для элемента строки

      let randomRow = newField[Y].slice() //копия случайной строки

      if (newField[Y][X] === 0) {
        if (
          newField[Y][X + 1] === 0 &&
          newField[Y][X + 2] === 0 &&
          newField[Y][X + 3] === 0 &&
          newField[Y][X + 4] === 0 &&
          !newField[Y][X + 5] &&
          (newField[Y + 1] && !newField[Y + 1][X + 2]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 2]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 3]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 3]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 4]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 4]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 5]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 5])
        ) {
          if (//есть ли соседи на расстоянии 1 клетка вокруг выбранной
            !newField[Y][X - 1] &&
            (newField[Y - 1] && !newField[Y - 1][X - 1]) &&
            (newField[Y - 1] && !newField[Y - 1][X]) &&
            (newField[Y - 1] && !newField[Y - 1][X + 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X - 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X]) &&
            (newField[Y + 1] && !newField[Y + 1][X + 1])
          ) {
            randomRow.splice(X, 1, 5)
            randomRow.splice(X + 1, 1, 5)
            randomRow.splice(X + 2, 1, 5)
            randomRow.splice(X + 3, 1, 5)
            randomRow.splice(X + 4, 1, 5)
            newField.splice(Y, 1, randomRow)

          } else {
            // console.log('У второй клетки соседи!')
            i--
          }


        } else {
          // console.log('Вниз и право поместить никак нельзя!')
          i--
        }

      } else {
        // console.log(X, Y, 'клетка занята')
        i--
      }
    }

    for (let i = 0; i < shipsCounter[3]; i++) {//для четвероклеточных

      let X = Math.floor(Math.random() * size) //случайный индекс для строки
      let Y = Math.floor(Math.random() * size) //случайный индекс для элемента строки

      let randomRow = newField[Y].slice() //копия случайной строки

      if (newField[Y][X] === 0) {
        if (
          newField[Y][X + 1] === 0 &&
          newField[Y][X + 2] === 0 &&
          newField[Y][X + 3] === 0 &&
          !newField[Y][X + 4] &&
          (newField[Y + 1] && !newField[Y + 1][X + 2]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 2]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 3]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 3]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 4]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 4])
        ) {
          if (//есть ли соседи на расстоянии 1 клетка вокруг выбранной
            !newField[Y][X - 1] &&
            (newField[Y - 1] && !newField[Y - 1][X - 1]) &&
            (newField[Y - 1] && !newField[Y - 1][X]) &&
            (newField[Y - 1] && !newField[Y - 1][X + 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X - 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X]) &&
            (newField[Y + 1] && !newField[Y + 1][X + 1])
          ) {
            randomRow.splice(X, 1, 4)
            randomRow.splice(X + 1, 1, 4)
            randomRow.splice(X + 2, 1, 4)
            randomRow.splice(X + 3, 1, 4)
            newField.splice(Y, 1, randomRow)
            // console.log('Соседей нет!')
          } else {
            // console.log('У второй клетки соседи!')
            i--
          }


        } else {
          // console.log('Вниз и право поместить никак нельзя!')
          i--
        }

      } else {
        // console.log(X, Y, 'клетка занята')
        i--
      }
    }

    for (let i = 0; i < shipsCounter[2]; i++) {//для троичных кораблей

      let X = Math.floor(Math.random() * size) //случайный индекс для строки
      let Y = Math.floor(Math.random() * size) //случайный индекс для элемента строки

      let randomRow = newField[Y].slice() //копия случайной строки

      if (newField[Y][X] === 0) {
        if (
          newField[Y][X + 1] === 0 &&
          newField[Y][X + 2] === 0 &&
          !newField[Y][X + 3] &&
          (newField[Y + 1] && !newField[Y + 1][X + 2]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 2]) &&
          (newField[Y + 1] && !newField[Y - 1][X + 3]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 3])
        ) {
          if (//есть ли соседи на расстоянии 1 клетка вокруг выбранной
            !newField[Y][X - 1] &&
            (newField[Y - 1] && !newField[Y - 1][X - 1]) &&
            (newField[Y - 1] && !newField[Y - 1][X]) &&
            (newField[Y - 1] && !newField[Y - 1][X + 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X - 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X]) &&
            (newField[Y + 1] && !newField[Y + 1][X + 1])
          ) {
            randomRow.splice(X, 1, 3)
            randomRow.splice(X + 1, 1, 3)
            randomRow.splice(X + 2, 1, 3)
            newField.splice(Y, 1, randomRow)
            // console.log('Соседей нет!')
          } else {
            // console.log('У второй клетки соседи!')
            i--
          }


        } else {
          // console.log('Вниз и право поместить никак нельзя!')
          i--
        }

      } else {
        // console.log(X, Y, 'клетка занята')
        i--
      }
    }

    for (let i = 0; i < shipsCounter[1]; i++) {//для двоичных кораблей

      let X = Math.floor(Math.random() * size) //случайный индекс для строки
      let Y = Math.floor(Math.random() * size) //случайный индекс для элемента строки

      let randomRow = newField[Y].slice() //копия случайной строки

      if (newField[Y][X] === 0) {
        if (
          newField[Y][X + 1] === 0 &&
          !newField[Y][X + 2] &&
          (newField[Y + 1] && !newField[Y + 1][X + 2]) &&
          (newField[Y - 1] && !newField[Y - 1][X + 2])
        ) {
          if (//есть ли соседи на расстоянии 1 клетка вокруг выбранной
            !newField[Y][X - 1] &&
            (newField[Y - 1] && !newField[Y - 1][X - 1]) &&
            (newField[Y - 1] && !newField[Y - 1][X]) &&
            (newField[Y - 1] && !newField[Y - 1][X + 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X - 1]) &&
            (newField[Y + 1] && !newField[Y + 1][X]) &&
            (newField[Y + 1] && !newField[Y + 1][X + 1])
          ) {
            randomRow.splice(X, 1, 2)
            randomRow.splice(X + 1, 1, 2)
            newField.splice(Y, 1, randomRow)
          } else {
            i--
          }
        } else {
          i--
        }

      } else {
        i--
      }
    }

    for (let i = 0; i < shipsCounter[0]; i++) {//для еденичных кораблей

      let X = Math.floor(Math.random() * size) //случайный индекс для строки
      let Y = Math.floor(Math.random() * size) //случайный индекс для элемента строки

      let randomRow = newField[Y].slice() //копия случайной строки


      if (newField[Y][X] === 0) {
        if (
          newField[Y][X - 1] ||
          newField[Y][X + 1] ||
          (newField[Y - 1] && newField[Y - 1][X - 1]) ||
          (newField[Y - 1] && newField[Y - 1][X]) ||
          (newField[Y - 1] && newField[Y - 1][X + 1]) ||
          (newField[Y + 1] && newField[Y + 1][X - 1]) ||
          (newField[Y + 1] && newField[Y + 1][X]) ||
          (newField[Y + 1] && newField[Y + 1][X + 1])
        ) {
          i--
        } else {
          randomRow.splice(X, 1, 1)
          newField.splice(Y, 1, randomRow)
        }
      } else {
        i--
      }
    }


    setArrayBoxes(doRules(newField).field)
    console.log(doRules(newField).field)
  }



  return (
    <>
      <ul id='shipsList' ref={shipListRef}>
        {!!minimumOfShips && minimumOfShips.map((el, ind) => {
          if (el) {
            return (
              <li key={ind}
                id='shipsList__li'
                style={{
                  color: el === quantityShips[ind]
                    ? `rgb(0,160,60)`
                    : `rgb(0,${100 - (ind * 20)},${200 - (ind * 20)})`
                }}
              >{el} :{"■".repeat(ind + 1)}: {quantityShips[ind]} {(el === quantityShips[ind]) && "✓"}</li>

            )
          } else { return null }

        })}


      </ul>

      <ul id='buttonsList'>
        {(quantityShips[0] === minimumOfShips[0]) &&
          (quantityShips[1] === minimumOfShips[1]) &&
          (quantityShips[2] === minimumOfShips[2]) &&
          (quantityShips[3] === minimumOfShips[3]) &&
          (quantityShips[4] === minimumOfShips[4]) &&
          <>
            {numberOfSelectedPlayer === names.length &&
              <Link
                id="start"
                to="/battle"
                onClick={createField}
              >START GAME</Link>}

            {numberOfSelectedPlayer !== names.length &&
              <button
                id="next"
                onClick={() => { createField(); nextPlayer() }}
              >NEXT</button>}
          </>
        }
        <li
          id="randomize"
          onClick={() => { randomizeField(size) }}
        >RANDOMIZE</li>
      </ul>

      <div className="grid">
        <canvas
          ref={canvasRef}
          id="canvas"
          width='3000'
          height='3000'
          onMouseDown={e => {
            drawBoxes(e)
          }}
        ></canvas >
      </div>
    </>
  )
}

export default Field
