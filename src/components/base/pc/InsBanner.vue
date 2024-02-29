<template>
  <div class="banner NormalTop" v-loading="loading">
    <swiper  :options="swiperOption" ref="mySwiper" v-if="bannerList.length">
      <!-- slides -->
      <swiper-slide v-for="(slide, index) in bannerList" :key="index">
        <a :href="slide.Url || 'javascript:;'" :target="slide.Url ? slide.IsRedirect ? '_blank' : '_self' : ''">
          <img :src="slide.Image" />
        </a>
      </swiper-slide>
      <!-- Optional controls -->
      <!-- <div class="swiper-pagination" slot="pagination" v-if="swiperOption.pagination"></div> -->
      <!-- <div class="swiper-button-prev" slot="button-prev" v-if="swiperOption.navigation && swiperOption.navigation.nextEl"></div> -->
      <!-- <div class="swiper-button-next" slot="button-next" v-if="swiperOption.navigation && swiperOption.navigation.prevEl"></div> -->
    </swiper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// banner组件通信传值设定：
// initOptions：swiper初始化相关参数
// page：getBanner的传参
// data：自定义banner数据

@Component
export default class Banner extends Vue {
  @Prop() private initOptions!: object;
  @Prop({ default: '' }) private page!: string;
  @Prop() private data!: any;

  private bannerList: object[] = [];

  private loading = true; // 數據加載過渡效果

  swiperOption: any = {
    autoplay: {
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev'
    // },
    autoHeight: true, // 高度随内容变化
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  };

  getBanner () {
    let _this = this;

    this.$Api.promotion.getHeaderBanner(this.page).then(
      function (data) {
        _this.bannerList = data;
        _this.loading = false;
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error'
        });
      }
    );
  }

  created () {
    if (this.initOptions) {
      this.swiperOption = this.initOptions;
    }

    // banner有分頁器或前進後退按鈕時，僅有單張圖片的情況下允許滑动切換效果
    if (this.swiperOption.pagination || this.swiperOption.navigation) {
      this.swiperOption.noSwiping = false;
    }

    if (this.page) {
      this.getBanner();
    } else {
      this.bannerList = this.data;
      this.loading = false;
    }
  }
}
</script>

<style lang="less" scoped>
.banner {
  .swiper-slide {
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>
