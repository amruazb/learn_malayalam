import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
  const modules = [
    {
      title: 'Basics',
      description: 'Alphabets, greetings, and pronouns',
      path: '/basics',
      icon: '�',
      lessons: 38,
      color: '#667eea'
    },
    {
      title: 'Tenses',
      description: 'Present, past, and future tenses',
      path: '/tenses',
      icon: '⏰',
      lessons: 13,
      color: '#f093fb'
    },
    {
      title: 'Daily Conversations',
      description: 'Common phrases for everyday situations',
      path: '/conversations',
      icon: '💬',
      lessons: 27,
      color: '#4facfe'
    }
  ]

  return (
    <div className="home">
      <header className="hero">
        <h1 className="hero-title">
          Learn <span className="malayalam-text">മലയാളം</span>
        </h1>
        <p className="hero-subtitle">
          Master Malayalam through interactive lessons, audio pronunciation, and self-tests
        </p>
      </header>

      <div className="modules-grid">
        {modules.map((module, index) => (
          <Link 
            key={index} 
            to={module.path} 
            className="module-card"
            style={{ borderTopColor: module.color }}
          >
            <div className="module-icon" style={{ background: module.color }}>
              {module.icon}
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

      <div className="features">
        <div className="feature">
          <div className="feature-icon">🔊</div>
          <h3>Audio Pronunciation</h3>
          <p>Listen to native pronunciation with adjustable speed</p>
        </div>
        <div className="feature">
          <div className="feature-icon">✅</div>
          <h3>Self-Tests</h3>
          <p>Test your knowledge with interactive MCQs</p>
        </div>
        <div className="feature">
          <div className="feature-icon">📊</div>
          <h3>Track Progress</h3>
          <p>Monitor your learning journey and achievements</p>
        </div>
      </div>
    </div>
  )
}

export default Home

