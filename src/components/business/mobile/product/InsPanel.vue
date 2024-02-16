<template>
  <div class="in_panel_warpper mobileWarper" :style="warpperStyle">
    <div class="in_panel_content">
      <inSelect
        v-for="(item,index) in panelDetail.AttrList"
        :items="item"
        :key="index"
        placeholder="请选择"
        v-model="ProductInfor['Attr'+(index+1)]"
        @input="changeAttr"
        @changePrice="AdditionalPrice"
      ></inSelect>
<!--       <div v-if="!panelDetail.negotiable" class="productRart">
        <div class="left">
            <inNum  :label="$i18n.t('product.countTitle')" v-model="ProductInfor.Qty" :v="ProductInfor.Qty" size="middle" :min="panelDetail.MinPurQty" :max="panelDetail.MaxPurQty"></inNum>
        </div>
        <div class="right">
              <p><el-rate  v-model="panelDetail.Score" disabled  disabled-void-color="#5f6548" disabled-void-icon-class="el-icon-star-off"></el-rate></p>
              <p class="ProductCode">{{$t("product.ProductCode")}}:{{panelDetail.Code}}</p>
        </div>
      </div>
      <div v-else>
         <el-input-number  :label="$i18n.t('product.countTitle')" v-model="panelDetail.negotiateMinQty" :min="panelDetail.MinPurQty" ></el-input-number>
      </div> -->
     <!-- 购物模式 -->
      <div v-if="panelDetail.negotiable == false || panelDetail.negotiable == null">
          <p><el-rate  v-model="panelDetail.Score" disabled  disabled-void-color="#5f6548" disabled-void-icon-class="el-icon-star-off"></el-rate></p>
          <p class="ProductCode" style="margin-bottom: 10px;">{{$t("product.ProductCode")}}:{{panelDetail.Code}}</p>
        <el-input-number v-model="MinPurQty" :min="panelDetail.MinPurQty"  :label="$i18n.t('product.countTitle')"></el-input-number>
      </div>
      <!-- 购物及议价模式 -->
      <div v-if="panelDetail.negotiable == true && panelDetail.negotiateMinQty > panelDetail.MinPurQty">
        <div style="display:none;">
          <el-input-number v-model="negotiateMinQty" :min="panelDetail.negotiateMinQty"  :label="$i18n.t('product.countTitle')"></el-input-number>
          <el-input-number v-model="MinPurQty" :min="panelDetail.MinPurQty"  :label="$i18n.t('product.countTitle')"></el-input-number>
        </div>
      </div>
      <!-- 议价模式 -->
      <div v-if="panelDetail.negotiable == true && panelDetail.negotiateMinQty==panelDetail.MinPurQty">
        <el-input-number v-model="negotiateMinQty" :min="panelDetail.negotiateMinQty"  :label="$i18n.t('product.countTitle')"></el-input-number>
      </div>
     <p class="productItr" v-html="panelDetail.OverView" v-if="!panelDetail.negotiable"></p>
      <div class="in_panel_iconList">
        <div v-for="item in panelDetail.icons" :key="item.id" class="in_panel_icon_warpper">
          <img :src="item.src" />
        </div>
      </div>

    </div>

    <!-- 购物模式 -->
    <div v-if="panelDetail.negotiable == false || panelDetail.negotiable == null">
        <div class="in_panel_footer">
        <button type="button" @click="click('addToCart')" class="CartBtn"  style="width:48%;margin-right:4%">{{$t('product.addToCart')}}</button>
        <button type="button" @click="click('buy')" class="CartBtn" style="width:48%">{{$t('product.buy')}}</button>

        </div>
    </div>
     <!-- 购物及议价模式 -->
    <div class="in_panel_footer" v-if="panelDetail.negotiable == true && panelDetail.negotiateMinQty > panelDetail.MinPurQty">
        <button type="button" @click="click('addToCart')" class="CartBtn"  style="width:48%;margin-right:4%">{{$t('product.addToCart')}}</button>
        <button type="button" @click="AddProdToMyEnquiry()" class="CartBtn" style="width:48%">{{$t('Enquiry.AddToEnquiry')}}</button>
    </div>
    <!-- 议价模式 -->
      <div class="in_panel_footer" v-if="panelDetail.negotiable == true && panelDetail.negotiateMinQty==panelDetail.MinPurQty">
        <p class="productTips">{{$t('Message.AskFor')}}</p>
        <button type="button" @click="AddProdToMyEnquiry()" class="CartBtn">{{$t('Enquiry.AddToEnquiry')}}</button>
    </div>

  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import inNum from '@/components/base/mobile/InsNum.vue';
