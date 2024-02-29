<template>
  <div class="map-main" >
    <div class="textcenter">
      <div class="title">
        <img src="/images/pc/pcindex_69.png" alt="">
      </div>
      <div class="body" v-html="fbContent.Body"></div>
    </div>
    <div class="maps">
      <div class="body" v-html="mapContent.Body"></div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkMap extends Vue {
  fbContent:string='';
  mapContent:string='';
  getFbContent () {
    this.$Api.cms.getContentByDevice({ key: 'contactus', IsMobile: true }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  getmapsContent () {
    this.$Api.cms.getContentByDevice({ key: 'maps', IsMobile: true }).then(result => {
      this.mapContent = result.CMS;
    });
  }
  mounted() {
    this.getFbContent();
    this.getmapsContent();
  }
}
</script>
<style  lang="less">
.map-main{
  padding-top: 80px;
  .textcenter{
    .body{
      .contact_box{
        margin-bottom: 2rem;
        ul{
          // display: flex;
          // justify-content: space-between;
          li{
            display: flex;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid #d1d1d1;
            padding-bottom: 1.5rem;
            .img{
              margin-right: 1rem;
              img{
                display: block;
              }
            }
            .text{
              color: #112a4d;
              font-size: 1.6rem;
              font-weight: bold;
              width: 100%;
              p{
                    font-size: 1.4rem;
    margin-top: 0.5rem;
    font-weight: 500;
    line-height: 1.8rem;
              }
            }
          }
        }
      }
    }
  }
  .maps{
    margin-bottom: 0;
    iframe{
      border: none;
      height: 400px;
    }
  }
}

</style>
<style scoped lang="less">
.map-main {
  width: 100%;
  margin: 0 auto;
  // display: flex;
  .textcenter{
    width: 90%;
    margin: 0 auto;
    .title{
      text-align: center;
      margin-bottom: 3rem;
      display: flex;
      justify-content: center;
      img{
        display: block;
        width: 80%;
      }
    }
  }
}

</style>
