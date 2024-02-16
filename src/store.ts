import Vue from 'vue';
import Vuex from 'vuex';
import Express from './model/express';
import storage from './sdk/common/Storage';
import Address from './model/address';
import PickupAddress from './model/pickupAddress';
import Payment from './model/payment';
import ShopCart from './model/ShopCart';
import { MemberResult } from './model/memberResult';
import ExpressPoint from './model/ExpressPoint';
import PromotionDiscount from './model/PromotionDiscount';
import Settings from '@/settings';
import PanelDetail from '@/model/PanelDetail';
import Tab from '@/model/Tab';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isMobile: false,
    id: '',
    lang: storage.get('locale') || Settings.defaultLang,
    ids: {},
    OrderId: {},
    MenuData: [],
    isLogin: Number(storage.get('isLogin')),
    user: '',
    // eslint-disable-next-line prefer-promise-reject-errors
    shopCart: null,
    // eslint-disable-next-line prefer-promise-reject-errors
    address: null,
    express: new Express(),
    expressPoint: new ExpressPoint(),
    selectAddress: new Address(),
    pickupAddress: new PickupAddress(),
    searchKey: '',
    isShowMenu: false,
    isClick: false,
    isActive: false,
    isSearchBar: false,
    cartItems: [],
    shopCartNum: 0,
    DeliveryType: 'D',
    savePaymentMethod: false,
    paymentIndex: 0,
    paymentMethod: new Payment(),
    // eslint-disable-next-line prefer-promise-reject-errors
    paymentMethods: null,
    headerMenus: [],
    footerMenus: [],
    attrs: [],
    searchCatalogs: [],
    catId: 0,
    pickUpExpress: false,
    memberInfo: new MemberResult(),
    discount: new PromotionDiscount(),
    productDetailSku: '0',
    productDetailTab: new Tab('none'),
    productDetail: new PanelDetail('', '', '', '', 0, 0, 0, 0, '', '', '', ''),
    imgList: [],
    DPickName: '',
    DPickPhone: '',
    catMenuType: 1, // 菜单产品目录跳转类型（0 => 产品目录，1 => 产品搜索页）
    showFixedHeader: false, // 是否處於顯示固定頭部狀態
    newSF: false, // 是否（新）順豐自提
    PickupInfoRequire: false, // 自取(人)信息是否必填
    AttrImgList: '',
    NormalImg: ''
  },
  mutations: {
    setIsMobile (state, is) {
      state.isMobile = is;
    },
    setIds (state, id) {
      state.ids = id;
    },
    setLang (state, lang) {
      state.lang = lang;
    },
    setOrderId (state, id) {
      state.OrderId = id;
    },
    setMenuData (state, MenuData) {
      state.MenuData = MenuData;
    },
    setUser (state, user) {
      state.user = user;
    },
    doLogin (state) {
      state.isLogin = 1;
      storage.set('isLogin', 1);
    },
    Logout (state) {
      state.isLogin = 0;
      state.user = '';
      storage.set('isLogin', 0);
    },
    setShopCart (state, shopCart) {
      state.shopCart = shopCart;
    },
    setAddress (state, address) {
      state.address = address;
    },
    setExpress (state, express) {
      state.express = express;
    },
    setSelectAddress (state, address) {
      state.selectAddress = address;
    },
    isShowMenu (state, isShowMenu) {
      state.isShowMenu = isShowMenu;
    },
    isClick (state, isClick) {
      state.isClick = isClick;
    },
    isSearchBar (state, isSearchBar) {
      state.isSearchBar = isSearchBar;
    },
    isActive (state, isActive) {
      state.isActive = isActive;
    },
    setSearchKey (state, key) {
      state.searchKey = key;
    },
    setCartItems (state, items) {
      state.cartItems = items;
    },
    setShopCartNum (state, num) {
      state.shopCartNum = num;
    },
    setDeliveryType (state, deliveryType) {
      state.DeliveryType = deliveryType;
    },
    setPickupAddress (state, pickupAddress) {
      state.pickupAddress = pickupAddress;
    },
    setSavePaymentMethod (state, savePaymentMethod) {
      state.savePaymentMethod = savePaymentMethod;
    },
    setPaymentIndex (state, index) {
      state.paymentIndex = index;
    },
    setPaymentMethod (state, paymentMethod) {
      state.paymentMethod = paymentMethod;
    },
    setPaymentMethods (state, paymentMethods) {
      state.paymentMethods = paymentMethods;
    },
    setHeaderMenus (state, menu) {
      state.headerMenus = menu;
    },
    setFooterMenus (state, menu) {
      state.footerMenus = menu;
    },
    setAttrs (state, attrs) {
      state.attrs = attrs;
    },
    setSearchCatalogs (state, catalogs) {
      state.searchCatalogs = catalogs;
    },
    setCatId (state, catId) {
      state.catId = catId;
    },
    setPickUpExpress (state, isPickUpExpress) {
      state.pickUpExpress = isPickUpExpress;
    },
    setMemberInfo (state, profile) {
      state.memberInfo = profile;
    },
    setExpressPoint (state, expressPoint) {
      state.expressPoint = expressPoint;
    },
    setPromotionDiscount (state, discount) {
      state.discount = discount;
    },
    setProductDetailSku (state, sku) {
      state.productDetailSku = sku;
    },
    setProductDetailTab (state, tab) {
      state.productDetailTab = tab;
    },
    setProductDetail (state, detail) {
      state.productDetail = detail;
    },
    setImgList (state, imgList) {
      state.imgList = imgList;
    },
    setDPickName (state, DPickName) {
      state.DPickName = DPickName;
    },
    setAttrImgList (state, AttrImgList) {
      state.AttrImgList = AttrImgList;
    },
    setNormalImg (state, NormalImg) {
      state.NormalImg = NormalImg;
    },
    setDPickPhone (state, DPickPhone) {
      state.DPickPhone = DPickPhone;
    },
    setShowFixedHeader (state, showFixedHeader) {
      state.showFixedHeader = showFixedHeader;
    },
    setNewSF (state, newSF) {
      state.newSF = newSF;
    },
    setPickupInfoRequire (state, PickupInfoRequire) {
      state.PickupInfoRequire = PickupInfoRequire;
    }
  },
  actions: {
    setIsMobile: ({ commit }, is) => {
      commit('setIsMobile', is);
    },
    setLang (context, lang) {
      context.commit('setLang', lang);
    },
    setIdsFun (context, id) {
      context.commit('setIds', id);
    },
    setOrderId: ({ commit }, id) => {
      commit('setOrderId', id);
    },
    setMenuData: ({ commit }, MenuData) => {
      commit('setMenuData', MenuData);
    },
    setUser: ({ commit }, user) => {
      commit('setUser', user);
    },
    doLogin: ({ commit }) => {
      commit('doLogin');
    },
    Logout: (context, clean) => {
      context.commit('Logout');
      if (!clean) { context.commit('setShopCart', Promise.resolve({ ShopCart: new ShopCart() })); }
    },
    setShopCart (context, shopCart) {
      if (!(shopCart instanceof Promise)) throw new Error('shopCart must be a promise');
      context.commit('setShopCart', shopCart);
    },
    setAddress (context, address) {
      if (!(address instanceof Promise)) throw new Error('address must be a promise');
      context.commit('setAddress', address);
    },
    setExpress (context, express) {
      context.commit('setExpress', express);
    },
    setSelectAddress (context, address) {
      context.commit('setSelectAddress', address);
    },
    isShowMenu: ({ commit }, isShowMenu) => {
      commit('isShowMenu', isShowMenu);
    },
    isClick: ({ commit }, isClick) => {
      commit('isClick', isClick);
    },
    isSearchBar: ({ commit }, isSearchBar) => {
      commit('isSearchBar', isSearchBar);
    },
    isActive: ({ commit }, isActive) => {
      commit('isActive', isActive);
    },
    setSearchKey (context, key) {
      context.commit('setSearchKey', key);
    },
    setCartItems: ({ commit }, items) => {
      commit('setCartItems', items);
    },
    setShopCartNum: ({ commit }, num) => {
      commit('setShopCartNum', num);
    },
    setDeliveryType (context, deliveryType) {
      context.commit('setDeliveryType', deliveryType);
    },
    setPickupAddress (context, pickupAddress) {
      context.commit('setPickupAddress', pickupAddress);
    },
    setSavePaymentMethod (context, savePaymentMethod) {
      context.commit('setSavePaymentMethod', savePaymentMethod);
    },
    setPaymentIndex (context, index) {
      context.commit('setPaymentIndex', index);
    },
    setPaymentMethod (context, paymentMethod) {
      context.commit('setPaymentMethod', paymentMethod);
    },
    setPaymentMethods (context, paymentMethods) {
      if (!(paymentMethods instanceof Promise)) throw new Error('paymentMethods must be a promise');
      context.commit('setPaymentMethods', paymentMethods);
    },
    setHeaderMenus: ({ commit }, menu) => {
      commit('setHeaderMenus', menu);
    },
    setFooterMenus: ({ commit }, menu) => {
      commit('setFooterMenus', menu);
    },
    setAttrs: ({ commit }, attrs) => {
      commit('setAttrs', attrs);
    },
    setSearchCatalogs: ({ commit }, catalogs) => {
      commit('setSearchCatalogs', catalogs);
    },
    setCatId (context, catId) {
      context.commit('setCatId', catId);
    },
    setPickUpExpress (context, isPickUpExpress) {
      context.commit('setPickUpExpress', isPickUpExpress);
    },
    setMemberInfo (context, profile) {
      context.commit('setMemberInfo', profile);
    },
    setExpressPoint (context, expressPoint) {
      context.commit('setExpressPoint', expressPoint);
    },
    setPromotionDiscount (context, discount) {
      context.commit('setPromotionDiscount', discount);
    },
    setProductDetailSku (context, sku) {
      context.commit('setProductDetailSku', sku);
    },
    setProductDetailTab (context, tab) {
      context.commit('setProductDetailTab', tab);
    },
    setProductDetail (context, detail) {
      context.commit('setProductDetail', detail);
    },
    setImgList (context, imgList) {
      context.commit('setImgList', imgList);
    },
    setDPickName (context, DPickName) {
      context.commit('setDPickName', DPickName);
    },
    setAttrImgList(context, AttrImgList) {
      context.commit('setAttrImgList', AttrImgList);
    },
    setNormalImg(context, NormalImg) {
      context.commit('setNormalImg', NormalImg);
    },
    setDPickPhone (context, DPickPhone) {
      context.commit('setDPickPhone', DPickPhone);
    },
    setShowFixedHeader: ({ commit }, showFixedHeader) => {
      commit('setShowFixedHeader', showFixedHeader);
    },
    setNewSF (context, newSF) {
      context.commit('setNewSF', newSF);
    },
    setPickupInfoRequire (context, PickupInfoRequire) {
      context.commit('setPickupInfoRequire', PickupInfoRequire);
    }
  }
});
