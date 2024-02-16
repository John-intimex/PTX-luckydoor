<template>
  <div id="container" class="photoAlbum fix">
    <div class="title">
      <h1>{{$t('photo.photo')}}</h1>
    </div>
    <div class="photolist">
      <div class="box">
        <div class="list" v-for="(cms,index) in ImagePath" :key="index">
          <div class="list_item" >
            <router-link :to="'/photo/list/' + cms.Id">
                <div class="cover">
                  <img :src="cms.CoverImg" />
                </div>
                <div class="info">
                  <p class="title">{{cms.FolderName}}</p>
                </div>
              </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class photoAlbum extends Vue {
  ImagePath: object = {};
  GetFolders () {
    this.$Api.PhotoAlbum.SearchFolders().then(result => {
      this.ImagePath = result.data.Data;
    });
  }

  get id () {
    return this.$route.params.id;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  @Watch('isMobile', { deep: true })
  mounted () {
    this.GetFolders();
  }
}
</script>
<style scoped lang="less">
.fix {
  *zoom: 1;
}

.fix:after {
  display: block;
  content: "clear";
  height: 0;
  clear: both;
  overflow: hidden;
  visibility: hidden;
}
.photoAlbum {
    padding: 0 0.8rem;
    .title{
      text-align: center;
      padding: 1rem 0;
    }

    .photolist {
      .year {
        ul {
          li {
            float: left;
            margin-right: 0.8rem;
            font-size: 1.4rem;
            a {
              color: #333333;
              font-size: 1.4rem;
            }
          }
        }
      }
      .box {
        margin-top: 20px;

        .list {
          width: 48%;
          float: left;
          margin: 0 1%;
          .cover {
            text-align: center;
            border: 1px solid #333333;
            border-radius: 4px;
            img {
              width: 100%;
              display: block;
              object-fit: cover;
              object-position: 50% 50%;
            }
          }
          .info {
            .title {
              text-align: center;
              font-size: 18px;
              color: #333;
            }
          }
          .list_item{

            height: 165px;
          }
          // .list_item:nth-child(2n){
          //   float: right;
          // }
        }
        .list:nth-child(2n){
          float: right;
        }
        .block {
          text-align: center;
        }
      }
    }
  }
</style>
