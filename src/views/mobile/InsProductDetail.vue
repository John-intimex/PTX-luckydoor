<template>
  <div class="productDetail_container NomralBg" >
     <div v-if="this.Permission == 3" class="IsDetailshow">
        {{$t('messageTips.NoProduct')}}
    </div>
    <div v-else>
    <div class="productDetail_main" :style="'flex-wrap: wrap;'">
      <div class="ProductUp">
          <div class="prev" @click="getGetProductUp()"><i class="img"></i>{{$t('Message.Prev')}}</div>
          <div class="next" @click="getGetProductDown()">{{$t('Message.Next')}}<i class="img"></i></div>
      </div>
      <ProductSwiper width="100%"  :imgList="ImgList" :ProductTitleName="ProductTitleName"></ProductSwiper>
      <PkProductInfo :panelDetail="PanelDetail"  :ProductSku="ProductSku" :AddPrice="getNewsPrice" width="100%"></PkProductInfo>
      <inPanel :panelDetail="PanelDetail" width="100%" :ProductSku="ProductSku"  @getPrice="showPrice" itemscopestyle="margin-top:2rem;"></inPanel>
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
          <div class="comment"  @click="IsDetail=false"  v-if="this.$Settings.version !== 1" v-bind:class="{isActive:!IsDetail}">{{$t('product.comments.title')}}</div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="product_detail" v-html="Tabs.Detail" v-show="IsDetail && Tabs.Detail!=''"></div>
      <div class="product_detail" v-show="IsDetail" v-if="Tabs.Detail==''"><h3>{{$t('messageTips.NoContent')}}</h3></div>
      <inComments :ProductSku="ProductSku" v-show="!IsDetail"></inComments>
    </div>
    <div class id="tab"></div>
    <inYouWouldLike
      :pageNum="2"
      :title="$i18n.t('product.youWouldLike')"
      :ProductSku="ProductSku"
    ></inYouWouldLike>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import inTab from '@/components/business/mobile/product/InsTab.vue';
