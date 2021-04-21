const init = (function () {
  const _initModal = document.querySelector('#init')
  const _newGameBtn = _initModal.querySelector('button')

  const _removeInitModal = () => {
    _initModal.style.display = 'none'
    renderHandler.renderChooseMode()
  }

  _newGameBtn.addEventListener('click', _removeInitModal)
})()

const renderHandler = (function(){
  const _modeBtnsAndBoard = document.querySelector('#modeBtnsAndBoard')
  const _buttonAI = _modeBtnsAndBoard.querySelector('#buttonAI')
  const _buttonTwoPlayers = _modeBtnsAndBoard.querySelector('#buttonTwoPlayers')
  const _resetBtnDiv = _modeBtnsAndBoard.querySelector('#resetBtnDiv')
  const _resetBtn = _resetBtnDiv.querySelector('#resetBtn')
  //selecting modals
  const _modalsContainer = document.querySelector('#modalsContainer')
  const _modalAI = _modalsContainer.querySelector('#modalAI')
  const _modalTwoPlayers = _modalsContainer.querySelector('#modalTwoPlayers')
  const _winnerModal = _modalsContainer.querySelector('#winnerModal')
  //selecting inputs and buttons from AI Modal
  const _playerNameAI = _modalAI.querySelector('#playerNameAI')
  const _playerFirst =_modalAI.querySelector('#playerFirst')
  const _AIFirst = _modalAI.querySelector('#AIFirst')
  const _startAIGame = _modalAI.querySelector('.startAIGame')
  //selecting inputs and buttons from Two Players Modal
  const _player1Name = _modalTwoPlayers.querySelector('#player1Name')
  const _player2Name = _modalTwoPlayers.querySelector('#player2Name')
  const _startTwoPlayersGame = _modalTwoPlayers.querySelector('.startTwoPlayersGame')
  //selecting forms
  const _formAI = _modalsContainer.querySelector('#formAI')
  const _formTwoPlayers = _modalsContainer.querySelector('#formTwoPlayers')
  

  const renderChooseMode = () => {
    _modeBtnsAndBoard.style.display = 'flex'
  }
  const _renderAIModal = () => {
    _modalsContainer.style.display = 'flex'
    _modalAI.style.display = 'flex'
  }
  const _renderTwoPlayersModal = () => {
    _modalsContainer.style.display = 'flex'
    _modalTwoPlayers.style.display = 'flex'
  }
  const renderWinnerModal = () => {
    _modalsContainer.style.display = 'flex'
    _winnerModal.style.display = 'flex'
  }
  const _preventAIRefresh = (event) => {
    event.preventDefault()
  }
  const _preventTwoPlayersRefresh = (event) => {
    event.preventDefault()
  }

  _buttonAI.addEventListener('click', _renderAIModal)
  _buttonTwoPlayers.addEventListener('click', _renderTwoPlayersModal)

  _formAI.addEventListener('submit', _preventAIRefresh)
  _formTwoPlayers.addEventListener('submit', _preventTwoPlayersRefresh)

  return {
    renderChooseMode,
    renderWinnerModal
  }
})()
