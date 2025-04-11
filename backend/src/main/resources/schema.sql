-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    school_name VARCHAR(255),
    profile_picture_url VARCHAR(255),
    bio TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP
);

-- User roles table
CREATE TABLE IF NOT EXISTS user_roles (
    user_id BIGINT,
    role VARCHAR(50),
    PRIMARY KEY (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User interests table
CREATE TABLE IF NOT EXISTS user_interests (
    user_id BIGINT,
    interest VARCHAR(100),
    PRIMARY KEY (user_id, interest),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- User expertise table
CREATE TABLE IF NOT EXISTS user_expertise (
    user_id BIGINT,
    expertise VARCHAR(100),
    PRIMARY KEY (user_id, expertise),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Contents table
CREATE TABLE IF NOT EXISTS contents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    content_type VARCHAR(50),
    author_id BIGINT NOT NULL,
    education_level VARCHAR(50),
    view_count BIGINT DEFAULT 0,
    like_count BIGINT DEFAULT 0,
    assignment_count BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    resource_url VARCHAR(255),
    FOREIGN KEY (author_id) REFERENCES users(id)
);

-- Content tags table
CREATE TABLE IF NOT EXISTS content_tags (
    content_id BIGINT,
    tag VARCHAR(100),
    PRIMARY KEY (content_id, tag),
    FOREIGN KEY (content_id) REFERENCES contents(id)
);

-- Content categories table
CREATE TABLE IF NOT EXISTS content_categories (
    content_id BIGINT,
    category VARCHAR(100),
    PRIMARY KEY (content_id, category),
    FOREIGN KEY (content_id) REFERENCES contents(id)
);

-- Content versions table
CREATE TABLE IF NOT EXISTS content_versions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_id BIGINT NOT NULL,
    version_number INT NOT NULL,
    content_data TEXT,
    is_published BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    approved_by BIGINT,
    approved_at TIMESTAMP,
    change_description TEXT,
    created_by BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_current BOOLEAN DEFAULT FALSE,
    assignment_count BIGINT DEFAULT 0,
    resource_url VARCHAR(255),
    FOREIGN KEY (content_id) REFERENCES contents(id),
    FOREIGN KEY (approved_by) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Content resources table
CREATE TABLE IF NOT EXISTS content_resources (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content_id BIGINT NOT NULL,
    resource_type VARCHAR(50),
    resource_url VARCHAR(255),
    FOREIGN KEY (content_id) REFERENCES contents(id)
);

-- Capsule assignments table
CREATE TABLE IF NOT EXISTS capsule_assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    capsule_id BIGINT NOT NULL,
    version_id BIGINT NOT NULL,
    work_group_id BIGINT NOT NULL,
    status VARCHAR(50),
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    FOREIGN KEY (capsule_id) REFERENCES contents(id),
    FOREIGN KEY (version_id) REFERENCES content_versions(id),
    FOREIGN KEY (work_group_id) REFERENCES work_groups(id)
);
