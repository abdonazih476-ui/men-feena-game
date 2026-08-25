import { useState, useEffect } from 'react'
import Splash from './screens/Splash'
import Home from './screens/Home'
import CreateRoom from './screens/CreateRoom'
import JoinRoom from './screens/JoinRoom'
import Lobby from './screens/Lobby'
import HowToPlay from './screens/HowToPlay'
import Game from './screens/Game'

const App = () => {
  const [screen, setScreen] = useState('splash')
  const [gameState, setGameState] = useState({
    playerName: '',
    roomCode: '',
    players: [],
    isHost: false
  })

  const handleCreateRoom = (playerName) => {
    const roomCode = generateRoomCode()
    setGameState(prev => ({
      ...prev,
      playerName,
      roomCode,
      isHost: true,
      players: [{ id: 1, name: playerName, avatar: '👤' }]
    }))
    setScreen('lobby')
  }

  const handleJoinRoom = (playerName, roomCode) => {
    setGameState(prev => ({
      ...prev,
      playerName,
      roomCode,
      isHost: false,
      players: [...prev.players, { id: Math.random(), name: playerName, avatar: '👤' }]
    }))
    setScreen('lobby')
  }

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const handleGoHome = () => {
    setScreen('home')
    setGameState({
      playerName: '',
      roomCode: '',
      players: [],
      isHost: false
    })
  }

  const handleStartGame = () => {
    setScreen('game')
  }

  const handleGameEnd = (scores) => {
    // TODO: Navigate to final results screen with scores
    handleGoHome()
  }

  return (
    <div className="app">
      {screen === 'splash' && <Splash onComplete={() => setScreen('home')} />}
      {screen === 'home' && (
        <Home
          onCreateRoom={() => setScreen('createRoom')}
          onJoinRoom={() => setScreen('joinRoom')}
          onHowToPlay={() => setScreen('howToPlay')}
        />
      )}
      {screen === 'createRoom' && (
        <CreateRoom
          onCreateRoom={handleCreateRoom}
          onBack={handleGoHome}
        />
      )}
      {screen === 'joinRoom' && (
        <JoinRoom
          onJoinRoom={handleJoinRoom}
          onBack={handleGoHome}
        />
      )}
      {screen === 'lobby' && (
        <Lobby
          players={gameState.players}
          roomCode={gameState.roomCode}
          isHost={gameState.isHost}
          onBack={handleGoHome}
          onStartGame={handleStartGame}
        />
      )}
      {screen === 'game' && (
        <Game
          players={gameState.players}
          onGameEnd={handleGameEnd}
        />
      )}
      {screen === 'howToPlay' && (
        <HowToPlay onBack={handleGoHome} />
      )}
    </div>
  )
}

export default App
