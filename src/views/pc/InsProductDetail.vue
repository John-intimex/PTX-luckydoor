<template>
<div class="productDetailWarper PcVersion NomralBg">
  <div v-if="this.Permission == 3" class="IsDetailshow">
     {{$t('messageTips.NoProduct')}}
  </div>
  <div v-else>
  <div class="productDetail_container">
    <div class="ProductUp">
        <div class="prev" @click="getGetProductUp()"><i class="img"></i>{{$t('Message.Prev')}}</div>
        <div class="next" @click="getGetProductDown()">{{$t('Message.Next')}}<i class="img"></i></div>
    </div>
    <div class="productDetail_main">
      <inPreview style="width:50%" :imgList="ImgList" :pageNum="userAgent === 'mobile' ?  1 : 4" :ProductTitleName="ProductTitleName"></inPreview>
      <div style="width:45%;margin-left:5%;float:right;">
          <PkProductInfo :panelDetail.sync="PanelDetail"  :ProductSku="ProductCode" width="100%" :AddPrice="getNewsPrice" style="margin-bottom: 2rem;"></PkProductInfo>
          <inPanel :panelDetail.sync="PanelDetail" :ProductSku="ProductCode" @getPrice="showPrice" width="100%"></inPanel>
      </div>
    </div>
    <div class="tab_warpper" v-if="PanelDetail.negotiable">
      <div class="tab_header">
        <div class="detail_title">{{$t('product.ProductIntroduction')}}</div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail && Tabs.Detail!=''"></div>
      <div class="product_detail" v-show="IsDetail" v-if="Tabs.Detail==''"><h3>{{$t('messageTips.NoContent')}}</h3></div>
    </div>
   <div class="tab_warpper" v-else>
      <div class="tab_header">
        <div class="tab_inner">
          <div class="detail"   @click="IsDetail=true" v-bind:class="{isActive:IsDetail}">{{$t('product.ProductIntroduction')}}</div>
          <div class="comment"  @click="IsDetail=false"  v-if="this.$Settings.version !== 1"  v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail && Tabs.Detail!=''"></div>
      <div class="product_detail" v-show="IsDetail" v-if="Tabs.Detail==''"><h3>{{$t('messageTips.NoContent')}}</h3></div>
      <inComments :ProductSku="ProductCode" v-show="!IsDetail"></inComments>
    </div>
  </div>
    <div class="maincontent">
    <inYouWouldLike
      styla="margin-bottom:50px;"
      :pageNum="4"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductCode"
    ></inYouWouldLike>
    </div>
  </div>
</div>