import inYouWouldLike from '@/components/business/mobile/product/InsYouWouldLike2.vue';
import YouWouldLike from '@/model/youWouldLike';
import PanelDetail from '@/model/PanelDetail';
import inPanel from '@/components/business/mobile/product/InsPanel.vue';
import inPreview from '@/components/business/mobile/product/InsPreview.vue';
import ProductSwiper from '@/components/hkTasteBusiness/mobile/product/PkProductSwiperN.vue';
import PkProductDetailCate from '@/components/hkTasteBusiness/mobile/product/HkProductDetailCate.vue';
import PkProductInfo from '@/components/hkTasteBusiness/mobile/product/PkProductInfo.vue';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import Tab from '@/model/Tab';
import inAccordion from '@/components/base/mobile/InsAccordion.vue';
import inComments from '@/components/business/mobile/product/InsComments.vue';
import inProductUpOrDown from '@/components/business/mobile/product/InsProductUpOrDown.vue';
import ProductListSwiper from '@/components/hkTasteBusiness/mobile/product/HkProductListSwiper.vue';
@Component({ components: {
  inPreview,
  inPanel,
  inTab,
  inYouWouldLike,
  inAccordion,
  inComments,
  ProductSwiper,
  PkProductDetailCate,
  PkProductInfo,
  inProductUpOrDown,
  ProductListSwiper
} })
export default class ProductDetail extends Vue {
  private Slider: YouWouldLike[] = [];
  private Tabs: Tab = new Tab('none');
  private PanelDetail: PanelDetail = new PanelDetail('', '', '', '', 0, 0, 0, 0, '', '', '', '');
  private Src: string = '';
  private ImgList: string[] = [];
  private ExtAttrList: any[] = [];
  private ProductSku:string = '0';
  private IsDetail:boolean = true;
  private Score:number=0;
  private CatalogTree: any[] = [];
  private getNewsPrice:number=0;
  private PriceA:number=0;
  private PriceB:number=0;
  private PriceC:number=0;
  private ProductTitleName:string = '';
  private Permission: string = '';
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  getProduct () {
    this.ProductSku = this.$route.params.id ? this.$route.params.id : '0';
    // 获取产品详情数据
    this.$Api.product.GetProduct(this.ProductSku).then((result) => {
       if (result) {
          this.PanelDetail = result.PanelDetail;
          console.log(result, 'this.PanelDetailthis.PanelDetail');
          this.ExtAttrList = result.PanelDetail.ExtAttrList;
          this.CatalogTree = result.PanelDetail.CatalogTree;
          this.ImgList = result.AdditionalImage;
          this.Tabs = result.Tab;
          this.Score = result.PanelDetail.Score;
          this.Permission = result.PanelDetail.Permission;

      if (this.Permission === '2') {
        if (this.$Storage.get('isLogin') === 0) {
        this.$Confirm(this.$t('Message.Logout'), this.$t('product.loginow'), () => { this.$router.push('/account/login'); }, () => { this.$router.push('/'); });
         }
      }
          this.$HiddenLayer();
          this.ProductTitleName = result.PanelDetail.Name;
          this.$nextTick(() => {
            document.title = result.PanelDetail.Name;
          });
       } else {
          this.$Confirm(this.$t('Message.Message'), this.$t('Message.FindNoProduct'), () => { this.Reload(); }, () => { this.$router.push('/'); });
       }
    });
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
  @Watch('$route', { deep: true })
  onWatchRoute (o, n) {
    this.getProduct();
  }
  mounted () {
    this.$store.dispatch('isClick', false);
    this.$store.dispatch('setAttrImgList', '');
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
.el-rate__decimal {
    display: inline-block;
    overflow: hidden;
    font-size: 18px;
}
.productDetail_container .in_pdWindow_item_description{
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
.productDetail_container {
  .currentPricesMain{
    display: flex;
    float: right;
    align-items: baseline;
    height: 3rem;
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.6rem;
        color: #ca3636;

      }
      &:nth-child(2){
        font-size:1.6rem;
        color:#ca3636;

        margin-left: 5px;
      }
    }
  }
  .primePricesMain{
    .huge{
      display: inline-block;
      &:nth-child(1){
        font-size: 1.2rem;
        color: #999;
        text-decoration: line-through;

      }
      &:nth-child(2){
        font-size: 1.2rem;
        color: #999;
        text-decoration: line-through;

      }
    }
  }
}
</style>
<style scoped lang="less">
.ProducBanner{
    width: 100%;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
  }
.ProductRate{
  width: 90%;
  margin: 0 auto;
  margin-top: .5rem;
}
.productDetail_container {
  width: 100%;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
  padding-top: 4rem;
  .IsDetailshow {
    width: 90%;
    margin: 0 auto;
    text-align: center;
    padding: 60px 0;
    font-size: 1.4rem;
  }
  .tab_warpper{
    margin: 1rem 0 0 0;
    .tab_header{
      width: 90%;
      margin:0 auto;
      .tab_inner {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .detail {
          width: 48%;
          background-size: 100% 100%;
          height: 50px;
          font-size: 1.6rem;
          text-align: center;
          color:#333;
          cursor: pointer;
          border-bottom: 1px solid #fff;
        }
        .comment {
            width: 48%;
            background-size: 100% 100%;
            height: 50px;
            font-size: 1.6rem;
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
          width: 100%;
          margin: 0 auto;
          background: #b19162;
          background-size: 100% 100%;
          text-align: center;
          font-size: 1.4rem;
          color: #fff;
          height: 40px;
          line-height: 40px;
      }
      .comment_title{
        border:1px solid #000;
      }
    }
    .product_detail{
      width: 90%;
      margin:0 auto;
      min-height: 20rem;
      margin-top: 1rem;
      margin-bottom: 1rem;
      h3 {
        font-size: 1.4rem;
        line-height: 2rem;
        color: #333333;
        font-weight: 500;
      }
      /deep/ p{
        font-size: 1.4rem;
        line-height: 2rem;
        color: #333333;
     }
     /deep/ span{
        font-size: 1.4rem!important;
        line-height: 2rem;
        color: #333333;
     }
    }
  }
}
.productDetail_main {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
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
  width: 90%;
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
    font-size: 1.2rem;
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
