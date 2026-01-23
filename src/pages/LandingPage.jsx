import { Link } from 'react-router-dom'
import DailyQuiz from '../components/DailyQuiz'
import './LandingPage.css'

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn <span className="malayalam-text">മലയാളം</span> Today
          </h1>
          <p className="hero-description">
            Master Malayalam through interactive lessons, audio pronunciation, and daily quizzes.
            Join thousands of learners on their language journey!
          </p>
          <div className="hero-buttons">
            <Link to="/day/1" className="cta-button primary">
              Start Now
            </Link>
            <Link to="/register" className="cta-button secondary">
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* Daily Quiz Section */}
      <section className="daily-quiz-section">
        <div className="section-header">
          <h2>Try Today's Challenge</h2>
          <p>Test your Malayalam knowledge with our daily quiz!</p>
        </div>
        <DailyQuiz />
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Learn with Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔊</div>
            <h3>Audio Pronunciation</h3>
            <p>Listen to native pronunciation with adjustable playback speed for better learning</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>58 Lessons</h3>
            <p>Comprehensive curriculum covering greetings, pronouns, tenses, and daily conversations</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Interactive Tests</h3>
            <p>22 MCQ tests to assess your knowledge and track your progress</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your learning journey with detailed progress analytics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Self-Paced</h3>
            <p>Learn at your own pace, anytime, anywhere. No deadlines or pressure</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💯</div>
            <h3>100% Free</h3>
            <p>All features completely free. No hidden costs or subscriptions</p>
          </div>
        </div>
      </section>

      {/* Modules Preview */}
      <section className="modules-preview">
        <h2 className="section-title">What You'll Learn</h2>
        <div className="modules-grid">
          <div className="module-preview-card">
            <div className="module-icon" style={{ background: '#667eea' }}>📚</div>
            <h3>Basics</h3>
            <p>38 lessons covering fundamentals</p>
            <ul className="module-topics">
              <li>Malayalam alphabets</li>
              <li>Greetings & introductions</li>
              <li>Personal pronouns</li>
            </ul>
          </div>
          <div className="module-preview-card">
            <div className="module-icon" style={{ background: '#f093fb' }}>⏰</div>
            <h3>Tenses</h3>
            <p>13 lessons on verb conjugations</p>
            <ul className="module-topics">
              <li>Present tense</li>
              <li>Past tense</li>
              <li>Future tense</li>
            </ul>
          </div>
          <div className="module-preview-card">
            <div className="module-icon" style={{ background: '#4facfe' }}>💬</div>
            <h3>Daily Conversations</h3>
            <p>27 lessons for everyday situations</p>
            <ul className="module-topics">
              <li>Food & dining</li>
              <li>Common phrases</li>
              <li>Polite requests</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join now and get instant access to all 58 lessons and features!</p>
          <Link to="/register" className="cta-button large">
            Create Free Account
          </Link>
          <p className="cta-note">No credit card required • Takes less than 30 seconds</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat">
          <div className="stat-number">58</div>
          <div className="stat-label">Lessons</div>
        </div>
        <div className="stat">
          <div className="stat-number">22</div>
          <div className="stat-label">Tests</div>
        </div>
        <div className="stat">
          <div className="stat-number">4</div>
          <div className="stat-label">Modules</div>
        </div>
        <div className="stat">
          <div className="stat-number">100%</div>
          <div className="stat-label">Free</div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage

