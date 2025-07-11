import { ipcMain } from 'electron';
import { IPC_CHANNELS } from '../channels';
import { registerSettingsHandlers } from './settings';
import { getTheme, setTheme } from '../../storage/settings';

jest.mock('electron', () => ({
  ipcMain: {
    handle: jest.fn(),
    on: jest.fn(),
  },
}));

jest.mock('../../storage/settings', () => ({
  getTheme: jest.fn(),
  setTheme: jest.fn(),
}));

describe('Settings IPC Handlers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register handlers', () => {
    registerSettingsHandlers();
    expect(ipcMain.handle).toHaveBeenCalledWith(
      IPC_CHANNELS.GET_THEME,
      expect.any(Function)
    );
    expect(ipcMain.on).toHaveBeenCalledWith(
      IPC_CHANNELS.SET_THEME,
      expect.any(Function)
    );
  });

  it('GET_THEME handler should call getTheme', async () => {
    (getTheme as jest.Mock).mockReturnValue('dark');
    registerSettingsHandlers();
    const handler = (ipcMain.handle as jest.Mock).mock.calls[0][1];
    const theme = await handler();
    expect(getTheme).toHaveBeenCalled();
    expect(theme).toBe('dark');
  });

  it('SET_THEME handler should call setTheme', () => {
    registerSettingsHandlers();
    const handler = (ipcMain.on as jest.Mock).mock.calls[0][1];
    handler(null, 'light');
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
