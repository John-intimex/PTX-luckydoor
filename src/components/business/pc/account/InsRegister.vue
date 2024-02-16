<template>
  <div id="container">
    <!--main-content-->
    <div style="width:100%;height:20px;"></div>
    <div  class="maincontent">
      <div id="login-register-box">
        <div id="join_form">
          <div class="login-register-top">
            <div class="join_form-title">{{$t('Register.RegisterTitle')}}</div>
            <div class="clear"></div>
          </div>
          <el-form
            :model="regForm"
            status-icon
            :rules="rules"
            label-width="auto"
            ref="regForm"
            class="login-form register-form"
          >
            <div class="login-register-content register-content">
              <div class="step_content">
                <el-form-item :label="$t('Register.UserEmail')" prop="Email">
                  <el-input
                    autocomplete="off"
                    prefix-icon="el-icon-message"
                    :placeholder="$t('Register.UserEmail')"
                    v-model="regForm.Email"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('Register.UserRegPassword')" prop="Password">
                  <el-input
                    type="password"
                    v-model="regForm.Password"
                    prefix-icon="el-icon-view"
                    autocomplete="off"
                    :placeholder="$t('Register.UserRegTips')"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  :label="$t('Register.UserConfirmPassword')"
                  prop="ConfirmPassword"
                >
                  <el-input
                    type="password"
                    v-model="regForm.ConfirmPassword"
                    :placeholder="$t('Register.UserConfirmPassword')"
                    autocomplete="off"
                    prefix-icon="el-icon-view"
                  ></el-input>
                </el-form-item>
              </div>
              <div class="step_content">
                <el-form-item :label="$t('Register.UserFirstName')" prop="FirstName">
                  <el-input
                    v-model="regForm.FirstName"
                    prefix-icon="el-icon-user"
                    :placeholder="$t('Register.UserFirstName')"
                  ></el-input>
                </el-form-item>

                <el-form-item :label="$t('Register.UserLastName')" prop="LastName">
                  <el-input
                    v-model="regForm.LastName"
                    :placeholder="$t('Register.UserLastName')"
                    prefix-icon="el-icon-collection-tag"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="Mobile" :label="$t('Register.UserContactNumber')">
                  <el-input
                    v-model="regForm.Mobile"
                    prefix-icon="el-icon-phone"
                    :placeholder="$t('Register.UserContactNumber')"
                  ></el-input>
                </el-form-item>
                 <el-form-item prop="BirthMD" :label="$t('Register.UserBirthDate')">
                  <el-input
                    v-model="regForm.BirthMD"
                    prefix-icon="el-icon-date"
                    :placeholder="$t('Register.UserBirthDate')"
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('Register.UserGender')" prop="Gender">
                  <el-radio-group v-model="regForm.Gender">
                    <el-radio :label="$t('Register.UserMale')"></el-radio>
                    <el-radio :label="$t('Register.UserFemale')"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="$t('Register.UserLanguage')" prop="Language">
                  <el-select
                    v-model="regForm.Language"
                    :placeholder="$t('Register.UserLanguage')"
                    style="width: 100%;"
                  >
                    <el-option :label="$t('Register.UserLanguageT')" value="1"></el-option>
                    <el-option :label="$t('Register.UserLanguageE')" value="2"></el-option>
                    <el-option :label="$t('Register.UserLanguageS')" value="3"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="login-register-handle">
              <el-form-item class="remember" prop="type">
                <el-checkbox-group v-model="regForm.type">
                  <el-checkbox :label="$t('Register.RegisterAgree')" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <div class="clear"></div>
              <div class="btn-box">
                <!-- <input :value="$t('Register.RegisterBtn')" class="btn register-btn" type="submit" /> -->

                <el-button
                  type="primary"
                  @click="submitForm('regForm')"
                >{{$t('Register.RegisterBtn')}}</el-button>
              </div>
            </div>
            <div class="clear"></div>
          </el-form>
        </div>
      </div>
    </div>
    <!--main-content-->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
