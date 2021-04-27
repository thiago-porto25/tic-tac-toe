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
  return { name, symbol }
}

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
  const _playAgainAI = _modeBtnsAndBoard.querySelector('#playAgainAI')
  const _playAgainTwoPlayers = _modeBtnsAndBoard.querySelector('#playAgainTwoPlayers')
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
  const _gameBoard = document.querySelector('#gameBoard')
  const boardSquares = _gameBoard.querySelectorAll('.boardSquare')


  const renderPlayAgainAI = () => {
    _playAgainAI.style.display = 'inline'
  }
  const renderPlayAgainTwoPlayers = () => {
    _playAgainTwoPlayers.style.display = 'inline'
  }
  const unrenderPlayAgainAI = () => {
    _playAgainAI.style.display = 'none'
  }
  const unrenderPlayAgainTwoPlayers = () => {
    _playAgainTwoPlayers.style.display = 'none'
  }
  const renderButtonAI = () => {
    _buttonAI.style.display = ''
  }
  const renderButtonTwoPlayers = () => {
    _buttonTwoPlayers.style.display = ''
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
    renderChooseMode,
    renderWinnerModal,
    renderBoard,
    resetBoard,
    closeAIModal,
    closeTwoPlayerModal,
    unrenderChooseMode,
    renderPlayAgainAI,
    renderPlayAgainTwoPlayers,
    unrenderPlayAgainAI,
    unrenderPlayAgainTwoPlayers,
    renderButtonAI,
    renderButtonTwoPlayers,
    modalAI,
    modalTwoPlayers,
    winnerModal,
    boardSquares,
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
  //abort variable
  let abortTwoPlayers = false
  let abortAI = false

  const _randomSquare = () => {
    return Math.round(Math.random() * 8)
  }
  const runGameTwoPlayers = (player1, player2, _squares) => {
    let _turn = 'player1'
    let _gameEnd = false
    let _turnNumber = 0

    _squares.forEach(square => square.addEventListener('click', e => {
        if (_turn === 'player1') {
          if (e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
          else {
            e.target.textContent = player1.symbol

            const _squareIndex = e.target.getAttribute('data-index')
            boardItself.board.splice(_squareIndex, 1, player1.symbol)

            if (boardItself.checkWinner(player1)) {
              renderHandler.renderWinnerModal(player1)
              _gameEnd = true
              renderHandler.renderButtonAI()
              renderHandler.renderPlayAgainTwoPlayers()
            } else if (boardItself.checkTie(_turnNumber)) {
              renderHandler.renderWinnerModal(undefined)
              _gameEnd = true
              renderHandler.renderButtonAI()
              renderHandler.renderPlayAgainTwoPlayers()
            } else {
              _turn = 'player2'
              _turnNumber += 1
            }

          }
        } else if (_turn === 'player2') {
          if (e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
          else {
            e.target.textContent = player2.symbol

            const _squareIndex = e.target.getAttribute('data-index')
            boardItself.board.splice(_squareIndex, 1, player2.symbol)

            if (boardItself.checkWinner(player2)) {
              renderHandler.renderWinnerModal(player2)
              _gameEnd = true
              renderHandler.renderButtonAI()
              renderHandler.renderPlayAgainTwoPlayers()
            } else if (boardItself.checkTie(_turnNumber)) {
              renderHandler.renderWinnerModal(undefined)
              _gameEnd = true
              renderHandler.renderButtonAI()
              renderHandler.renderPlayAgainTwoPlayers()
            } else _turn = 'player1'
            _turnNumber += 1
          }
        }
    })
    )
  }
  const runGameAI = (player1, player2, _squares) => {
    let _turn = 'player1'
    let _gameEnd = false
    let _turnNumber = 0

    _squares.forEach(square => square.addEventListener('click', e => {
        if (_turn === 'player1') {
          if (e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
          else {
            e.target.textContent = player1.symbol

            const _squareIndex = e.target.getAttribute('data-index')
            boardItself.board.splice(_squareIndex, 1, player1.symbol)

            if (boardItself.checkWinner(player1)) {
              renderHandler.renderWinnerModal(player1)
              _gameEnd = true
              renderHandler.renderButtonTwoPlayers()
              renderHandler.renderPlayAgainAI()
            } else if (boardItself.checkTie(_turnNumber)) {
              renderHandler.renderWinnerModal(undefined)
              _gameEnd = true
              renderHandler.renderButtonTwoPlayers()
              renderHandler.renderPlayAgainAI()
            } else{
              _turn = 'player2'
              _turnNumber += 1
            }
          }
        }
        if (_turn === 'player2') {
          let _AIChoice
          let _AISquare

          if (_gameEnd === true) return
          else {
            for (let i = 0; i < 9; i++) {
              _AIChoice = _randomSquare()
              _AISquare = document.querySelector(`[data-index = "${_AIChoice}"]`)
              if (_AISquare.textContent == '') break
            }

            _AISquare.textContent = player2.symbol
            boardItself.board.splice(_AIChoice, 1, player2.symbol)

            if (boardItself.checkWinner(player2)) {
              renderHandler.renderWinnerModal(player2)
              _gameEnd = true
              renderHandler.renderButtonTwoPlayers()
              renderHandler.renderPlayAgainAI()
            } else if (boardItself.checkTie(_turnNumber)) {
              renderHandler.renderWinnerModal(undefined)
              _gameEnd = true
              renderHandler.renderButtonTwoPlayers()
              renderHandler.renderPlayAgainAI()
            } else {
              _turn = 'player1'
              _turnNumber += 1
            }
          }
        }
      })
    )
  }

  const submitAndStartAIGame = (player, AI) => {
    renderHandler.renderBoard('boardSquare AIBoard')
    const _squares = renderHandler.boardSquares

    if (player === undefined || AI === undefined) {
      const _playerName = _playerNameAIInput.value
      const _AIName = 'Computer'
      let _playerSymbol = 'X'
      let _AISymbol = 'O'

      _playerNameAIInput.value = ''

      player = playerFactory(_playerName, _playerSymbol)
      AI = playerFactory(_AIName, _AISymbol)
    }
    renderHandler.unrenderChooseMode()
    runGameAI(player, AI, _squares)
  }
  const submitAndStartTwoPlayersGame = (player1, player2) => {
    renderHandler.renderBoard('boardSquare twoPlayersBoard')
    const _squares = renderHandler.boardSquares

    if (player1 === undefined || player2 === undefined) {
      const _player1Name = _player1NameInput.value
      const _player2Name = _player2NameInput.value
      const _player1Symbol = 'X'
      const _player2Symbol = 'O'

      _player1NameInput.value = ''
      _player2NameInput.value = ''

      player1 = playerFactory(_player1Name, _player1Symbol)
      player2 = playerFactory(_player2Name, _player2Symbol)
    }
    renderHandler.unrenderChooseMode()
    runGameTwoPlayers(player1, player2, _squares)
  }
  const _preventRefresh = event => {
    event.preventDefault()
  }

  formAI.addEventListener('submit', _preventRefresh)
  formAI.addEventListener('submit', submitAndStartAIGame)

  formTwoPlayers.addEventListener('submit', _preventRefresh)
  formTwoPlayers.addEventListener('submit', submitAndStartTwoPlayersGame)
})()
