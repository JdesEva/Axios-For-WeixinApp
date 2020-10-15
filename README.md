# axios-for-mpweixin

> Axios 微信小程序版本

## API 文档

- 使用方法

微信小程序根目录执行以下命令

```
npm i axios-for-mpweixin
```

然后使用微信开发者工具进行构建


> 在 App.js 中
```
const { axios } = require('axios-for-mpweixin')

wx.axios = axios() // 必须调用 axios 才能实例化成功
```
> 在其他页面中
```
Page({
  onLoad(options) {
    wx.axios.get('xxxxx').then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
})
```

## 全局配置

- 实例化参数列表

> - loading  —— Loading 文字，存在此项则会开启请求 Loading
> - baseUrl  —— API 接口地址前缀链接，作用和 axios.js 中一样
> - loadingAwait  —— Loading 响应延迟，即如果开启 Loading 后，必须接口请求的 pendding 时间大于该时间才会显示 Loading，以获得更好的用户体验
> - loadingMask  —— wx.showLoading 的 mask 层的显示隐藏
> - timeout  —— 接口超时时间

- 默认值

> - @param loading = 'Loading...'
> - @param baseUrl = ''
> - @param loadingAwait = 800 // 单位 ms
> - @param loadingMask = true
> - @param timeout = 0 // 单位 ms (0 代表默认值，即不设置超时时间)

```
const { axios } = require('axios-for-mpweixin')

wx.axios = axios({
  timeout: 30000,
  loadingAwait: 800
})
```

- 方法列表

### axios.get

使用方法基本同 axios.js 中的 get 方法

参数列表为

 * @param {String} api —— API 地址
 * @param {Object} data —— 请求数据
 * @param {String} loading —— Loading 文字，优先级比实例化传入的loading的高
 * @param {Object} opt —— 请求附加参数，最终会被合并进 wx.request 中

### axios.post

使用方法基本同 axios.js 中的 post 方法

参数列表为

 * @param {String} api —— API 地址
 * @param {Object} data —— 请求数据
 * @param {String} loading —— Loading 文字，优先级比实例化传入的loading的高
 * @param {Object} opt —— 请求附加参数，最终会被合并进 wx.request 中

### axios.all

执行并发请求，全部请求成功才会进入成功的回调，有任何一个错误均会进入catch回调

原理为  Promise.all

具体可以参考 axios.js 文档

### axios.race

执行并发请求，任何一个请求返回后就会进入成功的回调

原理为  Promise.race

具体可以参考 axios.js 文档

### axios.spread

并发请求中使用，对返回结果进行展开，具体可以参考 axios.js 文档


## 拦截器 interceptors

> 分为 request 和 response 拦截器

使用方法和 axios.js 拦截器完全一样，具体可以参考 axios.js
