import db from '../connection';

export interface User {
  id: number;
  name: string;
  email: string;
}

export function createUser(name: string, email: string): User {
  const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  const result = stmt.run(name, email);
  return { id: result.lastInsertRowid as number, name, email };
}

export function getUser(id: number): User {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User;
}
