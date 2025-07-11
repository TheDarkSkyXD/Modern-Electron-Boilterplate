import fs from 'fs';
import path from 'path';
import db from './connection';
import { app } from 'electron';

const migrationsDir = app.isPackaged
  ? path.join(process.resourcesPath, 'migrations')
  : path.join(__dirname, 'migrations');

export function runMigrations() {
  const migrationFiles = fs.readdirSync(migrationsDir).sort();

  for (const file of migrationFiles) {
    if (file.endsWith('.sql')) {
      const migration = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      db.exec(migration);
    }
  }
}
