<template>
<div class="warper">
  <div class="DeliveryOrderDetail" id="print" ref="print">
      <p class="HeadTitle"><span class="Request">{{$t('Enquiry.ShipmentScheduleNo')}}: {{DetailList.CustomerCode }}</span></p>
      <div class="TableA" style="padding-top:15px;">
          <ul>
              <li>
                  <span class="w15">{{$t('Enquiry.ProInvcode')}}:</span>
                  <span class="w83">{{DetailList.OrderCode}}</span>
              </li>
              <li>
                  <span class="w15">{{$t('Enquiry.Date')}}:</span>
                  <span class="w83">{{DetailList.CreateDate}}</span>
              </li>
              <li>
                  <span class="w15">{{$t('Enquiry.Company')}}:</span>
                  <span class="w83">{{DetailList.CustomerView.CompanyName}}</span>
              </li>
            <li>
                <span class="w15">{{$t('Enquiry.CaseNo')}}:</span>
                <span class="w83">{{DetailList.CaseCode}}</span>
              </li>
          </ul>
      </div>
      <div class="TableA DetailTable">
          <div class="BgTitle">
            <p class="w10">{{$t('Enquiry.Image')}}</p>
            <p class="w10">{{$t('Enquiry.ProInvcode')}}</p>
            <p class="w15">{{$t('Enquiry.ProductName')}}</p>
            <p class="w10">{{$t('Enquiry.ProductCode')}}</p>
            <p class="w10">{{$t('Enquiry.UnitPrice')}}({{DetailList.CurrencyCode}})</p>
            <p class="w15">{{$t('Enquiry.ExpectedShipmentDate')}}</p>
            <p class="w10">{{$t('Enquiry.OrderQty')}}</p>
            <p class="w10">{{$t('Enquiry.ShipmentQty')}}</p>
            <p class="w10">{{$t('Enquiry.Status')}}</p>
        </div>
        <div class="ContentTable">
          <ul class="perlist" v-for="(v,index) in DetailList.Details" :key="index">
            <li class="w10"><img :src="v.Image"></li>
            <li class="w10">{{v.DetailCode}}</li>
            <li class="w15">{{v.ProductName}}</li>
            <li class="w10">{{v.ProductCode}}</li>
            <li class="w10">{{v.UnitPrice | PriceFormat}}</li>
            <li class="w15">{{v.PreShippingDate}}</li>
            <li class="w10">{{v.OrderQty | PriceFormat}}</li>
            <li class="w10">{{v.SeparateQty | PriceFormat}}</li>
            <li class="w10">{{v.StatusName}}</li>
          </ul>
        </div>
        <div class="TotalS">
          <div class="w33"><span class="title">{{$t('Enquiry.OrderQty')}}</span><span class="content">{{DetailList.TotalQty | PriceFormat}}</span></div>
          <div class="w33"><span class="title">{{$t('Enquiry.ShipmentQty')}}</span><span class="content">{{DetailList.TotalItemQty | PriceFormat}}</span></div>
          <div class="w33"><span class="title">{{$t('Enquiry.Balance')}}</span><span class="content">{{DetailList.TotalRemainQty | PriceFormat}}</span></div>
        </div>
      </div>
  </div>
  <div class="BottomMeun">
    <a @click="goPrint" id="printBtn" >{{$t('Enquiry.PrintFormat')}}</a>
    <a @click="GoBack()">{{$t('Enquiry.Back')}}</a>
</div>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
import printJS from 'print-js';
import html2Canvas from 'html2Canvas';
@Component
export default class InsDeliveryOrderDetail extends Vue {
  DetailList:any={
      CustomerView: {}
  };
  htmlTitle:string='pdf文件名';
  isPrint:boolean = true;
  get id() {
    return this.$route.params.id;
  }
  async GetDeliveryOrderDetail () {
      this.$Api.enquiry.GetDeliveryOrderDetail(this.id).then(result => {
          this.DetailList = result;
      });
  }
 goPrint() {
     this.$router.push('/account/DeliveryPrinting/' + this.id + '/' + 0);
  }
  GoBack () {
      this.$router.push('/account/ptxorder');
  }
  created() {
   this.GetDeliveryOrderDetail();
  }
}
</script>
<style scoped lang='less'>
.DeliveryOrderDetail {
  width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .DetailTable {
    margin-top: 20px;
    .w10 {
      width: 10%;
      text-align: center;
      word-break: break-word;
      display: flex;
      align-items: center;
      justify-content: center;
       img {
         width: 90%;
         margin: 0 auto;
         display: block;
       }
    }
   .w15 {
     width: 15%;
     text-align: center;
     word-break: break-word;
     display: flex;
     align-items: center;
     justify-content: center;
   }
  .BgTitle {
    .w10 {
    color: #fff;
    }
  .w15 {
    color: #fff;
    }
  }
  .ContentTable {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .perlist {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .TotalS {
    width: 95%;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    height: 35px;
    line-height: 35px;
    margin-top: 20px;
    margin-bottom: 20px;
    justify-content: flex-end;
    .w33 {
      margin-right: 10px;
      .content {
        color: red;
      }
    }
  }
  }
}
</style>
