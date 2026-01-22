import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { getProgress } from '../services/supabase'
import './Dashboard.css'

function Dashboard() {
  const { user } = useAuth()
  const [userProgress, setUserProgress] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadProgress()
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

  // Calculate module progress
  const getModuleProgress = (moduleId) => {
    const moduleProgress = userProgress.filter(p => p.lesson_id === moduleId && p.completed)
    return moduleProgress.length > 0 ? 100 : 0
  }

  // Calculate overall stats
  const completedLessons = userProgress.filter(p => p.completed).length
  const testsTaken = userProgress.length
  const overallProgress = Math.round((completedLessons / 4) * 100) // 4 modules

  const modules = [
    {
      title: 'Basics',
      description: 'Alphabets, greetings, and pronouns',
      path: '/basics',
      icon: '📚',
      lessons: 38,
      color: '#667eea',
      progress: Math.round((getModuleProgress('alphabets') + getModuleProgress('greetings') + getModuleProgress('pronouns')) / 3)
    },
    {
      title: 'Tenses',
      description: 'Present, past, and future tenses',
      path: '/tenses',
      icon: '⏰',
      lessons: 13,
      color: '#f093fb',
      progress: getModuleProgress('tenses')
    },
    {
      title: 'Daily Conversations',
      description: 'Common phrases for everyday situations',
      path: '/conversations',
      icon: '💬',
      lessons: 27,
      color: '#4facfe',
      progress: getModuleProgress('conversations')
    }
  ]

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Learner'

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 className="welcome-title">
          Welcome back, <span className="user-name">{userName}</span>! 👋
        </h1>
        <p className="welcome-subtitle">
          Continue your Malayalam learning journey
        </p>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : completedLessons}</div>
            <div className="stat-label">Lessons Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : testsTaken}</div>
            <div className="stat-label">Tests Taken</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : `${overallProgress}%`}</div>
            <div className="stat-label">Overall Progress</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <div className="stat-number">0</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="continue-learning">
        <h2 className="section-title">Continue Learning</h2>
        <div className="continue-card">
          <div className="continue-icon">🚀</div>
          <div className="continue-content">
            <h3>Start Your First Lesson</h3>
            <p>Begin with Basic Greetings to learn essential Malayalam phrases</p>
          </div>
          <Link to="/greetings" className="continue-button">
            Start Now →
          </Link>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="modules-section">
        <h2 className="section-title">Your Learning Modules</h2>
        <div className="modules-grid">
          {modules.map((module, index) => (
            <Link 
              key={index} 
              to={module.path} 
              className="module-card"
            >
              <div className="module-header">
                <div className="module-icon" style={{ background: module.color }}>
                  {module.icon}
                </div>
                <div className="module-progress-circle">
                  <svg width="50" height="50">
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#e0e0e0"
                      strokeWidth="4"
                    />
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke={module.color}
                      strokeWidth="4"
                      strokeDasharray={`${module.progress * 1.26} 126`}
                      strokeLinecap="round"
                      transform="rotate(-90 25 25)"
                    />
                  </svg>
                  <span className="progress-text">{module.progress}%</span>
                </div>
              </div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
              <div className="module-meta">
                <span className="lesson-count">{module.lessons} lessons</span>
                <span className="arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <Link to="/progress" className="quick-link-card">
          <div className="quick-link-icon">📊</div>
          <div className="quick-link-content">
            <h3>View Progress</h3>
            <p>See your detailed learning analytics</p>
          </div>
        </Link>
      </section>
    </div>
  )
}

export default Dashboard

