<template>
  <div style="background:rgb(215, 245, 255)">
    <div style="text-align:center">
      <h1>菜品点评</h1>
    </div>
    <div style="text-align:center">
      <el-select v-model="selectValue"
        placeholder="请选择"
        @change="selectChange(selectValue)">
        <el-option v-for="(item,index) in foodList"
          :key="index"
          :label="mealToCHN(item.CookbookSetInDateInfo.CookbookEnum)+'-消费订单号'+item.OrderMealId"
          :value="item.OrderMealId">
        </el-option>
      </el-select>
    </div>
    <div style="text-align:center;margin-top:20px;">
      <!-- <el-button @click="getFoodFun()">获取</el-button> -->
      <el-button @click="backTwo()">返回上一页</el-button>
      <el-button @click="commitFun()">投票</el-button>
    </div>

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
                    class="button itemStyle"
                    :disabled="buttonBoolArray[index]"
                    @click="disableButtonFunGood(index)">点赞<i v-if="buttonBoolArray[index]"
                      class="el-icon-check"></i></el-button>
                </el-col>
                <el-col :span="!buttonBoolArray[index]?0:12"
                  class="col-Style">
                  <el-button type="danger"
                    class="button itemStyle"
                    :disabled="!buttonBoolArray[index]"
                    v-if="buttonBoolArray[index]"
                    @click="disableButtonFunBad(index)">差评<i v-if="!buttonBoolArray[index]"
                      class="el-icon-check"></i></el-button>
                </el-col>
                <el-col :span="!buttonBoolArray[index]?12:0"
                  class="col-Style">
                  <el-col :span="20">
                    <el-select v-model="badSelectedArray[index]"
                      placeholder="差评选项"
                      v-if="!buttonBoolArray[index]"
                      style="margin-top:20px"
                      @change="changeBadSelect(item.Id,badSelectedArray[index])">
                      <el-option v-for="itemBad in badSelectOptions"
                        :key="itemBad.Id"
                        :label="itemBad.Name"
                        :value="itemBad.Id">
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2">
                    <i v-if="!buttonBoolArray[index]"
                      style="margin-top:20px"
                      class="el-icon-check"></i>
                  </el-col>

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

const baseUrl = localStorage.getItem("baseUrl")

axios.defaults.baseURL = baseUrl

export default {
  data() {
    return {
      currentDate: new Date(),
      foodList: [],
      selectedFoodLsit: [],
      foodMap: {},
      selectValue: '',
      buttonBoolArray: [],
      badSelectOptions: [],//差评选择项
      badSelectedArray: [],//差评选中绑定值
      commitResMap: {}
    }
  },
  beforeMount() {
    console.log(666666)
    localStorage.setItem("InformationNum", "442828196211120012")
    this.getFoodFun()
  },
  methods: {
    backTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    //差评方法
    changeBadSelect(foodId, badChooseId) {
      console.log('进来this.badSelectedArray', this.badSelectedArray)
      //差评json对象
      let tempJsonBad = {
        "cookbookId": foodId,
        "commentEnum": "Unsatisfactory",
        "commentItem": badChooseId
      }
      this.$set(this.commitResMap, foodId, tempJsonBad)
      console.log('差评之后的map', this.commitResMap)
    },
    disableButtonFunGood(BtnIndex) {
      this.$set(this.buttonBoolArray, BtnIndex, true)
    },
    disableButtonFunBad(BtnIndex) {
      this.$set(this.buttonBoolArray, BtnIndex, false)
    },
    //提交方法
    commitFun() {
      let commitInfoNum = localStorage.getItem("InformationNum")//身份证
      let cookbookSetInDateId = localStorage.getItem("CookbookSetInDateId")//当前餐次id
      //http://localhost:7028/Interface/Common/CookbookComment.ashx
      //做评论数组的jsondata
      let judgeArrayTemp = []
      // this.commitResMap.map((item, index) => {
      //   judgeArrayTemp.push(item)
      // })
      for (var key in this.commitResMap) {
        judgeArrayTemp.push(this.commitResMap[key])
      }
      const postData = {
        InformationNum: commitInfoNum,
        CookbookSetInDateId: cookbookSetInDateId,
        OrderMealId: this.selectValue.toString(),//转字符
        Comments: judgeArrayTemp
      }
      axios.post('/Interface/Common/CookbookComment.ashx', postData).then(res => {
        console.log('postRes', res)
        this.$message({
          message: '评价成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            path: '/two'
          })
        }, 1500);
      })


    },
    //选择变化触发
    selectChange(selectValue) {
      //情况选择内容
      this.buttonBoolArray = []
      console.log('当前选择' + selectValue)
      this.selectedFoodLsit = this.foodList.filter((item => item.OrderMealId === selectValue))[0].CookbookInfos
      //创建默认button可用disable标志位
      this.selectedFoodLsit.forEach((item) => {
        this.buttonBoolArray.push(true)
        //默认都是好评
        let tempJsonGood = {
          "cookbookId": item.Id,
          "commentEnum": "Satisfactory"
        }
        this.$set(this.commitResMap, item.Id, tempJsonGood)
      })
      console.log("this.commitResMap", this.commitResMap)
      console.log('内容222222' + JSON.stringify(this.selectedFoodLsit))
    }
    ,
    getFoodFun() {
      //获取菜品差评选项
      axios.get('/Interface/Common/GetCookbookCommentItem.ashx').then((res) => {
        res.data.Items.forEach(element => {
          this.badSelectOptions.push(element)
        })
      }
      )
      //获取菜品请求
      axios.get('/Interface/Common/GetPCStaffOrderMealByCommand.ashx', {
        params: {
          informationNum: '441622198405095176', //this.informationNum,
          Datetime: '2020-09-14'
        }
      }).then(res => {
        this.foodList = res.data.result
        console.log('resresres', this.foodList)
        //保存cookbooksetindateId
        if (this.foodList.length != 0) {
          localStorage.setItem("CookbookSetInDateId", res.data.result[0].CookbookSetInDateInfo.Id)
        }


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

.buttonCss2 {
  width: 180px !important;
  height: 80px !important;
  padding: 0;
  float: none;
  font-size: 20px;
  width: 60px;
  background: black !important;
}

.image {
  width: 70%;
  height: 260px;
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