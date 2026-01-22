# Quick Start Guide - Learn Malayalam

Get started with the Malayalam learning app in 5 minutes!

## 🚀 Installation (First Time Only)

1. **Install Node.js** (if you don't have it)
   - Download from [nodejs.org](https://nodejs.org)
   - Choose the LTS version
   - Install with default settings

2. **Open Terminal/Command Prompt**
   - Windows: Press `Win + R`, type `cmd`, press Enter
   - Mac: Press `Cmd + Space`, type `terminal`, press Enter

3. **Navigate to the project folder**
   ```bash
   cd d:\source\learn_malayalam
   ```

4. **Install dependencies** (only needed once)
   ```bash
   npm install
   ```

## ▶️ Running the App

Every time you want to use the app:

1. **Open Terminal** and navigate to project folder:
   ```bash
   cd d:\source\learn_malayalam
   ```

2. **Start the app**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

4. **Start learning!** 🎉

## 🛑 Stopping the App

- Press `Ctrl + C` in the terminal
- Or just close the terminal window

## 📚 How to Use

### 1. Home Page
- See all 4 learning modules
- Click on any module to start learning

### 2. Lesson Pages
- **Listen**: Click the ▶ button to hear pronunciation
- **Speed Control**: Adjust playback speed (0.5x, 0.7x, 1x)
- **Read**: See Malayalam text, transliteration, and English translation
- **Practice**: Scroll through all lessons in the module

### 3. Take Tests
- Click "📝 Take the Test" button at the bottom of any lesson page
- Answer multiple choice questions
- Get instant feedback
- See your score at the end

### 4. Track Progress
- Click "Progress" in the navigation menu
- See your overall completion percentage
- View module-by-module progress
- Unlock achievements

## 🎯 Learning Tips

1. **Start with Greetings** - Build a foundation with basic phrases
2. **Use Slow Speed** - Set audio to 0.5x or 0.7x when learning new words
3. **Repeat Often** - Listen to each phrase multiple times
4. **Take Tests** - Test yourself after completing each module
5. **Practice Daily** - Even 10 minutes a day helps!

## 🔊 Audio Features

- **Web Speech API**: Uses your browser's built-in text-to-speech
- **No Internet Required**: Works offline after first load
- **Adjustable Speed**: Perfect for learners
- **Free Forever**: No API costs or subscriptions

### Best Browsers for Malayalam Audio:
- ✅ **Chrome** (Best quality)
- ✅ **Edge** (Best quality)
- ⚠️ **Firefox** (Good)
- ⚠️ **Safari** (Limited Malayalam support)

## 📱 Mobile Usage

The app works on mobile devices too!

1. Start the app on your computer
2. Find your computer's IP address
3. On your phone, open browser and go to:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```

Or just use it on your computer - it's optimized for all screen sizes!

## ❓ Troubleshooting

### "npm: command not found"
- Install Node.js from [nodejs.org](https://nodejs.org)
- Restart your terminal after installation

### "Port 5173 is already in use"
- Close any other instances of the app
- Or the app is already running - just open the browser!

### Audio not working
- Make sure your browser supports Web Speech API
- Try Chrome or Edge for best results
- Check your volume settings

### Page is blank
- Check the terminal for error messages
- Make sure all files were created correctly
- Try refreshing the browser (Ctrl + R or Cmd + R)

## 🎨 Customization

Want to add more content? Edit these files:

- `src/data/greetings.json` - Add more greetings
- `src/data/pronouns.json` - Add more pronouns
- `src/data/tenses.json` - Add more verb examples
- `src/data/conversations.json` - Add more phrases

Each lesson follows this format:
```json
{
  "id": "unique-id",
  "malayalam": "മലയാളം",
  "transliteration": "malayāḷam",
  "english": "Malayalam",
  "category": "category-name"
}
```

## 📊 Optional: Enable Progress Tracking

Want to save your progress? See `SUPABASE_SETUP.md` for instructions.

**Note**: The app works perfectly without this! Progress tracking is optional.

## 🎓 Learning Path

Recommended order:

1. **Week 1**: Basic Greetings + Pronouns
2. **Week 2**: Tenses (Present, Past, Future)
3. **Week 3**: Daily Conversations
4. **Week 4**: Review and practice all modules

## 💡 Pro Tips

- **Bookmark the app**: Add `http://localhost:5173` to your browser bookmarks
- **Use headphones**: Better audio quality for pronunciation
- **Write it down**: Keep a notebook of new words
- **Speak out loud**: Practice pronunciation while listening
- **Be patient**: Language learning takes time!

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Check `SUPABASE_SETUP.md` for progress tracking setup
- Open an issue on GitHub
- Review the code - it's well-commented!

---

**Ready to start?** Run `npm run dev` and open http://localhost:5173 🚀

Happy learning! മലയാളം പഠിക്കാം! (Let's learn Malayalam!)

