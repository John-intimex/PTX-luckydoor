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
                       <li v-if="ruleForm.CreateDate!==null"><span>{{$t('Enquiry.Date')}}:</span><span>{{ruleForm.CreateDate}}</span></li>
                       <li v-if="ruleForm.CustomerView.CountryName!==null"><span>{{$t('Enquiry.Country')}}:</span><span>{{ruleForm.CustomerView.CountryName}}</span></li>
                       <li v-if="ruleForm.CustomerView.ProvinceName!==null"><span>{{$t('Enquiry.State')}}:</span><span>{{ruleForm.CustomerView.ProvinceName}}</span></li>
                       <li v-if="ruleForm.CustomerView.CityName!==null"><span>{{$t('Enquiry.City')}}:</span><span>{{ruleForm.CustomerView.CityName}}</span></li>
                       <li v-if="ruleForm.Code!==null"><span>{{$t('Enquiry.ProformaInvoice')}}:</span><span>{{ruleForm.Code}}</span></li>
                       <li v-if="ruleForm.CustomerView.PostCode!==null"><span>{{$t('Enquiry.PostalCode')}}:</span><span>{{ruleForm.CustomerView.PostCode}}</span></li>
                       <li v-if="ruleForm.CaseView.CaseCode!==null"><span>{{$t('Enquiry.CaseNo')}}:</span><span>{{ruleForm.CaseView.CaseCode}}</span></li>
                       <li v-if="ruleForm.CustomerView.FullName!==null"><span>{{$t('Enquiry.Attn')}}:</span><span>{{ruleForm.CustomerView.FullName}}</span></li>
                       <li v-if="ruleForm.CustomerView.Phone!==null"><span>{{$t('Enquiry.Phone')}}:</span><span>{{ruleForm.CustomerView.Phone}}</span></li>
                       <li v-if="ruleForm.CustomerView.Fax!==null"><span>{{$t('Enquiry.Fax')}}:</span><span>{{ruleForm.CustomerView.Fax}}</span></li>
                       <li v-if="ruleForm.CustomerView.Email!==null"><span>{{$t('Enquiry.Email')}}:</span><span>{{ruleForm.CustomerView.Email}}</span></li>
                   </ul>
                </div>
                <div class="Product">
                    <h2>{{$t('Enquiry.ProformaInvoice')}}</h2>
                    <div class="InnerProduct">
                            <ul class="topB"  v-for="(v,index) in ruleForm.DetailList" :key="index">
                                <li><span>{{$t('Enquiry.Item')}}</span><span>{{index+1}}</span></li>
                                <li><span>{{$t('Enquiry.ProductCode')}}</span><span>{{v.Code}}</span></li>
                                <li><span>{{$t('Enquiry.ProductName')}}</span><span>{{v.ProductName}}</span></li>
                                <li><span>{{$t('Enquiry.OtherRequirement')}}</span><span>{{v.Remark}}</span></li>
                                <li><span>{{$t('Enquiry.Image')}}</span><span><img :src="v.RelativeImage"></span></li>
                                <li><span>{{$t('Enquiry.Quantity')}}</span><span>{{(v.Qty) | PriceFormat}}</span></li>
                                <li><span>{{$t('Enquiry.UnitPrice')}}({{ruleForm.CurrencyCode}})</span><span>{{(v.UnitPrice) | PriceFormat}}</span></li>
                                <li><span>{{$t('Enquiry.SubTotal')}}({{ruleForm.CurrencyCode}})</span><span>{{(v.TotalSum) | PriceFormat}}</span></li>
                            </ul>
                            <div class="totalSum">
                                <p><span>{{$t('Enquiry.AdditionalCharges')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.AdditionalFee) | PriceFormat}}</span><p>
                                <p><span>{{$t('Enquiry.Discount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Discount) | PriceFormat}}</span></p>
                                <p><span>{{$t('Enquiry.TransactionAmount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Total) | PriceFormat}}</span></p>
                            </div>
                    </div>
                </div>
                <div class="otherInfo">
                    <h2>{{$t('Enquiry.OtherInformation')}}</h2>
                    <p class="perInfo"><span>{{$t('Enquiry.DeliveryDate')}}：</span><span>{{ruleForm.DeliveryDate}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.DeliveryLeadTime')}}：</span><span>{{ruleForm.DeliverySchedule}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.DeliverMethod')}}：</span><span>{{ruleForm.DeliveryType}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.ShipmentTerms')}}：</span><span>{{ruleForm.ShipCondition}}</span></p>
                    <p class="perInfo"><span>{{$t('Enquiry.Remarks')}}：</span><span>{{ruleForm.Remark}}</span></p>
                </div>
                <div class="signature">
                    <div class="leftside">
                        <p class="signatureline"></p>
                        <p class="signatureText">{{$t('Enquiry.Sign')}}</p>
                        <p class="signatureText">{{$t('Enquiry.SignTips')}}</p>
                    </div>
                     <div class="rightside">
                        <p class="signatureline"></p>
                        <p class="signatureText">{{ruleForm.CustomerView.CompanyName}}</p>
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
export default class InsBuyOrderPrinting extends Vue {
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
      this.$Api.enquiry.GetGoodOrder(this.id).then(result => {
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
    console.log(this.$refs.print, 'ddddddddddddd');
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
    padding: 0px;
    padding-top: 7.5rem;
    .InnerBox {
        width:90%;
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
                display: inline-block;
                width: 100%;
                img {
                    width: 250px;
                    display: inline-block;
                    margin-bottom: 20px;
                }
                span {
                    display: block;
                    margin-right: 10px;
                    font-size: 1.2rem;
                    width: 100%;
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
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        float: left;
                        align-items: center;
                        margin-bottom: 10px;
                        span{
                            font-size: 1.2rem;
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
                display: flex;
                flex-wrap: wrap;
                border: 1px solid #000;
                width: calc(100% - 2px);
                ul{
                    li{
                        box-sizing:border-box;
                        margin: 0;
                        padding: 0;
                        font-size: 16px;
                        display: flex;
                        flex-wrap: wrap;
                        align-items: center;
                        justify-content: space-between;
                        padding-top: 5px;
                        padding-bottom: 5px;
                        width: 100%;
                        span{
                            font-size: 1.2rem;
                            &:nth-child(1) {
                                width: 40%;
                            }
                            &:nth-child(2) {
                                width: 58%;
                            }

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
                    width: calc(100% - 4%);
                    display: inline-block;
                    border-bottom: 1px solid #000;
                    padding: 2%;
                    img {
                        width: 50px;
                        margin: 0 auto;
                        padding-bottom: 5px;
                        padding-top: 5px;
                    }
                }
                .totalSum {
                    width: calc(100% - 4%);
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: flex-end;
                    padding:0% 2%;
                    span{
                        display: flex;
                        align-items: center;
                        padding-top: 1rem;
                        padding-bottom: 1rem;
                        font-size: 1.2rem;
                    }
                    p{
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: flex-end;
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
            .leftside {
                margin-bottom: 80px;
            }
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
