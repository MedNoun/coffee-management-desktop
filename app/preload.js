"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
//create api for the renderer ( angular app )
electron_1.contextBridge.exposeInMainWorld('api', {
    send: (channel, ...arg) => {
        electron_1.ipcRenderer.send(channel, ...arg);
    },
    sendSync: (channel, ...arg) => {
        return electron_1.ipcRenderer.sendSync(channel, ...arg);
    },
    invoke: (channel, ...arg) => __awaiter(void 0, void 0, void 0, function* () {
        return yield electron_1.ipcRenderer.invoke(channel, ...arg);
    }),
    on: (channel, listener) => {
        electron_1.ipcRenderer.on(channel, listener);
    },
    once: (channel, listener) => {
        electron_1.ipcRenderer.once(channel, listener);
    },
    removeListener: (channel, listener) => {
        electron_1.ipcRenderer.removeListener(channel, listener);
    },
    removeAllListeners: (channel) => {
        electron_1.ipcRenderer.removeAllListeners(channel);
    },
});
console.log('preload.js loaded');
//# sourceMappingURL=preload.js.map