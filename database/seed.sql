-- Sample SQL Seed Data for KitabGhar
USE kitabghar_db;

INSERT INTO Categories (name, slug, description) VALUES
('Computer Science & Programming', 'programming', 'Algorithms, Python, Data Structures and System Design'),
('Artificial Intelligence & ML', 'ai-ml', 'Deep Learning, Neural Networks and ML Models'),
('Database Management Systems', 'database', 'SQL, NoSQL, Relational Models and Normalization'),
('Web & Cloud Architecture', 'web-cloud', 'Full Stack Development, Microservices, React and Node.js'),
('Literature & Classic Novels', 'literature', 'Timeless Classics and English Literature'),
('Science & Mathematics', 'science-math', 'Physics, Quantum Theory and Discrete Math');

INSERT INTO Customer (Customer_id, First_name, Last_name, DOB, Gender) VALUES
('CUST-000001', 'System', 'Administrator', '1990-01-01', 'Male'),
('CUST-100245', 'Aarav', 'Sharma', '2002-05-15', 'Male');

INSERT INTO Login (Customer_id, Username, Password, Role) VALUES
('CUST-000001', 'admin', '$2a$10$abcdefghijklmnopqrstuv', 'admin'),
('CUST-100245', 'student', '$2a$10$abcdefghijklmnopqrstuv', 'customer');

INSERT INTO Customer_Detail (Customer_id, Email, Phone, City, State, Zip) VALUES
('CUST-000001', 'admin@kitabghar.com', '+91 9876543210', 'New Delhi', 'Delhi', '110001'),
('CUST-100245', 'student@kitabghar.com', '+91 9123456780', 'Bengaluru', 'Karnataka', '560001');

INSERT INTO Authors (name, biography) VALUES
('Dr. Vikramaditya Rao', 'Professor of Computer Science & Algorithmic Design.'),
('Jane Austen', 'Renowned 19th Century British Author.'),
('Dr. Ethan Miller', 'AI and Deep Learning Specialist.');

INSERT INTO eBooks (title, author_id, category_id, description, price, pages_count, published_year, isbn) VALUES
('Mastering Python & Data Structures', 1, 1, 'In-depth guide to Python 3.12 internals, time complexity, and data structures.', 349.00, 380, 2024, '978-0-123456789'),
('Pride and Prejudice', 2, 5, 'The timeless classic of love and social manners.', 0.00, 340, 1813, '978-0-987654321'),
('Deep Learning & Neural Networks', 3, 2, 'Hands-on guide to calculus of backpropagation and Transformers.', 499.00, 450, 2025, '978-0-555666777');
