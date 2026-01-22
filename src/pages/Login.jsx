import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  
  const { signIn, resetPassword } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setError('')
    setLoading(true)

    const { error: signInError } = await signIn(email, password)

    if (signInError) {
      setError(signInError)
      setLoading(false)
    } else {
      // Successfully signed in, navigate to home
      navigate('/')
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setError('')
    setResetMessage('')
    setLoading(true)

    const { error: resetError } = await resetPassword(email)

    setLoading(false)

    if (resetError) {
      setError(resetError)
    } else {
      setResetMessage('Password reset link sent! Check your email.')
      setTimeout(() => {
        setShowForgotPassword(false)
        setResetMessage('')
      }, 3000)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🇮🇳 Learn Malayalam</h1>
          <p>{showForgotPassword ? 'Reset Your Password' : 'Welcome Back!'}</p>
        </div>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
          </div>
        )}

        {resetMessage && (
          <div className="success-message">
            <span>✅ {resetMessage}</span>
          </div>
        )}

        {!showForgotPassword ? (
          <form onSubmit={handleSubmit} className="login-form">
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
                placeholder="Enter your password"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>

            <div className="form-footer">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </button>
            </div>

            <div className="signup-link">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="login-form">
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

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="form-footer">
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => {
                  setShowForgotPassword(false)
                  setError('')
                  setResetMessage('')
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Login

