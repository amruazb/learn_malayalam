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

  // Calculate day-based progress
  const getDayProgress = () => {
    const completedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(day =>
      userProgress.some(p => p.lesson_id === `day-${day}` && p.completed)
    ).length
    return completedDays
  }

  const getCurrentDay = () => {
    for (let i = 1; i <= 10; i++) {
      const completed = userProgress.some(p => p.lesson_id === `day-${i}` && p.completed)
      if (!completed) return i
    }
    return 10 // All completed, show day 10
  }

  // Calculate module progress
  const getModuleProgress = (moduleId) => {
    const moduleProgress = userProgress.filter(p => p.lesson_id === moduleId && p.completed)
    return moduleProgress.length > 0 ? 100 : 0
  }

  // Calculate overall stats
  const completedDays = getDayProgress()
  const completedLessons = userProgress.filter(p => p.completed).length
  const testsTaken = userProgress.length
  const overallProgress = Math.round((completedDays / 10) * 100) // Based on 10 days

  const getBonusProgress = () => {
    const bonusLessons = ['casual-conversations', 'formal-conversations', 'ordering-food']
    const completed = bonusLessons.filter(lessonId =>
      userProgress.some(p => p.lesson_id === lessonId && p.completed)
    ).length
    return Math.round((completed / bonusLessons.length) * 100)
  }

  const modules = [
    {
      title: 'Daily Lessons',
      description: 'Structured day-by-day learning path',
      path: '/days',
      icon: '📅',
      lessons: '10 days',
      color: '#667eea',
      progress: Math.round((completedDays / 10) * 100)
    },
    {
      title: 'Bonus Classes',
      description: 'Extra lessons available anytime',
      path: '/bonus',
      icon: '🎁',
      lessons: '3 available',
      color: '#fa709a',
      progress: getBonusProgress()
    },
    {
      title: 'Basics',
      description: 'Alphabets, greetings, and pronouns',
      path: '/basics',
      icon: '�',
      lessons: 38,
      color: '#764ba2',
      progress: Math.round((getModuleProgress('alphabets') + getModuleProgress('greetings') + getModuleProgress('pronouns')) / 3)
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
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : `${completedDays}/10`}</div>
            <div className="stat-label">Days Completed</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : completedLessons}</div>
            <div className="stat-label">Total Lessons</div>
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
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-number">{loading ? '...' : testsTaken}</div>
            <div className="stat-label">Tests Taken</div>
          </div>
        </div>
      </section>

      {/* Continue Learning */}
      <section className="continue-learning">
        <h2 className="section-title">Continue Learning</h2>
        <div className="continue-card">
          <div className="continue-icon">📅</div>
          <div className="continue-content">
            <h3>Day {getCurrentDay()}: {completedDays === 10 ? 'All Days Complete!' : 'Continue Your Journey'}</h3>
            <p>{completedDays === 10 ? 'You\'ve completed all 10 days! Explore bonus classes.' : `Continue with Day ${getCurrentDay()} to keep learning`}</p>
          </div>
          <Link to={completedDays === 10 ? '/days' : `/day/${getCurrentDay()}`} className="continue-button">
            {completedDays === 10 ? 'View All Days' : `Continue Day ${getCurrentDay()}`} →
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

