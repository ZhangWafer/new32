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
          <div style="margin-top:6px;">充值记录</div>
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
        class="table_border thead">充值金额</el-col>
      <div v-for="(item,index) in jsonFoodData"
        :key="item+index.toString()">
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">{{item.PCStaffName}}</el-col>
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">{{item.AmountDate.substr(0,10)}}</el-col>
        <el-col :span="8"
          class="table_border thead"
          :style="index%2==0?'background:#dcdbdb!important;':'background:white'">{{item.Amount}}元</el-col>
      </div>

    </el-row>
    <div style="text-align:center;margin-top:20px">
      <!-- <el-pagination @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="totalNum">
      </el-pagination> -->
    </div>

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
      jsonFoodData: [],
      currentPage: 0,
      totalNum: 0,
      pageSize: 15
    }
  },
  beforeMount() {
    this.getRecord(this.currentPage)
  },
  methods: {
    handleCurrentChange() {
      console.log('当前选中页：', this.currentPage)
      this.getRecord(this.currentPage)
    },
    backTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    async getPcid() {
      let infoNum = localStorage.getItem("InformationNum")
      let resData = await axios.get('/Interface/Common/GetStaff.ashx', {
        params: {
          informationNum: infoNum
        }
      })
      return resData.data.pcInfo.Id
    },
    async getRecord2() {
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      console.log('发送数据')
      let getPcidNum = getPcid()
      axios.get('/Interface/Common/GetPCStaffOrderMealByCommand.ashx', {
        params: {
          informationNum: getPcidNum, //this.informationNum,
          Datetime: dateStr
        }
      }).then(res => {
        this.jsonFoodData = res.data.result
        console.log('clickfun:', res.data.result)
      })
    },
    async getRecord(currentPage) {
      //拼接日期
      var nowDate = new Date();
      var year = nowDate.getFullYear();
      var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      var dateStr = year + "-" + month + "-" + day;
      /////////////////
      console.log('发送数据')
      let getPcidNum = await this.getPcid()
      axios.get('/Interface/PC/GetPCDeposit.ashx', {
        params: {
          pcid: getPcidNum, //this.informationNum,
        }
      }).then(res => {
        this.jsonFoodData = res.data.DepositList
        this.totalNum = res.data.total
        console.log('clickfun:', res.data.DepositList)
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