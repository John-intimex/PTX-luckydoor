<template>
    <div class="cms-list">
        <ul>
            <li v-for="(cms,index) in cmsData" :key="index">
                <router-link :to="'/cms/content/'+cms.Id">
                    <div class="cover">
                        <img :src="cms.Cover" alt=""/>
                    </div>
                    <div class="introduce">
                        <p class="title">{{cms.Title}}</p>
                        <p class="createDate">{{cms.CreateDate}}</p>
                        <p class="desc">{{cms.Desc}}</p>
                        <p class="viewMore"><span>{{$t('Message.ViewDetail')}}</span></p>
                    </div>
                </router-link>
            </li>
        </ul>

        <div class="pager" v-if="pager.totalRecord > pager.pageSize">
            <ins-page :total="pager.totalRecord" v-model="pager.currentPage" :pageNum="pager.pageSize"></ins-page>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    InsPage: () => import('@/components/base/pc/InsPage.vue')
  }
})
export default class InsCatLayout1 extends Vue {
    @Prop({ default: () => [] }) private cmsData!: object[]; // cms内容列表数据
    @Prop({ default: () => {} }) private pager!: object; // 分頁器數據
}
</script>

<style scoped lang="less">
.cms-list {
    ul{
        display: flex;
        flex-wrap: wrap;

        >li{
        width: 23%;
        margin-right: 2.66%;
        margin-bottom: 2.66%;
        &:nth-child(4n){
            margin-right: 0%!important;
        }
        a{
            display:block;
            border:1px solid #eee;
            transition: all .3s ease;
        -o-transition: all .3s ease;
        -webkit-transition: all .3s ease;
        -moz-transition: all .3s ease;
            &:hover{
            border:1px solid  @base_color;
            .introduce{
                .title{
                color: @base_color;
                }
            }
            }
        }
        .introduce{
            width: 90%;
            margin: 0 auto;
            padding-bottom: 20px;
            .title{
            font-size:18px;
            padding-bottom: 10px;
            border-bottom: 1px solid #eee;
            color:#484848;
            margin-bottom: 10px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 40px;
            margin-top: 20px;
            }
            .createDate{
            font-size: 16px;
            color:#000000;
            padding-bottom: 10px;
            }
            .desc{
            font-size: 14px;
            color:#000000;
            margin-bottom: 40px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            max-height: 36px;
            }
            .viewMore{
            text-align: center;
            display: inline-block;
            width: 100%;
            span{
                padding: 5px 20px;
                background: @base_color;
                display: inline-block;
                color:#fff;
            }
            }
        }
        .cover{
            width: 100%;
            img{
            width: 100%;
            }
        }
        }
    }
}
</style>
