<template>
  <baidu-map class="BaiduMap" :center="{lng: lng, lat: lat}" :zoom="15" :scroll-wheel-zoom="true" auto-resize ak="huqDU15ifibzUjG4Ol8Z6EVfV7FPmtFy" :style="{width: width, height: height}">
    <bm-marker :position="{lng: lng, lat: lat}" :dragging="true" @click="infoWindowOpen">
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">
        <slot></slot>
        {{markText}}
      </bm-info-window>
    </bm-marker>
  </baidu-map>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  BaiduMap,
  BmMarker,
  BmInfoWindow
} from 'vue-baidu-map';

@Component({
  components: {
    BaiduMap,
    BmMarker,
    BmInfoWindow
  }
})
export default class InsBaiduMap extends Vue {
  @Prop({ default: '100%' }) private width!: string; // 地图宽度
  @Prop({ default: '500px' }) private height!: string; // 地图高度
  @Prop({ default: 116.404 }) private lng!: number; // 经度
  @Prop({ default: 39.915 }) private lat!: number; // 纬度
  @Prop({ default: '' }) private markText!: string; // 标注文本

  show: boolean = true;

  infoWindowClose () {
    this.show = false;
  };

  infoWindowOpen () {
    this.show = true;
  };
};
</script>