import inSelect from '@/components/base/mobile/InsRadio.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import HkProductShare from '@/components/hkTasteBusiness/mobile/product/HkProductShare.vue';
import ShopCartItem from '@/model/shopCartItem';
@Component({ components: { inNum, inSelect, inButton, inPrices, HkProductShare } })
export default class InsPanel extends Vue {
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly panelDetail!: PanelDetail;
  @Prop() private readonly ProductSku!: string;
  Loading:boolean=false;
  buyLoading:boolean=false;
  private delay = 0;
  private NewPrice:number=0;
  private attrPrices:any[]=[];
  private SoldOutAttr:boolean= false;
  private AttrArray:any = '';
  private AttrComboImgList:any ='';
  private AttrSelectImg:string ='';
  private ProductInfor: ShopCartItem = new ShopCartItem();
  MinPurQty:number=this.panelDetail.MinPurQty;
  negotiateMinQty:number=this.panelDetail.negotiateMinQty;
  get warpperStyle (): string {
    return 'width:' + this.width + ';height:' + this.height + ';';
  }
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  AddProdToMyEnquiry () {
    if (!this.$Storage.get('isLogin')) {
       Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.AddProdToMyEnquiry); });
    } else {
      var params = {
        Sku: this.ProductSku,
        Attr1: this.ProductInfor.Attr1,
        Attr2: this.ProductInfor.Attr2,
        Attr3: this.ProductInfor.Attr3,
        Qty: this.negotiateMinQty
      };
      this.$Api.enquiry.AddProdToMyEnquiry(params).then(result => {
        if (result.data.Succeeded) {
          this.$router.push('/account/GetEnquiry');
        } else {
            this.$message({
              message: result.data.Message as string,
              type: 'error',
              customClass: 'messageboxNoraml'
            });
        }
      });
    }
  }
    click (action: string) {
    if (action) {
      if (action === 'addToCart') {
        this.Loading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.MinPurQty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              this.$message({
                message: result.Message.Message as string,
                type: 'success',
                customClass: 'messageboxNoraml'
              });
              this.Loading = false;
            }).then(() => {
            this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
          }).catch();
      } else if (action === 'buy') {
        this.buyLoading = true;
        this.$Api.shoppingCart.addItem(this.ProductSku, this.MinPurQty, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3)
          .then(
            (result) => {
              this.buyLoading = false;
               if (result.Message.Succeeded === true) {
                  this.$router.push({ name: 'shoppingcart' });
              } else {
                  this.$message({
                    message: result.Message.Message as string,
                    type: 'success',
                    customClass: 'messageboxNoraml'
                  });
              }
            }).catch();
      }
    } else {
      Vue.prototype.$Confirm('action', Object.create(this.ProductInfor));
    }
  }
  created () {

  }
  addFavorite () {
    let ps;
    if (this.panelDetail.IsFavorite) {
      ps = this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving'));
          this.$message(this.$t('product.successInRemoving') as string);
          this.panelDetail.IsFavorite = false;
        } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      ps = this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) {
          // Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding'));
          this.$message(this.$t('product.successInAdding') as string);
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
  // Shake (fn) {
  //   if (!(fn instanceof Function)) return;
  //   let timeout = 1000;
  //   if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  // }
  changeAttr () {
    this.Shake(() => {
      // 根据选择的属性值赋值给不同的数组
      console.log(this.panelDetail, 'this.panelDetailthis.panelDetail');
      if (this.panelDetail.AttrList[0].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1;
         this.AttrComboImgList = this.ProductInfor.Attr1;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2;
      }
      if (this.panelDetail.AttrList[0].length > 0 && this.panelDetail.AttrList[1].length > 0 && this.panelDetail.AttrList[2].length) {
        this.AttrArray = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
        this.AttrComboImgList = this.ProductInfor.Attr1 + '-' + this.ProductInfor.Attr2 + '-' + this.ProductInfor.Attr3;
      }
      console.log(this.AttrComboImgList, 'this.AttrComboImgListthis.AttrComboImgList');
      // 判断后台商品列表上架情况
      if (this.panelDetail.SoldOutAttrComboList.length > 0) {
           let flag = false;
            for (var k = 0; k < this.panelDetail.SoldOutAttrComboList.length; k++) {
                if (this.panelDetail.SoldOutAttrComboList[k] === this.AttrArray.toString()) {
                        this.SoldOutAttr = true;
                        flag = true;
                           break;
                  };
                  }
                  if (!flag) {
                    this.SoldOutAttr = false;
                  }
            }
      // 根据后台选择属性图片显示不同的值
      if (this.panelDetail.AttrComboImgList.length > 0) {
           let flagN = false;
            for (var r = 0; r < this.panelDetail.AttrComboImgList.length; r++) {
                if ((this.panelDetail.AttrComboImgList[r] as any).Key === this.AttrComboImgList.toString()) {
                        this.AttrSelectImg = this.panelDetail.AttrComboImgList[r].Img;
                        this.$store.dispatch('setAttrImgList', this.AttrSelectImg);
                        flagN = true;
                           break;
                  };
                  }
                  if (!flagN) {
                    this.AttrSelectImg = '';
                    this.$store.dispatch('setAttrImgList', '/images/pc/proddef.jpg');
                  }
            }
        this.$Api.product.checkProductStatus(this.ProductSku, this.ProductInfor.Attr1, this.ProductInfor.Attr2, this.ProductInfor.Attr3).then((result) => {
          this.panelDetail.ProductStatus = result.object0.ReturnValue;
        });
    });
  }
  AdditionalPrice (getval) {
    let flag = false;
   for (var j = 0; j < this.attrPrices.length; j++) {
     if (this.attrPrices[j].TypeId === getval.TypeId) {
          flag = true;
          this.attrPrices[j] = {
            TypeId: getval.TypeId,
            AdditionalPrice: getval.AdditionalPrice
        };
      break;
      }
    }
    if (!flag) {
      this.attrPrices.push({
        TypeId: getval.TypeId,
        AdditionalPrice: getval.AdditionalPrice
      });
    }
    this.$emit('getPrice', this.attrPrices);
  }
  @Watch('panelDetail.AttrList', { deep: true })
  onPAChange () {
    if (this.panelDetail.AttrList.length > 0 && this.panelDetail.AttrList[0].length === 0) this.changeAttr();
    // if (this.panelDetail.AttrList !== null) this.changeAttr();
  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less">
.mobileWarper  .el-button{
  padding: 20px 10px!important;
}
.mobileWarper .in_panel_footer button:hover{
  transform: translateY(-3px);
  border:1px solid #262626!important;
}
.mobileWarper .in_panel_footer .el-button+.el-button{
  margin-left:20px!important;
}
.mobileWarper .in_panel_footer{
    justify-content: flex-start!important;
}
.mobileWarper .in_panel_footer .actionBtn span{
  font-size: 18px;
}
.mobileWarper  .in_num_label{
  display: inline-block;
  width: auto!important;
  margin-right: 1rem;
}
.mobileWarper  .el-input-number__decrease {
  left: 0px;
}
.mobileWarper .el-input-number__increase {
  right: 0px;
}
.mobileWarper  .el-input-number__decrease,.mobileWarper .el-input-number__increase{
    width: 3rem !important;
    border-radius: 0px;
    top: 0px;
    background: #f5f5f5;
}
.mobileWarper .el-input-number__decrease i, .el-input-number__increase i{
    color: #666666;
}
.mobileWarper .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2rem!important;
  height: 2rem!important;
  color:#000!important;
  font-weight: 500;
  font-size: 1.4rem;
}
</style>
<style lang="less">
.in_panel_footer .el-button+.el-button{
  margin-left: 0px!important;
}
.in_panel_footer .actionBtn span{
  font-size: 1.6rem;
}
.in_panel_warpper .in_num_label{
  display: block;
  width: auto!important;
  margin-right: 1rem;
}
.in_panel_warpper .el-input-number{
  border:1px solid #e6e6e6;
  box-sizing: border-box;
   width: auto!important;
   line-height: 36px;
}
.in_panel_warpper .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.in_panel_warpper .in_num_main .el-input-number__decrease, .in_panel_warpper .in_num_main .el-input-number__increase{
    width: 2.5rem!important;
}
.in_panel_warpper .in_num_main .el-input-number__decrease i, .in_panel_warpper .in_num_main .el-input-number__increase i{
  color:#000;
}
.in_panel_warpper .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  line-height: 2.5rem!important;
  height: 2.5rem!important;
  color:#000!important;
  font-weight: 500;
  font-size: 1.4rem;
}
.mobileWarper{
  .in_num_warpper{
    .in_num_label{
      color:#666666;
    }
  }
  .in_panel_footer {
      .CartBtn{
      height: 3.5rem;
      font-size:1.4rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      background: #333;
      background-size:cover;
      width: 100%;
      color: #fff;
      margin-left: 0px!important;
      border: 5px;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
      .BuyBtn{
      height: 3.5rem;
      font-size:1.4rem;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #333;
      background-size:cover;
      color: #fff;
      border-radius: 3px;
      margin-bottom: 1rem;
      border:1px solid #333333;
      text-transform: uppercase;
      width: 48%;
      float: left;
      margin-left: 4%;
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          border: 1px solid #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
    .in_btn {
      height: 3.5rem;
      font-size:1.8rem;
      color: #333333;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: #333;
      background-size:cover;
      color: #fff;
      border-radius: 3px;
      margin-bottom: 1rem;
      text-transform: uppercase;
      width: 48%;
      float: left;
      margin-left: 4%;
      span{
        font-size:1.4rem;
        font-weight: 700;
      }
      &:first-child {
        margin-left: 0px!important;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.productRart {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .left {
    width: 48%;
  }
  .right {
    width: 48%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: flex-end;
    .ProductCode {
      font-size: 16px;

    }
  }
}
.productItr {
  margin-top: 20px;
  /deep/ p{
    font-size: 1.4rem;
    line-height: 2rem;
    height: 10rem;
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
    font-size:1.4rem!important;
    color: #808080!important;
  }
}
.productTips {
  font-size: 1.2rem;
  color: #9f1e3c;
  margin-bottom: 1rem;
}
.MinOrderQty {
  width: 90%;
  margin: 0 auto;
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.in_panel_content{
  width: 90%;
  margin: 0 auto;
}
.in_panel_footer{
  width: 90%;
  margin: 0 auto;
}
.in_panel_footer .actionBtn{
  width: 100%;
  font-size: 1.6rem;
  display: block;
  text-align: center;
}
.in_panel_footer .addToCart{
  border:1px solid #262626;
  background: #fff;
  color:#242424;
  margin-bottom: 1rem;
  padding: 15px 20px!important;
}
.in_panel_footer .buyNow{
  border:1px solid #262626;
  background:#262626;
  color:#fff;
  padding: 15px 20px!important;
}

.in_pannel_addtofav {
  width:90%;
  margin: 0 auto;
}
.in_panel_header {
  text-align: left;
}
.in_panel_subTitle{
    font-size: 2rem;
    position: relative;
    width: 90%;
    margin: 0 auto;
    text-align: center;
  >img{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
.in_panel_footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.productDetail_price_warpper {
  display: flex;
  flex-wrap: nowrap;
  height: 5rem;
  line-height: 5rem;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 0 1rem;
  margin: 1rem 0;
}
.productDetail_price {
  display: flex;
  flex-wrap: nowrap;
}
.productDetail_price_lable {
  font-size: 1.3rem;
}
.productDetail_precentPrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 1.6rem;
  font-size: 1.3rem;
  text-decoration: line-through;
}
.in_panel_iconList {
  margin-top: 3.3rem;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 1rem;
}
</style>
