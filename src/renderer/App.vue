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
import fs from 'fs'

export default {
  name: 'wafer-project',
  components: {
    one
  },
  created() {
    localStorage.setItem('baseUrl', 'http://192.168.6.50:8005')//http://192.168.6.50:8005
  },
  mounted() {
    this.readConfig()
  },
  methods: {
    readConfig() {
      fs.readFile('d:/软件配置文件/jsonConfig.json', 'utf-8', (err, data) => {
        if (err) {
          console.log('文件读取失败', err)
        } else {
          console.log('本地配置：', JSON.parse(data))
          let jsonData = JSON.parse(data)
          console.log('本地配置：', jsonData.config.baseUrl)
          // 保存url
          localStorage.setItem('baseUrl', jsonData.config.baseUrl)//http://192.168.6.50:8005
          localStorage.setItem('machineCode', jsonData.config.machineCode)
          localStorage.setItem('timebtween', jsonData.config.timebtween)
        }
      })
    }
  },
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
