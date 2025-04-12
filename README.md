# TalentArc

TalentArc is a modern platform that bridges the gap between tech companies and talent through skill-based challenges rather than traditional resumes. By evaluating candidates based on demonstrated abilities, TalentArc creates more meaningful connections in the hiring process.

## Core Features

- **Skill-Based Matching** - Connect with talent based on verified technical abilities
- **AI-Powered Insights** - Get intelligent candidate analysis through Google's Gemini AI
- **Challenge System** - Track performance across standardized technical challenges
- **Talent Browser** - Filter candidates by skills, experience, and challenge results

## Quick Setup

```bash
# Clone and install
git clone https://github.com/yourusername/talent-arc.git
cd talent-arc
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Firebase and Gemini API keys

# Launch
npm run dev
```

## Authentication

TalentArc requires Firebase authentication. You'll need to:
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com/)
2. Enable Email/Password authentication
3. Add Firebase config values to your `.env` file

> Authentication will not function without proper Firebase configuration.

## AI Integration

The candidate analysis is powered by Google's Gemini AI:
1. Create a Google Cloud project and enable the Gemini API
2. Generate an API key and add it to `.env` as `VITE_GEMINI_API_KEY`

> If Gemini is not configured, the app will fall back to statistical analysis.

## Tech Stack

React 19 | Vite | Tailwind CSS | Firebase | Google Gemini AI

## Development Commands

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code linting

## License

MIT License
