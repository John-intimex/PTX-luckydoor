<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark" style="text-align: center;line-height:  200px;">
            <!-- <a v-on:click="loginAdmin">Login Management System</a> -->
            <el-button
              type="primary"
              icon="el-icon-menu"
              v-on:click="loginAdmin"
            >Login Management System</el-button>

          </div>
          <el-alert v-if="opened" title="已經自動在新窗口打開後台管理系統，如果沒有，請檢查瀏覽器是否禁止打開新的窗口，或者嘗試點擊上面的按鈕重試！" type="info"></el-alert>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AdminLoginUrl, AutoOpenAdmin } from '../../sdk/common/SysConst';
@Component
export default class InsAdmin extends Vue {
  private opened: Boolean = false;
  loginAdmin () {
    // window.open(AdminLoginUrl, '_blank');
  }
  mounted () {
    console.log('admin mounted');
    if (AutoOpenAdmin) {
      window.location.href = AdminLoginUrl;
      this.opened = true;
    }
  }
}
</script>
