import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { getTheme, setTheme } from '../../storage/settings';

export function registerSettingsHandlers() {
  ipcMain.handle(IPC_CHANNELS.GET_THEME, () => {
    return getTheme();
  });

  ipcMain.on(
    IPC_CHANNELS.SET_THEME,
    (_, theme: 'light' | 'dark' | 'system') => {
      setTheme(theme);
    }
  );
}
