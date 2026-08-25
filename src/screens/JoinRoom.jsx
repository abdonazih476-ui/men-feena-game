import { useState } from 'react'

const JoinRoom = ({ onJoinRoom, onBack }) => {
  const [playerName, setPlayerName] = useState('')
  const [roomCode, setRoomCode] = useState('')

  const handleJoin = () => {
    if (playerName.trim() && roomCode.trim()) {
      onJoinRoom(playerName, roomCode.toUpperCase())
    }
  }

  return (
    <div className="screen join-room-screen">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        
        <h2 className="screen-title">انضمام لغرفة</h2>
        
        <div className="form-group">
          <label>اسمك؟</label>
          <input
            type="text"
            className="input-field"
            placeholder="أدخل اسمك"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            maxLength="20"
          />
        </div>
        
        <div className="form-group">
          <label>كود الغرفة</label>
          <input
            type="text"
            className="input-field"
            placeholder="أدخل كود الغرفة"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            maxLength="6"
          />
        </div>
        
        <button
          className="btn btn-primary"
          onClick={handleJoin}
          disabled={!playerName.trim() || !roomCode.trim()}
        >
          انضمام للغرفة
        </button>
      </div>
    </div>
  )
}

export default JoinRoom
