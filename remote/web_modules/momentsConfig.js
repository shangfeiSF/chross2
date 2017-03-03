module.exports = {
  moments: [
    'onBeforeRequest',  // 当请求即将发出时
    'onBeforeSendHeaders',   // 当请求即将发出，初始标头已经准备好时
    'onSendHeaders',  // 标头发送至网络前时
    'onHeadersReceived',  // 接收到 HTTP(S) 响应标头时
    'onBeforeRedirect',  // 当重定向即将执行时
    'onResponseStarted',  // 当接收到响应正文的第一个字节时
    'onCompleted',  // 当请求成功处理后
    'onErrorOccurred'  // 当请求不能成功处理时
  ],

  alias: {
    brq: 'onBeforeRequest',
    bsh: 'onBeforeSendHeaders',
    sh: 'onSendHeaders',
    hr: 'onHeadersReceived',
    brd: 'onBeforeRedirect',
    rs: 'onResponseStarted',
    c: 'onCompleted',
    eo: 'onErrorOccurred'
  },
}