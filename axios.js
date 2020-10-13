
/**
 * Axios 实体类 
 * @param options 实例参数 支持 Loading baseUrl loadingAwait loadingMask
 * @param get GET请求方法
 * @param post POST请求方法
 * @param all 并发请求 Promise.all
 * @param race 并发  Promise.race
 */
class Axios {
  constructor(options) {
    this.loading = options.loading || 'Loading...'
    this.baseUrl = options.baseUrl || ''
    this.loadingAwait = options.loadingAwait || 800
    this.loadingMask = options.loadingMask || true
    this.timeout = options.timeout || 0
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    }
  }

  /**
   * 
   * @param {String} api —— API 地址
   * @param {Object} data —— 请求数据 
   * @param {String} loading —— Loading 文字，优先级比实例化传入的loading的高
   * @param {Object} opt —— 请求附加参数，最终会被合并进 wx.request 中
   */
  get(api, data = {}, loading = '', opt = {}) {
    return wxRequest(this, 'GET', loading ? loading : this.loading, api, data, opt)
  }

  /**
   * 
   * @param {String} api —— API 地址
   * @param {Object} data —— 请求数据 
   * @param {String} loading —— Loading 文字，优先级比实例化传入的loading的高
   * @param {Object} opt —— 请求附加参数，最终会被合并进 wx.request 中
   */
  post(api, data = {}, loading = '', opt = {}) {
    return wxRequest(this, 'POST', loading ? loading : this.loading, api, data, opt)
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
 * @param {String} loading 加载文字
 * @param {String} api 接口地址
 * @param {Object} data 请求体
 * @param {Object} opt 附加参数
 */
function wxRequest(ref, type, loading = '', api, data = {}, opt = {}) {
  const { request, response } = ref.interceptors // 拦截器
  let config = { // 请求配置项
    header: {},
    timeout: ref.timeout || 0,
    dataType: 'json',
    responseType: 'text',
    enableHttp2: false,
    enableQuic: false,
    enableCache: false,
    ...opt
  }
  let timer = null // 请求Loading 延迟

  return new Promise((resolve, reject) => {
    if (loading) {
      // 下面的作用是在极短的 pendding 内不显示 Loading 以获得更好的用户体验
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        wx.showLoading({
          title: loading,
          mask: ref.loadingMask
        })
      }, ref.loadingAwait)
    }
    console.log(ref)
    if (request.handlers.length > 0) config = request.handlers[0].call(this, config) // request 拦截器
    wx.request({
      url: `${ref.baseUrl}${api}`,
      method: type,
      data: data,
      ...config,
      success: res => {
        if (timer) clearTimeout(timer)
        if (response.handlers.length > 0) {
          resolve(response.handlers[0].call(this, res) || {})
        } else {
          resolve(res)
        }
      },
      fail: err => {
        if (response.handlers.length > 1) {
          reject(response.handlers[1].call(this, err))
        } else {
          reject(err)
        }
      },
      complete: () => {
        if (loading) wx.hideLoading()
      }
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
  axios
}