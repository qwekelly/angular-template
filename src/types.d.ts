/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  showSaveFilePicker: (a: any) => {
    createWritable: () => {
      write: (b: any) => void;
      close: () => void;
    }
  }
}
