import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Days from './pages/Days'
import Day1 from './pages/Day1'
import Day2 from './pages/Day2'
import Day3 from './pages/Day3'
import Day4 from './pages/Day4'
import Day5 from './pages/Day5'
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
          <li><Link to="/days">Daily Lessons</Link></li>
          <li><Link to="/basics">Basics</Link></li>
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
          <Route path="/days" element={<Days />} />
          <Route path="/day/1" element={<Day1 />} />
          <Route path="/day/2" element={<Day2 />} />
          <Route path="/day/3" element={<Day3 />} />
          <Route path="/day/4" element={<Day4 />} />
          <Route path="/day/5" element={<Day5 />} />
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

