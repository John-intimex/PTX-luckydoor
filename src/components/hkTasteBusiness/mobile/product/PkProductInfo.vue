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
              <div class="perlist"> <HkProductShare></HkProductShare>{{$t("Action.Share")}}</div>
            </div>
        </div>
    </div>
    <div class="productPtx"  v-if="panelDetail.negotiable">
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
            <p class="perline">
              <span class="left">{{$t('Enquiry.Dimension')}}</span>
              <span class="right">{{panelDetail.ProductDimension}}</span>
            </p>
            <p class="perline">
              <span class="left">{{$t("Enquiry.Package")}}</span>
              <!-- <span class="right">{{panelDetail.Permission}}</span> -->
              <span class="right">{{panelDetail.YoutubeLink}}</span>
            </p>
          </div>
        </div>
        <div class="productInfo">
          <p class="TitleBg"><span>{{$t('Enquiry.ExportCarton')}}</span></p>
          <div class="InnerTable">
            <p class="perline"><span class="left">{{$t('Enquiry.PcsperCarton')}}</span>
            <!-- <span class="right">{{panelDetail.Width}}</span> -->
            <span class="right" v-html="panelDetail.Specification"></span>
            </p>
            <p class="perline">
              <span class="left">{{$t("Enquiry.CtnDimension")}}</span>
              <span class="right">{{panelDetail.PackagingInfo}}</span>
            </p>
          </div>
        </div>
        <div class="productInfo">
            <p class="TitleBg"><span>{{$t('Message.OtherDetails')}}</span></p>
            <div class="InnerTable">
              <p class="perline Specification" v-html="panelDetail.OverView"></p>
            </div>
        </div>
    </div>
    <!-- <div class="in_unitInfo" v-if="panelDetail.UnitInfo.Desc!==null">{{$t('product.Unit')}}:{{panelDetail.UnitInfo.Desc}}</div> -->

</div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
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
  }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style scoped lang="less">
.productPtx {
  width: 100%;
  display: inline-block;
}
.in_unitInfo{
  font-size: 1.2rem;
  color:@base_color;
  text-align: right;
  width: 95%;
  margin: 0 auto;
}
.in_panel_header{
  width: 100%;
  display: block;
}
.in_panel_product{
    width: 90%;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 1rem;
    display: flex;
    flex-wrap: wrap;
}
.in_panel_product .ProductCode{
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
      .leftpart{
      width:75%;
      float: left;
      p{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        font-size: 1.6rem;
      }
    .in_panel_subTitle{
      position: relative;
      width: 100%;
      margin: 0 auto;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .rightpart{
    width: 23%;
    float: left;
    text-align: right;
    font-size: 1rem;
    .perlist {
      width: 100%;
      display: flex;
      flex-wrap:wrap;
      justify-content: flex-end;
      align-items: center;
    }
    .in_pannel_addtofav{
      width: 100%;
      display: flex;
      flex-wrap:wrap;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: .5rem;
    }
    .in_pannel_addtofav img{
        width:2.5rem;
    }
}
}
.productInfo {
  width: 100%;
  display: inline-block;
  margin-bottom: 1rem;
  .TitleBg {
    height: 3rem;
    line-height: 3rem;
    background: #f8f8f8;
    span {
      font-size: 1.3rem;
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      width: 17rem;
      height: 3rem;
      // margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      color: #fff;
      background-color: #112a4d;
      padding-left: 1rem;
      position: relative;
      &::after{
        content: '';
        width: 0;
        height: 0;
        border-bottom: 3rem solid #112a4d;
        border-right: 2.4rem solid transparent;
        position: absolute;
        right: -2.35rem;
        bottom: 0;
      }
    }
  }
  .InnerTable {
    width: 90%;
    margin: 0 auto;
    .perline {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 1rem;
      .left{
        width: 38%;
        font-size: 1.2rem;
      }
      .right {
        width: 60%;
        font-size: 1rem;
        // color:#999999;
        /deep/ p{
          font-size: 1rem;
          // color: #999;
        }
        a{
          font-size:1rem;
          // color:#999999;
        }
      }
    }
  }
}
.redColor {
  color: @base_color;
  font-size: 1.2rem;
}
.NormalColor {
  font-size: 1.2rem;
  color: #2c3e50;
}
.Specification {
  /deep/ p {
    font-size: 1.2rem!important;
    color:#2c3e50!important;
    line-height: 1.6rem;
    height: 4.8rem;
    word-break:break-all;
    display:-webkit-box;
    -webkit-line-clamp:3;
    -webkit-box-orient:vertical;
    overflow:hidden;
  }
  /deep/ span {
    font-size: 1.2rem!important;
    color:#2c3e50!important;
  }
}
</style>
