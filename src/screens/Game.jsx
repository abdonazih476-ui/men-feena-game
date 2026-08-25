import { useState, useEffect } from 'react'
import { useGameState } from '../hooks/useGameState'

const Game = ({ players, onGameEnd }) => {
  const game = useGameState()
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [voteConfirmed, setVoteConfirmed] = useState(false)

  useEffect(() => {
    if (players.length > 0 && game.gameStatus === 'idle') {
      game.startGame(players)
    }
  }, [players])

  useEffect(() => {
    if (game.gameStatus === 'gameOver') {
      onGameEnd(game.scores)
    }
  }, [game.gameStatus])

  const handleSelectPlayer = (playerId) => {
    if (voteConfirmed || game.votesLocked) return
    if (playerId === game.getCurrentPlayerVoting()?.id) return
    setSelectedPlayer(playerId)
  }

  const handleConfirmVote = () => {
    if (!selectedPlayer) return
    game.selectPlayer(selectedPlayer)
    setVoteConfirmed(true)
    game.confirmVote()

    setTimeout(() => {
      setSelectedPlayer(null)
      setVoteConfirmed(false)
    }, 1500)
  }

  const handleNextRound = () => {
    game.nextRound()
  }

  if (game.gameStatus === 'idle') {
    return (
      <div className="screen game-screen">
        <div className="container">
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>جاري تحضير اللعبة...</p>
        </div>
      </div>
    )
  }

  const currentPlayer = game.getCurrentPlayerVoting()

  return (
    <div className="screen game-screen">
      <div className="container">
        {/* Round Progress */}
        <div className="round-progress">
          الجولة {game.currentRound} من 10
        </div>

        {/* Question */}
        {game.gameStatus === 'playing' && (
          <>
            <div className="game-question">
              {game.currentQuestion}
            </div>

            {/* Current Player Info */}
            <div className="current-player-info">
              <p className="voting-player-label">تصويت من:</p>
              <p className="voting-player-name">{currentPlayer?.name}</p>
            </div>

            {/* Players Selection */}
            <div className="players-voting-list">
              {game.players.map((player) => (
                <button
                  key={player.id}
                  className={`player-vote-card ${
                    selectedPlayer === player.id ? 'selected' : ''
                  } ${player.id === currentPlayer?.id ? 'disabled' : ''}`}
                  onClick={() => handleSelectPlayer(player.id)}
                  disabled={player.id === currentPlayer?.id || voteConfirmed || game.votesLocked}
                >
                  <div className="player-avatar">{player.avatar}</div>
                  <div className="player-name">{player.name}</div>
                  {selectedPlayer === player.id && <div className="checkmark">✓</div>}
                </button>
              ))}
            </div>

            {/* Confirm Vote Button */}
            <button
              className="btn btn-primary"
              onClick={handleConfirmVote}
              disabled={!selectedPlayer || voteConfirmed || game.votesLocked}
              style={{ marginTop: '24px' }}
            >
              تأكيد التصويت
            </button>

            {/* Vote Confirmed Message */}
            {voteConfirmed && (
              <div className="vote-confirmed-message">
                تم تسجيل تصويتك ✓
              </div>
            )}

            {/* Waiting for other players */}
            {game.votesLocked && !voteConfirmed && (
              <div className="waiting-message">
                جاري انتظار باقي اللاعبين...
              </div>
            )}
          </>
        )}

        {/* Round Results */}
        {game.gameStatus === 'roundResults' && (
          <>
            <div className="round-results-title">نتيجة الجولة</div>

            {/* Vote Counts */}
            <div className="vote-results">
              {game.players.map((player) => {
                const voteCount = game.roundResults?.voteCounts[player.id] || 0
                const isWinner = game.roundResults?.winnersThisRound.includes(String(player.id))

                return (
                  <div
                    key={player.id}
                    className={`vote-result-card ${isWinner ? 'winner' : ''}`}
                  >
                    <div className="result-avatar">{player.avatar}</div>
                    <div className="result-info">
                      <p className="result-name">{player.name}</p>
                      <p className="result-votes">
                        {voteCount} {voteCount === 1 ? 'صوت' : 'أصوات'}
                      </p>
                    </div>
                    {isWinner && <div className="winner-badge">🏆</div>}
                  </div>
                )
              })}
            </div>

            {/* Current Scores */}
            <div className="scores-section">
              <h3 className="scores-title">النقاط الحالية</h3>
              <div className="scores-list">
                {game.players.map((player) => (
                  <div key={player.id} className="score-item">
                    <span className="score-name">{player.name}</span>
                    <span className="score-value">{game.scores[player.id]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Round Button */}
            <button
              className="btn btn-secondary"
              onClick={handleNextRound}
              style={{ marginTop: '24px' }}
            >
              الجولة التالية
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Game
