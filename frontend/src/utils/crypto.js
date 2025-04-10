/**
 * Utility functions for cryptographic operations.
 * 
 * @author dbianco
 */

const bcrypt = require('bcryptjs');

/**
 * Hashes a password using bcrypt with a salt round of 10.
 * This matches the backend's BCrypt implementation.
 * 
 * @param {string} password - The plain text password to hash
 * @returns {Promise<string>} A promise that resolves to the hashed password
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

module.exports = {
  hashPassword
};
