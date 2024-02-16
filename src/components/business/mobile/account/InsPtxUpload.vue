<template>
  <div id="container" class="NotificationMain">

  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    inPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsNotification extends Vue {

}
</script>
<style lang="less" scoped>

</style>
