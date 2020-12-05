<template >
  <div class="backStyle">
    <el-row class="bodyStyle">
      <el-col :span="8"
        style="margin-top:10px;">
        <el-button @click="backTwo()"
          style="margin-left:16px;width:200px;font-size:36px">返回</el-button>
      </el-col>
      <el-col :span="8"
        style="text-align:center;margin-top:10px">
        <el-tag class="titleClass">
          <div style="margin-top:6px;">消费记录</div>
        </el-tag>
      </el-col>
      <el-col :span="8">&nbsp;</el-col>
    </el-row>

    <el-row class="table_border bodyStyle"
      style="margin-top:16px">
      <el-col :span="8"
        class="table_border thead">姓名</el-col>
      <el-col :span="8"
        class="table_border thead">消费时间</el-col>
      <el-col :span="8"
        class="table_border thead">消费金额</el-col>
      <div v-for="(item,index) in jsonFoodData"
        :key="item+index.toString()">
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">杨志强</el-col>
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">{{item.ChooseDate.substr(0,10)}}</el-col>
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">{{item.Price}}元</el-col>
      </div>

    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$ajax = axios

const baseUrl = localStorage.getItem("baseUrl")
axios.defaults.baseURL = baseUrl

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      jsonFoodData: []
    }
  },
  beforeMount() {
    this.getRecord()
  },
  methods: {
    backTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    getRecord2() {
      console.log('发送数据')
      axios.get('/Interface/Common/GetPCStaffOrderMealByCommand.ashx', {
        params: {
          informationNum: '441622198405095176', //this.informationNum,
          Datetime: '2020-08-06'
        }
      }).then(res => {
        this.jsonFoodData = res.data.result
        console.log('clickfun:', res.data.result)
      })
    },
    getRecord() {
      console.log('发送数据')
      axios.get('/Interface/PC/GetPCStaffAlreadyOrderMeal.ashx', {
        params: {
          pcid: '1747', //this.informationNum,
          pageIndex: '1',
          pageSize: '10'
        }
      }).then(res => {
        this.jsonFoodData = res.data.pccsidList
        console.log('clickfun:', res.data.pccsidList)
      })
    }
  }
}
</script>

<style>
.table_border {
  border: 1px solid black;
}
.thead {
  background: white;
  height: 40px;
  text-align: center;
  line-height: 36px;
}
.titleClass {
  font-size: 38px;
  width: 250px;
  height: 50px;
  text-align: center;
  display: inline-block;
}
.backStyle {
  background: rgb(215, 245, 255);
  height: 900px;
}

.bodyStyle {
  width: 80%;
  clear: both;
  display: block;
  margin: auto;
}
</style>