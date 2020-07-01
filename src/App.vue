<template>
  <div id="app">
    <div class="main">
      <keep-alive exclude="Detail,Admin,EditPost">
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'App',
      components:{
      }
    }
</script>

<style>
  body {
    background-color: rgb(247, 248, 248);
    margin-top: 2px;
    
  }

  .nav-bar{
    background-color: #fff;
    margin: 0 0 10px 0;
	}

  .main {
    position: absolute;
    left: 7%;
    right: 7%;
  }
</style>
