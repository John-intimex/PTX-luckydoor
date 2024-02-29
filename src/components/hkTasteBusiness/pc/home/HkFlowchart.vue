<template>
  <div class="indexHotVideo">
    <!-- <div class="TitleBg"><div class="innerBox">{{$t('Cms.WhatNews')}}</div></div> -->
    <div class="HotVideoMain fix">
      <p v-html="videoContent.Body"></p>
      <!-- <div class="rightVideo"><p v-html="fbContent.Body"></p></div> -->
      <div style="display: flex;justify-content: center;">
        <div class="LearnMore">
          <a href="/CMS/content/20322">
            Learn More
          </a>
        </div>
        <div class="OrderNow">
          <a href="/regnpay/form/box">
            Order Now
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  videoContent:string='';
  fbContent:string='';
  getFlowchartContent () {
    this.$Api.cms.getContentByDevice({ key: 'Flowchart', IsMobile: false }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    this.getFlowchartContent();
  }
}
</script>
<style  lang="less">
.HotVideoMain .leftVideo iframe{
  width: 100%;
  height: 500px;
}
.HotVideoMain .leftVideo img{
  width: 100%;
}
.HotVideoMain .rightVideo iframe{
  width: 100%;
  height: 500px;
}
.HotVideoMain .rightVideo img{
  width: 100%;
}
</style>
<style scoped lang="less">
.TitleBg{
  width: 500px;
  height: 70px;
  border:1px solid #4d4d4d;
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 20px;
  .innerBox{
    width: 100%;
    height: 100%;
    background:#4d4d4d;
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: 700;
    font-family: 'Arial';
  }
}
.indexHotVideo{
    width: 100%;
    display: block;
    padding-top: 80px;
    padding-bottom: 78px;
    background: url('/images/pc/back_02.png') no-repeat center center;
    background-size: cover;
}
.HotVideoMain{
    width: 1200px;
    margin: 0 auto;
    .LearnMore{
      width: 192px;
      height: 54px;
      border: 1px solid #f5c328;
      padding: 4px;
      // margin: 0 auto;
      position: relative;
      border-radius: 27px;
      box-sizing: border-box;
      margin-top: 28px;
      margin-right: 60px;
      float: left;
      a{
        height: 42px;
        width: 180px;
        box-sizing: border-box;
        border-radius: 21px;
        background: linear-gradient(180deg, #ffd552, #f8b72a);
        display: block;
        // margin-top: 20px;
        text-align: center;
        line-height: 42px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        letter-spacing: 2px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .OrderNow{
      width: 192px;
      height: 54px;
      border: 1px solid #112a4d ;
      padding: 4px;
      // margin: 0 auto;
      position: relative;
      border-radius: 27px;
      box-sizing: border-box;
      margin-top: 28px;
      float: left;
      a{
        height: 42px;
        width: 180px;
        box-sizing: border-box;
        border-radius: 21px;
        background: linear-gradient(180deg, #3555ce , #112a4d);
        display: block;
        // margin-top: 20px;
        text-align: center;
        line-height: 42px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        letter-spacing: 2px;
        font-size: 18px;
        font-weight: bold;
      }
    }

}
.HotVideoMain .leftVideo{
    width: 55%;
    float: left;
    margin-right: 5%;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px;
}
.HotVideoMain .leftVideo img{
    width: 100%;
    margin: 0 auto;
}
.HotVideoMain .rightVideo{
    width: 40%;
    float: left;
    background-size: 100% 100%;
    box-sizing: border-box;
    padding: 30px;
}
.HotVideoMain .rightVideo img{
    width: 100%;
}
.indexVideoTitle{
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 70px;
}
.indexVideoTitleE{
    width: 544px;
    height: 114px;
    background-size: 100%;
    margin: 0 auto;
    margin-bottom: 70px;
}
</style>