</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/pc/product/InsTab.vue';
import inYouWouldLike from '@/components/business/pc/product/InsYouWouldLike.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/hkTasteBusiness/pc/product/InsPanel.vue';
import inPreview from '@/components/business/pc/product/InsPreviewN.vue';
import inProductUpOrDown from '@/components/business/pc/product/InsProductUpOrDown.vue';
import ProductAttr from '@/model/ProductAttr';
import Tab from '@/model/Tab';
import inComments from '@/components/business/pc/product/InsComments.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/pc/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/pc/product/PkProductInfo.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/pc/product/HkProductListSwiper.vue';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inComments,
  inProductUpOrDown,
  PkProductDetailCate,
  PkProductInfo,
  ProductListSwiper
} })
export default class InsProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab[] = [new Tab('none')];
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', '', 0, 0, 0, 0, '', '', '', '');
  private Src: string = '';
  private IsDetail:boolean = true;
  private ImgList: string[] = [];
  private ProductCode:string = '0';
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  private IsDetailshow:boolean = false;
  private Permission: string = '';
  get pc () {
    return this.$route.params.id;
  }
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  showPrice (val) {
    if (val[0]) {
      this.PriceA = val[0].AdditionalPrice;
    }
    if (val[1]) {
      this.PriceB = val[1].AdditionalPrice;
    }
    if (val[2]) {
      this.PriceC = val[2].AdditionalPrice;
    }
    this.getNewsPrice = this.PriceA + this.PriceB + this.PriceC;
  }
  created () {
    this.getProduct();
  }
    // 获取上个产品
  getGetProductUp () {
    this.$Api.product.GetProductUpOrDown(this.$route.params.id, this.PanelDetail.CatId, true).then((result) => {
      this.$router.push('/product/detail/' + result);
     }).catch(error => {
      console.log(error);
          this.$message({
            message: this.$t('Message.NoMore') as string,
            type: 'error',
            customClass: 'messageBoxMobile'
          });
    }); ;
  }
    // 获取下个产品
  getGetProductDown () {
    this.$Api.product.GetProductUpOrDown(this.$route.params.id, this.PanelDetail.CatId, false).then((result) => {
      this.$router.push('/product/detail/' + result);
     }).catch(error => {
      console.log(error);
          this.$message({
            message: this.$t('Message.NoMore') as string,
            type: 'error',
            customClass: 'messageBoxMobile'
          });
    }); ;
  }
  getProduct () {
    var that = this;
    that.ProductCode = that.$route.params.id ? that.$route.params.id : '0';
    console.log(that.ProductCode, 'that.ProductCodethat.ProductCode');
    // 获取产品详情数据
    that.$Api.product.GetProduct(that.pc).then((result) => {
    if (result) {
      that.$nextTick(() => {
        document.title = result.PanelDetail.Name;
      });
      that.PanelDetail = result.PanelDetail;
      that.ExtAttrList = result.PanelDetail.ExtAttrList;
      that.CatalogTree = result.PanelDetail.CatalogTree;
      that.Score = result.PanelDetail.Score;
      that.ImgList = result.AdditionalImage;
      that.Permission = result.PanelDetail.Permission;

      if (that.Permission === '2') {
        if (this.$Storage.get('isLogin') === 0) {
        this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/'); });
         }
      }

      // if (that.Permission === '3') {
      //   this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/account/login'); });
      // }

      that.Tabs = result.Tab;
      this.ProductTitleName = result.PanelDetail.Name;
      that.$HiddenLayer();
    } else {
      this.$Confirm(this.$t('Message.Message'), this.$t('Message.FindNoProduct'), () => { this.Reload(); }, () => { this.$router.push('/'); });
      }
    });
  }
  mounted () {
    this.$store.dispatch('isClick', false);
    this.$store.dispatch('setAttrImgList', '');
  }
  @Watch('pc', { deep: true })
  onWatchRoute (o, n) {
    this.$store.dispatch('setProductDetailSku', this.pc);
    this.getProduct();
  }
  gotoSlider () {
    this.$nextTick(() => {
      let target = document.getElementById('tab') as HTMLElement;
      target.scrollIntoView();
    });
  }
}
</script>
<style  lang="less">
.PcVersion .el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.PcVersion .productDetail_container .in_pdWindow_item_description{
    .currentPricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .primePricesMain{
      display: flex;
      align-items: center;
      justify-content: center;
    }
}
.PcVersion .productDetail_container {
  .currentPricesMain{
    display: flex;
    float: right;
    align-items: baseline;
    height: 3rem;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 26px;
        color:#ca3636;

        margin-right: 5px;
      }
      &:nth-child(2){
        font-size:26px;
        color:#ca3636;

      }
    }
  }
  .primePricesMain{
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
      }
      &:nth-child(2){
        font-size: 16px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    .innerBanner{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
  }
.productDetailWarper{
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-top: 2rem;
  .IsDetailshow {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    padding: 60px 0;
    min-height: 400px;
    font-size: 20px;
  }
}
.commentsLine{
    width: 100%;
    height: 1px;
    background: #000;
    margin-top: 100px;
}
.productDetail_container {
  margin:0 auto;
  width:1200px;
  display: block;
  .tab_warpper{
    margin-top: 50px;
    .tab_header{
      display: inline-block;
      width: 100%;
      margin-bottom: 10px;
        .tab_inner {
          width: 500px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .detail {
          width: 48%;
          background-size: 100% 100%;
          height: 50px;
          font-size: 24px;
          text-align: center;
          color:#333;
          cursor: pointer;
          border-bottom: 1px solid #fff;
          }
          .comment {
            width: 48%;
            background-size: 100% 100%;
            height: 50px;
            font-size: 24px;
            text-align: center;
            color:#333;
            cursor: pointer;
            border-bottom: 1px solid #fff;
          }
          .isActive {
              border-bottom: 1px solid #b19162;
              color: #b19162;
              background-size: 100% 100%!important;
          }
        }
      .detail_title{
          width: 350px;
          margin: 0 auto;
          background: #b19162;
          background-size: 100% 100%;
          text-align: center;
          font-size: 24px;
          color: #fff;
          height: 50px;
          line-height: 50px;
      }
    }
    .product_detail{
      padding: 1rem;
      display: block;
      clear: both;
      min-height: 300px;
      border-radius: 5px;
      font-size: 20px;
      color:#333333;
      h3 {
        font-size: 20px;
        color:#333333;
        font-weight: 500;
      }
      /deep/ p{
        font-size: 20px;
        color:#333333;
     }
     /deep/ span{
        font-size: 20px!important;
        color:#333333;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: inline-block;
}
.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 60px;
  line-height: 60px;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 10px;
  margin: 10px 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 24px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 24px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 24px;
  text-decoration: line-through;
}
.ProductUp {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  margin-top: 1rem;
  .prev {
    .img {
      background: url('/images/mobile/pre.png') no-repeat center center;
      background-size: contain;
      width: 15px;
      height: 15px;
      margin-left: .5rem;
      margin-right: .5rem;
    }
    &:hover {
      .img {
        background: url('/images/mobile/pre_hover.png') no-repeat center center!important;
      }
    }
  }
  .next {
    .img {
      background: url('/images/mobile/next.png') no-repeat center center;
      background-size: contain;
      width: 15px;
      height: 15px;
      margin-left: .5rem;
      margin-right: .5rem;
    }
    &:hover {
      .img {
        background: url('/images/mobile/next_hover.png') no-repeat center center!important;
      }
    }
  }
  .prev ,.next{
    padding: 5px 10px;
    border: 1px solid #cab597;
    color: #cab597;
    display: flex;
    align-items: center;
    font-size: 20px;
    border-radius: 5px;
    transition: all .3s;
    cursor: pointer;
    &:hover {
      background: #cab597;
      color: #fff;
    }
  }
}
</style>
