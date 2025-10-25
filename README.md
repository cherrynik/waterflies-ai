# 🦋 Waterflies - Fireflies Clone

> **Engineering Assessment Project** - A simplified replica of the Fireflies product for meeting recording, transcription, and AI-powered summarization.

## 🚀 Live Demo

- **Website**: https://waterflies.cherrynik.com
- **IP**: https://178.62.252.10

## 📋 What This Project Does

This is a **Fireflies clone** built for an engineering assessment. It records meetings in your browser, transcribes them using AI, and creates smart summaries with action items.

## 🎯 How It Works

### 📱 Screen 1: Recording
- **Three people**: You (left), WaterFlies AI (center), and a Participant (right)
- **Auto-start**: Recording begins when you load the page
- **Microphone control**: You can mute/unmute (others are just for show)
- **1-minute limit**: Stops automatically to save on API costs ($5 budget)
- **No video**: Audio only to keep it simple

<img width="640" height="480" alt="image" src="https://github.com/user-attachments/assets/56c91014-d875-4df8-abd3-ac47a941cc00" />

### 📊 Screen 2: Results
- **Loading**: Shows skeleton while processing your audio
- **Transcription**: Full text of what was said (left side)
- **Summary**: AI-generated meeting summary (right side)
- **Action items**: Tasks and next steps extracted automatically
- **New call**: Button to start over

<img width="640" height="480" alt="image" src="https://github.com/user-attachments/assets/23ae186e-cc59-4747-83c9-59b10535883b" />


## ✨ Key Features

- 🎙️ **Browser recording**: Records audio directly in your browser (WebM format)
- 📝 **AI transcription**: Converts speech to text using OpenAI Whisper
- 📊 **Smart summaries**: Creates meeting summaries using GPT-4o Mini
- ✅ **Action items**: Automatically finds tasks and next steps
- 📱 **Mobile-friendly**: Works on phones and tablets
- ⏱️ **1-minute limit**: Stops automatically to save money on API calls

## 📚 Table of Contents

- [What This Project Does](#-what-this-project-does)
- [How It Works](#-how-it-works)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Setup](#-setup)
- [Development](#-development)
- [OpenAI Setup](#-openai-setup)
- [Project Structure](#-project-structure)
- [Time Spent](#-time-spent)
- [Future Improvements](#-future-improvements)

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: NestJS, Express
- **Runtime**: Node.js 22
- **Monorepo**: Nx
- **Package Manager**: Yarn 4

## ⚙️ Setup

```bash
# Use Node.js 22
nvm use

# Enable corepack for Yarn
corepack enable
corepack up

# Install all dependencies
yarn
```

## 🚀 Development

```bash
# Start the frontend (React app)
yarn client

# Start the backend (NestJS API)
yarn server
```

### 🔧 Nx Commands

```bash
# See project structure
nx graph

# Run specific projects
nx serve client
nx serve server

# Build projects
nx build client
nx build server

# Run tests
nx test client
nx test server

# Check code quality
nx lint client
nx lint server
```

> **Note**: If you get `nx: command not found`, use `npx nx` or `yarn nx` instead

## 🔑 OpenAI Setup

To make transcription work, you need an OpenAI API key:

1. **Add money**: Put at least $5 in your OpenAI account
2. **Get API key**: Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. **Add to your `.env` file**:

```bash
OPENAI_API_KEY=your_api_key_here
```

### 🌐 URLs

- **Frontend**: http://localhost:4200
- **Backend**: http://localhost:3000/api

### ⚠️ Important: Microphone Access

**In production, microphone access only works over HTTPS!** 

- ✅ **Works**: https://yourdomain.com
- ❌ **Doesn't work**: http://yourdomain.com

This is a browser security requirement. For local development, HTTP works fine, but for production deployment, you need SSL certificates.

## 📁 Project Structure

This is an Nx monorepo that keeps frontend, backend, and shared code organized:

```
waterflies/
├── 📱 apps/                          # Applications (entry points)
│   ├── client/                       # 🌐 React 19 Frontend (Vite + Tailwind)
│   ├── server/                       # 🚀 NestJS Backend (Express + Webpack)
│   └── server-e2e/                   # 🧪 E2E Tests for Server
│
├── 📦 packages/                      # Shared Libraries
│   ├── client/                       # 🎨 Frontend Libraries
│   │   ├── components/               # 🧩 Reusable UI Components
│   │   ├── hooks/                    # 🪝 Custom React Hooks
│   │   ├── screens/                  # 📄 Page-level Components
│   │   └── services/                 # 🔌 API Services & Client Logic
│   │
│   ├── server/                       # ⚙️ Backend Libraries
│   │   ├── controllers/              # 🎮 HTTP Request Handlers
│   │   ├── services/                 # 🔧 Business Logic & Data Processing
│   │   └── modules/                  # 📦 Feature Modules & DI
│   │
│   └── shared/                       # 🤝 Cross-platform Libraries
│       ├── utils/                    # 🛠️ Common Utility Functions
│       └── constants/                # 📋 App Constants & Configuration
│
└── 📁 dist/                          # 🏗️ Build Output
```

### 🏗️ How It's Organized

**Applications** (`apps/`)
- **Client**: The React app users see
- **Server**: The NestJS API that handles requests
- **E2E**: Tests for the whole app

**Libraries** (`packages/`)
- **Client libraries**: Reusable React components and hooks
- **Server libraries**: API controllers and business logic
- **Shared libraries**: Common utilities and constants

**Why this structure?**
- ✅ **Clean separation**: Frontend and backend code stay separate
- ✅ **Code reuse**: Share utilities between projects
- ✅ **Easy to scale**: Add mobile app or admin panel later
- ✅ **Type safety**: Shared types keep everything consistent
- ✅ **Fast builds**: Only rebuild what changed

## ⏱️ Time Spent

**Total time**: ~20 hours _(approximate, based on overall estimation)_

- **Setup & Architecture**: ~6 hours (Getting Nx monorepo working)
- **Frontend**: ~5 hours (UI with three user tiles, recording controls)
- **Backend**: ~5 hours (WebM file handling, OpenAI integration)
- **Documentation & Deployment**: ~4 hours (Deploying to test on different devices)

## 🚀 Future Improvements

### ✨ Product Features
- Add real-time WebRTC communication
- Add WebSocket signaling

### 🏗️ Infrastructure
- Add user authentication (JWT + sessions)
- Add database (PostgreSQL + Prisma)
- Add monitoring and logging
- Set up automated testing
- Add Docker containers
- Add load balancing
- Add Swagger/OpenAPI documentation for API integration
- Add API versioning and rate limiting
- Add webhook support for third-party integrations

### 🧪 Code Quality
- Add E2E tests with Playwright
- Add unit tests for all libraries
- Add API integration tests
- Add code coverage reports
- Add input validation with Zod
- Add rate limiting with Redis
- Add async transcription processing

