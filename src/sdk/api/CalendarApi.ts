import { WSAPI } from './WSApi';
import Proxy from '@/sdk/common/Proxy';
export class CalendarApi extends WSAPI {
  // 获取单个活动信息
  GetById (params) {
    return this.instance.post(
      this.apiPath + '/CalenderEvent/GetById',
      params
    ).then((result) => {
      return result.data;
    });
  }

  // 获取某个时间段活动信息
  GetListByCond (params) {
    return this.instance.post(
      this.apiPath + '/CalenderEvent/GetListByCond',
      params
    ).then((result) => {
      return result.data;
    });
  }
  private static instance: CalendarApi;
  //* * 单例 */
  public static getInstance (): CalendarApi {
    if (CalendarApi.instance) { return CalendarApi.instance; } else {
      CalendarApi.instance = new CalendarApi();
      return CalendarApi.instance;
    }
  }
}
