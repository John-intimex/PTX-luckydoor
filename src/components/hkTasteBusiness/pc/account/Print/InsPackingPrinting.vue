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
                       <li v-if="ruleForm.CustomerView.CompanyName!==null"><span>{{$t('Enquiry.Company')}}:</span><span>{{ruleForm.CustomerView.CompanyName}}</span></li>
                       <li v-if="ruleForm.CustomerCode!==null"><span>{{$t('Enquiry.YourRef')}}:</span><span>{{ruleForm.CustomerCode}}</span></li>
                       <li v-if="ruleForm.CustomerView.Address!==null"><span>{{$t('Enquiry.Address')}}:</span><span>{{ruleForm.CustomerView.Address}}</span></li>
                       <li v-if="ruleForm.CaseView.CreateDate!==null"><span>{{$t('Enquiry.Date')}}:</span><span>{{ruleForm.CaseView.CreateDate}}</span></li>
                       <li v-if="ruleForm.CustomerView.CountryName!==null"><span>{{$t('Enquiry.Country')}}:</span><span>{{ruleForm.CustomerView.CountryName}}</span></li>
                       <li v-if="ruleForm.CustomerView.ProvinceName!==null"><span>{{$t('Enquiry.State')}}:</span><span>{{ruleForm.CustomerView.ProvinceName}}</span></li>
                       <li v-if="ruleForm.CustomerView.CityName!==null"><span>{{$t('Enquiry.City')}}:</span><span>{{ruleForm.CustomerView.CityName}}</span></li>
                       <li v-if="ruleForm.CaseView.InvcCode!==null"><span>{{$t('Enquiry.Packing')}}:</span><span>{{ruleForm.CaseView.InvcCode}}</span></li>
                       <li v-if="ruleForm.CustomerView.PostCode!==null"><span>{{$t('Enquiry.PostalCode')}}:</span><span>{{ruleForm.CustomerView.PostCode}}</span></li>
                       <li v-if="ruleForm.CaseView.CaseCode!==null"><span>{{$t('Enquiry.CaseNo')}}:</span><span>{{ruleForm.CaseView.CaseCode}}</span></li>
                       <li v-if="ruleForm.CustomerView.FullName!==null"><span>{{$t('Enquiry.Attn')}}:</span><span>{{ruleForm.CustomerView.FullName}}</span></li>
                       <li v-if="ruleForm.CustomerView.Phone!==null"><span>{{$t('Enquiry.Phone')}}:</span><span>{{ruleForm.CustomerView.Phone}}</span></li>
                       <li v-if="ruleForm.CustomerView.Fax!==null"><span>{{$t('Enquiry.Fax')}}:</span><span>{{ruleForm.CustomerView.Fax}}</span></li>
                       <li v-if="ruleForm.CustomerView.Email!==null"><span>{{$t('Enquiry.Email')}}:</span><span>{{ruleForm.CustomerView.Email}}</span></li>
                   </ul>
                </div>
                <div class="Product">
                    <h2>{{$t('Enquiry.Packing')}}</h2>
                    <div class="InnerProduct">
                        <ul class="topA">
                                <li>{{$t('Enquiry.Item')}}</li>
                                <li>{{$t('Enquiry.ProductCode')}}</li>
                                <li>{{$t('Enquiry.ProductName')}}</li>
                                <li>{{$t('Enquiry.OtherRequirement')}}</li>
                                <li>{{$t('Enquiry.Image')}}</li>
                                <li>{{$t('Enquiry.GrossWeight')}}</li>
                                <li>{{$t('Enquiry.NetWeight')}}</li>
                                <li>{{$t('Enquiry.SubTotal')}}({{ruleForm.CurrencyCode}})</li>
                            </ul>
                            <ul class="topB"  v-for="(v,index) in ruleForm.Details" :key="index">
                                <li>{{index+1}}</li>
                                <li>{{v.ProductCode}}</li>
                                <li>{{v.ProductName}}</li>
                                <li>{{v.Remark}}</li>
                                <li><img :src="v.RelativeImage"></li>
                                <li>{{(v.GrossWeight) | PriceFormat}}</li>
                                <li>{{(v.NetWeight) | PriceFormat}}</li>
                                <li>{{(v.TotalSum) | PriceFormat}}</li>
                            </ul>
                            <p class="totalSum"><span>{{$t('Enquiry.Total')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.TotalAmount) | PriceFormat}}</span></p>
                            <p class="totalSum"><span>{{$t('Enquiry.TotalGrossWeight')}}:</span><span>{{(ruleForm.TotalGrossWeight) | PriceFormat}}</span></p>
                            <p class="totalSum"><span>{{$t('Enquiry.TotalNetWeight')}}:</span><span>{{(ruleForm.TotalNetWeight) | PriceFormat}}</span></p>
                    </div>
                </div>
                <div class="otherInfo">
                    <h2>{{$t('Enquiry.OtherInformation')}}</h2>
                    <p class="perInfo"><span>{{$t('Enquiry.DeliveryDate')}}：</span><span>{{ruleForm.DeliveryDate}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.DeliverMethod')}}：</span><span>{{ruleForm.DeliveryType}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.ShipmentTerms')}}：</span><span>{{ruleForm.ShipCondition}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.PaymentTerms')}}：</span><span>{{ruleForm.PayType}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.TotalVolume')}}：</span><span>{{ruleForm.TotalCapacity}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.TotalCarton')}}：</span><span>{{ruleForm.TotalBox}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.CountryofOrigin')}}：</span><span>{{ruleForm.ProductFrom}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.Remarks')}}：</span><span>{{ruleForm.Remark}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.ShippingMark')}}：</span><span>{{ruleForm.ShipMark}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.ShippingMarkImage')}}：</span><span><img :src="ruleForm.ShipMarkImage" width="100"></span></p>
                </div>
                <!-- <div class="signature">
                    <p class="signatureline"></p>
                    <p class="signatureText">{{$t('Enquiry.AuthorizedSignature')}}</p>
                </div> -->
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
export default class InsPackingPrinting extends Vue {
  isPrint:boolean = true;
  TitleForm:any={};
  ruleForm: any = {
      CustomerView: {},
      CaseView: {}
  };
  get id() {
    return this.$route.params.id;
  }
  get type() {
        return this.$route.params.type;
  }
 GetGoodOrder () {
      this.$Api.enquiry.GetBoxingOrder(this.id).then(result => {
          if (result) {
            this.ruleForm = result;
            console.log(this.ruleForm, 'this.ruleForm this.ruleForm ');
          }
      });
  }
   GetPtxGoodOrder () {
      this.$Api.enquiry.GetPtxOrderMessage(this.id).then(result => {
          if (result) {
            this.ruleForm = result;
            console.log(this.ruleForm, 'this.ruleForm this.ruleForm ');
          }
      });
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
 GoBack () {
      this.$router.push('/account/ptxorder');
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
  created() {
    this.GetStoreData();
    if (this.type === '0') {
     this.GetGoodOrder();
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
                            width: calc(5% - 1px);
                        }
                        &:nth-child(2){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(3){
                            width: calc(25% - 1px);
                        }
                        &:nth-child(4){
                            width: calc(15% - 1px);
                        }
                        &:nth-child(5){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(6){
                            width: calc(10% - 1px);
                        }
                        &:nth-child(7){
                            width: calc(15% - 1px);
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
