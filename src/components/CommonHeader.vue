<template>
    <header>
        <div class="l-content">
            <el-button icon="el-icon-menu" size='mini' style="margin-right:20px" @click="handleMenu"></el-button>
            <h3 style="#fff">首页</h3>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size='mini'>
            <span class="el-dropdown-link">
                <img class="user" :src="userimg" alt="">
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>
<script>
export default {
   name:'CommonHeader',
   data(){
       return{
           userimg:require('../assets/user1.png')
       }
   },
   methods:{
       handleMenu(){
           this.$store.commit('collapseMenu')
       }
   }
}
</script>
<style lang='less' scoped>
header{
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
}
.l-content{
    display: flex;
    align-content: center;
}
.r-content{
    .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

</style>