<template>
  <div  class="MessageMain">
    <div class="TopMeun">
        <a class="perBtn" @click="goClick(0)" :class="{'bgcolor':ActiveIndex===0}"><img :src="ActiveIndex===0 ?'/images/pc/reciveBox_hover.png':'/images/pc/reciveBox.png'"><span>{{$t('Enquiry.DocumentInbox')}}</span></a>
        <a class="ReBtn" @click="goClick(1)"  :class="{'bgcolor':ActiveIndex===1}"><img :src="ActiveIndex===1 ?'/images/pc/sendBox_hover.png':'/images/pc/sendBox.png'"><span>{{$t('Enquiry.DocumentOutbox')}}</span></a>
    </div>
    <div class="ListData"  v-show="ActiveIndex===0">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.DocumentInbox')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.Document')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.Type')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
           <div v-if="ReceiverList.length>0">
              <ul class="Bottom" v-for="(v,index) in ReceiverList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li v-if="v.CaseType===1"><router-link :to="'/account/EnquiryDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===2"><router-link :to="'/account/QuotaDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===3"><router-link :to="'/account/BuyOrderDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===4"><router-link :to="'/account/InviceInfoDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===5"><router-link :to="'/account/DeliveryDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===6"><router-link :to="'/account/PackingDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CaseTypeName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
         <div class="pageMain"><inPage :currentPage = "currentPageA" v-model="currentPageA" :total="TotalRecordA" :pageNum="PageSizeA" styla="margin:0;" v-show="TotalRecordA>0"></inPage></div>
    </div>
    <div class="ListData"  v-show="ActiveIndex===1">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.DocumentOutbox')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.Document')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.Type')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="SenderList.length>0">
              <ul class="Bottom" v-for="(v,index) in SenderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li v-if="v.CaseType===1"><router-link :to="'/account/EnquiryDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===2"><router-link :to="'/account/QuotaDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===3"><router-link :to="'/account/BuyOrderDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===4"><router-link :to="'/account/InviceInfoDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===5"><router-link :to="'/account/DeliveryDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li v-if="v.CaseType===6"><router-link :to="'/account/PackingDetail/'+v.Id+'/1'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CaseTypeName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
         <div class="pageMain"><inPage :currentPage = "currentPageB" v-model="currentPageB" :total="TotalRecordB" :pageNum="PageSizeB" styla="margin:0;" v-show="TotalRecordB>0"></inPage></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component({
  components: {
    inPage: () => import('@/components/base/mobile/InsPage.vue')
  }
})
export default class InsNotification extends Vue {
  ActiveIndex:number =0;
  ReceiverList:any[]=[];
  SenderList:any[]=[];
  currentPageA:number=1;
  PageSizeA:number=10;
  TotalRecordA:number=0;
  currentPageB:number=1;
  PageSizeB:number=10;
  TotalRecordB:number=0;
  MemberId:string='';
  goClick (val) {
    this.ActiveIndex = val;
    if (val === 0) {
      this.currentPageB = 1;
      this.getReceiver();
    } else {
      this.currentPageA = 1;
      this.getSender();
    }
  }
   getReceiver() {
     var _this = this;
     sdk.api.member.getProfile().then(
      function (data) {
        _this.MemberId = data.MemberId;
        var params = {
          ReceiverId: _this.MemberId,
          PageInfo: {
            Page: _this.currentPageA,
            PageSize: _this.PageSizeA,
            SortName: 'CreateDate',
            SortOrder: 'desc'
          }
        };
        _this.$Api.enquiry.SearchOrderMessageList(params).then(result => {
          _this.ReceiverList = result.rows;
           _this.TotalRecordA = result.total;
           console.log(_this.TotalRecordA, '_this.TotalRecord');
        });
      }
     );
  }
   getSender() {
     var _this = this;
     sdk.api.member.getProfile().then(
      function (data) {
        _this.MemberId = data.MemberId;
          var params = {
            SenderId: _this.MemberId,
            PageInfo: {
              Page: _this.currentPageB,
              PageSize: _this.PageSizeB,
              SortName: 'CreateDate',
              SortOrder: 'desc'
            }
          };
          _this.$Api.enquiry.SearchOrderMessageList(params).then(result => {
            _this.SenderList = result.rows;
           _this.TotalRecordB = result.total;
          });
      }
     );
  }
  created() {
   this.getReceiver();
   this.getSender();
  }
  @Watch('currentPageA')
  onPageAChange (o, n) {
   this.getReceiver();
  }
  @Watch('currentPageB')
  onPageBChange (o, n) {
   this.getReceiver();
  }
}
</script>
<style lang="less" scoped>
.MessageMain {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 50px;
  .TopMeun {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 50px;
    .bgcolor {
       background: @base_color!important;
       span{
         color: #fff!important;
       }
    }
    a{
      border-radius: 5px;
      width: 45%;
      cursor: pointer;
      text-align: center;
      background: #fff;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .perBtn {
      border: 1px solid #666666;
      span{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        margin-top: 10px;
        font-size: 18px;
      }
    }
    .ReBtn {
      border: 1px solid #666666;
      span{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666666;
        margin-top: 10px;
        font-size: 18px;
      }
    }
  }
  .ListData {
    width: calc(100% - 20px);
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
    overflow: hidden;
    padding: 10px;
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
      background: #666666;
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
          width: 200px;
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
          width: 200px;
        }
      }
    }
  }
}
</style>
