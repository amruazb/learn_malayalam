import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getProgress } from '../services/supabase'
import './Basics.css'

const Days = () => {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProgress = async () => {
      if (user) {
        const progress = await getProgress(user.id)
        setUserProgress(progress)
      }
      setLoading(false)
    }
    fetchProgress()
  }, [user])

  const isDayCompleted = (dayNumber) => {
    return userProgress.some(p => p.lesson_id === `day-${dayNumber}` && p.completed)
  }

  const isDayUnlocked = (dayNumber) => {
    if (dayNumber === 1) return true
    return isDayCompleted(dayNumber - 1)
  }

  const getCompletedDaysCount = () => {
    return [1, 2, 3, 4, 5].filter(day => isDayCompleted(day)).length
  }

  const days = [
    {
      day: 1,
      title: 'Introduction to Malayalam',
      description: 'First vowels, basic greetings, and simple sentences',
      path: '/day/1',
      icon: '1️⃣',
      color: '#667eea',
      items: '5 vowels + 3 greetings + 2 sentences'
    },
    {
      day: 2,
      title: 'More Vowels & Time Greetings',
      description: 'Continue learning vowels and time-based greetings',
      path: '/day/2',
      icon: '2️⃣',
      color: '#764ba2',
      items: '5 vowels + 3 greetings + 2 sentences'
    },
    {
      day: 3,
      title: 'Consonants & Pronouns',
      description: 'Learn Malayalam consonants and personal pronouns',
      path: '/day/3',
      icon: '3️⃣',
      color: '#f093fb',
      items: '8 consonants + 4 pronouns + 2 sentences'
    },
    {
      day: 4,
      title: 'More Consonants & Daily Conversations',
      description: 'Continue with consonants and casual conversation phrases',
      path: '/day/4',
      icon: '4️⃣',
      color: '#4facfe',
      items: '8 consonants + 4 phrases + 2 sentences'
    },
    {
      day: 5,
      title: 'Final Letters & Complete Conversations',
      description: 'Complete your alphabet learning and master conversations',
      path: '/day/5',
      icon: '5️⃣',
      color: '#43e97b',
      items: '7 letters + 4 phrases + 2 sentences'
    }
  ]

  const completedDays = getCompletedDaysCount()
  const progressPercentage = (completedDays / 5) * 100

  return (
    <div className="basics-page">
      <header className="basics-header">
        <h1>🗓️ Daily Malayalam Lessons</h1>
        <p>Learn Malayalam step-by-step with our structured daily lessons. Currently 5 days available, more coming soon!</p>

        {user && (
          <div className="progress-overview">
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="progress-text">{completedDays}/5 Days Completed ({Math.round(progressPercentage)}%)</p>
          </div>
        )}
      </header>

      <div className="lessons-grid">
        {days.map((day) => {
          const isCompleted = isDayCompleted(day.day)
          const isUnlocked = isDayUnlocked(day.day)

          if (!isUnlocked) {
            return (
              <div key={day.day} className="lesson-card locked" style={{ borderColor: day.color }}>
                <div className="lock-overlay">
                  <span className="lock-icon">🔒</span>
                  <p>Complete Day {day.day - 1} to unlock</p>
                </div>
                <div className="lesson-icon" style={{ background: day.color }}>{day.icon}</div>
                <h3 className="lesson-title">Day {day.day}</h3>
                <h4>{day.title}</h4>
                <p className="lesson-description">{day.description}</p>
                <div className="lesson-meta">
                  <span>📚 {day.items}</span>
                </div>
              </div>
            )
          }

          return (
            <Link
              key={day.day}
              to={day.path}
              className="lesson-card"
              style={{ borderColor: day.color }}
            >
              {isCompleted && (
                <div className="completion-badge">
                  <span>✓ Completed</span>
                </div>
              )}
              <div className="lesson-icon" style={{ background: day.color }}>{day.icon}</div>
              <h3 className="lesson-title">Day {day.day}</h3>
              <h4>{day.title}</h4>
              <p className="lesson-description">{day.description}</p>
              <div className="lesson-meta">
                <span>📚 {day.items}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="basics-info">
        <div className="info-card">
          <span className="info-icon">🎯</span>
          <h3>Structured Learning</h3>
          <p>Each day builds on the previous one, ensuring steady progress in your Malayalam journey.</p>
        </div>
        <div className="info-card">
          <span className="info-icon">🔓</span>
          <h3>Progressive Unlocking</h3>
          <p>Complete each day with 60%+ score to unlock the next day. Master one step at a time!</p>
        </div>
        <div className="info-card">
          <span className="info-icon">📊</span>
          <h3>Track Your Progress</h3>
          <p>Your progress is automatically saved. Pick up right where you left off anytime!</p>
        </div>
      </div>
    </div>
  )
}

export default Days

