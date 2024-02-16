import { WSAPI } from './WSApi';
import Proxy from '@/sdk/common/Proxy';
export class IPAddress extends WSAPI {
  /**
   * 获取地区区分加载信息
   */
  GetAreaCodeByIP = (ip: string): Promise<any> => {
    let pms = new Promise<any>(async (resolve, reject) => {
      this.instance
        .post(this.apiPath + '/InboundRule/GetAreaCodeByIP', ip)
        .then(
          function (response) {
            if (response.data.Succeeded) {
              resolve(response.data.ReturnValue);
              console.log(response.data, '获取地区区分加载信息');
            } else {
              reject(new Error('获取地区区分加载信息失败!'));
            }
          },
          function () {
            reject(new Error('获取地区区分加载信息失败'));
            console.log('获取地区区分加载信息失败');
          }
        );
    });
    return pms;
  };

  GetIPAddressInfo = (IP: string): Promise<any> => {
    let pms = new Promise<any>(async (resolve, reject) => {
      this.instance
        .post(this.apiPath + '/IPAddress/GetIPAddressInfo', { IP: IP })
        .then(
          function (response) {
            if (response.data.Succeeded) {
              resolve(response.data.ReturnValue);
              console.log(response.data, '获取地区区分加载信息');
            } else {
              reject(new Error('获取地区区分加载信息失败!'));
            }
          },
          function () {
            reject(new Error('获取地区区分加载信息失败'));
            console.log('获取地区区分加载信息失败');
          }
        );
    });
    return pms;
  };

  private static instance: IPAddress;
  //* * 单例 */
  public static getInstance (): IPAddress {
    if (IPAddress.instance) { return IPAddress.instance; } else {
      IPAddress.instance = new IPAddress();
      return IPAddress.instance;
    }
  }
}
