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

    for (let i = 0; i < 10; i++) {
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

  const _removeInitModal = () => {
    _initModal.style.display = 'none'
    renderHandler.renderChooseMode()
  }
  _newGameBtn.addEventListener('click', _removeInitModal)
})()

const boardItself = (function () {
  let board = ['', '', '', '', '', '', '', '', '']
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
    if (turns === 8) return true
  }
  return {
    resetBoard,
    checkWinner,
    checkTie,
    board,
  }
})()

const renderHandler = (function () {
  const _modeBtnsAndBoard = document.querySelector('#modeBtnsAndBoard')
  const _buttonAI = _modeBtnsAndBoard.querySelector('#buttonAI')
  const _buttonTwoPlayers = _modeBtnsAndBoard.querySelector('#buttonTwoPlayers')
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
  const boardSquares = _gameBoard.querySelectorAll('.boardSquare')

  const createNewBoard = () => {
    const newBoard = _gameBoard.cloneNode(true)
    _gameBoard = newBoard
  }
  const renderChooseMode = () => {
    _modeBtnsAndBoard.style.display = 'flex'
    _buttonAI.style.display = ''
    _buttonTwoPlayers.style.display = ''
  }
  const unrenderChooseMode = () => {
    _buttonAI.style.display = 'none'
    _buttonTwoPlayers.style.display = 'none'
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
    unrenderChooseMode,
    modalAI,
    modalTwoPlayers,
    winnerModal,
    boardSquares,
  }
})()

const gameLogic = (function(){
  const TwoPlayersGame = (e, playerTurn, _turn) => {
    playerTurn.makeMove(e, playerTurn)

    if (boardItself.checkWinner(playerTurn)) {
      renderHandler.renderWinnerModal(playerTurn)
      _gameEnd = true
      renderHandler.renderChooseMode()
    } else if (boardItself.checkTie(_turn)) {
      renderHandler.renderWinnerModal(undefined)
      _gameEnd = true
      renderHandler.renderChooseMode()
    }
  }

  const AIGame = (e, _turn) => {
    player1.makeMove(e, player1)
    if (boardItself.checkWinner(player1)) {
      renderHandler.renderWinnerModal(player1)
      runGame._gameEnd = true
      renderHandler.renderChooseMode()
    } else if (boardItself.checkTie(_turn)) {
      renderHandler.renderWinnerModal(undefined)
      runGame._gameEnd = true
      renderHandler.renderChooseMode()
    }  

    player2.makeMoveAI()
    if (boardItself.checkWinner(player2)) {
    renderHandler.renderWinnerModal(player2)
    runGame._gameEnd = true
    renderHandler.renderChooseMode()
    }   
  }

  const runGame = (player1, player2, _squares, typeGame) => {
    let playerTurn = player1
    let _gameEnd = false
    let _turn = 0

    _squares.forEach(square => square.addEventListener('click', e => {
      if (e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
      if(typeGame === 'Two Players') {
        TwoPlayersGame(e, playerTurn, _turn)

        if(playerTurn === player1) playerTurn = player2 
        else if(playerTurn === player2) playerTurn = player1

        _turn++
      } else if(typeGame === 'Computer'){
        AIGame(e, playerTurn, _turn)
        _turn++
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
  //selecting inputs and buttons from Two Players Modal
  const _player1NameInput = modalTwoPlayers.querySelector('#player1Name')
  const _player2NameInput = modalTwoPlayers.querySelector('#player2Name')
  //selecting inputs and buttons from AI Modal
  const _playerNameAIInput = modalAI.querySelector('#playerNameAI')
  //selecting forms
  const formAI = document.querySelector('#formAI')
  const formTwoPlayers = document.querySelector('#formTwoPlayers')

  const submitAndStartAIGame = () => {
    
    renderHandler.renderBoard('boardSquare AIBoard')
    const _squares = renderHandler.boardSquares

    const _playerName = _playerNameAIInput.value
    const _AIName = 'Computer'
    player1.changeName(_playerName)
    player2.changeName(_AIName)

    _playerNameAIInput.value = ''

    renderHandler.unrenderChooseMode()
    gameLogic.runGame(player1, player2, _squares, 'Computer')
  }

  const submitAndStartTwoPlayersGame = () => {
  
    renderHandler.renderBoard('boardSquare twoPlayersBoard')
    const _squares = renderHandler.boardSquares

    const _player1Name = _player1NameInput.value
    const _player2Name = _player2NameInput.value
    player1.changeName(_player1Name)
    player2.changeName(_player2Name)

    _player1NameInput.value = ''
    _player2NameInput.value = ''

    renderHandler.unrenderChooseMode()
    gameLogic.runGame(player1, player2, _squares, 'Two Players')
  }

  const _preventRefresh = event => {
    event.preventDefault()
  }

  formAI.addEventListener('submit', _preventRefresh)
  formAI.addEventListener('submit', submitAndStartAIGame)

  formTwoPlayers.addEventListener('submit', _preventRefresh)
  formTwoPlayers.addEventListener('submit', submitAndStartTwoPlayersGame)
})()
