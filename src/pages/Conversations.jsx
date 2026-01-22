import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState, useEffect } from 'react'
import { getProgress } from '../services/supabase'
import './Conversations.css'

function Conversations() {
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
      title: 'Casual Conversations',
      description: 'Everyday informal conversations with friends',
      path: '/conversations/casual',
      icon: '💬',
      lessonId: 'casual-conversations',
      color: '#4facfe',
      items: 12,
      available: true
    },
    {
      title: 'Formal Conversations',
      description: 'Professional and respectful communication',
      path: '/conversations/formal',
      icon: '🤝',
      lessonId: 'formal-conversations',
      color: '#667eea',
      items: 10,
      available: true
    },
    {
      title: 'Ordering Food',
      description: 'Restaurant and food ordering phrases',
      path: '/conversations/ordering',
      icon: '🍽️',
      lessonId: 'ordering-food',
      color: '#f093fb',
      items: 15,
      available: true
    },
    {
      title: 'Shopping',
      description: 'Market and shopping conversations',
      path: '/conversations/shopping',
      icon: '🛒',
      lessonId: 'shopping',
      color: '#feca57',
      items: 12,
      available: false,
      comingSoon: true
    },
    {
      title: 'Business Malayalam',
      description: 'Professional workplace communication',
      path: '/conversations/business',
      icon: '💼',
      lessonId: 'business',
      color: '#764ba2',
      items: 15,
      available: false,
      comingSoon: true
    },
    {
      title: 'Travel & Directions',
      description: 'Getting around and asking for directions',
      path: '/conversations/travel',
      icon: '🗺️',
      lessonId: 'travel',
      color: '#48dbfb',
      items: 14,
      available: false,
      comingSoon: true
    }
  ]

  return (
    <div className="conversations-page">
      <header className="conversations-header">
        <h1>💬 Daily Conversations</h1>
        <p>Master real-world Malayalam conversations for every situation</p>
      </header>

      <div className="lessons-grid">
        {lessons.map((lesson, index) => (
          lesson.available ? (
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
                <span className="item-count">{lesson.items} phrases</span>
                <span className="arrow">→</span>
              </div>
            </Link>
          ) : (
            <div 
              key={index} 
              className="lesson-card coming-soon"
              style={{ borderTopColor: lesson.color }}
            >
              <div className="lesson-icon" style={{ background: lesson.color }}>
                {lesson.icon}
              </div>
              
              <div className="coming-soon-badge">Coming Soon</div>
              
              <h3 className="lesson-title">{lesson.title}</h3>
              <p className="lesson-description">{lesson.description}</p>
              
              <div className="lesson-meta">
                <span className="item-count">{lesson.items} phrases</span>
                <span className="lock-icon">🔒</span>
              </div>
            </div>
          )
        ))}
      </div>

      <div className="conversations-info">
        <div className="info-card">
          <div className="info-icon">🎯</div>
          <h3>Real-World Practice</h3>
          <p>Learn practical phrases you'll actually use in daily life. From casual chats to formal meetings.</p>
        </div>
        <div className="info-card">
          <div className="info-icon">🚀</div>
          <h3>More Coming Soon</h3>
          <p>We're constantly adding new conversation topics. Check back regularly for updates!</p>
        </div>
      </div>
    </div>
  )
}

export default Conversations

