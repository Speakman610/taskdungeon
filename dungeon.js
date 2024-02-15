const dungeon = document.querySelector('#dungeon')
const gameData = {points: 0, knights: 0, bishops: 0, rooks: 0, numItems: 0, floor: 1}
updateInfo()

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
  gameData.numItems = numThings

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
          gameData.numItems--
          break
        case 'knight':
          gameData.knights++
          gameData.numItems--
          break
        case 'bishop':
          gameData.bishops++
          gameData.numItems--
          break
        case 'rook':
          gameData.rooks++
          gameData.numItems--
          break
        case 'queen':
          gameData.bishops++
          gameData.rooks++
          gameData.numItems--
          break
        case 'stair':
          if (gameData.points >= gameData.floor) {
            createFloor(gameData.floor, targetId)
            gameData.points -= gameData.floor
            gameData.floor++
            break
          } else {
            alert('Not enough points to move on to next floor')
            return
          }
      }
      updateInfo()
      target.append(start.firstChild)
      target.firstChild.remove()
      if (gameData.numItems === 0) {
        // the floor is cleared
        const required = [stair]
        while (required.length > 0) {
          const index = Math.floor(Math.random() * 63) // get a number between 0 and 63
          if (index !== targetId) {
            const stair = document.querySelector(`[square-id="${index}"]`)
            stair.innerHTML = required.pop()
          }
        }
      }
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

function addTask() {
  const taskInput = document.getElementById('task-name')
  const taskName = taskInput.value.trim()
  if (taskName === '') {
    alert('Please name your task')
    return
  }

  const taskList = document.getElementById('task-list')
  const newTask = document.createElement('li')
  newTask.textContent = taskName

  // Add event listener to mark todo as completed
  newTask.addEventListener('click', function() {
    this.remove()
    gameData.points++
    updateInfo()
  })

  taskList.appendChild(newTask)
  taskInput.value = '' // Clear input field after adding todo
}

function updateInfo() {
  const info = document.getElementById('info')
  info.innerText = `Floor: ${gameData.floor}\nPoints: ${gameData.points}\nKnights: ${gameData.knights}\nBishops: ${gameData.bishops}\nRooks: ${gameData.rooks}`
}

createFloor(gameData.floor, 0)