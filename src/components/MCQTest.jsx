import { useState } from 'react'
import './MCQTest.css'

const MCQTest = ({ mcqs, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState([])

  const handleAnswerSelect = (index) => {
    if (showExplanation) return // Prevent changing answer after submission
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === mcqs[currentQuestion].correctAnswer
    setShowExplanation(true)

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      correct: isCorrect
    }])
  }

  const handleNext = () => {
    if (currentQuestion < mcqs.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Test completed
      const finalScore = score + (selectedAnswer === mcqs[currentQuestion].correctAnswer ? 1 : 0)
      const percentage = Math.round((finalScore / mcqs.length) * 100)
      onComplete && onComplete({ score: finalScore, total: mcqs.length, percentage })
    }
  }

  if (!mcqs || mcqs.length === 0) {
    return <div className="mcq-test">No questions available</div>
  }

  const question = mcqs[currentQuestion]

  return (
    <div className="mcq-test">
      <div className="mcq-header">
        <h3>Question {currentQuestion + 1} of {mcqs.length}</h3>
        <div className="score">Score: {score}/{mcqs.length}</div>
      </div>

      <div className="question-card">
        <p className="question-text">{question.question}</p>
        
        <div className="options">
          {question.options.map((option, index) => {
            // Handle both old string format and new object format
            const malayalamText = typeof option === 'string' ? option : option.malayalam
            const transliteration = typeof option === 'object' ? option.transliteration : ''

            return (
              <button
                key={index}
                className={`option ${selectedAnswer === index ? 'selected' : ''}
                           ${showExplanation && index === question.correctAnswer ? 'correct' : ''}
                           ${showExplanation && selectedAnswer === index && index !== question.correctAnswer ? 'incorrect' : ''}`}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <div className="option-content">
                  <span className="option-text malayalam-text">{malayalamText}</span>
                  {transliteration && (
                    <span className="option-transliteration">Read as: {transliteration}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div className="explanation">
            <p className="explanation-text">
              {selectedAnswer === question.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p>{question.explanation}</p>
          </div>
        )}

        <div className="mcq-actions">
          {!showExplanation ? (
            <button 
              className="submit-btn" 
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          ) : (
            <button className="next-btn" onClick={handleNext}>
              {currentQuestion < mcqs.length - 1 ? 'Next Question' : 'Finish Test'}
            </button>
          )}
        </div>
      </div>

      <div className="progress-indicator">
        {mcqs.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index === currentQuestion ? 'active' : ''} 
                       ${index < currentQuestion ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default MCQTest

