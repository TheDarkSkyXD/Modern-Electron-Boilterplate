import Store from 'electron-store';
import { getEncryptionKey } from './secure-store';

interface Schema {
  theme: 'light' | 'dark' | 'system';
  tokens: any;
}

let store: Store<Schema>;

export async function initializeStore() {
  const encryptionKey = await getEncryptionKey();
  store = new Store<Schema>({
    defaults: {
      theme: 'system',
      tokens: null,
    },
    encryptionKey,
  });
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
