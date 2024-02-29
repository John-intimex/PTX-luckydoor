import { AppId } from '@/sdk/common/SysConst';
const ana = require('@/sdk/common/ApiAndAdminServer');
let env = ana.env;

// 引入外部js或第三方js
export function LoadScript (src, async: boolean = false, id: string = '', site: string = 'body') { // site -> 'head', js在<head>標籤內引入； 'body'，js在<body>標籤內引入
  return new Promise((resolve, reject) => {
    if (!isInclude(src)) {
      const oScript = document.createElement('script');
      oScript.type = 'text/javascript';
      oScript.src = src;

      if (async) {
        oScript.async = true;
      }

      if (id) {
        oScript.id = id;
      }

      switch (site) {
        case 'head':
          document.getElementsByTagName('head')[0].appendChild(oScript);
          break;
        default:
          document.body.appendChild(oScript);
      }

      resolve(true);
    }
  });
}

// 判斷js是否已引入
function isInclude (name) {
  var js = /js$/i.test(name);
  var es = document.getElementsByTagName(js ? 'script' : 'link');
  for (var i = 0; i < es.length; i++) { if (es[i][js ? 'src' : 'href'].indexOf(name) !== -1) return true; }
  return false;
}

// 获取url参数
export function getQueryString (name) {
  // eslint-disable-next-line no-useless-escape
  var result = window.location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
  if (result == null || result.length < 1) {
    return '';
  }
  return result[1];
}

/**
 * 封裝付款方法
 * @param payment: 付款方法code
 * @param orderId: 訂單Id
 * @param type: 訂單類型 （普通購物訂單 => 0, RNPay訂單 => 1）
 */
 export function pay (payment, orderId, type: number = 0) {
  let payStr = type ? '/trans/rnp/' : '/trans/pay/';
  console.log(payment, orderId);
  switch (env) {
    case 'dev':
      window.location.href = 'http://192.168.1.4:8080/pg' + payStr + AppId + '/' + payment + '/' + orderId; // dev
      break;
    case 'uat':
      window.location.href = 'https://pg.uat2.intimex.hk:80/pg-uat' + payStr + AppId + '/' + payment + '/' + orderId; // uat
      break;
    case 'prod':
      window.location.href = 'https://pg.uat2.intimex.hk:80/pg' + payStr + AppId + '/' + payment + '/' + orderId; // prd
      break;
  }
}
