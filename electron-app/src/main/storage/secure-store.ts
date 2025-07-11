import keytar from 'keytar';
import { randomBytes } from 'crypto';

const SERVICE_NAME = 'electron-app';
const ACCOUNT_NAME = 'encryption-key';

export async function getEncryptionKey(): Promise<string> {
  let key = await keytar.getPassword(SERVICE_NAME, ACCOUNT_NAME);
  if (!key) {
    key = randomBytes(32).toString('hex');
    await keytar.setPassword(SERVICE_NAME, ACCOUNT_NAME, key);
  }
  return key;
}
