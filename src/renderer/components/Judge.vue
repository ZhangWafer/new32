<template>
  <div style="background:rgb(215, 245, 255)">
    <h1>点评</h1>
    <el-select v-model="selectValue"
      placeholder="请选择"
      @change="selectChange(selectValue)">
      <el-option v-for="(item,index) in foodList"
        :key="index"
        :label="mealToCHN(item.CookbookSetInDateInfo.CookbookEnum)+'-消费订单号'+item.OrderMealId"
        :value="item.OrderMealId">
      </el-option>
    </el-select>
    <el-button @click="getFoodFun()">获取</el-button>
    <el-button @click="backTwo()">back</el-button>
    <el-button @click="commitFun()">投票</el-button>
    <el-row>
      <el-col :span='12'
        v-for="(item,index) in selectedFoodLsit"
        :key="index"
        style="margin-bottom:12px">
        <el-card class="cardStyle">
          <img :src="urlPic(item.Icon)"
            class="image">
          <div style="padding: 14px;text-align:center;font-size:36px;">
            <span>{{item.Name}}</span>
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
      selectedFoodLsit: [],
      foodMap: {},
      selectValue: ''
    }
  },
  methods: {
    backTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    commitFun() {
      //http://localhost:7028/Interface/Common/CookbookComment.ashx
      const postData = {
        InformationNum: '442828196211120012',
        CookbookSetInDateId: '1',
        OrderMealId: '2',
        Comments: [{
          cookbookId: '199',
          commentEnum: 'Satisfactory'
        }, {
          cookbookId: '332',
          commentEnum: 'Unsatisfactory',
          commentItem: '2'
        }]
      }
      axios.post('/Interface/Common/CookbookComment.ashx', postData).then(res => {
        console.log('postRes', res)
        this.$message({
          message: '评价成功',
          type: 'success'
        })
      })
    },
    //选择变化触发
    selectChange(selectValue) {
      console.log('当前选择' + selectValue)

      this.selectedFoodLsit = this.foodList.filter((item => item.OrderMealId === selectValue))[0].CookbookInfos

      console.log('内容' + JSON.stringify(this.selectedFoodLsit))
    }
    ,
    getFoodFun() {
      axios.get('/Interface/Common/GetPCStaffOrderMealByCommand.ashx', {
        params: {
          informationNum: '441622198405095176', //this.informationNum,
          Datetime: '2020-09-14'
        }
      }).then(res => {
        this.foodList = res.data.result
        console.log('resresres', this.foodList)
        //CookbookInfos
        //res.data.result.forEach(element => {
        //const foodtemp = element.CookbookInfos
        //foodtemp.forEach(foodItem => {
        //this.$set(this.foodMap, foodItem.Name, foodItem.Id + '%%' + foodItem.Icon)
        //})
        //})

        ////把map塞进list
        //for (var key in this.foodMap) {
        //this.foodList.push({ 'id': this.foodMap[key].split('%%')[0], 'icon': this.foodMap[key].split('%%')[1], 'name': key })
        //}

        //console.log('clickfun:', this.foodList)
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
    },
    mealToCHN(mealName) {
      return function (mealName) {
        let returnName = ''
        switch (mealName) {
          case 'Breakfast':
            returnName = '早餐'
            break;
          case 'Lunch':
            returnName = '午餐'
            break;
          case 'Supper':
            returnName = '晚餐'
            break;
          default:
            break;
        }
        return returnName
      }

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