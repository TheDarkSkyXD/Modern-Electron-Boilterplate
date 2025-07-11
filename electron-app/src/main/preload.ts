// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS } from './ipc/channels';

contextBridge.exposeInMainWorld('electron', {
  getTheme: () => ipcRenderer.invoke(IPC_CHANNELS.GET_THEME),
  setTheme: (theme: 'light' | 'dark' | 'system') =>
    ipcRenderer.send(IPC_CHANNELS.SET_THEME, theme),
  login: () => ipcRenderer.send(IPC_CHANNELS.LOGIN),
  onLoginUrl: (callback: (url: string) => void) => {
    const listener = (_: any, url: string) => callback(url);
    ipcRenderer.on('login-url', listener);
    return () => {
      ipcRenderer.removeListener('login-url', listener);
    };
  },
  onLoginSuccess: (callback: () => void) => {
    const listener = () => callback();
    ipcRenderer.on(IPC_CHANNELS.LOGIN_SUCCESS, listener);
    return () => {
      ipcRenderer.removeListener(IPC_CHANNELS.LOGIN_SUCCESS, listener);
    };
  },
  openExternal: (url: string) => ipcRenderer.send('open-external', url),
  showNotification: (title: string, body: string) =>
    ipcRenderer.send(IPC_CHANNELS.SHOW_NOTIFICATION, { title, body }),
});
