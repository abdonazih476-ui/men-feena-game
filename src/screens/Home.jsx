const Home = ({ onCreateRoom, onJoinRoom, onHowToPlay }) => {
  return (
    <div className="screen home-screen">
      <div className="container">
        <div className="logo-main">
          <h1 className="logo-text">مين فينا؟</h1>
        </div>
        
        <p className="subtitle">اللعبة اللي هتكشف مين فيكم بجد!</p>
        
        <div className="buttons-container">
          <button className="btn btn-primary" onClick={onCreateRoom}>
            إنشاء غرفة
          </button>
          <button className="btn btn-secondary" onClick={onJoinRoom}>
            انضمام لغرفة
          </button>
          <button className="btn btn-tertiary" onClick={onHowToPlay}>
            طريقة اللعب
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
