<template>
  <div id="app">
    <!-- <firstPage id="firstPage">
    </firstPage> -->
    <!-- <one></one> -->
    <router-view></router-view>
    <!-- <cookerPage></cookerPage> -->
  </div>
</template>

<script>
import one from '@/components/one'

export default {
  name: 'wafer-project',
  components: {
    one
  }
}

</script>

<style>
#app {
  /* font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB',
        'Microsoft YaHei', Arial, sans-serif; */
  font-family: "微软雅黑";
}
/* CSS */
#firstPage {
  height: 100%;
}
</style>
