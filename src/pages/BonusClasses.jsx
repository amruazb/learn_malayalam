import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { getProgress } from '../services/supabase'
import './Conversations.css'

function BonusClasses() {
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

  const bonusLessons = [
    {
      title: 'Formal Conversations',
      description: 'Professional and respectful communication',
      path: '/bonus/formal',
      icon: '🤝',
      lessonId: 'formal-conversations',
      color: '#667eea',
      items: 10,
      available: true
    },
    {
      title: 'Casual Conversations',
      description: 'Everyday informal conversations with friends',
      path: '/bonus/casual',
      icon: '💬',
      lessonId: 'casual-conversations',
      color: '#4facfe',
      items: 12,
      available: true
    },
    {
      title: 'Very Casual Talk',
      description: 'Slang and words used in very casual talks',
      path: '/bonus/very-casual',
      icon: '😎',
      lessonId: 'very-casual-conversations',
      color: '#a8edea',
      items: 15,
      available: true
    },
    {
      title: 'Conversations with Maid',
      description: 'Talking to maid and household help',
      path: '/bonus/maid',
      icon: '🏠',
      lessonId: 'maid-conversations',
      color: '#fed6e3',
      items: 15,
      available: true
    },
    {
      title: 'Market Conversations',
      description: 'Buying, bargaining, and talking at the market',
      path: '/bonus/market',
      icon: '🛒',
      lessonId: 'market-conversations',
      color: '#fa709a',
      items: 15,
      available: true
    },
    {
      title: 'Ordering Food',
      description: 'Restaurant and food ordering phrases',
      path: '/bonus/ordering',
      icon: '🍽️',
      lessonId: 'ordering-food',
      color: '#f093fb',
      items: 15,
      available: true
    },
    {
      title: 'Business Malayalam',
      description: 'Professional workplace communication',
      path: '/bonus/business',
      icon: '💼',
      lessonId: 'business',
      color: '#fee140',
      items: 15,
      available: false
    },
    {
      title: 'Travel & Directions',
      description: 'Getting around and asking for directions',
      path: '/bonus/travel',
      icon: '🗺️',
      lessonId: 'travel',
      color: '#30cfd0',
      items: 14,
      available: false
    }
  ]

  return (
    <div className="conversations-page">
      <header className="conversations-header">
        <h1>🎁 Bonus Classes</h1>
        <p>Extra lessons to enhance your Malayalam skills. Available anytime, independent of daily lessons!</p>
        <div className="bonus-badge">
          <span className="badge-icon">⭐</span>
          <span>No prerequisites - Learn at your own pace!</span>
        </div>
      </header>

      <div className="lessons-grid">
        {bonusLessons.map((lesson, index) => (
          <div key={index} className={`lesson-card ${!lesson.available ? 'coming-soon' : ''} ${isLessonCompleted(lesson.lessonId) ? 'completed' : ''}`}>
            {lesson.available ? (
              <Link to={lesson.path} className="lesson-link">
                <div className="lesson-icon" style={{ background: lesson.color }}>
                  {lesson.icon}
                </div>
                <div className="lesson-content">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <div className="lesson-meta">
                    <span className="lesson-items">📝 {lesson.items} phrases</span>
                    {isLessonCompleted(lesson.lessonId) && (
                      <span className="completion-badge">✅ Completed</span>
                    )}
                  </div>
                </div>
                <div className="lesson-arrow">→</div>
              </Link>
            ) : (
              <div className="lesson-link disabled">
                <div className="lesson-icon" style={{ background: lesson.color }}>
                  {lesson.icon}
                </div>
                <div className="lesson-content">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  <div className="lesson-meta">
                    <span className="coming-soon-badge">🔜 Coming Soon</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bonus-info">
        <h2>💡 About Bonus Classes</h2>
        <div className="info-cards">
          <div className="info-card">
            <div className="info-icon">🎯</div>
            <h3>Learn Anytime</h3>
            <p>No need to complete daily lessons first. Jump into any bonus class whenever you want!</p>
          </div>
          <div className="info-card">
            <div className="info-icon">🌟</div>
            <h3>Practical Skills</h3>
            <p>Focus on real-world conversations and situations you'll encounter in Kerala.</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📈</div>
            <h3>Track Progress</h3>
            <p>Your progress is saved automatically. Come back anytime to continue learning!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BonusClasses

