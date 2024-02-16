import Vue from 'vue';
import Router from 'vue-router';
import storage from './sdk/common/Storage';
import i18n from '@/lang';
// import Auth from './sdk/common/Auth';
// import lang from './lang/index';
// import Home from './views/Home.vue';
// let userAgent:string = '';
// if (navigator.userAgent.indexOf('iPhone') !== -1 || navigator.userAgent.indexOf('Android ') !== -1) {
//   userAgent = 'mobile';
// } else {
//   userAgent = 'pc';
// }
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return (originalPush.call(this, location) as any).catch(err => { console.log(err); });
};
export const pRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ './platform/pc/index.vue'),
    meta: {
      title: 'style3主页'
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './views/pc/InsHome.vue')
      },
      {
        path: '/cms/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "product" */ './components/service/InsNotFound.vue')
      },
      {
        path: '/building',
        name: 'building',
        component: () =>
          import(/* webpackChunkName: "product" */ './components/service/InsBuilding.vue')
      },
      {
        path: '/product/detail/:id',
        name: 'ProductsDetail',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductDetail.vue')
      },
      {
        path: '/product/search/:key',
        name: 'productSearch',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductSearchN.vue'),
        props: (route) => ({
          attrs: route.query.attrs,
          catalogs: route.query.catalogs,
          type: route.query.type
        }),
        meta: {
          title: 'Product'
        }
      },
      {
        path: '/product/cat/:catId?',
        name: 'product',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/pc/InsProductCat.vue')
      },
      {
        path: '/cms/content/:id',
        name: 'cmsContent',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/pc/cms/InsCmsContent.vue'
          )
      },
      {
        path: '/cms/contentN/:id',
        name: 'cmsContentN',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/pc/cms/InsCmsContentN.vue'
          )
      },
      {
        path: '/cms/catDetail/:id',
        name: 'catDetail',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/pc/cms/InsCatDetail.vue'
          )
      },
      {
        path: '/cms/search/:key',
        name: 'cmsSearch',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './views/pc/CmsSearch.vue'
          )
      },
      {
        path: '/account/login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/registerSuccess',
        name: 'registerSuccess',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsRegisterSuccess.vue'
          )
      },
      {
        // 个人中心
        path: '/account',
        name: 'memberCenter',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMemberCenter.vue'
          ),
          children: [{
            // 个人信息
            path: 'memberInfo',
            name: 'memberInfo',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
            import(
              /* webpackChunkName: "account" */ './components/business/pc/account/InsMemberInfo.vue'
            )
          },
          {
            path: 'modifyPassword',
            name: 'modifyPassword',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsModifyPassword.vue'
              )
          },
          {
            path: 'deliveryAddress',
            name: 'deliveryAddress',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsDeliveryAddress.vue'
              )
          },
          {
            path: 'message',
            name: 'message',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsMessage.vue'
              )
          },
          {
            path: 'ptxorder',
            name: 'ptxorder',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsPtxOrder.vue'
              )
          },
          {
            path: 'ptxupload',
            name: 'ptxupload',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/pc/account/InsPtxUpload.vue'
              )
          },
          {
            path: 'CaseList/:id',
            name: 'CaseList',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/List/InsCaseList.vue'
              )
          },
          {
            path: 'BuyOrderDetail/:id/:type',
            name: 'BuyOrderDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsBuyOrderDetail.vue'
              )
          },
          {
            path: 'DeliveryDetail/:id/:type',
            name: 'DeliveryDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsDeliveryDetail.vue'
              )
          },
          {
            path: 'DeliveryOrderDetail/:id',
            name: 'DeliveryOrderDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsDeliveryOrderDetail.vue'
              )
          },
          {
            path: 'EnquiryDetail/:id/:type',
            name: 'EnquiryDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsEnquiryDetail.vue'
              )
          },
          {
            path: 'InviceInfoDetail/:id/:type',
            name: 'InviceInfoDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsInviceInfoDetail.vue'
              )
          },
          {
            path: 'PackingDetail/:id/:type',
            name: 'PackingDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsPackingDetail.vue'
              )
          },
          {
            path: 'QuotaDetail/:id/:type',
            name: 'QuotaDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Detail/InsQuotaDetail.vue'
              )
          }
        ]
      },
      {
        path: '/account/QuotaPrinting/:id/:type',
        name: 'QuotaPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Print/InsQuotaPrinting.vue'
          )
      },
      {
        path: '/account/BuyOrderPrinting/:id/:type',
        name: 'BuyOrderPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Print/InsBuyOrderPrinting.vue'
          )
      },
      {
        path: '/account/InviceInfoPrinting/:id/:type',
        name: 'InviceInfoPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Print/InsInviceInfoPrinting.vue'
          )
      },
      {
        path: '/account/DeliveryPrinting/:id/:type',
        name: 'DeliveryPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Print/InsDeliveryPrinting.vue'
          )
      },
      {
        path: '/account/PackingPrinting/:id/:type',
        name: 'PackingPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/pc/account/Print/InsPackingPrinting.vue'
          )
      },
      {
        path: '/account/myFavorite',
        name: 'myFavorite',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMyFavorite.vue'
          )
      },
      {
        path: '/account/myCoupon',
        name: 'myCoupon',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsMyCoupon.vue'
          )
      },
      {
        path: '/account/notification',
        name: 'notification',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsNotification.vue'
          )
      },
      {
        path: '/account/shoppingcart',
        name: 'shoppingcart',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/pc/InsShoppingCart.vue'
          )
      },
      {
        path: '/account/GetEnquiry',
        name: 'GetEnquiry',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/pc/InsGetEnquiry.vue'
          )
      },
      {
        path: '/account/forgetPassword',
        name: 'forgetPassword',
        // meta: {
        //   requiresAuth: true // 是否进行登录验证
        // },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsForgetPassword.vue'
          )
      },
      {
        path: '/account/ResetPwd/:id/:code',
        name: 'ResetPwd',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsResetPwd.vue'
          )
      },
      {
        path: '/account/checkout',
        name: 'checkout',
        meta: {
          requiresAuth: true, // 是否进行登录验证
          onlyFrom: '/account/shoppingcart'
        },
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './views/pc/InsCheckoutN.vue'
          )
      },
      {
        path: '/account/points',
        name: 'points',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsPoints.vue'
          )
      },
      {
        path: '/order/List',
        name: 'OrderList',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderList.vue'
          )
      },
      {
        path: '/order/detail/:id',
        name: 'detail',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderDetail.vue'
          )
      },
      {
        path: '/order/evidence/:id',
        name: 'evidence',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsOrderEvidence.vue'
          )
      },
      {
        path: '/account/orderComment/:id',
        name: 'orderComment',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsAddComments.vue'
          )
      },
      {
        path: '/account/completeCheckout/:id',
        name: 'completeCheckout',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/pc/account/InsCompleteCheckout.vue'
          )
      },
      {
        path: '/account/EnquirySuccess',
        name: 'EnquirySuccess',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsEnquirySuccess.vue'
          )
      },
      // 付款状态
      {
        path: '/regnpay/form/:id',
        name: 'regnpay',
        component: () =>
        import(
          /* webpackChunkName: "rnp" */ './views/pc/InsRegAndPay.vue'
        )
      },
      {
        path: '/regnpay/result/:id',
        name: 'regnpayResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsRegAndPayResult.vue'
          )
      },
      {
        path: '/Payment/PaySuccess/:id',
        name: 'paymentResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsPaySuccess.vue'
          )
      },
      {
        path: '/payment/PayFail/:id',
        name: 'paymentFail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/InsPayFail.vue'
          )
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "main" */ '@/views/pc/InsAdmin.vue')
      },
      {
        path: '/event/list/:date',
        name: 'eventList',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/eventList.vue'
          )
      },
      {
        path: '/event/detail/:id',
        name: 'eventDetail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/eventDetail.vue'
          )
      },
      {
        path: '/photo/album',
        name: 'photoAlbum',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/photoAlbum.vue'
          )
      },
      {
        path: '/photo/list/:id',
        name: 'photoList',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/pc/photoListN.vue'
          )
      }
    ]
  }
];

export const mRoutes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */'./platform/mobile/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */'./views/mobile/InsHome.vue')
      },
      {
        path: '/cms/404',
        name: '404',
        component: () =>
          import(/* webpackChunkName: "product" */ './components/service/InsNotFound.vue')
      },
      {
        path: '/building',
        name: 'building',
        component: () =>
          import(/* webpackChunkName: "product" */ './components/service/InsBuilding.vue')
      },
      {
        path: '/product/detail/:id',
        name: 'ProductsDetail',
        component: () =>
          import(
            /* webpackChunkName: "product" */ './views/mobile/InsProductDetail.vue'
          )
      },
      {
        path: '/product/search/:key',
        name: 'productSearch',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/mobile/InsProductSearchN.vue'),
        props: (route) => ({
          attrs: route.query.attrs,
          catalogs: route.query.catalogs,
          type: route.query.type
        }),
        meta: {
          title: 'Product'
        }
      },
      {
        path: '/product/cat/:catId?',
        name: 'productCat',
        component: () =>
          import(/* webpackChunkName: "product" */ './views/mobile/InsProductCat.vue')
      },
      // 会员中心路由开始
      {
        path: '/account/login',
        name: 'login',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsLoginN.vue'
          )
      },
      {
        path: '/account/registerSuccess',
        name: 'registerSuccess',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsRegisterSuccess.vue'
          )
      },
      {
        // 个人中心
        path: '/account',
        name: 'memberCenter',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMemberCenter.vue'
          ),
          children: [{
            // 个人信息
            path: 'memberInfo',
            name: 'memberInfo',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
            import(
              /* webpackChunkName: "account" */ './components/business/mobile/account/InsMemberInfo.vue'
            )
          },
          {
            path: 'modifyPassword',
            name: 'modifyPassword',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsModifyPassword.vue'
              )
          },
          {
            path: 'deliveryAddress',
            name: 'deliveryAddress',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsDeliveryAddress.vue'
              )
          },
          {
            path: 'message',
            name: 'message',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsMessage.vue'
              )
          },
          {
            path: 'ptxorder',
            name: 'ptxorder',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsPtxOrder.vue'
              )
          },
          {
            path: 'ptxupload',
            name: 'ptxupload',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/business/mobile/account/InsPtxUpload.vue'
              )
          },
          {
            path: 'CaseList/:id',
            name: 'CaseList',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/List/InsCaseList.vue'
              )
          },
          {
            path: 'BuyOrderDetail/:id/:type',
            name: 'BuyOrderDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsBuyOrderDetail.vue'
              )
          },
          {
            path: 'DeliveryDetail/:id/:type',
            name: 'DeliveryDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsDeliveryDetail.vue'
              )
          },
          {
            path: 'DeliveryOrderDetail/:id',
            name: 'DeliveryOrderDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsDeliveryOrderDetail.vue'
              )
          },
          {
            path: 'EnquiryDetail/:id/:type',
            name: 'EnquiryDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsEnquiryDetail.vue'
              )
          },
          {
            path: 'InviceInfoDetail/:id/:type',
            name: 'InviceInfoDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsInviceInfoDetail.vue'
              )
          },
          {
            path: 'PackingDetail/:id/:type',
            name: 'PackingDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsPackingDetail.vue'
              )
          },
          {
            path: 'QuotaDetail/:id/:type',
            name: 'QuotaDetail',
            meta: {
              requiresAuth: true // 是否进行登录验证
            },
            component: () =>
              import(
                /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Detail/InsQuotaDetail.vue'
              )
          }
        ]
      },
      {
        path: '/account/QuotaPrinting/:id/:type',
        name: 'QuotaPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Print/InsQuotaPrinting.vue'
          )
      },
      {
        path: '/account/BuyOrderPrinting/:id/:type',
        name: 'BuyOrderPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Print/InsBuyOrderPrinting.vue'
          )
      },
      {
        path: '/account/InviceInfoPrinting/:id/:type',
        name: 'InviceInfoPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Print/InsInviceInfoPrinting.vue'
          )
      },
      {
        path: '/account/DeliveryPrinting/:id/:type',
        name: 'DeliveryPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Print/InsDeliveryPrinting.vue'
          )
      },
      {
        path: '/account/PackingPrinting/:id/:type',
        name: 'PackingPrinting',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/hkTasteBusiness/mobile/account/Print/InsPackingPrinting.vue'
          )
      },
      {
        path: '/account/ResetPwd/:id/:code',
        name: 'ResetPwd',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsResetPwd.vue'
          )
      },
      {
        path: '/account/myFavorite',
        name: 'myFavorite',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMyFavorite.vue'
          )
      },
      {
        path: '/account/myCoupon',
        name: 'myCoupon',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsMyCoupon.vue'
          )
      },
      {
        path: '/account/notification',
        name: 'notification',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsNotification.vue'
          )
      },
      {
        path: '/account/forgetPassword',
        name: 'forgetPassword',
        // meta: {
        //   requiresAuth: true // 是否进行登录验证
        // },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsForgetPassword.vue'
          )
      },
      {
        path: '/account/points',
        name: 'points',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsPoints.vue'
          )
      },
      {
        path: '/order/List',
        name: 'OrderList',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderList.vue'
          )
      },
      {
        path: '/order/detail/:id',
        name: 'detail',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderDetail.vue'
          )
      },
      {
        path: '/order/evidence/:id',
        name: 'evidence',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsOrderEvidence.vue'
          )
      },
      {
        path: '/account/orderComment/:id',
        name: 'orderComment',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './components/business/mobile/account/InsAddComments.vue'
          )
      },
      {
        path: '/account/shoppingcart',
        name: 'shoppingcart',
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/mobile/InsShoppingcart.vue'
          )
      },
      {
        path: '/account/GetEnquiry',
        name: 'GetEnquiry',
        meta: {
          requiresAuth: true // 是否进行登录验证
        },
        component: () =>
          import(
            /* webpackChunkName: "account" */ './views/mobile/InsGetEnquiry.vue'
          )
      },
      {
        path: '/account/checkout',
        name: 'checkout',
        meta: {
          requiresAuth: true, // 是否进行登录验证
          onlyFrom: '/account/shoppingcart'
        },
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './views/mobile/InsCheckoutN.vue'
          )
      },
      {
        path: '/account/completeCheckout/:id',
        name: 'completeCheckout',
        component: () =>
          import(
            /* webpackChunkName: "checkout" */ './components/business/mobile/account/InsCompleteCheckout.vue'
          )
      },
      {
        path: '/account/EnquirySuccess',
        name: 'EnquirySuccess',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsEnquirySuccess.vue'
          )
      },
      {
        path: '/cms/content/:id',
        name: 'cmsContent',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/mobile/cms/InsCmsContent.vue'
          )
      },
      {
        path: '/cms/contentN/:id',
        name: 'cmsContentN',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/mobile/cms/InsCmsContentN.vue'
          )
      },
      {
        path: '/cms/catDetail/:id',
        name: 'catDetail',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './components/business/mobile/cms/InsCatDetail.vue'
          )
      },
      {
        path: '/cms/search/:key',
        name: 'cmsSearch',
        component: () =>
          import(
            /* webpackChunkName: "cms" */ './views/mobile/CmsSearch.vue'
          )
      },
      {
        path: '/regnpay/form/:id',
        name: 'regnpay',
        component: () =>
        import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsRegAndPay.vue'
        )
      },
      {
        path: '/regnpay/result/:id',
        name: 'regnpayResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsRegAndPayResult.vue'
          )
      },
      {
        path: '/Payment/PaySuccess/:id',
        name: 'paymentResult',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsPaySuccess.vue'
          )
      },
      {
        path: '/payment/PayFail/:id',
        name: 'paymentFail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/InsPayFail.vue'
          )
      },
      {
        path: 'admin',
        name: 'admin',
        component: () => import(/* webpackChunkName: "main" */ '@/views/mobile/InsAdmin.vue')
      },
      {
        path: '/event/list/:date',
        name: 'eventList',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/eventList.vue'
          )
      },
      {
        path: '/event/detail/:id',
        name: 'eventDetail',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/eventDetail.vue'
          )
      },
      {
        path: '/photo/album',
        name: 'photoAlbum',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/photoAlbum.vue'
          )
      },
      {
        path: '/photo/list/:id',
        name: 'photoList',
        component: () =>
          import(
          /* webpackChunkName: "rnp" */ './views/mobile/photoListN.vue'
          )
      }
    ]
  }
];

