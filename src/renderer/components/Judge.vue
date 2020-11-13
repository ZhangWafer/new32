<template>
  <div>
    <h1>点评</h1>

    <el-button @click="getFoodFun()">获取</el-button>
    <el-button @click="backTwo()">back</el-button>
    <el-row>
      <el-col :span='12'
        v-for="item in foodList"
        :key="item">
        <el-card>
          <img :src="urlPic('0f639b24-e94e-4628-99fd-a8c996b6713a.jpg')"
            class="image">
          <div style="padding: 14px;">
            <span>{{item+'--'+foodMap[item]}}</span>
            <div class="bottom clearfix">
              <el-row>
                <el-col :span="12"
                  class="col-Style">
                  <el-button type="success"
                    class="button itemStyle">点赞</el-button>
                </el-col>
                <el-col :span="12"
                  class="col-Style">
                  <el-button type="danger"
                    class="button itemStyle">差评</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

Vue.prototype.$ajax = axios

axios.defaults.baseURL = 'http://localhost:7878'

export default {
  data() {
    return {
      currentDate: new Date(),
      foodList: [],
      foodMap: {}
    }
  },
  methods: {
    backTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    getFoodFun() {
      axios.get('/Interface/Common/GetPCStaffOrderMealByCommand.ashx', {
        params: {
          informationNum: '441622198405095176', // this.informationNum,
          Datetime: '2020-09-14'
        }
      }).then(res => {
        // CookbookInfos
        res.data.result.forEach(element => {
          const foodtemp = element.CookbookInfos
          foodtemp.forEach(foodItem => {
            this.$set(this.foodMap, foodItem.Name, foodItem.Id)
          })

          this.foodList.push(...foodtemp)
        })
        this.foodList = Object.keys(this.foodMap)
        console.log('clickfun:', Object.getOwnPropertyNames(this.foodMap))
      })
    }
  },
  computed: {
    urlPic(picName) {
      return function (picName) {
        return 'http://localhost:7878/Files/Cookbook/' + picName
      }
    },
    foodlistHandle() {
      return new Set(this.foodList)
    }
  }
}
</script>

<style>
.col-Style {
  text-align: center;
}

.itemStyle {
  display: inline-block;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  width: 180px !important;
  height: 80px !important;
  padding: 0;
  float: none;
  font-size: 20px;
  width: 60px;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>