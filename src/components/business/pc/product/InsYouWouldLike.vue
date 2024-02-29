<template>
  <div :style="styla" v-if="ShowItemsLength>0" class="PcVersionYouLike">
    <p class="NoramlTitle">
      <!-- <span class="text">{{title}}</span> -->
      <img src="/images/pc/details_15.png" alt="">
    </p>
    <swiper :options="SwiperOption" ref="mySwiper">
      <!-- slides -->
      <swiperSlide v-for="(page,idx) in ShowItems" :key="idx">
        <div class="in_slider_page_container" @click="click">
          <div class="in_slider_page_item" v-for="(item,index) in page" :key="index">
            <div class="in_slider_page_item" v-if="!item.virtual">
              <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:90%;margin:0 auto;"></inProductWindow>
            </div>
          </div>
        </div>
      </swiperSlide>

    </swiper>
    <div class="swiper-button-prev swiper-button-prev-like" slot="button-prev"></div>
      <div class="swiper-button-next swiper-button-next-like" slot="button-next"></div>
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/pc/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/pc/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike extends Vue {
  // data
  private SwiperOption = {
    navigation: {
      nextEl: '.swiper-button-next.swiper-button-next-like',
      prevEl: '.swiper-button-prev.swiper-button-prev-like'
    }
  };
  private InnerItems: YouWouldLike[] = [];
  private InnerItemsCopy: YouWouldLike[] = [];
  private ShowItems: YouWouldLike[][] = [];
  private Layer: boolean = false;
  private ShowItemsLength: number = 0;
  //   props
  @Prop() private readonly styla!: string;
  @Prop() private readonly imgStyla!: string;
  @Prop() private readonly title!: string;
  @Prop() private readonly pageNum!: number;
  // @Prop() private readonly items!: YouWouldLike[];
  @Prop() private readonly ProductSku!: string;
  //   method
  click (e: MouseEvent) {
    let target = e.target as HTMLElement;
    if (target.nodeName === 'IMG') {
    }
  }
  buttonClick (item: YouWouldLike) {
    console.log(item);
  }
  created () {
    this.$Api.product.getRltProduct(this.ProductSku).then((result) => { this.InnerItems = result.YouWouldLike; this.ShowItemsLength = result.YouWouldLike.length; });
  }
  @Watch('InnerItems')
  onInnerItemsChange (o, n) {
    this.InnerItemsCopy = this.InnerItems.slice();
    this.ShowItems.splice(0, this.ShowItems.length);
    while (this.InnerItemsCopy.length > 0) {
      this.ShowItems.push(this.InnerItemsCopy.splice(0, this.pageNum));
    }
    while (
      this.ShowItems.length > 0 &&
      this.ShowItems[this.ShowItems.length - 1].length < this.pageNum
    ) {
      this.ShowItems[this.ShowItems.length - 1].push(
        new YouWouldLike('-1', '', '', '', '', '', new Currency(), '', '', new Currency(), true)
      );
    }
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  @Watch('ProductSku')
  onProductSkuChange (o, n) {
    this.$Api.product.getRltProduct(this.ProductSku).then(result => {
      this.InnerItems = result.YouWouldLike;
      this.ShowItemsLength = result.YouWouldLike.length;
    });
  }
}
</script>
<style lang="less">
.PcVersionYouLike .swiper-button-prev{
      width: 30px;
      height: 54px;
      // border-top-right-radius: 5px;
      // border-bottom-right-radius: 5px;
      // border:1px solid #c4a982;
      background: url('/images/pc/details_19.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      left:-30px;
      margin-top: 0;
}
.PcVersionYouLike .swiper-button-next{
      width: 30px;
      height: 54px;
      // border-top-left-radius: 5px;
      // border-bottom-left-radius: 5px;
      // border:1px solid #c4a982;
      background:  url('/images/pc/details_22.png') no-repeat center center!important;
      background-size: 15px;
      outline: 0;
      right: -30px;
      margin-top: 0;
}
.PcVersionYouLike .swiper-wrapper{
  width: 1086px;
}
.PcVersionYouLike {
  .Code{
    display: none;
  }
  .in_pdWindow_item_title{
    font-size: 20px;
    color: #333333;
  }
}
</style>
<style lang="less" scoped>
  .NoramlTitle {
    // background: url('/images/mobile/ptx_14.png') no-repeat center center;
    background-size: contain;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 60%;
    // height: 3rem;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    .text {
      font-size: 26px;
      color: #fff;
      padding-left: 3rem;
      font-weight: 700;
    }
  }
.PcVersionYouLike {
  margin-top: 80px;
  position: relative;
}
.in_slider_title {
  text-align: center;
  margin: 4rem 0;
  font-size: 2rem;
}
.in_slider_page_container {
  box-sizing: border-box;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  margin: 0 auto;
  user-select: none;
  padding-top: 10px;
  padding-bottom: 10px;
}
.in_slider_page_item {
   width: 100%;
}
    .titleCn {
      width: 100%;
      display: inline-block;
      text-align: center;
      margin-bottom: 2rem;
      span {
        font-size:1.7rem;
        display: block;
        width: 60%;
        text-align: center;
        margin: 0 auto;
        text-transform: uppercase;
        font-weight: 700;
        color: #37aca1;
        &::before {
          content: '';
          border-top: 4px solid #37aca1;
          width: 15%;
          display: block;
          margin: 0 auto;
          margin-bottom: .5rem;
        }
        &::after {
          content: '';
          border-bottom:4px solid #37aca1;
          width: 15%;
          display: block;
          margin: 0 auto;
          margin-top: .5rem;
        }
      }
    }
.titleNameA {
  width: 100%;
  display: inline-block;
  text-align: center;
  margin-bottom: 2rem;
  span {
    font-size:32px;
    display: block;
    width: 60%;
    text-align: center;
    margin: 0 auto;
    text-transform: uppercase;
    font-weight: 700;
    color: #37aca1;
    &::before {
      content: '';
      border-top: 4px solid #37aca1;
      width: 35%;
      display: block;
      margin: 0 auto;
      margin-bottom: .5rem;
    }
    &::after {
      content: '';
      border-bottom:4px solid #37aca1;
      width: 35%;
      display: block;
      margin: 0 auto;
      margin-top: .5rem;
    }
  }
}
</style>
