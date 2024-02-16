<template>
<div class="warper NomralBg">
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
                <p class="HeadTitle">
                    <span class="Request" v-if="ruleForm.CaseCode">{{$t('Enquiry.EnquiryTitle')}}: {{ruleForm.CaseCode}}</span>
                    <span class="Request" v-else>{{$t('Enquiry.EnquiryTitle')}}: Request</span>
                </p>
                <div class="TableA" style="padding-top:15px;">
                    <ul>
                        <li>
                            <span class="w15">{{$t('Enquiry.Date')}}:</span>
                            <span class="w83">{{ruleForm.CreateDate}}</span>
                        </li>
                        <el-form-item>
                            <li>
                                <span class="w15">{{$t('Enquiry.YourRef')}}:</span>
                                <span class="w83"> <el-input v-model="ruleForm.CustomerView.ClientCode" disabled></el-input></span>
                            </li>
                        </el-form-item>
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
                        <p class="InnerTitle">{{$t('Enquiry.NegotiationBox')}}</p>
                    </div>
                    <ul>
                        <el-form-item class="xsmessage">
                            <li>
                                <p>{{$t('Enquiry.leavemessage')}}</p>
                                <p><el-input v-model="MessageContent" width="90%" :disabled="isPreview"></el-input><el-button @click="clear()" :disabled="isPreview">{{$t('Enquiry.Clear')}}</el-button></p>
                            </li>
                    </el-form-item>
                    </ul>
                </div>
        </div>
        <div class="right">
            <p class="HeadTitle"><span class="Request">{{$t('Enquiry.DraftEnquiry')}}</span></p>
            <div class="TableA Recipient">
                <div class="BgTitle">
                    <p class="w5">
                    <input type="checkbox"
                    v-model="isAll"
                    @click="checkAll($event)"></p>
                    <p class="w15" style="color:#fff">{{$t('Enquiry.Image')}}</p>
                    <p class="w58">{{$t('Enquiry.ProductInformation')}}</p>
                    <p class="w20">{{$t('Enquiry.Quantity')}}</p>
                </div>
                <ul>
                    <li class="NoramlLi" v-for="(v,index) in ruleForm.DetailList" :key="index">
                        <span class="w5">
                              <el-checkbox-group v-model="SelectId" @change="selectAttr(v.Id)">
                                <el-checkbox :label="v.Id"><br></el-checkbox>
                            </el-checkbox-group>
                        </span>
                        <span class="w15"><img :src="v.Image"></span>
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
                                <em class="text">{{$t('Enquiry.Quantity')}}:</em>
                                <em class="text"><el-input-number v-model="v.Qty" :min="v.negotiateMinQty"  label="" :disabled="isPreview" size="small"></el-input-number></em>
                            </el-form-item>
                        </span>
                    </li>
                </ul>
                <p class="DelectBtn"><span @click="DelOrderDetails()">{{$t('Enquiry.Delete')}}</span><span @click="AddProduct()">{{$t('Enquiry.AddProduct')}}</span></p>
            </div>
                <div class="TableA BottomTable">
                    <ul>
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
                            <span class="w83">
                            <el-select v-model="ruleForm.PayType" :disabled="isPreview">
                                <el-option v-for="(pay, index) in payments" :key="index" :value="pay.Id" :label="pay.Desc"></el-option>
                            </el-select>
                            </span>
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
            <div class="BottomMeun" v-if="!isPreview">
                <a @click="SaveDaft()">{{$t('Enquiry.SaveDraft')}}</a>
                <a @click="Preview()">{{$t('Enquiry.PreviewBeforeSending')}}</a>
            </div>
            <div class="BottomMeun" v-else>
                <a @click="SaveComfirm()">{{$t('Enquiry.ConfirmandSend')}}</a>
                <a @click="GoBack()" class="colorStyle">{{$t('Enquiry.Back')}}</a>
            </div>
        </div>
    </div>
     </el-form>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Express from '@/model/express';
