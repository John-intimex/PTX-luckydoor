<template>
  <div id="container" class="NomralBg">
    <div class="DetailTitle">
      <img :src="BannerImg" v-if="BannerImg">
    <!-- <div class="TitleBg"><div class="innerBoxText">{{CateName}}</div></div> -->
    </div>
    <div class="CmsNormal">
      <div class="CmsContent">
          <p class="textTitle">{{content.Title}}</p>
          <p v-html="content.Body"></p>
          <div style="margin-top: 100px;" v-if="content.Id===20324">
            <ins-calendar />
          </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Cookie from 'js-cookie';
@Component({
  components: {
    InsCalendar: () => import('@/components/business/mobile/home/InsCalendar.vue')
  }
})
export default class InsCmsContentN extends Vue {
  content: any[] = [];
  BannerImg:string='';
  get currentlang () {
    return this.$Storage.get('locale');
  }
  get id () {
    return this.$route.params.id ? this.$route.params.id : '';
  }

  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.id, ContentId: this.id, IsMobile: true }).then(result => {
      this.content = result.CMS;
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  // 根据设备类型获取CMSCategory信息
  getCategoryByDevice () {
    this.$Api.cms.getCategoryByDevice({ CatId: this.id, IsMobile: true }).then(async (result) => {
     this.BannerImg = result.ImagePath;
    }).catch((error) => {
      console.log(error, 'error');
      this.$message({
        message: error,
        type: 'error'
      });
    });
  }
  get lang () {
    return this.$Storage.get('locale');
  }
  get queryLang () {
    return this.$route.query.Lang || '';
  }
  created () {
    this.getContent();
  }
  @Watch('$route', { deep: true })
  onIdChange () {
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.clear {
  clear: both;
}
.CmsNormal {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .CmsContent {
    width: 90%;
    margin: 0 auto;
    padding-top: 6rem;
    padding-bottom: 6rem;
    min-height: 15rem;
    .textTitle {
      font-size: 1.8rem;
      color: #333333;
      line-height: 2rem;
      display: flex;
      align-items: center;
      margin-bottom: 2rem;
      &::before {
        content: '';
        height: 2rem;
        width: 3px;
        background:#333333;
        display: inline-block;
        margin-right: .5rem;
      }
    }
    /deep/ p {
      font-size: 1.2rem;
      line-height: 2rem;
      color: #666666;
      word-break: break-word;
    }
    /deep/ strong {
      font-size: 1.2rem;
      line-height: 2rem;
      color: #666666;
      font-weight: 700;
      word-break: break-word;
    }
    /deep/ img {
      max-width: 100%;
    }
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
    display: block;
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
</style>
