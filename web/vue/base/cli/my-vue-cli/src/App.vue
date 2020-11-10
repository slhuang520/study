<template>
  <div class="container">
    <app-header></app-header>
    <hr>
    <div class="row">
      <app-server></app-server>
      <app-server-status></app-server-status>
    </div>
    <hr>
    <app-footer></app-footer>
  </div>
</template>

<script>
 // import $ from 'jquery'; // 这里可以不用再引入了
  import serverStatus from './components/server/serverStatus.vue';
  import server from './components/server/server.vue';
  export default {
    components: { // 定义局部组件
      'app-server': server,
      'app-server-status': serverStatus
    }
  };
  $(function () {
    //alert(2222);
  });
</script>
