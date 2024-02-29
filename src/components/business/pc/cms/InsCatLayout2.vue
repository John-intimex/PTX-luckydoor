<template>
    <div class="CatMain NormalTop">
      <transition name="slide">
        <div key="1" v-if="!waiting">
           <div class="DetailTitle"><img :src="BannerImg" v-show="BannerImg!==null">
           <!-- <div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div> -->
           </div>
           <div v-if="catId === 40121">
            <div class="NomralBg">
              <div class="cms-list cms-listbox">
                  <div class="perData" v-for="(v,index) in ListData" :key="index" >
                    <a :href="v.Url" target="_blank">
                      <div class="Content">
                        <img :src="v.Cover" alt="">
                      </div>
                      <!-- <p v-html="v.Body" class="Content" ></p> -->
                    </a>
                  </div>
              </div>
          </div>
           </div>
           <div v-else>
            <div class="NomralBg">
              <p class="PathData"><router-link to="/" class="HomePath">{{$t('Message.HomeTips')}}</router-link><i class="el-icon-arrow-right"></i><span class="currentTitle">{{CateName}}</span></p>
              <div class="cms-list">
                  <div class="perData" v-for="(v,index) in ListData" :key="index" >
                      <div class="Title"><div class="InnerBg" @click="goClick(index)" :class="'perList'+index"><span>{{v.Title}}</span><i class="Icon IconA"></i></div></div>

                      <p v-html="v.Body" class="Content" :class="'show'+index"></p>
                  </div>
              </div>
          </div>
           </div>
      </div>
      </transition>
      <transition name="slide">
        <div class="faker" key="2" v-if="waiting" v-loading="true"></div>
      </transition>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsCatLayout1 extends Vue {
    currentPage:number=1;
    pageSize:number=9;
    totalRecord:number=0;
    ListData:any[]=[];
    BannerImg:string='';
    CateName:string='';
    private waiting: boolean = true;
    ActiveIndex:number=-1;
    NoImg:string='/images/pc/proddef.jpg';
    catId:string='';

      get cid () {
      return this.$route.params.id;
    }
    GoLink(v) {
        window.location.href = '/cms/contentN/' + v.Id;
    }
    goClick (v) {
      $('.show' + v).slideToggle(300);
      $('.perList' + v).find('.Icon').toggleClass('IconB');
    }
    getContentsByCatId () {
        this.$Api.cms.getContentsByCatId(this.cid, this.currentPage, this.pageSize).then((result) => {
            if (result) {
                this.ListData = result.Data;
            }
            result.Data.forEach(function (i) {
            var newDate = new Date(i.ContentDateTime.replace(/-/g, '-'));
            i.ContentDateTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            });
            this.totalRecord = result.TotalRecord;
        });
    }
   // 根据设备类型获取CMSCategory信息
  getCategoryByDevice () {
    this.$Api.cms.getCategoryByDevice({ CatId: this.cid, IsMobile: false }).then(async (result) => {
     console.log(result, 'gggggggg');
     this.BannerImg = result.ImagePath;
     this.CateName = result.Name;
      this.waiting = false;
      this.catId = result.Id;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
    created() {
        this.getContentsByCatId();
        this.getCategoryByDevice();
    }
    @Watch('currentPage', { deep: true })
    onPagerChange() {
      this.getContentsByCatId();
      this.getCategoryByDevice();
    }
}
</script>

<style scoped lang="less">
.pager {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.faker {
    width: 100%;
    height: 30rem;
}
.CatMain {
    width: 100%;
    // display: flex;
    // flex-wrap: wrap;
}
.NomralBg {
  margin-top: 1rem;
}
.PathData {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
  span,a,i{
    font-size: 20px;
  }
  .HomePath {
    color: #666;
  }
  .currentTitle {
    color:#9f1e3c;
  }
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 5rem;
    margin: 0 auto;
    margin-bottom: 20px;
    top: 18%;
    left: 30%;
    position: absolute;
    height: 12rem;
    background:url('/images/mobile/ptx_01.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .innerBoxText{
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      background-size: cover;
      text-align: center;
      width: 2rem;
      margin: 0 auto;
      padding-left: 1.5rem;
      font-weight: 700;
    }
  }
}
.cms-list {
    width: 1200px;
    margin: 0 auto;
    // display: flex;
    // flex-wrap: wrap;
    .perData {
        width:100%;
        // display:flex;
        // flex-wrap: wrap;
        margin-bottom: 50px;
        .Title {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          .InnerBg {
              width: 400px;
              background: url(/images/mobile/ptx_26.png) no-repeat center center;
              background-size: 100% 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              -ms-flex-negative: 0;
              flex-shrink: 0;
              height: 70px;
              line-height: 70px;
              position: relative;
              cursor: pointer;
              span {
                font-size: 26px;
                color: #b59669;
              }
              i {
                margin-left: 10px;
              }
             .IconA {
               background: url('/images/mobile/up.png') no-repeat center center;
               width: 20px;
               height: 20px;
               background-size: 15px;
               display: flex;
              }
             .IconB {
               background: url('/images/mobile/ptx_30.png') no-repeat center center!important;
               width: 20px;
               height: 20px;
               background-size: 15px;
               display: flex;
              }
          }
        }
        .Content {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          /deep/ .NestContent {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            .Perdata {
              margin-bottom: 20px;
              .redText {
                color: @base_color;
                font-size: 24px;
              }
            }
            p {
              font-size: 20px;
              line-height: 32px;
              margin-bottom: 10px;
            }
          }
        }
    }
}
.cms-listbox{
  width: 100%;
  .perData{
    display: block;
  }
  .perData:nth-child(1){
    .Content{
      width: 90%;
      margin-right: auto;
      img{
          display: block;
          width: 100%;
        }
      /deep/ p{
        width: 100%;
        img{
          display: block;
          width: 100%;
        }
      }
      // /deep/ table{
      //   width: 1200px;
      //   margin: 0 auto;
      //   border-collapse: collapse;
      //   tr{
      //     position: relative;
      //     td:nth-child(1){
      //       width: 100%;
      //       height: 400px;
      //       background-color: #edf0f4;
      //       position: absolute;
      //       top: 80px;
      //       left: 0;
      //     }
      //     td:nth-child(2){
      //       width: 800px;
      //       img{
      //         width: 100%;
      //         display: block;
      //         margin-top: 137px;
      //         box-shadow: 0 0 12px #b9b9b9;
      //       }
      //     }
      //   }
      // }
    }
  }
  .perData:nth-child(2){
    .Content{
      width: 90%;
      margin-left: auto;
      img{
          display: block;
          width: 100%;
        }
      /deep/ p{
        width: 100%;
        // margin-left: auto;
        img{
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
