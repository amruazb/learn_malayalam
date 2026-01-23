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
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(day => isDayCompleted(day)).length
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
    },
    {
      day: 6,
      title: 'Numbers & Counting',
      description: 'Learn Malayalam numbers and basic counting',
      path: '/day/6',
      icon: '6️⃣',
      color: '#fa709a',
      items: '5 consonants + 6 numbers + 2 sentences'
    },
    {
      day: 7,
      title: 'Family & Relationships',
      description: 'Learn to talk about family members in Malayalam',
      path: '/day/7',
      icon: '7️⃣',
      color: '#fee140',
      items: '5 consonants + 6 family words + 2 sentences'
    },
    {
      day: 8,
      title: 'Colors & Descriptions',
      description: 'Learn colors and how to describe things',
      path: '/day/8',
      icon: '8️⃣',
      color: '#30cfd0',
      items: '4 compounds + 6 colors + 2 sentences'
    },
    {
      day: 9,
      title: 'Time & Days',
      description: 'Learn to tell time and talk about days of the week',
      path: '/day/9',
      icon: '9️⃣',
      color: '#a8edea',
      items: '4 compounds + 6 time words + 2 sentences'
    },
    {
      day: 10,
      title: 'Review & Practice',
      description: 'Review everything you\'ve learned so far',
      path: '/day/10',
      icon: '🔟',
      color: '#fbc2eb',
      items: '4 letters + 6 vocab + 2 sentences'
    }
  ]

  const completedDays = getCompletedDaysCount()
  const progressPercentage = (completedDays / 10) * 100

  return (
    <div className="basics-page">
      <header className="basics-header">
        <h1>🗓️ Daily Malayalam Lessons</h1>
        <p>Learn Malayalam step-by-step with our structured daily lessons. 10 days of comprehensive learning!</p>

        {user && (
          <div className="progress-overview">
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <p className="progress-text">{completedDays}/10 Days Completed ({Math.round(progressPercentage)}%)</p>
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

