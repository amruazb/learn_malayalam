import { useState, useEffect } from 'react'
import './DailyQuiz.css'

// Sample quiz questions from all modules
const quizQuestions = [
  {
    question: "How do you say 'Hello' formally in Malayalam?",
    options: [
      { malayalam: "ഹായ്", transliteration: "hai" },
      { malayalam: "നമസ്കാരം", transliteration: "namaskāram" },
      { malayalam: "സുഖമാണോ?", transliteration: "sukhamāṇo?" },
      { malayalam: "എന്താ വിശേഷം?", transliteration: "entā viśēṣam?" }
    ],
    correct: 1,
    explanation: "നമസ്കാരം (namaskāram) is the formal way to say hello"
  },
  {
    question: "What is the Malayalam word for 'I'?",
    options: [
      { malayalam: "നീ", transliteration: "nī" },
      { malayalam: "ഞാൻ", transliteration: "ñān" },
      { malayalam: "അവൻ", transliteration: "avaṉ" },
      { malayalam: "നമ്മൾ", transliteration: "nammaḷ" }
    ],
    correct: 1,
    explanation: "ഞാൻ (ñān) means 'I'"
  },
  {
    question: "How do you say 'Yes' in Malayalam?",
    options: [
      { malayalam: "ഇല്ല", transliteration: "illa" },
      { malayalam: "അതെ", transliteration: "athe" },
      { malayalam: "ശരി", transliteration: "śari" },
      { malayalam: "മതി", transliteration: "mati" }
    ],
    correct: 1,
    explanation: "അതെ (athe) means 'Yes'"
  },
  {
    question: "What does 'സുഖമാണോ?' mean?",
    options: [
      { malayalam: "Hello", transliteration: "" },
      { malayalam: "How are you?", transliteration: "" },
      { malayalam: "What's new?", transliteration: "" },
      { malayalam: "Goodbye", transliteration: "" }
    ],
    correct: 1,
    explanation: "സുഖമാണോ? (sukhamāṇo?) means 'How are you?'"
  },
  {
    question: "How do you say 'Thank you' in Malayalam?",
    options: [
      { malayalam: "ശരി", transliteration: "śari" },
      { malayalam: "നന്ദി", transliteration: "nandi" },
      { malayalam: "മതി", transliteration: "mati" },
      { malayalam: "അതെ", transliteration: "athe" }
    ],
    correct: 1,
    explanation: "നന്ദി (nandi) means 'Thank you'"
  }
]

function DailyQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [quizComplete, setQuizComplete] = useState(false)
  const [dailyQuestion, setDailyQuestion] = useState(null)

  useEffect(() => {
    // Get a "daily" question based on the current date
    const today = new Date().toDateString()
    const questionIndex = Math.abs(today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % quizQuestions.length
    setDailyQuestion(quizQuestions[questionIndex])
  }, [])

  const handleAnswerSelect = (index) => {
    if (showExplanation) return
    
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === dailyQuestion.correct) {
      setScore(1)
    }
  }

  const handleComplete = () => {
    setQuizComplete(true)
    if (onComplete) {
      onComplete({ score, total: 1 })
    }
  }

  if (!dailyQuestion) {
    return <div className="daily-quiz loading">Loading today's question...</div>
  }

  if (quizComplete) {
    return (
      <div className="daily-quiz complete">
        <div className="quiz-result">
          <div className="result-icon">{score === 1 ? '🎉' : '💪'}</div>
          <h3>{score === 1 ? 'Perfect!' : 'Good Try!'}</h3>
          <p className="result-message">
            {score === 1 
              ? "You got today's question right!" 
              : "Come back tomorrow for a new question!"}
          </p>
          <p className="signup-prompt">
            Want to learn more? <strong>Sign up</strong> to access all 58 lessons!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="daily-quiz">
      <div className="quiz-header">
        <h3>📅 Daily Quiz</h3>
        <p className="quiz-subtitle">Test your Malayalam knowledge!</p>
      </div>

      <div className="quiz-question">
        <p className="question-text">{dailyQuestion.question}</p>
        
        <div className="quiz-options">
          {dailyQuestion.options.map((option, index) => {
            const malayalamText = option.malayalam
            const transliteration = option.transliteration
            
            return (
              <button
                key={index}
                className={`quiz-option ${selectedAnswer === index ? 'selected' : ''} 
                           ${showExplanation && index === dailyQuestion.correct ? 'correct' : ''}
                           ${showExplanation && selectedAnswer === index && index !== dailyQuestion.correct ? 'incorrect' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <div className="option-content">
                  <span className="option-text malayalam-text">{malayalamText}</span>
                  {transliteration && (
                    <span className="option-transliteration">({transliteration})</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="quiz-explanation">
            <p className="explanation-text">
              {selectedAnswer === dailyQuestion.correct ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="explanation-detail">{dailyQuestion.explanation}</p>
            <button onClick={handleComplete} className="complete-button">
              See Result
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DailyQuiz

