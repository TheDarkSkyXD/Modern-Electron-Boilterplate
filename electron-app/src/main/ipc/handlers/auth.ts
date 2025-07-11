import { ipcMain, shell } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { getGoogleClient, setCodeVerifier } from '../../auth/auth-manager';
const { Issuer } = require('openid-client');

export function registerAuthHandlers() {
  ipcMain.on(IPC_CHANNELS.LOGIN, async (event) => {
    const client = await getGoogleClient();
    const verifier = Issuer.generators.codeVerifier();
    setCodeVerifier(verifier);
    const code_challenge = Issuer.generators.codeChallenge(verifier);

    const authUrl = client.authorizationUrl({
      scope: 'openid email profile',
      code_challenge,
      code_challenge_method: 'S256',
    });

    event.sender.send('login-url', authUrl);
  });

  ipcMain.on('open-external', (_, url: string) => {
    shell.openExternal(url);
  });
}
