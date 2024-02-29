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
    this.$Api.cms.getContentByDevice({ key: 'contactus', IsMobile: false }).then(result => {
      this.fbContent = result.CMS;
    });
  }
  getmapsContent () {
    this.$Api.cms.getContentByDevice({ key: 'maps', IsMobile: false }).then(result => {
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
        margin-bottom: 30px;
        margin-left: 105px;
        margin-right: 105px;

        ul{
          display: flex;
          // justify-content: space-between;
          flex-wrap: wrap;
          li{
            display: flex;
            width: 206px;
            margin-right: 95px;
            &:last-child{
              margin-right: 0;
            }
            &:nth-child(1){
              margin-right: 70px;
              width: 500px;
              margin-bottom: 42px;
            }
            &:nth-child(2){
              margin-right: 0;
              width: 420px;
              margin-bottom: 42px;
              justify-content: space-between;
              .text{
                width: 82%;
              }
            }
            .img{
              margin-right: 12px;
              img{
                display: block;
              }
            }
            .text{
              color: #112a4d;
              font-size: 20px;
              font-weight: bold;
              p{
                font-size: 18px;
                margin-top: 10px;
                font-weight: 500;
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
  .maps{
    margin-bottom: 80px;
    iframe{
      border: none;
      height: 420px;
    }
  }
}

</style>
<style scoped lang="less">
.map-main {
  width: 1200px;
  margin: 0 auto;
  // display: flex;
  .textcenter{
    .title{
      text-align: center;
      margin-bottom: 42px;
      img{
        // display: block;
      }
    }
  }
}

</style>
