const init = (function () {
  const _initModal = document.querySelector('#init')
  const _newGameBtn = _initModal.querySelector('button')

  const _removeInitModal = () => {
    _initModal.style.display = 'none'
    renderHandler.renderChooseMode()
  }
  _newGameBtn.addEventListener('click', _removeInitModal)
})()

const playerFactory = (name, symbol) => {
  const makeMove = () => {
    this.textContent = symbol
  }
  return {name, makeMove, symbol}
}

const renderHandler = (function(){
  const _modeBtnsAndBoard = document.querySelector('#modeBtnsAndBoard')
  const _buttonAI = _modeBtnsAndBoard.querySelector('#buttonAI')
  const _buttonTwoPlayers = _modeBtnsAndBoard.querySelector('#buttonTwoPlayers')
  const _resetBtnDiv = _modeBtnsAndBoard.querySelector('#resetBtnDiv')
  const _resetBtn = _modeBtnsAndBoard.querySelector('#resetBtn')
  //selecting modals
  const _modalsContainer = document.querySelector('#modalsContainer')
  const modalAI = _modalsContainer.querySelector('#modalAI')
  const modalTwoPlayers = _modalsContainer.querySelector('#modalTwoPlayers')
  const winnerModal = _modalsContainer.querySelector('#winnerModal')
  //selecting renderBoard
  const _gameBoard = document.querySelector('#gameBoard')
  const boardSquares = _gameBoard.querySelectorAll('.boardSquare')
  

  const renderChooseMode = () => {
    _modeBtnsAndBoard.style.display = 'flex'
  }
  const _renderAIModal = () => {
    _modalsContainer.style.display = 'flex'
    modalAI.style.display = 'flex'
  }
  const _renderTwoPlayersModal = () => {
    _modalsContainer.style.display = 'flex'
    modalTwoPlayers.style.display = 'flex'
  }
  const renderWinnerModal = () => {
    _modalsContainer.style.display = 'flex'
    winnerModal.style.display = 'flex'
  }
  const renderResetButton = () => {
    _resetBtnDiv.style.display = 'flex'
  }
  const closeAIModal = () => {
    _modalsContainer.style.display = 'none'
    modalAI.style.display = 'none'
  }
  const closeTwoPlayerModal = () => {
    _modalsContainer.style.display = 'none'
    modalTwoPlayers.style.display = 'none'
  }
  const closeWinnerModal = () => {
    _modalsContainer.style.display = 'none'
    winnerModal.style.display = 'none'
  }
  const resetBoard = () => {
    boardSquares.forEach(square => square.textContent = '')
  }
  const renderBoard = (mode) => {
    _gameBoard.style.display = 'flex'
    boardSquares.forEach(square => square.setAttribute('class', mode))
    resetBoard()
    renderResetButton()
    closeAIModal()
    closeTwoPlayerModal()
  }

  _buttonAI.addEventListener('click', _renderAIModal)
  _buttonTwoPlayers.addEventListener('click', _renderTwoPlayersModal)
  _resetBtn.addEventListener('click', resetBoard)

  return {
    renderChooseMode,
    renderWinnerModal,
    renderBoard,
    resetBoard,
    modalAI,
    modalTwoPlayers,
    winnerModal,
    boardSquares
  }
})()

const gameBoardHandler = (function(){
  const modalAI = renderHandler.modalAI
  const modalTwoPlayers = renderHandler.modalTwoPlayers
  //selecting inputs and buttons from Two Players Modal
  const _player1NameInput = modalTwoPlayers.querySelector('#player1Name')
  const _player2NameInput = modalTwoPlayers.querySelector('#player2Name')
  //selecting inputs and buttons from AI Modal
  const _playerNameAIInput = modalAI.querySelector('#playerNameAI')
  const _playerFirstInput =modalAI.querySelector('#playerFirst')
  const _AIFirstInput = modalAI.querySelector('#AIFirst')
  //selecting forms
  const formAI = document.querySelector('#formAI')
  const formTwoPlayers = document.querySelector('#formTwoPlayers')

  const runGame = (player1, player2) => {
    const _squares = renderHandler.boardSquares
    _squares.forEach(square => square.addEventListener('click', (e) => {
      e.target.textContent = player1.symbol
    }))
  }
  const submitAndStartAIGame = () => {
    const _playerName = _playerNameAIInput.value
    const _AIName = 'Computer'
    let _playerSymbol
    let _AISymbol  

    if(_playerFirstInput.checked === true) {
      _playerSymbol = 'X'
      _AISymbol = 'O'
    } else if(_AIFirstInput.checked === true) {
      _playerSymbol = 'O'
      _AISymbol = 'X'
    }
    renderHandler.renderBoard('boardSquare AIBoard')

    _playerNameAIInput.value = ''
    _playerFirstInput.checked = false
    _AIFirstInput.checked = false

    const player = playerFactory(_playerName, _playerSymbol)
    const AI = playerFactory(_AIName, _AISymbol)
    runGame(player, AI)
  }
  const submitAndStartTwoPlayersGame = () => {
    const _player1Name = _player1NameInput.value
    const _player2Name = _player2NameInput.value
    const _player1Symbol = 'X'
    const _player2Symbol = 'O'

    renderHandler.renderBoard('boardSquare twoPlayersBoard')

    _player1NameInput.value = ''
    _player2NameInput.value = ''

    const player1 = playerFactory(_player1Name, _player1Symbol)
    const player2 = playerFactory(_player2Name, _player2Symbol)
    runGame(player1, player2)
  }
  const _preventRefresh = (event) => {
    event.preventDefault()
  }

  formAI.addEventListener('submit', _preventRefresh)
  let AIGame = formAI.addEventListener('submit', submitAndStartAIGame)
  console.log(AIGame)
  formTwoPlayers.addEventListener('submit', _preventRefresh)
  formTwoPlayers.addEventListener('submit', submitAndStartTwoPlayersGame)
})()


