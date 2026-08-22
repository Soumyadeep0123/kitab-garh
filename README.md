# 📚 KitabGhar - 3-Tier eBook Management System

> **A production-ready 3-Tier MERN stack eBook management and digital reading platform built for Software Tools & Techniques Lab Practical Submission.**

---

## 🌟 Architecture Overview

```text
┌────────────────────────────────────────────────────────┐
│               TIER 1: PRESENTATION TIER                │
│             React 18 + Vite + Tailwind CSS             │
│  - Catalog, Search, eBook Reader, Library, Admin       │
└───────────────────────────┬────────────────────────────┘
                            │ REST API (JSON / HTTP)
┌───────────────────────────▼────────────────────────────┐
│              TIER 2: APPLICATION LOGIC TIER            │
│                 Node.js + Express.js                   │
│  - JWT Auth, Book Service, Progress Sync, Reviews      │
└───────────────────────────┬────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼────────────────────────────┐
│                  TIER 3: DATA STORAGE TIER             │
│                 MongoDB / MySQL Export                 │
│  - Users, Books, Categories, Purchases, Progress       │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies
Open a terminal in the project root:
```bash
# Install root, backend, and frontend dependencies
npm run install:all
```

### Step 2: Run Application
Start both the Backend API (Port 5000) and Frontend App (Port 3000) concurrently:
```bash
npm run dev
```

Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Demo Login Credentials

| Role | Email | Password | Features Accessible |
|---|---|---|---|
| **Student / Customer** | `student@kitabghar.com` | `student123` | Browse, eBook Reader, Bookmarks, My Library, Reviews |
| **System Admin** | `admin@kitabghar.com` | `admin123` | Admin Analytics, Catalog CRUD, User Directory |

*(Quick-fill buttons are provided on the Login page for one-click demo during viva!)*

---

## 📁 Project Folder Structure

```text
KitabGhar/
├── backend/
│   ├── src/
│   │   ├── config/db.js          # DB Connection + Embedded In-Memory fallback
│   │   ├── controllers/          # Business logic handlers
│   │   ├── models/               # Mongoose Schemas (User, Book, Review, etc.)
│   │   ├── routes/               # Express API routes
│   │   ├── middleware/           # JWT Auth & Role check
│   │   ├── data/seedData.js      # Rich sample books with readable chapters
│   │   └── server.js             # Express app entrypoint
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Navbar, Footer, BookCard, StarRating, ProtectedRoute
│   │   ├── pages/                # Home, Browse, BookDetails, Reader, Library, Admin, Login, Register
│   │   ├── context/AuthContext   # Global JWT Auth State
│   │   ├── services/api.js       # Axios client with interceptor
│   │   └── main.jsx
│   └── package.json
│
├── database/
│   ├── schema.sql                # Relational MySQL Schema (Lab Day 3)
│   └── seed.sql                  # Sample SQL seed data
│
├── docs/
│   ├── 3_TIER_ARCHITECTURE.md    # 3-Tier Architecture Technical Specification
│   ├── LAB_EXPERIMENTS_COVERAGE.md# Mapping of Days 1–4 to codebase
│   └── VIVA_QUESTIONS_GUIDE.md   # Viva Q&A with answers
│
├── package.json                  # Root runner script
└── README.md                     # Project overview
```

---

## 📖 Lab Experiments Coverage

- **Experiment 1**: Problem Analysis, Scope & Infrastructure Requirements.
- **Experiment 2**: Software Requirement Specification (SRS) & 6 Core Modules.
- **Experiment 3**: Data Modeling, Data Dictionary & Schema (`database/schema.sql`).
- **Experiment 4**: Software Designing, UML Use Case, Class & Activity Architecture.
# kitab-garh
