import React, { useEffect, useRef, useState } from 'react'

export default function CreationField() {
  const canvasRef = useRef(null)
  const shipListRef = useRef(null)

  const [size, setSize] = useState(10)
  const [arrayBoxes, setArrayBoxes] = useState([])
  const [shipsOfLeft, setShips] = useState([4, 3, 2, 1, 0.4])
  const [quantityShips, setQuantityShips] = useState({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 })
  //Создаёт матрицу, исходя из выбранного размера
  //Создаёт ограничение на колличество размещаемых кораблей
  useEffect(() => {
    const ships = [4, 3, 2, 1, 0.4]
    setArrayBoxes(new Array(size).fill(new Array(size).fill(0)));
    setShips(ships.map((el) => Math.round(el * (size / 10))))
  }, [size], [shipsOfLeft])

  //Каждый раз, когда обновляется arrayBox, 
  //берутся значения из этого массива, и на их основе рисуется
  //новый Canvas
  useEffect(() => {
    //Рисует сетку, исходя из размера полей
    function drawGrid() {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // ctx.clearRect(0, 0, 1000, 1000)
      // ctx.lineWidth = 7
      // ctx.strokeStyle = '#eeeeee'

      const box = {
        width: canvas.width / arrayBoxes.length,
        height: canvas.height / arrayBoxes.length
      }


      function fillField() {//Заполняет поле квадратами, учитывая цвет клетки
        if (arrayBoxes.length > 0) {
          for (let i = 0; i < arrayBoxes.length; i++) {
            arrayBoxes[i].forEach((el, ind) => {
              let space = 10
              let x = Math.round((box.width) * (ind))
              let y = Math.round(box.height * i)
              // В массиве ArrayBoxes содержатся элементы 0(пустая клетка) и 1(корабль)
              // space - отступ между клетками 
              function drawBox() {//рисует клетку
                ctx.lineWidth = 5
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
                  ctx.lineWidth = 8
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
      fillField()
      fillField()


    }

    drawGrid()
    // if (arrayBoxes.length) { randomDraw() }
  }, [arrayBoxes])

  function doRules(editedArray) { //подставляет массив под правила игры 
    const ships = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: []
    }
    editedArray.forEach((row, y) => { //для каждой сткоки
      editedArray[y].forEach((elRow, x) => { //для каждого элемента
        if (editedArray[y][x] !== 0) { // если клетка активна
          editedArray[y][x] = 1 //Если у клетка эл строки не равен нулю - по умолчанию - 1

          if (editedArray[y - 1] && editedArray[y - 1][x]) { //Применяет правила для столбца
            editedArray[y - 1][x] = 2
            editedArray[y][x] = 2
            if (editedArray[y - 2] && editedArray[y - 2][x]) {
              editedArray[y - 1][x] = 3
              editedArray[y - 2][x] = 3
              editedArray[y][x] = 3
              if (editedArray[y - 3] && editedArray[y - 3][x]) {
                editedArray[y - 1][x] = 4
                editedArray[y - 2][x] = 4
                editedArray[y - 3][x] = 4
                editedArray[y][x] = 4
                if (editedArray[y - 4] && editedArray[y - 4][x]) {
                  editedArray[y - 1][x] = 5
                  editedArray[y - 2][x] = 5
                  editedArray[y - 3][x] = 5
                  editedArray[y - 4][x] = 5
                  editedArray[y][x] = 5
                  if (editedArray[y - 5] && editedArray[y - 5][x]) {
                    editedArray[y][x] = 0
                  }
                }
              }
            }
          }

          if (editedArray[x - 1] && editedArray[y][x - 1]) {//Применяет правила для строки
            editedArray[y][x - 1] = 2
            editedArray[y][x] = 2
            if (editedArray[x - 2] && editedArray[y][x - 2]) {
              editedArray[y][x - 1] = 3
              editedArray[y][x - 2] = 3
              editedArray[y][x] = 3
              if (editedArray[x - 3] && editedArray[y][x - 3]) {
                editedArray[y][x - 1] = 4
                editedArray[y][x - 2] = 4
                editedArray[y][x - 3] = 4
                editedArray[y][x] = 4
                if (editedArray[x - 4] && editedArray[y][x - 4]) {
                  editedArray[y][x - 1] = 5
                  editedArray[y][x - 2] = 5
                  editedArray[y][x - 3] = 5
                  editedArray[y][x - 4] = 5
                  editedArray[y][x] = 5
                  if (editedArray[x - 5] && editedArray[y][x - 5]) {
                    editedArray[y][x] = 0
                  }
                }
              }
            }
          }
        }
      })


    })

    editedArray.forEach((row, y) => { //для каждой сткоки
      editedArray[y].forEach((elRow, x) => { //для каждого элемента
        if (editedArray[y][x] !== 0) { // если клетка активна
          if (elRow === 1) { ships[0].push(elRow) }
          if (elRow === 2) { ships[1].push(elRow) }
          if (elRow === 3) { ships[2].push(elRow) }
          if (elRow === 4) { ships[3].push(elRow) }
          if (elRow === 5) { ships[4].push(elRow) }
        }
      })

    })

    setQuantityShips({
      0: ships[0].length,
      1: ships[1].length / 2,
      2: ships[2].length / 3,
      3: ships[3].length / 4,
      4: ships[4].length / 5
    })
  }

  //Рисует квадрат, привязывает к сетке, заполняя остальные квадраты согласно 
  //правилам игры
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

      const editedArray = [...arrayBoxes]
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



      doRules(editedArray)
      setArrayBoxes(editedArray)

    }

    drawBox(indexBoxX, indexBoxY)


    // console.log(newArrayBoxes[indexBoxX])
    // console.log(newArrayBoxes)
  }




  function drawing(e) {
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

      const editedArray = [...arrayBoxes]
      const newRow = [...editedArray[k]]

      newRow.splice(i, 1, 1) //+!newRow[i] обновляет элемент строки новым
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



      doRules(editedArray)
      setArrayBoxes(editedArray)

    }

    drawBox(indexBoxX, indexBoxY)
  }



  function randomDraw() {//рандомно заполняет массив
    const editedArray = [...arrayBoxes] //Редактируемый массив

    //Рандомно заполняет массив editedArray
    function doRandom() {
      let randY = Math.floor(Math.random() * size)
      let randX = Math.floor(Math.random() * size)

      var randRow = [...editedArray[randY]] //получение рандомной строки
      randRow[randX] = +!randRow[randX] //меняет рандомный элемент строки на противоположный
      randRow.forEach((el, ind) => { //Очищает элемент, если имеются соседи
        if (randRow[ind] !== 0) {
          if ((editedArray[randY + 1] && editedArray[randY + 1][ind + 1]) ||
            (editedArray[randY + 1] && editedArray[randY + 1][ind - 1]) ||
            (editedArray[randY - 1] && editedArray[randY - 1][ind - 1]) ||
            (editedArray[randY - 1] && editedArray[randY - 1][ind + 1])) {
            randRow[ind] = 0
          }
        }
      })

      editedArray.splice(randY, 1, randRow) //Вставка новой строки в редактируемый массив
    }

    var times = size * 100

    while (times) {
      doRandom()
      times--
    }

    doRules(editedArray)
    setArrayBoxes(editedArray)
  }

  return <>
    <h1>СОЗДАНИЕ ПОЛЕЙ</h1>
    <div className="createFields">
      <p>Размер поля:</p>
      <p className='fieldSizeValue'>{`${size}x${size}`}</p>
      <input
        onChange={(e) => {
          setSize(+e.target.value);
          setQuantityShips({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 })
        }}
        id='fieldSize'
        type="range"
        min='8'
        max='20'
        step="2"
        value={size} />
      <ul id='shipsList' ref={shipListRef}>
        {!!shipsOfLeft && shipsOfLeft.map((el, ind) => {
          if (el) {
            return (
              <li key={ind}
                id='listOfShips'
                style={{
                  color: el === quantityShips[ind]
                    ? `rgb(0,160,60)`
                    : `rgb(0,${100 - (ind * 20)},${200 - (ind * 20)})`
                }}
              >{el} :{"■".repeat(ind + 1)}: {quantityShips[ind]}</li>
            )
          } else { return null }


        })}
      </ul>
    </div>

    <div className="grid">
      <canvas
        ref={canvasRef}
        id="canvas"
        width='1000'
        height='1000'

        onMouseDown={e => {
          drawBoxes(e)

          e.target.onmousemove = (e) => {
            drawBoxes(e)
          }
          e.target.onmouseup = (e) => {
            drawBoxes(e)
            e.target.onmousemove = null

          }

        }}


      ></canvas >
      <button
        id="randomDraw"
        onClick={randomDraw}
      >RANDOM</button>

      {(quantityShips[0] === shipsOfLeft[0]) &&
        (quantityShips[1] === shipsOfLeft[1]) &&
        (quantityShips[2] === shipsOfLeft[2]) &&
        (quantityShips[3] === shipsOfLeft[3]) &&

        <button
          id="next"
          onClick={console.log('nextCanvas')}
        >NEXT</button>

      }

    </div>



  </>
}