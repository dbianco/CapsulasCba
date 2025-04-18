-- Insert admin user
INSERT INTO users (username, email, password, is_active, is_email_verified, created_at)
VALUES ('admin', 'olivabianco@gmail.com', '$2a$10$4yPksBxIZ7Dj7ycFBIitjel/IVnlfapORYqaJjHhIHwGjvuSoh20u', true, true, CURRENT_TIMESTAMP);

-- Insert admin role
INSERT INTO user_roles (user_id, role)
SELECT id, 'ROLE_ADMIN'
FROM users
WHERE username = 'admin';

-- Insert a mock workgroup
INSERT INTO work_groups (name, description, status, created_at)
VALUES ('Mock WorkGroup', 'This is a mock workgroup for testing purposes.', 'ACTIVE', CURRENT_TIMESTAMP);
