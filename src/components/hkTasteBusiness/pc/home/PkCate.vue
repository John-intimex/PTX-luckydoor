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
      <li class="position">
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
  productCate: any[] = [];
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
    this.$router.push(
      '/product/search/-?attrs=' +
        JSON.stringify([{ Id: 4, Vals: [parseInt(val.Id)] }]) +
        '&type=0'
    );
  }
  getProductCate () {
    this.$Api.product.getAttrList().then(result => {
      this.productCate = result[0].Children;
      console.log(this.productCate, 'this.productCate');
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
ul,
li {
  list-style: none;
}
.clear {
  clear: both;
}
.category_box {
  width: 1200px;
  margin: 0 auto;
  padding-top: 80px;
  padding-bottom: 48px;
  // overflow: hidden;

  .TitleBg{
    text-align: center;
    margin-bottom: 42px;
  }
}
.category_box a {
  color: #fff;
}
.category_box_left {
  width: 25%;
  height: 0;
  float: left;
  padding-bottom: 36.58%;
  padding-left: 2%;
  box-sizing: border-box;
  background: url('/static/Image/home/index03.jpg') 0 0 no-repeat;
  background-size: cover;
}
.category_box_left h2 {
  font-size: 1.9vw;
  margin-top: 10%;
  margin-bottom: 5%;
  color: #fff;
  font-family: "FuturaNext";
}
.category_box_left > ul {
  width: 45%;
  float: left;
}
.category_box_left > ul > li {
  width: 100%;
  height: 0;
  padding-bottom: 20%;
}
.category_box li{
    color: #fff;
    cursor: pointer;
}
.category_box_left > ul > li  {
  font-size: 1vw;
  font-family: "PingFang";
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.category_box_right {
  width: 100%;
  // float: right;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  height: 688px;
}
.category_box_right li {
  width: 400px;
  height: 344px;
  // margin-right: 28px;
  // margin-bottom: 38px;
  float: left;
  box-sizing: border-box;
  // background-color: red;
  &:nth-child(3n){
    margin-right: 0;
  }
  a {
    display: block;
    border: 2px solid #fff;
    position: relative;
    transition: all 0.3s;
    img{
      width: 100%;
      height: 340px;
      display: block;
      object-fit: cover;
      object-position: 50% 50%;
    }
    p{
      width: 100%;
      height: 60px;
      background-color: #112a4d;
      color: #fff;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      left: 0;
      bottom: 0;
      // text-transform: uppercase;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 3px;
      transition: height 0.3s;
    }
  }
  &:hover{
    a{
      p{
        height: 100%;
        background-color: rgba(28, 56, 96, 0.8);
        font-size: 36px;
        text-transform: height 0.3s;
      }
    }
  }
  &.position{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  &:nth-child(1){
    position: absolute;
    top: 0;
    right: 0;
  }
  &:nth-child(2){
    position: absolute;
    bottom: 0;
    right: 0;
  }
  &:nth-child(3){
        position: absolute;
    bottom: 0;
    left: 0;
  }
  &:nth-child(4){
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  &:nth-child(5){
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