let routers = [
  {
    path: '/',
    component: () => import('./platform/pc/index.vue')
  }
];

if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
  routers = mRoutes;
} else {
  routers = pRoutes;
}

const router = new Router({
  mode: 'history', // history
  base: process.env.BASE_URL,
  routes: routers
});

export default router;
router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) { // 如果未匹配到路由
    // SEO判斷處理
    let lang = to.path.toLowerCase().match(/\/en|\/xc|\/tc/i);

    if (lang) {
      let transLang;
      switch (lang[0]) {
        case '/en':
          transLang = 'E';
          break;
        case '/xc':
          transLang = 'S';
          break;
        case '/tc':
          transLang = 'C';
          break;
      }

      i18n.locale = transLang;

      next({
        path: to.path.toLowerCase().replace(lang[0], '')
      });
    } else {
      from.name ? next({ name: from.name }) : next('/'); // 如果上級也未匹配到路由則跳轉首頁，如果上級能匹配到則轉上級路由
    }
  }

  if (from.name) {
    Vue.prototype.$ShowLayer();
    setTimeout(() => {
      Vue.prototype.$HiddenLayer();
    }, 500);
  }
  setTimeout(function () {
    if (to.path === '/account/login') {
      if (storage.get('isLogin')) {
        next({ path: '/home' });
      }
      next();
    } else {
      if (to.matched.length === 0) {
        next('/'); // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到首页
      }
      next(); // 如果匹配到正确跳转
      if (to.matched.some(record => record.meta.requiresAuth) && !storage.get('isLogin')) {
        // router.push({ path: '/account/login' });
        next({
          path: '/account/login',
          query: {
            returnurl: to.path
          }
        });
      } else if (to.matched.some(record => record.meta.requiresAuth) && storage.get('timeout') && storage.get('timeout') < new Date().getTime()) {
        Vue.prototype.$Login(function () { next(); });
      } else {
        next();
      }
    }
  }, 200);
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyFrom)) {
    if ((to as any).meta.onlyFrom === from.path) next();
    else next((to as any).meta.onlyFrom);
  } else {
    next();
  }
});
/**
 * 目前蒙层已经不会自动关闭，请在页面适当的时机自行打开。this.$HiddenLayer();
 */
/**
 * 目前所有路由均被拦截加上蒙层，防止页面抖动过大，有需要的小伙伴可以调用：this.$HiddenLayer()，在你觉得合适的时机关闭蒙层（目前我在本文档的159行设置计时器2秒后关闭蒙层）。
 * 如遇ts检测this.$HiddenLayer报找不到改属性或变量，请直接调用Vue.prototype.$HiddenLayer()。其实二者是相同的，但是TS貌似检测不到对象的原型，所以报错。
 * 关于layer配置在./init.ts上，如有需要可以自行修改，或者一起讨论如何修改。
 * */
