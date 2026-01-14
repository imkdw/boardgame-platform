import { app, BrowserWindow, screen, session } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const KIOSK_WIDTH = 1080;
const KIOSK_HEIGHT = 1920;
const IS_DEV = process.env.NODE_ENV === 'development';
const rawScale = parseFloat(process.env.KIOSK_SCALE || '1.3');
const KIOSK_SCALE = Number.isNaN(rawScale) ? 1.3 : Math.max(0.5, Math.min(2.0, rawScale));

const createWindow = (): void => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  const scale = IS_DEV ? Math.min(screenWidth / KIOSK_WIDTH, (screenHeight - 100) / KIOSK_HEIGHT, 0.5) : 1;
  const windowWidth = Math.floor(KIOSK_WIDTH * scale);
  const windowHeight = Math.floor(KIOSK_HEIGHT * scale);

  const mainWindow = new BrowserWindow({
    width: IS_DEV ? windowWidth : KIOSK_WIDTH,
    height: IS_DEV ? windowHeight : KIOSK_HEIGHT,
    kiosk: !IS_DEV,
    fullscreen: !IS_DEV,
    frame: IS_DEV,
    resizable: IS_DEV,
    center: true,
    closable: true,
    alwaysOnTop: !IS_DEV,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.setBackgroundColor('#f8fafc');
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  const shouldApplyScale = !IS_DEV || process.env.KIOSK_SCALE_DEV === 'true';
  if (shouldApplyScale && KIOSK_SCALE !== 1) {
    mainWindow.webContents.on('did-finish-load', () => {
      mainWindow.webContents.setZoomFactor(KIOSK_SCALE);
    });
  }

  if (IS_DEV) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://') && !url.includes('localhost')) {
      event.preventDefault();
    }
  });
};

app.on('ready', () => {
  // CSP 설정 - API 연결 및 외부 이미지 허용
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data:; img-src 'self' data: https:; connect-src 'self' ws: wss: http: https:;",
        ],
      },
    });
  });

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
