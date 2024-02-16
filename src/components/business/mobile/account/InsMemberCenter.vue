<template>
<div>
  <!-- 正常购买模式 -->
  <div class="MembercenterMobile NomralBg">
    <accountHeader />
    <router-view></router-view>
  </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () =>
      import('@/components/hkTasteBusiness/mobile/account/accountHeader.vue')
  }
})
export default class InsMenberCenter extends Vue {
    activeClass: any = 0;
    NormalactiveClass:any=0;
    openlink(link) {
    this.$router.push({ path: link });
  }
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  PtxisActive() {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.activeClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.activeClass = 2;
    } else if (url.indexOf('message') !== -1) {
      this.activeClass = 3;
    } else if (url.indexOf('ptxorder') !== -1) {
      this.activeClass = 4;
    }
    console.log(this.activeClass);
  }
  NormalisActive() {
    var url = this.$route.path;
    var reg = RegExp(/memberInfo/);
    if (reg.test(url)) {
      this.NormalactiveClass = 1;
    } else if (url.indexOf('modifyPassword') !== -1) {
      this.NormalactiveClass = 2;
    } else if (url.indexOf('deliveryAddress') !== -1) {
      this.NormalactiveClass = 3;
    }
    console.log(this.NormalactiveClass);
  }
  updated() {
    this.PtxisActive();
    this.NormalisActive();
  }
  mounted() {
    this.PtxisActive();
    this.NormalisActive();
  }
}
</script>
<style lang="less">
#container .el-form-item__content {
  text-align: left !important;
}
.MemberMobile {
  display: inline-block;
  background-size: 100% 100%;
  width: 100%;
}
.MemberMobile .MemberInfoNavMobile {
  width: 100%;
  display: inline-block;
  margin-top: 50px;
  margin-bottom: 20px;
  ul {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    >div {
     width: 100%;
     li{
       padding-top: 10px;
       padding-bottom: 10px;
       background: #999999;
       border-radius: 20px;
       transition: all .3s;
       cursor: pointer;
       margin-bottom: 20px;
       a{
         display: flex;
         width: 100%;
         height: 100%;
         align-items: center;
         justify-content: center;
        color: #fff;
        font-size: 18px;
       }
     }
    }
  }
}
.MemberMobile .activeInfo{
  color: #fff !important;
  background: @base_color !important;
}
.MembercenterMobile .activeInfo{
  color: #fff !important;
  background: @base_color !important;
}
.MembercenterMobile .MemberInfoNav{
    width: 100%;
    margin-top: 1rem;
    display: inline-block;
    background: #e6e6e6;
    margin-bottom: 2rem;
    ul{
      width:100%;
      display: block;
          li{
          float: left;
          list-style: none;
          width:33.3%;
              a{
              text-align: center;
              text-decoration: none;
              display: block;
              font-size: 1.6rem;
              padding: 1rem;
              word-break: break-word;
          }
        }
    }
}
.MembercenterMobile .activeInfo{
  background: @base_color!important;
}
.MembercenterMobile .activeInfo a{
  color:#fff!important;
}
</style>
