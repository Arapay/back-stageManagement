<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<style>
    *{
      padding: 0;
      margin: 0;
    }
    #app{
      height: 100vh;
    }
</style>
<script>
export default{
  name:'app',
  data(){
    return{aaa:1}
  }
}
</script>



