import { useState } from 'react'
import questions from '../data/questions'

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    players: [],
    currentRound: 0,
    currentQuestion: '',
    currentQuestionIndex: 0,
    usedQuestions: [],
    votes: {},
    scores: {},
    roundResults: null,
    gameStatus: 'idle', // idle, playing, roundResults, gameOver
    currentPlayerVoting: 0,
    votesLocked: false
  })

  const startGame = (playersList) => {
    const initialScores = {}
    const initialVotes = {}
    playersList.forEach(player => {
      initialScores[player.id] = 0
      initialVotes[player.id] = null
    })

    const randomQuestion = getRandomQuestion([])
    setGameState(prev => ({
      ...prev,
      players: playersList,
      currentRound: 1,
      currentQuestion: randomQuestion,
      currentQuestionIndex: 0,
      usedQuestions: [randomQuestion],
      votes: initialVotes,
      scores: initialScores,
      roundResults: null,
      gameStatus: 'playing',
      currentPlayerVoting: 0,
      votesLocked: false
    }))
  }

  const getRandomQuestion = (usedList) => {
    let availableQuestions = questions.filter(q => !usedList.includes(q))
    if (availableQuestions.length === 0) {
      availableQuestions = questions
    }
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  }

  const selectPlayer = (playerId) => {
    if (gameState.votesLocked) return
    
    const currentPlayer = gameState.players[gameState.currentPlayerVoting]
    if (playerId === currentPlayer.id) return
    
    setGameState(prev => ({
      ...prev,
      votes: {
        ...prev.votes,
        [currentPlayer.id]: playerId
      }
    }))
  }

  const confirmVote = () => {
    const currentPlayer = gameState.players[gameState.currentPlayerVoting]
    if (gameState.votes[currentPlayer.id] === null) return

    setGameState(prev => ({
      ...prev,
      votesLocked: true
    }))

    setTimeout(() => {
      if (gameState.currentPlayerVoting < gameState.players.length - 1) {
        moveToNextPlayer()
      } else {
        calculateRoundResult()
      }
    }, 1000)
  }

  const moveToNextPlayer = () => {
    setGameState(prev => ({
      ...prev,
      currentPlayerVoting: prev.currentPlayerVoting + 1,
      votesLocked: false
    }))
  }

  const calculateRoundResult = () => {
    const voteCounts = {}
    gameState.players.forEach(player => {
      voteCounts[player.id] = 0
    })

    Object.values(gameState.votes).forEach(votedPlayerId => {
      if (votedPlayerId !== null) {
        voteCounts[votedPlayerId]++
      }
    })

    const maxVotes = Math.max(...Object.values(voteCounts))
    const winnersThisRound = Object.keys(voteCounts).filter(
      playerId => voteCounts[playerId] === maxVotes
    )

    const newScores = { ...gameState.scores }
    winnersThisRound.forEach(playerId => {
      newScores[playerId] = (newScores[playerId] || 0) + 1
    })

    const roundResultsData = {
      voteCounts,
      winnersThisRound,
      maxVotes
    }

    setGameState(prev => ({
      ...prev,
      roundResults: roundResultsData,
      scores: newScores,
      gameStatus: 'roundResults'
    }))
  }

  const nextRound = () => {
    if (gameState.currentRound >= 10) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'gameOver'
      }))
      return
    }

    const randomQuestion = getRandomQuestion(gameState.usedQuestions)
    const initialVotes = {}
    gameState.players.forEach(player => {
      initialVotes[player.id] = null
    })

    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1,
      currentQuestion: randomQuestion,
      usedQuestions: [...prev.usedQuestions, randomQuestion],
      votes: initialVotes,
      roundResults: null,
      gameStatus: 'playing',
      currentPlayerVoting: 0,
      votesLocked: false
    }))
  }

  const resetGame = () => {
    setGameState({
      players: [],
      currentRound: 0,
      currentQuestion: '',
      currentQuestionIndex: 0,
      usedQuestions: [],
      votes: {},
      scores: {},
      roundResults: null,
      gameStatus: 'idle',
      currentPlayerVoting: 0,
      votesLocked: false
    })
  }

  return {
    ...gameState,
    startGame,
    selectPlayer,
    confirmVote,
    calculateRoundResult,
    nextRound,
    resetGame,
    getCurrentPlayerVoting: () => gameState.players[gameState.currentPlayerVoting]
  }
}
