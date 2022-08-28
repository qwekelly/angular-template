// 前端生成唯一id


export function getClientIdByRandom(len: number) {
  return randomString(len);
}

const randomString = (len: number) => {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  var maxPos = chars.length
  var pwd = ''
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

export default {
  getClientIdByRandom
}