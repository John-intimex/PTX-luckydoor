<template>
    <div>
        <div class="header_logo" v-if="!this.$Settings.slideMenu.Embedded">
            <i class="el-icon-close" @click="closeSlideMenu"></i>
        </div>

        <div class="search-box">
            <el-select v-model="searchType" placeholder="please select">
                <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>

            <div class="search-input">
                <input type="text" v-model="key" @keyup.enter="search" />
                <span class="searchBtn" @click="search"><img src="/images/mobile/searchbtn.png"></span>
            </div>
        </div>

        <div id="menu">
            <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="true" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/mobile/InsLogo.vue'),
    Menu: () => import('@/components/business/mobile/header/InsElMenu.vue'),
    InsLangSwitch: () => import('@/components/business/mobile/header/InsLangSwitch.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  private key: string = '';

  private typeList: any[] = [{
    value: 0,
    label: 'Product'
  }, {
    value: 1,
    label: 'CMS'
  }];

  private searchType: number = 0;

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  search () {
    switch (this.searchType) {
      case 0:
        this.searchPro();
        break;
      case 1:
        this.searchCms();
        break;
    }
  }

  searchPro () {
    this.$store.dispatch('setSearchKey', this.key);
    this.$store.dispatch('isShowMenu', false);
    if (this.key !== '') {
      this.$router.push({
        path: '/product/search',
        name: 'productSearch',
        params: {
          key: this.key
        }
      });
    } else {
        this.$store.dispatch('isShowMenu', false);
      this.$router.push({
        path: '/product/search/-'
      });
    }
  }

  searchCms () {
    this.$store.dispatch('isShowMenu', false);
    this.$router.push({
      path: '/cms/search',
      name: 'cmsSearch',
      params: {
        key: this.key
      }
    });
  }

  get user () {
    return this.$store.state.user;
  }

  get isLogin () {
    return this.$store.state.isLogin;
  }
}
</script>

<style lang="less">
.sidebar-container {
    background-color: #fff !important;
}
.menu_footer span{
    display: flex;
    float: left;
    border:1px solid #eee;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    margin-right: 1rem;
    font-size: 1.4rem;
}
.innerShare{
    width: 90%;
    margin: 0 auto;
    display: flex;
    margin-top: 2rem;
    padding-bottom: 5rem;
    align-items: center;
    justify-content: center;
}
.innerShare a {
    display: inline-block;
    margin-right: 1rem;
    vertical-align: middle;
}
.innerShare a img {
    width: 3rem;
}

#menu {
    .el-submenu__icon-arrow {
        display: none;
    }

    .el-submenu__title {
        padding-top: 0.375rem;
        padding-bottom: 0.375rem;
        border: 1px solid #666;
        height: auto!important;
        line-height: unset;
        background-color:#fff!important;
        .name{
            font-size: 1.6rem!important;
            color:#666;
        }
    }

    .el-menu {
        width: 90%;
        margin: 0 auto;
        background-color: transparent;
        border: 0;
        margin-bottom: 1rem;
        margin-top: 1rem;
        .el-submenu__icon-arrow {
            display: block;
            font-size: 1.6rem;
        }

        > li {
            height: auto;
            line-height: unset;
            text-align: center;
            margin-bottom: 1rem;
             >a {
                 color:#666666;
                 background: #fff;
                 background-size: 100% 100%;
                 display:block;
                 width: 100%;
                 padding-top: .8rem;
                 padding-bottom: .8rem;
                 margin: 0 auto;
                 border:1px solid #666666;
                 font-weight: 500;
                 b{
                     color:#FFF;
                     display: block;
                     width: 100%;
                     font-weight: 500;
                     &:nth-child(1){
                        color:#666666;
                        font-weight: 500;
                        font-size: 1.6rem;
                     }
                     &:nth-child(2){
                         color:#262626;
                         font-size: 1.2rem;
                     }
                 }
            }

            a {
                text-decoration: none;
            }
        }

        li {
            line-height: unset;
            padding: 0 !important;
            min-width: unset;
        }
    }
}
#menu .is-opened > .el-submenu__title{
    background: #666!important;
    color:#fff!important;
    .name{
        color:#FFF!important;
    }
}
#menu .is-opened > .el-submenu__title .el-submenu__icon-arrow{
    color:#fff!important;
}
</style>

<style scoped lang="less">
.search-box {
    width: 90%;
    height: 4rem;
    margin: 0 auto;
    margin-top: 3rem;
    position: relative;
    overflow: hidden;
    margin-bottom: 2rem;
    border: 1px solid #666666;

  /deep/ .el-select {
    width: 30%;
    position: absolute;
    left: 0;
    top: 0;

    .el-input__inner {
        height: 4rem;
        border: 0;
        border-right: 1px solid #DCDFE6;
        border-radius: 0;
        padding: 0 2rem 0 0.5rem;
    }

    .el-input__icon {
      line-height: 4rem;
      font-size: 1rem;
    }
  }

  .search-input {
    width: 100%;
    height: 100%;

    > input {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0 20% 0 35%;
        box-sizing: border-box;
        font-size: 1.2rem;
        outline: none;
    }

    .searchBtn{
        width: 4rem;
        height: 4rem;
        background: #666666;
        display: inline-block;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width: 50%;
            margin: 0 auto;
            display: block;
        }
    }
  }
}
.header_logo {
    height: 7rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 1.5rem;
    border-bottom: 4px solid #acbd30;
    background-color: #fff;

    .el-icon-close {
        color: #777777;
        font-size: 2.8rem;
    }

    a {
        width: 12rem;
    }

    .slide-menu {
        cursor: pointer;
    }
}

/deep/ .langSwitch {
    font-size: 1.5rem;
    color: #106919;
    text-align: center;
    p {
        font-size: 1.5rem;
        display: inline-block;
        color: #fff;
        margin: 0 0.8rem;

        &.active {
            color: #127437;
            font-weight: bold;
        }
    }
}
</style>
