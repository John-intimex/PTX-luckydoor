<template>
  <div id="container" class="photoList fix">
    <div class="title">
      <h1>{{folderTitle}}</h1>
    </div>
    <div class="demo-image fix">
      <div class="block" v-for="(url, index) in imags" :key="index" @click="viewImg(index)">
        <div class="listimage">
          <img class="el-image" :src="url.ImgUrl" />
        </div>
        <span class="demonstration">{{ url.NameDesc }}</span>
      </div>
    </div>
    <Viewer :images="imags"
            class="viewer" ref="viewer"
            @inited="inited"
    >
    <img v-for="(item,index) in imags" :src="item.ImgUrl" :key="index" :alt="item.NameDesc" class="PreViewimage">
    </Viewer>
    <div class="back">
      <router-link :to="'/photo/album'">{{$t('photo.BackText')}}</router-link>
    </div>
  </div>
</template>
<script>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Swiper from 'swiper';
import 'viewerjs/dist/viewer.css';
import { component as Viewer } from 'v-viewer';
@Component({ components: { Viewer } })
export default class photoList extends Vue {
  imags = {};
  folderTitle = '';
  CarouselShow = false;
  currentIndex= 0;
  // eslint-disable-next-line space-before-function-paren
  inited(Viewer) {
    this.$viewer = Viewer;
  }
  viewImg (val) {
    this.$viewer.view(val);
  }
  getFileList () {
    this.$Api.PhotoAlbum.SearchFolderInfo({ FolderId: this.id }).then(
      result => {
        for (let i = 0; i < result.FileList.Data.length; i++) {
          this.folderTitle = result.FileList.Data[i].FolderName;
          break;
        }
        this.imags = result.FileList.Data;
      }
    );
  }
  data () {
    return {
      CarouselShow: false,
      imags: [],
      srcList: []
    };
  }
  get isMobile () {
    return this.$store.state.isMobile;
  }
  get id () {
    return this.$route.params.id;
  }
  @Watch('isMobile', { deep: true })
  mounted () {
    this.getFileList();
  }
}
</script>
<style lang="less">
.viewer-container {
    z-index: 9999999!important;
  }
.viewer-title{
  font-size: 16px!important;
  opacity: 0.9;
  color: #fff;
}
.viewer-backdrop {
  background: rgba(0, 0, 0, .8)!important;
}
</style>
<style scoped lang="less">
.PreViewimage {
    display: none;
}
body {
  overflow: initial;
}
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
.photoList {
    padding: 0 0.8rem;
    .back {
      text-align: center;
      padding-bottom: 20px;
      a {
        color: #333333;
        font-size: 16px;
      }
    }
    .title {
      text-align: center;
      padding: 20px 0;
    }
    .demo-image {
      position: relative;
    }
    .block {
      // width: 278px;
      // height: 240px;
      float: left;
      // margin: 10px;
      margin-bottom: 0;
      width: 48%;
      height: 100%;
      .listimage {
        border: 1px solid #333333;
        border-radius: 4px;
        width: 100%;
        height: 120px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          display: block;
          border-radius: 4px;
        }
      }

      .demonstration {
        display: block;
        color: #8492a6;
        font-size: 1.4rem;
        margin-bottom: 20px;
        margin-top: 10px;
        text-align: center;
      }
    }
    .block:nth-child(2n) {
      float: right;
    }

    .demo-image__preview {
      display: block;
      text-align: center;
    }
    }
</style>
