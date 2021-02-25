/**
 * Axios 实体类
 * @param options 实例参数 支持 Loading baseUrl loadingAwait loadingMask
 * @param get GET请求方法
 * @param post POST请求方法
 * @param all 并发请求 Promise.all
 * @param race 并发  Promise.race
 */


/**
 * 兼容支付宝小程序
 *
 * wx = wx || my
 */

const wx = wx || my

class Axios {
  constructor(options) {
    this.loading = options.loading || 'Loading...'
    this.baseUrl = options.baseUrl || ''
    this.loadingAwait = options.loadingAwait || 800
    this.loadingMask = options.loadingMask || true
    this.timeout = options.timeout || 0
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }

  /**
   * GET请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.get(api[, data, config])
   */
  get(url, ...args) {
    return wxRequest(this, 'GET', url, args[0] || {}, args[1] || {})
  }

  /**
   * POST请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.post(url[, data[, config]])
   */
  post(url, ...args) {
    return wxRequest(this, 'POST', url, args[0] || {}, args[1] || {})
  }

  /**
   * DELETE请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.delete(url[, config])
   */
  delete(url, ...args) {
    return wxRequest(this, 'DELETE', url, args[0] || {}, args[1] || {})
  }

  /**
   * OPTIONS请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.options(url[, data[, config]])
   */
  options(url, ...args) {
    return wxRequest(this, 'OPTIONS', url, args[0] || {}, args[1] || {})
  }

  /**
   * HEAD请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.head(url[, data[, config]])
   */
  head(url, ...args) {
    return wxRequest(this, 'HEAD', url, args[0] || {}, args[1] || {})
  }

  /**
   * PUT请求
   * @param {String} url —— API 地址
   * @param {Object} args —— 参数列表， 如下格式
   * axios.put(url[, data[, config]])
   */
  put(url, ...args) {
    return wxRequest(this, 'PUT', url, args[0] || {}, args[1] || {})
  }

  /**
   * 并发请求
   * @param {Array<Promise>} promises 请求列表
   */
  all(promises) {
    return Promise.all(promises)
  }

  /**
   * 并发请求
   * @param {Array<Promise>} promises 请求列表
   */
  race(promises) {
    return Promise.race(promises)
  }

  /**
   * 回调函数展开
   * @param {Array<Function>} callback 回调函数列表
   */
  spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr)
    }
  }
}

/**
 * 公共请求方法
 * @param {String} type 请求方式
 * @param {String} api 接口地址
 * @param {Object} data 请求体
 * @param {Object} options 附加参数
 */
function wxRequest(ref, type, api, data = {}, options) {
  const { request, response } = ref.interceptors // 拦截器
  let config = {
    // 请求配置项
    header: {},
    timeout: ref.timeout || 0,
    dataType: 'json',
    responseType: 'text',
    enableHttp2: false,
    enableQuic: false,
    enableCache: false,
    baseUrl: ref.baseUrl,
    loading: ref.loading,
    loadingAwait: ref.loadingAwait,
    loadingMask: ref.loadingMask,
    data: data,
  }

  let timer = null // 请求Loading 延迟

  return new Promise((resolve, reject) => {
    if (request.handlers.length > 0) {
      config = request.handlers[0].call(this, config) // request 拦截器
    }

    let header = {
      ...config.header,
      ...options.header,
    }

    Reflect.deleteProperty(config, 'header')
    Reflect.deleteProperty(options, 'header')

    config = {
      ...config,
      ...options,
      header,
    }

    if (config.loading) {
      // 下面的作用是在极短的 pendding 内不显示 Loading 以获得更好的用户体验
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        wx.showLoading({
          title: config.loading,
          mask: config.loadingMask,
        })
      }, config.loadingAwait)
    }

    wx.request({
      url: `${config.baseUrl}${api}`,
      method: type,
      data: data,
      ...config,
      success: (res) => {
        if (timer) clearTimeout(timer)
        if (response.handlers.length > 0) {
          resolve(
            response.handlers[0].call(this, {
              ...res,
              header: { ...res.header, ...header },
              config: config,
            }) || {}
          )
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        if (response.handlers.length > 1) {
          reject(response.handlers[1].call(this, err))
        } else {
          reject(err)
        }
      },
      complete: () => {
        if (config.loading) wx.hideLoading()
        config = null
        header = null
        timer = null
      },
    })
  })
}

/**
 * 拦截器
 */
function InterceptorManager() {
  this.handlers = []
}

/**
 * 拦截器方法
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push(fulfilled, rejected)
}

/**
 * 初始化Axios
 * @param {Object} defaults Axios 实例化参数
 */
const axios = function (defaults = {}) {
  return new Axios(defaults)
}

module.exports = {
  axios,
}
