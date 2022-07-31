import { FileExtension, FileMimeType } from "./global.model"

type FileTypeAccept = {
  [propName in FileMimeType]?: FileExtension[] | string[]
}

/**
 * 下载
 * @param url 目标文件地址
 * @param filename 想要保存的文件名称
 * @param callback 执行的回调函数
 */
export function download(url: string, filename: string, callback?: any): void {
  getBlob(url, function(blob: any) {
    saveBlobAs(blob, filename, callback)
  })
}


/**
 * 将blob保存为
 * @param blob blob
 * @param filename 想要保存的文件名称
 * @param callback 执行的回调函数
 */
export function saveBlobAs(blob: Blob, filename: string, callback: () => any): void {
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // fix Firefox
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(link.href)
  callback && callback()
}

/**
 * 保存为
 * @param content 文件内容
 * @param type 想要保存的文件类型 MIME支持的类型
 * @param filename 想要保存的文件名称
 * @param callback 执行的回调函数
 */
export function saveDataAs(content: any, type: string, filename: string, callback: () => any): void {
  const link = document.createElement('a')
  const blob = new Blob([content], { type: type })

  link.href = window.URL.createObjectURL(blob)
  link.download = filename

  // fix Firefox
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  window.URL.revokeObjectURL(link.href)
  callback && callback()
}

export async function SaveByFilePicker(content: any, accept: FileTypeAccept, filename: string, callback: (status) => any) {
  try {
    const handle = await window.showSaveFilePicker({
      suggestedName: filename,
      types: [
        {
          accept,
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    await callback && callback(true);
    return handle;
  } catch (err: any) {
     console.error(err.name, err.message);
     await callback && callback(false);
     return false;
  }
}

function getBlob(url: string, cb: any): void {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
  xhr.send()
}

function getFile(url: string, cb: any): void {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'arraybuffer'
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
  xhr.send()
}

function getText(url: string, cb: any): void {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'text'
  xhr.onload = function() {
    if (xhr.status === 200) {
      cb(xhr.response)
    }
  }
  xhr.send()
}
