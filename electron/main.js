const electron = require('electron');

const { app, Menu, Tray } = electron;
const { BrowserWindow } = electron;

// other
const unhandled = require('electron-unhandled');
const { menubar } = require('menubar');
const { ipcMain } = require('electron-better-ipc');
const logger = require('electron-timber');
const { enforceMacOSAppLocation } = require('electron-util');
const initAutoUpdate = require('update-electron-app');
const windowStateKeeper = require('electron-window-state');

/* ======================= DEBUG ======================= */

require('electron-debug')({ showDevTools: false });

unhandled();

/* ================== Other ==================== */

// const { store } = require('./stores');
const { appUrl, iconPath } = require('./file-urls');
// const { IPC } = require('../src/config/enums');
const windowSizes = require('./config/window-sizes');
const installExtensions = require('./extensions');

const IPC = {
  OPEN_SETTINGS: 'open-settings',
  REFRESH_WEBVIEW: 'refresh-webview',
  QUIT: 'quit',
  RESIZE: 'resize',
};

/* ================== Auto Update ==================== */

initAutoUpdate({
  repo: 'perminder-klair/boomaro-app',
});

/* ================== UTILS ==================== */

const buildMenu = require('./build-menu');
const setWindowSize = require('./set-window-size');

/* ======================= GLOBALS ======================= */

// windows
let composeWindow;
let mainWindow;

// let previousStore = store.getState();
let workAreaSize;
let mainWindowState;

/* ======================= INSTANCE LOCK ======================= */

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    } else {
      createWindow();
    }
  });
}

/* ======================= METHODS ======================= */

const createMenuBar = () => {
  if (!composeWindow) {
    const tray = new Tray(iconPath);
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Compose',
        click: () => {
          composeWindow.showWindow();
        },
      },
      {
        label: 'Messages',
        click: () => {
          createWindow();
        },
      },
      { type: 'separator' },
      {
        role: 'quit',
      },
    ]);
    if (process.platform === 'darwin') {
      tray.on('right-click', () => {
        tray.popUpContextMenu(contextMenu);
      });
    } else {
      tray.setContextMenu(contextMenu);
    }

    let windowPosition;

    // This code block exists because of a bug in the menubar library regarding the tray position
    // Remove this code when this PR is merged https://github.com/maxogden/menubar/issues/233
    if (process.platform === 'win32') {
      const trayBounds = tray.getBounds();
      if (trayBounds.width !== trayBounds.height && trayBounds.y === 0) {
        // top
        windowPosition = 'trayCenter';
      }
      if (trayBounds.width !== trayBounds.height && trayBounds.y > 0) {
        // bottom
        windowPosition = 'trayBottomCenter';
      }
      if (
        trayBounds.width === trayBounds.height &&
        trayBounds.x < trayBounds.y
      ) {
        // left
        windowPosition = 'trayBottomLeft';
      }
      if (
        trayBounds.width === trayBounds.height &&
        trayBounds.x > trayBounds.y
      ) {
        // right
        windowPosition = 'trayBottomRight';
      }
    }

    composeWindow = menubar({
      tray,
      index: appUrl,
      tooltip: 'Boomaro',
      preloadWindow: true,
      showDockIcon: true,
      browserWindow: {
        height: 800,
        width: 1030,
        maxWidth: 1200,
        maxHeight: 1200,
      },
      webPreferences: {
        nodeIntegration: true,
        webviewTag: true,
      },
      windowPosition,
    });
  }
};

const logout = () => {
  const ses = mainWindow.webContents.session;
  ses.clearCache(() => {
    ses.clearStorageData(() => {
      mainWindow.webContents.reload();
      // store.dispatch({ type: 'SET_NIGHT_MODE', payload: false });
      // store.dispatch({ type: 'SET_SETTINGS', payload: false });
      // store.dispatch({ type: 'SET_INITIALIZED', payload: false });
    });
  });
};

const renderMenu = (showAccount = false, showCache = true) => {
  const variables = {
    config: {
      appName: app.getName(),
      showAccount,
      showCache,
    },
    methods: {
      logout,
      openPreferences: () =>
        ipcMain.callRenderer(mainWindow, IPC.OPEN_SETTINGS),
      clearCache: () => {
        // store.dispatch({ type: 'CLEAR_CACHE' });
        logout();
      },
    },
  };

  const menuTemplate = buildMenu(variables);
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

const render = (prevState, nextState) => {
  const { showTweetComposer, isAuthed } = nextState;

  if (isAuthed && showTweetComposer) {
    createMenuBar();
  } else {
    destroyMenuBar();
  }

  renderMenu(isAuthed);
  mainWindow.setResizable(true);
};

const createWindow = () => {
  if (mainWindow) {
    mainWindow.show();
    return;
  }
  const { width, height } = windowSizes.small(workAreaSize);

  mainWindowState = windowStateKeeper({
    defaultWidth: width,
    defaultHeight: height,
  });

  const restoredState = {
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
  };
  // console.log('restoredState', restoredState);

  const windowSize = restoredState;

  mainWindow = new BrowserWindow({
    center: true,
    resizable: true,
    title: 'Boomaro',
    minWidth: 1100,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: true,
      webviewTag: true,
    },
    ...windowSize,
  });

  mainWindow.loadURL(appUrl);
  mainWindowState.manage(mainWindow);

  mainWindow.on('minimize', function(event) {
    // const { minimizeOnClose } = store.getState();
    if (process.platform === 'darwin') {
      // && minimizeOnClose
      event.preventDefault();
      mainWindow.hide();
    }
  });

  mainWindow.on('close', function(event) {
    if (app.isQuiting) {
      mainWindow = null;
      return false;
    }

    // const { minimizeOnClose } = store.getState();
    if (process.platform === 'darwin') {
      //  && minimizeOnClose
      event.preventDefault();
      mainWindow.hide();
    } else {
      mainWindow = null;
    }
  });
};

const destroyMenuBar = () => {
  if (composeWindow) {
    composeWindow.window.setMenu(null);
    composeWindow.window.close();
    composeWindow.tray.destroy();
    composeWindow = null;
  }
};

const setWorkAreaSize = () =>
  (workAreaSize = electron.screen.getPrimaryDisplay().workAreaSize);

const onResize = data => {
  const { isSmall } = data;
  setWindowSize(isSmall ? 'large' : 'small', mainWindow, workAreaSize);
  return true;
};

const setupListeners = () => {
  ipcMain.answerRenderer(IPC.QUIT, app.quit);
  ipcMain.answerRenderer(IPC.RESIZE, onResize);
};

/* ================== APP EVENTS ==================== */

// const subscribeToStore = () => {
//   store.subscribe(() => {
//     const nextState = store.getState();
//     render(previousStore, nextState);
//     previousStore = { ...nextState };
//   });
// };

app.on('ready', () => {
  app.setAppUserModelId('co.zeiq.boomaro');
  enforceMacOSAppLocation();
  setWorkAreaSize();
  createWindow();
  renderMenu(false, true);
  setupListeners();
  // subscribeToStore();
  installExtensions();
});

app.on('before-quit', () => {
  logger.log('Before quitting...');
  app.isQuiting = true;
  if (mainWindow && mainWindow.webContents && mainWindow.webContents.session) {
    const { session } = mainWindow.webContents;
    if (session) {
      session.cookies.flushStore(() => {
        session.flushStorageData();
      });
    }
  }
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  logger.log('on activate');
  if (mainWindow === null) {
    createWindow();
  } else {
    mainWindow.show();
  }
});
