<template>
  <div style="background:rgb(215, 245, 255)">
    <el-container>
      <el-header style="background:#409eff;">
        <el-row>
          <el-col :span="8">
            <h1></h1>
          </el-col>
          <el-col :span="8"
            style="text-align:center">
            <el-tag effect="dark"
              style="font-size:40px;margin-top:10px;display:inline-block;width:200px;height:42px;text-align:center;line-height:36px">
              智慧饭堂
            </el-tag>
          </el-col>
          <el-col :span="8">
            <h1></h1>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row style="margin-top:80px">
          <el-col :span=8
            style="text-align:center;height:600px">
            <el-button type="success"
              round
              style="display:inline-block;font-size:90px;height:500px"
              class="bigButton"
              @click="goRecord()">
              消费记录
            </el-button>
          </el-col>
          <el-col :span=8
            style="text-align:center;height:600px">
            <el-button type="warning"
              round
              style="display:inline-block;font-size:90px;height:500px"
              class="bigButton"
              @click="goCZRecord()">
              充值记录
            </el-button>
          </el-col>
          <el-col :span=8
            style="text-align:center;height:600px;">
            <el-button style="display:inline-block;font-size:90px;height:500px"
              round
              type="primary"
              class="bigButton"
              @click="goJudge()">
              菜品点评
            </el-button>
          </el-col>

        </el-row>
        <!-- 点餐进入窗口 -->
        <el-dialog title="自助点餐系统"
          :visible.sync="dialogVisible"
          width="30%"
          :show-close="false"
          center
          :close-on-click-modal='false'
          :close-on-press-escape='false'>
          <el-row style="text-align:center;font-size:18px;">
            点击按钮进入点餐
          </el-row>
          <span slot="footer"
            class="dialog-footer">
            <el-row>
              <el-col :span="24">
                <el-button type="primary"
                  style="width:80%  "
                  @click="enterJudge()">
                  进入
                </el-button>
              </el-col>

            </el-row>
          </span>
        </el-dialog>
      </el-main>
      <el-footer style="background:rgba(255, 23, 23, 0.82);">
        <el-button @click="goOne()"
          class="backBtn"
          type="danger">返回</el-button>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { mapState } from 'vuex'

const baseUrl = localStorage.getItem("baseUrl")
axios.defaults.baseURL = baseUrl
Vue.prototype.$ajax = axios

export default {
  data: function () {
    return {
      testValue: false,
      dialogVisible: true,
    }
  },
  created: function () {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },
  updated() {
    console.log('updated')
  },
  watch: {
    allsum() {
      console.log('al1sum变了！！！')
    }
  },
  methods: {
    enterJudge() {
      axios.get('/Interface/Common/GetFaceDeviceLogBySN.ashx', { params: { 'sn': 'C02' } }).then(res => {
        console.log('人脸数据！:', res.data)
        localStorage.setItem("InformationNum", res.data.faceDeviceLog[0].InformationNum)
        localStorage.setItem("Name", res.data.faceDeviceLog[0].Name)
        //30s判断

        this.dialogVisible = false

        this.$message({
          dangerouslyUseHTMLString: true,
          message: '<strong style="color:black;font-size:36px;">' + res.data.faceDeviceLog[0].Name + '您好！欢迎进入！</strong>'
        });
      })
    },
    testMethod() {
      console.log('66666666666')
    },
    goRecord(event) {
      this.$router.push({
        path: '/record'
      })
      console.log(this)
    },
    goCZRecord(event) {
      this.$router.push({
        path: '/czrecord'
      })
      console.log(this)
    },
    goJudge(event) {
      this.$router.push({
        path: '/judge'
      })
      console.log(this)
    },
    goOne(event) {
      this.$router.push({
        path: '/'
      })
      console.log(this)
    }
  },
  computed: {
    ...mapState(['count'])
  }

}
</script>

<style>
.backBtn {
  width: 100%;
  height: 100%;
  background: rgba(255, 23, 23, 0.82);
  color: white;
  border: none;
  font-size: 36px;
  font-weight: bold;
}
</style>