<template>
<div class="warper PrintingPreview">
    <div class="InnerBox" id="print" ref="print">
            <div class="Top">
                <h1>{{TitleForm.Name}}</h1>
                <p><img :src="TitleForm.RelativeLogo" class="RelativeLogo"></p>
                <p><span>{{TitleForm.Address}}</span></p>
                <p><span>{{$t('Enquiry.Phone')}}:{{TitleForm.Phone}}</span><span>{{$t('Enquiry.Fax')}}:{{TitleForm.Fax}}</span></p>
            </div>
            <div class="Mid">
                <div class="Info">
                   <ul>
                       <li v-if="DetailList.OrderCode!==null"><span>{{$t('Enquiry.ProInvcode')}}:</span><span>{{DetailList.OrderCode}}</span></li>
                       <li v-if="DetailList.CreateDate!==null"><span>{{$t('Enquiry.Date')}}:</span><span>{{DetailList.CreateDate}}</span></li>
                       <li v-if="DetailList.CustomerView.CompanyName!==null"><span>{{$t('Enquiry.Company')}}:</span><span>{{DetailList.CustomerView.CompanyName}}</span></li>
                       <li v-if="DetailList.CaseCode!==null"><span>{{$t('Enquiry.CaseNo')}}:</span><span>{{DetailList.CaseCode}}</span></li>
                   </ul>
                </div>
                <div class="Product">
                    <h2>{{$t('Enquiry.ShipmentSchedule')}}</h2>
                    <div class="InnerProduct">
                        <ul class="topA">
                                <li>{{$t('Enquiry.Image')}}</li>
                                <li>{{$t('Enquiry.ProInvcode')}}</li>
                                <li>{{$t('Enquiry.ProductName')}}</li>
                                <li>{{$t('Enquiry.ProductCode')}}</li>
                                <li>{{$t('Enquiry.UnitPrice')}}({{DetailList.CurrencyCode}})</li>
                                <li>{{$t('Enquiry.ExpectedShipmentDate')}}</li>
                                <li>{{$t('Enquiry.OrderQty')}}</li>
                                <li>{{$t('Enquiry.ShipmentQty')}}</li>
                            </ul>
                            <ul class="topB"  v-for="(v,index) in DetailList.Details" :key="index">
                                <li><img :src="v.RelativeImage"></li>
                                <li>{{v.DetailCode}}</li>
                                <li>{{v.ProductName}}</li>
                                <li>{{v.ProductCode}}</li>
                                <li>{{v.UnitPrice | PriceFormat}}</li>
                                <li>{{v.PreShippingDate}}</li>
                                <li>{{v.OrderQty | PriceFormat}}</li>
                                <li>{{v.SeparateQty | PriceFormat}}</li>
                            </ul>
                            <p class="totalSum"><span>{{$t('Enquiry.OrderQty')}}:</span><span>{{DetailList.TotalQty | PriceFormat}}</span></p>
                            <p class="totalSum"><span>{{$t('Enquiry.ShipmentQty')}}:</span><span>{{DetailList.TotalItemQty | PriceFormat}}</span></p>
                            <p class="totalSum"><span>{{$t('Enquiry.Balance')}}:</span><span>{{DetailList.TotalRemainQty | PriceFormat}}</span></p>
                    </div>
                </div>
            </div>
    </div>
    <div class="clear"></div>
    <div class="BottomMeun">
        <a  @click="goPrint" id="printBtn" >{{$t('Enquiry.Print')}}</a>
        <a @click="GoBack()" class="colorStyle">{{$t('Enquiry.Back')}}</a>
    </div>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
import printJS from 'print-js';
import html2Canvas from 'html2Canvas';
@Component
export default class InsDeliveryPrinting extends Vue {
  DetailList:any={
      CustomerView: {}
  };
  TitleForm:any={};
  isPrint:boolean = true;
  get type() {
        return this.$route.params.type;
  }
  get id() {
    return this.$route.params.id;
  }
  get currentlang () {
    return this.$i18n.locale;
  }
    GetStoreData () {
        var params = {
            Lang: this.currentlang
        };
        this.$Api.enquiry.GetStoreData(params).then(result => {
            this.TitleForm = result;
            console.log(result, 'dddddddd');
        });
    }
  async GetDeliveryOrderDetail () {
      this.$Api.enquiry.GetDeliveryOrderDetail(this.id).then(result => {
          this.DetailList = result;
      });
  }
   GetPtxGoodOrder () {
      this.$Api.enquiry.GetPtxOrderMessage(this.id).then(result => {
          if (result) {
            this.DetailList = result;
          }
      });
  }
 async goPrint() {
    this.isPrint = true;
    await html2Canvas(this.$refs.print as any, {
    allowTaint: false,
    // taintTest: false,
    useCORS: true,
    // dpi: window.devicePixelRatio * 4,
    scale: 4
    // scrollX: 0,
    // scrollY: 0
    }).then((canvas) => {
    const url = canvas.toDataURL('image/jpg');
    printJS({
        printable: url, // 要打印的id
        type: 'image',
        style: '@page{size:auto;margin: 1cm 1cm 1cm 1cm;}' // 去除页眉页脚
    });
    this.isPrint = false;
    });
  }
    GoBack () {
        this.$router.push('/account/ptxorder');
    }
    created() {
        this.GetStoreData();
        if (this.type === '0') {
        this.GetDeliveryOrderDetail();
        } else {
        this.GetPtxGoodOrder();
        }
    }
}
</script>
<style scoped lang='less'>
.PrintingPreview {
    width: 100%;
    display: inline-block!important;
    flex-wrap: wrap;
    background: #fff!important;
    padding-top: 3rem;
    .InnerBox {
        width:1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        .Top {
            width: 100%;
            display: inline-block;
            h1 {
                text-align: center;
                font-size: 30px;
                margin-bottom: 30px;
            }
            p{
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                img {
                    width: 250px;
                    display: inline-block;
                    margin-bottom: 20px;
                }
                span {
                    display: inline-block;
                    margin-right: 10px;
                    font-size: 16px;
                }
            }
        }
        .Mid {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            margin-bottom: 20px;
            .Info {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                ul {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                        width: 50%;
                        display: flex;
                        flex-wrap: wrap;
                        float: left;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            font-size: 16px;
                            &:nth-child(1) {
                                font-weight: 700;
                            }
                        }
                    }
                }
            }
        }
        .Product {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            h2{
                font-size: 20px;
                text-align: center;
                width: 100%;
                margin-bottom: 10px;
            }
            .InnerProduct {
                width: calc(100% - 2px);
                display: flex;
                flex-wrap: wrap;
                border: 1px solid #000;
                ul{
                    li{
                        box-sizing:border-box;
                        margin: 0;
                        padding: 0;
                        border-right: 1px solid #000;
                        font-size: 16px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: flex-end;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        text-align: right;
                        word-break: break-word;
                        &:nth-child(1){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(2){
                            width: calc(20% - 1px);
                        }
                        &:nth-child(3){
                            width: calc(15% - 1px);
                        }
                        &:nth-child(4){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(5){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(6){
                            width: calc(15% - 1px);
                        }
                        &:nth-child(7){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(8){
                            width: 10%;
                            border-right: 0px!important;
                        }
                    }
                }
                .topA {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    border-bottom: 1px solid #000;
                }
                .topB {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #000;
                    img {
                        width: 90%;
                        margin: 0 auto;
                        padding-bottom: 5px;
                        padding-top: 5px;
                    }
                }
                .totalSum {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;
                    border-bottom: 1px solid #000;
                    &:last-child{
                        border-bottom: 0px!important;
                    }
                    span{
                        display: flex;
                        align-items: center;
                        padding-top: 5px;
                        padding-bottom: 5px;
                    &:nth-child(1){
                        border-right: 1px solid #000;
                        display: flex;
                        justify-content: flex-end;
                    }
                    &:nth-child(2){
                            width: calc(10% + 1px);
                            justify-content: flex-end;
                        }
                    }
                }
            }
        }
        .otherInfo {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            h2 {
                font-size: 20px;
                text-align: center;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;
            }
            .perInfo {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                margin-bottom: 10px;
                span{
                    font-size: 16px;
                }
            }
        }
        .signature {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 100px;
            margin-bottom: 50px;
            .signatureline {
                border-bottom: 1px solid #000;
                width: 200px;
            }
            .signatureText {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                font-size: 16px;
            }

        }
    }
}
</style>
