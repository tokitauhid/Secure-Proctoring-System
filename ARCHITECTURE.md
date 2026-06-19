# 🏗️ Secure Online Examination & Proctoring System — Architecture

> A comprehensive guide for contributors and team members to understand the full system design, technology choices, and module breakdown.

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Database Schema](#database-schema)
5. [Module Breakdown](#module-breakdown)
   - [Student Module](#-student-module)
   - [Admin Module](#-admin-module)
   - [Proctor Module](#-proctor-module)
6. [AI & Computer Vision](#ai--computer-vision)
7. [Real-Time Communication](#real-time-communication)
8. [Directory Structure](#directory-structure)
9. [API Design Guidelines](#api-design-guidelines)
10. [Environment & Configuration](#environment--configuration)
11. [Development Workflow](#development-workflow)

---

## System Overview

The **Secure Online Examination & Proctoring System** is a full-stack web application that enables institutions to conduct tamper-resistant online exams. It combines AI-powered proctoring, face recognition, real-time monitoring, and automated grading into a single cohesive platform.

### Core Features

| Feature | Description |
|---|---|
| 🤖 AI-based Cheating Detection | Flags suspicious behavior using CV and ML models |
| 👤 Face Recognition Login | Identity verification at exam start using facial biometrics |
| 🖥️ Screen Activity Monitoring | Tracks tab switches, copy-paste, and window focus loss |
| 📡 Live Proctor Dashboard | Real-time view of all active candidates via WebSockets |
| 🎲 Randomized Question Engine | Per-student randomized question order and pool sampling |
| ✅ Auto Grading System | Instant scoring for MCQ/true-false; AI assist for short answers |
| 🔒 Browser Lockdown Mode | Restricts browser capabilities during active exam sessions |
| 📊 Exam Analytics | Post-exam reports on performance, violations, and trends |

---

## Technology Stack

### Frontend

| Tool | Version | Purpose |
|---|---|---|
| React | ^18.x | UI component framework |
| Vite | ^5.x | Build tool & dev server |
| TailwindCSS | ^3.x | Utility-first styling |
| Chart.js | ^4.x | Analytics charts & graphs |
| React Router | ^6.x | Client-side routing |
| Axios | ^1.x | HTTP client for API calls |
| Socket.IO Client | ^4.x | WebSocket communication |

**Why React + Vite?**
- Fast HMR (Hot Module Replacement) during development
- Huge ecosystem and community support
- Excellent dashboard library compatibility
- Easy to learn for new contributors

### Backend

| Tool | Version | Purpose |
|---|---|---|
| Python | ^3.11 | Core runtime |
| FastAPI | ^0.110.x | REST API framework |
| Uvicorn | ^0.29.x | ASGI server |
| SQLAlchemy | ^2.x | ORM for database access |
| Alembic | ^1.x | Database migrations |
| Pydantic | ^2.x | Data validation & schemas |
| python-jose | ^3.x | JWT authentication |
| WebSockets | built-in FastAPI | Real-time communication |

**Why FastAPI?**
- Native async support — critical for WebSocket performance
- AI/ML Python libraries integrate directly without bridges
- OpenAPI docs auto-generated from code
- Cleaner than Django for pure API services

### Database

| Tool | Purpose |
|---|---|
| PostgreSQL ^15 | Primary relational database |
| Redis *(optional phase 2)* | Session caching & WebSocket pub/sub |

**Why PostgreSQL?**
- Industry-standard reliability
- Advanced JSON column support for flexible exam configs
- Full-text search for question bank queries
- Battle-tested with SQLAlchemy

---

## System Architecture

```
┌─────────────────────────────────────────────────┐
│                  React Frontend                  │
│  (Student Portal │ Admin Panel │ Proctor Board)  │
└───────────────────────┬─────────────────────────┘
                        │  HTTP / WebSocket
                        ▼
┌─────────────────────────────────────────────────┐
│               FastAPI Backend                    │
│     (REST APIs + WebSocket Server + Auth)        │
└────────────┬──────────────────┬─────────────────┘
             │                  │
     ┌───────┘           ┌──────┘
     ▼                   ▼
┌──────────┐     ┌───────────────┐
│PostgreSQL│     │   AI Module   │
│ Database │     │  (OpenCV +    │
│          │     │ face_recog +  │
└──────────┘     │  mediapipe)   │
                 └───────────────┘
                        │
                 ┌──────┘
                 ▼
        ┌─────────────────┐
        │ WebSocket Server │
        │  (Live Proctor   │
        │   Alerts/Feed)   │
        └─────────────────┘
```

### Data Flow

```
Student Opens Exam
      │
      ▼
Face Verification ──► AI Module (OpenCV)
      │
      ▼
Browser Lockdown Activated
      │
      ▼
Questions Served (Randomized)  ──► PostgreSQL (Question Bank)
      │
      ▼
Exam in Progress
      ├──► Screen Monitor (JS events) ──► Backend API ──► Violations Table
      ├──► Webcam Feed ──► AI Module ──► WebSocket ──► Proctor Dashboard
      └──► Auto-save answers ──► PostgreSQL (Results Table)
      │
      ▼
Submission
      │
      ▼
Auto Grading ──► Results Table
      │
      ▼
Analytics Generated ──► Reports Dashboard
```

---

## Database Schema

### `users`

```sql
id            UUID PRIMARY KEY
full_name     VARCHAR(255)
email         VARCHAR(255) UNIQUE NOT NULL
password_hash VARCHAR(255) NOT NULL
role          ENUM('student', 'admin', 'proctor')
face_data     BYTEA                   -- encoded face embedding
created_at    TIMESTAMP DEFAULT NOW()
is_active     BOOLEAN DEFAULT TRUE
```

### `exams`

```sql
id               UUID PRIMARY KEY
title            VARCHAR(255) NOT NULL
description      TEXT
created_by       UUID REFERENCES users(id)
start_time       TIMESTAMP
end_time         TIMESTAMP
duration_minutes INTEGER
is_randomized    BOOLEAN DEFAULT TRUE
status           ENUM('draft', 'active', 'completed')
created_at       TIMESTAMP DEFAULT NOW()
```

### `questions`

```sql
id            UUID PRIMARY KEY
exam_id       UUID REFERENCES exams(id)
question_text TEXT NOT NULL
type          ENUM('mcq', 'true_false', 'short_answer')
options       JSONB          -- ["Option A", "Option B", ...]
correct_ans   VARCHAR(255)
marks         INTEGER DEFAULT 1
difficulty    ENUM('easy', 'medium', 'hard')
```

### `results`

```sql
id           UUID PRIMARY KEY
exam_id      UUID REFERENCES exams(id)
student_id   UUID REFERENCES users(id)
answers      JSONB          -- {question_id: answer_given}
score        FLOAT
percentage   FLOAT
grade        VARCHAR(5)
started_at   TIMESTAMP
submitted_at TIMESTAMP
status       ENUM('in_progress', 'submitted', 'graded')
```

### `violations`

```sql
id           UUID PRIMARY KEY
exam_id      UUID REFERENCES exams(id)
student_id   UUID REFERENCES users(id)
type         ENUM('tab_switch', 'multiple_faces', 'no_face',
                  'head_movement', 'copy_paste', 'phone_detected')
severity     ENUM('low', 'medium', 'high')
timestamp    TIMESTAMP DEFAULT NOW()
snapshot_url VARCHAR(500)   -- optional stored frame
```

### `monitoring_logs`

```sql
id           UUID PRIMARY KEY
exam_id      UUID REFERENCES exams(id)
student_id   UUID REFERENCES users(id)
event_type   VARCHAR(100)
event_data   JSONB
recorded_at  TIMESTAMP DEFAULT NOW()
```

---

## Module Breakdown

### 👨‍🎓 Student Module

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Email/password + face recognition gate |
| Face Registration | `/register/face` | Capture and store facial embedding |
| Exam List | `/exams` | Available and upcoming exams |
| Exam Window | `/exam/:id` | Locked-down exam interface |
| Result Page | `/results/:id` | Score, grade, and feedback |

**Key behaviors:**
- Browser lockdown activates on exam start (fullscreen lock, key intercepts)
- Webcam stream processed client-side with periodic snapshots to backend
- Tab visibility changes logged as violations automatically
- Questions loaded in randomized order per session token

---

### 🛠️ Admin Module

| Page | Route | Description |
|---|---|---|
| Dashboard | `/admin` | System stats and overview |
| Create Exam | `/admin/exams/new` | Exam setup wizard |
| Question Bank | `/admin/questions` | Manage all questions |
| Student Management | `/admin/students` | User CRUD and enrollment |
| Analytics | `/admin/analytics` | Exam performance reports |

**Key behaviors:**
- Full CRUD for exams and question pools
- Bulk CSV import for student enrollment
- Analytics powered by Chart.js (score distributions, violation heatmaps)
- Role-based access: admin cannot take exams

---

### 🔍 Proctor Module

| Page | Route | Description |
|---|---|---|
| Candidate List | `/proctor` | All active exam sessions |
| Live Monitoring | `/proctor/monitor/:examId` | Grid of live webcam feeds |
| Alerts | `/proctor/alerts` | Real-time violation feed |
| Reports | `/proctor/reports/:examId` | Post-exam violation summary |

**Key behaviors:**
- WebSocket connection maintained for the full exam duration
- Violation alerts pushed server → proctor in real time (< 500ms target)
- Proctor can flag students, add notes, or end sessions manually
- Snapshot gallery for every flagged event

---

## AI & Computer Vision

All AI logic lives in the backend under `backend/ai/`.

### Face Recognition

**Library:** `face-recognition` (dlib-based)

```
Registration Flow:
  Capture 5 frames → Extract 128-d embedding → Store in users.face_data

Login Verification:
  Capture frame → Extract embedding → Compare with stored (threshold: 0.6)
```

### Head Movement Detection

**Library:** `mediapipe` (Face Mesh)

- Tracks nose tip and eye landmarks
- Calculates pitch/yaw angles
- Flags excessive movement (> ±20° from baseline)

### Multiple Face Detection

**Library:** `opencv-python` + `face-recognition`

- Runs every N seconds during active exam
- Detects > 1 face in frame → immediate `high` severity violation
- No face detected → `medium` severity after 10-second grace period

### Phone Detection *(Phase 2)*

**Library:** `mediapipe` Object Detection or custom YOLO model

- Detects handheld devices in webcam frame
- Triggers `phone_detected` violation event

---

## Real-Time Communication

### WebSocket Flow

```
Client                     Server
  |                           |
  |── WS Connect (/ws/exam) ──►|
  |                           |── Authenticate token
  |                           |── Join exam room
  |◄── {type: "session_start"}|
  |                           |
  |── {type: "snapshot", data}►|── AI Processing
  |                           |── Violation detected?
  |◄── {type: "violation"} ───|
  |                           |── Broadcast to Proctor WS room
  |                           |
  |── {type: "answer_save"} ──►|── Save to DB
  |◄── {type: "ack"} ─────────|
```

### WebSocket Namespaces

| Endpoint | Users | Purpose |
|---|---|---|
| `/ws/exam/{exam_id}` | Students | Exam session, snapshot upload |
| `/ws/proctor/{exam_id}` | Proctors | Live monitoring feed |
| `/ws/alerts` | Proctors | Cross-exam violation alerts |

---

## Directory Structure

```
secure-proctoring-system/
├── frontend/                    # React + Vite app
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/          # Shared UI components
│   │   │   ├── common/          # Button, Modal, Input, etc.
│   │   │   ├── exam/            # ExamTimer, QuestionCard, etc.
│   │   │   └── proctor/         # CameraFeed, AlertBadge, etc.
│   │   ├── pages/
│   │   │   ├── student/
│   │   │   ├── admin/
│   │   │   └── proctor/
│   │   ├── hooks/               # Custom React hooks
│   │   ├── store/               # State management (Zustand/Context)
│   │   ├── services/            # Axios API service layer
│   │   ├── utils/               # Helpers and constants
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── api/
│   │   │   ├── routes/          # Endpoint routers
│   │   │   │   ├── auth.py
│   │   │   │   ├── exams.py
│   │   │   │   ├── questions.py
│   │   │   │   ├── results.py
│   │   │   │   ├── monitoring.py
│   │   │   │   └── analytics.py
│   │   │   └── websockets/
│   │   │       ├── exam_ws.py
│   │   │       └── proctor_ws.py
│   │   ├── ai/                  # AI & CV modules
│   │   │   ├── face_recognition.py
│   │   │   ├── head_movement.py
│   │   │   ├── multi_face.py
│   │   │   └── grading.py
│   │   ├── core/
│   │   │   ├── config.py        # Settings (env vars)
│   │   │   ├── security.py      # JWT helpers
│   │   │   └── database.py      # SQLAlchemy session
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic request/response schemas
│   │   ├── crud/                # Database CRUD operations
│   │   └── main.py              # FastAPI app entry point
│   ├── alembic/                 # Database migrations
│   ├── tests/
│   ├── requirements.txt
│   └── .env.example
│
├── docs/                        # Additional documentation
│   ├── api-reference.md
│   └── deployment.md
│
├── ARCHITECTURE.md              # This file
├── README.md
└── LICENSE
```

---

## API Design Guidelines

- All endpoints prefixed with `/api/v1/`
- Authentication via `Bearer` JWT token in `Authorization` header
- Responses follow this envelope:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

- Error responses:

```json
{
  "success": false,
  "error": "EXAM_NOT_FOUND",
  "message": "The requested exam does not exist"
}
```

- Pagination: `?page=1&limit=20` on all list endpoints
- Sorting: `?sort_by=created_at&order=desc`

---

## Environment & Configuration

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_WS_URL=ws://localhost:8000
VITE_APP_NAME="SecureExam"
```

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/secure_exam_db
SECRET_KEY=your-super-secret-jwt-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60

# AI settings
FACE_MATCH_THRESHOLD=0.6
VIOLATION_CHECK_INTERVAL_SECONDS=5
MAX_HEAD_ANGLE_DEGREES=20

# CORS
ALLOWED_ORIGINS=http://localhost:5173
```

---

## Development Workflow

### Branching Strategy (Git Flow)

```
main          ── Production-ready code only
develop       ── Integration branch
feature/*     ── New features (e.g., feature/face-recognition)
fix/*         ── Bug fixes (e.g., fix/login-crash)
hotfix/*      ── Critical production patches
```

### Commit Message Convention

```
feat: add webcam snapshot upload endpoint
fix: resolve JWT expiry not refreshing correctly
docs: update API reference for /exams route
chore: bump face-recognition to 1.3.0
refactor: extract grading logic into service class
```

### PR Requirements

- All PRs target `develop` branch
- At least 1 reviewer approval required
- CI must pass (lint + tests)
- Description must reference linked issue

---

> **Last Updated:** June 2026  
> **Maintained by:** Project Core Team  
> For questions, open an issue or start a discussion on the repository.
