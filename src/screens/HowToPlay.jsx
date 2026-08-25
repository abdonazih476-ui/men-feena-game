const HowToPlay = ({ onBack }) => {
  return (
    <div className="screen how-to-play-screen">
      <div className="container">
        <button className="btn-back" onClick={onBack}>← رجوع</button>
        
        <h2 className="screen-title">طريقة اللعب</h2>
        
        <div className="how-to-content">
          <div className="step">
            <h3>🎮 كيف تلعب؟</h3>
            <p>اللعبة بسيطة وممتعة جداً! في كل جولة، يتم طرح سؤال مضحك عن اللاعبين.</p>
          </div>
          
          <div className="step">
            <h3>🗳️ التصويت</h3>
            <p>كل لاعب يختار من يعتقد أنه الإجابة الصحيحة على السؤال. كل صوت يساوي نقطة واحدة!</p>
          </div>
          
          <div className="step">
            <h3>📊 النتائج</h3>
            <p>بعد انتهاء الجولة، يتم عرض النتائج ومن حصل على أكتر أصوات.</p>
          </div>
          
          <div className="step">
            <h3>🏆 الفائز</h3>
            <p>بعد 10 جولات، من يحصل على أعلى نقاط يكون الفائز! 🎉</p>
          </div>
          
          <div className="step">
            <h3>💡 نصيحة</h3>
            <p>فكر بإجابات مضحكة ومفاجئة! اللعبة كلها عن المرح والضحك مع أصدقائك.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowToPlay
