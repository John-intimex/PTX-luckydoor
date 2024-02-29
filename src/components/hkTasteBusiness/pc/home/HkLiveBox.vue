<template>
  <div class="indexHotVideo fix">
    <!-- <div class="TitleBg"><div class="innerBox">{{$t('Cms.WhatNews')}}</div></div> -->
    <div class="HotVideoMain">
      <div class="leftVideo">
        <p v-html="videoContent.Body"></p>
      </div>
      <div class="rightVideo"><p v-html="fbContent.Body"></p></div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkLiveBox extends Vue {
  videoContent:string='';
  fbContent:string='';
  getVideoContent () {
    this.$Api.cms.getContentByDevice({ key: 'youtube', IsMobile: false }).then(result => {
      this.videoContent = result.CMS;
    });
  }
  getFbContent () {
    this.$Api.cms.getContentByDevice({ key: 'facebook', IsMobile: false }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  created () {
    this.getVideoContent();
    this.getFbContent();
  }
}
</script>
<style  lang="less">
.HotVideoMain .leftVideo iframe{
  width: 100%;
  height: 460px;
}
.HotVideoMain .leftVideo img{
  width: 100%;
}
.HotVideoMain .rightVideo iframe{
  width: 100%;
  height: 460px;
}
.HotVideoMain .rightVideo img{
  width: 100%;
  display: block;
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
    padding-bottom: 80px;
    background: url('/images/pc/pcindex_66.png') no-repeat center center;
    background-size: cover;
}
.HotVideoMain{
    width: 1200px;
    margin: 0 auto;
}
.HotVideoMain .leftVideo{
    width: 760px;
    float: left;
    // margin-right: 5%;
    background-size: 100% 100%;
    box-sizing: border-box;
    // padding: 30px;
}
.HotVideoMain .leftVideo img{
    width: 100%;
    margin: 0 auto;
    display: block;
}
.HotVideoMain .rightVideo{
    width: 360px;
    float: right;
    background-size: 100% 100%;
    box-sizing: border-box;
    // padding: 30px;
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
