# 🦋 Waterflies - Nx Monorepo

Live Demo:

- IP: https://178.62.252.10
- Domain: https://waterflies.cherrynik.com

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Development](#development)
  - [Nx Commands](#nx-commands)
- [Environment Configuration](#environment-configuration)
  - [OpenAI API Key](#openai-api-key-required-for-transcription)
- [Project Structure](#project-structure)
  - [Architecture Layers](#architecture-layers)
  - [Architecture Rationale](#architecture-rationale)
- [Future Improvements](#future-improvements)
  - [Infrastructure](#infrastructure)
  - [Code Quality](#code-quality)
  - [Product Features](#product-features)

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: NestJS, Express
- **Monorepo**: Nx
- **Package Manager**: Yarn 4

## Setup

```bash
# If using nvm
nvm use # Use node.js 22 from .nvmrc

# Enable corepack
corepack enable
corepack up

# Install dependencies
yarn
```

## Development

```bash
# Start client (React + Vite)
yarn client

# Start server (NestJS)
yarn server
```

### Nx Commands

```bash
# Visualize project dependencies
nx graph

# Run specific project
nx serve client
nx serve server

# Build specific project
nx build client
nx build server

# Run tests
nx test client
nx test server

# Lint specific project
nx lint client
nx lint server

# Show affected projects
nx affected:graph
```

> **Note**: If you get `nx: command not found`, use `npx nx` or `yarn nx` instead of just `nx`

## Environment Configuration

### Development

- Client: `http://localhost:4200`
- Server: `http://localhost:3000`

### Production

Set in `.env`:

```bash
SERVER_BASE_URL=https://yourdomain.com
```

### OpenAI API Key (Required for Transcription)

To enable transcription features, you need to:

1. **Add funds**: Deposit minimum $5 to your OpenAI account
2. **Get API key**: Visit [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
3. **Set environment variable**:

```bash
OPENAI_API_KEY=your_api_key_here
```

## Project Structure

This is an Nx monorepo with a well-organized architecture that separates concerns and enables code sharing:

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

### Architecture Layers

**🎯 Applications Layer** (`apps/`)
- **Client**: User-facing React application with modern tooling
- **Server**: API backend with NestJS framework
- **E2E**: Automated testing for complete user flows

**🔧 Libraries Layer** (`packages/`)
- **Client Libraries**: Frontend-specific reusable code
- **Server Libraries**: Backend-specific business logic
- **Shared Libraries**: Cross-platform utilities and constants

**📊 Dependencies Flow**
```
client → client/* → shared/*
server → server/* → shared/*
```

### Architecture Rationale

**Why this structure?**

1. **Separation of Concerns**: Clear boundaries between frontend, backend, and shared code
2. **Code Reusability**: Shared utilities and constants prevent duplication
3. **Scalability**: Easy to add new applications (mobile, admin panel) or libraries
4. **Type Safety**: Shared types ensure consistency between client and server
5. **Independent Development**: Teams can work on different parts without conflicts
6. **Optimized Builds**: Nx's dependency graph ensures only affected code is rebuilt

**Development Experience Benefits:**

- `yarn client` and `yarn server` run both environments seamlessly
- Hot reloading and fast builds through Nx's caching
- Shared code changes automatically update dependent projects
- Consistent tooling (ESLint, TypeScript) across all packages

## Future Improvements

### Infrastructure

- Add authentication (JWT + session persistence)
- Implement a database layer (PostgreSQL + Prisma)
- Add comprehensive monitoring and logging
- Set up CI/CD pipelines with automated testing
- Implement containerization with Docker
- Add load balancing and horizontal scaling

### Code Quality

- Add E2E tests using Playwright
- Implement unit tests for all libraries
- Add integration tests for API endpoints
- Set up code coverage reporting
- Implement automated code quality gates
- Add performance testing and optimization
- Add Zod for input validation and type safety
- Implement rate limiting with Redis
- Add async transcription processing

### Product Features

- Implement real-time communication with WebRTC + WebSocket signaling
- Improve SEO and metadata for production deployment
