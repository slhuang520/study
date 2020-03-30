<template>
  <div class="col-xs-12 col-sm-6">
    <ul class="list-group">
      <li class="list-group-item"
          style="cursor: pointer;"
          :key="index"
          v-for="index in 5"
          data-toggle="tooltip"
          :title="index"
          :class="{striped: index % 2 == 0}">
        服务器{{index}}
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    mounted: function () {
      $('[data-toggle="tooltip"]').tooltip();
    }
  };
</script>

// scoped 表示局部的 css
<style lang="scss" scoped>
  .striped {
    background-color: #f6f6f630;
  }
</style>
