/* SystemJS module definition */
declare const nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
interface Window {
  process: any;
  require: any;
  api: {
    send: (channel: string, ...arg: any) => void;
    sendSync: (channel: string, ...arg: any) => any;
    on: (channel: string, listener: (event: any, ...arg: any) => void) => void;
    once: (
      channel: string,
      listener: (event: any, ...arg: any) => void
    ) => void;
    removeListener: (
      channel: string,
      listener: (event: any, arg: any) => void
    ) => void;
    removeAllListeners: (channel: string) => void;
    invoke: (channe: string, ...arg: any) => any;
  };
}
