import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MCQTest from '../components/MCQTest'
import { saveProgress } from '../services/supabase'
import maidData from '../data/maid-conversations.json'
import './LessonPage.css'

const MaidConversations = () => {
  const { user } = useAuth()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTestComplete = async (result) => {
    setTestResult(result)
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'maid-conversations', result.score, completed)
    }
  }

  const handleBackToLessons = () => {
    setShowTest(false)
    setTestResult(null)
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>🏠 {maidData.title}</h1>
        <p>Common phrases for talking to your maid or household help</p>
        <div className="bonus-tag">🎁 Bonus Class</div>
      </header>

      {!showTest ? (
        <>
          <div className="coming-soon-notice">
            <span className="notice-icon">🔊</span>
            <p><strong>Audio Pronunciation:</strong> Coming Soon! We're working on adding audio features to help you learn pronunciation.</p>
          </div>

          <div className="lessons-section">
            <h2>🏠 Maid & Household Phrases</h2>
            <p className="section-description">Instructions and conversations with maid</p>
            <div className="lessons-grid">
              {maidData.lessons.map((item) => (
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
            <p>Complete the quiz to mark this bonus class as complete!</p>
            <button className="start-test-btn" onClick={() => setShowTest(true)}>
              Take Quiz
            </button>
          </div>

          <div className="navigation-section">
            <Link to="/bonus" className="prev-lesson-btn">
              ← Back to Bonus Classes
            </Link>
          </div>
        </>
      ) : !testResult ? (
        <MCQTest mcqs={maidData.mcqs} onComplete={handleTestComplete} />
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
              <p>🎉 Congratulations! You've completed this bonus class!</p>
            </div>
          ) : (
            <div className="result-message">
              <p>Keep practicing! You need 60% to complete this lesson.</p>
            </div>
          )}
          <div className="result-actions">
            <button className="retry-btn" onClick={handleBackToLessons}>
              Review Lessons
            </button>
            <Link to="/bonus" className="next-lesson-btn">
              Back to Bonus Classes
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default MaidConversations
