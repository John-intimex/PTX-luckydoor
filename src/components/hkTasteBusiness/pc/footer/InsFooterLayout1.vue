<template>
<div id="footer">
  <div class="footbg">
    <div class="footerMain">
        <div class="footerTop">
            <!-- <p><span>whatsapp&nbsp;{{$t('home.Order')}}</span><b>6289 1789</b></p>
            <p><span>{{$t('home.TelSearch')}}</span><b>6289 1789</b></p> -->
            <a href="/"><img src="/images/pc/pcindex_09.png" alt=""></a>
        </div>
        <div class="footerBotttom">
          <div class="footerLeft">
              <ul v-for="(n,index) in footerMenus" :key="index">
                <li>
                    <a href="javascript:;" v-if="n.Type === 0" @click="toUrl(n)"><span>{{n.Name}}</span></a>
                    <router-link :to="To(n)"  v-else><span>{{n.Name}}</span></router-link>
                  <ul>
                    <li v-for="(c,index2) in n.Childs" :key="index2">
                       <a href="javascript:;" v-if="c.Type === 0" @click="toUrl(c)">
                              {{c.Name}}
                        </a>
                       <router-link :to="To(c)" v-else>{{c.Name}}</router-link>
                    </li>
                  </ul>
                </li>
             </ul>
          </div>
          <!-- <div class="footerRight">
            <p><img src="/images/pc/pcindex_14.png" /></p>
          </div> -->
          <div class="clear"></div>

        </div>

    </div>
  </div>
  <div class="footercopy">
            <div class="footernav">
              <a href="/CMS/content/20331">Disclaimer</a> | <a href="/CMS/content/20332">Privacy Policy</a>
            </div>
             <span>Copyright © {{currentYear}} Lucky Door Industries Limited Powered by Eventizer Limited
               <a href="https://eventizer.hk/" target="_blank">
               <img src="/images/pc/footerlogo.png"> <img src="/images/pc/NStore.png">
               </a>
              </span>
             <!-- <span v-if="!isPtx">
                <p>{{$t('home.Weaccept')}}</p>
                <div>
                  <img src="/images/payment/stripe.png" />
                  <img src="/images/payment/WeChatPay.png" />
                  <img src="/images/payment/Alipay.png" />
                  <img src="/images/payment/PayMe.png" />
                  <img src="/images/payment/Paypal.png" />
                  <img src="/images/payment/MasterCard.png" />
                  <img src="/images/payment/VISA.png" />
                </div>
              </span> -->
        </div>
</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InsFooterLayout1 extends Vue {
  currentYear: number = 0;
  footerMenus: any[] = [];
    get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  goToTop () {
    let sTop = document.documentElement.scrollTop;
    let times = setInterval(() => {
      sTop -= 50;
      if (sTop <= 0) {
        document.documentElement.scrollTop = 0;
        clearInterval(times);
      } else {
        document.documentElement.scrollTop = sTop;
      }
    }, 1);
  }
  toUrl (n) {
    if (!n.IsNewWin && n.Url) {
      window.location.href = n.Url;
    } else if (n.IsNewWin && n.Url) {
      window.open(n.Url);
    }
  }
  To (n) {
    return n.Type === 1 ? '/cms/catDetail/' + n.Value.Id : n.Type === 2 ? '/CMS/content/' + n.Value.Id : n.Type === 3 ? '/RegNPay/Form/' + n.Value.Id : n.Type === 4 && !this.$store.state.catMenuType ? '/product/cat/' + n.Value.Id : n.Type === 4 && this.$store.state.catMenuType ? '/product/search/-?catalogs=' + JSON.stringify([parseInt(n.Value.Id)]) + '&type=0' : n.Type === 5 ? '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.Value.Id), Vals: [] }]) + '&type=0' : '/product/search/-?attrs=' + JSON.stringify([{ Id: parseInt(n.ParentId), Vals: [parseInt(n.Value.Id)] }]) + '&type=0';
  }
  getMenu () {
    this.$Api.promotion.getMenu().then((result) => {
      this.footerMenus = result.ReturnValue.FooterMenus;
    });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getMenu();
  }
}
</script>

<style scoped lang="less">
/* 底部文件 */
.footbg{
    background: url('/images/pc/pcindex_82.png') no-repeat center bottom;
    background-size: cover;
    width: 100%;
    display: block;
    padding-top: 60px;
    padding-bottom: 76px;
    // min-height: 278px;
    // background-color: #4d4d4d;
}
.footerMain{
    width: 1200px;
    margin: 0 auto;
}
.footerTop{
    text-align: center;
    padding-top: 0;
    padding-bottom: 42px;
    width: 100%;
}
.footerTop p{
    text-align: center;
    display: inline-block;
    margin-right: 50px;
}
.footerTop p span{
    font-size: 14px;
    color: #FFF;
    line-height: 35px;
    margin-right: 15px;
}
.footerTop p b{
    font-weight: 100;
    font-size: 35px;
    color: #FFF;
    line-height: 35px;
}
.footerBotttom{
    width: 100%;
}
.footerLeft{
    // float: left;
    // width: 40%;
    display: flex;
    justify-content: space-between;
}
.footerLeft > ul{
    // float: left;
    // margin-right: 10%;
}
.footerLeft > ul >li{
    width: 100%;
    line-height: 30px;
}
.footerLeft > ul >li >a{
    font-size:18px;
    color:#FFF;
}
.footerLeft > ul >li >ul{
  width: 100%;
}
.footerLeft > ul >li >ul a{
    font-size: 16px;
    color:#FFF;
    display: block;
    // text-transform: uppercase;
}
.footerLeft > ul >li >ul a:hover{
   transform: translateY(-3px);
}
.footerLeft p{
    width: 100%;
    display: block;
    font-size: 14px;
    color: #fff;
    padding-top: 20px;
}
.footerLeft p img{
    display: inline-block;
    vertical-align: middle;
    padding-left: 10px;
}
.footerRight{
    float: right;
    width: 40%;
    text-align: center;
}
.footerRight img{
  width: 60%;
  display: block;
}
.footercopy{
  width: 100%;
  display:flex;
  justify-content: center;
  margin-top: 6px;
  margin-bottom: 8px;
  align-items: center;
  .footernav{
    font-size: 14px;
    color:#1c3860;
    margin-right: 10px;
    a{
      color:#1c3860;
      font-size: 14px;
      padding: 0 7px;
    }
  }

}
.footercopy span{
  // float: left;
  color:#1c3860;
  font-size: 14px;
  display: flex;
  align-items: center;
}
.footercopy span a{
  display: flex;
  align-items: center;
}
.footercopy span a img{
  display: block;
  vertical-align:middle;
  padding-left: 10px;
  height: 35px;
}

</style>
