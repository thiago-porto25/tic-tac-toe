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
  return {name, symbol}
}


const boardItself = (function(){
  let board = ['','','',
               '','','',
               '','','']
  const resetBoard = () => {
    boardItself.board = ['','','',
                         '','','',
                         '','','']
  }
  const checkWinner = (player) => {
    if(boardItself.board[0] === player.symbol &&
      boardItself.board[3] === player.symbol &&
      boardItself.board[6] === player.symbol) return true

    else if(boardItself.board[1] === player.symbol &&
          boardItself.board[4] === player.symbol &&
          boardItself.board[7] === player.symbol) return true
    
    else if(boardItself.board[2] === player.symbol &&
          boardItself.board[5] === player.symbol &&
          boardItself.board[8] === player.symbol) return true

    else if(boardItself.board[0] === player.symbol &&
          boardItself.board[1] === player.symbol &&
          boardItself.board[2] === player.symbol) return true

    else if(boardItself.board[3] === player.symbol &&
          boardItself.board[4] === player.symbol &&
          boardItself.board[5] === player.symbol) return true

    else if(boardItself.board[6] === player.symbol &&
          boardItself.board[7] === player.symbol &&
          boardItself.board[8] === player.symbol) return true

    else if(boardItself.board[0] === player.symbol &&
          boardItself.board[4] === player.symbol &&
          boardItself.board[8] === player.symbol) return true
    
    else if(boardItself.board[2] === player.symbol &&
          boardItself.board[4] === player.symbol &&
          boardItself.board[6] === player.symbol) return true
  }
  const checkTie = (turns) => {
    if(turns === 8) return true
  }
  return {
    resetBoard,
    checkWinner,
    checkTie,
    board
  }
})()


const renderHandler = (function(){
  const _modeBtnsAndBoard = document.querySelector('#modeBtnsAndBoard')
  const _buttonAI = _modeBtnsAndBoard.querySelector('#buttonAI')
  const _buttonTwoPlayers = _modeBtnsAndBoard.querySelector('#buttonTwoPlayers')
  const _resetBtnDiv = _modeBtnsAndBoard.querySelector('#resetBtnDiv')
  const resetBtn = _modeBtnsAndBoard.querySelector('#resetBtn')
  const _footer = document.querySelector('footer')
  //selecting modals
  const _modalsContainer = document.querySelector('#modalsContainer')
  const modalAI = _modalsContainer.querySelector('#modalAI')
  const modalTwoPlayers = _modalsContainer.querySelector('#modalTwoPlayers')
  const winnerModal = _modalsContainer.querySelector('#winnerModal')
  const _winnerText = winnerModal.querySelector('p')
  //selecting renderBoard
  const _gameBoard = document.querySelector('#gameBoard')
  const boardSquares = _gameBoard.querySelectorAll('.boardSquare')
  
  
  const changeResetText = (type) => {
    if(type === 'New Game') resetBtn.textContent = 'New Game'
    else if (type === 'Reset') resetBtn.textContent = 'Reset'
  }
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
    changeResetText('New Game')
  }
  const renderWinnerModal = (winner) => {
    _blurBackground()
    _modalsContainer.style.display = 'flex'
    winnerModal.style.display = 'flex'
    if(winner === undefined){
      _winnerText.textContent = 'It\'s a Tie!'
    } else {
      _winnerText.textContent = `${winner.name} is the Winner!`
    }
    setTimeout(closeWinnerModal, 4000)
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
  const resetBoard = () => {
    changeResetText('Reset')
    boardSquares.forEach(square => square.textContent = '')
    boardItself.resetBoard()
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
  resetBtn.addEventListener('click', resetBoard)

  return {
    renderChooseMode,
    renderWinnerModal,
    renderBoard,
    resetBoard,
    modalAI,
    modalTwoPlayers,
    winnerModal,
    boardSquares,
    resetBtn
  }
})()


const gameBoardHandler = (function(){
  const modalAI = renderHandler.modalAI
  const modalTwoPlayers = renderHandler.modalTwoPlayers
  let resetBtn = renderHandler.resetBtn
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


  const runGame = (player1, player2, _squares, _reset) => {
    if(_squares === undefined){
    _squares = renderHandler.boardSquares
    } 
    
    if (_reset !== undefined){
      resetBtn = _reset
    }
    let _turn = 'player1'
    let _gameEnd = false
    let _turnNumber = 0

    _squares.forEach(square => square.addEventListener('click', (e) => {
      if(_turn === 'player1'){
        if(e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
        else {
          e.target.textContent = player1.symbol

          const _squareIndex = e.target.getAttribute('data-index')
          boardItself.board.splice(_squareIndex, 1, player1.symbol)

          if(boardItself.checkWinner(player1)){
            renderHandler.renderWinnerModal(player1)
            _gameEnd = true
          } else if(boardItself.checkTie(_turnNumber)) {
            renderHandler.renderWinnerModal(undefined)
          }
          else _turn = 'player2'
          _turnNumber += 1
        }
      } else if(_turn === 'player2'){
          if(e.target.textContent === player1.symbol || e.target.textContent === player2.symbol || _gameEnd) return
          else {
            e.target.textContent = player2.symbol

            const _squareIndex = e.target.getAttribute('data-index')
            boardItself.board.splice(_squareIndex, 1, player2.symbol)

            if(boardItself.checkWinner(player2)){
              renderHandler.renderWinnerModal(player2)
              _gameEnd = true
            } else if(boardItself.checkTie(_turnNumber)) {
              renderHandler.renderWinnerModal(undefined)
            }
            else _turn = 'player1'
            _turnNumber += 1
          }
      }
    }))
    //when the reset button is clicked
    resetBtn.addEventListener('click', () => {
      _turn = 'player1'
      _gameEnd = false
      _turnNumber = 0
      const _newSquares = []
      const _newReset = resetBtn.cloneNode(true)
      _squares.forEach(square => _newSquares.push(square.cloneNode(true)))
      console.log(_newSquares)
      runGame(player1, player2, _newSquares, _newReset)
    })
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
  formAI.addEventListener('submit', submitAndStartAIGame)
  formTwoPlayers.addEventListener('submit', _preventRefresh)
  formTwoPlayers.addEventListener('submit', submitAndStartTwoPlayersGame)
})()


