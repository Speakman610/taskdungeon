// Rooms and things
const EMPTY = 0
const PLAYER = 1
const DOOR = 2
const PAWN = 3
const CHEST = 4
const KNIGHT = 5
const BISHOP = 6
const ROOK = 7
const QUEEN = 8
const BOSS = 9

// Movement calculation
const N_S_step = 8
const W_E_step = 1
const NW_SE_step = 9
const SW_NE_step = 7

// SVGs for pieces and stuff
const star = '<div class="room" id="start"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z"/></svg></div>'
const chest = '<div class="room" id="chest"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M190.5 68.8L225.3 128H224 152c-22.1 0-40-17.9-40-40s17.9-40 40-40h2.2c14.9 0 28.8 7.9 36.3 20.8zM64 88c0 14.4 3.5 28 9.6 40H32c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H438.4c6.1-12 9.6-25.6 9.6-40c0-48.6-39.4-88-88-88h-2.2c-31.9 0-61.5 16.9-77.7 44.4L256 85.5l-24.1-41C215.7 16.9 186.1 0 154.2 0H152C103.4 0 64 39.4 64 88zm336 0c0 22.1-17.9 40-40 40H288h-1.3l34.8-59.2C329.1 55.9 342.9 48 357.8 48H360c22.1 0 40 17.9 40 40zM32 288V464c0 26.5 21.5 48 48 48H224V288H32zM288 512H432c26.5 0 48-21.5 48-48V288H288V512z"/></svg></div>'
const door = '<div class="room" id="door"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M336.6 156.5c1.3 1.1 2.7 2.2 3.9 3.3c9.3 8.2 23 10.5 33.4 3.6l67.6-45.1c11.4-7.6 14.2-23.2 5.1-33.4C430 66.6 410.9 50.6 389.7 37.6c-11.9-7.3-26.9-1.4-32.1 11.6l-30.5 76.2c-4.5 11.1 .2 23.6 9.5 31.2zM328 36.8c5.1-12.8-1.6-27.4-15-30.5C294.7 2.2 275.6 0 256 0s-38.7 2.2-57 6.4C185.5 9.4 178.8 24 184 36.8l30.3 75.8c4.5 11.3 16.8 17.2 29 16c4.2-.4 8.4-.6 12.7-.6s8.6 .2 12.7 .6c12.1 1.2 24.4-4.7 29-16L328 36.8zM65.5 85c-9.1 10.2-6.3 25.8 5.1 33.4l67.6 45.1c10.3 6.9 24.1 4.6 33.4-3.6c1.3-1.1 2.6-2.3 4-3.3c9.3-7.5 13.9-20.1 9.5-31.2L154.4 49.2c-5.2-12.9-20.3-18.8-32.1-11.6C101.1 50.6 82 66.6 65.5 85zm314 137.1c.9 3.3 1.7 6.6 2.3 10c2.5 13 13 23.9 26.2 23.9h80c13.3 0 24.1-10.8 22.9-24c-2.5-27.2-9.3-53.2-19.7-77.3c-5.5-12.9-21.4-16.6-33.1-8.9l-68.6 45.7c-9.8 6.5-13.2 19.2-10 30.5zM53.9 145.8c-11.6-7.8-27.6-4-33.1 8.9C10.4 178.8 3.6 204.8 1.1 232c-1.2 13.2 9.6 24 22.9 24h80c13.3 0 23.8-10.8 26.2-23.9c.6-3.4 1.4-6.7 2.3-10c3.1-11.4-.2-24-10-30.5L53.9 145.8zM104 288H24c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V312c0-13.3-10.7-24-24-24zm304 0c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V312c0-13.3-10.7-24-24-24H408zM24 416c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V440c0-13.3-10.7-24-24-24H24zm384 0c-13.3 0-24 10.7-24 24v48c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V440c0-13.3-10.7-24-24-24H408zM272 192c0-8.8-7.2-16-16-16s-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V192zm-64 32c0-8.8-7.2-16-16-16s-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V224zm128 0c0-8.8-7.2-16-16-16s-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V224z"/></svg></div>'
const boss = '<div class="monster" id="boss"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 124.5l-51.9-13c-6.5-1.6-11.3-7.1-12-13.8s2.8-13.1 8.7-16.1l40.8-20.4L294.4 28.8c-5.5-4.1-7.8-11.3-5.6-17.9S297.1 0 304 0H416h32 16c30.2 0 58.7 14.2 76.8 38.4l57.6 76.8c6.2 8.3 9.6 18.4 9.6 28.8c0 26.5-21.5 48-48 48H538.5c-17 0-33.3-6.7-45.3-18.7L480 160H448v21.5c0 24.8 12.8 47.9 33.8 61.1l106.6 66.6c32.1 20.1 51.6 55.2 51.6 93.1C640 462.9 590.9 512 530.2 512H496 432 32.3c-3.3 0-6.6-.4-9.6-1.4C13.5 507.8 6 501 2.4 492.1C1 488.7 .2 485.2 0 481.4c-.2-3.7 .3-7.3 1.3-10.7c2.8-9.2 9.6-16.7 18.6-20.4c3-1.2 6.2-2 9.5-2.2L433.3 412c8.3-.7 14.7-7.7 14.7-16.1c0-4.3-1.7-8.4-4.7-11.4l-44.4-44.4c-30-30-46.9-70.7-46.9-113.1V181.5v-57zM512 72.3c0-.1 0-.2 0-.3s0-.2 0-.3v.6zm-1.3 7.4L464.3 68.1c-.2 1.3-.3 2.6-.3 3.9c0 13.3 10.7 24 24 24c10.6 0 19.5-6.8 22.7-16.3zM130.9 116.5c16.3-14.5 40.4-16.2 58.5-4.1l130.6 87V227c0 32.8 8.4 64.8 24 93H112c-6.7 0-12.7-4.2-15-10.4s-.5-13.3 4.6-17.7L171 232.3 18.4 255.8c-7 1.1-13.9-2.6-16.9-9s-1.5-14.1 3.8-18.8L130.9 116.5z"/></svg></div>'
const queen = '<div class="monster" id="queen"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg></div>'
const rook = '<div class="monster" id="rook"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg></div>'
const bishop = '<div class="monster" id="bishop"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg></div>'
const knight = '<div class="monster" id="knight"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg></div>'
const pawn = '<div class="monster" id="pawn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z"/></svg></div>'
const player = '<div class="player" id="player"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M180.5 141.5C219.7 108.5 272.6 80 336 80s116.3 28.5 155.5 61.5c39.1 33 66.9 72.4 81 99.8c4.7 9.2 4.7 20.1 0 29.3c-14.1 27.4-41.9 66.8-81 99.8C452.3 403.5 399.4 432 336 432s-116.3-28.5-155.5-61.5c-16.2-13.7-30.5-28.5-42.7-43.1L48.1 379.6c-12.5 7.3-28.4 5.3-38.7-4.9S-3 348.7 4.2 336.1L50 256 4.2 175.9c-7.2-12.6-5-28.4 5.3-38.6s26.1-12.2 38.7-4.9l89.7 52.3c12.2-14.6 26.5-29.4 42.7-43.1zM448 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg></div>'

// Objects for game
const dungeon = document.querySelector('#dungeon')
const gameData = localStorage.getItem('gameData') ? JSON.parse(localStorage.getItem('gameData')) : {
  points: 0,
  knights: 1,
  bishops: 1,
  rooks: 1,
  floor: 1,
  rooms: [],
  numItems: 0,
  player: 0,
  moved: [],
  tasks: {}
}

updateInfo()
refreshTaskList()

document.addEventListener('player-death', (e) => {
  setTimeout(() => {
    gameData.player = 0
    gameData.floor = 1
    gameData.rooms = []
    gameData.numItems = 0
    // save all the current data
    localStorage.setItem('gameData', JSON.stringify(gameData))
    alert('You were captured by an enemy piece! Back to the first floor...')
    createFloor(gameData.floor, gameData.player)
    updateInfo()
  }, 100)
})


/* 
  Room Types:
  - Minion
  - Boss
  - Treasure
  - Door
  - Empty

  Minions:
  - Pawn
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
  // generate the floor
  if (gameData.rooms.length < 64) {
    gameData.rooms = Array(64).fill(EMPTY)
    gameData.rooms[start] = PLAYER
    let floorPoints = floor + 2
    while (floorPoints > 0) {
      let room = Math.floor(Math.random() * 63) // select a random room
      if (gameData.rooms[room] === EMPTY
        && room !== start + W_E_step
        && room !== start - W_E_step
        && room !== start + SW_NE_step
        && room !== start - SW_NE_step
        && room !== start + N_S_step
        && room !== start - N_S_step
        && room !== start + NW_SE_step
        && room !== start - NW_SE_step) {
          // if we are not on one of the spaces surrounding the start space and the room is empty

          /*
          Levels:
          1 [3] - Knight or Bishop (1)
          2 [4] - Chest (2)
          3 [5] - Rook (1)
          4 [6] - Knight or Bishop (2)
          5 [7] - Knight or Bishop (2), Pawn (1)
          6 [8] - Rook (1), Knight or Bishop (1)
          7 [9] - Queen (1)
          8 [10] - Knight or Bishop (2), Chest (2)
          9 [11] - Rook (2), Pawn (1)
          10 [12] - Knight or Bishop (4) - BOSS FLOOR
          ...
          */
          if (floor % 7 === 0 && floorPoints >= 9) {
            // queen floor
            gameData.rooms[room] = QUEEN
            floorPoints -= 9
          } else if (floor % 3 === 0 && floorPoints >= 5) {
            // rook floor
            gameData.rooms[room] = ROOK
            floorPoints -= 5
          } else if (floorPoints % 3 === 0 && floorPoints >= 3) {
            // bishop or knight
            gameData.rooms[room] = Math.random() > Math.random() ? BISHOP : KNIGHT
            floorPoints -= 3
          } else if (floor % 2 === 0 && floorPoints >= 2) {
            // chest
            gameData.rooms[room] = CHEST
            floorPoints -= 2
          } else {
            // pawn (eventually)
            if (room < 8 || room > 47) {
              // the room is not valid for a pawn, so get a new one
              do {
                room = Math.floor(Math.random() * 39) + 8 // select a random room between 8 and 47
              } while (gameData.rooms[room] !== EMPTY
                || room === start + W_E_step
                || room === start - W_E_step
                || room === start + SW_NE_step
                || room === start - SW_NE_step
                || room === start + N_S_step
                || room === start - N_S_step
                || room === start + NW_SE_step
                || room === start - NW_SE_step)
            }
            gameData.rooms[room] = PAWN
            floorPoints -= 1
          }
          gameData.numItems++
        }
    }
  }

  // save all the current data
  localStorage.setItem('gameData', JSON.stringify(gameData))

  drawFloor(gameData.rooms)
}

