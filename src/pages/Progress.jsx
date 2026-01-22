import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getProgress, getOverallProgress } from '../services/supabase'
import './Progress.css'

const Progress = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadProgress()
    } else {
      setLoading(false)
    }
  }, [user])

  const loadProgress = async () => {
    try {
      const overall = await getOverallProgress(user.id)
      const details = await getProgress(user.id)
      setProgress({ overall, details })
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="progress-page">
        <div className="loading">Loading your progress...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="progress-page">
        <div className="auth-message">
          <h2>📊 Track Your Progress</h2>
          <p>Sign in to track your learning progress and save your test scores!</p>
          <div className="features-list">
            <div className="feature-item">✅ Save test scores</div>
            <div className="feature-item">📊 Track completion</div>
            <div className="feature-item">🎯 Monitor improvement</div>
            <div className="feature-item">🏆 Unlock achievements</div>
          </div>
          <div className="auth-buttons">
            <Link to="/register" className="auth-btn primary">Create Account</Link>
            <Link to="/login" className="auth-btn secondary">Sign In</Link>
          </div>
          <p className="note">
            You can still use all lessons and tests without signing in!
          </p>
        </div>
      </div>
    )
  }

  const modules = [
    { name: 'Basic Greetings', total: 9, icon: '👋' },
    { name: 'Pronouns', total: 9, icon: '👤' },
    { name: 'Tenses', total: 13, icon: '⏰' },
    { name: 'Daily Conversations', total: 27, icon: '💬' }
  ]

  return (
    <div className="progress-page">
      <header className="progress-header">
        <h1>Your Learning Progress</h1>
        <p>Track your Malayalam learning journey</p>
      </header>

      <div className="overall-progress">
        <h2>Overall Progress</h2>
        <div className="progress-circle">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" strokeWidth="20" />
            <circle 
              cx="100" 
              cy="100" 
              r="90" 
              fill="none" 
              stroke="url(#gradient)" 
              strokeWidth="20"
              strokeDasharray={`${(progress?.overall?.percentage || 0) * 5.65} 565`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="100%" stopColor="#764ba2" />
              </linearGradient>
            </defs>
          </svg>
          <div className="progress-text">
            <span className="percentage">{progress?.overall?.percentage || 0}%</span>
            <span className="label">Complete</span>
          </div>
        </div>
        <p className="progress-stats">
          {progress?.overall?.completed || 0} of {progress?.overall?.total || 58} lessons completed
        </p>
      </div>

      <div className="modules-progress">
        <h2>Module Progress</h2>
        <div className="modules-list">
          {modules.map((module, index) => (
            <div key={index} className="module-progress-card">
              <div className="module-header">
                <span className="module-icon">{module.icon}</span>
                <h3>{module.name}</h3>
              </div>
              <div className="module-stats">
                <span>0 / {module.total} lessons</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '0%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements">
        <h2>Achievements 🏆</h2>
        <div className="achievements-grid">
          <div className="achievement locked">
            <div className="achievement-icon">🌟</div>
            <div className="achievement-name">First Steps</div>
            <div className="achievement-desc">Complete your first lesson</div>
          </div>
          <div className="achievement locked">
            <div className="achievement-icon">🔥</div>
            <div className="achievement-name">On Fire</div>
            <div className="achievement-desc">Complete 5 lessons</div>
          </div>
          <div className="achievement locked">
            <div className="achievement-icon">💯</div>
            <div className="achievement-name">Perfect Score</div>
            <div className="achievement-desc">Get 100% on any test</div>
          </div>
          <div className="achievement locked">
            <div className="achievement-icon">🎓</div>
            <div className="achievement-name">Graduate</div>
            <div className="achievement-desc">Complete all modules</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Progress

