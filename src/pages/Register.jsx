import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css' // Reuse the same styles

function Register() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setError('')
    setLoading(true)

    const { error: signUpError } = await signUp(email, password, fullName)

    setLoading(false)

    if (signUpError) {
      setError(signUpError)
    } else {
      setSuccess(true)
      // Show success message for 2 seconds then redirect
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }

  if (success) {
    return (
      <div className="login-page">
        <div className="login-container">
          <button
            className="close-button"
            onClick={() => navigate('/')}
            aria-label="Close"
          >
            ✕
          </button>
          <div className="login-header">
            <h1>🎉 Welcome!</h1>
            <p>Your account has been created successfully</p>
          </div>
          <div className="success-message">
            <span>✅ Check your email to verify your account. Redirecting...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <button
          className="close-button"
          onClick={() => navigate('/')}
          aria-label="Close"
        >
          ✕
        </button>
        <div className="login-header">
          <h1>🇮🇳 Learn Malayalam</h1>
          <p>Create Your Account</p>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              disabled={loading}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="signup-link">
            Already have an account? <Link to="/login">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

