export interface IElectronAPI {
  getTheme: () => Promise<'light' | 'dark' | 'system'>;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  login: () => void;
  onLoginUrl: (callback: (url: string) => void) => () => void;
  onLoginSuccess: (callback: () => void) => () => void;
  openExternal: (url: string) => void;
  showNotification: (title: string, body: string) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}
