import Settings from '@/settings';
const ana = require('./ApiAndAdminServer');

let AppId = Settings.AppId;
let Authorization = Settings.Authorization;
let AdminServer = ana.AdminServer;
let apiServer = ana.apiServer;
export default {
  // instore app id admin的id
  AppId: AppId,
  // api server url 統一配置Api服務器的url
  ApiServer: apiServer,

  // api version for this app 統一配置Api版本號
  ApiVersion: 'V2',
  // api Authorization 身份认真，用于后端识别客户端
  Authorization: Authorization,
  // admin server url, for login management platform 統一配置admin服務器
  AdminServer: AdminServer,
  // url '/admin' auto open admin tab
  AutoOpenAdmin: true,
  // admin login url 統一配置admin登錄地址
  AdminLoginUrl: AdminServer + '/default/ClientLogin/' + AppId
};
