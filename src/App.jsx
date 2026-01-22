import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Basics from './pages/Basics'
import Alphabets from './pages/Alphabets'
import Greetings from './pages/Greetings'
import Pronouns from './pages/Pronouns'
import Tenses from './pages/Tenses'
import Conversations from './pages/Conversations'
import DailyConversations from './pages/DailyConversations'
import Progress from './pages/Progress'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './App.css'

function Navigation() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="malayalam-text">മലയാളം</span> Learn Malayalam
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/basics">Basics</Link></li>
          <li><Link to="/tenses">Tenses</Link></li>
          <li><Link to="/conversations">Conversations</Link></li>
          <li><Link to="/progress">Progress</Link></li>
          {user ? (
            <>
              <li className="user-info">
                <span className="user-email">{user.email}</span>
              </li>
              <li>
                <button onClick={handleSignOut} className="nav-button logout-button">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-button login-button">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="nav-button register-button">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

function AppContent() {
  const { user } = useAuth()

  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <LandingPage />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/basics/alphabets" element={<Alphabets />} />
          <Route path="/basics/greetings" element={<Greetings />} />
          <Route path="/basics/pronouns" element={<Pronouns />} />
          <Route path="/tenses" element={<Tenses />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/conversations/casual" element={<DailyConversations />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App

