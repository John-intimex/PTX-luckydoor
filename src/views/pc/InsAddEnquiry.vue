<template>
<div class="warper">
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
                <p class="HeadTitle"><span class="Request">報價查詢: Request</span></p>
                <div class="TableA">
                    <ul>
                        <li>
                            <span class="w15">日期:</span>
                            <span class="w83">2022/3/28 16:35:47</span>
                        </li>
                        <el-form-item>
                            <li>
                                <span class="w15">客戶參考編號:</span>
                                <span class="w83"> <el-input v-model="ruleForm.model"></el-input></span>
                            </li>
                        </el-form-item>
                    </ul>
                </div>
                <div class="TableA Recipient">
                    <div class="BgTitle">
                        <p class="InnerTitle">寄件者</p>
                    </div>
                    <ul>
                        <li>
                            <span class="w50">名字:YYYYY111</span>
                            <span class="w50">姓氏:21341232314213</span>
                        </li>
                        <li>
                            <span class="w50">職位:zoo</span>
                            <span class="w50">公司名稱:984151516</span>
                        </li>
                        <li>
                            <span class="w50">地址:XXXX</span>
                            <span class="w50">城市:123456@ptx.hk</span>
                        </li>
                        <li>
                            <span class="w50">省份:888888888</span>
                            <span class="w50">郵政編碼:888888888</span>
                        </li>
                      <li>
                            <span class="w50">國家:XXXX</span>
                            <span class="w50">電話:123456@ptx.hk</span>
                        </li>
                        <li>
                            <span class="w50">流動電話:888888888</span>
                            <span class="w50">傳真:888888888</span>
                        </li>
                              <li>
                            <span class="w50">電郵:888888888</span>
                            <span class="w50"></span>
                        </li>
                    </ul>
                </div>
                <div class="TableA">
                    <ul>
                         <el-form-item>
                            <li>
                                <span class="w15">送貨資料:</span>
                                <span class="w83"> <el-input v-model="ruleForm.model"></el-input></span>
                            </li>
                    </el-form-item>
                    </ul>
                </div>
                 <div class="TableA Recipient">
                    <div class="BgTitle">
                        <p class="InnerTitle">協商記錄處</p>
                    </div>
                    <ul>
                        <el-form-item class="xsmessage">
                            <li>
                                <span class="w15">請於以下留言:</span>
                                <span class="w83"> <el-input v-model="ruleForm.model" width="90%"></el-input><el-button>清除</el-button></span>
                            </li>
                    </el-form-item>
                    </ul>
                </div>
        </div>
        <div class="right">
            <p class="HeadTitle"><span class="Request">已選擇產品</span></p>
            <div class="TableA Recipient">
                <div class="BgTitle">
                    <p class="w20">收件者</p>
                    <p class="w58">產品資料</p>
                    <p class="w20">總共 (RMB)</p>
                </div>
                <ul>
                    <li class="NoramlLi">
                        <span class="w20"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650525786&t=3e7fd1ae7741c724cd9f1115f268f1df"></span>
                        <span class="w58 NormalText">
                            <em class="text">產品編號:GW5000D-HF</em>
                            <em class="text">產品名稱:光伏開網逆變器</em>
                            <em class="text">其他要求:</em>
                        </span>
                        <span class="w20 NormalText">
                            <em class="text w30">數量:500</em>
                            <em class="text w70">數量:500</em>
                        </span>
                    </li>
                </ul>
                <div class="TotalText">總共 (RMB): 1000.00</div>
            </div>
            <div class="RecipientText">此發票總額為: RMB  \ 一千元正</div>
                <div class="TableA BottomTable">
                    <ul>
                        <el-form-item>
                        <li>
                            <span class="w15">送貨排程:</span>
                            <span class="w83"><el-input v-model="ruleForm.model"></el-input> </span>
                        </li>
                        </el-form-item>
                        <el-form-item>
                        <li>
                            <span class="w15">送貨方式:</span>
                            <span class="w83"><el-input v-model="ruleForm.model"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">貨運條件:</span>
                            <span class="w83"><el-input v-model="ruleForm.model"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">付款方式:</span>
                            <span class="w83"><el-input v-model="ruleForm.model"></el-input></span>
                        </li>
                         </el-form-item>
                         <el-form-item>
                        <li>
                            <span class="w15">備註:</span>
                            <span class="w83"><el-input v-model="ruleForm.model"></el-input></span>
                        </li>
                         </el-form-item>
                    </ul>
                </div>
            <div class="BottomMeun">
                <a>儲存作初稿</a>
                <a>預覽</a>
            </div>
        </div>
    </div>
     </el-form>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
@Component
export default class InsAddEnquiry extends Vue {
  ruleForm: any = {
      model: ''
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
}
</script>
<style scoped lang='less'>
/deep/ .el-form {
    width: 100%;
    .el-form-item {
        width: 100%;
        .el-form-item__content {
            margin-left: 0px!important;
        }
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
}
.warper .BottomTable ul li {
    border-bottom: 0px!important;
    padding-top: 5px;
    padding-bottom: 5px;
}
.w20 {

}
</style>
