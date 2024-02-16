<template>
  <div :style="styla" v-if="ShowItemsLength > 0 ">
    <div class="productCat">
          <p class="NoramlTitle"><span class="text">{{title}}</span></p>
          <swiper  :options="SWproductCatOption" ref="mySwiper" v-if="InnerItems.length > 0">
            <!-- slides -->
            <swiper-slide v-for="(item, index) in InnerItems" :key="index">
                  <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:90%;margin:0 auto;padding-bottom:2rem;margin-bottom: 2rem;"></inProductWindow>
            </swiper-slide>
            <div class="swiper-pagination pwswiper" slot="pagination" v-if="SWproductCatOption.pagination"></div>
          </swiper>
       </div>
    <!-- <div class="productBox">
      <swiper :options="SwiperOption" ref="mySwiper" class="youlikeMain">
        <swiperSlide v-for="(item,idx) in InnerItems" :key="idx">
          <inProductWindow :item="item" :imgStyla="imgStyla" styla="width:90%;margin:0 auto;padding-bottom:2rem;margin-bottom: 2rem;"></inProductWindow>
        </swiperSlide>
          <div class="swiper-pagination" slot="pagination" v-if="SwiperOption.pagination"></div>
      </swiper>
    </div> -->
  </div>
</template>
<script lang="ts">
import YouWouldLike from '@/model/youWouldLike';
import inButton from '@/components/base/mobile/InsButton.vue';
import inProductWindow from '@/components/hkTasteBusiness/mobile/product/HkProductWindow.vue';
import Currency from '@/model/currency';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import { swiper, swiperSlide } from 'vue-awesome-swiper/src';
@Component({
  components: {
    inButton, inProductWindow, swiper, swiperSlide
  }
})
export default class InsYouWouldLike2 extends Vue {
  // data
  SWproductCatOption = {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: {
      el: '.pwswiper',
      clickable: true
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
  // @Prop() private readonly pageNum!: number;
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
  @Watch('ProductSku')
  onProductSkuChange (o, n) {
    this.$Api.product.getRltProduct(this.ProductSku).then(result => {
      this.InnerItems = result.YouWouldLike;
      this.ShowItemsLength = result.YouWouldLike.length;
    });
  }
}
</script>
<style lang="less" scoped>
.productBox {
  margin-top: 3rem;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
.clear {
  clear: both;
}
.youlikeMain{
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  padding-top: 10px;
  padding-bottom:2rem;
}
  .NoramlTitle {
    background: url('/images/mobile/ptx_14.png') no-repeat center center;
    background-size: contain;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    width: 60%;
    height: 3rem;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    .text {
      font-size: 1.6rem;
      color: #fff;
      padding-left: 3rem;
      font-weight: 700;
    }
  }
    .productCat {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      padding-top: 2rem;
      padding-bottom: 2rem;
      /deep/ .swiper-container {
        padding-bottom: 3rem;
        padding-top: 2rem;
        width: 90%;
        margin: 0 auto;
        .swiper-pagination-bullet{
          width: 10px!important;
          height: 10px!important;
          background: #e6e6e6;
          opacity: 1;
        }

        .swiper-pagination-bullet-active{
          background: #b19162!important;
        }
      }
    }
</style>
