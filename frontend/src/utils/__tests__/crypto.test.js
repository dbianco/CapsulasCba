const { hashPassword } = require('../crypto');
const bcrypt = require('bcryptjs');

describe('crypto utils', () => {
  describe('hashPassword', () => {
    it('should hash password using bcrypt', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      // Verify it's a valid bcrypt hash
      expect(hashedPassword).toMatch(/^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$/);
      
      // Verify we can compare the password correctly
      const isMatch = await bcrypt.compare(password, hashedPassword);
      expect(isMatch).toBe(true);
    });

    it('should use salt rounds of 10', async () => {
      const password = 'testPassword123';
      const hashedPassword = await hashPassword(password);
      
      // bcrypt hash format: $2b$rounds$saltandhash
      const rounds = parseInt(hashedPassword.split('$')[2]);
      expect(rounds).toBe(10);
    });

    it('should generate different hashes for the same password', async () => {
      const password = 'testPassword123';
      const hash1 = await hashPassword(password);
      const hash2 = await hashPassword(password);
      
      expect(hash1).not.toBe(hash2);
      
      // But both should be valid for the password
      expect(await bcrypt.compare(password, hash1)).toBe(true);
      expect(await bcrypt.compare(password, hash2)).toBe(true);
    });
  });
});
