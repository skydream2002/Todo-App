-- =========================
-- Database
-- =========================
CREATE DATABASE IF NOT EXISTS todo_app
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE todo_app;

-- =========================
-- User table
-- =========================
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(200) UNIQUE,
    password VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- =========================
-- Todos table
-- =========================
CREATE TABLE todos (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200),
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    CONSTRAINT todos_ibfk_1
        FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);

-- =========================
-- Tasks table
-- =========================
CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending','done') DEFAULT 'pending',
    start_date DATE,
    end_date DATE,
    priority ENUM('low','medium','high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY user_id (user_id),
    CONSTRAINT tasks_ibfk_1
        FOREIGN KEY (user_id)
        REFERENCES user(id)
        ON DELETE CASCADE
);
