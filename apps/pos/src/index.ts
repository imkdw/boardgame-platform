import { app, BrowserWindow, screen, session } from 'electron';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// POS 화면 크기 (일반적인 터치 모니터 기준)
const POS_WIDTH = 1920;
const POS_HEIGHT = 1080;
const IS_DEV = process.env.NODE_ENV === 'development';

const createWindow = (): void => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;

  // 개발 모드에서는 화면 크기에 맞게 스케일 조정
  const scale = IS_DEV ? Math.min(screenWidth / POS_WIDTH, (screenHeight - 100) / POS_HEIGHT, 0.7) : 1;
  const windowWidth = Math.floor(POS_WIDTH * scale);
  const windowHeight = Math.floor(POS_HEIGHT * scale);

  const mainWindow = new BrowserWindow({
    width: IS_DEV ? windowWidth : POS_WIDTH,
    height: IS_DEV ? windowHeight : POS_HEIGHT,
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

  if (IS_DEV) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }

  // 외부 URL 접근 방지
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url.startsWith('file://') && !url.includes('localhost')) {
      event.preventDefault();
    }
  });
};

app.on('ready', () => {
  // CSP 설정 - 외부 이미지 허용
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

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
