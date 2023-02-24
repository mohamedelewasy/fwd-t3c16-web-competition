import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();
export const hash = (password: string): string => {
  const SALT = process.env.SALT;
  const PAPER = process.env.PAPER;
  if (!SALT || !PAPER) {
    console.log('(salt or paper) is missing');
    process.exit(1);
  }
  const hashedPassword = bcrypt.hashSync(password + PAPER, parseInt(SALT));
  return hashedPassword;
};

export const compare = (password: string, hashedPassword: string): boolean => {
  const PAPER = process.env.PAPER;
  if (!PAPER) {
    console.log('paper is missing');
    process.exit(1);
  }
  return bcrypt.compareSync(password + PAPER, hashedPassword);
};
