<template>
<div class="in_panel_header">
    <div class="in_panel_product">
        <div class="ProductCode">
            <div class="leftpart">
              <p>{{panelDetail.Name}}</p>
              <div class="in_panel_subTitle"  v-if="panelDetail.negotiable == false || panelDetail.negotiable == null"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" :DefaultListPrice="panelDetail.DefaultListPrice+AddPrice" :DefaultSalePrice="panelDetail.DefaultSalePrice+AddPrice" :DefaultCurrency="panelDetail.DefaultCurrency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
              <div class="in_panel_subTitle"  v-if="panelDetail.negotiable == true && panelDetail.negotiateMinQty > panelDetail.MinPurQty"><inPrices :primePrices="panelDetail.ListPrice+AddPrice" :currentPrices="panelDetail.SalePrice+AddPrice"  :currency="panelDetail.Currency" :DefaultListPrice="panelDetail.DefaultListPrice+AddPrice" :DefaultSalePrice="panelDetail.DefaultSalePrice+AddPrice" :DefaultCurrency="panelDetail.DefaultCurrency" size="huge" :heightLine="true" styla="margin: 1rem 0;" :max="panelDetail.MaxPurQty" :min="panelDetail.MinPurQty"></inPrices></div>
            </div>
            <div class="rightpart" v-if="this.$Settings.version !== 1">
              <div class="in_pannel_addtofav"  v-if="!panelDetail.negotiable"><img :src="panelDetail.IsFavorite ? '/images/mobile/faved.png': '/images/mobile/unfav.png'" @click="addFavorite"/>{{$t('Message.Fav')}}</div>
              <p class="HkProductShare">{{$t("Action.Share")}} <HkProductShare></HkProductShare></p>
            </div>
        </div>
    </div>
  <div class="productRart" v-if="!panelDetail.negotiable || panelDetail.negotiable == null">
        <p><el-rate  v-model="panelDetail.Score" disabled  disabled-void-color="#5f6548" disabled-void-icon-class="el-icon-star-off"></el-rate></p>
        <p class="ProductCode">{{$t("product.ProductCode")}}:{{panelDetail.Code}}</p>
        <p class="productItr" v-html="panelDetail.OverView"></p>
  </div>
    <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div>
    <div class="productPtx"  v-if="panelDetail.negotiable ">
        <div class="productInfo">
          <p class="TitleBg"><span>{{$t('Enquiry.ProductInformation')}}</span></p>
          <div class="InnerTable">
            <!-- <p class="perline"><span class="left">{{$t('Enquiry.MinOrderQty')}}</span><span class="right">{{panelDetail.MinPurQty}}</span></p> -->
            <!-- <p class="perline"><span class="left">{{$t('Enquiry.negotiateMinQty')}}</span><span class="right">{{panelDetail.negotiateMinQty}}</span></p> -->
            <p class="perline"><span class="left">{{$t("product.ProductCode")}}</span><span class="right">{{panelDetail.Code}}</span></p>
            <p class="perline"><span class="left">{{$t('Message.Catalog')}}</span>
            <span class="right">
              <!-- <router-link to="/" class="NormalColor">{{$t('Message.HomeTips')}}</router-link> >  -->
              <span v-for="(v,index) in panelDetail.CatalogTree" :key="index"><router-link class="redColor" :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([v.Id]) + '&type=0'" v-if="v.ParentId!=0">{{v.Name}}</router-link></span>
            </span>
            </p>
          </div>
        </div>
        <div class="productInfo">
          <p class="TitleBg"><span>{{$t('Enquiry.ProductPackingInformation')}}</span></p>
          <div class="InnerTable">
            <p class="perline"><span class="left">{{$t('Enquiry.SingleUnitpcs')}}</span>
            <span class="right">
              {{panelDetail.UnitInfo.Desc}}
              <!-- pcs -->
              </span>
            </p>
            <p class="perline"><span class="left">{{$t('Enquiry.Dimension')}}</span><span class="right">{{panelDetail.PackagingInfo}}</span></p>
            <p class="perline">
              <span class="left">{{$t("Enquiry.Package")}}</span>
              <!-- <span class="right">{{panelDetail.Permission}}</span> -->
            </p>
          </div>
        </div>
        <div class="productInfo">
          <p class="TitleBg"><span>{{$t('Enquiry.ExportCarton')}}</span></p>
          <div class="InnerTable">
            <p class="perline"><span class="left">{{$t('Enquiry.PcsperCarton')}}</span>
            <!-- <span class="right">{{panelDetail.Width}}</span> -->
            </p>
            <p class="perline"><span class="left">{{$t("Enquiry.CtnDimension")}}</span><span class="right">{{panelDetail.ProductDimension}}</span></p>
          </div>
        </div>
        <div class="productInfo">
            <p class="TitleBg"><span>{{$t('Message.OtherDetails')}}</span></p>
            <div class="InnerTable">
              <p class="perline Specification" v-html="panelDetail.Specification"></p>
            </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/pc/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/pc/product/HkProductShare.vue';