import PaymentM from '@/model/payment';
@Component
export default class InsAddEnquiry extends Vue {
  private payments:PaymentM[] = [new PaymentM()];
  private payment: PaymentM = new PaymentM();
  isPreview:boolean =false;
  CreateDate:string='';
  OrderId:string='';
  CaseId:string='';
  MessageContent:string='';
  SelectId:any[]=[];
  isAll: boolean = false; // 是否全选
  ruleForm: any = {
    Id: '',
    OrderType: 0,
    CustomerView: {},
    CaseView: {},
    DetailList: [{
        Qty: 0,
        Remark: ''
    }],
    DeliveryInfo: '',
    DeliverySchedule: '',
    DeliveryType: '',
    ShipCondition: '',
    Remark: '',
    IsActive: false,
    SiteLetterList: '',
    PayType: -1
  };
  Preview () {
      this.isPreview = true;
  }
  GoBack () {
      this.isPreview = false;
  }
  //  全选
 checkAll (e) {
      let a = e.target.checked;
      this.SelectId = [];
      if (e.target.checked) {
         this.ruleForm.DetailList.forEach(element => {
            this.SelectId.push(element.Id);
          });
      }
    }
  selectAttr (item) {
      setTimeout(() => {
          if (this.SelectId.length !== this.ruleForm.DetailList.length) {
            this.isAll = false;
          } else {
            this.isAll = true;
          }
      }, 1);
    }
  DelOrderDetails () {
      if (this.SelectId.length > 0) {
            var params = {
                OrderId: this.OrderId,
                Ids: this.SelectId
            };
            this.$Api.enquiry.DelOrderDetails(params).then(result => {
                if (result.Succeeded) {
                this.$message({
                    message: this.$t('Enquiry.SuccessfullyDeleted') as string,
                    type: 'success',
                    customClass: 'messagelayer'
                });
                this.GetMyEditingEnquiry();
                }
            });
      } else {
            this.$message({
                message: this.$t('Enquiry.Pleaseselect') as string,
                type: 'error',
                customClass: 'messagelayer'
            });
      }
  }
  AddProduct () {
      this.$router.push('/product/search/-');
  }
  SaveDaft () {
      this.$Api.enquiry.SaveMyEnquiry(this.ruleForm).then(result => {
            if (result.Succeeded) {
            this.$message({
                message: this.$t('Enquiry.Savedsuccessfully') as string,
                type: 'success',
                customClass: 'messagelayer'
            });
          }
      });
  }
  SaveComfirm () {
        console.log(this.ruleForm, 'this.ruleFormthis.ruleForm');
       this.ruleForm.IsActive = true;
       this.$Api.enquiry.SaveMyEnquiry(this.ruleForm).then(result => {
          if (result.Succeeded) {
            this.SendMessage();
            setTimeout(() => {
                this.$router.push('/account/EnquirySuccess');
            }, 500);
          }
      });
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
                console.log('dddddddddd0000000000000');
            }
            });
        }
  }
  clear () {
    this.MessageContent = '';
  }
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
  GetMyEditingEnquiry () {
      this.$Api.enquiry.GetMyEditingEnquiry().then(result => {
          this.ruleForm = result;
          this.OrderId = result.Id;
          this.CaseId = result.CaseId;
          console.log(result, 'ddddddddd');
      });
  }
  getpayments () {
     this.$Api.checkout.getPaymentMethod().then(result => {
        this.payments = result.Payment;
        console.log(result, 'resultresult');
      });
  }
  created() {
   this.GetMyEditingEnquiry();
   this.getpayments();
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
    .el-input-number--small {
       width: 100%;
    }
    .el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase {
        width: 20px;
    }
    .el-input-number--small .el-input__inner {
        padding-left: 20px;
        padding-right: 20px;
        width: 80px;
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
    align-items: center;
}
.colorStyle {
    background: #ddd!important;
    color: #333!important;
}
.Inner {
    margin-top: 30px;
    margin-bottom: 30px;
}
.DelectBtn {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    background: #7f8dba;
    margin-top: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    span{
      color: #333;
       margin-left: 2.5%;
       border: 1px solid #eee;
       display: inline-block;
       text-align: center;
       cursor: pointer;
       background: #fff;
       padding: 8px 20px;
       transition: all .3s;
       font-size: 1.2rem;
       &:hover {
           background: #333;
           color: #fff;
           border: 1px solid #333;
       }
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
        width: 20%!important;
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
