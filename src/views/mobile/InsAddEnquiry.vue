<template>
<div class="warper">
    <div class="Inner">
        <div class="left">
                <p class="HeadTitle"><span class="Request">發票: Request</span><span class="status">狀態: 全部發貨</span></p>
                <div class="TableA">
                    <ul>
                        <li>
                            <span class="w15">個案編號:</span>
                            <span class="w83">HK10754</span>
                        </li>
                        <li>
                            <span class="w15">發票編號:</span>
                            <span class="w83">INV10754</span>
                        </li>
                        <li>
                            <span class="w15">日期:</span>
                            <span class="w83">2022/3/11 11:07:46</span>
                        </li>
                        <li>
                            <span class="w15">客戶參考編號:</span>
                            <span class="w83">Request</span>
                        </li>
                        <li>
                            <span class="w15">戶口營業員:</span>
                            <span class="w83">Admin</span>
                        </li>
                    </ul>
                </div>
                <div class="TableA Recipient">
                    <div class="BgTitle">
                        <p class="InnerTitle">收件者</p>
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
                            <em class="text">產品描述:</em>
                            <em class="text">其他要求:</em>
                        </span>
                        <span class="w20 NormalText">
                            <em class="text">單價:1.00</em>
                            <em class="text">數量:500</em>
                            <em class="text">合共:500.00</em>
                        </span>
                    </li>
                    <li class="NoramlLi">
                        <span class="w20"><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650525786&t=3e7fd1ae7741c724cd9f1115f268f1df"></span>
                        <span class="w58 NormalText">
                            <em class="text">產品編號:GW5000D-HF</em>
                            <em class="text">產品名稱:光伏開網逆變器</em>
                            <em class="text">產品描述:</em>
                            <em class="text">其他要求:</em>
                        </span>
                        <span class="w20 NormalText">
                            <em class="text">單價:1.00</em>
                            <em class="text">數量:500</em>
                            <em class="text">合共:500.00</em>
                        </span>
                    </li>
                </ul>
                <div class="TotalText">總共 (RMB): 1000.00</div>
            </div>
            <div class="RecipientText">此發票總額為: RMB  \ 一千元正</div>
                <div class="TableA">
                    <ul>
                        <li>
                            <span class="w15">送貨日期:</span>
                            <span class="w83">12/3/2022 </span>
                        </li>
                        <li>
                            <span class="w15">送貨方式:</span>
                            <span class="w83">XXXXXXXXX</span>
                        </li>
                        <li>
                            <span class="w15">貨運條件:</span>
                            <span class="w83">XXXXXXXXX</span>
                        </li>
                        <li>
                            <span class="w15">付款方式:</span>
                            <span class="w83">XXXXXXXXX</span>
                        </li>
                        <li>
                            <span class="w15">備註:</span>
                            <span class="w83">XXXXXXXXX</span>
                        </li>
                    </ul>
                </div>
            <div class="BottomMeun">
                <a>列印格式</a>
            </div>
        </div>
    </div>
</div>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import Express from '@/model/express';
@Component
export default class InsInviceInfoDetail extends Vue {
}
</script>
<style scoped lang='less'>
/deep/ .MemberPc {
  background: #f4f4f4!important;
}
</style>
