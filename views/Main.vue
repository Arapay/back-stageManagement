<template>
    <el-container style="height:100%">
    <common-aside></common-aside>
    <el-container>
        <el-header>
            <common-header/>
        </el-header>
        <el-main>
           <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>
<script>
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from '../src/components/CommonHeader.vue'
export default {
    components: { CommonAside,CommonHeader },
    name:'Home',
    
    data(){
        return{}
    }
}
</script>
<style lang='less' scoped>
.el-header{
    background-color: #333;
}
.el-main{padding-top:0 ;}
</style>