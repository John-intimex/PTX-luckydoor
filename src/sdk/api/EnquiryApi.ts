import { WSAPI } from './WSApi';
import Proxy from '@/sdk/common/Proxy';
export class EnquiryApi extends WSAPI {
  // 獲取查詢類型 GET /V2/Enquiry/GetEnqSearchType
  GetEnqSearchType (callback: any) {
    return this.instance.get(this.apiPath + '/Enquiry/GetEnqSearchType').then((result) => {
      return result;
    });
  };
  // 獲取訂單類型  GET /V2/Enquiry/GetEnqType  1為文件編號，2為產品編號
  GetEnqType (SearchType: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetEnqType', { params: { SearchType: SearchType } }).then((result) => {
      return result;
    });
  };
  // 獲取個案狀態 /V2/Enquiry/GetCaseStatus
  GetCaseStatus (callback: any) {
    return this.instance.get(this.apiPath + '/Enquiry/GetCaseStatus').then((result) => {
      return result;
    });
  };

  // 我的訂單 /V2/Enquiry/MyEnqOrder
  // {
  //   "CaseType": 1,
  //   "CaseStatus": 1,
  //   "Code": "string",
  //   "PageInfo": {
  //     "Page": 0,
  //     "PageSize": 0,
  //     "Offset": 0,
  //     "SortName": "string",
  //     "SortOrder": "string"
  //   }
  // }
  MyEnqOrder(cond: any) {
      return this.instance.post(this.apiPath + '/Enquiry/MyEnqOrder', cond).then((result) => {
        return result;
      });
    };

  // 获取询价单、报价单、订货单详情 /V2/Enquiry/GetGoodOrder/{Id}
  GetGoodOrder(Id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetGoodOrder', { params: { Id: Id } }).then((result) => {
      return result.data;
    });
  };

  // 获取装箱单详情 /V2/Enquiry/GetBoxingOrder/{Id}
  GetBoxingOrder(Id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetBoxingOrder', { params: { Id: Id } }).then((result) => {
      return result.data;
    });
  };

  // 获取发票详情 /V2/Enquiry/GetInvoiceOrder/{Id}
  GetInvoiceOrder(Id: string, callback: Function) {
      return this.instance.get(this.apiPath + '/Enquiry/GetInvoiceOrder', { params: { Id: Id } }).then((result) => {
        return result.data;
      });
    };
  // 获取发货单详情 /V2/Enquiry/GetDeliveryOrder/{Id}
  GetDeliveryOrder(Id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetDeliveryOrder', { params: { Id: Id } }).then((result) => {
      return result.data;
    });
  };
  // 獲取询价详情 /V2/Enquiry/GetMyEditingEnquiry
  GetMyEditingEnquiry (callback: any) {
    return this.instance.get(this.apiPath + '/Enquiry/GetMyEditingEnquiry').then((result) => {
      return result.data;
    });
  };

  // 查看發貨明細 /V2/Enquiry/GetDeliveryOrderDetail/{Id}
  GetDeliveryOrderDetail(Id: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetDeliveryOrderDetail', { params: { Id: Id } }).then((result) => {
      return result.data;
    });
  };
  // 加入詢價清單 /V2/Enquiry/AddProdToMyEnquiry
  // {
  //   "Sku": "string",
  //   "Attr1": 0,
  //   "Attr2": 0,
  //   "Attr3": 0,
  //   "MemberId": "string",
  //   "Qty": 0,
  //   "IsDetailPage": true
  // }
  AddProdToMyEnquiry (cond: any) {
    return this.instance.post(this.apiPath + '/Enquiry/AddProdToMyEnquiry', cond).then((result) => {
      return result;
    });
  };

  // 保存詢價單 /V2/Enquiry/SaveMyEnquiry 储存初稿(isActive=false)和确认送出(isActive=true)都系call这个
  SaveMyEnquiry (cond: any) {
    return this.instance.post(this.apiPath + '/Enquiry/SaveMyEnquiry', cond).then((result) => {
      return result.data;
    });
  };

  // 发送留言信息 /V2/Enquiry/CreateSiteLetter
  // OrderId ,Content,IsBuyer,IsBuyer=false
  CreateSiteLetter (cond: any) {
    return this.instance.post(this.apiPath + '/Enquiry/CreateSiteLetter', cond).then((result) => {
      return result.data;
    });
  };

  // 获取留言信息 /V2/Enquiry/GetOrderSiteLetter
  GetOrderSiteLetter(caseId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/GetOrderSiteLetter', { params: { caseId: caseId } }).then((result) => {
      return result.data;
    });
  };

  // 删除指定产品  /V2/Enquiry/DelOrderDetails
  // {
  //   "OrderId": 0,
  //   "Ids": [
  //     "00000000-0000-0000-0000-000000000000"
  //   ]
  // }
  DelOrderDetails (cond: any) {
    return this.instance.post(this.apiPath + '/Enquiry/DelOrderDetails', cond).then((result) => {
      return result.data;
    });
  };

   // 獲取個案詳情 /V2/Enquiry/CaseDetailInfo
   CaseDetailInfo(CaseId: string, callback: Function) {
    return this.instance.get(this.apiPath + '/Enquiry/CaseDetailInfo', { params: { CaseId: CaseId } }).then((result) => {
      return result.data;
    });
  };

  // 收件夾，寄件夾列表 /V2/Enquiry/SearchOrderMessageList
  // {
  //   "CreateDateFrom": "string",
  //   "CreateDateTo": "string",
  //   "ReceiverId": "string",
  //   "SenderId": "string",
  //   "PageInfo": {
  //     "Page": 0,
  //     "PageSize": 0,
  //     "Offset": 0,
  //     "SortName": "string",
  //     "SortOrder": "string"
  //   }
  // }
  SearchOrderMessageList (cond: any) {
    return this.instance.post(this.apiPath + '/Enquiry/SearchOrderMessageList', cond).then((result) => {
      return result.data;
    });
  };

  // 收件夾，寄件夾明細 V2/Enquiry/GetPtxOrderMessage/{Id}
  GetPtxOrderMessage(Id: string, callback: Function) {
      return this.instance.get(this.apiPath + '/Enquiry/GetPtxOrderMessage', { params: { Id: Id } }).then((result) => {
        return result.data.ReturnValue;
      });
    };
  // 獲取商家信息數據 /SEO/GetStoreData
  // {
  // "Lang": "string"
  // }
    GetStoreData(cond: any) {
      return this.instance.post(this.apiPath + '/SEO/GetStoreData', cond).then((result) => {
        return result.data.ReturnValue;
      });
    };
  private static instance: EnquiryApi;
  //* * 单例 */
  public static getInstance (): EnquiryApi {
    if (EnquiryApi.instance) { return EnquiryApi.instance; } else {
      EnquiryApi.instance = new EnquiryApi();
      return EnquiryApi.instance;
    }
  }
}
