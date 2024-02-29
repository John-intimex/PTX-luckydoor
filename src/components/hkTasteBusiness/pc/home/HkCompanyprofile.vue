<template>
  <div class="indexHotVideo">
    <!-- <div class="TitleBg"><div class="innerBox">{{$t('Cms.WhatNews')}}</div></div> -->
    <div class="HotVideoMain fix">
      <div class="img">
        <img :src="videoContent.Cover" alt="">
      </div>
      <div class="text">
        <div class="textbox">
          <div class="title">
            <img src="/images/pc/pcindex_26.png" alt="">
          </div>
          <p v-html="videoContent.Body"></p>
          <div class="more">
            <a href="/CMS/content/20315">Learn More</a>
          </div>
        </div>

      </div>

      <!-- <div class="rightVideo"><p v-html="fbContent.Body"></p></div> -->
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
    this.$Api.cms.getContentByDevice({ key: 'Company', IsMobile: false }).then(result => {
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
    background-size: 100% 100%;
    display: block;
    // padding-top: 90px;
    // padding-bottom: 90px;
    // background: url('/images/pc/pcindex_04.jpg') no-repeat center center;
    background-size: cover;
}
.HotVideoMain{
    width: 100%;
    margin: 0 auto;
    .img{
      width: 50%;
      float: left;
      height: 560px;
      img{
        width: 100%;
        height: 560px;
        display: block;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
    .text{
      width: 50%;
      height: 560px;
      float: left;
      background: url('/images/pc/back_04.png') no-repeat right top;
      .textbox{
        width: 738px;
        padding: 82px 60px 80px 125px;
        box-sizing: border-box;
        box-shadow: 0 0 8px #d4d4d4;
        margin-top: 60px;
        margin-left: -60px;
        background-color: #fff;
        .title{
          margin-bottom: 18px;
          img{
            display: block;
          }
        }
        p{
          font-size: 20px;
          line-height: 32px;
          color: #333333;
          height: 126px;
          overflow: hidden;
        }
        .more{
          padding: 0 26px;
          height: 42px;
          box-sizing: border-box;
          border-radius: 21px;
          background: linear-gradient(180deg, #ffd552, #f8b72a);
          display: inline-block;
          margin-top: 20px;
          a{
            color: #fff;
            font-size: 18px;
            letter-spacing: 2px;
            line-height: 42px;
            font-weight: bold;
          }
        }
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
