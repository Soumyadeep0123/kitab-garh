# 📚 KitabGhar - 3-Tier eBook Management System

> **A production-ready, full-featured 3-Tier MERN stack eBook management and digital reading platform with embedded In-Memory MongoDB fallback, relational MySQL schema mapping, interactive reader engine, DRM protection, and admin analytics.**
> 
> *Developed for Software Tools & Techniques Lab Practical Examination & Academic Submission.*

---

## 📑 Table of Contents

1. [🌟 Architecture Overview (3-Tier Model)](#-architecture-overview-3-tier-model)
2. [🚀 Quick Start & Installation Guide](#-quick-start--installation-guide)
3. [🔑 Demo Login Credentials](#-demo-login-credentials)
4. [🧪 Complete Lab Experiments Solutions](#-complete-lab-experiments-solutions)
   - [Experiment 1: Problem Analysis, Scope & Feasibility Study](#experiment-1-problem-analysis-scope--feasibility-study)
   - [Experiment 2: Software Requirement Specification (SRS)](#experiment-2-software-requirement-specification-srs)
   - [Experiment 3: Data Modeling, Relational Schema & Data Dictionary](#experiment-3-data-modeling-relational-schema--data-dictionary)
   - [Experiment 4: Software Designing & UML Modeling](#experiment-4-software-designing--uml-modeling)
5. [🔌 REST API Specification (Tier 2 Gateway)](#-rest-api-specification-tier-2-gateway)
6. [📁 Project Folder & File Structure](#-project-folder--file-structure)
7. [🎓 Lab Viva Voce Questions & Answers](#-lab-viva-voce-questions--answers)
8. [🛠️ Tech Stack & Dependencies](#️-tech-stack--dependencies)

---

## 🌟 Architecture Overview (3-Tier Model)

KitabGhar is engineered strictly adhering to the **3-Tier (3-Level) Client-Server-Database Architecture**. This guarantees strict separation of concerns, enterprise-grade security, horizontal scalability, and independent maintainability.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        TIER 1: PRESENTATION TIER                       │
│                         (Client Application)                           │
│                                                                        │
│  - React 18 Single Page Application (SPA) + Vite Bundler               │
│  - Tailwind CSS + Lucide React Iconography                             │
│  - Responsive Views: Catalog, Reader Engine, Bookshelf, Admin Suite    │
│  - State Management: React Context API (AuthContext)                   │
│  - Networking: Axios HTTP Client with Automatic JWT Interceptors       │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / RESTful API (JSON Payload)
                                    │ Port: 5000 (Backend API Gateway)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    TIER 2: APPLICATION / BUSINESS TIER                 │
│                          (Middleware & API Server)                     │
│                                                                        │
│  - Node.js & Express.js REST Framework                                 │
│  - Authentication: JSON Web Tokens (JWT) & bcrypt Password Hashing     │
│  - Controllers: Auth, Book, Library, Review, Admin Analytics           │
│  - Business Rules: DRM Protection, Progress Calculation, Rating Avg    │
│  - Security: Role-Based Access Control (RBAC), CORS, Input Validation  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Database Queries & Schema Validation
                                    │ Mongoose ODM / SQL Driver
┌───────────────────────────────────▼────────────────────────────────────┐
│                          TIER 3: DATA STORAGE TIER                     │
│                         (Persistent Storage)                           │
│                                                                        │
│  - Primary Engine: MongoDB (Mongoose ODM)                              │
│  - Automatic Embedded Fallback: mongodb-memory-server (Zero-Config)    │
│  - Collections: Users, Books, Categories, Reviews, Purchases, Progress │
│  - Indexing: Compound unique index on (user, book) for purchases       │
└────────────────────────────────────────────────────────────────────────┘
```

### 3-Tier Layer Responsibilities

| Tier | Technology | Key Responsibilities |
|---|---|---|
| **Tier 1: Presentation** | React 18, Vite, Tailwind CSS, Lucide Icons | Renders modern UI/UX, captures user input, communicates asynchronously via Axios REST calls, manages client-side routing and session state. |
| **Tier 2: Application Logic** | Node.js, Express.js, JWT, bcryptjs | Executes business logic, enforces authentication/RBAC, validates payloads, coordinates DRM book access, computes reading completion metrics, and insulates the database. |
| **Tier 3: Data Storage** | MongoDB / In-Memory Server / MySQL | Ensures ACID/BASE data integrity, persists user profiles, handles indexing, relational constraints, query execution, and catalog data storage. |

### Why 3-Tier Architecture is Superior to 2-Tier Architecture

```text
2-Tier (Client-DB):   [Client UI + Business Logic] ────────► [Database Server] (Vulnerable, tightly coupled)
3-Tier (KitabGhar):   [Client UI] ──► [Express API Server] ──► [Database Server] (Secure, decoupled, scalable)
```

1. **Security Isolation**: In a 2-tier system, database credentials and direct query ports must be exposed to the client. In 3-tier KitabGhar, the database is completely inaccessible from the outside world; clients only communicate with Tier 2 using cryptographically signed JWT bearer tokens.
2. **Horizontal Scalability**: Tier 2 application servers can be load-balanced across multiple instances independently of the database tier.
3. **Independent Technology Evolution**: The presentation layer can be completely rewritten (e.g., React to React Native or Flutter) without touching the backend or database schemas.
4. **Data Integrity & Business Rule Enforcement**: Business validations (e.g., DRM access checks, password hashing, moving average rating updates) are centralized on the server and cannot be bypassed by malicious clients.

---

## 🚀 Quick Start & Installation Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- *(Optional)* Local MongoDB instance. **If MongoDB is not installed, KitabGhar automatically spins up an in-memory database (`mongodb-memory-server`) with seeded books and users!**

### Step 1: Install Dependencies
Open your terminal in the root directory (`kitab garh/`):
```bash
# Installs root, backend, and frontend dependencies concurrently
npm run install:all
```

### Step 2: Launch the Full Application
Start both the Backend API Server (Port `5000`) and the Frontend Client (Port `3000`) concurrently:
```bash
npm run dev
```

### Step 3: Access Application
- **Frontend Web UI**: [http://localhost:3000](http://localhost:3000)
- **Backend API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🔑 Demo Login Credentials

Pre-seeded accounts are provided for instant evaluation during viva demonstrations:

| Role | Email / Username | Password | Features & Privileges Accessible |
|---|---|---|---|
| **Student / Customer** | `student@kitabghar.com` *(or `student`)* | `student123` | Browse catalog, filter by category, full in-browser eBook reader, bookmarking, reading progress sync, personal library, post 5-star ratings & reviews. |
| **System Admin** | `admin@kitabghar.com` *(or `admin`)* | `admin123` | Real-time analytics dashboard, add/edit/delete books with multi-chapter content, manage categories, inspect registered user directory. |

*(Note: One-click "Quick Login" demo buttons are present on the login screen for seamless demonstration.)*

---

## 🧪 Complete Lab Experiments Solutions

---

### Experiment 1: Problem Analysis, Scope & Feasibility Study

#### 1.1 Problem Statement
Traditional physical library systems and conventional digital PDF distributions suffer from significant real-world limitations:
1. **Geographical & Temporal Barriers**: Readers must be physically present or manually transfer large files.
2. **Lack of Reading Synchronization**: Readers lose their reading spot and bookmarks when switching between devices.
3. **Absence of Digital Rights Management (DRM)**: Uncontrolled PDF distribution leads to copyright infringement and unauthorized distribution.
4. **Poor Reading Experience**: Static document viewers lack adjustable typography, dark/sepia reading modes, and dynamic table of contents navigation.
5. **No Centralized Administrative Intelligence**: Traditional systems lack real-time visibility into reading trends, catalog growth, and user engagement metrics.

#### 1.2 Objective & Solution
To design, implement, and validate a secure, responsive, 3-tier web-based eBook Management and Digital Reading System (**KitabGhar**) that provides:
- Seamless cloud-synchronized digital reading with customizable display parameters.
- Token-based access control with DRM protection ensuring only authorized users access complete book chapters.
- Robust catalog exploration with multi-attribute filtering and dynamic search.
- An administrative business intelligence console for content lifecycle management.

#### 1.3 System Scope
- **In Scope**:
  - Customer registration, login, profile management, and role-based access control.
  - Multi-category book catalog with instant keyword search, price filters, and ratings.
  - Interactive Web Reader with Light/Dark/Sepia themes, font size scaling, chapter navigation, and automatic progress saving.
  - User Bookshelf ("My Library") displaying completion percentages and quick-resume shortcuts.
  - Social book reviews and dynamic rating aggregation.
  - Admin CRUD suite for books, chapters, categories, and analytical statistics.
- **Out of Scope (Future Enhancements)**:
  - Real payment gateway integration (Stripe/Razorpay simulated via one-click secure checkout).
  - Native mobile application builds (supported via responsive web interface).

#### 1.4 Feasibility Study
```text
┌────────────────────────────────────────────────────────────────────────┐
│                        FEASIBILITY STUDY MATRIX                        │
├───────────────────┬────────────────────────────────────────────────────┤
│ Feasibility Type  │ Analysis & Findings                                │
├───────────────────┼────────────────────────────────────────────────────┤
│ 1. Technical      │ Developed on MERN Stack (Node.js, Express, React,   │
│                   │ MongoDB). Uses industry-standard JWT and REST API. │
│                   │ Embedded In-Memory DB provides 100% zero-config    │
│                   │ execution without external dependencies.           │
├───────────────────┼────────────────────────────────────────────────────┤
│ 2. Operational    │ Intuitive UI built with Tailwind CSS. High user     │
│                   │ adoption rate expected due to responsive reader,   │
│                   │ clear typography, and one-click quick demo logins. │
├───────────────────┼────────────────────────────────────────────────────┤
│ 3. Economic       │ Built entirely using open-source technologies with │
│                   │ zero licensing costs. Horizontally scalable cloud  │
│                   │ architecture minimizes long-term hosting expenses. │
└───────────────────┴────────────────────────────────────────────────────┘
```

#### 1.5 Infrastructure & Environment Requirements
- **Hardware Requirements**:
  - Processor: 2.0 GHz Dual-Core Intel/AMD or Apple Silicon
  - Memory: 4 GB RAM minimum (8 GB recommended)
  - Storage: 500 MB free hard disk space
- **Software Requirements**:
  - Operating System: Windows 10/11, macOS, or Ubuntu/Linux
  - Runtime Environment: Node.js (v18.0.0+)
  - Package Manager: npm (v9.0.0+)
  - Web Browser: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari
  - Database: MongoDB Server or Embedded In-Memory MongoDB (`mongodb-memory-server`)

---

### Experiment 2: Software Requirement Specification (SRS)

#### 2.1 System Purpose & User Personas
The system serves two primary stakeholder roles:
1. **Customer / Reader**: Discovers books, adds free/paid books to their personal library, reads eBooks with customizable themes, tracks reading percentage, and writes book reviews.
2. **System Administrator**: Manages the catalog (adds books with full chapters, edits metadata, deletes titles), creates categories, reviews platform metrics, and manages user accounts.

#### 2.2 Functional Requirements (The 6 Core Modules)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                       6 CORE FUNCTIONAL MODULES                        │
├────────────────────────────────────────────────────────────────────────┤
│ 1. User Management & Auth    │ 2. Upload & Catalog Organization        │
│ 3. Admin & Analytics Suite   │ 4. Collaboration & Reviews              │
│ 5. Reading & Accessibility   │ 6. Security & DRM Content Protection    │
└────────────────────────────────────────────────────────────────────────┘
```

##### Module 1: User Management & Authentication
- **Registration**: Allows new customers to register with `firstName`, `lastName`, `username`, `email`, `password`, `dob`, `gender`, `city`, `state`, `zip`, and `phone`.
- **Authentication**: Validates credentials via `bcrypt.compare()`. Upon verification, issues a signed JSON Web Token (JWT) valid for 7 days.
- **Session Management**: Client-side `AuthContext` preserves user session across browser refreshes using `localStorage`.
- **Profile Management**: Users can update demographic details, contact numbers, and avatars.
- *Source Code Mapping*: `backend/src/controllers/authController.js`, `backend/src/models/User.js`, `frontend/src/pages/Login.jsx`, `frontend/src/pages/Register.jsx`, `frontend/src/pages/Profile.jsx`.

##### Module 2: Upload & Catalog Organization
- **Categorization**: Books are organized under distinct categories (*Computer Science, AI & ML, Database Systems, Web & Cloud, Literature, Science & Math*).
- **Search & Filtering**: Real-time keyword search across book titles, authors, and descriptions combined with multi-category and price filtering.
- **Book Details**: Displays cover image, synopsis, author bio, page count, published year, ISBN, average rating, and table of contents.
- *Source Code Mapping*: `backend/src/controllers/bookController.js`, `backend/src/models/Book.js`, `backend/src/models/Category.js`, `frontend/src/pages/Browse.jsx`, `frontend/src/pages/BookDetails.jsx`.

##### Module 3: Admin & Analytics Suite
- **Platform Analytics**: Real-time KPI cards displaying Total Platform Users, Total Catalog Books, Total Revenue Generated ($), and Platform Average Rating.
- **Catalog CRUD**: Full administrative interface to create new books with multi-chapter text, modify book details, and delete obsolete entries.
- **Category Creator**: Allows administrators to add new genres and slugs.
- **User Directory**: View registered customer profiles, customer IDs, and assigned roles.
- *Source Code Mapping*: `backend/src/controllers/adminController.js`, `backend/src/routes/adminRoutes.js`, `frontend/src/pages/AdminDashboard.jsx`.

##### Module 4: Collaboration, Reviews & Social Ratings
- **Customer Reviews**: Authenticated readers can submit 1-to-5 star ratings accompanied by detailed textual feedback.
- **Dynamic Rating Calculation**: Backend automatically updates the book's `averageRating` and `ratingsCount` upon review submission.
- **Community Interaction**: Displays reader reviews with timestamps, star ratings, and user badges.
- *Source Code Mapping*: `backend/src/controllers/reviewController.js`, `backend/src/models/Review.js`, `frontend/src/components/StarRating.jsx`, `frontend/src/pages/BookDetails.jsx`.

##### Module 5: Reading Engine & Accessibility Customization
- **In-Browser eBook Reader**: Dedicated reading workspace rendering rich chapter content with smooth transitions.
- **Accessibility Customization**:
  - 3 Reading Color Themes: **Light Mode** (default), **Sepia Mode** (warm paper tone), and **Night/Dark Mode** (OLED-friendly dark gray).
  - Responsive Typography Scaling: Dynamic font adjustment slider (12px to 24px).
  - Interactive Table of Contents (TOC): Instant sidebar jumping between chapters.
- **Reading Progress Synchronization**: Automatically calculates and saves reading percentage and current chapter/page to the database.
- **My Library**: Personal bookshelf displaying currently reading books, completion progress bars, and "Resume Reading" buttons.
- *Source Code Mapping*: `backend/src/controllers/libraryController.js`, `backend/src/models/ReadingProgress.js`, `frontend/src/pages/Reader.jsx`, `frontend/src/pages/MyLibrary.jsx`.

##### Module 6: Security & Digital Rights Management (DRM)
- **Token Verification**: Protected API routes require a valid `Bearer <token>` HTTP header verified by `protect` middleware.
- **Role-Based Access Control (RBAC)**: Restricted administrative routes verified via `authorize('admin')` middleware.
- **DRM Content Protection**:
  - Full chapter content is stripped from public catalog API endpoints (`GET /api/books/:id`).
  - Only authenticated users with confirmed ownership in `Purchase` or free books can access full chapter text via `GET /api/library/progress/:bookId`.
- **Credential Protection**: Passwords are one-way hashed with bcrypt using 10 salt rounds before storage; passwords are never returned in queries (`select: false`).
- *Source Code Mapping*: `backend/src/middleware/auth.js`, `backend/src/models/User.js`, `backend/src/models/Book.js`.

#### 2.3 Non-Functional Requirements (NFR)

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      NON-FUNCTIONAL REQUIREMENTS                       │
├─────────────────────┬──────────────────────────────────────────────────┤
│ Attribute           │ Specification & Implementation Guarantee         │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 1. Performance      │ REST API responses returned in < 150ms. Client   │
│                     │ UI re-renders instantly via Vite and React DOM.  │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 2. Security         │ bcrypt hashing (10 rounds), signed JWT tokens,   │
│                     │ CORS whitelist, and DRM book access protection.  │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 3. Reliability      │ Automatic embedded in-memory database fallback   │
│                     │ ensures 99.99% local execution uptime.           │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 4. Usability        │ Clean responsive design (mobile, tablet, desktop)│
│                     │ with Sepia/Dark modes and accessible contrast.   │
├─────────────────────┼──────────────────────────────────────────────────┤
│ 5. Maintainability  │ Clean modular separation across 3 architectural  │
│                     │ tiers, clear routing, and comprehensive docs.    │
└─────────────────────┴──────────────────────────────────────────────────┘
```

---

### Experiment 3: Data Modeling, Relational Schema & Data Dictionary

#### 3.1 Relational Data Model (MySQL DDL conforming to Day 3 Lab Manual)

The relational schema specification maps directly to the entities required by the lab syllabus:

```sql
CREATE DATABASE IF NOT EXISTS kitabghar_db;
USE kitabghar_db;

-- 1. Customer Table (Lab Day 3 Entity)
CREATE TABLE IF NOT EXISTS Customer (
    Customer_id VARCHAR(50) PRIMARY KEY,
    First_name VARCHAR(100) NOT NULL,
    Last_name VARCHAR(100) NOT NULL,
    DOB DATE,
    Gender VARCHAR(20) DEFAULT 'Prefer not to say',
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Login Table (Lab Day 3 Entity)
CREATE TABLE IF NOT EXISTS Login (
    Login_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id VARCHAR(50) NOT NULL,
    Username VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Role VARCHAR(20) DEFAULT 'customer',
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE
);

-- 3. Customer Detail Table (Lab Day 3 Entity)
CREATE TABLE IF NOT EXISTS Customer_Detail (
    Detail_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id VARCHAR(50) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Phone VARCHAR(25),
    City VARCHAR(100),
    State VARCHAR(100),
    Zip VARCHAR(20),
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE
);

-- 4. Categories Table (Lab Day 3 Entity)
CREATE TABLE IF NOT EXISTS Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 5. Authors Table
CREATE TABLE IF NOT EXISTS Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    biography TEXT
);

-- 6. eBooks Table (Lab Day 3 Entity)
CREATE TABLE IF NOT EXISTS eBooks (
    ebook_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT,
    category_id INT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) DEFAULT 0.00,
    cover_image VARCHAR(500),
    pages_count INT DEFAULT 100,
    published_year INT DEFAULT 2024,
    isbn VARCHAR(50),
    file_url VARCHAR(500),
    drm_protected BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES Categories(category_id) ON DELETE CASCADE
);

-- 7. Reviews Table
CREATE TABLE IF NOT EXISTS Reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id VARCHAR(50) NOT NULL,
    ebook_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE,
    FOREIGN KEY (ebook_id) REFERENCES eBooks(ebook_id) ON DELETE CASCADE
);

-- 8. Purchases & User Library Table
CREATE TABLE IF NOT EXISTS Purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id VARCHAR(50) NOT NULL,
    ebook_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    payment_status VARCHAR(20) DEFAULT 'completed',
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE,
    FOREIGN KEY (ebook_id) REFERENCES eBooks(ebook_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_book (Customer_id, ebook_id)
);

-- 9. Reading Progress Table
CREATE TABLE IF NOT EXISTS Reading_Progress (
    progress_id INT AUTO_INCREMENT PRIMARY KEY,
    Customer_id VARCHAR(50) NOT NULL,
    ebook_id INT NOT NULL,
    current_chapter INT DEFAULT 1,
    current_page INT DEFAULT 1,
    total_pages INT DEFAULT 10,
    percentage INT DEFAULT 0,
    last_read_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (Customer_id) REFERENCES Customer(Customer_id) ON DELETE CASCADE,
    FOREIGN KEY (ebook_id) REFERENCES eBooks(ebook_id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_progress (Customer_id, ebook_id)
);
```

#### 3.2 Data Dictionary

##### Entity 1: `Customer`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `Customer_id` | VARCHAR(50) | Primary Key | NO | Unique system-generated customer identifier (`CUST-XXXXXX`). |
| `First_name` | VARCHAR(100) | None | NO | Customer's first name. |
| `Last_name` | VARCHAR(100) | None | NO | Customer's last name / surname. |
| `DOB` | DATE | None | YES | Date of birth for age verification. |
| `Gender` | VARCHAR(20) | Default 'Prefer not to say' | YES | Customer gender identity. |
| `Created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | NO | Account registration timestamp. |

##### Entity 2: `Login`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `Login_id` | INT | Primary Key, Auto Increment | NO | Internal login record identifier. |
| `Customer_id` | VARCHAR(50) | Foreign Key -> `Customer.Customer_id` | NO | Reference to customer entity. |
| `Username` | VARCHAR(100) | Unique | NO | Unique alphanumeric username. |
| `Password` | VARCHAR(255) | None | NO | Salted bcrypt hash of account password. |
| `Role` | VARCHAR(20) | Default 'customer' | NO | RBAC role (`customer`, `admin`, `author`). |

##### Entity 3: `Customer_Detail`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `Detail_id` | INT | Primary Key, Auto Increment | NO | Detail record primary key. |
| `Customer_id` | VARCHAR(50) | Foreign Key -> `Customer.Customer_id` | NO | Reference to customer demographic. |
| `Email` | VARCHAR(150) | Unique, Email Format | NO | User email address for communications & login. |
| `Phone` | VARCHAR(25) | None | YES | Contact telephone number. |
| `City` | VARCHAR(100) | None | YES | Residential city. |
| `State` | VARCHAR(100) | None | YES | Residential state / province. |
| `Zip` | VARCHAR(20) | None | YES | Postal / ZIP code. |

##### Entity 4: `Categories`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `category_id` | INT | Primary Key, Auto Increment | NO | Category primary key identifier. |
| `name` | VARCHAR(100) | Unique | NO | Human-readable category title. |
| `slug` | VARCHAR(100) | Unique | NO | URL-safe slug representation. |
| `description`| TEXT | None | YES | Detailed category summary. |

##### Entity 5: `eBooks`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `ebook_id` | INT | Primary Key, Auto Increment | NO | eBook primary key. |
| `title` | VARCHAR(255) | None | NO | Full title of the digital book. |
| `author_id` | INT | Foreign Key -> `Authors.author_id` | YES | Reference to author entity. |
| `category_id`| INT | Foreign Key -> `Categories.category_id` | NO | Reference to parent category. |
| `description`| TEXT | None | NO | Synopsis and book overview. |
| `price` | DECIMAL(10,2)| Default 0.00 | NO | Retail price in USD ($0 for free books). |
| `cover_image`| VARCHAR(500)| Default Image URL | YES | URL link to book cover artwork. |
| `pages_count`| INT | Default 100 | NO | Total number of estimated book pages. |
| `published_year`| INT | Default 2024 | NO | Year of publication. |
| `isbn` | VARCHAR(50) | None | YES | International Standard Book Number. |
| `drm_protected`| BOOLEAN | Default TRUE | NO | DRM flag restricting chapter content access. |

##### Entity 6: `Purchases` (User Bookshelf)
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `purchase_id` | INT | Primary Key, Auto Increment | NO | Transaction primary key. |
| `Customer_id` | VARCHAR(50) | Foreign Key -> `Customer.Customer_id` | NO | Reference to purchasing customer. |
| `ebook_id` | INT | Foreign Key -> `eBooks.ebook_id` | NO | Reference to acquired eBook. |
| `amount` | DECIMAL(10,2)| None | NO | Amount paid for transaction ($). |
| `transaction_id`| VARCHAR(100)| Unique | NO | Unique payment transaction string. |
| `payment_status`| VARCHAR(20)| Default 'completed' | NO | Status (`completed`, `pending`, `refunded`). |
| `purchase_date`| TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | NO | Date and time of library acquisition. |

##### Entity 7: `Reading_Progress`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `progress_id` | INT | Primary Key, Auto Increment | NO | Progress record primary key. |
| `Customer_id` | VARCHAR(50) | Foreign Key -> `Customer.Customer_id` | NO | Reading user identifier. |
| `ebook_id` | INT | Foreign Key -> `eBooks.ebook_id` | NO | Active book identifier. |
| `current_chapter`| INT | Default 1 | NO | Last active chapter index. |
| `current_page` | INT | Default 1 | NO | Last active page index. |
| `total_pages` | INT | Default 10 | NO | Total chapter count / virtual pages. |
| `percentage` | INT | Default 0 | NO | Calculated reading completion (0 - 100%). |
| `last_read_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | NO | Last active timestamp. |

##### Entity 8: `Reviews`
| Field Name | Data Type | Constraint | Nullable | Description |
|---|---|---|---|---|
| `review_id` | INT | Primary Key, Auto Increment | NO | Review primary key. |
| `Customer_id` | VARCHAR(50) | Foreign Key -> `Customer.Customer_id` | NO | Review author reference. |
| `ebook_id` | INT | Foreign Key -> `eBooks.ebook_id` | NO | Reviewed eBook reference. |
| `rating` | INT | Check (1 <= rating <= 5) | NO | Numerical star rating score. |
| `comment` | TEXT | None | NO | Reader feedback review comment. |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | NO | Review submission timestamp. |

#### 3.3 Entity-Relationship (ER) Diagram

```text
  ┌──────────────┐          1:1          ┌──────────────┐
  │   Customer   ├───────────────────────┤    Login     │
  └──────┬───────┘                       └──────────────┘
         │
         │ 1:1
         ▼
  ┌──────────────┐          1:N          ┌──────────────┐
  │Customer_Det. │                       │   Reviews    │
  └──────────────┘                       └──────┬───────┘
         │                                      │ N:1
         │ 1:N                                  ▼
         ├───────────────────────────────►┌──────────────┐
         │                               │    eBooks    │
         │ 1:N                           └───┬──────▲───┘
         ▼                                   │      │
  ┌──────────────┐                           │ N:1  │ N:1
  │  Purchases   ├───────────────────────────┘      │
  └──────────────┘                                  │
         │                                   ┌──────┴───────┐
         │ 1:N                               │  Categories  │
         ▼                                   └──────────────┘
  ┌──────────────┐
  │Reading_Prog. ├──────────────────────────────────┘
  └──────────────┘
```

---

### Experiment 4: Software Designing & UML Modeling

#### 4.1 UML Use Case Diagram

```text
                             KITABGHAR SYSTEM BOUNDARY
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                                                                             │
 │    ┌──────────────────────┐                     ┌────────────────────────┐  │
 │    │   (Register/Login)   │                     │  (View Admin Analytics)│  │
 │    └──────────▲───────────┘                     └───────────▲────────────┘  │
 │               │                                             │               │
 │    ┌──────────┴───────────┐                     ┌───────────┴────────────┐  │
 │    │ (Browse & Filter)    │                     │  (Add/Edit/Delete Book)│  │
 │    └──────────▲───────────┘                     └───────────▲────────────┘  │
 │               │                                             │               │
 │    ┌──────────┴───────────┐                     ┌───────────┴────────────┐  │
 │    │ (Add to My Library)  │                     │  (Manage Categories)   │  │
 │    └──────────▲───────────┘                     └───────────▲────────────┘  │
 │               │                                             │               │
 │    ┌──────────┴───────────┐                     ┌───────────┴────────────┐  │
 │    │ (Read eBook in Reader│                     │  (Inspect User List)   │  │
 │    └──────────▲───────────┘                     └───────────▲────────────┘  │
 │               │                                             │               │
 │    ┌──────────┴───────────┐                                 │               │
 │    │ (Sync Progress & TOC)│                                 │               │
 │    └──────────▲───────────┘                                 │               │
 │               │                                             │               │
 │    ┌──────────┴───────────┐                                 │               │
 │    │(Submit Review/Rating)│                                 │               │
 │    └──────────▲───────────┘                                 │               │
 │               │                                             │               │
 └───────────────┼─────────────────────────────────────────────┼───────────────┘
                 │                                             │
          ┌──────┴───────┐                             ┌───────┴──────┐
          │   CUSTOMER   │                             │    ADMIN     │
          │   (Reader)   │                             │  (Staff/Mgr) │
          └──────────────┘                             └──────────────┘
```

##### Use Case Specification Table
| Use Case ID | Use Case Name | Primary Actor | Pre-conditions | Post-conditions |
|---|---|---|---|---|
| **UC-01** | User Registration & Login | Customer / Admin | Valid email & credentials | JWT token issued; user state populated. |
| **UC-02** | Catalog Search & Filter | Customer | None (Publicly accessible) | Filtered book listing returned. |
| **UC-03** | Add Book to Library | Customer | Authenticated session | Book added to `Purchase` & `ReadingProgress` collections. |
| **UC-04** | In-Browser eBook Reading | Customer | Book exists in user's library | Chapters loaded; Sepia/Dark theme & font sizing active. |
| **UC-05** | Save Reading Progress | Customer | Active reading session | `currentChapter`, `percentage`, & timestamp updated. |
| **UC-06** | Submit Book Review | Customer | Authenticated session | Review saved; `averageRating` recalculated. |
| **UC-07** | Manage Catalog CRUD | Administrator | Authenticated Admin session | Book/chapters added, modified, or soft-deleted. |
| **UC-08** | View Analytics Dashboard | Administrator | Authenticated Admin session | Live aggregates (Users, Books, Revenue) rendered. |

#### 4.2 UML Class Diagram

```text
┌───────────────────────────────┐                  ┌───────────────────────────────┐
│             User              │                  │             Book              │
├───────────────────────────────┤                  ├───────────────────────────────┤
│ - customerId: String          │                  │ - id: ObjectId                │
│ - firstName: String           │                  │ - title: String               │
│ - lastName: String            │                  │ - author: String              │
│ - username: String            │                  │ - category: Category          │
│ - email: String               │ 1              * │ - price: Number               │
│ - password: String (Hashed)   ├─────────────────►│ - isFree: Boolean             │
│ - role: String (customer/admin│ (Reads/Reviews)  │ - coverImage: String          │
│ - city, state, zip, phone     │                  │ - pagesCount: Number          │
├───────────────────────────────┤                  │ - averageRating: Number       │
│ + matchPassword(pwd): Boolean │                  │ - drmProtected: Boolean       │
│ + generateToken(): String     │                  │ - chapters: Chapter[]         │
└──────────────┬────────────────┘                  └───────────────▲───────────────┘
               │                                                   │
               │ 1                                                 │ 1
               ▼                                                   │
┌───────────────────────────────┐                  ┌───────────────┴───────────────┐
│        ReadingProgress        │                  │           Category            │
├───────────────────────────────┤                  ├───────────────────────────────┤
│ - user: User                  │                  │ - id: ObjectId                │
│ - book: Book                  │                  │ - name: String                │
│ - currentChapter: Number      │                  │ - slug: String                │
│ - percentage: Number          │                  │ - description: String         │
│ - lastReadAt: Date            │                  └───────────────────────────────┘
├───────────────────────────────┤
│ + calculatePercentage(): Number│
└───────────────────────────────┘
```

#### 4.3 UML Sequence Diagram: User Authentication & Token Flow

```text
 [Customer Browser]              [Tier 2: Express Server]            [Tier 3: Database]
         │                                   │                               │
         │ 1. POST /api/auth/login           │                               │
         │    { email, password }            │                               │
         │──────────────────────────────────►│                               │
         │                                   │ 2. Find User by Email         │
         │                                   │──────────────────────────────►│
         │                                   │                               │
         │                                   │ 3. Return User Record & Hash  │
         │                                   │◄──────────────────────────────│
         │                                   │                               │
         │                                   │ 4. bcrypt.compare(pwd, hash)  │
         │                                   │    Generate signed JWT Token  │
         │                                   │                               │
         │ 5. HTTP 200 OK                    │                               │
         │    { token, userProfile }         │                               │
         │◄──────────────────────────────────│                               │
         │                                   │                               │
         │ 6. Set token in localStorage      │                               │
         │    & attach to Axios headers      │                               │
```

#### 4.4 UML Activity Diagram: eBook Access & Reading Engine Flow

```text
    ( Start )
        │
        ▼
[ Open Book Details Page ]
        │
        ▼
   < In Library? >
      /       \
 (No)/         \(Yes)
    ▼           ▼
[ Click Add/ ] [ Click 'Read Now' ]
[ Acquire   ]   │
    │           ▼
    │     [ Request Book with JWT ]
    │           │
    │           ▼
    │     < Verify Ownership & DRM >
    │        /                  \
    │   (Denied)              (Authorized)
    │      │                        │
    │      ▼                        ▼
    │ [ Show 403 Forbidden ]   [ Load Full Chapter Text ]
    │                               │
    │                               ▼
    │                          [ Render In-Browser Reader ]
    │                               │
    │                          [ Select Theme (Sepia/Dark/Light) ]
    │                          [ Adjust Font Size (12-24px) ]
    │                               │
    │                               ▼
    │                          [ Advance Chapter ]
    │                               │
    │                               ▼
    │                          [ Auto-Update Reading Progress ]
    │                               │
    └──────────────────────────────►▼
                                 ( End )
```

---

## 🔌 REST API Specification (Tier 2 Gateway)

Base URL: `http://localhost:5000/api`

### 1. Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new customer account | `{ firstName, lastName, username, email, password, city, state, zip, phone }` |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue JWT | `{ email, password }` |
| `GET` | `/api/auth/me` | Protected | Retrieve authenticated user profile | None (Bearer Token) |
| `PUT` | `/api/auth/profile` | Protected | Update profile demographic information | `{ firstName, lastName, phone, city, state, zip, avatar }` |

### 2. Books & Catalog Routes (`/api/books`)
| Method | Endpoint | Access | Description | Request Body / Query |
|---|---|---|---|---|
| `GET` | `/api/books` | Public | Fetch catalog with search/filter | Query: `?category=slug&search=keyword&sort=price` |
| `GET` | `/api/books/categories/list` | Public | List all book genres/categories | None |
| `GET` | `/api/books/:id` | Public | Get book overview & metadata | None |
| `POST` | `/api/books` | Admin/Author | Create new eBook with chapters | `{ title, author, category, price, isFree, chapters: [...] }` |
| `PUT` | `/api/books/:id` | Admin/Author | Update existing book metadata | Partial book object |
| `DELETE` | `/api/books/:id` | Admin | Delete book from catalog | None |

### 3. Library & Reading Progress Routes (`/api/library`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `GET` | `/api/library` | Protected | Get user's personal bookshelf | None (Bearer Token) |
| `POST` | `/api/library/add` | Protected | Add free/purchased book to library | `{ bookId }` |
| `GET` | `/api/library/progress/:bookId` | Protected | Fetch readable chapters & progress | None (Bearer Token) |
| `PUT` | `/api/library/progress/:bookId` | Protected | Sync active chapter & reading % | `{ currentChapter, currentPage, percentage }` |

### 4. Reviews & Ratings Routes (`/api/reviews`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `GET` | `/api/reviews/book/:bookId`| Public | Fetch all reviews for a book | None |
| `POST` | `/api/reviews` | Protected | Post 1-5 star review for a book | `{ bookId, rating, comment }` |

### 5. Admin Console Routes (`/api/admin`)
| Method | Endpoint | Access | Description | Request Body |
|---|---|---|---|---|
| `GET` | `/api/admin/analytics` | Admin Only | System stats (Users, Books, Revenue) | None (Admin Bearer Token) |
| `GET` | `/api/admin/users` | Admin Only | Directory of registered customers | None (Admin Bearer Token) |
| `POST` | `/api/admin/categories` | Admin Only | Add new genre category | `{ name, slug, description, icon }` |

---

## 📁 Project Folder & File Structure

```text
KitabGhar/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection & Embedded Memory Server fallback
│   │   ├── controllers/
│   │   │   ├── adminController.js    # Admin analytics & user directory logic
│   │   │   ├── authController.js     # User registration, login & profile management
│   │   │   ├── bookController.js     # Book catalog browsing & CRUD handlers
│   │   │   ├── libraryController.js  # User library & reading progress sync
│   │   │   └── reviewController.js   # Rating and review calculation logic
│   │   ├── data/
│   │   │   └── seedData.js           # Multi-chapter sample books & pre-seeded users
│   │   ├── middleware/
│   │   │   └── auth.js               # JWT verification & RBAC authorization
│   │   ├── models/
│   │   │   ├── Book.js               # eBook schema with embedded chapter schema
│   │   │   ├── Category.js           # Category genre schema
│   │   │   ├── Purchase.js           # Ownership & transaction record schema
│   │   │   ├── ReadingProgress.js    # Chapter, page & percentage tracking schema
│   │   │   ├── Review.js             # User review & rating schema
│   │   │   └── User.js               # Customer, Login & Detail schema with bcrypt pre-save
│   │   ├── routes/
│   │   │   ├── adminRoutes.js        # Admin endpoints (/api/admin)
│   │   │   ├── authRoutes.js         # Auth endpoints (/api/auth)
│   │   │   ├── bookRoutes.js         # Book endpoints (/api/books)
│   │   │   ├── libraryRoutes.js      # Library endpoints (/api/library)
│   │   │   └── reviewRoutes.js       # Review endpoints (/api/reviews)
│   │   └── server.js                 # Express server bootstrap & route mounting
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx          # Reusable catalog card with badges & pricing
│   │   │   ├── Footer.jsx            # Application footer
│   │   │   ├── Navbar.jsx            # Responsive navigation bar with role switcher
│   │   │   ├── ProtectedRoute.jsx    # Client-side route guard
│   │   │   └── StarRating.jsx        # Interactive & read-only 5-star component
│   │   ├── context/
│   │   │   └── AuthContext.jsx       # React Context providing global JWT user state
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx    # Analytics KPI cards & book CRUD management
│   │   │   ├── BookDetails.jsx       # Synopsis, chapter preview, reviews & purchase CTA
│   │   │   ├── Browse.jsx            # Catalog search, category filters & sorting
│   │   │   ├── Home.jsx              # Landing page hero, featured books & benefits
│   │   │   ├── Login.jsx             # Secure sign-in with one-click demo credentials
│   │   │   ├── MyLibrary.jsx         # User bookshelf with progress bars & resume reading
│   │   │   ├── Profile.jsx           # Account demographic info editor
│   │   │   ├── Reader.jsx            # In-browser reader (Sepia/Dark, font scale, TOC)
│   │   │   └── Register.jsx          # Customer registration form
│   │   ├── services/
│   │   │   └── api.js                # Axios instance with request/response interceptors
│   │   ├── App.jsx                   # React Router DOM configuration
│   │   ├── index.css                 # Tailwind CSS directives & custom scrollbars
│   │   └── main.jsx                  # React application entry point
│   └── package.json
│
├── docs/
│   ├── 3_TIER_ARCHITECTURE.md        # Formal 3-Tier architectural specification
│   ├── LAB_EXPERIMENTS_COVERAGE.md   # Mapping of Days 1–4 to codebase
│   └── VIVA_QUESTIONS_GUIDE.md       # Comprehensive Viva Voce questions & answers
│
├── package.json                      # Root orchestrator script (`npm run dev`)
└── README.md                         # Complete project documentation & experiment solutions
```

---

## 🎓 Lab Viva Voce Questions & Answers

### Q1: What is a 3-Tier Architecture and what are its advantages over 2-Tier?
**Answer**:
A 3-Tier Architecture divides an application into three distinct logical layers:
1. **Tier 1 (Presentation)**: The client-side UI (React 18 SPA) responsible for rendering views and capturing user events.
2. **Tier 2 (Application/Logic)**: The server middleware (Node.js & Express) that handles authentication, business validation, calculations, and data processing.
3. **Tier 3 (Data Storage)**: The persistence engine (MongoDB / MySQL) responsible for data storage, indexing, and retrieval.

**Advantages over 2-Tier**:
- **Enhanced Security**: Database credentials are not exposed to the client; all operations are mediated by Tier 2 using cryptographically verified JWT tokens.
- **Independent Scalability**: The presentation, application, and database tiers can be independently scaled and upgraded.
- **Maintainability**: Business rules are centralized on the server, avoiding duplication across multiple client platforms.

---

### Q2: How does Authentication and Authorization work in KitabGhar?
**Answer**:
1. **Password Hashing**: User passwords are encrypted with `bcryptjs` using a salt work factor of 10 prior to persistence in the database.
2. **JWT Token Issuance**: When a user logs in via `POST /api/auth/login`, the server generates a cryptographically signed JSON Web Token containing the user's ID and role (`jwt.sign()`).
3. **Bearer Authorization**: The client stores the token in `localStorage` and transmits it via the `Authorization: Bearer <token>` HTTP header for all authenticated requests.
4. **Route Protection**: Express middleware `protect` decodes the token and attaches the user object to `req.user`. The `authorize('admin')` middleware ensures only users with the `admin` role can access administrative endpoints.

---

### Q3: What is Digital Rights Management (DRM) and how is it implemented?
**Answer**:
Digital Rights Management (DRM) is an access control strategy used to protect intellectual property from unauthorized copying and piracy. In KitabGhar:
- Public catalog endpoints only return public metadata (title, author, synopsis, cover image). Complete chapter content is omitted.
- Full chapter content is only delivered via `GET /api/library/progress/:bookId` after the server verifies that the user possesses a valid `Purchase` record or that the book is marked as `isFree: true`.

---

### Q4: How is Reading Progress tracked and synchronized?
**Answer**:
When a reader navigates chapters in `Reader.jsx`:
1. The client computes the completion percentage: `percentage = Math.round((currentChapter / totalChapters) * 100)`.
2. The client dispatches a `PUT /api/library/progress/:bookId` request with `{ currentChapter, currentPage, percentage }`.
3. The server updates or creates the user's `ReadingProgress` record.
4. When returning to **My Library**, the bookshelf displays the progress bar and a "Resume Reading" button pointing directly to the last saved chapter.

---

### Q5: How does KitabGhar handle database connectivity without a local MongoDB install?
**Answer**:
In `backend/src/config/db.js`, the application attempts to connect to the standard MongoDB connection string. If no local or cloud MongoDB server is available, it gracefully initializes `mongodb-memory-server` (an embedded, in-memory MongoDB instance in Node.js) and triggers `seedData.js` to automatically populate sample categories, books, and user accounts. This guarantees 100% zero-configuration execution for evaluators.

---

### Q6: What is the difference between Functional and Non-Functional Requirements?
**Answer**:
- **Functional Requirements (FR)** define **what** specific behaviors, features, and functions the system must perform (e.g., user registration, chapter rendering, search filters, review submission).
- **Non-Functional Requirements (NFR)** specify **how** the system performs regarding quality attributes such as security (JWT/bcrypt), latency (<150ms response times), usability (responsive Sepia/Dark modes), and availability.

---

## 🛠️ Tech Stack & Dependencies

### Frontend (Presentation Tier)
- **React 18.2**: Component-driven UI library
- **Vite 5**: Fast build tool and development server
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **React Router DOM 6**: Declarative client-side routing
- **Lucide React**: Modern iconography
- **Axios 1.6**: Promise-based HTTP client with interceptors

### Backend (Application Logic Tier)
- **Node.js**: Asynchronous event-driven JavaScript runtime
- **Express.js 4.18**: Web and REST API framework
- **JSON Web Tokens (`jsonwebtoken` 9.0)**: Stateless authentication tokens
- **`bcryptjs` 2.4**: Cryptographic password hashing
- **Mongoose 8.0**: Object Data Modeling (ODM) for MongoDB
- **`cors` & `dotenv`**: Cross-origin resource sharing & environment configuration

### Database (Data Tier)
- **MongoDB**: Document-oriented NoSQL database
- **`mongodb-memory-server`**: Embedded in-memory MongoDB engine

---

## 👥 Authors & Academic Submission

- **Project Name**: KitabGhar - 3-Tier eBook Management System
- **Lab Course**: Software Tools & Techniques Lab (Days 1 to 4 Practical Evaluation)
- **Architecture**: 3-Tier Client-Server-Database Architecture
- **License**: ISC Open Source License
