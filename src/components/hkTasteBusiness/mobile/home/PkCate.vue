<template>
  <div class="category_box">
    <div class="cateContainer">
      <div class="TitleBg">
        <img src="/images/pc/pcindex_39.png" alt="">
      </div>
        <!-- <div class="category_box_left">
          <h2>{{$t('home.Category')}}</h2>
          <ul v-for="(a,index) in attrCategory" :key="index">
            <li @click="getSelectedAttrs(a)">{{a.Name}}</li>
            <li v-for="(g,index) in a" :key="index"><a :href="'/product/search?key=+&grapeId='+g.Id">{{g.Name}}</a></li>
          </ul>
        </div> -->
    </div>
    <ul class="category_box_right">
      <li v-for="(b,index) in productCate" :key="index">
        <router-link
          :to="'/product/search/-?' + 'catalogs=' + JSON.stringify([b.Id]) + '&type=0'"
        >
        <img :src="b.Img" alt="">
        <p>
          {{b.Name}}
        </p>
        </router-link>
      </li>
      <li>
        <router-link to='/product/search/-'>
        <img src="/images/pc/index_17.jpg" alt="">
        <p>
          Search
        </p>
        </router-link>
      </li>
    </ul>
      <div class="clear"></div>
  </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class PkCate extends Vue {
  // 数组分割处理
  attrCategory = [];
  selectedAttrs: object[] = []; // 选中的产品属性值
  selectedCatalogs: number[] = []; // 选中的产品目录值
  productCate:any[]=[];
  getAttrCategory () {
    var param = {
      id: 4,
      lang: this.$store.state.lang
    };
    this.$Api.prodAttrApi.getById(param).then(result => {
      this.attrCategory = result.AttrValues;
    });
  }
  getSelectedAttrs (val) {
    this.$router.push('/product/search/-?attrs=' + JSON.stringify([{ Id: 4, Vals: [parseInt(val.Id)] }]) + '&type=0');
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
      this.productCate = result[0].Children;
    });
  }
  mounted () {
    this.getAttrCategory();
    this.getProductCate();
  }
}
</script>

<style scoped lang="less">
/*頁面中間目錄*/
ul,li{
    list-style: none;
}
.clear{
    clear: both;
}
.category_box{
  margin-bottom: 4rem;
}
.cateContainer{
    width: 100%;
    // min-height: 45rem;
    // float: left;
    padding-top: 3rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    // background: url(/static/Image/home/categroy.jpg) 0 0 no-repeat;
    background-size: cover;
    .TitleBg{
      margin-bottom: 2rem;
      text-align: center;
      display: flex;
      justify-content: center;
      img{
        width: 80%;
        display: block;
      }
    }
}
.category_box_left {
  width: 85%;
  margin: 0 auto;
}

.category_box_left h2 {
    font-size: 2.5rem;
    margin-bottom: 2.5rem;
    color: #fff;
}
.category_box_left > ul {
  width: 48%;
  float: left;
}
.category_box_left > ul:nth-child(2n){
  margin-right: 4%;
}
.category_box_left > ul > li {
    margin-bottom: 0.5rem;
    color: #FFF;
    font-family: "PingFang", "Microsoft yahei";
    font-size: 1.3rem;
    word-break: break-all;
}
.category_box_left > ul > li > a {
  font-size: 1.3rem;
  line-height: 1.1rem;
  color: #fff;
  font-family: "PingFang";
}
.category_box_right {
  width: 90%;
  margin: 0 auto;
  // float: right;
}
.category_box_right li {
  width: 50%;
  height: 15rem;
  margin-right: 0;
  margin-bottom: 0;
  float: left;
  box-sizing: border-box;
  a {
    display: block;
    border: 1px solid #697689;
    position: relative;
    transition: all 0.3s;
    img{
      width: 100%;
      height: 15rem;
      display: block;
      object-fit: cover;
      object-position: 50% 50%;
    }
    p{
      width: 100%;
      height: 4rem;
      background-color: #112a4d;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      text-transform: uppercase;
      font-size: 1.2rem;
      font-weight: bold;
      // letter-spacing: 3px;
      transition: height 0.3s;
      padding: 0 1.5rem;
      box-sizing: border-box;
    }
  }
  // &:hover{
  //   a{
  //     p{
  //       height: 100%;
  //       background-color: rgba(28, 56, 96, 0.8);
  //       font-size: 36px;
  //       text-transform: height 0.3s;
  //     }
  //   }
  // }
}

</style>
