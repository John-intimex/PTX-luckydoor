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
    <div class="Inner">
        <div class="left">
                <p class="HeadTitle"><span class="Request">{{$t('Enquiry.Delivery')}}: {{ruleForm.CaseView.CustomerCode }}</span><span class="status">{{$t('Enquiry.Status')}}:{{ruleForm.CaseView.CaseStatus}}</span></p>
                <div class="TableA" style="padding-top:15px;">
                    <ul>
                        <li>
                            <span class="w15">{{$t('Enquiry.CaseNo')}}:</span>
                            <span class="w83">{{ruleForm.CaseView.CaseCode}}</span>
                        </li>
                        <li>
                            <span class="w15">{{$t('Enquiry.ProInvcode')}}:</span>
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
                <div class="TableA">
                    <ul>
                         <el-form-item>
                            <li>
                                <p>{{$t('Enquiry.ShippingInformation')}}:</p>
                                <p> <el-input v-model="ruleForm.DeliveryInfo" :disabled="isPreview"></el-input></p>
                            </li>
                    </el-form-item>
                    </ul>
                </div>
                 <div class="TableA Recipient">
                    <div class="BgTitle">
                        <p class="InnerTitle">{{$t('Enquiry.OrderStatusBox')}}</p>
                    </div>
                    <ul>
                        <el-form-item class="xsmessage">
                            <li>
                                <p>{{$t('Enquiry.leavemessage')}}</p>
                                <p><el-input v-model="MessageContent" width="90%"></el-input><el-button @click="SendMessage()">{{$t('Enquiry.Send')}}</el-button></p>
                            </li>
                    </el-form-item>
                    </ul>
                    <h2 class="NegotiationBoxTitle">{{$t('Enquiry.OrderStatusHistory')}}</h2>
                    <div class="SiteLetterList" id="new_message">
                      <ul>
                          <li v-for="(v,index) in ruleForm.SiteLetterList" :key="index" :class="{'rightSide':v.IsBuyer}" class="perLetterList">
                            <p class="datetime">{{v.FromName}},{{v.CreateDate}}</p>
                            <p class="content"><span class="InnerText">{{v.Content}}</span></p>
                          </li>
                        </ul>
                    </div>
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
                                <em class="text">{{v.Code}}</em>
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
                <div class="TotalSunm"><span>{{$t('Enquiry.Total')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.TotalAmount) | PriceFormat}}</span></div>
                <!-- <div class="TotalText">總共 (RMB): 1000.00</div> -->
            </div>
                <div class="TableA BottomTable">
                    <ul>
                        <!-- <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.DeliveryLeadTime')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.DeliverySchedule" :disabled="isPreview"></el-input> </span>
                        </li>
                        </el-form-item> -->
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
                         <!-- <el-form-item>
                        <li>
                            <span class="w15">付款方式:</span>
                            <span class="w83"><el-input  :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item> -->
                         <el-form-item>
                        <li>
                            <span class="w15">{{$t('Enquiry.Remarks')}}:</span>
                            <span class="w83"><el-input v-model="ruleForm.Remark" :disabled="isPreview"></el-input></span>
                        </li>
                         </el-form-item>
                    </ul>
                </div>
            <div class="BottomMeun">
                <a @click="GoUrl()" class="colorStyle">{{$t('Enquiry.ShipmentSchedule')}}</a>
            </div>
        </div>
    </div>
     </el-form>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
import printJS from 'print-js';
@Component
export default class InsDeliveryDetail extends Vue {
  isPreview:boolean =true;
  CreateDate:string='';
  OrderId:string='';
  CaseId:string='';
  MessageContent:string='';
  so_id:string='0';
  DeliveryId:string='';
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
  async GetDeliveryOrder () {
      this.$Api.enquiry.GetDeliveryOrder(this.id).then(result => {
          this.ruleForm = result;
          this.OrderId = result.Id;
          this.DeliveryId = result.DeliveryId;
          this.CaseId = result.CaseView.CaseId;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.Details;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
          this.ruleForm.Total = result.Total;
          this.GetOrderSiteLetter(result.CaseView.CaseId);
      });
  }
  async GetPtxOrderMessage () {
      this.$Api.enquiry.GetPtxOrderMessage(this.id).then(result => {
          this.ruleForm = result;
          this.OrderId = result.Id;
          this.DeliveryId = result.DeliveryId;
          this.CaseId = result.CaseView.CaseId;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.Details;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
          this.ruleForm.Total = result.Total;
          this.so_id = result.so_id;
          this.GetOrderSiteLetter(result.CaseView.CaseId);
      });
  }
  GoUrl () {
      if (this.DeliveryId !== '') {
         this.$router.push('/account/DeliveryOrderDetail/' + this.DeliveryId);
      } else {
          this.$message.error(this.$t('Enquiry.NotShipped') as string);
      }
  }
   goPrint() {
    if (this.type === '0') {
        this.$router.push('/account/DeliveryPrinting/' + this.ruleForm.Id + '/' + this.type);
    } else {
        this.$router.push('/account/DeliveryPrinting/' + this.id + '/' + this.type);
    }
  }
  GetOrderSiteLetter (val) {
        this.$Api.enquiry.GetOrderSiteLetter(val).then(result => {
            this.ruleForm.SiteLetterList = result;
            this.$nextTick(() => {
                this.GoScroll();
            });
        });
  }
    // 聊天窗口消息内容滚动到最后
    GoScroll() {
        var obj = this.ruleForm.SiteLetterList;
        var objHeight = $('.SiteLetterList').find('.perLetterList').height() as any;
        var objNum;
        var TotalHeight = 0;
        console.log(objHeight, 'objHeight');
        $.each(obj, function(i, j) {
            objNum = i;
            console.log(i, j);
        });
        TotalHeight = objNum * objHeight;
        $(document).find('.SiteLetterList').animate({ scrollTop: $('.SiteLetterList').find('ul').height() }, 500);
    }
  SendMessage () {
     if (this.MessageContent !== '') {
        var params = {
          OrderId: this.CaseId,
          Content: this.MessageContent,
          IsBuyer: true
        };
        this.$Api.enquiry.CreateSiteLetter(params).then(result => {
          if (result.Succeeded) {
            this.GetOrderSiteLetter(this.CaseId);
            this.MessageContent = '';
            this.GoScroll();
            this.ruleForm.SiteLetterList = result.ReturnValue;
          }
        });
     } else {
       this.$message.error(this.$t('Enquiry.MessageContent') as string);
     }
  }
  PrintFormat () {
      printJS('printArea', 'html');
      printJS({
        printable: 'printArea',
        type: 'html',
        css: '/static/css/print.css',
        documentTitle: this.$t('Enquiry.EnquiryTitle') as string,
        ignoreElements: ['no-print', 'printBtn'],
        scanStyles: false
      });
  }
  GoBack () {
      this.$router.push('/account/ptxorder');
  }
  created() {
    if (this.type === '0') {
     this.GetDeliveryOrder();
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
.InnerText {
    padding: 10px 20px;
    display: inline-block;
    border-radius: 10px;
    background: #eee;
    color: #333;
}
.rightSide {
    text-align: right;
        .InnerText {
        background: #7f8dba!important;
        color: #fff!important;
    }
}
.content {
    margin-top: 10px;
}
.datetime {
    color: #ccc;
    font-size: 14px;
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
</style>
