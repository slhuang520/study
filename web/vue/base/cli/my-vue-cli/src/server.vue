<template>
  <div>
    <app-server-status></app-server-status>
    <app-server-status></app-server-status>
  </div>
</template>

<script>
  import serverStatus from './components/server/serverStatus';
  export default {
    components: {
      'app-server-status': serverStatus
    }
  };
</script>

<style>

</style>
