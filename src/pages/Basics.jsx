import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { getProgress } from '../services/supabase'
import './Basics.css'

function Basics() {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState([])
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
      const progress = await getProgress(user.id)
      setUserProgress(progress || [])
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Check if a lesson is completed
  const isLessonCompleted = (lessonId) => {
    return userProgress.some(p => p.lesson_id === lessonId && p.completed)
  }

  const lessons = [
    {
      title: 'Alphabets',
      description: 'Vowels, consonants, and chillaksharangal',
      path: '/basics/alphabets',
      icon: '🔤',
      lessonId: 'alphabets',
      color: '#667eea',
      items: 57
    },
    {
      title: 'Greetings',
      description: 'Essential greetings and introductions',
      path: '/basics/greetings',
      icon: '👋',
      lessonId: 'greetings',
      color: '#764ba2',
      items: 9
    },
    {
      title: 'Pronouns',
      description: 'Personal and possessive pronouns',
      path: '/basics/pronouns',
      icon: '👤',
      lessonId: 'pronouns',
      color: '#f093fb',
      items: 9
    }
  ]

  return (
    <div className="basics-page">
      <header className="basics-header">
        <h1>📚 Basics</h1>
        <p>Master the fundamentals of Malayalam language</p>
      </header>

      <div className="lessons-grid">
        {lessons.map((lesson, index) => (
          <Link 
            key={index} 
            to={lesson.path} 
            className="lesson-card"
            style={{ borderTopColor: lesson.color }}
          >
            <div className="lesson-icon" style={{ background: lesson.color }}>
              {lesson.icon}
            </div>
            
            {user && isLessonCompleted(lesson.lessonId) && (
              <div className="completion-badge">✓</div>
            )}
            
            <h3 className="lesson-title">{lesson.title}</h3>
            <p className="lesson-description">{lesson.description}</p>
            
            <div className="lesson-meta">
              <span className="item-count">{lesson.items} items</span>
              <span className="arrow">→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="basics-info">
        <div className="info-card">
          <div className="info-icon">💡</div>
          <h3>Start Here</h3>
          <p>These lessons cover the essential building blocks of Malayalam. Complete them in order for the best learning experience.</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🎯</div>
          <h3>Practice Makes Perfect</h3>
          <p>Each lesson includes interactive tests to help you master the material. Aim for 80% or higher!</p>
        </div>
      </div>
    </div>
  )
}

export default Basics

