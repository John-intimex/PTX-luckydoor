<template>
<div class="recommend_warrper">
    <el-button type="success" @click="openDialog">{{$t('product.Recommend')}}</el-button>
    <el-dialog :title="$t('product.Recommend')" :visible.sync="dialogFormVisible" style="width: 1024px;margin: 0 auto;" @close="beforeClose">
        <Form :model="form" :rules="rules" ref="form">
            <el-form-item :label="$t('Register.UserEmail')" :label-width="formLabelWidth" prop="ToEmail">
                <el-input v-model="form.ToEmail" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="$t('product.Remarks')" :label-width="formLabelWidth" prop="Remark">
                <el-input type="textarea" v-model="form.Remark"></el-input>
            </el-form-item>
        </Form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">{{$t('Message.Cancel')}}</el-button>
            <el-button type="primary" @click="confirm(form.ToEmail, form.Remark)">{{$t('Message.Confirm')}}</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script lang="ts">
import { ElForm } from 'element-ui/types/form';
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
@Component
export default class Recommend extends Vue {
      @Prop() private Skus!:string;
      private rules = {
        ToEmail: [
          { required: true, message: '', trigger: 'blur' }
        ],
        Remark: [
          { required: true, message: '', trigger: 'blur' }
        ]
      }
      updated () {
        this.rules.ToEmail[0].message = this.$t('Login.EnterEmail') as string;
        this.rules.Remark[0].message = this.$t('Login.EnterEmail') as string;
      }
      private dialogFormVisible:boolean = false
      private form = {
        ToEmail: '',
        Remark: ''
      }
      private formLabelWidth:string = '120px'
      cancel () {
        this.dialogFormVisible = false;
      }
      confirm (ToEmail, Remark) {
        this.$Api.member.getProfile2().then((result) => {
          // this.$Login(() => {
          // });
          return result.MemberId;
        }).then((result) => {
          this.$Api.product.SaveMemberRecommendProduct({
            MemberId: result,
            Skus: this.Skus + ',',
            ToEmail: ToEmail,
            Remark: Remark,
            IType: 1
          }).then(result => {
            this.$message(result);
          });
        }).catch((error) => {
          console.error(error);
          this.$Login(this.confirm, ToEmail, Remark);
        });
        this.dialogFormVisible = false;
      }
      openDialog () {
        this.dialogFormVisible = true;
      }
      beforeClose () {
        (this.$refs['form'] as ElForm).resetFields();
      }
}
</script>
<style lang="less" scoped>
.el-dialog{
    width: 512px !important;
}
.recommend_warrper{
    margin-top: 1rem;
    text-align: left;
}
</style>
