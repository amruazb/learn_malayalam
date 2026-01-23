import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MCQTest from '../components/MCQTest'
import { saveProgress, getProgress } from '../services/supabase'
import day3Data from '../data/day3.json'
import './LessonPage.css'

const Day3 = () => {
  const { user } = useAuth()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUnlocked = async () => {
      if (user) {
        const progress = await getProgress(user.id)
        const day2Complete = progress.some(p => p.lesson_id === 'day-2' && p.completed)
        setIsUnlocked(day2Complete)
      } else {
        setIsUnlocked(true)
      }
      setLoading(false)
    }
    checkUnlocked()
  }, [user])

  const handleTestComplete = async (result) => {
    setTestResult(result)
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'day-3', result.score, completed)
    }
  }

  if (loading) return <div className="lesson-page"><p>Loading...</p></div>

  if (!isUnlocked && user) {
    return (
      <div className="lesson-page">
        <div className="locked-message">
          <h2>🔒 Day 3 is Locked</h2>
          <p>Complete Day 2 with at least 60% to unlock this lesson.</p>
          <Link to="/day/2" className="next-lesson-btn">Go to Day 2</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>📅 Day {day3Data.day}: {day3Data.title}</h1>
        <p>{day3Data.description}</p>
      </header>

      {!showTest ? (
        <>
          {/* Audio Feature Coming Soon Notice */}
          <div className="coming-soon-notice">
            <span className="notice-icon">🔊</span>
            <p><strong>Audio Pronunciation:</strong> Coming Soon! We're working on adding audio features to help you learn pronunciation.</p>
          </div>

          {day3Data.sections.map((section, index) => (
            <div key={index} className="lessons-section">
              <h2>{index === 0 ? '📝' : index === 1 ? '💬' : '✍️'} {section.title}</h2>
              <p className="section-description">{section.description}</p>
              <div className="lessons-grid">
                {section.items.map((item) => (
                  <div key={item.id} className="lesson-card-text">
                    <div className="malayalam-text-large">{item.malayalam}</div>
                    <div className="transliteration-text">{item.transliteration}</div>
                    <div className="english-text">{item.english}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="test-section">
            <h2>📝 Ready to Test Your Knowledge?</h2>
            <p>Complete the quiz to unlock Day 4!</p>
            <button className="start-test-btn" onClick={() => setShowTest(true)}>Take Day 3 Test</button>
          </div>

          <div className="navigation-section">
            <Link to="/day/2" className="prev-lesson-btn">← Day 2</Link>
            <Link to="/days" className="next-lesson-btn">Back to Days</Link>
          </div>
        </>
      ) : !testResult ? (
        <MCQTest mcqs={day3Data.mcqs} onComplete={handleTestComplete} />
      ) : (
        <div className="result-card">
          <h2>Test Complete!</h2>
          <div className="score-display">
            <span className="score-number">{testResult.percentage}%</span>
            <span className="score-label">Score</span>
          </div>
          <p className="result-details">You got {testResult.score} out of {testResult.total} questions correct!</p>
          {testResult.percentage >= 60 ? (
            <div className="result-message success">
              <p>🎉 Congratulations! You've completed Day 3!</p>
              <p>Day 4 is now unlocked!</p>
            </div>
          ) : (
            <div className="result-message"><p>Keep practicing! You need 60% to unlock the next day.</p></div>
          )}
          <div className="result-actions">
            <button className="retry-btn" onClick={() => { setShowTest(false); setTestResult(null); }}>Review Lessons</button>
            {testResult.percentage >= 60 && <Link to="/day/4" className="next-lesson-btn">Continue to Day 4 →</Link>}
            <Link to="/days" className="next-lesson-btn">Back to Days</Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Day3