function drawFloor(rooms) {
  // console.log(gameData.numItems)
  dungeon.innerHTML = ''
  rooms.forEach((room, i) => {
    const square = document.createElement('div')
    square.classList.add('square')
    switch (room) {
      case PLAYER:
        square.innerHTML = player
        break
      case DOOR:
        square.innerHTML = door
        square.firstChild.addEventListener('click', () => {
          nextFloor()
        })
        break
      case PAWN:
        square.innerHTML = pawn
        break
      case CHEST:
        square.innerHTML = chest
        break
      case KNIGHT:
        square.innerHTML = knight
        break
      case BISHOP:
        square.innerHTML = bishop
        break
      case ROOK:
        square.innerHTML = rook
        break
      case QUEEN:
        square.innerHTML = queen
        break
      case BOSS:
        square.innerHTML = boss
        break
    }

    if (room === PLAYER) square.firstChild?.setAttribute('draggable', true) // only do this if this is the player
    square.setAttribute('square-id', i)
    const row = Math.floor((63 - i) / 8) + 1
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

    let targetId = 0
    if (e.target.getAttribute('square-id')) {
      targetId = Number(e.target.getAttribute('square-id'))
    } else if (e.target.parentNode.getAttribute('square-id')) {
      targetId = Number(e.target.parentNode.getAttribute('square-id'))
    } else if (e.target.parentNode.parentNode.getAttribute('square-id')) { // This is for Safari
      targetId = Number(e.target.parentNode.parentNode.getAttribute('square-id'))
    }
    const startId = Number(draggedElement.parentNode.getAttribute('square-id'))
    if (movePlayer(targetId, startId)) {
      const allSquares = document.querySelectorAll('#dungeon .square')
      allSquares.forEach(square => {
        const startId = Number(square.getAttribute('square-id'))
        if (isOccupied(startId) && square.firstChild.classList.contains('monster')) {
          switch (square.firstChild.id) {
            case 'pawn':
              if (validatePawn(gameData.player, startId) && !gameData.moved.includes(startId)) {
                movePiece(gameData.player, startId)
                gameData.moved.push(gameData.player)
                gameData.player = -1
              } else if (!gameData.moved.includes(startId)) {
                moveEnemy(startId, 'pawn')
              }
              break
            case 'knight':
              if (validateKnight(gameData.player, startId) && !gameData.moved.includes(startId)) {
                movePiece(gameData.player, startId)
                gameData.moved.push(gameData.player)
                gameData.player = -1
              } else if (!gameData.moved.includes(startId)) {
                moveEnemy(startId, 'knight')
              }
              break
            case 'bishop':
              if (validateDiagonal(gameData.player, startId) && !gameData.moved.includes(startId)) {
                movePiece(gameData.player, startId)
                gameData.moved.push(gameData.player)
                gameData.player = -1
              } else if (!gameData.moved.includes(startId)) {
                moveEnemy(startId, 'bishop')
              }
              break
            case 'rook':
              if (validateAdjacent(gameData.player, startId) && !gameData.moved.includes(startId)) {
                movePiece(gameData.player, startId)
                gameData.moved.push(gameData.player)
                gameData.player = -1
              } else if (!gameData.moved.includes(startId)) {
                moveEnemy(startId, 'rook')
              }
              break
            case 'queen':
              if ((validateDiagonal(gameData.player, startId) || validateAdjacent(gameData.player, startId)) && !gameData.moved.includes(startId)) {
                movePiece(gameData.player, startId)
                gameData.moved.push(gameData.player)
                gameData.player = -1
              } else if (!gameData.moved.includes(startId)) {
                moveEnemy(startId, 'queen')
              }
              break
          }
        }
      })
      if (gameData.player === -1) {
        document.dispatchEvent(new CustomEvent('player-death'))
      }
      // save all the current data
      localStorage.setItem('gameData', JSON.stringify(gameData))
    }
  }

  const allSquares = document.querySelectorAll('#dungeon .square')
  allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)
  })
}

