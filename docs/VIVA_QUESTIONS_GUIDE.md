# KitabGhar: Lab Viva Questions & Answers Guide

Use this guide to prepare for viva examinations and lab presentations.

---

### Q1: What is a 3-Tier (3-Level) Architecture?
**Answer:**
A 3-Tier Architecture separates an application into three distinct computing layers:
1. **Presentation Layer (Tier 1)**: The client user interface (React.js) that handles user interaction and view rendering.
2. **Application / Logic Layer (Tier 2)**: The server backend (Node.js & Express) that handles business rules, security, routing, and calculations.
3. **Data Layer (Tier 3)**: The persistent storage (MongoDB / MySQL) responsible for data storage, consistency, and indexing.

---

### Q2: What is the difference between Functional and Non-Functional Requirements?
**Answer:**
- **Functional Requirements**: Specify **what the system should do** (e.g., User registration, live search, book purchase, progress saving, review submission).
- **Non-Functional Requirements**: Specify **how the system performs** (e.g., Performance, Security via JWT/bcrypt, Reliability, Responsiveness, Data Integrity).

---

### Q3: How does Authentication work in KitabGhar?
**Answer:**
1. When a user submits login credentials, the backend verifies the email/username and compares the salted hash using `bcrypt.compare()`.
2. Upon successful authentication, the server signs a **JSON Web Token (JWT)** containing user ID and role.
3. The client stores this token and sends it in the `Authorization: Bearer <token>` HTTP header for subsequent protected requests.
4. The `protect` middleware verifies the token signature before granting access.

---

### Q4: How is the Data Model structured?
**Answer:**
In Day 3 of the lab manual, five primary tables are defined:
- `Customer`: Contains demographic details (Customer_id, Name, DOB, Gender).
- `Login`: Contains authentication credentials (Username, Password hash, Role).
- `Customer Detail`: Contains address and contact information (Email, Phone, City, State, Zip).
- `eBooks`: Contains book metadata, pricing, category ID, and author ID.
- `Categories`: Contains category name and description.

In MongoDB, we model these with Mongoose schemas and relationships using `ObjectId` references.

---

### Q5: What is DRM in the context of KitabGhar?
**Answer:**
DRM (Digital Rights Management) is a system of access control technologies used to protect copyrighted digital books from unauthorized redistribution, unauthorized copying, or piracy. In KitabGhar, eBooks require authenticated library ownership before full readable text is served.
