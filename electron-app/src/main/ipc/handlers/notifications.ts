import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { showNotification } from '../../app/notifications';

export function registerNotificationHandlers() {
  ipcMain.on(
    IPC_CHANNELS.SHOW_NOTIFICATION,
    (_, { title, body }: { title: string; body: string }) => {
      showNotification(title, body);
    }
  );
}
