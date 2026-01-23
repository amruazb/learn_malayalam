import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MCQTest from '../components/MCQTest'
import { saveProgress, getUserProgress } from '../services/supabase'
import day6Data from '../data/day6.json'
import './LessonPage.css'

const Day6 = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUnlocked = async () => {
      if (user) {
        const progress = await getUserProgress(user.id)
        const day5Completed = progress.some(p => p.lesson_id === 'day-5' && p.completed)
        setIsUnlocked(day5Completed)
      } else {
        setIsUnlocked(true) // Allow non-logged-in users to view
      }
      setLoading(false)
    }
    checkUnlocked()
  }, [user])

  const handleTestComplete = async (result) => {
    setTestResult(result)
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'day-6', result.score, completed)
    }
  }

  const handleBackToLessons = () => {
    setShowTest(false)
    setTestResult(null)
  }

  if (loading) {
    return <div className="lesson-page"><p>Loading...</p></div>
  }

  if (!isUnlocked) {
    return (
      <div className="lesson-page">
        <div className="locked-message">
          <h2>🔒 Day 6 is Locked</h2>
          <p>Complete Day 5 with at least 60% to unlock this lesson.</p>
          <Link to="/days" className="back-btn">← Back to Days</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>📅 Day {day6Data.day}: {day6Data.title}</h1>
        <p>{day6Data.description}</p>
      </header>

      {!showTest ? (
        <>
          <div className="coming-soon-notice">
            <span className="notice-icon">🔊</span>
            <p><strong>Audio Pronunciation:</strong> Coming Soon! We're working on adding audio features to help you learn pronunciation.</p>
          </div>

          {day6Data.sections.map((section, index) => (
            <div key={index} className="lessons-section">
              <h2>
                {section.type === 'letters' && '📝 '}
                {section.type === 'words' && '💬 '}
                {section.type === 'sentences' && '✍️ '}
                {section.title}
              </h2>
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
            <p>Complete the quiz to unlock Day 7!</p>
            <button className="start-test-btn" onClick={() => setShowTest(true)}>
              Take Day 6 Test
            </button>
          </div>

          <div className="navigation-section">
            <Link to="/day/5" className="prev-lesson-btn">
              ← Day 5
            </Link>
            <Link to="/days" className="prev-lesson-btn">
              Back to Days
            </Link>
          </div>
        </>
      ) : !testResult ? (
        <MCQTest mcqs={day6Data.mcqs} onComplete={handleTestComplete} />
      ) : (
        <div className="result-card">
          <h2>Test Complete!</h2>
          <div className="score-display">
            <span className="score-number">{testResult.percentage}%</span>
            <span className="score-label">Score</span>
          </div>
          <p className="result-details">
            You got {testResult.score} out of {testResult.total} questions correct!
          </p>
          {testResult.percentage >= 60 ? (
            <div className="result-message success">
              <p>🎉 Congratulations! You've completed Day 6!</p>
              <p>Day 7 is now unlocked!</p>
            </div>
          ) : (
            <div className="result-message">
              <p>Keep practicing! You need 60% to unlock the next day.</p>
            </div>
          )}
          <div className="result-actions">
            <button className="retry-btn" onClick={handleBackToLessons}>
              Review Lessons
            </button>
            {testResult.percentage >= 60 && (
              <Link to="/day/7" className="next-lesson-btn">
                Continue to Day 7 →
              </Link>
            )}
            <Link to="/days" className="next-lesson-btn">
              Back to Days
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Day6

