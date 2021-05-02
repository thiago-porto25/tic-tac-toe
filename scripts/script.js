class Player{
  constructor(name, symbol){
    this.name = name
    this.symbol = symbol
  }

  changeName(newName){
    this.name = newName
  }

  makeMove(e, playerTurn){
    e.target.textContent = playerTurn.symbol
    const _squareIndex = e.target.getAttribute('data-index')
    boardItself.board.splice(_squareIndex, 1, playerTurn.symbol)
  }

  randomSquare() {
    return Math.round(Math.random() * 8)
  }

  makeMoveAI() {
    let _AIChoice
    let _AISquare
    for (let i = 0; i < 9; i++) {
      _AIChoice = this.randomSquare()
      _AISquare = document.querySelector(`[data-index = "${_AIChoice}"]`)
      if (_AISquare.textContent === '') break
    }
    _AISquare.textContent = player2.symbol
    boardItself.board.splice(_AIChoice, 1, player2.symbol)
  }
}

const player1 = new Player('player1', 'X')
const player2 = new Player('player2', 'O')

const init = (function () {
  const _initModal = document.querySelector('#init')
  const _newGameBtn = _initModal.querySelector('button')
  let gameEnd = false
  let turn = 0

  const _removeInitModal = () => {
    _initModal.style.display = 'none'
    renderHandler.renderChooseMode()
  }
  _newGameBtn.addEventListener('click', _removeInitModal)

  return { gameEnd, turn }
})()

const boardItself = (function () {
  let board = ['', '', '', '', '', '', '', '', '']
  let typeGame
  const resetBoard = () => {
    boardItself.board = ['', '', '', '', '', '', '', '', '']
  }
  const checkWinner = player => {
    if (
      boardItself.board[0] === player.symbol &&
      boardItself.board[3] === player.symbol &&
      boardItself.board[6] === player.symbol
    )
      return true
    else if (
      boardItself.board[1] === player.symbol &&
      boardItself.board[4] === player.symbol &&
      boardItself.board[7] === player.symbol
    )
      return true
    else if (
      boardItself.board[2] === player.symbol &&
      boardItself.board[5] === player.symbol &&
      boardItself.board[8] === player.symbol
    )
      return true
    else if (
      boardItself.board[0] === player.symbol &&
      boardItself.board[1] === player.symbol &&
      boardItself.board[2] === player.symbol
    )
      return true
    else if (
      boardItself.board[3] === player.symbol &&
      boardItself.board[4] === player.symbol &&
      boardItself.board[5] === player.symbol
    )
      return true
    else if (
      boardItself.board[6] === player.symbol &&
      boardItself.board[7] === player.symbol &&
      boardItself.board[8] === player.symbol
    )
      return true
    else if (
      boardItself.board[0] === player.symbol &&
      boardItself.board[4] === player.symbol &&
      boardItself.board[8] === player.symbol
    )
      return true
    else if (
      boardItself.board[2] === player.symbol &&
      boardItself.board[4] === player.symbol &&
      boardItself.board[6] === player.symbol
    )
      return true
  }
  const checkTie = turns => {
    if (turns > 8) return true
  }
  return {
    resetBoard,
    checkWinner,
    checkTie,
    typeGame,
    board,
  }
})()

