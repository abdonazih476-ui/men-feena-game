import { useState } from 'react'

const Lobby = ({ players, roomCode, isHost, onBack }) => {
  const [copyButtonText, setCopyButtonText] = useState('نسخ')
  const [copyMessage, setCopyMessage] = useState('')
  const [isCopying, setIsCopying] = useState(false)

  const handleStartGame = () => {
    alert('اللعبة جاهزة للبدء!')
  }

  const copyToClipboard = async () => {
    if (isCopying) return

    setIsCopying(true)
    setCopyMessage('')

    try {
      // Try modern Clipboard API first (works on most modern browsers)
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(roomCode)
        showSuccessMessage()
      } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(roomCode)
      }
    } catch (error) {
      console.error('Clipboard error:', error)
      // If Clipboard API fails, try fallback
      try {
        fallbackCopyToClipboard(roomCode)
      } catch (fallbackError) {
        showErrorMessage()
        setIsCopying(false)
      }
    }
  }

  const fallbackCopyToClipboard = (text) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    textarea.style.pointerEvents = 'none'
    
    document.body.appendChild(textarea)
    
    try {
      textarea.select()
      textarea.setSelectionRange(0, 99999) // For mobile devices
      const successful = document.execCommand('copy')
      
      if (successful) {
        showSuccessMessage()
      } else {
        showErrorMessage()
        setIsCopying(false)
      }
    } catch (error) {
      console.error('Fallback copy error:', error)
      showErrorMessage()
      setIsCopying(false)
    } finally {
      document.body.removeChild(textarea)
    }
  }

  const showSuccessMessage = () => {
    setCopyButtonText('تم النسخ ✓')
    setCopyMessage('')
    
    setTimeout(() => {
      setCopyButtonText('نسخ')
      setIsCopying(false)
    }, 1500)
  }

  const showErrorMessage = () => {
    setCopyButtonText('نسخ')
    setCopyMessage('لم يتم النسخ، حاول مرة أخرى.')
    
    setTimeout(() => {
      setCopyMessage('')
      setIsCopying(false)
    }, 3000)
  }

  return (
    <div className="screen lobby-screen">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        
        <h2 className="screen-title">الغرفة جاهزة!</h2>
        
        <div className="room-code-box">
          <p className="room-code-label">كود الغرفة</p>
          <p className="room-code-value">{roomCode}</p>
          <button
            className="btn btn-small"
            onClick={copyToClipboard}
            disabled={isCopying}
            aria-label="نسخ كود الغرفة"
          >
            {copyButtonText}
          </button>
          {copyMessage && <p className="copy-error-message">{copyMessage}</p>}
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
