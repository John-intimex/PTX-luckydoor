<template>
<div class="mobile">
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
.mobile {
    .paySuccess {
        .payment-box {
            padding: 6rem 1rem;
            text-align: center;

            .logo {
                img {
                    max-width: 45%;
                }
                span{
                    font-size: 4rem;
                    color: @base_color;
                    text-align: center;
                }
            }

            .tips {
                font-size: 1.5rem;
                margin: 3rem 0;
            }

            .payment-btn {
                a {
                    display: inline-block;
                    padding: 0.8rem 1.2rem;
                    margin: 0 1rem;
                    background-color: @base_color;
                    color: #fff;
                    border-radius: 5px;
                    font-size: 1.2rem;
                }
            }
        }
    }
}
</style>
