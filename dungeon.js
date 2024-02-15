const dungeon = document.querySelector('#dungeon')
const gameData = localStorage.getItem('gameData') ?? {points: 0, knights: 0, bishops: 0, rooks: 0, queens: 0}

const EMPTY = 0
const START = 1
const END = 2
const CHEST = 3
const MINION = 4
const BOSS = 5

/* 
  Room Types:
  - Minion
  - Boss
  - Treasure
  - Stair
  - Empty

  Minions:
  - Bishop
  - Knight
  - Rook

  Bosses:
  - Snake
  - Horse
  - Goat
  - Monkey
  - Rooster
  - Dog
  - Pig
  - Rat
  - Ox
  - Tiger
  - Rabbit
  - Dragon
*/
function createFloor(floor, start) {
  const rooms = []
  let numThings = 0
  while (rooms.length < 64) {
    if (rooms.length === start) {
      rooms.push(START) // this will be the room the player starts in
    } else if (rooms.length === start + 1
      || rooms.length === start - 1
      || rooms.length === start + 7
      || rooms.length === start - 7
      || rooms.length === start + 8
      || rooms.length === start - 8
      || rooms.length === start + 9
      || rooms.length === start - 9) {
      // if we are on one of the spaces surrounding the start space
      rooms.push(EMPTY)
    } else {
      const rand = Math.floor(Math.random() * 99) // get a number between 0 and 99
      if (rand <= 69 || numThings === 2*floor) { // 70% chance on floor 1
        rooms.push(EMPTY)
      } else if (rand <= 74) { // 5% chance on floor 1
        rooms.push(CHEST)
        numThings++
      } else { // 15% chance on floor 1
        rooms.push(MINION)
        numThings++
      }
    }
  }

  drawFloor(floor, rooms)
}

function drawFloor(floor, rooms) {
  dungeon.innerHTML = ''
  rooms.forEach((room, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    switch(room) {
      case START:
        square.innerHTML = player
        break
      case END:
        square.innerHTML = stair
        break
      case MINION:
        const monster = Math.floor(Math.random() * (floor + 99)) // get a number between 0 and 99 + floor
        if (monster <= 59) { // 60% chance on floor 1
          square.innerHTML = knight
        } else if (monster <= 93) { // 34% chance on floor 1
          square.innerHTML = bishop
        } else if (monster <= 98) { // 5% chance on floor 1
          square.innerHTML = rook
        } else { // 1% chance on floor 1
          square.innerHTML = queen
        }
        break
      case BOSS:
        square.innerHTML = boss
        break
      case CHEST:
        square.innerHTML = chest
        break
    }
    
    if (room === START) square.firstChild?.setAttribute('draggable', true) // only do this if this is the player
    square.setAttribute('square-id', i)
    const row = Math.floor( (63 - i) / 8) + 1
    if (row % 2 === 0) {
        square.classList.add(i % 2 === 0 ? 'white-square' : 'black-square')
    } else {
        square.classList.add(i % 2 === 0 ? 'black-square' : 'white-square')
    }
    dungeon.append(square)
  })

  let draggedElement
  function dragStart(e) {
    draggedElement = e.target
  }

  function dragOver(e) {
    e.preventDefault()
  }

  function dragDrop(e) {
    e.stopPropagation()

    const targetId = Number(e.target.getAttribute('square-id')) || Number(e.target.parentNode.getAttribute('square-id'))
    const startId = Number(draggedElement.parentNode.getAttribute('square-id'))
    movePiece(targetId, startId)
  }

  function movePiece(targetId, startId) {
    const target = document.querySelector(`[square-id="${targetId}"]`)
    const start = document.querySelector(`[square-id="${startId}"]`)
    const isOccupied = target.firstChild

    if (!start.firstChild && !start.firstChild.classList.contains('player')) return

    if (isOccupied) {
      switch(target.firstChild.id) {
        case 'chest':
          gameData.knights++
          gameData.bishops++
          gameData.rooks++
          break
        case 'knight':
          gameData.knights++
          break
        case 'bishop':
          gameData.bishops++
          break
        case 'rook':
          gameData.rooks++
          break
        case 'queens':
          gameData.queens++
          break
      }
      console.log(gameData)
      target.append(start.firstChild)
      target.firstChild.remove()
      return
    } else {
      target.append(start.firstChild)
      return
    }
  }

  const allSquares = document.querySelectorAll('#dungeon .square')
  allSquares.forEach(square => {
      square.addEventListener('dragstart', dragStart)
      square.addEventListener('dragover', dragOver)
      square.addEventListener('drop', dragDrop)
  })
}

function saveData() {
  localStorage.setItem('gameData', gameData)
}

createFloor(1, 0)