<div align="center">

# 🎵 Glassify

### A modern, glassmorphism-inspired music player built with React.js

A Spotify-inspired music streaming UI with real audio playback, search,
favorites, responsive design, and interactive music controls.

<br/>

<img src="screenshots/Screenshot 2026-08-13 204953.png" alt="Glassify Home" width="900"/>

<br/>

<img src="screenshots/Screenshot 2026-08-13 205206.png" alt="Glassify Music Player" width="900"/>

<br/>

<img src="screenshots/Screenshot 2026-08-13 205244.png" alt="Glassify Search" width="900"/>

<br/>

<img src="screenshots/Screenshot 2026-08-13 205323.png" alt="Glassify Interface" width="900"/>

</div>

---

# 🎵 About Glassify

**Glassify** is a modern Spotify-inspired music player built to demonstrate
practical React.js development concepts.

The application combines a **glassmorphism interface**, interactive
animations, and the **HTML5 Audio API** to provide a functional music
playback experience.

The project was built with a focus on reusable React components,
state management, responsive design, and browser-side data persistence.

---

# ✨ Features

### 🎧 Music Player

- ▶️ Play / Pause
- ⏭️ Next track
- ⏮️ Previous track
- 🔀 Shuffle
- 🔁 Repeat
- 🔊 Volume control
- ⏱️ Real-time progress tracking
- 🎚️ Seek through songs
- 🎵 Automatic next song
- 🎼 Local MP3 playback

### 🔍 Search & Filtering

- Search songs by title
- Search by artist
- Search by album
- Dynamic filtering
- Empty search state

### ❤️ Favorites

- Like / unlike songs
- Dedicated liked songs
- Persistent favorites
- Browser localStorage integration

### 🎨 UI / UX

- Glassmorphism design
- Dark modern interface
- Animated song cards
- Album cards
- Hover effects
- Smooth transitions
- Interactive controls
- Responsive layout

### 📱 Responsive Design

Designed to work across:

- 💻 Desktop
- 🖥️ Large screens
- 📱 Mobile
- 📲 Tablet

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React.js | Frontend UI |
| ⚡ Vite | Development & build tool |
| 🎨 Tailwind CSS | Styling & responsive design |
| 🎵 HTML5 Audio API | Music playback |
| 🧠 Context API | Global music state |
| 💾 localStorage | Persistent liked songs |
| 🎯 JavaScript | Application logic |
| 🎨 Lucide React | UI icons |

---

# 🧠 React Concepts Used

This project was built to practice and demonstrate core React concepts.

### `useState`

Used for managing:

- Current song
- Play / pause state
- Volume
- Search query
- Shuffle
- Repeat
- Current playback time
- Liked songs

### `useEffect`

Used for:

- Synchronizing React state with the Audio API
- Tracking playback progress
- Loading songs
- Persisting favorites
- Handling browser-side effects

### `useRef`

Used to access and control the HTML5 audio element.

```javascript
audioRef.current.play()
audioRef.current.pause()
audioRef.current.currentTime