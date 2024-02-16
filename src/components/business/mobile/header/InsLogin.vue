<template>
<div>
    <!-- 正常购买模式 -->
    <div class="memberlogin">
        <div class="menberCentral" @click="menberCentral">
                  <img class="showMenberCentral" src="/images/mobile/ptx_12.png">
                    <div class="lang_flow" v-show="showMenberCentral" @click="memberCentral">
                        <div data-to="/account/memberInfo" class="ii">{{$t('Account.MemberInformation')}}</div>
                        <div data-to="/account/notification" class="ii">{{$t('Account.MyMessages')}}</div>
                        <div data-to="/order/List" class="ii">{{$t('Account.MyOrder')}}</div>
                        <div data-to="/account/myFavorite" class="ii">{{$t('Account.MyFavorite')}}</div>
                        <div data-to="/account/deliveryAddress" class="ii">{{$t('Account.DeliveryAddress')}}</div>
                        <div data-to="/account/mycoupon" class="ii">{{$t('MyCoupon.MyCoupon')}}</div>
                        <div data-to="/account/message" class="ii">{{$t('Account.LatestNews')}}</div>
                        <div data-to="/account/ptxorder" class="ii">{{$t('Enquiry.PTXOrder')}}</div>
                        <div @click="logout">{{$t('Account.Logout')}}</div>
                    </div>
          </div>
    </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  private showMenberCentral:boolean = false;
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      this.showMenberCentral = !this.showMenberCentral;
    }
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
  }
  logout () {
    this.$Api.member.logout().then((result) => {
      if (result) this.$message('Message.SucceedInOperating');
      this.$router.push('/');
      this.Reload();
    });
  }
}
</script>
<style scoped lang="less">
  .menberCentral{
    float: left;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .lang_flow{
    position: absolute;
    top: 3.8rem;
    left: 0px;
    width: 100%;
    background: #FFF;
    z-index: 999;
    >div{
      color:#000;
      font-size: 1.4rem;
      height: 4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }
    }
    img{
      width:2.5rem;
      margin: 0 auto;
      display: block;
    }
  }
</style>
