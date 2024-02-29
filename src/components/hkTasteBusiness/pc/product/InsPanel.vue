<template>
  <div class="in_panel_warpper PcVersion" :style="warpperStyle">
    <div class="in_panel_content">
      <inSelect
        v-for="(item,index) in panelDetail.AttrList"
        :items="item"
        :key="index"
        placeholder="请选择"
        v-model="ProductInfor['Attr'+(index+1)]"
        styla="padding: 0 10px;"
        @input="changeAttr"
        @changePrice="AdditionalPrice"
      ></inSelect>
      <!-- 购物模式 -->
      <div v-if="panelDetail.negotiable == false || panelDetail.negotiable == null">
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
        <!-- <p class="productTips">{{$t('Message.AskFor')}}</p> -->
        <button type="button" @click="AddProdToMyEnquiry()" class="CartBtn">{{$t('Enquiry.AddToEnquiry')}}</button>
    </div>
    <!-- <inRecommend :Skus="ProductSku"></inRecommend> -->
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import PanelDetail from '@/model/PanelDetail';
import ProductAttr from '@/model/ProductAttr';
import Button from '@/model/Button';
import inNum from '@/components/base/pc/InsNum.vue';
import inSelect from '@/components/base/pc/InsRadio.vue';
import inButton from '@/components/base/pc/InsButton.vue';
import inPrices from '@/components/base/pc/InsPrices.vue';
import inRecommend from '@/components/business/pc/product/InsRecommend.vue';
import ShopCartItem from '@/model/shopCartItem';
@Component({ components: { inNum, inSelect, inButton, inPrices, inRecommend } })
export default class Panel extends Vue {
  @Prop() private panelDetail!: PanelDetail;
  @Prop() private readonly width!: string;
  @Prop() private readonly height!: string;
  @Prop() private readonly ProductSku!: string;
  private delay = 0;
  private Loading:boolean=false;
  private buyLoading:boolean=false;
  private ProductInfor: ShopCartItem = new ShopCartItem();
  private NewPrice:number=0;
  private attrPrices:any[]=[];
  private SoldOutAttr:boolean= false;
  private AttrArray:any = '';
  private AttrComboImgList:any ='';
  private AttrSelectImg:string ='';
  MinPurQty:number=this.panelDetail.MinPurQty;
  negotiateMinQty:number=this.panelDetail.negotiateMinQty;
/*   get MinPurQty () {
    return this.panelDetail.MinPurQty;
  }
  get negotiateMinQty () {
    return this.panelDetail.negotiateMinQty;
  } */
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
  addFavorite () {
    if (this.panelDetail.IsFavorite) {
      this.$Api.product.removeFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInRemoving')); this.panelDetail.IsFavorite = false; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    } else {
      this.$Api.product.addFavorite(this.ProductSku).then((result) => {
        if (result.Succeeded) { Vue.prototype.$Confirm(this.$t('Message.Message'), this.$t('product.successInAdding')); this.panelDetail.IsFavorite = true; } else if (result.ReturnValue.Code === 1000) {
          Vue.prototype.$Confirm(this.$t('product.logouted'), this.$t('product.loginow'), () => { this.$Login(this.addFavorite); });
        }
      });
    }
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
                        console.log(this.AttrSelectImg, 'this.AttrSelectImgthis.AttrSelectImg');
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
  getAttrImage () {
    this.Shake(() => {
      this.$Api.product.getAttrImage(this.ProductSku, 1, this.ProductInfor.Attr1, this.ProductInfor.Attr2, 0).then((result) => {
        console.log(result, 'resultresult');
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
  }
  mounted() {

  }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less">
.PcVersion  .el-button{
  padding: 20px 10px!important;
}
.PcVersion .in_panel_footer .el-button+.el-button{
  margin-left:20px!important;
}
.PcVersion .in_panel_footer{
    justify-content: flex-start!important;
}
.PcVersion .in_panel_footer .actionBtn span{
  font-size: 18px;
}
.PcVersion  .in_num_label{
  display: block;;
  width: auto!important;
  margin-right: 1rem;
}
.PcVersion  .el-input__inner{
  border:none!important;
  box-sizing: border-box;
  width: 4rem;
}
.PcVersion  .el-input-number {
  border: 1px solid #e6e6e6;
  width: auto;
  height: 38px;
}
.PcVersion  .el-input-number__decrease {
  left: 0px;
}
.PcVersion .el-input-number__increase {
  right: 0px;
}
.PcVersion  .el-input-number__decrease,.PcVersion .el-input-number__increase{
    width: 2rem !important;
    top:0px!important;
    background: #f5f5f5;
    border-radius: 0px;
}
.PcVersion .el-input-number__decrease i, .el-input-number__increase i{
  color:#666666;
}
.PcVersion .el-input-number .el-input__inner{
  padding-left: 0rem;
  padding-right: 0rem;
  background: transparent!important;
  width: 10rem;
  color:#000!important;
  font-weight: 500;
  font-size: 1.4rem;
}
</style>
<style lang="less" scoped>
/deep/ .in_num_main {
  display: block!important;
}
.productTips {
  font-size: 1.2rem;
  color: #9f1e3c;
  margin-bottom: 1rem;
}
.MinOrderQty {
  margin-bottom: 20px;
}
.in_panel_footer .actionBtn{
    width: 49%;
    display: block;
    text-align: center;
}
@media screen and (max-width: 800px)  {
  .in_panel_warpper {
    padding: 0 2rem;
  }
}
.Recommend{
  margin-top:12px;
}
.in_panel_header {
  text-align: left;
}
.in_panel_title {
  position: relative;
  font-size: 25px;
}
.in_panel_title img{
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0,-50%);
  cursor: pointer;
}
.in_panel_content {
  min-height: 70%;
}
.in_panel_footer {
  margin-top: 20px;
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
  font-size: 16px;
}
.productDetail_precentPrice_content {
  margin-left: 20px;
  font-size: 16px;
}
.productDetail_precentPrice_content_heightLine {
  color: red;
}
.productDetail_primePrice_content {
  margin-left: 20px;
  font-size: 16px;
  text-decoration: line-through;
}
.in_panel_iconList {
  margin-top: 40px;
  text-align: left;
  display: flex;
  flex-wrap: nowrap;
}
.in_panel_icon_warpper {
  margin-right: 10px;
}
    .in_panel_footer {
      .CartBtn{
        height: 54px;
        font-size: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        // border-radius: 3px;
        transition: .1s;
        // text-transform: uppercase;
        background-color: unset;
        background: #f5ad2a;
        background-size: cover;
        width: 100%;
        border: 0px;
        font-weight: bold;
        position: relative;
        &::before{
          content: '';
          width: 37px;
          height: 37px;
          background: url('/images/pc/details_07.png') no-repeat center center;
          display: block;
          margin-right: 18px;
          // position: absolute;
          // top: 50%;
          // left: ;
        }
        &:disabled{
          cursor:not-allowed;
          background: #ccc;
          color: #333333;
           &:hover{
           transform: translateY(0px)!important;
          }
        }
      }
      .BuyBtn{
        height: 50px;
        font-size: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #333;
        background-size: cover;
        width: 100%;
        color: #fff;
        border-radius: 3px;
        transition: .1s;
        text-transform: uppercase;
        width: 48%;
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
        height: 50px;
        font-size: 20px;
        background: #333;
        background-size: cover;
        width: 100%;
        color: #fff;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        transition: .1s;
        font-weight: 700;
        &:first-child {
          margin-right: 4%;
        }
      }
    }
</style>