function movePlayer(targetId, startId) {
  const target = document.querySelector(`[square-id="${targetId}"]`)
  gameData.moved = []

  // Save this out so we can refresh on move fail
  const knightsBefore = gameData.knights
  const bishopsBefore = gameData.bishops
  const rooksBefore = gameData.rooks

  // The second check should be impossible
  if (startId === targetId || !isOccupied(startId)) return false

  // Move validation
  if (!validateDiagonal(targetId, startId, true) && !validateAdjacent(targetId, startId, true)) {
    // Here we need to check all of the powerups they have
    const knight = gameData.knights && validateKnight(targetId, startId)
    const bishop = gameData.bishops && validateDiagonal(targetId, startId)
    const rook = gameData.rooks && validateAdjacent(targetId, startId)

    if (!knight && !bishop && !rook) {
      return false
    } else if (knight) {
      gameData.knights--
      updateInfo()
    } else if (bishop) {
      gameData.bishops--
      updateInfo()
    } else if (rook) {
      gameData.rooks--
      updateInfo()
    }
  }

  if (isOccupied(targetId)) {
    switch (target.firstChild.id) {
      case 'pawn':
        gameData.numItems--
        break
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
      case 'door':
        const nextFloorCost = Math.ceil(gameData.floor / 10)
        if (gameData.points >= nextFloorCost) {
          gameData.numItems = -1
        } else {
          alert(`Need ${nextFloorCost - gameData.points} more points`)
          gameData.knights = knightsBefore
          gameData.bishops = bishopsBefore
          gameData.rooks = rooksBefore
          updateInfo()
          return false
        }
    }
    updateInfo()
    movePiece(targetId, startId)
    gameData.player = targetId
    if (gameData.numItems === -1) {
      nextFloor()
      // save all the current data
      localStorage.setItem('gameData', JSON.stringify(gameData))
      return false
    }
    if (gameData.numItems === 0) {
      // the floor is cleared
      const required = [door]
      while (required.length > 0) {
        const index = Math.floor(Math.random() * 63) // get a number between 0 and 63
        if (index !== targetId) {
          const door = document.querySelector(`[square-id="${index}"]`)
          door.innerHTML = required.pop()
          gameData.rooms[index] = DOOR
          door.addEventListener('click', () => {
            nextFloor()
          })
          // save all the current data
          localStorage.setItem('gameData', JSON.stringify(gameData))
        }
      }
    }
    return true
  } else {
    movePiece(targetId, startId)
    gameData.player = targetId
    return true
  }
}

