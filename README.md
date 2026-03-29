## Live Demo

Hosted on GitHub Pages: https://abhaysingh4feb-s.github.io/love-arcade/

# The Love Arcade — 9 Levels of Us

A cinematic, interactive romantic web experience built as a personalized journey through 9 mini-games. Each level celebrates a relationship milestone — from shared memories to a final confession — progressively unlocking as you play.

## The Experience

**Emotional Arc:** Curiosity → Playfulness → Nostalgia → Warmth → Surprise → Connection → Excitement → Proposal

1. **Memory Match** 🧠 — Flip cards to match shared memories (first date, first laugh, late night talks...)
2. **Love Quiz** 💝 — Multiple-choice questions about the little things in the relationship
3. **Catch the Hearts** 💕 — Tap falling hearts against the clock (catch 10 in 20 seconds)
4. **Love Timeline** 📖 — Arrange relationship milestones in chronological order
5. **Fix My Heart** 💗 — Solve a 3x3 heart emoji puzzle by swapping pieces
6. **Choose Our Date** 🌹 — Pick a dream date: Rooftop Dinner, Sunset Picnic, Adventure Day, or Cozy Night In
7. **Compliment Bubbles** ✨ — Pop floating bubbles to reveal heartfelt compliments
8. **Love Meter** ❤️‍🔥 — Tap the heart 20 times to fill the meter to "infinity and beyond"
9. **Final Confession** 💎 — A cinematic text reveal ending with a date proposal

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Next.js 15 (App Router)          |
| UI           | React 19, Tailwind CSS 4         |
| Animations   | Framer Motion 12                  |
| Effects      | Canvas Confetti                   |
| Fonts        | Playfair Display + Inter (Google) |
| Language     | TypeScript 5                      |
| State        | React hooks + localStorage        |

## Project Structure

```
src/
├── app/
│   ├── page.tsx                # Landing — cinematic intro
│   ├── dashboard/page.tsx      # Game hub — 9 level cards + progress bar
│   ├── level/[id]/page.tsx     # Dynamic game player for levels 1–9
│   └── layout.tsx              # Root layout with custom fonts
├── games/                      # 9 game components (one per level)
│   ├── MemoryMatch.tsx
│   ├── LoveQuiz.tsx
│   ├── CatchTheHearts.tsx
│   ├── LoveTimeline.tsx
│   ├── FixMyHeart.tsx
│   ├── ChooseOurDate.tsx
│   ├── ComplimentBubbles.tsx
│   ├── LoveMeter.tsx
│   └── FinalConfession.tsx
├── components/                 # Shared UI
│   ├── ParticleBackground.tsx  # Canvas-based animated hearts & circles
│   ├── GlassCard.tsx           # Glassmorphism motion card
│   ├── LevelComplete.tsx       # Completion modal with confetti
│   └── SettingsPanel.tsx       # Sound, replay intro, reset progress
├── hooks/
│   └── useGameState.ts         # Central state (localStorage persistence)
├── data/
│   └── levels.ts               # Level metadata (titles, quotes, colors)
└── utils/
    └── confetti.ts             # Celebration, hearts & grand finale effects
```

## How It Works

- **Sequential unlocking** — Complete level N to unlock level N+1. Level 1 is always open.
- **Progress persistence** — All state saved to `localStorage` under `love-arcade-progress`.
- **Replayable** — Any completed level can be replayed from the dashboard.
- **Settings** — Toggle sound, replay the intro, or reset all progress.
- **No backend** — 100% client-side, deploy anywhere as a static site.

## Color Palette

| Name       | Hex       | Usage                     |
| ---------- | --------- | ------------------------- |
| Dark Navy  | `#0F172A` | Background                |
| Blush Pink | `#F472B6` | Memory Match, Fix My Heart|
| Rose Gold  | `#E6A57E` | Love Quiz, Final Confession|
| Soft Coral | `#FB7185` | Catch the Hearts          |
| Purple     | `#A78BFA` | Love Timeline             |
| Gold       | `#FACC15` | Choose Our Date           |
| Emerald    | `#34D399` | Compliment Bubbles        |
| Red        | `#EF4444` | Love Meter                |

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Build for production    |
| `npm start`     | Start production server |
| `npm run lint`  | Run ESLint              |
