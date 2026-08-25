import { useEffect } from 'react'

const Splash = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="splash-screen">
      <div className="splash-container">
        <div className="logo-container">
          <div className="logo-piece logo-piece-1">م</div>
          <div className="logo-piece logo-piece-2">ي</div>
          <div className="logo-piece logo-piece-3">ن</div>
          <div className="logo-piece logo-piece-4">فينا</div>
          <div className="logo-piece logo-piece-5">؟</div>
        </div>
        <div className="splash-subtitle">اللعبة اللي هتكشف مين فيكم بجد!</div>
      </div>
    </div>
  )
}

export default Splash
