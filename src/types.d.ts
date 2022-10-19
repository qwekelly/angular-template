/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface Window {
  showSaveFilePicker (a: any) : FileSystemFileHandle
}

interface FileSystemFileHandle {
  createWritable: () => {
    write: (b: any) => void;
    close: () => void;
  }
}

interface Date {
  Format (fmt: string): string
}
