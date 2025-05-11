-- Select or create the database
CREATE DATABASE IF NOT EXISTS course_app;

USE course_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'instructor', 'student') DEFAULT 'student',
  avatar_url VARCHAR(500),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verify_token VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  summary TEXT,
  description TEXT,
  price DECIMAL(10,2),
  cover_url VARCHAR(500),
  language VARCHAR(100),
  estimation VARCHAR(100),
  is_having_certificate BOOLEAN DEFAULT false,
  total_review_count INT DEFAULT 0,
  average_review FLOAT DEFAULT 0,
  total_video_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
