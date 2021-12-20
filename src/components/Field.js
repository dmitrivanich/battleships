import React, { useEffect, useRef, useState } from 'react'

export default function Field() {
  const ships = [4, 3, 2, 1, 0.4]
  const canvasRef = useRef(null)
  const [size, setSize] = useState(12)
  const [arrayBoxes, setArrayBoxes] = useState([])
  const [shipsOfLeft, setShips] = useState(ships)

  useEffect(() => {
    setArrayBoxes(new Array(size).fill(new Array(size).fill(0)));
    setShips(ships.map((el) => Math.round(el * size / 10)))
  }, [size])


  //Каждый раз, когда обновляется arrayBox, 
  //берутся значения из этого массива, и на их основе рисуется
  //новый Canvas
  useEffect(() => {
    function wichShip() {
      console.log(arrayBoxes)
      //Здесь будет происходить поиск соседей для клетки, и разпознование 
      // этих клеток, как определённого корабля 
    }
    wichShip()
    drawGrid()
  }, [arrayBoxes])

  function drawGrid() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // ctx.clearRect(0, 0, 1000, 1000)
    // ctx.lineWidth = 7
    // ctx.strokeStyle = '#eeeeee'

    const box = {
      width: canvas.width / size,
      height: canvas.height / size
    }


    function fillField() {
      if (arrayBoxes.length > 0) {
        for (let i = 0; i < size; i++) {
          arrayBoxes[i].forEach((el, ind) => {
            let space = size
            let x = Math.round((box.width) * (ind))
            let y = box.height * i
            // В массиве ArrayBoxes содержатся элементы 0(пустая клетка) и 1(корабль)
            // space - отступ между клетками 
            if (el === 1) {
              ctx.lineWidth = 8
              ctx.fillStyle = `#b8c9d6`
              ctx.fillRect(x, y, box.width, box.height)
              ctx.strokeStyle = "rgb(46, 46, 46)";
              ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
              ctx.fillStyle = "#a3b7c5";
              ctx.fillRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
            }
            if (el === 0) {
              ctx.lineWidth = 8
              ctx.fillStyle = `#b8c9d6`
              ctx.fillRect(x, y, box.width, box.height)
              ctx.strokeStyle = "white";
              ctx.strokeRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
              ctx.fillStyle = "#a3b7c5";
              ctx.fillRect(x + space / 2, y + space / 2, box.width - space, box.height - space)
            }
          })
        }
      }
    }
    fillField()
    fillField()
    fillField()
  }

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
    console.log("x:", indexBoxX, "y:", indexBoxY)

    //Теперь, по клику на Canvas, я получаю индкесы для двумерного
    //массива arrayBoxes


    function drawBox(i, k) {
      //i - элемент строки
      //k - строка
      const editedArray = [...arrayBoxes]
      let newRow = [...editedArray[k]]

      let newNew = newRow.map((el, ind) => {
        return ind === i ? +!el : el
      })

      editedArray.splice(k, 1, newNew)
      setArrayBoxes(editedArray)

    }

    drawBox(indexBoxX, indexBoxY)


    // console.log(newArrayBoxes[indexBoxX])
    // console.log(newArrayBoxes)
  }





  return <>
    <div className="createFields">
      <p>Размер поля:</p>
      <p className='fieldSizeValue'>{`${size}x${size}`}</p>
      <input
        onChange={(e) => {
          setSize(+e.target.value);
        }}
        id='fieldSize'
        type="range"
        min='10'
        max='20'
        step="2"
        value={size} />
    </div>
    <canvas
      ref={canvasRef}
      id="canvas"
      width='1000'
      height='1000'
      onClick={(e) => {
        drawBoxes(e);
      }}
    ></canvas >

    <ul id='shipsList'>
      {!!shipsOfLeft && shipsOfLeft.map((el, ind) => (
        <li key={ind}>{"■".repeat(ind + 1)}: {el}</li>
      ))}
    </ul>
  </>
}
