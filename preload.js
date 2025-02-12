const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getTests: () => ipcRenderer.invoke('get-tests'),
});
