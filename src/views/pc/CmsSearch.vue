<template>
  <div id="container" class="catDetail">
  <div class="top-title">
    <div class="title"><span>{{$t('home.Search')}}</span></div>
  </div>
  <!-- <div class="location">
    <Location LocationTips="" :Homepage="$t('Home.Home')" Column="" :Title="$t('Home.Search')"/>
  </div> -->
    <div class="catContent">
     <ul class="cmsList">
        <li v-for="(cms,index) in searchcontent" :key="index">
            <router-link :to="'/cms/content/'+cms.Id">
              <div class="cover" v-if="cms.Cover">
                  <div class="item-hover">
                 <div class="more">
                  {{$t('home.ReadMore')}}
                 </div>
                 <div class="mask"></div>
                 </div>
                 <img :src="cms.Cover" />
             </div>
             <div class="introduce">
                        <p class="data">{{cms.CreateDate}}</p>
                        <p class="titlename">{{cms.Title}}</p>
            </div>
            </router-link>
        </li>
    </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    // Location: () => import(/* webpackChunkName: "cms" */'@/components/base/InsLocation.vue')
  }
})
export default class insSearch extends Vue {
    show: boolean = false;
    clickIndex: number = 0; // 点击菜单下标
    IsMobile: boolean = false;
      searchcontent: object[] = [];

      get storeSearchKey () {
        // return this.$store.state.searchKey;
        return this.$route.params.key;
      }
      // created () {
      //   this.$Api.cms.getsearch({ Title: this.storeSearchKey, IsMobile: this.isMobile }).then((result) => {
      //     this.searchcontent = result.Data;
      //   });
      // }
      // search内容
      getsearch () {
        this.$Api.cms.getContentsByTitle({ Title: this.storeSearchKey, IsMobile: false, SortName: 'CreateDate', SortOrder: 'desc' }).then((result) => {
          this.searchcontent = result.Data;
          result.Data.forEach(function (item) {
            item.CreateDate = item.CreateDate.substring(0, item.CreateDate.indexOf(' ')
            );
          });
        });
      }

      mounted () {
        this.getsearch();
      }

    @Watch('storeSearchKey', { deep: true })
      onKeyChange () {
        this.getsearch();
      }

    @Watch('isMobile', { deep: true })
    onMediaChange () {
      this.getsearch();
    }
}
</script>
<style scoped lang="less">
    .catDetail {
      // margin: 0 auto;
      // background: #f7f7f7;
      .location{
        width: 1200px;
        margin: 0 auto;
     }
      .pic{
    img {
    width: 100%;
      }
  }
      .top-title{
       width: 1200px;
     margin: 70px auto 15px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
        }
      .title {
      color: #666666;
     font-size: 1.2rem;
     display: inline-block;

       }
        .catContent {
            width: 1200px;
            margin: 0 auto;
            padding: 15px 0;

            .layer {
                font-size: 16px;
            }
        }
    }
    .cmsList {
     margin-left: -10px;
    margin-right: -10px;
    display: inline-block;
    width: 100%;
        li {
         font-size: 16px;
    margin-bottom: 25px;
    width: 33.3333333%;
    /* float: left; */
    display: inline-block;
    padding-left: 10px;
    padding-right: 10px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-height: 305px;
            .cover {
                    margin-bottom: .1rem;
                    position: relative;
                    height: 216px;
                    img {
                    width: 100%;
                    height: 100%;
                        }
                    }
        .introduce {
           .data {
             color: #999999;
             font-size: 16px;
             }
             .titlename {
                font-size: 16px;
                 color: #627999;
                margin-bottom: 0.5rem;
               font-weight: bold;
                 }
            }
            a {

               color: #627999;
                display: inline-block;
            }

            &:hover {
                a {
                    color: @base_color;
                }
            }
        }
     li:hover .item-hover{
       opacity: 1;
     }
    .item-hover {
          z-index: 5;
          -webkit-transition: all 300ms ease-out;
          -moz-transition: all 300ms ease-out;
         -o-transition: all 300ms ease-out;
          transition: all 300ms ease-out;
          opacity: 0;
           cursor: pointer;
           display: block;
           text-decoration: none;
          text-align: center;
          width: 100%;
          height: 100%;
          position: absolute;
         top: 0;
         left: 0;
         }
         .mask {
         background-color: #000;
         opacity: 0.6;
         z-index: 0;
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
        height: 100%;
       }
       .more {
          width: 145px;
          margin: 0 auto;
         background: #e67d91;
         color: #ffffff;
         vertical-align: middle;
         position: relative;
         z-index: 5;
         height: 50px;
        line-height: 50px;
        border-radius: 5px;
        text-align: center;
         margin-top: 70px;
        }
    }

</style>
