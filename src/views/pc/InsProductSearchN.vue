<template>
  <div id="container" class="NomralBg NormalTop">
<!--     <div class="ProductSearch" v-if="isPtx">
      <div class="leftSide">
         <advancedSearch :attrType="2"  @advancedChange="advancedChange" />
      </div>
      <div class="rightSide">
          <transition name="slide">
            <div key="1" v-if="!waiting">
              <div class="prolist-box" v-if="proList.length > 0">
                <ins-productList :column="4" :allItems="proList" />
                  <div class="pager" v-if="totalRecord > pageSize">
                    <InsPage
                      :total="totalRecord"
                      v-model="currentPage"
                      :pageNum="pageSize"
                      :currentPage = "currentPage"
                    ></InsPage>
                </div>
              </div>
              <div class="prolist-box" v-else>
                <h3 class="nocontentTips">{{ $t("messageTips.NoContent") }}</h3>
              </div>
            </div>
          </transition>
          <transition name="slide">
            <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
          </transition>
      </div>
    </div> -->
    <div class="ProductSearch">
      <div class="SearchSlide">
        <div class="leftSide">
          <NsadvancedSearch @advancedChange="advancedChange" v-if="isAdvanced"  @closeSub="closeSub" @resetAll="resetAll" />
        </div>
      </div>
      <!-- <div class="selectBar"> -->
          <!-- <ul>
            <div class="left">
              <li @click="showSearchSlide" class="liTop"><span class="filterIcon"></span><b>{{$t('product.Screening')}}</b></li>
            </div>
            <div class="right">
            <li  class="sortBox liTop" @click.stop="showList=!showList">
              <p class="sortTitle">
                {{$t('product.SortBy')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <transition name="el-fade-in-linear">
                <ul class="sortList" v-if="showList">
                  <li @click="handleCommand('desc')" :style="{'color':command=='desc'?'#b19162':'#333333'}">{{$t('product.PriceHL')}}</li>
                  <li @click="handleCommand('asc')" :style="{'color':command=='asc'?'#b19162':'#333333'}">{{$t('product.PriceLH')}}</li>
                </ul>
              </transition>
            </li>
           <li  class="sortBox liTop" @click.stop="ShowSellType=!ShowSellType">
              <p class="sortTitle">
                {{$t('Enquiry.SellType')}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </p>
              <transition name="el-fade-in-linear">
                <ul class="sortList" v-if="ShowSellType">
                  <li @click="handleSellType(0)" :style="{'color':SellType==0?'#b19162':'#333333'}">{{$t('Enquiry.RetailBargaining')}}</li>
                  <li @click="handleSellType(1)" :style="{'color':SellType==1?'#b19162':'#333333'}">{{$t('Enquiry.Retail')}}</li>
                  <li @click="handleSellType(2)" :style="{'color':SellType==2?'#b19162':'#333333'}">{{$t('Enquiry.Bargaining')}}</li>
                </ul>
              </transition>
            </li>
            </div>
          </ul> -->
        <!-- </div> -->
      <div class="NsProduct">
        <!-- <div class="banner">
          <img src="/images/pc/searchback.jpg" alt="">
        </div> -->
          <transition name="slide">
            <div key="1" v-if="!waiting">
              <div class="prolisttext">
                <p><span>{{ProductTotalRecord}}</span> items meet your searching criterion</p>
              </div>
              <div class="prolist-box" v-if="proList.length > 0">
                <ins-productList :column="4" :allItems="proList" class="productPer" />
                  <div class="pager" v-if="totalRecord > pageSize">
                    <InsPage
                      :total="totalRecord"
                      v-model="currentPage"
                      :pageNum="pageSize"
                      :currentPage = "currentPage"
                    ></InsPage>
                  </div>
                </div>
              <div class="prolist-box" v-else>
                <h3 class="nocontentTips">{{ $t("messageTips.NoContent") }}</h3>
              </div>
            </div>
          </transition>
          <transition name="slide">
            <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
          </transition>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import YouWouldLike from '@/model/youWouldLike';
import $ from 'jquery';
@Component({
  components: {
    InsProductList: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/business/pc/product/InsProductList.vue'
      ),
    advancedSearch: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/hkTasteBusiness/pc/product/InsAdvancedSearch.vue'
      ),
     NsadvancedSearch: () => import('@/components/hkTasteBusiness/pc/product/NsAdvancedSearch.vue'),
     InsPage: () =>
      import(
        /* webpackChunkName: 'product' */ '@/components/base/pc/InsPage.vue'
      )
  }
})
export default class InsProductSearch extends Vue {
  proList: YouWouldLike[] = []; // 产品数据
  currentPage: number = 1; // 当前页
  pageSize: number = 9; // 每页显示条目个数
  totalRecord: number = 0; // 总条目数
  private tips: boolean = true;
  private LoadingInstance!: any;

  attrs: object[] = []; // 选中的产品属性数组
  searchCatalogs: number[] = []; // 选中的产品目录数组
  searchType: number = 1; // 搜索类型（0 => 叠加，1 => 筛选）
  isAdvanced: boolean = true;
  PriceItem:string='desc';
  showList:boolean = false;
  command:string='';
  SortName:string = '';
  private waiting: boolean = true;
  SellType:number=0;
  ShowSellType:boolean =false;
  ProductTotalPage: string='';
  ProductTotalRecord: string='';
  // 搜索关键词
  get searchKey() {
    let a = this.$route.params.key;
    if (a === '-') {
      return '';
    } else {
      return a;
    }
  }
  get isPtx () {
      if (localStorage.getItem('isPtx') === '0') {
        return false;
      } else {
        return true;
      }
  }
  get islogin () {
    return this.$Storage.get('isLogin');
  }
  handleCommand(command) {
    this.command = command;
    if (command === 'newest') {
      this.SortName = 'createdate';
      this.PriceItem = 'desc';
      this.showList = false;
    } else {
      this.SortName = 'SalePrice';
      this.PriceItem = command;
      this.showList = false;
    }

    this.productSearch();
  }
  handleSellType(command) {
    this.SellType = command;
    this.productSearch();
  }
  // 重置搜索
  resetAll() {
    // this.$router.push('/product/search/-');
    window.location.href = '/product/search/-';
    this.closeSub();
  }
  // 关闭筛选弹窗
  closeSub() {
    $('.SearchSlide').fadeOut();
    $('.leftSide').removeClass('closeBar');
    document.body.style.overflow = 'auto';
  }
  // 打开筛选弹窗
  showSearchSlide() {
    $('.SearchSlide').fadeIn();
    $('.leftSide').addClass('closeBar');
    document.body.style.overflow = 'hidden';
  }
  // 价格传值
  getselect(val) {
    this.PriceItem = val;
    this.productSearch();
  }
  // 产品高级搜索
  productSearch() {
    this.TShake(() => {
      this.$Api.product
        .search({
          Key: this.searchKey,
          PageInfo: {
            Page: this.currentPage,
            PageSize: this.pageSize,
            SortName: 'SalePrice',
            SortOrder: this.PriceItem
          },
          CatIdS: this.searchCatalogs,
          Attrs: this.attrs,
          Type: this.searchType,
          Reflesh: 1,
          SellType: this.SellType
        })
        .then(result => {
          this.proList = result.YouWouldLike;
          this.totalRecord = result.TotalRecord;
          this.waiting = false;
          this.$HiddenLayer();
          this.ProductTotalPage = result.TotalPage;
          this.ProductTotalRecord = result.TotalRecord;
        });
    }, 500);
  }
  delay = 0;
  TShake(fn, d) {
    if (!(fn instanceof Function)) return;
    let timeout = d || 200;
    if (this.delay === 0) {
      this.delay = setTimeout(fn, timeout);
    } else {
      clearTimeout(this.delay);
      this.delay = setTimeout(fn, timeout);
    }
  }
  advancedChange(Attrs, Catalogs) {
    this.currentPage = 1;
    this.attrs = Attrs;
    this.searchCatalogs = Catalogs;
    this.productSearch();
  }

  mounted() {
    // this.productSearch();
    this.ShowSellType = true;
  }

  @Watch('searchKey', { deep: true })
  onSearchKeyChange() {
    this.productSearch();
  }

  @Watch('currentPage', { deep: true })
  onCurrentPage() {
    this.productSearch();
  }
}
</script>
<style scoped lang="less">
.sortBox{
  position: relative;
  z-index: 1;
  .sortTitle{
    font-size: 20px;
    font-weight: 500;
    color: #fff;
    img{
      margin-left:24px;
      margin-right:23px;
    }
  }
  .sortList{
    width:100%;
    box-shadow: 0px 2px 5px #ccc;
    position: absolute;
    left:0;
    top:50px;
    box-sizing:border-box;
    background: #fff;
    li{
      text-align: center;
      border-bottom: 1px solid #eee;
      font-size: 20px;
      &:last-of-type{
        border-bottom: none;
      }
    }
  }
}
#container {
  min-height: 700px;
}
.NsProduct {
  width: 942px;
  display: block;
  // margin-top: 20px;
  float: right;
    /deep/ .products_container{
      .product_item {
        width: 300px!important;
        margin-right: 20px;
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
  }
  .prolisttext{
    margin-top: 24px;
    margin-bottom: 24px;
    text-align: right;
    p{
      color: #333333;
      font-size: 18px;
      font-family: Arial;
      letter-spacing: 2px;
      span{
        color: #f0bb23;
        font-family: Arial;
      }
    }
  }
  .banner{
    img{
      display: block;
      width: 100%;
    }
  }
}
.ProductTips {
  width: 90%;
  margin: 0 auto;
  p{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-size: 22px;
    align-items: center;
    margin-bottom: 10px;
    span{
      font-size: 22px;
    }
    a{
      font-size: 22px;
    }
  }
  .redcolor {
    color:#9f1e3c;
    a{
      color:#9f1e3c;
    }
  }
}
.nocontentTips {
  width: 95%;
  margin: 0 auto;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: left;
  display: block;
  padding: 1rem;
  color: #666;
}
.faker {
  width: 100%;
  height: 29vw;
  background-color: aliceblue;
}
.ProducBanner {
  width: 100%;
  background-size: 100% 100%;
  display: inline-block;
  box-sizing: border-box;
  .innerBanner {
    width: 100%;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.ProductSearch {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding-top: 4rem;
  .leftSide {
    width: 25%;
  }
  .rightSide {
    width: 73%;
  }
}
.SearchSlide {
  width: 240px;
  // position: fixed;
  left: 0;
  top: 0px;
  bottom: 0px;
  // background: rgba(0, 0, 0, 0.6);
  // z-index: 999999;
  // display: none;
  .leftSide {
    width: 240px;
    // left: -20%;
    // min-height: 100%;
    // position: absolute;
    // transition: all 0.5s;
    // background: #f2f1f0;
    // border-top-right-radius: 1rem;
    // border-bottom-right-radius: 1rem;
    overflow: hidden;
  }
}
.closeBar {
  left: 0% !important;
}
.selectBar {
  width: 100%;
  margin: 0 auto;
  display: inline-block;
  margin-top: 2rem;
  >ul {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .left {
      width: 30%;
    }
    .right {
      width: 68%;
      display: flex;
      justify-content: flex-end;
    }
     .liTop {
      float: left;
      margin-right: 2.5%;
      height: 50px;
      line-height: 50px;
      list-style: none;
      display: flex;
      justify-items: center;
      justify-content: center;
      align-items: center;
      background: #000;
      background-size: 100% 100%;
      color: #333;
      width: 250px;
      cursor: pointer;
      b {
        width: 60%;
        display: inline-block;
        text-align: center;
        font-size: 20px;
        font-weight: 500;
        color: #fff;
      }
      select {
        width: 100%;
        border: none;
        padding-left: 0.5rem;
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(/images/mobile/mobileIndex_14.png) 90% 17px no-repeat;
        background-size: auto;
        outline: none;
        cursor: pointer;
      }
    }
  }
}
</style>
