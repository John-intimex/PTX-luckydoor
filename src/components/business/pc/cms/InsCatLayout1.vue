<template>
    <div class="CatMain NormalTop">
      <transition name="slide">
        <div key="1" v-if="!waiting">
          <div class="DetailTitle">
            <img :src="BannerImg" v-show="BannerImg!==null">
            <!-- <div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div> -->
          </div>
          <div class="NomralBg">
            <!-- <p class="PathData"><router-link to="/" class="HomePath">{{$t('Message.HomeTips')}}</router-link><i class="el-icon-arrow-right"></i><span class="currentTitle">{{CateName}}</span></p> -->
            <div class="cms_style1" v-if="catId === 40119">
              <div class="cms-list">
                  <div class="perData" v-for="(v,index) in ListData" :key="index">
                      <div class="left">
                        <p class="title">{{v.Title}}</p>
                          <!-- <p class="contentTime">{{v.ContentDateTime}}</p> -->
                          <p class="desc">{{v.Desc}}</p>
                          <p class="body" v-html="v.Body"></p>
                          <p class="bodyp">……</p>
                          <div class="HomeViewMore">
                              <router-link :to="'/cms/contentN/'+v.Id">Read More</router-link>
                          </div>
                      </div>
                      <div class="right">
                          <!-- <p class="imgs" @click="GoLink(v)"><img :src="v.Cover.indexOf('.png')!==-1 || v.Cover.indexOf('.jpg')!==-1 || v.Cover.indexOf('.jpeg')!==-1 || v.Cover.indexOf('.gif')!==-1?v.Cover:NoImg"></p> -->
                          <iframe width="540" height="360" :src="v.Url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                      </div>
                  </div>
                  <div class="pager" v-if="totalRecord > pageSize">
                      <ins-page :total="totalRecord" v-model="currentPage" :pageNum="pageSize"></ins-page>
                  </div>
              </div>
            </div>
            <div class="cms" v-else>
              <div class="cms-list">
                <div class="perData" v-for="(v,index) in ListData" :key="index">
                    <div class="left">
                        <p class="imgs" @click="GoLink(v)"><img :src="v.Cover.indexOf('.png')!==-1 || v.Cover.indexOf('.jpg')!==-1 || v.Cover.indexOf('.jpeg')!==-1 || v.Cover.indexOf('.gif')!==-1?v.Cover:NoImg"></p>
                    </div>
                    <div class="right">
                        <p class="title">{{v.Title}}</p>
                        <!-- <p class="contentTime">{{v.ContentDateTime}}</p> -->
                        <p class="desc">{{v.Desc}}</p>
                        <!-- <div class="HomeViewMore">
                            <router-link :to="'/cms/contentN/'+v.Id">{{$t('Message.LearnMore')}} >></router-link>
                        </div> -->
                    </div>
                </div>
                <div class="pager" v-if="totalRecord > pageSize">
                    <ins-page :total="totalRecord" v-model="currentPage" :pageNum="pageSize"></ins-page>
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
    pageSize:number=4;
    totalRecord:number=0;
    ListData:any[]=[];
    BannerImg:string='';
    CateName:string='';
    catId: string= '';
    private waiting: boolean = true;
    NoImg:string='/images/pc/proddef.jpg';
      get cid () {
      return this.$route.params.id;
    }
    GoLink(v) {
        window.location.href = '/cms/contentN/' + v.Id;
    }
    getContentsByCatId () {
        this.$Api.cms.getContentsByCatId(this.cid, this.currentPage, this.pageSize).then((result) => {
            if (result) {
                this.ListData = result.Data;
            }
            result.Data.forEach(function (i) {
            var newDate = new Date(i.ContentDateTime.replace(/-/g, '/'));
            i.ContentDateTime = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
            });
            this.totalRecord = result.TotalRecord;
            this.catId = result.Data[0].CatId;
        });
    }
   // 根据设备类型获取CMSCategory信息
  getCategoryByDevice () {
    this.$Api.cms.getCategoryByDevice({ CatId: this.cid, IsMobile: false }).then(async (result) => {
     console.log(result, 'gggggggg');
     this.BannerImg = result.ImagePath;
     this.CateName = result.Name;
      this.waiting = false;
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
    display: flex;
    flex-wrap: wrap;
}
.NomralBg {
  margin-top: 60px;
  margin-bottom: 30px;
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
    color:#333333;
  }
}
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 500px;
    border: 1px solid #ffffff;
    height: 70px;
    line-height: 70px;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:#ffffff;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 40px;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.cms_style1{
  .cms-list {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
        .perData {
            width: 100%;
            // margin-right: 2.33%;
            // float: left;
            // display: flex;
            // flex-wrap: wrap;
            margin-bottom: 40px;
            cursor: pointer;
            border: 2px solid #112a4d;
            border-radius: 8px;
            padding: 38px 40px;
            box-sizing: border-box;
            // &:hover {
            //   .right {
            //     .imgs {
            //       border:1px solid @base_color;
            //     }
            //   }
            // }
            // &:nth-child(3n) {
            //   margin-right: 0px!important;
            // }
            .right {
                width: 540px;
                float: right;
                .imgs {
                    width: 100%;
                    height: 360px;
                    display: block;
                    border-radius: 5px;
                    overflow: hidden;
                    // border: 1px solid #eee;
                    transition: all .3s;
                    img {
                        width: 100%;
                        height: 360px;
                        display: block;
                        object-fit: cover;
                        object-position: 50% 50%;
                    }
                }
            }
            .left {
                width: 500px;
                float: left;
                .title {
                    font-size: 24px;
                    color: #333333;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-weight: bold;
                    // margin-top: .5rem;
                    // margin-bottom: .5rem;
                }
                .contentTime {
                    font-size: 18px;
                    color: #999999;

                }
                 .desc {
                    font-size: 20px;
                    color: #333333;
                    // text-overflow: -o-ellipsis-lastline;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 4;
                    // line-clamp: 4;
                    // -webkit-box-orient: vertical;
                    margin-top: 25px;
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #cccccc;
                }
                .HomeViewMore {
                    padding: 0 26px;
                    height: 42px;
                    box-sizing: border-box;
                    border-radius: 21px;
                    background: linear-gradient(45deg, #ffd552, #f8b72a);
                    display: inline-block;
                    margin-top: 20px;
                    a{
                      color: #fff;
                      font-size: 18px;
                      letter-spacing: 2px;
                      line-height: 42px;
                    }
                }
                .body{
                  /deep/ p{
                    line-height: 36px;
                    color: #666666;
                    font-size: 20px;
                    overflow: hidden;
                    height: 144px;
                  }
                }
                .bodyp{
                  line-height: 36px;
                  color: #666666;
                  font-size: 20px;
                }
            }
        }
}
}
.cms{
  .cms-list{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    .perData{
      width: 580px;
      height: 500px;
      padding: 40px;
      box-sizing: border-box;
      box-shadow: 0 0 5px #e6e6e6;
      float: left;
      margin-right: 40px;
      margin-bottom: 40px;
      &:nth-child(2n){
        margin-right: 0;
      }
      .left{
        .imgs{
          border-radius: 5px;
          overflow: hidden;
          img{
            width: 100%;
            height: 300px;
            display: block;
            object-fit: cover;
            object-position: 50% 50%;
            border-radius: 5px;
          }
        }
      }
      .right{
        .title{
          margin-top: 16px;
          margin-bottom: 10px;
          font-size: 20px;
          color: #333333;
          font-weight: bold;
          word-break: break-all;
          color: #112a4d;
          display: inline-block;
          // text-align: center;
          line-height: 25px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          word-break: break-word;
        }
        .desc{
          color: #666666;
          font-size: 18px;
          text-align: right;
        }
      }
    }
  }
}
</style>
