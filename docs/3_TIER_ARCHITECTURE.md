# KitabGhar: 3-Tier (3-Level) Architecture Specification

This document provides the formal software architectural definition of **KitabGhar** as required for lab evaluation and viva examinations.

---

## 1. High-Level Architectural Diagram

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        TIER 1: PRESENTATION TIER                       │
│                         (Client Application)                           │
│                                                                        │
│  - React 18 Single Page Application (SPA)                              │
│  - Tailwind CSS + Lucide Icons                                         │
│  - Responsive UI Views: Catalog, eBook Reader, My Library, Admin       │
│  - State Management: React Context API (AuthContext)                   │
│  - Networking: Axios HTTP Client with JWT Request Interceptors         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / RESTful API (JSON Payload)
                                    │ Port: 5000 (Backend API Gateway)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    TIER 2: APPLICATION / BUSINESS TIER                 │
│                          (Middleware & API Server)                     │
│                                                                        │
│  - Node.js & Express.js REST Framework                                 │
│  - Authentication: JSON Web Tokens (JWT) & bcrypt Password Hashing     │
│  - Controllers: AuthController, BookController, LibraryController,     │
│    ReviewController, AdminController                                   │
│  - Business Rules: DRM Protection, Reading Progress Math, Rating Calc  │
│  - Role-Based Access Control (RBAC): Customer, Author, Admin           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Database Queries & Schema Validation
                                    │ Mongoose ODM / SQL Driver
┌───────────────────────────────────▼────────────────────────────────────┐
│                          TIER 3: DATA TIER                             │
│                         (Persistent Storage)                           │
│                                                                        │
│  - Primary Engine: MongoDB (Mongoose ODM)                              │
│  - Automatic Embedded Fallback: mongodb-memory-server                  │
│  - Relational SQL Export: MySQL / PostgreSQL Schema                    │
│  - Collections: Users, Books, Categories, Reviews, Purchases, Progress │
│  - Indexing: Compound unique index on (user, book) for purchases       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Explanation of Each Tier

### Tier 1: Presentation Layer (Client)
- **Role**: Renders the graphical user interface (GUI), captures user interactions, and visualizes data returned from the backend.
- **Key Modules**:
  - **Catalog & Search**: Dynamic filtering by category, pricing, and keyword search.
  - **In-Browser eBook Reader**: Customizable reading engine (Light/Dark/Sepia, Font sizing, Bookmarking).
  - **My Library**: Personal bookshelf tracking reading percentage.
  - **Admin Dashboard**: Visual analytics, revenue metrics, and book CRUD manager.

### Tier 2: Application / Business Logic Layer
- **Role**: Coordinates business rules, processes transactions, authenticates requests, and insulates the database from direct client exposure.
- **Key Modules**:
  - **Auth Service**: Issues signed JWT tokens valid for 7 days.
  - **Progress Service**: Recalculates completion percentage upon chapter turn.
  - **Rating Engine**: Automatically computes moving average rating upon review submission.
  - **Security Filter**: Verifies admin privileges before allowing book creation or deletion.

### Tier 3: Data Layer
- **Role**: Manages physical data storage, data integrity constraints, indexing, and persistent retrieval.
- **Entities**: Users, Login credentials, Customer details, eBooks, Categories, Purchases, Reviews, and Reading Progress.

---

## 3. Why 3-Tier Architecture is Superior to 2-Tier Architecture

| Criteria | 2-Tier Architecture (Client-DB) | 3-Tier Architecture (KitabGhar) |
|---|---|---|
| **Security** | Clients connect directly to database credentials. High risk. | Database credentials stay secure on server. Clients use JWT. |
| **Scalability** | Database connection pooling is quickly exhausted. | Application tier can scale horizontally across multiple instances. |
| **Maintainability** | Business logic is entangled with UI or stored procedures. | Strict separation: UI, Business Logic, and DB can evolve independently. |
| **Flexibility** | Difficult to support multiple clients (Web, Mobile). | Same REST API serves Web, Mobile apps, and third-party integrations. |