function moveEnemy(startId, monsterType) {
  const possibleMoves = []
  for (let targetId = 0; targetId < 64; targetId++) {
    switch (monsterType) {
      case 'pawn':
        if (validatePawn(targetId, startId) && !isOccupied(targetId)) possibleMoves.push(targetId)
        break
      case 'knight':
        if (validateKnight(targetId, startId) && !isOccupied(targetId)) possibleMoves.push(targetId)
        break
      case 'bishop':
        if (validateDiagonal(targetId, startId) && !isOccupied(targetId)) possibleMoves.push(targetId)
        break
      case 'rook':
        if (validateAdjacent(targetId, startId) && !isOccupied(targetId)) possibleMoves.push(targetId)
        break
      case 'queen':
        if ((validateDiagonal(targetId, startId) || validateAdjacent(targetId, startId)) && !isOccupied(targetId)) possibleMoves.push(targetId)
        break
    }
  }
  if (possibleMoves.length) {
    const targetId = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]
    movePiece(targetId, startId)
    gameData.moved.push(targetId)
    if (monsterType === 'pawn' && targetId > 55) {
      // this pawn needs to promote
      const square = document.querySelector(`[square-id="${targetId}"]`)
      const piece = Math.floor(Math.random() * 3) + 5 // select a random number between 5 and 8
      switch (piece) {
        case KNIGHT:
          square.innerHTML = knight
          gameData.rooms[targetId] = KNIGHT
          break
        case BISHOP:
          square.innerHTML = bishop
          gameData.rooms[targetId] = BISHOP
          break
        case ROOK:
          square.innerHTML = rook
          gameData.rooms[targetId] = ROOK
          break
        case QUEEN:
          square.innerHTML = queen
          gameData.rooms[targetId] = QUEEN
          break
      }
    }
  }
}

function movePiece(targetId, startId) {
  const target = document.querySelector(`[square-id="${targetId}"]`)
  const start = document.querySelector(`[square-id="${startId}"]`)
  updateRooms(targetId, startId)

  if (isOccupied(targetId)) {
    target.append(start.firstChild)
    target.firstChild.remove()
    return
  } else {
    target.append(start.firstChild)
    return
  }
}

function updateRooms(targetId, startId) {
  gameData.rooms[targetId] = gameData.rooms[startId]
  gameData.rooms[startId] = EMPTY
}

function nextFloor() {
  const nextFloorCost = Math.ceil(gameData.floor / 10)
  if (gameData.points >= nextFloorCost) {
    gameData.rooms = []
    gameData.numItems = 0
    gameData.floor++
    createFloor(gameData.floor, gameData.player)
    gameData.points -= nextFloorCost
    // save all the current data
    localStorage.setItem('gameData', JSON.stringify(gameData))
    updateInfo()
    return true
  } else {
    alert(`Need ${nextFloorCost - gameData.points} more points`)
    return false
  }
}

function addTask() {
  const taskInput = document.getElementById('task-name')
  const taskName = taskInput.value.trim()
  const taskPriority = document.getElementById('task-importance')
  const priority = taskPriority.value
  if (taskName === '') {
    alert('Please name your task')
    return
  }

  gameData.tasks[taskName] = priority
  // save all the current data
  localStorage.setItem('gameData', JSON.stringify(gameData))

  refreshTaskList()
  taskInput.value = '' // Clear input field after adding todo
}

function refreshTaskList() {
  const taskList = document.getElementById('task-list')
  taskList.innerHTML = ''
  for (const [key, value] of Object.entries(gameData.tasks)) {
    const newTask = document.createElement('li')
    newTask.textContent = `${key} (${value})`
   
    // Add event listener to mark todo as completed
    newTask.addEventListener('click', function () {
      this.remove()
      delete gameData.tasks[key]
      gameData.points += Number(value)
      updateInfo()
      // save all the current data
      localStorage.setItem('gameData', JSON.stringify(gameData))
    })
  
    taskList.appendChild(newTask)
  }
}

function updateInfo() {
  const info = document.getElementById('info')
  info.innerText = `Floor: ${gameData.floor}\nPoints: ${gameData.points}\nKnights: ${gameData.knights}\nBishops: ${gameData.bishops}\nRooks: ${gameData.rooks}`
}

function validatePawn(targetId, startId) {
  const movingFromEtoW = isBoardEdge(startId).edge.includes('E') && isBoardEdge(targetId).edge.includes('W')
  const movingFromWtoE = isBoardEdge(startId).edge.includes('W') && isBoardEdge(targetId).edge.includes('E')

  if (!isOccupied(targetId) && targetId === startId + N_S_step) return true

  if (isOccupied(targetId) && !movingFromEtoW && !movingFromWtoE && (targetId === startId + NW_SE_step || targetId === startId + SW_NE_step)) {
      return true
  }

  return false
}

function validateDiagonal(targetId, startId, limit = false) {
  let currentId = startId

  const startIsEdge = isBoardEdge(startId)

  while (currentId >= 0 && currentId <= 63) {
    if (targetId > startId) {
      if ((targetId - currentId) % NW_SE_step === 0 && !startIsEdge.edge.includes('E')) {
        currentId += NW_SE_step
      } else if ((targetId - currentId) % SW_NE_step === 0 && !startIsEdge.edge.includes('W')) {
        currentId += SW_NE_step
      } else {
        return false
      }
    } else {
      if ((currentId - targetId) % NW_SE_step === 0 && !startIsEdge.edge.includes('W')) {
        currentId -= NW_SE_step
      } else if ((currentId - targetId) % SW_NE_step === 0 && !startIsEdge.edge.includes('E')) {
        currentId -= SW_NE_step
      } else {
        return false
      }
    }

    if (limit || isOccupied(currentId) || isBoardEdge(currentId).bool) {
      return targetId === currentId
    }

    if (targetId === currentId) return true
  }

  return false
}

function validateAdjacent(targetId, startId, limit = false) {
  let currentId = startId

  const startIsEdge = isBoardEdge(startId)
  const sameEdge = startIsEdge.bool ? isBoardEdge(targetId).edge.some(value => startIsEdge.edge.includes(value)) : false

  while (currentId >= 0 && currentId <= 63) {
    if (targetId > startId) {
      if ((targetId - currentId) % N_S_step === 0) {
        currentId += N_S_step
      } else if ((targetId - currentId) < N_S_step && !startIsEdge.edge.includes('E')) {
        currentId += W_E_step
      } else {
        return false
      }
    } else {
      if ((currentId - targetId) % N_S_step === 0) {
        currentId -= N_S_step
      } else if ((currentId - targetId) < N_S_step && !startIsEdge.edge.includes('W')) {
        currentId -= W_E_step
      } else {
        return false
      }
    }

    if (limit || isOccupied(currentId) || (isBoardEdge(currentId).bool && !sameEdge)) {
      return targetId === currentId
    }

    if (targetId === currentId) return true
  }

  return false
}

function validateKnight(targetId, startId) {
  let steps = [6, 10, 15, 17]
  const sign = targetId > startId ? 1 : -1

  const knightOnEdge = isBoardEdge(startId)
  const knightOnInnerEdge = {
    bool: false,
    edge: ''
  }

  if (startId >= 1 && startId <= 57 && (startId - 1) % 8 === 0) {
    knightOnInnerEdge.bool = true
    knightOnInnerEdge.edge = 'IW'
  }

  if (startId >= 6 && startId <= 62 && (startId + 2) % 8 === 0) {
    knightOnInnerEdge.bool = true
    knightOnInnerEdge.edge = 'IE'
  }

  if (knightOnEdge.bool || knightOnInnerEdge.bool) {
    if (sign < 0) { // -
      if (knightOnEdge.edge.includes('W')) steps = [6, 15]
      if (knightOnEdge.edge.includes('E')) steps = [10, 17]
      if (knightOnInnerEdge.edge === 'IW') steps = [6, 15, 17]
      if (knightOnInnerEdge.edge === 'IE') steps = [10, 15, 17]
    } else { // +
      if (knightOnEdge.edge.includes('W')) steps = [10, 17]
      if (knightOnEdge.edge.includes('E')) steps = [6, 15]
      if (knightOnInnerEdge.edge === 'IW') steps = [10, 15, 17]
      if (knightOnInnerEdge.edge === 'IE') steps = [6, 15, 17]
    }
  }

  for (let step of steps) {
    if (targetId === startId + (sign * step)) {
      return true
    }
  }

  return false
}

function isOccupied(id) {
  const square = document.querySelector(`[square-id="${id}"]`)
  return square?.firstChild
}

function isBoardEdge(id) {
  const edge = {
    bool: false,
    edge: []
  }

  // TOP EDGE
  if (id < 8) {
    edge.bool = true
    edge.edge.push('N')
  }

  // BOTTOM EDGE
  if (id > 55) {
    edge.bool = true
    edge.edge.push('S')
  }

  // LEFT EDGE
  if (id % 8 === 0) {
    edge.bool = true
    edge.edge.push('W')
  }

  // RIGHT EDGE
  if ((id + 1) % 8 === 0) {
    edge.bool = true
    edge.edge.push('E')
  }

  return edge
}

createFloor(gameData.floor, 0)