<template>
    <div class="in_pdWindow_page_item" :style="styla" @mouseenter="Enter=true" @mouseleave="Enter=false"  v-if="item">
        <img :src="(item.Image?item.Image:item.Img_L?item.Img_L:item.Img)"   :style="imgStyla" :data-key="item.Sku" @error="loadError"  @click="goUrl(item)"/>
        <div class="fav" v-if="!item.negotiable || item.negotiable==null"><img :src="item.IsFavorite ? '/images/mobile/faved.png': '/images/mobile/unfav.png'" @click.stop="addToFavorite(item)" /></div>
        <div class="in_pdWindow_item_description">
             <router-link :to="'/product/detail/'+item.Sku" class="in_pdWindow_item_title" >{{item.Name}}</router-link >
            <div class="code">{{$t("product.Code")}}: {{item.Code}}</div>
            <!-- <div class="in_pdWindow_item_price" v-if="!item.negotiable || item.negotiable==null">
              <inPrices :primePrices="item.ListPrice" :currentPrices="item.SalePrice" :currency="item.Currency" :DefaultListPrice="item.DefaultListPrice" :DefaultSalePrice="item.DefaultSalePrice" :DefaultCurrency="item.DefaultCurrency" size="small"></inPrices>
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import inButton from '@/components/base/mobile/InsButton.vue';
import inPrices from '@/components/base/mobile/InsPrices.vue';
import YouWouldLike from '@/model/youWouldLike';
import { Vue, Prop, Component } from 'vue-property-decorator';
@Component({ components: { inButton, inPrices } })
export default class InsProductWindow extends Vue {
    private Enter:boolean = false;
    @Prop() private item!:YouWouldLike;
    @Prop() private imgStyla!:string;
    @Prop() private styla!:string;
    get isPtx () {
        if (localStorage.getItem('isPtx') === '0') {
          return false;
        } else {
          return true;
        }
    }
    goUrl (val) {
      window.location.href = '/product/detail/' + val.Sku;
    }
    buttonSubmit (item) {
      this.$router.push({
        path: '/product/detail',
        name: 'ProductsDetail',
        params: {
          id: item.Sku
        }
      });
    }
    addToFavorite (p) {
      if (p.IsFavorite) {
        this.$Api.member.removeFavorite(p.Sku).then((result) => {
          p.IsFavorite = false;
          this.$message({
            message: this.$t('MyFavorite.RemoveSuccess') as string
          });
        });
      } else {
        this.$Api.member.addFavorite(p.Sku).then((result) => {
          if (result.Succeeded) {
            p.IsFavorite = true;
            this.$message({
              message: this.$t('MyFavorite.AddSuccess') as string,
              type: 'success',
              customClass: 'messageboxNoraml'
            });
          } else {
            this.$router.push('/Account/login');
          }
        });
      }
    }
    loadError (e) {
      e.target.src = '/static/Image/proddef.jpg';
    }
}
</script>
<style lang="less">
.in_pdWindow_item_price .currentPricesMain ,.in_pdWindow_item_price .primePricesMain{
  width: 100%;
  display: inline-block;
  text-align: center;
}
.in_pdWindow_item_price .currentPricesMain  .small:nth-child(1) {
  font-size: 1.6rem;
  word-break: break-all;
  text-align: center;
  color: #ca3636;
  display: inline-block;

}
.in_pdWindow_item_price .currentPricesMain .small:nth-child(2) {
    font-size: 1.6rem;
    color: #ca3636;
    display: inline-block;

    margin-left: 5px;
}
.in_pdWindow_item_price .primePricesMain  .small:nth-child(1) {
  font-size: 1.2rem;
  word-break: break-all;
  text-align: center;
  color: #b2b2b2;
  display: inline-block;
  text-decoration: line-through;

}
.in_pdWindow_item_price .primePricesMain .small:nth-child(2) {
    font-size: 1.2rem;
    color: #b2b2b2;
    display: inline-block;

}
</style>
<style lang="less" scoped>
.in_pdWindow_page_item {
  position: relative;
  .fav {
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: .5rem;
    right: .5rem;
    img {
      width: 100%;
    }
  }
}
.in_pdWindow_page_item img {
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  border: 1px solid #afbec3;
  box-sizing: border-box;
  border-radius: 8px;
}
.height_line {
  border: 1px solid black !important;
}
.in_pdWindow_item_title {
    font-size: 1.4rem;
    width: 96%;
    margin: 0 auto;
    text-align: center;
    color: #112a4d;
    line-height: 1.6rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    margin-top: .5rem;
    margin-bottom: .2rem;
    font-weight: bold;

}
.in_pdWindow_item_code {
  margin-top: 1rem;
  color: #999999;
  text-align: center;
}
.in_pdWindow_item_description{
  .code{
    font-size: 1.2rem;
    color: #333333;
    text-align: center;
  }
}
</style>
