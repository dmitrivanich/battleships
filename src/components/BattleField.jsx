import React, { useRef, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateField } from '../redux/gameSlice'

export default function BattleField({ index, miss, shipsOut }) {
  const playersFields = useSelector(state => state.games.playersFields)
  const field = playersFields[index]
  const size = useSelector(state => state.games.fieldSize)

  const [arrayBoxes, setArrayBoxes] = useState(field);
  const [quantityShips, setQuantityShips] = useState(null);
  const [status, setStatus] = useState(true)

  const canvasRef = useRef(null)

  const dispatch = useDispatch()

  const whenMiss = () => {
    setStatus(false)
    setTimeout(() => setStatus(true), 500)
  }

  useEffect(() => {
    setArrayBoxes(doRules(field).field)
    canvasRef.current.style.width = `70vh`
    canvasRef.current.style.height = canvasRef.current.style.width
  }, [field, size])

  useEffect(() => {
    function drawGrid() { //красит квадраты
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
              let space = 400 / size
              let x = Math.round((box.width) * (ind))
              let y = Math.round(box.height * i)
              // В массиве ArrayBoxes содержатся элементы 0(пустая клетка) и 1(корабль)
              // space - отступ между клетками 
              ctx.lineWidth = 300 / size
              ctx.lineCap = 'round'

              function drawDefault() {
                ctx.strokeStyle = "white";
                ctx.fillStyle = `#b8c9d6`
                ctx.fillRect(x, y, box.width, box.height)
                ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
                ctx.fillStyle = "#a3b7c5";
                ctx.fillRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
              }

              switch (el) {
                case 9: //мимо
                  drawDefault();
                  ctx.fillStyle = "#ffffff";
                  ctx.beginPath();
                  ctx.arc(x + box.width / 2, y + box.height / 2, 300 / size, 0, Math.PI * 2)
                  ctx.fill();
                  break;
                case 8: //убил   
                  drawDefault();
                  ctx.strokeStyle = "black";
                  ctx.fillStyle = "black";
                  ctx.beginPath();
                  ctx.moveTo(x + space, y + space);
                  ctx.lineTo(x + box.width - space, y + box.height - space);
                  ctx.stroke();
                  ctx.beginPath();
                  ctx.moveTo(x + box.width - space, y + space);
                  ctx.lineTo(x + space, y + box.height - space);
                  ctx.stroke();
                  ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
                  break;
                case 7: //ранил
                  drawDefault();
                  ctx.strokeStyle = "#970000";
                  ctx.beginPath();
                  ctx.moveTo(x + space, y + space);
                  ctx.lineTo(x + box.width - space, y + box.height - space);
                  ctx.stroke();
                  ctx.beginPath();
                  ctx.moveTo(x + box.width - space, y + space);
                  ctx.lineTo(x + space, y + box.height - space);
                  ctx.stroke();
                  break;

                default:
                  drawDefault();
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

  function drawBox(e) { //действие по клику мыши
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

    function shoot(i, k) {
      //Для массива arrayBoxes, где :
      //k - индекс строки с которой взаимодействует пользователь(y)
      //i - индекс элемента этой строки (x) 

      const editedArray = arrayBoxes.slice()
      const newRow = [...editedArray[k]]
      const el = newRow[i]

      switch (el) {
        case 1:
          newRow.splice(i, 1, 8) //убит
          break;
        case 2:
          newRow.splice(i, 1, 7)//ранен
          break;
        case 3:
          newRow.splice(i, 1, 7)//ранен
          break;
        case 4:
          newRow.splice(i, 1, 7) //ранен
          break;
        case 5:
          newRow.splice(i, 1, 7) //ранен
          break;
        case 7:
          newRow.splice(i, 1, 7) //ранен
          break;
        case 8:
          newRow.splice(i, 1, 8) //убит
          break;
        default:
          newRow.splice(i, 1, 9) //мимо
          if (!el) {
            miss()
            whenMiss()
          }

          break;
      }

      // newRow.splice(i, 1, 1) //+!newRow[i] обновляет элемент строки новым

      editedArray.splice(k, 1, newRow)//обновляет изменённую строку

      const doRulesField = doRules(editedArray).field
      const doRulesShips = doRules(editedArray).newQuantityShips


      if (doRulesShips.every((el) => { return el === 0 })) {
        shipsOut(index) //если корабли закончились
      }


      setArrayBoxes(doRulesField)//обновить поле локально
      dispatch(updateField({ index: index, field: doRulesField }))//глобально
    }
    shoot(indexBoxX, indexBoxY)
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

    field.forEach((row, y) => { //отрисовка уничтоженных кораблей
      field[y].forEach((elRow, x) => { //для каждого элемента
        if (field[y][x] === 7) { // если клетка "ранена" (7 - раненный корабль)
          if (field[x - 1] && (!field[y][x + 1] || field[y][x + 1] === 9)) { //для строки
            if ( //для двойки находит и красит "труп"
              field[y][x - 1] === 7 &&
              (!field[y][x - 2] || field[y][x - 2] === 9)) {

              field[y][x - 1] = 8
              field[y][x] = 8
            }
            if ( //для тройки
              field[y][x - 1] === 7 &&
              field[y][x - 2] === 7 &&
              (!field[y][x - 3] || field[y][x - 3] === 9)) {

              field[y][x - 1] = 8
              field[y][x - 2] = 8
              field[y][x] = 8
            }
            if ( //для четверки
              field[y][x - 1] === 7 &&
              field[y][x - 2] === 7 &&
              field[y][x - 3] === 7 &&
              (!field[y][x - 4] || field[y][x - 4] === 9)) {

              field[y][x - 1] = 8
              field[y][x - 2] = 8
              field[y][x - 3] = 8
              field[y][x] = 8
            }
            if ( //для пятерки
              field[y][x - 1] === 7 &&
              field[y][x - 2] === 7 &&
              field[y][x - 3] === 7 &&
              field[y][x - 4] === 7 &&
              (!field[y][x - 5] || field[y][x - 5] === 9)) {

              field[y][x - 1] = 8
              field[y][x - 2] = 8
              field[y][x - 3] = 8
              field[y][x - 4] = 8
              field[y][x] = 8
            }
          }
          if (field[y - 1] && field[y - 1][x] === 7 && (!field[y + 1] || (field[y + 1] && (!field[y + 1][x] || field[y + 1][x] === 9)))) { //для столбца

            if (
              !field[y - 2] || (field[y - 2] && (!field[y - 2][x] || field[y - 2][x] === 9))
            ) {//для двойки находит и красит "труп"
              field[y - 1][x] = 8
              field[y][x] = 8
            }

            if (
              field[y - 2] && (field[y - 2][x] === 7) &&
              (!field[y - 3] || (field[y - 3] && (!field[y - 3][x] || field[y - 3][x] === 9)))
            ) {
              field[y - 1][x] = 8
              field[y - 2][x] = 8
              field[y][x] = 8
            }

            if (
              field[y - 2] && (field[y - 2][x] === 7) &&
              field[y - 3] && (field[y - 3][x] === 7) &&
              (!field[y - 4] || (field[y - 4] && (!field[y - 4][x] || field[y - 4][x] === 9)))
            ) {
              field[y - 1][x] = 8
              field[y - 2][x] = 8
              field[y - 3][x] = 8
              field[y][x] = 8
            }
            if (
              field[y - 2] && (field[y - 2][x] === 7) &&
              field[y - 3] && (field[y - 3][x] === 7) &&
              field[y - 4] && (field[y - 4][x] === 7) &&
              (!field[y - 5] || (field[y - 5] && (!field[y - 5][x] || field[y - 5][x] === 9)))
            ) {
              field[y - 1][x] = 8
              field[y - 2][x] = 8
              field[y - 3][x] = 8
              field[y - 4][x] = 8
              field[y][x] = 8
            }

          }
        }
      })
    })

    field.forEach((row, y) => { //добавление точек уничтоженным кораблям
      field[y].forEach((elRow, x) => { //для каждого элемента
        if (field[y][x] === 8) { // если клетка "убита"
          if (field[y][x + 1] === 0 || field[y][x - 1] === 0) {
            if (field[y][x + 1] === 0) { field[y][x + 1] = 9 }
            else { field[y][x - 1] = 9 }
          }
          if (field[y][x - 1] === 0) {
            field[y][x - 1] = 9
          }
          if (field[y - 1] && (field[y - 1][x] === 0 || field[y - 1][x] === 9)) {
            field[y - 1][x] = 9
            if (field[y - 1][x - 1] === 0) { field[y - 1][x - 1] = 9 }
            if (field[y - 1][x + 1] === 0) { field[y - 1][x + 1] = 9 }
          }
          if (field[y + 1] && (field[y + 1][x] === 0 || field[y + 1][x] === 9)) {
            field[y + 1][x] = 9
            if (field[y + 1][x - 1] === 0) { field[y + 1][x - 1] = 9 }
            if (field[y + 1][x + 1] === 0) { field[y + 1][x + 1] = 9 }
          }
        }
      })
    })

    field.forEach((row, y) => { //подсчет кораблей
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

    const newQuantityShips = [
      ships[0].length,
      ships[1].length / 2,
      ships[2].length / 3,
      ships[3].length / 4,
      ships[4].length / 5
    ]

    newQuantityShips.map((el) => Math.round(el * 100) / 100)
    setQuantityShips(newQuantityShips)
    return { field: field, newQuantityShips: newQuantityShips }
  }

  return (
    <div className="grid">
      <ul id='shipsList' >
        {quantityShips && quantityShips.map((el, ind) => (
          !!el && <li key={ind}
            id='shipsList__li'
            style={{
              color: `rgb(0,${100 - (ind * 20)},${200 - (ind * 20)})`
            }}
          >{Math.round(el * 100) / 100} :{"■".repeat(ind + 1)}</li>
        ))}
      </ul>


      <div className="field">
        {!status && <div className="message">
          <div className="message__text">ПРОМАХ</div>
        </div>
        }
        <canvas
          ref={canvasRef}
          id="canvas"
          width='3000'
          height='3000'
          onMouseDown={e => {
            if (status) {
              drawBox(e)
            }
          }}
        ></canvas >
      </div>






    </div>
  )
}

