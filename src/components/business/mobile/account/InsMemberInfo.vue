<template>
  <div class="MemberInfo">
    <div class="mid-box">
        <!-- 用户账号 -->
        <div class="TableWarper">
          <div class="Header"><p class="Inner">{{ $t("Account.MemberInformation") }}</p></div>
          <div class="Content">
            <el-form
              :model="ruleForm"
              :rules="rules"
              :label-position="'right'"
              label-width="120px"
              ref="ruleForm"
              class="demo-ruleForm"
            >
              <el-form-item :label="$t('Register.UserEmail')" prop="Email">
                <el-input
                  v-model="ruleForm.Email"
                  prefix-icon="el-icon-message"
                  :placeholder="$t('Register.UserEmail')"
                  disabled
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Register.UserFirstName')" prop="FirstName">
                <el-input
                  v-model="ruleForm.FirstName"
                  prefix-icon="el-icon-user"
                  :placeholder="$t('Register.UserFirstName')"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Register.UserLastName')" prop="LastName">
                <el-input
                  v-model="ruleForm.LastName"
                  :placeholder="$t('Register.UserLastName')"
                  prefix-icon="el-icon-collection-tag"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Enquiry.Title')" prop="JobTitle">
                <el-input
                  v-model="ruleForm.JobTitle"
                  :placeholder="$t('Enquiry.Title')"
                  prefix-icon="el-icon-user"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Enquiry.Company')" prop="Company">
                <el-input
                  v-model="ruleForm.Company"
                  :placeholder="$t('Enquiry.Company')"
                  prefix-icon="el-icon-collection-tag"
                  clearable
                ></el-input>
              </el-form-item>
               <el-form-item :label="$t('Enquiry.Address')" prop="CompanyAddress">
                <el-input
                  v-model="ruleForm.CompanyAddress"
                  :placeholder="$t('Enquiry.Address')"
                  prefix-icon="el-icon-position"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="Phone" :label="$t('Enquiry.Phone')">
                <el-input
                  v-model="ruleForm.Phone"
                  prefix-icon="el-icon-phone"
                  :placeholder="$t('Enquiry.Phone')"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="Mobile" :label="$t('Enquiry.Mobile')">
                <el-input
                  v-model="ruleForm.Mobile"
                  prefix-icon="el-icon-mobile"
                  :placeholder="$t('Enquiry.Mobile')"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item prop="Fax" :label="$t('Enquiry.Fax')">
                <el-input
                  v-model="ruleForm.Fax"
                  prefix-icon="el-icon-phone"
                  :placeholder="$t('Enquiry.Fax')"
                  clearable
                ></el-input>
              </el-form-item>
                 <el-form-item prop="PostCode" :label="$t('Enquiry.PostalCode')">
                <el-input
                  v-model="ruleForm.PostCode"
                  prefix-icon="el-icon-postcard"
                  :placeholder="$t('Enquiry.PostalCode')"
                  clearable
                ></el-input>
              </el-form-item>
                <el-form-item :label="$t('DeliveryAddress.Area')" prop="CountryId">
                  <el-select
                    v-model="ruleForm.CountryId"
                    :placeholder="$t('DeliveryAddress.Area')"
                    v-on:change="selectCountry($event)"
                  >
                    <el-option
                    :label="country.Name"
                    v-for="(country,index) in countryList"
                    :key="index"
                     v-bind:value="(country.Id).toString()"
                    ></el-option>

                  </el-select>
                </el-form-item>
                <div v-show="provinceList.length>0">
                  <el-form-item :label="$t('DeliveryAddress.Province')" prop="Province">
                    <el-select
                      v-model="ruleForm.Province"
                      :placeholder="$t('DeliveryAddress.Province')"
                      value-key="Id"
                    >
                      <el-option
                      v-bind:value="(province.Id).toString()"
                      v-for="(province,index) in provinceList"
                      :label="province.Name"
                      :key="index"
                      ></el-option>

                    </el-select>
                </el-form-item>
                </div>
                <el-form-item :label="$t('Enquiry.City')" prop="City">
                <el-input
                  v-model="ruleForm.City"
                  :placeholder="$t('Enquiry.City')"
                  prefix-icon="el-icon-collection-tag"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item :label="$t('Register.UserGender')" prop="Gender">
                <el-radio-group v-model="ruleForm.Gender">
                  <el-radio label="0">{{$t('Register.UserMale')}}</el-radio>
                  <el-radio label="1">{{$t('Register.UserFemale')}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="$t('Register.UserLanguage')" prop="Language">
                <el-select
                  v-model="ruleForm.Language"
                  :placeholder="$t('Register.UserLanguage')"
                  style="width: 100%;"
                >
                  <el-option :value="1" :label="$t('Register.UserLanguageT')">{{$t('Register.UserLanguageT')}}</el-option>
                  <el-option :value="2" :label="$t('Register.UserLanguageS')">{{$t('Register.UserLanguageS')}}</el-option>
                </el-select>
              </el-form-item>
              <!-- <el-form-item>
                <el-button
                  round
                  type="primary"
                  class="submit-btn"
                  @click="SubmitForm('ruleForm')"
                >{{$t('DeliveryAddress.SaveBtn')}}</el-button>
              </el-form-item> -->
            </el-form>
          </div>
        </div>
        <p class="ButttomBtn">
            <a @click="SubmitForm('ruleForm')">{{$t('DeliveryAddress.SaveBtn')}}</a>
        </p>
    </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { MemberResult } from '@/model/memberResult';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
import lang from '@/lang';
import storage from '@/sdk/common/Storage';
import { ElForm } from 'element-ui/types/form';
import { Province } from '@/model/province';
@Component({
  components: {
    accountHeader: () => import('@/components/hkTasteBusiness/pc/account/accountHeader.vue')
  }
})
export default class InsMemberInfo extends Vue {
  activeName: string = 'first';
  countryList: any[] = [];
  private province!:Province;
  provinceList: any[] = [];
  private member: MemberResult = new MemberResult();
  // 验证规则
  ruleForm: any = {
    FirstName: '',
    LastName: '',
    JobTitle: '',
    Company: '',
    Address: '',
    Phone: '',
    Mobile: '',
    Fax: '',
    Gender: '',
    PostCode: '',
    CountryId: '786',
    Province: '',
    City: '',
    Language: ''
  };
  langs:string[] = ['E', 'C', 'S'];
  validatePass (rule, value, callback) {
    if (value === '') {
      callback(new Error(this.$t('MemberInfo.EnterUserName') as string));
    } else {
      callback();
    }
  }
  get rules () {
    return {
      FirstName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserName'),
          trigger: 'blur'
        }
      ],
      LastName: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserLastName'),
          trigger: 'blur'
        }
      ],
      Mobile: [
        {
          required: true,
          message: this.$t('MemberInfo.EnterUserPhone'),
          trigger: 'blur'
        },
        { validator: function(rule, value, callback) {
          /* eslint-disable */
            var mobile = /^(\+)?(\d{0,4}\-?)?\d{7,11}$/;
            if ( mobile.test(value) === false ) {
              var t = lang.messages[storage.get('locale')].Input['phoneincorrect'];
                callback(new Error(t));
            } else {
                callback();
            }
        },
        trigger: 'blur' }
      ]
    };
  }

  changLange (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
    }).catch((error) => {
      console.log(error);
    });
  }
  get currentlang () {
    return this.$Storage.get('locale');
  }
  async getProfile () {
    let _this = this;
    await sdk.api.member.getProfile().then(
      function (data) {
        if (data) {
          _this.ruleForm = data;
          // if (data.BirthDateString !== '') {
          //   var newDate = new Date(data.BirthDateString.replace(/-/g, '/'));
          //   data.BirthDateString = newDate.getDate() + '/' + (newDate.getMonth() + 1);
          // }
          _this.$i18n.locale = _this.langs[data.Language];
          _this.$set(_this, 'member', data);
          _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
          _this.$store.dispatch('setLang', _this.langs[data.Language]);
          _this.$Storage.set('locale', _this.langs[data.Language]);
          _this.$HiddenLayer();
          _this.getProvince(data.CountryId);
          // _this.Reload();
        } else {
          _this.$store.dispatch('Logout');
        }
      },
      function (data) {
        _this.$message({
          message: data,
          type: 'error'
        });
      }
    );
  }
  //   加载国家列表
  getCountry () {
    let _this = this;
    this.$Api.delivery.getCountry().then((result) => {
      _this.countryList = result.data;
    });
  }

  //   加载对应省列表
  getProvince (num) {
    let _this = this;
    var cid = num;
    if (cid && cid !== '') {
      this.$Api.delivery.getProvince(cid).then((result) => {
        _this.provinceList = result.data;
      });
    } else {
      _this.ruleForm.Province = '';
    }
  }

  selectCountry (event) {
    var cid = event;
    let _this = this;
    if (cid && cid !== '') {
      _this.ruleForm.Province = '';
      _this.getProvince(cid);
    } else {
      _this.ruleForm.Province = '';
    }
  }
  created () {
    this.getCountry();
    this.getProfile();
  }
  // 提交用户信息表单
  SubmitForm (ruleForm) {
    let that = this;
    (that.$refs.ruleForm as ElForm).validate(valid => {
      if (valid) {
        sdk.api.member.updateProfile(that.ruleForm).then(
          async function (response) {
            that.$message({
              message: response.Message,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
            await that.getProfile();
            // that.Reload();
          },
          function (response) {
            that.$message({
              message: response.Message,
              type: 'error',
              customClass: 'messageboxNoraml'
            });
          }
        );
      } else {
        console.log('error submit!!');
        return false;
      }
    });
  }
  // 重置用户信息表单
  ResetForm (ruleForm) {
    (this.$refs.ruleForm as ElForm).resetFields();
  }
  // 打开地址
  openlink (link) {
    this.$router.push({ path: link });
  }
}
</script>

<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>

<style lang="less" scoped>
.MemberInfo {
  margin-bottom: 50px;
  margin-top: 20px;
  .mid-box {
    padding: 0px;
    .ButttomBtn {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      a{
        width: 100px;
        background: @base_color;
        border-radius: 5px;
        height: 35px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: all .3s;
        cursor: pointer;
        &:hover {
          background: #333;
        }
      }
    }
    .TableWarper {
      width: calc(100% - 2px);
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #e5e5e5;
      border-radius: 5px;
      overflow: hidden;
      background: #fff;
      .Header {
        width: 100%;
        background: @base_color;
        height: 40px;
        line-height: 40px;
        .Inner {
          width: 90%;
          margin: 0 auto;
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 18px;
          &::before{
            content: '';
            width: 3px;
            height: 20px;
            background: #fff;
            display: inline-block;
            margin-right: 5px;
          }
        }
      }
      .Content {
        width: 95%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        margin-top: 30px;
        margin-bottom: 30px;
      }
    }
    /deep/ .el-form {
      width: 100%;
      margin: 0 auto;
      .el-select {
        width: 100%;
      }
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
        font-size: 20px;
        margin-top: 20px;
      }
    }
  }
}
</style>
