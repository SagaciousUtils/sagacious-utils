import cuid from 'cuid'

interface RandomTree {
  key: number
  value: string
  children: RandomTree[]
}

interface GenerateRandomTreeConfig {
  // children最大长度
  childrenMaxLen: number
  // 保证一定生成指定深度
  isPromiseDeepLen: boolean
}

/**
 * 生成一个最大深度为N的随机树数组
 *
 * @export
 * @param {number} deepLen 最大深度
 * @param {GenerateRandomTreeConfig} [config={
 *   childrenMaxLen: 20
 *   isPromiseDeepLen: false
 * }] 随机数配置
 * @returns 生成后的随机数数组
 */
export const generateRandomTree = (function () {
  var keys = 0
  return function (deepLen: number, config: GenerateRandomTreeConfig = {
    childrenMaxLen: 20,
    isPromiseDeepLen: false
  }) {
    var res: RandomTree[] = []
    if (!deepLen) return res
    var len = Math.floor(Math.random() * config.childrenMaxLen)
    if (config.isPromiseDeepLen && !len) len = Math.floor(Math.random() * (config.childrenMaxLen - 1) + 1)
    for (var i = 0; i < len; i++) {
      var o: RandomTree = {
        key: keys++,
        value: cuid(),
        children: generateRandomTree(deepLen - 1)
      }
      res.push(o)
    }
    return res
  }
})()
