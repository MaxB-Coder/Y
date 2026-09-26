import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

// Compared against when no user matches the email, so an unknown email takes
// as long to reject as a wrong password and can't be used to find accounts.
const DUMMY_HASH = bcrypt.hashSync(randomUUID(), SALT_ROUNDS);

export const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS);

export const verifyPassword = (password, hash) =>
  bcrypt.compare(password, hash ?? DUMMY_HASH);
