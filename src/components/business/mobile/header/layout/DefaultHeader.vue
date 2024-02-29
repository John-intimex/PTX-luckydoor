<template>
    <div class="header-box">
      <!-- <div class="headerTop">
          <ins-login />
          <router-link to="/account/GetEnquiry">
                <i class="handle-icon ptxicon"></i>
          </router-link>
          <ins-fav />
          <shopcart class="shoppingcart"/>
          <CodeSelect class="header-code" />
          <ins-lang-switch class="headerLang" />
      </div> -->
        <div class="flex-box">
        <ins-logo />
        <!-- <ins-menu /> -->
        <!-- <ins-menu :layout="1" /> -->
          <img class="slide-menu" src="/images/mobile/Mobile-index_05.png" @click="showSlideMenu" />
          <!-- <img class="close-meun" src="/images/mobile/out.png" @click="showSlideMenu" v-show="this.$store.state.isShowMenu"  /> -->
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue'),
    InsLogin: () => import('@/components/business/mobile/header/InsLogin.vue'),
    InsFav: () => import('@/components/business/mobile/header/InsFav.vue'),
    shopcart: () => import('@/components/business/mobile/header/InsShoppingCart.vue'),
    InsMenu: () => import('@/components/business/mobile/header/InsMenu.vue'),
    CodeSelect: () =>
      import('@/components/business/mobile/header/InsCodeSelect.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get ShopCart () {
    return this.$store.state.shopCart;
  }
  created() {
    this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
  }
}
</script>

<style scoped lang="less">
    .header-box {
      border-bottom: 2px solid #fff;
      .flex-box {
        height: 5rem;
        background-color: @positive_color;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1.5rem;
        padding-left: 0;
        .logo {
          width: 70%;
          height: 5rem;
          display: flex;
          align-items: center;
          // margin: 0 auto;
          background-color: #112a4d;
          padding-left: 1.5rem;
          box-sizing: border-box;
          position: relative;
          &::after{
            content: '';
            width: 0;
            height: 0;
            border-bottom: 5rem solid #112a4d;
            border-right: 4rem solid transparent;
            position: absolute;
            right: -3.98rem;
            bottom: 0;
          }
          /deep/ img{
            width: 20rem;
            display: block;
          }
        }

        .slide-menu {
          cursor: pointer;
          width: 3rem;
        }
        .close-meun {
          cursor: pointer;
          width: 2.5rem;
        }
      }
    }
.headerTop{
  width: 90%;
  display: flex;
  background: #fff;
  position: relative;
  border-bottom: 1px solid #e6e6e6;
  flex-wrap: wrap;
  align-items: center;
  padding-left: 5%;
  padding-right: 5%;
  .shoppingcart{
      float: left;
      height: 3.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  .headerLang{
    width:20%;
    position: absolute;
    right: 0px;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-code{
    width:20%;
    position: absolute;
    right: 20%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ptxicon {
    width: 2.5rem;
    height: 2.5rem;
    background: url('/images/pc/ptx.png') no-repeat center center;
    background-size: contain;
    display: inline-block;
    margin-left: .5rem;
  }
}
</style>
