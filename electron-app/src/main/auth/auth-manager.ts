import { setTokens } from '../storage/settings';

const { Issuer } = require('openid-client');

let code_verifier: string;

export function setCodeVerifier(verifier: string) {
  code_verifier = verifier;
}

export async function getGoogleClient() {
  const googleIssuer = await Issuer.discover('https://accounts.google.com');

  const client = new googleIssuer.Client({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    client_secret: 'YOUR_GOOGLE_CLIENT_SECRET',
    redirect_uris: ['http://localhost:9000/callback'],
    response_types: ['code'],
  });

  return client;
}

export async function handleCallback(url: string) {
  const client = await getGoogleClient();
  const params = client.callbackParams(url);
  const tokenSet = await client.callback(
    'http://localhost:9000/callback',
    params,
    { code_verifier }
  );
  setTokens(tokenSet);
  return tokenSet;
}
