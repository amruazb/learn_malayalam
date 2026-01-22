# Voice & Audio Implementation Guide for Malayalam Learning Platform

## 🎯 Overview
This guide covers all aspects of implementing high-quality audio and voice features for teaching Malayalam pronunciation to a 50+ year old English speaker.

---

## 🔊 Three-Tier Audio Strategy (Recommended)

### Tier 1: Core Content (Pre-recorded Native Audio)
**What to record**: Essential learning content that needs perfect pronunciation
- All 51 Malayalam letters (vowels + consonants)
- Top 200 most common words
- All business phrases
- Common greetings and responses
- Numbers 1-100

**How to get recordings**:
1. **Hire a Native Speaker** (Best option)
   - Find Malayalam voice talent on Fiverr ($50-150 for 200 words)
   - Or Upwork, Voices.com
   - Specify: Clear, slow pronunciation for learners
   - Request multiple speeds (normal, slow)

2. **Use Your Own Voice** (If you're a native speaker)
   - Record using Audacity (free) or GarageBand
   - Use a decent USB microphone ($30-50)
   - Quiet room, consistent distance from mic
   - Save as MP3, 128kbps quality

3. **Professional Service** (Premium option)
   - Voices.com or Voice123
   - $200-500 for full curriculum
   - Multiple takes, professional editing

**File Naming Convention**:
```
/audio/alphabet/vowel_a.mp3
/audio/alphabet/vowel_aa.mp3
/audio/vocabulary/greeting_namaskaram.mp3
/audio/vocabulary/greeting_namaskaram_slow.mp3
/audio/numbers/number_1.mp3
```

### Tier 2: Dynamic Content (Web Speech API)
**What to use TTS for**:
- User-created content
- Example sentences
- Practice exercises
- Real-time pronunciation help
- Any text input by teacher

**Implementation**:
```javascript
// src/services/audio.js

const speakMalayalam = (text, options = {}) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Settings optimized for older learners
    utterance.lang = 'ml-IN'; // Malayalam India
    utterance.rate = options.speed || 0.7; // Slower for learning
    utterance.pitch = 1.0;
    utterance.volume = options.volume || 1.0;
    
    // Find Malayalam voice if available
    const voices = speechSynthesis.getVoices();
    const malayalamVoice = voices.find(voice => 
      voice.lang.startsWith('ml') || voice.lang === 'ml-IN'
    );
    
    if (malayalamVoice) {
      utterance.voice = malayalamVoice;
    }
    
    utterance.onstart = () => options.onStart?.();
    utterance.onend = () => options.onEnd?.();
    utterance.onerror = (e) => options.onError?.(e);
    
    speechSynthesis.speak(utterance);
  } else {
    console.error('Speech synthesis not supported');
    options.onError?.('Browser does not support text-to-speech');
  }
};

// Usage
speakMalayalam('നമസ്കാരം', {
  speed: 0.6,
  onStart: () => console.log('Playing...'),
  onEnd: () => console.log('Finished'),
  onError: (err) => console.error('Error:', err)
});
```

### Tier 3: Student Recording (Web Audio API)
**For pronunciation practice**:
```javascript
// src/services/recording.js

class AudioRecorder {
  constructor() {
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
  }
  
  async initialize() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      this.mediaRecorder.ondataavailable = (event) => {
        this.audioChunks.push(event.data);
      };
      
      return true;
    } catch (error) {
      console.error('Microphone access denied:', error);
      return false;
    }
  }
  
  start() {
    this.audioChunks = [];
    this.mediaRecorder.start();
  }
  
  stop() {
    return new Promise((resolve) => {
      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve({ blob: audioBlob, url: audioUrl });
      };
      this.mediaRecorder.stop();
    });
  }
  
  cleanup() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }
}

// Usage
const recorder = new AudioRecorder();
await recorder.initialize();
recorder.start();
// ... after recording
const { blob, url } = await recorder.stop();
```

---

## 🎨 UI Components for Audio

### 1. Audio Player Component
```javascript
// src/components/common/AudioPlayer.jsx

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

const AudioPlayer = ({ 
  malayalamText, 
  audioUrl, 
  showTransliteration,
  transliteration,
  size = 'medium' 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const audioRef = useRef(null);
  
  const buttonSize = size === 'large' ? 'w-16 h-16' : 'w-12 h-12';
  const fontSize = size === 'large' ? 'text-3xl' : 'text-2xl';
  
  const handlePlay = () => {
    if (audioUrl) {
      // Play pre-recorded audio
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else {
      // Use TTS
      if (isPlaying) {
        speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(malayalamText);
        utterance.lang = 'ml-IN';
        utterance.rate = speed;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  }, [speed]);
  
  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      {/* Malayalam Text */}
      <div className={`${fontSize} font-bold text-gray-800`}>
        {malayalamText}
      </div>
      
      {/* Transliteration */}
      {showTransliteration && transliteration && (
        <div className="text-lg text-gray-600 italic">
          {transliteration}
        </div>
      )}
      
      {/* Controls */}
      <div className="flex items-center gap-4">
        {/* Play Button */}
        <button
          onClick={handlePlay}
          className={`${buttonSize} rounded-full bg-blue-600 hover:bg-blue-700 
                     text-white flex items-center justify-center transition-all
                     shadow-lg hover:shadow-xl active:scale-95`}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={32} /> : <Play size={32} />}
        </button>
        
        {/* Speed Control */}
        <select
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="px-4 py-2 text-lg border-2 border-gray-300 rounded-lg
                   focus:border-blue-500 focus:outline-none"
        >
          <option value="0.5">0.5x (Very Slow)</option>
          <option value="0.75">0.75x (Slow)</option>
          <option value="1.0">1x (Normal)</option>
          <option value="1.25">1.25x (Fast)</option>
        </select>
        
        {/* Repeat Button */}
        <button
          onClick={handlePlay}
          className="p-3 rounded-lg bg-gray-200 hover:bg-gray-300"
          aria-label="Repeat"
        >
          <RotateCcw size={24} />
        </button>
      </div>
      
      {/* Hidden audio element for pre-recorded files */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      )}
      
      {/* Playing indicator */}
      {isPlaying && (
        <div className="flex gap-1">
          <div className="w-1 h-8 bg-blue-600 animate-pulse" />
          <div className="w-1 h-8 bg-blue-600 animate-pulse delay-100" />
          <div className="w-1 h-8 bg-blue-600 animate-pulse delay-200" />
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
```

### 2. Recording Interface Component
```javascript
// src/components/common/RecordingInterface.jsx

import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2, Check } from 'lucide-react';

const RecordingInterface = ({ 
  targetWord, 
  onSubmit,
  showComparison = true 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        chunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      alert('Please allow microphone access to record your pronunciation');
    }
  };
  
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };
  
  const deleteRecording = () => {
    setRecordedUrl(null);
  };
  
  const submitRecording = () => {
    if (recordedUrl) {
      // Convert to blob and submit
      fetch(recordedUrl)
        .then(r => r.blob())
        .then(blob => onSubmit(blob));
    }
  };
  
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
      <h3 className="text-2xl font-bold text-gray-800">
        Pronounce: <span className="text-blue-600 text-3xl">{targetWord}</span>
      </h3>
      
      {/* Recording Status */}
      <div className="text-center">
        {isRecording ? (
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xl font-semibold text-red-600">Recording...</span>
          </div>
        ) : recordedUrl ? (
          <div className="text-lg text-green-600 font-semibold">
            ✓ Recording complete! Listen or re-record.
          </div>
        ) : (
          <div className="text-lg text-gray-600">
            Click the microphone to start recording
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="flex gap-4">
        {!isRecording && !recordedUrl && (
          <button
            onClick={startRecording}
            className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-600
                     text-white text-xl font-semibold rounded-full shadow-lg
                     transition-all hover:shadow-xl active:scale-95"
          >
            <Mic size={28} />
            Start Recording
          </button>
        )}
        
        {isRecording && (
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-900
                     text-white text-xl font-semibold rounded-full shadow-lg"
          >
            <Square size={28} />
            Stop
          </button>
        )}
        
        {recordedUrl && (
          <>
            <button
              onClick={() => {
                const audio = new Audio(recordedUrl);
                audio.play();
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600
                       text-white text-lg rounded-lg shadow-md"
            >
              <Play size={24} />
              Listen
            </button>
            
            <button
              onClick={deleteRecording}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600
                       text-white text-lg rounded-lg shadow-md"
            >
              <Trash2 size={24} />
              Delete
            </button>
            
            <button
              onClick={submitRecording}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600
                       text-white text-lg rounded-lg shadow-md"
            >
              <Check size={24} />
              Submit
            </button>
          </>
        )}
      </div>
      
      {/* Waveform visualization would go here */}
      {isRecording && (
        <div className="flex gap-1 h-16 items-end">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-red-500 rounded-t"
              style={{
                height: `${Math.random() * 100}%`,
                animation: `pulse ${0.5 + Math.random()}s ease-in-out infinite`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecordingInterface;
```

---

## 📁 Supabase Storage Setup for Audio Files

### 1. Create Storage Bucket
```sql
-- In Supabase SQL Editor

-- Create bucket for audio files
INSERT INTO storage.buckets (id, name, public)
VALUES ('audio-files', 'audio-files', true);

-- Set up storage policies
CREATE POLICY "Anyone can view audio files"
ON storage.objects FOR SELECT
USING (bucket_id = 'audio-files');

CREATE POLICY "Teachers can upload audio files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'audio-files' 
  AND auth.uid() IN (
    SELECT id FROM profiles WHERE role = 'teacher'
  )
);
```

### 2. Upload Audio Files
```javascript
// src/services/audioStorage.js

import { supabase } from './supabase';

export const uploadAudioFile = async (file, path) => {
  try {
    const { data, error } = await supabase.storage
      .from('audio-files')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('audio-files')
      .getPublicUrl(path);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading audio:', error);
    return null;
  }
};

export const getAudioUrl = (path) => {
  const { data } = supabase.storage
    .from('audio-files')
    .getPublicUrl(path);
  return data.publicUrl;
};

// Usage
const audioFile = document.querySelector('input[type="file"]').files[0];
const url = await uploadAudioFile(
  audioFile, 
  'alphabet/vowel_a.mp3'
);
```

---

## 🎤 Alternative TTS Services (If Web Speech API is insufficient)

### Option 1: Google Cloud Text-to-Speech
**Pros**: Best quality, natural pronunciation, supports Malayalam
**Cons**: Paid ($4 per 1M characters)

```javascript
// Server-side API call (Node.js)
const textToSpeech = require('@google-cloud/text-to-speech');
const client = new textToSpeech.TextToSpeechClient();

async function synthesizeSpeech(text) {
  const request = {
    input: { text },
    voice: { 
      languageCode: 'ml-IN',
      name: 'ml-IN-Wavenet-A'
    },
    audioConfig: { audioEncoding: 'MP3' }
  };
  
  const [response] = await client.synthesizeSpeech(request);
  return response.audioContent; // Base64 audio
}
```

### Option 2: Responsive Voice (JavaScript Library)
**Pros**: Easy to use, works in browser
**Cons**: Limited Malayalam support, paid plans for commercial use

```html
<script src="https://code.responsivevoice.org/responsivevoice.js"></script>
<script>
  responsiveVoice.speak("നമസ്കാരം", "Malayalam Female");
</script>
```

### Option 3: Amazon Polly
**Pros**: Good quality, affordable
**Cons**: Needs AWS setup, Malayalam support varies

---

## 🔧 Browser Compatibility Handling

```javascript
// src/utils/audioCompatibility.js

export const checkAudioSupport = () => {
  const support = {
    speechSynthesis: 'speechSynthesis' in window,
    mediaRecorder: 'MediaRecorder' in window,
    getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
    audioContext: !!(window.AudioContext || window.webkitAudioContext)
  };
  
  return support;
};

export const getAudioCapabilities = () => {
  const support = checkAudioSupport();
  
  if (!support.speechSynthesis) {
    return {
      canSpeak: false,
      canRecord: support.mediaRecorder && support.getUserMedia,
      message: 'Text-to-speech not supported. Pre-recorded audio will be used.'
    };
  }
  
  return {
    canSpeak: true,
    canRecord: support.mediaRecorder && support.getUserMedia,
    message: 'All audio features supported!'
  };
};

// Show warning to user if needed
const capabilities = getAudioCapabilities();
if (!capabilities.canSpeak) {
  console.warn(capabilities.message);
}
```

---

## 📱 Mobile-Specific Considerations

### iOS Safari Issues
- Auto-play is blocked (require user interaction)
- Must use user gesture to initiate audio
- Web Speech API has limited Malayalam support

**Solution**:
```javascript
// Always require button click before playing
const handlePlayAudio = () => {
  // This works because it's in a user gesture (click)
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
};

// This WON'T work on iOS
useEffect(() => {
  // Auto-play blocked
  speechSynthesis.speak(utterance);
}, []);
```

### Android Chrome
- Generally better support
- Still needs user permission for microphone

---

## 🎯 Recommended Implementation Plan

### Week 1-2: Core Audio
1. Implement Web Speech API for basic TTS
2. Create AudioPlayer component
3. Test on multiple browsers
4. Record 50 most common words (hire Fiverr talent)

### Week 3: Recording Features
1. Build RecordingInterface component
2. Test microphone permissions flow
3. Upload recordings to Supabase Storage
4. Create grading interface for teachers

### Week 4: Polish
1. Add speed controls
2. Implement offline caching
3. Add visual feedback (waveforms)
4. Complete remaining pre-recorded audio

---

## 💰 Budget Estimate

**Minimal Budget** ($50-100):
- Hire Fiverr voice talent for 200 words: $50-100
- Use Web Speech API for everything else: FREE
- Supabase free tier: FREE
- **Total: $50-100**

**Recommended Budget** ($200-300):
- Professional voice recording (500 words): $150-200
- Backup TTS API credits (Google Cloud): $50
- Supabase Pro (better performance): $25/month
- **Total: $200-300 + $25/month**

**Premium Budget** ($500+):
- Full curriculum professionally recorded: $400-500
- Google Cloud TTS unlimited: $100/month
- Supabase Pro with more storage: $25/month
- **Total: $500 + $125/month**

---

## ✅ Testing Checklist

- [ ] Audio plays on Chrome Desktop
- [ ] Audio plays on Safari Desktop
- [ ] Audio plays on iPhone Safari
- [ ] Audio plays on Android Chrome
- [ ] Recording works with microphone permission
- [ ] Speed control changes playback speed
- [ ] Audio files load from Supabase Storage
- [ ] TTS works with Malayalam text
- [ ] Audio continues playing when tab backgrounded
- [ ] Audio stops when user navigates away
- [ ] Offline cached audio works without internet

---

This guide gives you everything needed to implement professional audio features for your Malayalam learning platform!