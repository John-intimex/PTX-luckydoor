<template>
  <div class="ptxOrder">
    <div class="pageName"><span>{{$t('Enquiry.Search')}}</span><a @click="goEq()" class="GetEnquiry">{{$t('Enquiry.CurrentEnquiry')}}</a></div>
    <div class="SearchBar">
        <div class="P1">
          <label>{{$t('Enquiry.SearchType')}}</label>
          <select v-model="SearchTypeId" @change="GoSelect(SearchTypeId)">
            <option v-for="(v,index) in SearchType" :key="index" :value="v.Id">{{v.Text}}</option>
          </select>
        </div>
         <div class="P2" v-if="SearchTypeId==='1'">
          <label>{{$t('Enquiry.CaseType')}}</label>
          <select v-model="EnqTypeId" @change="selectName(EnqTypeId)">
            <option v-for="(v,index) in EnqType" :key="index" :value="v.Id" >{{v.Text}}</option>
          </select>
        </div>
        <div class="P3">
          <label>{{$t('Enquiry.CaseStatus')}}</label>
          <select v-model="CaseStatusId" @change="slectCaseStatus()">
            <option v-for="(v,index) in CaseStatus" :key="index" :value="v.Id">{{v.Text}}</option>
          </select>
        </div>
         <div class="P4">
          <label>{{$t('Enquiry.Code')}}</label>
          <input v-model="Code" class="inputCode"/>
        </div>
        <div class="P5">
          <a class="SearBtn" @click="goSearch()">{{$t('Enquiry.Search')}}</a>
        </div>
    </div>
    <!--  -->
    <div v-if="SearchTypeId==='1'">
    <!-- 询价单 -->
    <div class="ListData" v-if="EnqTypeId==='1'">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.Enquiry')}}{{$t('Enquiry.List')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.Enquiry')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="OrderList.length>0">
              <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li><router-link :to="'/account/EnquiryDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CaseStatusName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
    </div>
    <!-- 报价单 -->
    <div class="ListData" v-if="EnqTypeId==='2'">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.Quota')}}{{$t('Enquiry.List')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.Quota')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.Type')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="OrderList.length>0">
              <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li><router-link :to="'/account/QuotaDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.OrderTypeName}}</li>
                <li>{{v.CaseStatusName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
    </div>
    <!-- 订货单 -->
    <div class="ListData" v-if="EnqTypeId==='3'">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.BuyOrder')}}{{$t('Enquiry.List')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.BuyOrder')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.DeliveryDate')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="OrderList.length>0">
              <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li><router-link :to="'/account/BuyOrderDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CreateDate}}</li>
                <li>{{v.CaseStatusName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
             <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
    </div>
    <!-- 发票 -->
    <div class="ListData" v-if="EnqTypeId==='4'">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.InviceInfo')}}{{$t('Enquiry.List')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.InviceInfo')}} #</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.DeliveryDate')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="OrderList.length>0">
              <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li><router-link :to="'/account/InviceInfoDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CreateDate}}</li>
                <li>{{v.CaseStatusName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
    </div>
    <!-- 发货单 -->
    <div class="ListData" v-if="EnqTypeId==='5'">
        <div class="HeadTitle">
            <p class="NameTitle">{{$t('Enquiry.Delivery')}}{{$t('Enquiry.List')}}</p>
            <p class="Page"></p>
        </div>
        <div class="List">
            <ul class="Top">
                <li>{{$t('Enquiry.Case')}} #</li>
                <li>{{$t('Enquiry.BuyOrder')}} #</li>
                <li>{{$t('Enquiry.ShipmentSchedule')}}#</li>
                <li>{{$t('Enquiry.Subject')}}</li>
                <li>{{$t('Enquiry.Status')}}</li>
                <li>{{$t('Enquiry.Date')}}</li>
            </ul>
            <div v-if="OrderList.length>0">
              <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                <li><router-link :to="'/account/BuyOrderDetail/'+v.GoodOrderId+'/0'">{{v.OrderCode}}</router-link></li>
                <li><router-link :to="'/account/DeliveryOrderDetail/'+v.Id">{{v.DeliveryCode}}</router-link></li>
                <li>{{v.Subject}}</li>
                <li>{{v.CaseStatusName}}</li>
                <li>{{v.CreateDate}}</li>
              </ul>
            </div>
            <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
        </div>
    </div>
      <!-- 装箱单 -->
      <div class="ListData" v-if="EnqTypeId==='6'">
          <div class="HeadTitle">
              <p class="NameTitle">{{$t('Enquiry.Packing')}}{{$t('Enquiry.List')}}</p>
              <p class="Page"></p>
          </div>
          <div class="List">
              <ul class="Top">
                  <li>{{$t('Enquiry.Case')}} #</li>
                  <li>{{$t('Enquiry.Packing')}} #</li>
                  <li>{{$t('Enquiry.Subject')}}</li>
                  <li>{{$t('Enquiry.DeliveryDate')}}</li>
                  <li>{{$t('Enquiry.Status')}}</li>
                  <li>{{$t('Enquiry.Date')}}</li>
              </ul>
              <div v-if="OrderList.length>0">
                <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                  <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                  <li><router-link :to="'/account/PackingDetail/'+v.Id+'/0'">{{v.OrderCode}}</router-link></li>
                  <li>{{v.Subject}}</li>
                  <li>{{v.DeliveryDate}}</li>
                  <li>{{v.CaseStatusName}}</li>
                  <li>{{v.CreateDate}}</li>
                </ul>
              </div>
              <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
          </div>
      </div>
    </div>
    <div v-else>
      <div class="ListData">
          <div class="HeadTitle">
              <p class="NameTitle">{{$t('Enquiry.List')}}</p>
              <p class="Page"></p>
          </div>
          <div class="List">
              <ul class="Top">
                  <li>{{$t('Enquiry.Case')}} #</li>
                  <li>{{$t('Enquiry.Subject')}}</li>
                  <li>{{$t('Enquiry.Status')}}</li>
                  <li>{{$t('Enquiry.Date')}}</li>
              </ul>
              <div v-if="OrderList.length>0">
                <ul class="Bottom" v-for="(v,index) in OrderList" :key="index">
                  <li><router-link :to="'/account/CaseList/'+v.CaseId">{{v.CaseCode}}</router-link></li>
                  <li>{{v.Subject}}</li>
                  <li>{{v.CaseStatusName}}</li>
                  <li>{{v.CreateDate}}</li>
                </ul>
              </div>
              <div class="NoContent" v-else>{{$t('messageTips.NoContent')}}</div>
          </div>
      </div>
    </div>
    <div class="pageMain"><inPage :currentPage = "currentPage" v-model="currentPage" :total="TotalRecord" :pageNum="PageSize" styla="margin:0;" v-show="TotalRecord>0"></inPage></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    inPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsNotification extends Vue {
  SearchTypeId:string='1';
  SearchType:any[]=[];
  EnqType:any[]=[];
  EnqTypeId:string='1';
  CaseStatus:any[]=[];
  CaseStatusId:number=0;
  OrderList:any[]=[];
  Code:string='';
  CatName:string=this.$t('Enquiry.Enquiry') as string;
  currentPage:number=1;
  PageSize:number=10;
  TotalRecord:number=0;
  EqId:number=0;
  GetEnqSearchType() {
    this.$Api.enquiry.GetEnqSearchType().then(result => {
      this.SearchType = result.data;
    });
  }
  selectName (val) {
   this.EnqTypeId = val;
   this.currentPage = 1;
   this.MyEnqOrder();
  }
  GetEnqType(SearchType) {
    this.$Api.enquiry.GetEnqType(SearchType).then(result => {
      this.EnqType = result.data;
    });
  }
   GetCaseStatus() {
    this.$Api.enquiry.GetCaseStatus().then(result => {
      this.CaseStatus = result.data;
    });
  }
  MyEnqOrder() {
    var params = {
    CaseType: this.EnqTypeId,
    CaseStatus: this.CaseStatusId,
    SearchType: this.SearchTypeId,
    Code: this.Code,
    PageInfo: {
      Page: this.currentPage,
      PageSize: this.PageSize,
      SortName: 'CreateDate',
      SortOrder: 'desc'
    }
    };
    console.log(params, 'paramsparamsparamsparamsparamsparams');
    this.$Api.enquiry.MyEnqOrder(params).then(result => {
      this.OrderList = result.data.rows;
      this.TotalRecord = result.data.total;
    });
  }
    GetMyEditingEnquiry () {
      this.$Api.enquiry.GetMyEditingEnquiry().then(result => {
          this.EqId = result.Id;
      });
  }
  goEq () {
      this.$router.push('/account/GetEnquiry');
  }
  goSearch () {
    this.currentPage = 1;
    this.MyEnqOrder();
  }
  slectCaseStatus() {
    this.currentPage = 1;
    this.MyEnqOrder();
  }
  GoSelect (val) {
    this.GetEnqType(val);
    this.MyEnqOrder();
  }
  mounted() {
    this.GetEnqSearchType();
    this.GetEnqType(1);
    this.GetCaseStatus();
    this.MyEnqOrder();
    this.GetMyEditingEnquiry();
  }
  @Watch('currentPage')
  onPageChange (o, n) {
    this.MyEnqOrder();
  }
}
</script>
<style lang="less" scoped>
.ptxOrder {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
  margin-top: 20px;
  min-height: 600px;
  .pageName {
    width: 100%;
    height: 35px;
    display:flex;
    flex-wrap: wrap;
    font-size: 20px;
    color: #666;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 20px;
      color: #666;
      display: flex;
      align-items: center;
      &::before{
        content: '';
        width: 3px;
        height: 20px;
        background: #333;
        margin-right: 5px;
      }
    }
    a{
      font-size: 16px;
      color: #666;
      display: flex;
      align-items: center;
      text-decoration: underline;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        color: #7f8dba;
      }
    }
  }
  .SearchBar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    select{
      width: 120px;
      height: 35px;
      border: 1px solid #cccccc;
      outline: 0;
      border-radius: 5px;
      cursor: pointer;
      padding-left: 10px;
    }
    .inputCode {
      width: 120px;
      height: 35px;
      border: 1px solid #cccccc;
      outline: 0;
      border-radius: 5px;
      cursor: pointer;
      padding-left: 10px;
    }
    label {
      margin-right: 5px;
      font-size: 14px;
    }
    .P1{
      width: 23.33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .P2{
      width: 23.33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .P3{
      width: 23.33%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .P4{
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .P5{
      width: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      .SearBtn {
        background: @base_color;
        color: #fff;
        font-size: 18px;
        border-radius: 5px;
        cursor: pointer;
        width: 100%;
        height: 35px;
        text-align: center;
        line-height: 35px;
        &:hover{
          background: #333;
        }
      }
    }
  }
  .ListData {
    width: 1160px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    background: #fff;
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
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      li{
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        padding-top: 10px;
        padding-bottom: 10px;
        &:nth-child(1){
          width: 16%;
        }
        &:nth-child(2){
          width: 16%;
        }
        &:nth-child(3){
          width: 16%;
        }
        &:nth-child(4){
          width: 16%;
        }
        &:nth-child(5){
          width: 16%;
        }
        &:nth-child(6){
          width: 20%;
        }
      }
    }
    .Bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
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
          width: 16%;
        }
        &:nth-child(2){
          width: 16%;
        }
        &:nth-child(3){
          width: 16%;
        }
        &:nth-child(4){
          width: 16%;
        }
        &:nth-child(5){
          width: 16%;
        }
        &:nth-child(6){
          width: 20%;
        }
      }
    }
  }
}
.pageMain {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
</style>