@Component({ components: { inPrices, HkProductShare } })
export default class PkProductInfo extends Vue {
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  @Prop() private readonly AddPrice!: string;
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
        // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving'));
          this.$message({
            message: this.$t('product.successInRemoving') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message({
            message: this.$t('product.successInAdding') as string,
            type: 'success',
            customClass: 'messageBoxMobile'
          });
          this.panelDetail.IsFavorite = true;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
    return ps;
    // return this.$Api.product.addFavorite(this.ProductSku).then((result) => {
    //   if (result.Succeeded) {
    //     // Vue.prototype.$Confirm('succeed', this.$t('product.successInAdding'));
    //   } else if (result.ReturnValue.Code === 1000) {
    //     Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
    //   }
    // });
  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style scoped lang="less">
.in_unitInfo{
  font-size: 16px;
  color:@base_color;
  text-align: right;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.in_panel_product .ProductCode{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.in_panel_product .ProductCode .leftpart{
    width:75%;
    float: left;
    font-size: 28px;
    padding-top: 15px;
    margin-bottom: 20px;
    p{
      color: #333333;
      font-weight: bold;
      font-size: 28px;
    }
}
.in_panel_product .ProductCode .rightpart{
    width: 23%;
    float: left;
    text-align: right;
    font-size: 1rem;
}
.productItr {
  margin-top: 20px;
  /deep/ p{
    font-size: 18px;
    line-height: 30px;
    height: 150px;
    overflow: hidden;
    color: #808080!important;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    line-clamp: 5;
    -webkit-box-orient: vertical;
  }
  /deep/  span{
    font-size:18px!important;
    color: #808080!important;
  }
}
.productInfo {
  width: 100%;
  display: inline-block;
  margin-bottom: 1rem;
  .TitleBg {
    height: 48px;
    line-height: 48px;
    background: #f8f8f8;
    width: 100%;
    span {
      width: 272px;
      height: 48px;
      // margin: 0 auto;
      font-size:20px;
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      background-color: #112a4d;
      padding-left: 18px;
      position: relative;
      &::after{
        content: '';
        width: 0;
        height: 0;
        border-bottom: 48px solid #112a4d;
        border-right: 42px solid transparent;
        position: absolute;
        right: -42px;
        top: 0;
      }
    }
  }
  .InnerTable {
    width: 94%;
    margin: 0 auto;
    .perline {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      margin-top: 14px;
      .left{
        width: 38%;
        font-size:20px;
        color: #333333;
      }
      .right {
        width: 60%;
        font-size:20px;
        color:#999999;
        a{
          font-size:20px;
          color:#999999;
        }
      }
    }
  }
}
.in_panel_subTitle{
    font-size: 2rem;
    position: relative;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
.perlist,.in_pannel_addtofav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  img {
    width: 30px;
    cursor: pointer;
  }
}
.productRart {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  p{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    /deep/ .el-rate__icon {
      color: #ffbb07!important;
    }
  }
  .ProductCode {
    color: #999999;

  }
}
.redColor {
  color: @base_color;
}
.NormalColor {
  color: #333;
}
.Specification {
  /deep/ p {
    font-size: 20px!important;
    color:#2c3e50!important;
    line-height: 30px;
    height: 90px;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
  }
  /deep/ span {
    font-size: 20px!important;
    color:#2c3e50!important;
  }
}
.HkProductShare {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;
  height: 40px;
  justify-content: flex-end;
  color: #666666;
  font-size: 20px;
}
</style>
