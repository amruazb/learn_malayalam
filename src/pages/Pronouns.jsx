import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import AudioPlayer from '../components/AudioPlayer'
import MCQTest from '../components/MCQTest'
import { saveProgress } from '../services/supabase'
import pronounsData from '../data/pronouns.json'
import './LessonPage.css'

const Pronouns = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTestComplete = async (result) => {
    setTestResult(result)

    // Save progress to Supabase if user is logged in
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'pronouns', result.score, completed)
      console.log('Progress saved to Supabase')
    }

    console.log('Test completed:', result)
  }

  const handleStartTest = () => {
    setShowTest(true)
    setTestResult(null)
  }

  const handleBackToLessons = () => {
    setShowTest(false)
  }

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>{pronounsData.title}</h1>
        <p>Master personal pronouns in spoken Malayalam</p>
      </header>

      {!showTest ? (
        <>
          <div className="lessons-section">
            <h2>Pronouns</h2>
            {pronounsData.lessons.map((lesson) => (
              <AudioPlayer
                key={lesson.id}
                malayalam={lesson.malayalam}
                transliteration={lesson.transliteration}
                english={lesson.english}
              />
            ))}
          </div>

          <div className="test-section">
            <button className="start-test-btn" onClick={handleStartTest}>
              📝 Take the Test ({pronounsData.mcqs.length} questions)
            </button>
          </div>

          <div className="navigation-section">
            <Link to="/basics/greetings" className="prev-lesson-btn">
              ← Previous: Greetings
            </Link>
            <Link to="/tenses" className="next-lesson-btn">
              Next: Tenses →
            </Link>
          </div>
        </>
      ) : (
        <>
          {!testResult ? (
            <>
              <button className="back-btn" onClick={handleBackToLessons}>
                ← Back to Lessons
              </button>
              <MCQTest mcqs={pronounsData.mcqs} onComplete={handleTestComplete} />
            </>
          ) : (
            <div className="test-result">
              <h2>Test Complete! 🎉</h2>
              <div className="result-card">
                <div className="result-score">
                  <span className="score-number">{testResult.percentage}%</span>
                  <span className="score-label">Score</span>
                </div>
                <p className="result-details">
                  You got {testResult.score} out of {testResult.total} questions correct!
                </p>
                {testResult.percentage >= 80 ? (
                  <p className="result-message success">
                    ✅ Excellent work! You've mastered this lesson!
                  </p>
                ) : testResult.percentage >= 60 ? (
                  <p className="result-message good">
                    👍 Good job! Review the material and try again for a higher score.
                  </p>
                ) : (
                  <p className="result-message retry">
                    📚 Keep practicing! Review the lessons and try again.
                  </p>
                )}
                <div className="result-actions">
                  <button className="retry-btn" onClick={handleStartTest}>
                    🔄 Retry Test
                  </button>
                  <button className="back-btn" onClick={handleBackToLessons}>
                    📖 Back to Lessons
                  </button>
                  <Link to="/tenses" className="next-lesson-btn">
                    Next: Tenses →
                  </Link>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Pronouns

