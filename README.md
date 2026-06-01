# 한국어 — Korean Travel Essentials

A mobile-first micro-learning web app for tourists preparing for Jeju and Seoul.  
Learn Korean phrases, the Hangul alphabet, and pronunciation — all offline-capable, no backend required.

## Features

- 🗣️ 6 travel modules (Survival, Transport, Food, Shopping, Accommodation, Emergencies)
- 🔤 Hangul alphabet module — vowels, consonants, syllable blocks, pronunciation rules, reading practice
- 🔊 Text-to-speech voiceover on every Korean word (Web Speech API, works on iOS/Android/desktop)
- 🃏 Flashcard mode with 3D flip animation and auto-pronunciation
- 🧠 Quiz mode — 10 questions per module, 3 question types, 70% pass threshold
- 🏆 Points, streaks, badges, 14-day study plan
- 💾 Progress saved to `localStorage` — works fully offline after first load

---

## Deploy to Vercel via GitHub

### 1. Create a GitHub repository

```bash
git init
git add .
git commit -m "Initial commit — Korean Travel Essentials app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/korean-travel-app.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (or sign up free)
2. Click **"Add New Project"**
3. Click **"Import Git Repository"** and select your GitHub repo
4. Vercel will auto-detect the settings from `vercel.json`:
   - **Framework Preset:** Other
   - **Build Command:** *(leave empty)*
   - **Output Directory:** `.` (root)
5. Click **Deploy**

Your app will be live at `https://your-project-name.vercel.app` in ~30 seconds.

### 3. Custom domain (optional)

In your Vercel project dashboard → **Settings → Domains**, add your own domain.

---

## Local development

No build tools needed. Just open `index.html` directly in a browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally (for testing speech synthesis, which needs a server on some browsers)
npx serve .
# or
python3 -m http.server 3000
```

> **Note:** Some browsers (e.g. Chrome) block the Web Speech API on `file://` URLs.  
> Use `npx serve .` or `python3 -m http.server` for local testing with full audio support.

---

## Project structure

```
korean-travel-app/
├── index.html      # Entire app — HTML + CSS + JS in one file
├── vercel.json     # Vercel deployment config
├── .gitignore      # Ignores OS/editor files
└── README.md       # This file
```

---

## Browser support

| Browser | Voice support |
|---------|--------------|
| Chrome / Edge | ✅ Full Korean TTS |
| Safari (iOS/macOS) | ✅ Full Korean TTS |
| Firefox | ⚠️ Korean TTS varies by OS |
| Samsung Internet | ✅ Full Korean TTS |

All modern browsers support the app fully. Korean voice quality depends on the voices installed on the device.
