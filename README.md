# Learn Malayalam 🇮🇳

An interactive web application for learning Malayalam language, designed specifically for English speakers. Features audio pronunciation, interactive lessons, and self-assessment tests.

## ✨ Features

- **🔊 Audio Pronunciation**: Listen to native Malayalam pronunciation using Web Speech API (completely free!)
- **📚 Structured Lessons**: 4 comprehensive modules covering greetings, pronouns, tenses, and daily conversations
- **✅ Interactive MCQ Tests**: Self-assessment quizzes for each module
- **📊 Progress Tracking**: Track your learning progress (requires Supabase setup)
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **🎯 Beginner-Friendly**: Designed for 50+ year old learners with clear, large text

## 📖 Modules

1. **Basic Greetings** (9 lessons) - Essential greetings and introductions
2. **Pronouns** (9 lessons) - Personal and possessive pronouns
3. **Tenses** (13 lessons) - Present, past, and future tenses
4. **Daily Conversations** (27 lessons) - Common phrases for everyday situations

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd learn_malayalam
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Optional: Supabase Setup (for Progress Tracking)

If you want to enable progress tracking, you'll need to set up Supabase:

1. Create a free account at [supabase.com](https://supabase.com)

2. Create a new project

3. Create the following table in your Supabase database:

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress"
  ON user_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  USING (auth.uid() = user_id);
```

4. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Restart the development server

**Note**: The app works perfectly fine without Supabase! Progress tracking is optional.

## 📁 Project Structure

```
learn_malayalam/
├── src/
│   ├── components/          # Reusable components
│   │   ├── AudioPlayer.jsx  # Audio playback component
│   │   └── MCQTest.jsx      # Multiple choice quiz component
│   ├── data/                # Lesson content (JSON files)
│   │   ├── greetings.json
│   │   ├── pronouns.json
│   │   ├── tenses.json
│   │   └── conversations.json
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Greetings.jsx
│   │   ├── Pronouns.jsx
│   │   ├── Tenses.jsx
│   │   ├── DailyConversations.jsx
│   │   └── Progress.jsx
│   ├── services/            # API services
│   │   ├── audio.js         # Web Speech API wrapper
│   │   └── supabase.js      # Supabase client
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── package.json
└── README.md
```

## 🎨 Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Navigation
- **Web Speech API** - Free text-to-speech (no API keys needed!)
- **Supabase** - Optional backend for progress tracking
- **CSS3** - Styling with gradients and animations

## 🌐 Browser Compatibility

- ✅ Chrome/Edge (Best Malayalam voice support)
- ✅ Firefox
- ⚠️ Safari (Limited Malayalam voice support)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 📝 Adding More Content

To add more lessons, edit the JSON files in `src/data/`:

```json
{
  "id": "unique-id",
  "malayalam": "മലയാളം",
  "transliteration": "malayāḷam",
  "english": "Malayalam",
  "category": "category-name"
}
```

To add more MCQs:

```json
{
  "id": "mcq-unique-id",
  "question": "Your question here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correct": 0,
  "explanation": "Explanation of the correct answer"
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (if using Supabase)
5. Deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

## 📄 License

MIT License - feel free to use this project for learning!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more lessons and vocabulary
- Improve translations
- Add new features
- Fix bugs

## 📧 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Made with ❤️ for Malayalam learners

