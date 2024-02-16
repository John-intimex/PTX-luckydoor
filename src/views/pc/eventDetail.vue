<template>
  <div id="container" class="EventDetail">
    <!-- <a href="javascript:;" @click="back">Back to Event List</a> -->
    <div class="content" v-html="eventDetail.Description"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class EventDetail extends Vue {
  eventDetail: object = {};

  GetById () {
    this.$Api.calendar.GetById({ id: this.eventId, IsMobile: this.isMobile }).then(result => {
      if (result.Succeeded) {
        console.log(result, '活动内容');
        this.eventDetail = result.ReturnValue;
      }
    });
  }

  back () {
    this.$router.go(-1);
  }

  get eventId () {
    return this.$route.params.id;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.GetById();
  }
}
</script>
<style scoped lang="less">
.EventDetail {
  .content {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
