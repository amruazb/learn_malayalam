import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MCQTest from '../components/MCQTest'
import { saveProgress } from '../services/supabase'
import day1Data from '../data/day1.json'
import './LessonPage.css'

const Day1 = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTestComplete = async (result) => {
    setTestResult(result)
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'day-1', result.score, completed)
    }
  }

  const handleBackToLessons = () => {
    setShowTest(false)
    setTestResult(null)
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>📅 Day {day1Data.day}: {day1Data.title}</h1>
        <p>{day1Data.description}</p>
      </header>

      {!showTest ? (
        <>
          {/* Audio Feature Coming Soon Notice */}
          <div className="coming-soon-notice">
            <span className="notice-icon">🔊</span>
            <p><strong>Audio Pronunciation:</strong> Coming Soon! We're working on adding audio features to help you learn pronunciation.</p>
          </div>

          {/* Letters Section */}
          <div className="lessons-section">
            <h2>📝 {day1Data.sections[0].title}</h2>
            <p className="section-description">{day1Data.sections[0].description}</p>
            <div className="lessons-grid">
              {day1Data.sections[0].items.map((item) => (
                <div key={item.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{item.malayalam}</div>
                  <div className="transliteration-text">{item.transliteration}</div>
                  <div className="english-text">{item.english}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Words Section */}
          <div className="lessons-section">
            <h2>💬 {day1Data.sections[1].title}</h2>
            <p className="section-description">{day1Data.sections[1].description}</p>
            <div className="lessons-grid">
              {day1Data.sections[1].items.map((item) => (
                <div key={item.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{item.malayalam}</div>
                  <div className="transliteration-text">{item.transliteration}</div>
                  <div className="english-text">{item.english}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sentences Section */}
          <div className="lessons-section">
            <h2>✍️ {day1Data.sections[2].title}</h2>
            <p className="section-description">{day1Data.sections[2].description}</p>
            <div className="lessons-grid">
              {day1Data.sections[2].items.map((item) => (
                <div key={item.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{item.malayalam}</div>
                  <div className="transliteration-text">{item.transliteration}</div>
                  <div className="english-text">{item.english}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="test-section">
            <h2>📝 Ready to Test Your Knowledge?</h2>
            <p>Complete the quiz to unlock Day 2!</p>
            <button className="start-test-btn" onClick={() => setShowTest(true)}>
              Take Day 1 Test
            </button>
          </div>

          {/* Navigation */}
          <div className="navigation-section">
            <Link to="/days" className="prev-lesson-btn">
              ← Back to Days
            </Link>
          </div>
        </>
      ) : !testResult ? (
        <MCQTest mcqs={day1Data.mcqs} onComplete={handleTestComplete} />
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
              <p>🎉 Congratulations! You've completed Day 1!</p>
              <p>Day 2 is now unlocked!</p>
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
              <Link to="/day/2" className="next-lesson-btn">
                Continue to Day 2 →
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

export default Day1

