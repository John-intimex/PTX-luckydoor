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
                <p class="HeadTitle"><span class="Request">{{$t('Enquiry.ProformaInvoice')}}: {{ruleForm.CustomerView.ClientCode }}</span><span class="status">{{$t('Enquiry.Status')}}:{{ruleForm.CaseView.CaseStatusName}}</span></p>
                <div class="TableA" style="padding-top:15px;">
                    <ul>
                        <li>
                            <span class="w15">{{$t('Enquiry.CaseNo')}}:</span>
                            <span class="w83">{{ruleForm.CaseView.CaseCode}}</span>
                        </li>
                        <li>
                            <span class="w15">{{$t('Enquiry.ProInvcode')}}:</span>
                            <span class="w83">{{ruleForm.Code}}</span>
                        </li>
                        <li>
                            <span class="w15">{{$t('Enquiry.Date')}}:</span>
                            <span class="w83">{{ruleForm.CreateDate }}</span>
                        </li>
                      <li>
                          <span class="w15">{{$t('Enquiry.YourRef')}}:</span>
                          <span class="w83">{{ruleForm.CustomerView.ClientCode }}</span>
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
                                <em class="text">{{(v.Qty) | PriceFormat}}</em>
                            </el-form-item>
                                     <el-form-item>
                                <em class="text">{{$t('Enquiry.SubTotal')}}:</em>
                                <em class="text">{{(v.TotalSum) | PriceFormat}}</em>
                            </el-form-item>
                        </span>
                    </li>
                </ul>
                <div class="TotalSunm">
                    <span>{{$t('Enquiry.AdditionalCharges')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.AdditionalFee) | PriceFormat}}</span>
                    <span>{{$t('Enquiry.Discount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Discount) | PriceFormat}}</span>
                    <span>{{$t('Enquiry.TransactionAmount')}}({{ruleForm.CurrencyCode}}):</span><span>{{(ruleForm.Total) | PriceFormat}}</span>
                </div>
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
        <a  @click="goPrint" id="printBtn" >{{$t('Enquiry.PrintFormat')}}</a>
        <a @click="GoUrl()" class="colorStyle">{{$t('Enquiry.ShipmentSchedule')}}</a>
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
export default class InsBuyOrderDetail extends Vue {
  isPreview:boolean =true;
  CreateDate:string='';
  DeliveryId:string='';
  CaseId:string='';
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
  async GetGoodOrder () {
      this.$Api.enquiry.GetGoodOrder(this.id).then(result => {
          this.ruleForm = result;
          this.CaseId = result.CaseId;
          this.DeliveryId = result.DeliveryId;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.DetailList;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
          this.ruleForm.Total = result.Total;
          var container = this.$el.querySelector('#new_message') as any;
          container.scrollTop = container.scrollHeight;
          this.ruleForm.SiteLetterList = result.SiteLetterList;
          this.$nextTick(() => {
            this.GoScroll();
          });
      });
  }
  async GetPtxOrderMessage () {
      this.$Api.enquiry.GetPtxOrderMessage(this.id).then(result => {
          this.ruleForm = result;
          this.CaseId = result.CaseId;
          this.DeliveryId = result.DeliveryId;
          this.ruleForm.CustomerView = result.CustomerView;
          this.ruleForm.DetailList = result.DetailList;
          this.ruleForm.CaseView = result.CaseView;
          this.ruleForm.CreateDate = result.CreateDate;
          this.ruleForm.Code = result.Code;
          this.ruleForm.Total = result.Total;
          this.so_id = result.so_id;
          var container = this.$el.querySelector('#new_message') as any;
          container.scrollTop = container.scrollHeight;
          this.ruleForm.SiteLetterList = result.SiteLetterList;
          this.$nextTick(() => {
            this.GoScroll();
          });
      });
  }
  GoUrl () {
      if (this.DeliveryId !== '') {
        this.$router.push('/account/DeliveryOrderDetail/' + this.DeliveryId);
      } else {
          this.$message.error(this.$t('Enquiry.NotShipped') as string);
      }
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
            this.MessageContent = '';
            this.GoScroll();
            this.ruleForm.SiteLetterList = result.ReturnValue;
          }
        });
     } else {
            this.$message({
                message: this.$t('Enquiry.MessageContent') as string,
                type: 'error',
                customClass: 'messagelayer'
            });
     }
  }
 goPrint() {
    if (this.type === '0') {
        this.$router.push('/account/BuyOrderPrinting/' + this.ruleForm.Id + '/' + this.type);
    } else {
        this.$router.push('/account/BuyOrderPrinting/' + this.id + '/' + this.type);
    }
  }
  GoBack () {
      this.$router.push('/account/ptxorder');
  }
  created() {
    if (this.type === '0') {
     this.GetGoodOrder();
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
.xsmessage {
    /deep/ .el-input {
        width: 88%;
        margin-right: 2%;
    }
    /deep/ .el-button {
        width: 10%;
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
.TotalSunm {
    span{
        &:nth-child(2n) {
            margin-right: 10px;
        }
    }
}
</style>
