<template>
<div class="warper" id="printArea">
    <el-form
        :model="ruleForm"
        :rules="rules"
        :label-position="'right'"
        label-width="120px"
        ref="ruleForm"
        class="demo-ruleForm"
    >
    <div class="Inner" id="print" ref="print">
        <div class="left">
                <p class="HeadTitle"><span class="Request">{{$t('Enquiry.Invoice')}}: {{ruleForm.CaseView.CustomerCode }}</span><span class="status">{{$t('Enquiry.Status')}}:{{ruleForm.CaseView.CaseStatus}}</span></p>
                <div class="TableA" style="padding-top:15px;">
                    <ul>
                        <li>
                            <span class="w15">{{$t('Enquiry.CaseNo')}}:</span>
                            <span class="w83">{{ruleForm.CaseView.CaseCode}}</span>
                        </li>
                        <li>
                            <span class="w15">{{$t('Enquiry.InvoiceNo')}}:</span>
                            <span class="w83">{{ruleForm.CaseView.InvcCode}}</span>
                        </li>
                        <li>
                            <span class="w15">{{$t('Enquiry.Date')}}:</span>
                            <span class="w83">{{ruleForm.CaseView.CreateDate }}</span>
                        </li>
                      <li>
                          <span class="w15">{{$t('Enquiry.YourRef')}}:</span>
                          <span class="w83">{{ruleForm.CaseView.CustomerCode }}</span>
                        </li>
                    </ul>
                </div>
                <div class="TableA Recipient">
                    <div class="BgTitle">
                        <p class="InnerTitle">{{$t('Enquiry.From')}}</p>
                    </div>
                    <ul>
                        <li>
                            <span class="w50">{{$t('Enquiry.FirstName')}}:{{ruleForm.CustomerView.FirstName}}</span>
                            <span class="w50">{{$t('Enquiry.LastName')}}:{{ruleForm.CustomerView.LastName}}</span>
                        </li>
                        <li>
                            <span class="w50">{{$t('Enquiry.Title')}}:{{ruleForm.CustomerView.JobTitle}}</span>
                            <span class="w50">{{$t('Enquiry.Company')}}:{{ruleForm.CustomerView.CompanyName}}</span>
                        </li>
                        <li>
                            <span class="w50">{{$t('Enquiry.Address')}}:{{ruleForm.CustomerView.Address}}</span>
                            <span class="w50">{{$t('Enquiry.City')}}:{{ruleForm.CustomerView.CityName}}</span>
                        </li>
                        <li>
                            <span class="w50">{{$t('Enquiry.State')}}:{{ruleForm.CustomerView.ProvinceName}}</span>
                            <span class="w50">{{$t('Enquiry.PostalCode')}}:{{ruleForm.CustomerView.PostalCode}}</span>
                        </li>
                      <li>
                            <span class="w50">{{$t('Enquiry.Country')}}:{{ruleForm.CustomerView.CountryName}}</span>
                            <span class="w50">{{$t('Enquiry.Phone')}}:{{ruleForm.CustomerView.Phone}}</span>
                        </li>
                        <li>
                            <span class="w50">{{$t('Enquiry.Mobile')}}:{{ruleForm.CustomerView.Mobile}}</span>
                            <span class="w50">{{$t('Enquiry.Fax')}}:{{ruleForm.CustomerView.Fax}}</span>
                        </li>
                              <li>
                            <span class="w50">{{$t('Enquiry.Email')}}:{{ruleForm.CustomerView.Email}}</span>
                            <span class="w50"></span>
                        </li>
                    </ul>
                </div>
        </div>
        <div class="right">
            <p class="HeadTitle"><span class="Request">{{$t('Enquiry.SelectedProduct')}}</span></p>
            <div class="TableA Recipient">
                <div class="BgTitle">
                    <p class="w20">{{$t('Enquiry.Image')}}</p>
                    <p class="w58">{{$t('Enquiry.ProductInformation')}}</p>
                    <p class="w20">{{$t('Enquiry.Total')}}({{ruleForm.CurrencyCode}})</p>
                </div>
                <ul>
                    <li class="NoramlLi" v-for="(v,index) in ruleForm.DetailList" :key="index">
                        <span class="w20"><img :src="v.Image"></span>
                        <span class="w58 NormalText">
                          <el-form-item>
                                <em class="text">{{$t('Enquiry.ProductCode')}}:</em>
                                <em class="text">{{v.ProductCode}}</em>
                             </el-form-item>
                             <el-form-item>
                                <em class="text">{{$t('Enquiry.ProductName')}}:</em>
                                <em class="text">{{v.ProductName}}</em>
                             </el-form-item>
                            <el-form-item>
                                <em class="text">{{$t('Enquiry.OtherRequirement')}}:</em>
                                <em class="text"><el-input v-model="v.Remark" width="100" :disabled="isPreview"></el-input></em>
                             </el-form-item>
                        </span>
                        <span class="w20 NormalText">
                             <el-form-item>
                                <em class="text">{{$t('Enquiry.UnitPrice')}}:</em>
                                <em class="text">{{(v.UnitPrice) | PriceFormat}}</em>
                            </el-form-item>
                            <el-form-item>
                                <em class="text">{{$t('Enquiry.Quantity')}}:</em>
                                <em class="text">{{(v.ItemQty) | PriceFormat}}</em>
                            </el-form-item>
                                     <el-form-item>
                                <em class="text">{{$t('Enquiry.SubTotal')}}:</em>
                                <em class="text">{{(v.TotalSum) | PriceFormat}}</em>
                            </el-form-item>
                        </span>
                    </li>
                </ul>
                <div class="TotalSunm">
                    <p><span>{{$t('Enquiry.TransactionAmount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.TotalAmount) | PriceFormat}}</span><span>{{$t('Enquiry.AdditionalCharges')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.AdditionalFee) | PriceFormat}}</span></p>
                    <p><span>{{$t('Enquiry.Discount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Discount) | PriceFormat}}</span><span>{{$t('Enquiry.Total')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Total) | PriceFormat}}</span></p></div>
                </div>
                <div class="TableA BottomTable">
                    <ul>
                        <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.DeliveryDate')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.DeliveryDate" :disabled="isPreview"></el-input> </span>
                        </li>
                        </el-form-item>
                        <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.DeliverMethod')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.DeliveryType" :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.ShipmentTerms')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.ShipCondition" :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.PaymentTerms')}}:</span>
                            <span class="w83"><el-input  v-model="ruleForm.PayCode" :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.Remarks')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.Remark" :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item>
                    </ul>
                </div>
        </div>
    </div>
    <div class="BottomMeun">
        <a @click="goPrint" id="printBtn" >{{$t('Enquiry.PrintFormat')}}</a>
        <a @click="GoBack()" class="colorStyle">{{$t('Enquiry.Back')}}</a>
    </div>
     </el-form>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
import printJS from 'print-js';
import html2Canvas from 'html2Canvas';
@Component
export default class InsInviceInfoDetail extends Vue {
  isPreview:boolean =true;
  CreateDate:string='';
  OrderId:string='';
  MessageContent:string='';
  htmlTitle:string='pdf文件名';
  isPrint:boolean = true;
  so_id:string='0';
  ruleForm: any = {
    Code: '',
    CustomerView: {},
    DetailList: [{
        Qty: 0,
        Remark: ''
    }],
    DeliveryInfo: '',
    DeliverySchedule: '',
    DeliveryType: '',
    ShipCondition: '',
    ShipMark: '',
    IsActive: false,
    SiteLetterList: [],
    CaseView: {},
    CreateDate: '',
    Total: 0
  };

  get rules () {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ]
    };
  }
  get id() {
    return this.$route.params.id;
  }
    get type() {
        return this.$route.params.type;
    }
  async GetInvoiceOrder () {
      this.$Api.enquiry.GetInvoiceOrder(this.id).then(result => {
          console.log(result, 'resultresult');
          this.OrderId = result.Id;
          this.ruleForm = result;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.Details;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
      });
  }
  async GetPtxOrderMessage () {
      this.$Api.enquiry.GetPtxOrderMessage(this.id).then(result => {
          console.log(result, 'resultresult');
          this.OrderId = result.Id;
          this.ruleForm = result;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.Details;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
          this.so_id = result.so_id;
      });
  }
 goPrint() {
    if (this.type === '0') {
        this.$router.push('/account/InviceInfoPrinting/' + this.ruleForm.Id + '/' + this.type);
    } else {
        this.$router.push('/account/InviceInfoPrinting/' + this.id + '/' + this.type);
    }
  }
  GoBack () {
      this.$router.push('/account/ptxorder');
  }
  mounted() {
    if (this.type === '0') {
     this.GetInvoiceOrder();
    } else {
     this.GetPtxOrderMessage();
    }
  }
}
</script>
<style scoped lang='less'>
/deep/ .el-form {
    width: 100%;
    .el-form-item {
        width: 100%;
        margin-bottom: 0px;
        .el-form-item__content {
            margin-left: 0px!important;
        }
    }
    .el-input.is-disabled .el-input__inner {
        background-color: #fff!important;
        border-color:#fff!important;
        color: #333!important;
        font-size: 16px;
    }
}
.warper .BottomTable {
    padding-top: 22px;
    padding-bottom: 22px;
}
.warper .BottomTable ul li {
    border-bottom: 0px!important;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items:center;
}
.colorStyle {
    background: #ddd!important;
    color: #333!important;
}
.NegotiationBoxTitle {
  width: 95%;
  margin: 0 auto;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.SiteLetterList {
  border: 1px solid #eee;
  padding: 10px;
  height: 180px;
  overflow-y: auto;
  width: calc(95% - 22px);
  margin: 0 auto;
  margin-bottom: 20px;
  border-radius: 5px;
  li{
    border-bottom: 0px!important;
    border-top: 0px!important;
  }
}
.NormalInput {
    width: 100px;
    /deep/ .el-input {
        width: 100px;
    }
}
.Recipient,.NoramlLi {
    .w15{
        width: 15%!important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .w58 {
        width: 58%!important;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
    .w20{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }
}
.BottomTable {
    .w15 {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 45%!important;
        line-height: initial;
        padding-top: 0px!important;
        padding-bottom: 0px!important;
    }
    .w83 {
        width: 53%!important;
        padding-top: 0px!important;
        padding-bottom: 0px!important;
    }
}
.xsmessage {
    /deep/ .el-input {
        width: 75%;
        margin-right: 2%;
    }
    /deep/ .el-button {
        width: 20%;
        span{
            font-size: 1.2rem;
        }
    }
}
.TotalSunm {
    p{
        margin-bottom: 5px;
    }
    span{
        &:nth-child(2n) {
            margin-right: 10px;
        }
    }
}
</style>
