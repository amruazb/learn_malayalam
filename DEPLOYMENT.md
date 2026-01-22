# Deployment Guide - Learn Malayalam

Deploy your Malayalam learning app to the web for free!

## 🌐 Deployment Options

### Option 1: Vercel (Recommended) ⭐

**Why Vercel?**
- ✅ Free forever for personal projects
- ✅ Automatic deployments from Git
- ✅ Built-in SSL certificate
- ✅ Global CDN
- ✅ Perfect for React/Vite apps

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/learn-malayalam.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" (use GitHub account)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Add Environment Variables** (if using Supabase)
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Redeploy

4. **Done!** Your app is live at `https://your-project.vercel.app`

---

### Option 2: Netlify

**Steps:**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub
   - Drag and drop the `dist` folder
   - Or connect your GitHub repo for auto-deploy

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Add Environment Variables** (if using Supabase)
   - Site settings → Environment variables
   - Add your Supabase credentials

---

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/learn-malayalam",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/learn-malayalam/'
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages
   - Save

---

### Option 4: Railway

**Steps:**

1. **Create railway.json**
   ```json
   {
     "build": {
       "builder": "NIXPACKS"
     },
     "deploy": {
       "startCommand": "npm run preview",
       "restartPolicyType": "ON_FAILURE"
     }
   }
   ```

2. **Deploy**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub
   - New Project → Deploy from GitHub repo
   - Add environment variables if needed

---

## 🔒 Security Checklist

Before deploying:

- [ ] `.env` file is in `.gitignore`
- [ ] No sensitive keys in code
- [ ] Supabase RLS policies are enabled
- [ ] Only anon key is used (not service_role key)
- [ ] CORS is configured in Supabase (if needed)

---

## 🌍 Custom Domain (Optional)

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. SSL certificate auto-generated

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS
4. SSL auto-enabled

---

## 📊 Analytics (Optional)

### Google Analytics

1. **Get tracking ID**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Create property
   - Get tracking ID (G-XXXXXXXXXX)

2. **Add to index.html**
   ```html
   <head>
     <!-- Google Analytics -->
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
     <script>
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-XXXXXXXXXX');
     </script>
   </head>
   ```

---

## 🚀 Performance Optimization

### Before Deploying

1. **Optimize images** (if you add any)
   ```bash
   npm install --save-dev vite-plugin-imagemin
   ```

2. **Enable compression**
   - Vercel/Netlify do this automatically

3. **Check bundle size**
   ```bash
   npm run build
   # Check dist folder size
   ```

---

## 🔄 Continuous Deployment

### Auto-deploy on Git push

**Vercel/Netlify:**
- Automatically deploys when you push to main branch
- Preview deployments for pull requests
- Rollback to previous versions easily

**Workflow:**
```bash
# Make changes
git add .
git commit -m "Add new lessons"
git push

# Vercel/Netlify automatically deploys!
```

---

## 🧪 Testing Before Deployment

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Preview build**
   ```bash
   npm run preview
   ```

3. **Test on different devices**
   - Desktop browser
   - Mobile browser
   - Tablet

4. **Check audio**
   - Test on Chrome
   - Test on Safari
   - Test on mobile

---

## 📱 PWA (Progressive Web App) - Future Enhancement

To make the app installable:

1. **Add manifest.json**
2. **Add service worker**
3. **Add offline support**
4. **Add app icons**

(Not included in current version, but easy to add later)

---

## 🐛 Troubleshooting Deployment

### Build fails
- Check Node.js version (use v16+)
- Clear node_modules and reinstall
- Check for syntax errors

### Blank page after deployment
- Check browser console for errors
- Verify base URL in vite.config.js
- Check if all files are committed

### Environment variables not working
- Prefix with `VITE_` (required for Vite)
- Redeploy after adding variables
- Check variable names match exactly

### Audio not working on deployed site
- Check browser compatibility
- Verify HTTPS is enabled (required for Web Speech API)
- Test on different browsers

---

## 💡 Deployment Tips

1. **Use Vercel for easiest deployment**
2. **Always test build locally first**
3. **Keep environment variables secure**
4. **Monitor usage on free tier**
5. **Set up custom domain for professional look**
6. **Enable analytics to track users**
7. **Regular backups of Supabase data**

---

## 📈 Scaling (If Needed)

Free tiers are generous:

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited websites
- Automatic SSL

**Netlify Free Tier:**
- 100 GB bandwidth/month
- 300 build minutes/month

**Supabase Free Tier:**
- 500 MB database
- 1 GB file storage
- 2 GB bandwidth/month

This is enough for thousands of users!

---

## ✅ Post-Deployment Checklist

- [ ] App loads correctly
- [ ] All pages accessible
- [ ] Audio works
- [ ] Tests work
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] Environment variables set (if using Supabase)
- [ ] Analytics configured (optional)
- [ ] Custom domain configured (optional)

---

## 🎉 You're Live!

Share your app:
- Share the URL with friends/family
- Post on social media
- Add to your portfolio
- Submit to language learning directories

---

**Need help?** Check the deployment platform's documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [GitHub Pages Docs](https://docs.github.com/pages)

