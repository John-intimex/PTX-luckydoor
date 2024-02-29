import Vue from 'vue';
import App from './App.vue';
import router from './router';
// import Router from 'vue-router';
import store from './store';
// import { setRem } from './rem';
import MetaInfo from 'vue-meta-info';
import Swiper from 'vue-awesome-swiper';
// import { ValidationProvider } from 'vee-validate';
// 引入指令文件
import * as directives from '@/directives/index';
import elLoading from 'element-ui/packages/loading/src/directive';
// require styles
import 'swiper/dist/css/swiper.css';
// 引入css
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/font.css';
// 引进Axios
import axios from 'axios';
import vueAxios from 'vue-axios';
// // 引入多语言
// import VueI18n from 'vue-i18n';
import i18n from '@/lang';

import Auth from './sdk/common/Auth';
import Cookie from 'js-cookie';
import { MapRegion } from './assets/scripts/map-region';
// import { getQueryString } from './assets/scripts/common';
import { disDevices } from './assets/scripts/dis-devices';
import Settings from '@/settings';

import infiniteScroll from 'vue-infinite-scroll';
import 'animate.css';
// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

// 按需引入 Element 組件，减小项目体积，可自行在 element.js 進行修改
import './plugins/element.js';

(() => {
  if (
    navigator.userAgent.indexOf('iPhone') !== -1 ||
    navigator.userAgent.indexOf('Android ') !== -1
  ) {
    Vue.prototype.userAgent = 'mobile';
    return import('@/assets/css/main_m.css');
  } else {
    Vue.prototype.userAgent = 'pc';
    return import('@/assets/css/main.css');
  }
})();
// const originalPush = Router.prototype.push;
// Router.prototype.push = function push (location) {
//   return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
// };
Vue.use(elLoading);
Vue.use(MetaInfo);
Vue.use(Swiper);
Vue.use(infiniteScroll);
//  批量注册全局指令
Object.keys(directives).forEach(k => Vue.directive(k, directives[k]));
// ValidationProvider
// Vue.component('ValidationProvider', ValidationProvider);
// modified file 'node_module/_vue@2.6.10@vue/types/plugin.d.ts'
Vue.use(vueAxios, axios, i18n);
Vue.config.productionTip = false;

// 价格格式化
Vue.filter('PriceFormat', function (value) {
  if (typeof (value) === 'number') {
    return (value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'); // 保留两位小数
    // return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 不保留小数
  }
});

// 區分設備
disDevices();

Auth.GetToken().then(() => {
  import('./init').then(async (result) => {
    Vue.use(result.default as any);

    if (Settings.MapRegion) {
      await MapRegion();
      console.log('区分地区完成');
    }
    // 向後台傳遞前台默認貨幣設置
    let currency = Vue.prototype.$Storage.get('currency') || Settings.defaultCurrency;
    await Vue.prototype.$Api.member.setCurrency(currency).then((result) => {
      Vue.prototype.$Storage.set('currency', currency);
    }).catch((error) => {
      console.log(error);
    });
    // 獲取isPtx全局設置
    await Vue.prototype.$Api.promotion.getHomeSeoData().then((result) => {
      localStorage.setItem('isPtx', result.Data.IsPtx);
    }).catch((error) => {
      console.log(error);
    });
  }).then(result => {
    Vue.prototype.root = new Vue({
      router,
      store,
      i18n,
      async mounted () {
        // 向後台傳遞前台默認語言設置
        let lang = i18n.locale;
        await Vue.prototype.$Api.member.setUILanguage(lang).then((result) => {
          Vue.prototype.$Storage.set('locale', lang);
        }).catch((error) => {
          console.log(error);
        });

        // if (Vue.prototype.userAgent === 'mobile') setRem();
      },
      render: h => h(App)
    }).$mount('#app');
  });
}, () => { });
