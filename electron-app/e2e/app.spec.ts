import { test, expect, _electron as playwrightElectron } from '@playwright/test';
import path from 'path';
import electron from 'electron';

const electronAppPath = electron as unknown as string;
const appPath = path.join(__dirname, '..', '.webpack', 'main', 'index.js');

test.describe('App tests', () => {
  let electronApp;
  let window;

  test.beforeEach(async () => {
    electronApp = await playwrightElectron.launch({
      executablePath: electronAppPath,
      args: [appPath],
    });
    window = await electronApp.firstWindow();
    await window.waitForLoadState('domcontentloaded');
  });

  test.afterEach(async () => {
    if (electronApp) {
      await electronApp.close();
    }
  });

  test('Login flow', async () => {
    // Mock the IPC calls for login
    await window.evaluate(() => {
      window.electron = {
        ...window.electron,
        login: () => {
          // Simulate the login process
          window.electron.onLoginSuccess();
        },
        onLoginUrl: () => {
          return () => {};
        },
        onLoginSuccess: (callback: () => void) => {
          const listener = () => callback();
          // Directly call the listener to simulate success
          listener();
          return () => {};
        },
      };
    });

    // Click the login button
    await window.click('text=Login with Google');

    // Check if the dashboard is visible
    const dashboard = await window.waitForSelector('text=Dashboard');
    expect(dashboard).toBeTruthy();
  });

  test('Theme switching', async () => {
    // Go to settings
    await window.click('text=Settings');

    // Check if the settings page is visible
    const settings = await window.waitForSelector('text=Theme');
    expect(settings).toBeTruthy();

    // Change theme to dark
    await window.click('text=Dark');

    // Check if the theme is applied
    const html = await window.locator('html');
    await expect(html).toHaveAttribute('class', 'dark');
  });

  test('Navigation', async () => {
    // Go to settings
    await window.click('text=Settings');

    // Check if the settings page is visible
    const settings = await window.waitForSelector('text=Theme');
    expect(settings).toBeTruthy();

    // Go back to dashboard
    await window.click('text=Dashboard');

    // Check if the dashboard is visible
    const dashboard = await window.waitForSelector('text=Dashboard');
    expect(dashboard).toBeTruthy();
  });
});
