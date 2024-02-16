import Vue from 'vue';
import i18n from '@/lang';
import { LoadScript } from './common';

export function MapRegion () {
  return new Promise((resolve, reject) => {
    let IP = localStorage.getItem('IP') || '';
    let AreaCode = localStorage.getItem('AreaCode') || '';
    let OIP = sessionStorage.getItem('IP') || '';

    if (!OIP || IP !== OIP) {
      sessionStorage.setItem('IP', IP);

      console.log('后台判断加载js');

      GetIPAddressInfo(IP).then(result => {
        AreaCode = result && result.AreaCode ? result.AreaCode : 'HK';
        let Lang = result && result.Lang ? result.Lang : 'E';

        localStorage.setItem('AreaCode', AreaCode);

        Promise.all([MapScript(AreaCode), setUILanguage(Lang)]).then((result) => {
          console.log('加载完成');
          resolve(true);
        });
      });
    } else {
      console.log('直接加载js');
      Promise.all([MapScript(AreaCode), setUILanguage()]).then((result) => {
        console.log('加载完成');
        resolve(true);
      });
    }
  });
}

// 获取地区区分加载信息
async function GetIPAddressInfo (IP) {
  let obj = await Vue.prototype.$Api.ipAddress.GetIPAddressInfo(IP).then(result => {
    return result;
  }).catch((error) => {
    console.log(error, 'error');
    alert(error);
  });

  return obj;
}

// 加载不同js（ 中国内陆 / 非中国内陆 ）
function MapScript (AreaCode) {
  if (AreaCode === 'CN') {
    console.log('加载中国内陆CDN');
  } else {
    console.log('加载非中国内陆CDN');
    LoadScript('https://www.googletagmanager.com/gtag/js?id=UA-112599686-1', true, '', 'head');
    LoadScript('https://connect.facebook.net/zh_HK/sdk.js#xfbml=1&version=v3.0', false, 'facebook-jssdk', 'head');
  }
}

// 设置语言
async function setUILanguage (AreaLang: string = '') {
  let lang = AreaLang || Vue.prototype.$Storage.get('locale') || 'E';
  i18n.locale = lang;
  console.log(lang, '设置地区语言');
  // await Vue.prototype.$Api.member.setUILanguage(lang).then((result) => {
  //   if (result.Succeeded) {
  //     i18n.locale = lang;
  //     Vue.prototype.$Storage.set('locale', lang);

  //     console.log(lang, '设置语言');
  //   } else {
  //     console.log(result.Message, 'error');
  //     alert(result.Message);
  //   }
  // });
}
