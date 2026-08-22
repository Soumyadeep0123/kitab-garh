# Lab Experiments Coverage: Days 1 to 4

This document cross-references each day of your **Software Tools & Techniques Lab** manual with the implementation in **KitabGhar**.

---

### Experiment 1: Problem Analysis and Project Planning
- **Problem Statement**: Traditional physical library systems create geographical and access barriers. KitabGhar provides an online eBook management platform with cloud synchronization and DRM protection.
- **Scope**: User authentication, catalog search, in-browser eBook reading, bookmarking, reading progress sync, and admin analytics.
- **Infrastructure**: Modeled after modern cloud deployment (Client SPA + REST API + Scalable Database).

### Experiment 2: Software Requirement Specification (SRS)
- **Module 1: User Management**: Implemented in `authController.js`, `User.js`, `Login.jsx`, `Register.jsx`.
- **Module 2: Upload & Organization**: Implemented in `adminController.js`, `bookController.js`, `AdminDashboard.jsx`.
- **Module 3: Admin & Analytics**: Real-time revenue, total users, book inventory, and category analytics in `AdminDashboard.jsx`.
- **Module 4: Collaboration & Sharing**: Reader bookmarking, study notes, and student review/rating system.
- **Module 5: Reading & Accessibility**: In-browser reader (`Reader.jsx`) with Sepia/Dark/Light themes, responsive font scaling, and TOC.
- **Module 6: Security & DRM**: JWT authentication, bcrypt password hashing, and DRM content protection flags.

### Experiment 3: Data Modeling & Data Dictionary
The relational tables defined in the Day 3 lab manual are mapped 1-to-1 in `database/schema.sql` and as Mongoose schemas:
1. **Customer**: `User.js` (`customerId`, `firstName`, `lastName`, `dob`, `gender`)
2. **Login**: `User.js` (`username`, `password`, `role`)
3. **Customer Detail**: `User.js` (`email`, `phone`, `city`, `state`, `zip`)
4. **eBooks**: `Book.js` (`title`, `author`, `category`, `price`, `isbn`, `chapters`)
5. **Categories**: `Category.js` (`name`, `slug`, `description`)

### Experiment 4: Software Designing & UML Diagrams
- **Use Case Diagram**: Customer activities (Register, Search, Add to Library, Read eBook, Add Bookmark, Post Review) vs Administrator activities (Manage Books, Add Category, View Analytics).
- **Class Diagram**: `User` -> `Purchase` -> `Book` -> `Category` -> `Review` -> `ReadingProgress`.
- **Activity Diagram**: Implemented in frontend route guards and backend controllers.
