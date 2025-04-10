-- Insert admin user if not exists
INSERT INTO users (username, email, password, is_active, is_email_verified, created_at)
SELECT 'admin', 'olivabianco@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMxs.AQubh4a', true, true, CURRENT_TIMESTAMP
WHERE NOT EXISTS (
    SELECT 1 FROM users WHERE email = 'olivabianco@gmail.com'
);

-- Get the admin user id (needed for role assignment)
SET @admin_id = (SELECT id FROM users WHERE email = 'olivabianco@gmail.com');

-- Insert admin role if not exists
INSERT INTO user_roles (user_id, role)
SELECT @admin_id, 'ROLE_ADMIN'
WHERE NOT EXISTS (
    SELECT 1 FROM user_roles WHERE user_id = @admin_id AND role = 'ROLE_ADMIN'
) AND @admin_id IS NOT NULL;
