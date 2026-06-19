# 🔐 Secure Online Examination & Proctoring System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5+-646CFF.svg)](https://vitejs.dev)

A full-stack, AI-powered online examination platform with real-time proctoring, face recognition login, browser lockdown, and automated grading.

---

## ✨ Features

- 🤖 **AI Cheating Detection** — OpenCV & MediaPipe flag suspicious behavior in real time
- 👤 **Face Recognition Login** — Biometric identity verification before every exam
- 🖥️ **Screen Activity Monitoring** — Tracks tab switches, copy-paste, focus loss
- 📡 **Live Proctor Dashboard** — Monitor all candidates simultaneously via WebSocket feeds
- 🎲 **Randomized Question Engine** — Unique question order per student session
- ✅ **Auto Grading** — Instant scoring for objective questions; AI-assisted for short answers
- 🔒 **Browser Lockdown Mode** — Fullscreen enforcement with restricted keyboard shortcuts
- 📊 **Exam Analytics** — Score distributions, violation heatmaps, and performance reports

---

## 🏗️ Architecture Overview

```
React Frontend  ──►  FastAPI Backend  ──►  PostgreSQL
                           │
                     ┌─────┴──────┐
                     AI Module  WebSocket
                    (OpenCV)    Server
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full system design, database schema, module breakdown, and API guidelines.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, TailwindCSS 3, Chart.js |
| Backend | Python 3.11, FastAPI, Uvicorn, SQLAlchemy |
| Database | PostgreSQL 15 |
| AI / CV | OpenCV, face-recognition, MediaPipe, NumPy |
| Real-time | WebSockets (FastAPI built-in) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- Python >= 3.11
- PostgreSQL >= 15
- `git`

### 1. Clone the repository

```bash
git clone https://github.com/your-org/secure-proctoring-system.git
cd secure-proctoring-system
```

### 2. Backend setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your database URL and secret key

# Run database migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --port 8000
```

Backend will be available at `http://localhost:8000`  
API docs at `http://localhost:8000/docs`

### 3. Frontend setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit VITE_API_BASE_URL if needed

# Start dev server
npm run dev
```

Frontend will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
secure-proctoring-system/
├── frontend/        # React + Vite application
├── backend/         # FastAPI application
├── docs/            # Additional documentation
├── ARCHITECTURE.md  # Full system design guide
├── README.md        # This file
└── LICENSE
```

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Student** | Login, face verification, take exams, view results |
| **Admin** | Create exams, manage questions, view analytics |
| **Proctor** | Live monitoring, alerts, violation reports |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'feat: add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request targeting `develop`

Please read [ARCHITECTURE.md](./ARCHITECTURE.md) before contributing to understand the project structure and conventions.

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

---

> Built with ❤️ for secure, fair, and accessible online education.
