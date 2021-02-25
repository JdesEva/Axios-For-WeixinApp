# axios-for-mpweixin

> Axios 小程序版本

## ChangeLog 更新日志

- 尝试兼容支付宝小程序

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

## 全局配置列表

| 参数名       | 类型    | 默认值       | 说明                                                                                                |
| ------------ | ------- | ------------ | --------------------------------------------------------------------------------------------------- |
| loading      | String  | 'Loading...' | wx.showLoading 的 titile， 存在此项则会开启请求 Loading                                             |
| baseUrl      | String  | ''           | wx.request 中 url 的前缀拼接，作用和 axios.js 中 baseURL 一样                                       |
| loadingAwait | Number  | 800(ms)      | 即如果开启 Loading 后，必须接口请求的 pendding 时间大于该时间才会显示 Loading，以获得更好的用户体验 |
| loadingMask  | Boolean | true         | wx.showLoading 的 mask 属性，控制遮罩层                                                             |
| timeout      | Number  | 0            | wx.request 的 timeout 属性，代表接口超时时间，0 代表不设置                                          |

```
const { axios } = require('axios-for-mpweixin')

wx.axios = axios({
  timeout: 30000,
  loadingAwait: 800
})
```

## 方法列表

### axios.get

使用方法基本同 axios.js 中的 get 方法

```
wx.axios.get(url[, data[, config]])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| data   | Object | {}     | wx.request 中的 data，无论何种形式的请求，请保证请求体均为一个对象                                                       |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.post

使用方法基本同 axios.js 中的 post 方法

```
wx.axios.post(url[, data[, config]])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| data   | Object | {}     | wx.request 中的 data，无论何种形式的请求，请保证请求体均为一个对象                                                       |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.delete

使用方法基本同 axios.js 中的 delete 方法

```
wx.axios.delete(url[, config])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.options

使用方法基本同 axios.js 中的 options 方法

```
wx.axios.options(url[, config])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.head

使用方法基本同 axios.js 中的 head 方法

```
wx.axios.head(url[, config])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.put

使用方法基本同 axios.js 中的 put 方法

```
wx.axios.put(url[, data[, config]])
```

| 参数名 | 类型   | 默认值 | 说明                                                                                                                     |
| ------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------ |
| url    | String | ''     | API 地址， 即 wx.request 的 url，注意，该属性会拼接全局设置的 baseUrl，同时，如果 opt 中设置了 baseUrl， 则以 opt 中为准 |
| data   | Object | {}     | wx.request 中的 data，无论何种形式的请求，请保证请求体均为一个对象                                                       |
| config | Object | {}     | 接口独享的额外配置参数，和 axios.js 一样，优先级最高，最终会被合并进 wx.request 中                                       |

### axios.all

执行并发请求，全部请求成功才会进入成功的回调，有任何一个错误均会进入 catch 回调

```
let v1 = wx.axios.get(api1)
let v2 = wx.axios.get(api2)
wx.axios.all([v1, v2]).then(([r1, r2]) => {
  console.log(r1, r2)
})

```

原理为 Promise.all

具体可以参考 axios.js 文档

### axios.race

执行并发请求，任何一个请求返回后就会进入成功的回调

> 即无论有多少个请求发出，只会收到第一个返回成功的请求，其他请求返回结果全部丢弃

```
let v1 = wx.axios.get(api1)
let v2 = wx.axios.get(api2)
wx.axios.all([v1, v2]).then(([r]) => {
  console.log(r1)
})

```

原理为 Promise.race

具体可以参考 axios.js 文档

### axios.spread

并发请求中使用，对返回结果进行展开，具体可以参考 axios.js 文档

```
let v1 = wx.axios.get(api1)
let v2 = wx.axios.get(api2)
wx.axios.all([v1, v2]).then(wx.axios.spread((r1, r2) => {
  console.log(r1, r2)
}))

```

## 拦截器 interceptors

> 分为 request 和 response 拦截器

使用方法和 axios.js 拦截器完全一样，具体可以参考 axios.js
