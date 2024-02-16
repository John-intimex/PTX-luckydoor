<template>
  <div class="ins_building_warpper" ref="buildingWarpper" :style="paddingTop">
      <img :src="background" class="background">
      <img :src="img" alt="" :class="{ 'pc_logo': userAgent === 'pc', 'mobile_logo': userAgent === 'mobile' }">
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class InsBuilding extends Vue {
    private img:string = '';
    private background:string = '';
    private paddingTop:string = '';
    beforeCreate () {
      if ((Vue.prototype.userAgent === 'mobile' && !this.$Settings.mobileBuilding) || (Vue.prototype.userAgent === 'pc' && !this.$Settings.pcBuilding)) {
        this.$router.push('/');
      }
    }
    created () {
      if ((Vue.prototype.userAgent === 'mobile' && !this.$Settings.mobileBuilding) || (Vue.prototype.userAgent === 'pc' && !this.$Settings.pcBuilding)) return;
      this.background = this.userAgent === 'mobile' ? '/static/building/Mobile.jpg' : '/static/building/PC.jpg';
      this.img = this.userAgent === 'mobile' ? '/static/building/MobileLogo.png' : '/static/building/PCLogo.png';
      this.$HiddenLayer();
    }
    mounted () {
    }
    data () {
      return {
      };
    }
    get indexLayout () {
      return '';
    }
}
</script>
<style lang="less" scoped>
.ins_building_warpper{
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .background{
      width: 100vw;
      max-height: 100vh;
    }
    .pc_logo{
      height: 21%;
      position:absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
    .mobile_logo{
      height: 12%;
      position:absolute;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);
    }
}
</style>
