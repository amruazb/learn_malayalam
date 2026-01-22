import { useState } from 'react'
import { speakMalayalam, stopSpeaking } from '../services/audio'
import './AudioPlayer.css'

const AudioPlayer = ({ malayalam, transliteration, english }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(0.7)

  const handlePlay = () => {
    if (isPlaying) {
      stopSpeaking()
      setIsPlaying(false)
    } else {
      speakMalayalam(malayalam, {
        speed: speed,
        onStart: () => setIsPlaying(true),
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false)
      })
    }
  }

  return (
    <div className="audio-player">
      <div className="audio-content">
        <div className="malayalam-text">{malayalam}</div>
        <div className="transliteration">{transliteration}</div>
        <div className="english-text">{english}</div>
      </div>
      
      <div className="audio-controls">
        <button 
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={handlePlay}
          aria-label={isPlaying ? 'Stop' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        
        <select 
          value={speed} 
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="speed-control"
        >
          <option value="0.5">0.5x (Very Slow)</option>
          <option value="0.7">0.7x (Slow)</option>
          <option value="1.0">1x (Normal)</option>
        </select>
      </div>
    </div>
  )
}

export default AudioPlayer