const renderHandler = (function () {
  const _modeBtnsAndBoard = document.querySelector('#modeBtnsAndBoard')
  const _buttonAI = _modeBtnsAndBoard.querySelector('#buttonAI')
  const _buttonTwoPlayers = _modeBtnsAndBoard.querySelector('#buttonTwoPlayers')
  const _buttonReset = _modeBtnsAndBoard.querySelector('#buttonReset')
  const _footer = document.querySelector('footer')
  //selecting modals
  const _modalsContainer = document.querySelector('#modalsContainer')
  const modalAI = _modalsContainer.querySelector('#modalAI')
  const modalTwoPlayers = _modalsContainer.querySelector('#modalTwoPlayers')
  const winnerModal = _modalsContainer.querySelector('#winnerModal')
  const _winnerText = winnerModal.querySelector('p')
  const _closeAI = modalAI.querySelector('.close')
  const _closeTwoPlayers = modalTwoPlayers.querySelector('.close')
  //selecting renderBoard
  let _gameBoard = document.querySelector('#gameBoard')
  let boardSquares = _gameBoard.querySelectorAll('.boardSquare')

  const createNewBoard = () => {
    const newBoard = _gameBoard.cloneNode(true)
    _modeBtnsAndBoard.removeChild(gameBoard)
    _modeBtnsAndBoard.appendChild(newBoard)
    _gameBoard = newBoard
    boardSquares = _gameBoard.querySelectorAll('.boardSquare')
    return boardSquares
  }
  const renderResetBtn = () => {
    _buttonReset.style.display = 'inline'
  }
  const renderChooseMode = () => {
    _modeBtnsAndBoard.style.display = 'flex'
    _buttonAI.style.display = ''
    _buttonTwoPlayers.style.display = ''
  }
  const unrenderModeBtnsAndBoard = () => {
    _modeBtnsAndBoard.style.display = 'none'
  }
  const _renderAIModal = () => {
    _modalsContainer.style.display = 'flex'
    modalAI.style.display = 'flex'
  }
  const _renderTwoPlayersModal = () => {
    _modalsContainer.style.display = 'flex'
    modalTwoPlayers.style.display = 'flex'
  }
  const _blurBackground = () => {
    _modeBtnsAndBoard.setAttribute('class', 'blurred')
    _footer.setAttribute('class', 'blurred')
  }
  const _unblurBackground = () => {
    _modeBtnsAndBoard.setAttribute('class', '')
    _footer.setAttribute('class', '')
  }
  const closeWinnerModal = () => {
    _unblurBackground()
    _modalsContainer.style.display = 'none'
    winnerModal.style.display = 'none'
  }
  const renderWinnerModal = winner => {
    _blurBackground()
    _modalsContainer.style.display = 'flex'
    winnerModal.style.display = 'flex'
    if (winner === undefined) {
      _winnerText.textContent = "It's a Tie!"
    } else {
      _winnerText.textContent = `${winner.name} is the Winner!`
    }
    setTimeout(closeWinnerModal, 4000)
  }
  const closeAIModal = () => {
    _modalsContainer.style.display = 'none'
    modalAI.style.display = 'none'
  }
  const closeTwoPlayerModal = () => {
    _modalsContainer.style.display = 'none'
    modalTwoPlayers.style.display = 'none'
  }
  const resetBoard = () => {
    boardSquares.forEach(square => (square.textContent = ''))
    boardItself.resetBoard()
  }
  const renderBoard = mode => {
    _gameBoard.style.display = 'flex'
    boardSquares.forEach(square => square.setAttribute('class', mode))
    resetBoard()
    renderResetBtn()
    if (modalAI.style.display === 'flex') closeAIModal()
    if (modalTwoPlayers.style.display === 'flex') closeTwoPlayerModal()
  }

  _buttonAI.addEventListener('click', _renderAIModal)
  _buttonTwoPlayers.addEventListener('click', _renderTwoPlayersModal)
  _closeAI.addEventListener('click', closeAIModal)
  _closeTwoPlayers.addEventListener('click', closeTwoPlayerModal)

  return {
    createNewBoard,
    renderChooseMode,
    renderWinnerModal,
    renderBoard,
    resetBoard,
    closeAIModal,
    closeTwoPlayerModal,
    unrenderModeBtnsAndBoard,
    modalAI,
    modalTwoPlayers,
    winnerModal,
    boardSquares,
  }
})()

const gameLogic = (function(){
  const TwoPlayersGame = (e, playerTurn) => {
    playerTurn.makeMove(e, playerTurn)
    ++init.turn
    if (boardItself.checkWinner(playerTurn)) {
      renderHandler.renderWinnerModal(playerTurn)
      init.gameEnd = true
      renderHandler.renderChooseMode()
      
    } else if (boardItself.checkTie(init.turn)) {
      renderHandler.renderWinnerModal(undefined)
      init.gameEnd = true
      renderHandler.renderChooseMode()
    }
  }

  const AIGame = (e) => {
    player1.makeMove(e, player1)
    ++init.turn
    if (boardItself.checkWinner(player1)) {
      renderHandler.renderWinnerModal(player1)
      init.gameEnd = true
      renderHandler.renderChooseMode()

    } else if (boardItself.checkTie(init.turn)) {
      renderHandler.renderWinnerModal(undefined)
      init.gameEnd = true
      renderHandler.renderChooseMode()
    }  

    if(init.gameEnd === true) return
    
    player2.makeMoveAI()
    ++init.turn
    if (boardItself.checkWinner(player2)) {
    renderHandler.renderWinnerModal(player2)
    init.gameEnd = true
    renderHandler.renderChooseMode()
    }   
  }

  const runGame = (player1, player2, _squares, typeGame) => {
    let playerTurn = player1
    init.gameEnd = false
    init.turn = 0

    _squares.forEach(square => square.addEventListener('click', e => {
      if (e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || init.gameEnd) return

      if(typeGame === 'Two Players') {
        TwoPlayersGame(e, playerTurn)
        if(playerTurn === player1) playerTurn = player2 
        else if(playerTurn === player2) playerTurn = player1
      } else if(typeGame === 'Computer'){
        AIGame(e)
      }
    }))
  }
  return {
    runGame
  }
})()

const gameBoardHandler = (function () {
  const modalAI = renderHandler.modalAI
  const modalTwoPlayers = renderHandler.modalTwoPlayers
  const buttonReset = document.querySelector('#buttonReset')
  //selecting inputs and buttons from Two Players Modal
  const _player1NameInput = modalTwoPlayers.querySelector('#player1Name')
  const _player2NameInput = modalTwoPlayers.querySelector('#player2Name')
  //selecting inputs and buttons from AI Modal
  const _playerNameAIInput = modalAI.querySelector('#playerNameAI')
  //selecting forms
  const formAI = document.querySelector('#formAI')
  const formTwoPlayers = document.querySelector('#formTwoPlayers')

  const resetGame = () => {
    renderHandler.resetBoard()
    const _squares = renderHandler.createNewBoard()
    gameLogic.runGame(player1, player2, _squares, boardItself.typeGame)  
  }

  const submitAndStartAIGame = () => {
    const _squares = renderHandler.createNewBoard()
    renderHandler.unrenderModeBtnsAndBoard()
    renderHandler.renderChooseMode()
    renderHandler.renderBoard('boardSquare AIBoard')

    const _playerName = _playerNameAIInput.value
    const _AIName = 'Computer'
    player1.changeName(_playerName)
    player2.changeName(_AIName)
    boardItself.typeGame = 'Computer'

    _playerNameAIInput.value = ''

    gameLogic.runGame(player1, player2, _squares, boardItself.typeGame)
  }

  const submitAndStartTwoPlayersGame = () => {
    const _squares = renderHandler.createNewBoard()
    renderHandler.unrenderModeBtnsAndBoard()
    renderHandler.renderChooseMode()
    renderHandler.renderBoard('boardSquare twoPlayersBoard')

    const _player1Name = _player1NameInput.value
    const _player2Name = _player2NameInput.value
    player1.changeName(_player1Name)
    player2.changeName(_player2Name)
    boardItself.typeGame = 'Two Players'

    _player1NameInput.value = ''
    _player2NameInput.value = ''

    gameLogic.runGame(player1, player2, _squares, boardItself.typeGame)
  }

  const _preventRefresh = event => {
    event.preventDefault()
  }

  formAI.addEventListener('submit', _preventRefresh)
  formAI.addEventListener('submit', submitAndStartAIGame)

  formTwoPlayers.addEventListener('submit', _preventRefresh)
  formTwoPlayers.addEventListener('submit', submitAndStartTwoPlayersGame)

  buttonReset.addEventListener('click', resetGame)
})()
