import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import MCQTest from '../components/MCQTest'
import { saveProgress } from '../services/supabase'
import alphabetsData from '../data/alphabets.json'
import './LessonPage.css'

const Alphabets = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showTest, setShowTest] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleTestComplete = async (result) => {
    setTestResult(result)
    
    // Save progress to Supabase if user is logged in
    if (user) {
      const completed = result.percentage >= 60
      await saveProgress(user.id, 'alphabets', result.score, completed)
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

  // Separate vowels, consonants, and chillaksharangal
  const vowels = alphabetsData.lessons.filter(lesson => lesson.category === 'vowel')
  const consonants = alphabetsData.lessons.filter(lesson => lesson.category === 'consonant')
  const chillaksharangal = alphabetsData.lessons.filter(lesson => lesson.category === 'chillaksharam')

  return (
    <div className="lesson-page">
      <header className="lesson-header">
        <h1>{alphabetsData.title}</h1>
        <p>Learn the Malayalam alphabet - vowels, consonants, and special characters</p>
      </header>

      {!showTest ? (
        <>
          {/* Audio Feature Coming Soon Notice */}
          <div className="coming-soon-notice">
            <span className="notice-icon">🔊</span>
            <p><strong>Audio Pronunciation:</strong> Coming Soon! We're working on adding audio features to help you learn pronunciation.</p>
          </div>

          <div className="lessons-section">
            <h2>Vowels (സ്വരങ്ങൾ) - {vowels.length} letters</h2>
            <p className="section-description">The basic vowel sounds in Malayalam</p>
            <div className="lessons-grid">
              {vowels.map((lesson) => (
                <div key={lesson.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{lesson.malayalam}</div>
                  <div className="transliteration-text">{lesson.transliteration}</div>
                  <div className="english-text">{lesson.english}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lessons-section">
            <h2>Consonants (വ്യഞ്ജനങ്ങൾ) - {consonants.length} letters</h2>
            <p className="section-description">The consonant sounds in Malayalam</p>
            <div className="lessons-grid">
              {consonants.map((lesson) => (
                <div key={lesson.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{lesson.malayalam}</div>
                  <div className="transliteration-text">{lesson.transliteration}</div>
                  <div className="english-text">{lesson.english}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lessons-section">
            <h2>Chillaksharangal (ചില്ലക്ഷരങ്ങൾ) - {chillaksharangal.length} letters</h2>
            <p className="section-description">Special consonants without inherent vowel sound</p>
            <div className="lessons-grid">
              {chillaksharangal.map((lesson) => (
                <div key={lesson.id} className="lesson-card-text">
                  <div className="malayalam-text-large">{lesson.malayalam}</div>
                  <div className="transliteration-text">{lesson.transliteration}</div>
                  <div className="english-text">{lesson.english}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="test-section">
            <button className="start-test-btn" onClick={handleStartTest}>
              📝 Take the Test ({alphabetsData.mcqs.length} questions)
            </button>
          </div>

          <div className="navigation-section">
            <Link to="/basics" className="prev-lesson-btn">
              ← Back to Basics
            </Link>
            <Link to="/basics/greetings" className="next-lesson-btn">
              Next Lesson: Greetings →
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
              <MCQTest mcqs={alphabetsData.mcqs} onComplete={handleTestComplete} />
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
                  <Link to="/basics/greetings" className="next-lesson-btn">
                    Next Lesson: Greetings →
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

export default Alphabets

