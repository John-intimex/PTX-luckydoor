<template>
<div>
    <p class="pls">{{$t('Cms.PlsChoose')}}</p>
    <ul class="cmsList">
        <li v-for="(cms,index) in cmsData" :key="index">
            <router-link :to="'/cms/content/'+cms.Id">{{cms.Title}}</router-link>
        </li>
    </ul>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCatLayout2 extends Vue {
    @Prop({ default: () => [] }) private cmsData!: object[]; // cms内容数据
}
</script>

<style scoped lang="less">
.pls {
    margin-bottom: 20px;
}

.cmsList {
    li {
        font-size: 16px;
        margin-bottom: 15px;

        a {
            padding: 5px;
            color: #535353;
            display: inline-block;
            text-decoration: underline;
        }

        &:hover {
            a {
                color: @base_color;
            }
        }
    }
}
</style>
