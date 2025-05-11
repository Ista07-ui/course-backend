CREATE DATABASE IF NOT EXISTS course_app;

USE course_app;

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
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
