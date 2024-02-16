<template>
    <div class="accordion_warrper">
        <el-collapse v-model="activeNames" :value="[0]">
        <el-collapse-item v-if="contents.Detail" :title="$t('product.detail')" name="1" class="accordion_title">
            <div class="accordion_content" v-html="contents.Detail"></div>
        </el-collapse-item>
        <el-collapse-item v-if="contents.Specification" :title="$t('product.overView')" name="2" class="accordion_title">
            <div class="accordion_content" v-html="contents.Specification"></div>
        </el-collapse-item>
        <el-collapse-item v-if="contents.OverView" :title="$t('product.specification')" name="3" class="accordion_title">
            <div class="accordion_content" v-html="contents.OverView"></div>
        </el-collapse-item>
        <el-collapse-item v-if="slotF" :title="slotTitle" name="4" class="accordion_title">
            <slot></slot>
        </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import Tab from '@/model/Tab';
@Component
export default class InsAccordion extends Vue {
    @Prop({ default: new Tab('none') }) private contents!:Tab;
    @Prop({ default: false }) private slotF!:boolean;
    @Prop({ default: '' }) private slotTitle!:string;
    private activeNames:string[] = ['1'];
}
</script>
<style lang="less">
.accordion_title .el-collapse-item__header{
    padding: 0 1rem 0 2rem;
    font-size: 1.5rem;
    background-color: @primary_color2;
    color: white;
}
</style>
<style scoped>
.accordion_warrper{
    margin-top: 4rem;
}
div{
    text-align: left;
}
.accordion_content{
    padding: 0 1rem 0 2rem;
}
</style>
