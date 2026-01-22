// Simple Web Speech API wrapper - completely free!
export const speakMalayalam = (text, options = {}) => {
  if (!('speechSynthesis' in window)) {
    console.error('Speech synthesis not supported')
    return
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  
  // Settings optimized for learning
  utterance.lang = 'ml-IN' // Malayalam India
  utterance.rate = options.speed || 0.7 // Slower for learning
  utterance.pitch = 1.0
  utterance.volume = options.volume || 1.0
  
  // Try to find Malayalam voice
  const voices = window.speechSynthesis.getVoices()
  const malayalamVoice = voices.find(voice => 
    voice.lang.startsWith('ml') || voice.lang === 'ml-IN'
  )
  
  if (malayalamVoice) {
    utterance.voice = malayalamVoice
  }
  
  // Callbacks
  if (options.onStart) utterance.onstart = options.onStart
  if (options.onEnd) utterance.onend = options.onEnd
  if (options.onError) utterance.onerror = options.onError
  
  window.speechSynthesis.speak(utterance)
}

// Load voices (needed for some browsers)
export const loadVoices = () => {
  return new Promise((resolve) => {
    const voices = window.speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve(voices)
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        resolve(window.speechSynthesis.getVoices())
      }
    }
  })
}

// Stop any ongoing speech
export const stopSpeaking = () => {
  window.speechSynthesis.cancel()
}

