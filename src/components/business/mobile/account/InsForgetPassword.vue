<template>
  <div id="container" class="NoramlPaddingTop NomralBg">
    <!-- <div class="Banner"  :style="{backgroundImage: 'url('+ ImgList +')',backgroundSize:'100% 100%'}">
        <div class="TitleBg"><div class="innerBoxText">{{$t('Forgetpassword.ForgetPassword')}}</div></div>
    </div> -->
    <p class="pageTitle">{{$t('Forgetpassword.ForgetPassword')}}</p>
    <div class="ForgetPassMain">
      <div style="margin-top: 15px;" v-if="ResetPwd">
        <h2 class="ResetPwdTips">{{$t('Forgetpassword.ResetPwdTips')}}</h2>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item prop="UserEmail">
            <el-input
              :placeholder="$t('Forgetpassword.LoginNameEmail')"
              v-model="ruleForm.UserEmail"
              prefix-icon="el-icon-message"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-arrow-right"
                @click="SubmitForm"
              >{{$t('Forgetpassword.NextStep')}}</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 输入正确的Email后，弹窗 -->
      <div class="EmailSuccess" v-if="!ResetPwd">
        <p>
          <i class="el-icon-success"></i>
        </p>
        <p>{{$t('Forgetpassword.ResetPwdSuccess')}}</p>
        <p>{{$t('Forgetpassword.NotEmail')}}?</p>
        <p>
          <a
            @click="ResetReturn"
            :title="$t('Forgetpassword.ToReEnter')"
          >{{$t('Forgetpassword.ToReEnter')}}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';

@Component({
  components: {
    InsBanner: () => import('@/components/base/mobile/InsBanner.vue')
  }
})
export default class InsForgetPassword extends Vue {
  ResetPwd: boolean = true;
  ImgList:string='/images/mobile/MobileNormalBg.jpg';
  ruleForm: any = {
    UserEmail: ''
  };
  ResetReturn () {
    this.ResetPwd = !this.ResetPwd;
    this.ruleForm.UserEmail = '';
  }
  get rules () {
    return {
      UserEmail: [
        {
          required: true,
          message: this.$t('Forgetpassword.EnterEmail'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('Forgetpassword.CorrectEmail'),
          trigger: ['blur', 'change']
        }
      ]
    };
  }
  // 检查表单
  SubmitForm (ruleForm) {
    let _this = this;
    this.$nextTick(function () {
      (_this.$refs.ruleForm as HTMLFormElement).validate(valid => {
        if (valid) {
          sdk.api.member.resetPassword(_this.ruleForm.UserEmail).then(
            function (success) {
              if (success) {
                _this.ResetPwd = !_this.ResetPwd;
              }
            },
            function (success) {
              _this.$message({
                message: success.Message,
                type: 'error'
              });
            }
          );
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    });
  }
}
</script>
<style lang="less" scoped>
.DetailTitle{
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  position: relative;
  align-items: center;
  justify-content: center;
  img{
    width: 100%;
  }
  .TitleBg{
    width: 75%;
    border: 1px solid #ffffff;
    height: 4.5rem;
    line-height: 4.5rem;
    margin: 0 auto;
    padding: 10px;
    margin-bottom: 20px;
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
    .innerBoxText{
      background:#ffffff;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      font-family: 'Arial';
    }
  }
}
.Banner {
  width: 100%;
  height: 15rem;
  display:flex;
  align-items: center;
  position: relative;
}
.TitleBg{
  width: 75%;
  height: 4.5rem;
  border:1px solid #ffffff;
  margin: 0 auto;
  padding: .8rem;
  .innerBoxText{
    width: 100%;
    height: 100%;
    background:#ffffff;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Arial';
  }
}
#container {
  width: 100%;
  display: inline-block;
  min-height: 20rem;
  .forgetpsw_title{
    font-size: 2rem;
    line-height: 4rem;
    background-color: rgba(255, 255, 255, .5);
    text-align: center;
    margin-top: 2rem;
  }
}
.ForgetPassMain {
    width: 95%;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ResetPwdTips {
    line-height: 2rem;
    text-align: left;
    font-size: 1.2rem;
    margin-bottom: 10px;
}
.EmailSuccess{
  text-align: center;
}
.EmailSuccess p {
  line-height: 2rem;
  font-size: 1.4rem;
}
.EmailSuccess p a {
    line-height: 2rem;
    font-size: 1.4rem;
    color: crimson;
    text-decoration: underline;
    cursor: pointer;
    padding-bottom: 3rem;
    display: block;
    padding-top: 1rem;
}
.EmailSuccess p i {
  font-size: 60px;
  color: #8dc11f;
}
.Banner {
  width: 100%;
  height: 15rem;
}
.Banner img {
  width: 100%;
  height: 15rem;
}
</style>
