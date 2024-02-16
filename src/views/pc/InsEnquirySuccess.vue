<template>
<div class="pc NomralBg">
  <div id="container" class="paySuccess">
    <div class="payment-box">
        <div class="logo">
            <span class="el-icon-circle-check"></span>
        </div>
        <p class="tips">
            {{$t('Enquiry.QuotationInquiry')}}
        </p>
        <div class="payment-btn">
            <a href="javascript:;" @click="returnOrder()">{{$t('Enquiry.ClickHere')}}</a>
        </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class paySuccess extends Vue {
  returnOrder () {
    this.$router.push('/account/ptxorder');
  }
  mounted () {
  }
}
</script>

<style scoped lang="less">
.pc {
    padding-top: 10rem;
    padding-bottom: 9rem;
    min-height: 500px;
    .paySuccess {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .payment-box {
            width: 1200px;
            margin: 0 auto;
            text-align: center;
            .logo {
                img {
                    max-width: 35%;
                }
                span{
                    font-size: 4rem;
                    color: @base_color;
                    text-align: center;
                }
            }

            .tips {
                font-size: 20px;
                margin: 50px 0;
            }

            .payment-btn {
                a {
                    display: inline-block;
                    padding: 10px 35px;
                    margin: 0 20px;
                    background-color: @base_color;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
