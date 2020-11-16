<template>
  <div style="background:rgb(215, 245, 255)">
    <h1>点评</h1>

    <el-button @click="getFoodFun()">获取</el-button>
    <el-button @click="backTwo()">back</el-button>
    <el-row>
      <el-col :span='12'
        v-for="item in foodList"
        :key="item"
        style="margin-bottom:12px">
        <el-card class="cardStyle">
          <img :src="urlPic(item.icon)"
            class="image">
          <div style="padding: 14px;">
            <span>{{item.id+'--'+item.name}}</span>
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

const baseUrl = 'http://localhost:7878'

axios.defaults.baseURL = baseUrl

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
          informationNum: '441622198405095176', //this.informationNum,
          Datetime: '2020-09-14'
        }
      }).then(res => {
        console.log('resresres', res)
        //CookbookInfos
        res.data.result.forEach(element => {
          const foodtemp = element.CookbookInfos
          foodtemp.forEach(foodItem => {
            this.$set(this.foodMap, foodItem.Name, foodItem.Id + '%%' + foodItem.Icon)
          })
        })

        //把map塞进list
        for (var key in this.foodMap) {
          this.foodList.push({ 'id': this.foodMap[key].split('%%')[0], 'icon': this.foodMap[key].split('%%')[1], 'name': key })
        }

        console.log('clickfun:', this.foodList)
      })
    }
  },
  computed: {
    urlPic(picName) {
      return function (picName) {
        return baseUrl + '/Files/Cookbook/' + picName
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
  width: 70%;
  height: 300px;
  clear: both;
  display: block;
  margin: auto;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.cardStyle {
  width: 80%;
  clear: both;
  display: block;
  margin: auto;
}
</style>