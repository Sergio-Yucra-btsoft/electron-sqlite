const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Database = require('better-sqlite3');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
ipcMain.handle("get-tests", () => {
  const db = new Database("./testdb.db");
  const stmt = db.prepare("SELECT * FROM test");
  const rows = stmt.all();
  db.close();
  return rows;
});
