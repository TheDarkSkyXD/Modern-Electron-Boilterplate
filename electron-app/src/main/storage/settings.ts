import Store from 'electron-store';
import { getEncryptionKey } from './secure-store';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

interface Schema {
  theme: 'light' | 'dark' | 'system';
  tokens: any;
}

let store: Store<Schema>;

export async function initializeStore() {
  const encryptionKey = await getEncryptionKey();
  const storeName = 'config'; // Default name for electron-store
  const storePath = path.join(app.getPath('userData'), `${storeName}.json`);

  const options = {
    defaults: {
      theme: 'system' as const,
      tokens: null as any,
    },
    encryptionKey,
  };

  try {
    store = new Store(options);
  } catch (error) {
    if (error instanceof SyntaxError) {
      if (fs.existsSync(storePath)) {
        fs.unlinkSync(storePath);
      }
      store = new Store(options);
    } else {
      throw error;
    }
  }
}

export function getTheme() {
  return (store as any).get('theme');
}

export function setTheme(theme: 'light' | 'dark' | 'system') {
  (store as any).set('theme', theme);
}

export function getTokens() {
  return (store as any).get('tokens');
}

export function setTokens(tokens: any) {
  (store as any).set('tokens', tokens);
}
