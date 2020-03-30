<template>
  <div class="col-xs-12 col-sm-6">
    <p>服务器状：{{statusStr}}</p>
    <hr>
    <button @click="changeStatus">转换</button>
  </div>
</template>

<script>
  export default {
    computed: {
      statusStr: function () {
        return this.status ? '运行中' : '结束';
      }
    },
    data () {
      return {
        status: true
      };
    },
    methods: {
      changeStatus: function () {
        this.status = !this.status;
      }
    }
  };
</script>

<style></style>
