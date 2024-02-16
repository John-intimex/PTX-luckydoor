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
    <div class="ListData">
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Image')}}</li>
                <li>{{$t('Enquiry.ProInvcode')}}</li>
                <li>{{$t('Enquiry.ProductName')}}</li>
                <li>{{$t('Enquiry.ProductCode')}}</li>
                <li>{{$t('Enquiry.UnitPrice')}}({{DetailList.CurrencyCode}})</li>
                <li>{{$t('Enquiry.ExpectedShipmentDate')}}</li>
                <li>{{$t('Enquiry.OrderQty')}}</li>
                <li>{{$t('Enquiry.ShipmentQty')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
            </ul>
            <ul class="Bottom" v-for="(v,index) in DetailList.Details" :key="index">
              <li><img :src="v.Image"></li>
              <li>{{v.DetailCode}}</li>
              <li>{{v.ProductName}}</li>
              <li>{{v.ProductCode}}</li>
              <li>{{v.UnitPrice | PriceFormat}}</li>
              <li>{{v.PreShippingDate}}</li>
              <li>{{v.OrderQty | PriceFormat}}</li>
              <li>{{v.SeparateQty | PriceFormat}}</li>
              <li>{{v.StatusName}}</li>
            </ul>
        </div>
    </div>
        <div class="TotalS">
          <div class="w33"><span class="title">{{$t('Enquiry.OrderQty')}}</span><span class="content">{{DetailList.TotalQty | PriceFormat}}</span></div>
          <div class="w33"><span class="title">{{$t('Enquiry.ShipmentQty')}}</span><span class="content">{{DetailList.TotalItemQty | PriceFormat}}</span></div>
          <div class="w33"><span class="title">{{$t('Enquiry.Balance')}}</span><span class="content">{{DetailList.TotalRemainQty | PriceFormat}}</span></div>
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
.warper {
  width:90%!important;
  margin: 0 auto;
  display: flex!important;
}
.DeliveryOrderDetail {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  .ListData {
    width: calc(100% - 20px);
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
    padding: 10px;
    margin: 0 auto;
    margin-top: 20px;
    .List {
      width: 100%;
      overflow-x: auto;
    }
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
    }
    .Top {
      background: #7f8dba;
      margin-top: 20px;
      display: inline-flex;
      li{
        color: #fff;
        display: inline-flex;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        align-items: center;
        justify-content: center;
        &:nth-child(1){
          width: 150px;
        }
        &:nth-child(2){
          width: 150px;
        }
        &:nth-child(3){
          width: 150px;
        }
        &:nth-child(4){
          width: 150px;
        }
        &:nth-child(5){
          width: 150px;
        }
        &:nth-child(6){
          width: 150px;
        }
        &:nth-child(7){
          width: 150px;
        }
        &:nth-child(8){
          width: 150px;
        }
        &:nth-child(9){
          width: 150px;
        }
      }
    }
    .Bottom {
      display: inline-flex;
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
          width: 150px;
        }
        &:nth-child(2){
          width: 150px;
        }
        &:nth-child(3){
          width: 150px;
        }
        &:nth-child(4){
          width: 150px;
        }
        &:nth-child(5){
          width: 150px;
        }
        &:nth-child(6){
          width: 150px;
        }
        &:nth-child(7){
          width: 150px;
        }
        &:nth-child(8){
          width: 150px;
        }
        &:nth-child(9){
          width: 150px;
        }
      }
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
      span {
        font-size: 1.2rem;
      }
      .content {
        color: red;
      }
    }
  }
  // .DetailTable {
  //   margin-top: 20px;
  //   display: block!important;
  //   overflow-x: auto;
  //   .NBgTitle {
  //       display: inline-flex!important;
  //       flex-wrap: unset!important;
  //   }
  //   .pw10 {
  //     width: 150px!important;
  //     text-align: center;
  //     word-break: break-word;
  //     display: inline-flex;
  //     align-items: center;
  //     justify-content: center;
  //     font-size: 1.2rem;
  //      img {
  //        width: 90%;
  //        margin: 0 auto;
  //        display: block;
  //      }
  //   }
  //  .pw15 {
  //    width: 200px!important;
  //    text-align: center;
  //    word-break: break-word;
  //    display: inline-flex;
  //    align-items: center;
  //    justify-content: center;
  //    font-size: 1.2rem;
  //  }
  // .ContentTable {
  //   margin-top: 20px;
  //   display: block!important;
  //   overflow-x: auto;
  //   .perlist {
  //       display: inline-flex!important;
  //       flex-wrap: unset!important;
  //   }
  // }
  // .TotalS {
  //   width: 95%;
  //   display: flex;
  //   flex-wrap: wrap;
  //   margin: 0 auto;
  //   height: 35px;
  //   line-height: 35px;
  //   margin-top: 20px;
  //   margin-bottom: 20px;
  //   justify-content: flex-end;
  //   .w33 {
  //     margin-right: 10px;
  //     .content {
  //       color: red;
  //     }
  //   }
  // }
  // }
}
</style>
