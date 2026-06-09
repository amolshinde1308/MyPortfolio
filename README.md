# Amol Shinde — Portfolio Website

A modern, interactive portfolio built with React.js + Three.js featuring:
- 🎮 Interactive Three.js 3D scene with animated meshes, particles, DNA helix
- 🖱️ Custom cursor with spring physics
- ✨ Canvas-based particle network (mouse-interactive)
- 🎬 Framer Motion page animations & scroll reveals
- 📊 Animated skill bars, counter stats
- 📱 Fully responsive layout
- 🌙 Dark aesthetic with purple/pink gradient theme
- ⚡ Loading screen with progress bar

## Tech Stack
- **React 18** (Vite)
- **Three.js** + @react-three/fiber + @react-three/drei
- **Framer Motion** (motion/react)
- **react-icons** for tech stack icons
- **lucide-react** for UI icons

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173

## Project Structure
```
src/
├── app/
│   ├── App.jsx                   # Root component
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── ThreeScene.jsx        # Three.js 3D canvas
│       ├── InteractiveBackground.jsx  # Canvas particle network
│       ├── CustomCursor.jsx
│       ├── LoadingScreen.jsx
│       ├── Stats.jsx
│       ├── About.jsx
│       ├── TechStack.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── Experience.jsx
│       ├── Contact.jsx
│       ├── Footer.jsx
│       └── ScrollToTop.jsx
├── imports/
│   └── profile.jpg               # Profile photo
├── styles/
│   └── index.css                 # Global styles
└── main.jsx
```

## Customization
- Update personal info in each component
- Replace `src/imports/profile.jpg` with your own photo
- Add real GitHub/LinkedIn URLs in `Hero.jsx` and `Footer.jsx`
- Update project links in `Projects.jsx`
