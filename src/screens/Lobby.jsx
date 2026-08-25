const Lobby = ({ players, roomCode, isHost, onBack }) => {
  const handleStartGame = () => {
    alert('اللعبة جاهزة للبدء!')
  }

  return (
    <div className="screen lobby-screen">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        
        <h2 className="screen-title">الغرفة جاهزة!</h2>
        
        <div className="room-code-box">
          <p className="room-code-label">كود الغرفة</p>
          <p className="room-code-value">{roomCode}</p>
          <button className="btn btn-small">نسخ</button>
        </div>
        
        <h3 className="players-title">اللاعبين</h3>
        <div className="players-list">
          {players.map((player) => (
            <div key={player.id} className="player-card">
              <div className="player-avatar">{player.avatar}</div>
              <div className="player-info">
                <p className="player-name">{player.name}</p>
                {isHost && player.id === 1 && <span className="host-badge">مضيف</span>}
              </div>
            </div>
          ))}
        </div>
        
        <p className="waiting-text">مستنيين الباقيين...</p>
        
        {isHost && (
          <button className="btn btn-primary" onClick={handleStartGame}>
            ابدأ اللعبة
          </button>
        )}
      </div>
    </div>
  )
}

export default Lobby
