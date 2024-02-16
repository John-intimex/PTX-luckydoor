<template>
  <div class="warper CaseList">
    <div class="Inner">
        <div class="ListData">
            <div class="HeadTitle">
                <p class="NameTitle">{{$t('Enquiry.Case')}}#:{{CaseCode}}</p>
                <p class="Page">{{$t('Enquiry.Status')}}:{{CaseStatus}}</p>
            </div>
            <div class="List">
                <ul class="Top">
                    <li>{{$t('Enquiry.Document')}} #</li>
                    <li>{{$t('Enquiry.Type')}}</li>
                    <li>{{$t('Enquiry.Date')}}</li>
                </ul>
                <ul class="Bottom" v-for="(v,index) in EnqList" :key="index">
                  <li v-if="v.CaseType===1"><router-link :to="'/account/EnquiryDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li v-if="v.CaseType===2"><router-link :to="'/account/QuotaDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li v-if="v.CaseType===3"><router-link :to="'/account/BuyOrderDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li v-if="v.CaseType===4"><router-link :to="'/account/InviceInfoDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li v-if="v.CaseType===5"><router-link :to="'/account/DeliveryDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li v-if="v.CaseType===6"><router-link :to="'/account/PackingDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li>{{v.OrderType}}</li>
                  <li>{{v.CreateDate}}</li>
                </ul>
            </div>
        </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCaseList extends Vue {
  CaseStatus:string='';
  EnqList:any[]=[];
  CaseCode:string='';
  BaseUrl:string='';
    get id() {
    return this.$route.params.id;
  }
  CaseDetailInfo () {
      this.$Api.enquiry.CaseDetailInfo(this.id).then(result => {
        this.CaseStatus = result.CaseStatus;
        this.EnqList = result.EnqList;
        this.CaseCode = result.CaseCode;
      });
  }
  created() {
    this.CaseDetailInfo();
  }
}
</script>
<style scoped lang='less'>
.CaseList {
  margin-bottom: 50px;
  min-height: 600px;
}
  .ListData {
    width: 960px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    .HeadTitle {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      .NameTitle {
        font-size: 18px;
        color: #666;
        display: flex;
        align-items: center;
        &::before{
        content: '';
        width: 3px;
        height: 20px;
        background: #666;
        display: inline-block;
        margin-right: 5px;
        }
      }
      .Page {
        color: red;
      }
    }
    .Top {
      background: #666666;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      li{
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        &:nth-child(1){
          width: 33.3%;
        }
        &:nth-child(2){
          width: 33.3%;
        }
        &:nth-child(3){
          width: 33.3%;
        }
      }
    }
    .Bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      padding-bottom: 20px;
      &:nth-child(2n-1){
        background: #f8f8f8;
      }
      li{
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        a{
          color: #666;
          font-size: 16px;
        }
        &:nth-child(1){
          width: 33.3%;
        }
        &:nth-child(2){
          width: 33.3%;
        }
        &:nth-child(3){
          width: 33.3%;
        }
      }
    }
  }
</style>
