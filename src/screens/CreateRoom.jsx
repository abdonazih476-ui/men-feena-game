import { useState } from 'react'

const CreateRoom = ({ onCreateRoom, onBack }) => {
  const [playerName, setPlayerName] = useState('')

  const handleCreate = () => {
    if (playerName.trim()) {
      onCreateRoom(playerName)
    }
  }

  return (
    <div className="screen create-room-screen">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        
        <h2 className="screen-title">إنشاء غرفة جديدة</h2>
        
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
        
        <button
          className="btn btn-primary"
          onClick={handleCreate}
          disabled={!playerName.trim()}
        >
          إنشاء الغرفة
        </button>
      </div>
    </div>
  )
}

export default CreateRoom
