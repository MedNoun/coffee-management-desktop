import { ipcRenderer, contextBridge, app, ipcMain } from 'electron';

//create api for the renderer ( angular app )
contextBridge.exposeInMainWorld('api', {
  send: (channel: string, ...arg: any) => {
    ipcRenderer.send(channel, ...arg);
  },
  sendSync: (channel: string, ...arg: any) => {
    return ipcRenderer.sendSync(channel, ...arg);
  },
  invoke: async (channel: string, ...arg: any) => {
    return await ipcRenderer.invoke(channel, ...arg);
  },
  on: (channel: string, listener: (event: any, ...arg: any) => void) => {
    ipcRenderer.on(channel, listener);
  },
  once: (channel: string, listener: (event: any, ...arg: any) => void) => {
    ipcRenderer.once(channel, listener);
  },
  removeListener: (
    channel: string,
    listener: (event: any, ...arg: any) => void
  ) => {
    ipcRenderer.removeListener(channel, listener);
  },
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
});

console.log('preload.js loaded');
