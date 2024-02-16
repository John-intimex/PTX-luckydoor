<template>
  <div class="ModifyPassword">
    <div class="mid-box">
      <div class="InnerBox">
          <el-form :model="pwdForm" status-icon :rules="rules" ref="pwdForm" class="demo-pwdForm">
            <el-form-item prop="Password">
              <el-input type="password" :placeholder="$t('Register.UserOldPassword')" v-model="pwdForm.Password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="NewPassword">
              <el-input type="password" :placeholder="$t('Register.UserNewPassword')" v-model="pwdForm.NewPassword" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="ConfirmNewPassword">
              <el-input type="password" :placeholder="$t('Register.UserConfirmPassword')" v-model="pwdForm.ConfirmNewPassword" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
      </div>
      <p class="bottomBar">
        <a class="saveBtn" @click="submitForm('pwdForm')">{{$t('DeliveryAddress.SaveBtn')}}</a>
        <a class="resetBtn" @click="resetForm('pwdForm')">{{$t('DeliveryAddress.ResetBtn')}}</a>
      </p>
    </div>
   </div>
</template>
<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsModifyPassword extends Vue {
  private checkOldPass = (rule, value, callback) => {
    if (!value) {
      return callback(new Error(this.$t('MemberInfo.EnterOldPwd') as string));
    } else {
      callback();
    }
  };

  private validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterNewPwd') as string));
    } else {
      var i = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
      if (i.test(value) === false) {
        callback(new Error(this.$t('Register.Registerdigital') as string));
      }

      if (this.pwdForm.ConfirmNewPassword !== '') {
        (this.$refs.pwdForm as ElForm).validateField('ConfirmNewPassword');
      }
      callback();
    }
  };

  private validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterComfirmPwd') as string));
    } else if (value !== this.pwdForm.NewPassword) {
      callback(new Error(this.$t('MemberInfo.PwdNotCorrect') as string));
    } else {
      callback();
    }
  };

  private pwdForm: any = {
    Password: '',
    NewPassword: '',
    ConfirmNewPassword: ''
  };

  private rules: any = {
    Password: [
      { validator: this.checkOldPass, trigger: 'blur' }
    ],
    NewPassword: [
      { validator: this.validatePass, trigger: 'blur' }
    ],
    ConfirmNewPassword: [
      { validator: this.validatePass2, trigger: 'blur' }
    ]
  }

  submitForm(formName) {
    (this.$refs[formName] as ElForm).validate((valid) => {
      if (valid) {
        this.$Api.member.updatePassword(this.pwdForm).then((result) => {
          this.$message({
            message: result.Message,
            type: result.Succeeded ? 'success' : 'error'
          });
        }).catch((error) => {
          console.log(error);
          this.$message({
            message: error,
            type: 'error'
          });
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  };

  resetForm(formName) {
    (this.$refs[formName] as ElForm).resetFields();
  }
}
</script>

<style lang="less">
.ModifyPassword {
  min-height: 600px;
  .mid-box {
    padding: 50px;
    .InnerBox {
      border: 1px solid #eee;
      padding: 50px;
      border-radius: 5px;
      padding-bottom: 30px;
      background: #fff;
    }
    .bottomBar {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      .saveBtn {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 18px;
        background: @base_color;
        height: 35px;
        border: 1px solid @base_color;
        border-radius: 5px;
        margin-right: 20px;
        transition: all .3s;
        cursor: pointer;
        &:hover{
          background: #333;
        }
      }
      .resetBtn {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 18px;
        background: #fff;
        height: 35px;
        border: 1px solid #666;
        border-radius: 5px;
        transition: all .3s;
        cursor: pointer;
        &:hover{
          background: #333;
          color: #fff;
        }
      }
    }
    /deep/ .el-form {
      width: 100%;
      margin: 0 auto;
      .el-radio__input {
        .el-radio__inner {
          outline: none;
          box-shadow: none;

          &:hover {
            border-color: #333333;
          }
        }

        &.is-checked .el-radio__inner {
          border-color: #333333;
          background: #333333;
        }

        &.is-checked+.el-radio__label {
          color: #333333;
        }
      }

      .submit-btn {
        display: block;
        width: 100%;
        background: #333;
        border: none;
        margin-top: 20px;

        > span {
          font-size: 20px;
        }
      }

      .reset-btn {
        display: block;
        width: 100%;
        color: #333;
        background: #fff;
        border: 1px solid #333;

        > span {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
