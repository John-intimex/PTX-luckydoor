<template>
    <div class="CatMain NoramlPaddingTop">
      <transition name="slide">
        <div key="1" v-if="!waiting" >
           <div class="DetailTitle">
            <img :src="BannerImg" v-show="BannerImg!==null">
            <!-- <div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div> -->
            </div>
            <div class="NomralBg">
            <!-- <p class="PathData"><router-link to="/" class="HomePath">{{$t('Message.HomeTips')}}</router-link><i class="el-icon-arrow-right"></i><span class="currentTitle">{{CateName}}</span></p> -->
              <div class="cms_style1" v-if="catId === 40119">
                <div class="cms-list">
                  <div class="perData" v-for="(v,index) in contentList" :key="index">
                    <div class="right">
                          <p class="imgs"><img :src="v.Cover.indexOf('.png')!==-1 || v.Cover.indexOf('.jpg')!==-1 || v.Cover.indexOf('.jpeg')!==-1 || v.Cover.indexOf('.gif')!==-1?v.Cover:NoImg"></p>
                          <!-- <iframe width="540" height="360" :src="v.Url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe> -->
                      </div>
                      <div class="left">
                        <p class="title">{{v.Title}}</p>
                          <!-- <p class="contentTime">{{v.ContentDateTime}}</p> -->
                          <p class="desc">{{v.Desc}}</p>
                          <p class="body" v-html="v.Body"></p>
                          <p class="bodyp">……</p>
                          <div class="HomeViewMore">
                              <!-- <router-link :to="'/cms/contentN/'+v.Id">Read More</router-link> -->
                              <router-link :to="v.Url">Read More</router-link>
                          </div>
                      </div>

                  </div>
                  <!-- <div class="pager" v-if="totalRecord > pageSize">
                      <ins-page :total="totalRecord" v-model="currentPage" :pageNum="pageSize"></ins-page>
                  </div> -->
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
    InsPage: () => import('@/components/base/mobile/InsPage.vue')
  }
})
export default class InsCatLayout1 extends Vue {
    currentPage:number=1;
    pageSize:number=6;
    totalRecord:number=0;
    ListData:any[]=[];
    BannerImg:string='';
    CateName:string='';
    catId: string= '';
    contentList: any[]=[];
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
    this.$Api.cms.getCategoryByDevice({ CatId: this.cid, IsMobile: true }).then(async (result) => {
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
  getSubCatContents () {
    this.$Api.cms.getSubCatContents({ CatId: this.cid, IsMobile: true }).then((result) => {
      this.contentList = result.Data;
    });
  }
    created() {
        this.getContentsByCatId();
        this.getCategoryByDevice();
        this.getSubCatContents();
    }
    @Watch('currentPage', { deep: true })
    onPagerChange() {
      this.getContentsByCatId();
      this.getCategoryByDevice();
    }
}
</script>

<style scoped lang="less">

.faker {
    width: 100%;
    height: 30rem;
}
.CatMain {
    width: 100%;
    // display: flex;
    flex-wrap: wrap;
}
.PathData {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  span,a,i{
    font-size: 1.4rem;
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
    justify-content: center;
    img{
      width: 100%;
    }
    .TitleBg{
      width: 75%;
      border: 1px solid #ffffff;
      height: 4.5rem;
      line-height: 4.5rem;
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
        font-size: 2.5rem;
        font-weight: 700;
        font-family: 'Arial';
      }
    }
  }
.cms {
  .cms-list {
    width: 90%;
    margin: 0 auto;
    // display: flex;
    // flex-wrap: wrap;
    margin-top: 2rem;
        .perData {
            width: 100%;
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-between;
            // border-bottom: 1px solid #e6e6e6;
            // padding-bottom: 2rem;
            // padding-top: 2rem;
            margin-bottom: 2rem;
            .left {
                width: 100%;
                .imgs {
                    width: 100%;
                    display: block;
                    height: 15rem;
                    overflow: hidden;
                    img {
                        width: 100%;
                        display: block;
                        height: 15rem;
                        object-fit: cover;
                        object-position: 50% 50%;
                        border-radius: 5px;
                    }
                }
            }
            .right {
                width: 100%;
                .title {
                    font-size: 1.6rem;
                    color: #333333;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                    margin-top: .5rem;
                    margin-bottom: .5rem;
                    font-weight: bold;
                }
                .contentTime {
                    font-size: 1.2rem;
                    color: #999999;

                }
                 .desc {
                    font-size: 1.2rem;
                    color: #666666;
                    // text-overflow: -o-ellipsis-lastline;
                    // overflow: hidden;
                    // text-overflow: ellipsis;
                    // display: -webkit-box;
                    // -webkit-line-clamp: 4;
                    // line-clamp: 4;
                    // -webkit-box-orient: vertical;
                    // margin-top: .5rem;
                    // margin-bottom: .5rem;
                }
                .HomeViewMore {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                    margin-top: 2rem;
                    a {
                        font-size: 1.2rem;
                        color: #b19162;
                        border-bottom: 1px solid #b19162;
                    }
                }
            }
        }
}
}
.NomralBg{
  margin-top: 2rem;
  padding: 0 1.5rem;
  box-sizing: border-box;
  .cms_style1{
    .cms-list{
      .perData{
        border: 2px solid #112a4d;
        border-radius: 8px;
        padding: 1rem;
        box-sizing: border-box;
        margin-bottom: 2rem;
        .left{
          padding: 0 0.5rem;
          box-sizing: border-box;
          .title{
            font-size: 1.4rem;
            color: #333333;
            font-weight: bold;
            text-align: left;
          }
          .desc{
            border-bottom: 1px solid #cccccc;
            padding-bottom: 0.5rem;
            font-size: 1.2rem;
            color: #333333;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
          }
          .body{
            height: 7rem;
              overflow: hidden;
            /deep/ p{

              line-height: 1.8rem;
              color: #666666;
              font-size: 1.2rem;
            }
          }
          .bodyp{
            color: #666666;
            font-size: 1.2rem;
          }
          .HomeViewMore{
            width: 15rem;
            margin: 0 auto;
            padding: 0 2rem;
            height: 3.5rem;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border-radius: 2rem;
            background: linear-gradient(45deg, #ffd552, #f8b72a);
            display: block;
            margin-top: 1rem;
            text-align: center;
            a{
              color: #fff;
              font-size: 1.4rem;
              letter-spacing: 2px;
              line-height: 3.5rem;
            }
          }
        }
        .right{
          .imgs{
            border: 1px solid #cccccc;
            box-sizing: border-box;
            margin-bottom: 1rem;
            img{
              width: 100%;
              height: 18rem;
              object-fit: cover;
              object-position: 50% 50%;
              display: block;
            }
          }

        }
      }
    }
  }
}

</style>