import { ElForm } from 'element-ui/types/form';
@Component
export default class InsRegister extends Vue {
  created () {
    this.$HiddenLayer();
  }
  checkEmail (rule, value, callback) {
    const mailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
    if (!value) {
      callback(new Error(this.$t('Register.RegisterEmail') as string));
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback();
      } else {
        callback(new Error(this.$t('Register.RegisterEmail01') as string));
      }
    }, 100);
  }

  validatePassword (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('Register.RegisterPassword') as string));
    } else {
      if (this.regForm.Password !== '') {
        // this.$refs.ruleForm.validateField('UserConfirmPassword');
      }

      callback();
    }
  }

  validatePassword2 (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('Register.RegisterNewPassword') as string));
    } else if (value !== this.regForm.Password) {
      callback(new Error(this.$t('Register.RegisterNewPassword01') as string));
    } else {
      callback();
    }
  }
  private regForm = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    FirstName: '',
    LastName: '',
    Mobile: '',
    BirthMD: '',
    Gender: '',
    Language: '',
    type: ''

  };
  get rules () {
    return {
      Email: [
        { required: true, validator: this.checkEmail, trigger: 'blur' }
      ],
      Password: [
        { required: true, validator: this.validatePassword, trigger: 'blur' }
      ],
      ConfirmPassword: [
        { required: true, validator: this.validatePassword2, trigger: 'blur' }
      ],
      FirstName: [
        {
          required: true,
          message: this.$t('Register.RegisterFirstName'),
          trigger: 'blur'
        }
        //  { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('Register.RegisterLastName'),
          trigger: 'blur'
        }
        //  { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
      ],
      type: [
        {
          required: true,
          message: this.$t('Register.RegisterAgree_check'),
          trigger: 'blur'
        }
      ]
    };
  }
  private submitForm (formName) {
    let _this = this;

    (this.$refs.regForm as ElForm).validate(valid => {
      if (valid) {
        this.$Api.member.register(this.regForm).then((result) => {
          if (result.Succeeded) {
            this.$message({
              message: this.$t('Register.RegisterSuccess') as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
            this.$router.push('/account/registerSuccess');
          } else {
            this.$message({
              message: this.$t('Register.RegisterFail') as string,
              type: 'error',
              customClass: 'messageboxNoraml'
            });
          }
        });
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
}
</script>
<style>
#container .el-form-item__content {
    text-align: left;
}
</style>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less" scoped>
/*注册页面*/
#login-register-box {
  font-family: "Arial", "微软雅黑";
  width: 1170px;
  margin: 0 auto;
  background: #FFF;;
}
#join_form {
  width: 100%;
  max-width: 800px;
  margin: 0px auto;
  padding: 5%;
  letter-spacing: 2px;
  line-height: 1.8em;
  font-size: 14px;
  color: #888;
  box-sizing: border-box;
}
.join_form-title {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 30px;
  font-size: 18px;
  letter-spacing: 2px;
  line-height: 1.8em;
  text-align: left;
}

.login-register-tip {
  float: right;
  font-size: 20px;
  color: #999999;
  height: 45px;
  line-height: 45px;
}
#join_form .el-radio__input.is-checked .el-radio__inner {
  border-color: #8dc11f;
  background: #8dc11f;
}
#join_form .el-radio__input.is-checked + .el-radio__label {
  color: #303133;
}
.login-register-tip a {
  font-size: 26px;
  color: #1b1b1b;
  line-height: 45px;
}
#join_form .el-form-item__content {
  text-align: left;
}
.login-form {
  margin-top: 40px;
}

.login-register-content .el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #67c23a;
}
.login-register-content .el-form-item.is-success .el-input__validateIcon {
  color: #67c23a;
}

.login-register-content .form-group .input-text:focus {
  border-bottom: 1px solid #88bd43;
}

#join_form .form-checkbox input[type="checkbox"],
#join_form .form-radio input[type="radio"] {
  cursor: pointer;
  vertical-align: text-bottom;
  width: 17px;
  height: 17px;
}

.btn-box .el-button--primary {
    background-color: #7accc8;
    border: 1px solid #7accc8;
    width: 700px;
    color: #fff;
    font-size: 25px;
    margin-top: 25px;
}
</style>
