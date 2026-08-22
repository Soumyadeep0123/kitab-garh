-- ============================================================================
-- KitabGhar eBook Management System - Relational SQL Schema
-- Conforming to Software Tools and Techniques Lab (Day 3 Data Dictionary)
-- ============================================================================

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
