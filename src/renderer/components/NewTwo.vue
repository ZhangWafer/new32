<template>
  <div>
    <el-container>
      <el-main>
        <el-row style="height:900px">
          <el-col :span="20">
            <el-carousel :interval="5000"
              height="800px"
              arrow="always">
              <el-carousel-item v-for="item in [0,1]"
                :key="item">
                <el-image style="width: 100%; height:100%"
                  :src="imgUrl[item]"
                  fit="cover"></el-image>
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="4"
            style="height:800px;">
            <el-row style="height:50%;display: flex;">
              <el-button type="primary"
                style="display:inline-block;font-size:70px;width:100%;height:100%;align-self:center"
                class="bigButton"
                @click="gotoPaiCan()">
                <h3>排餐</h3>
              </el-button>
            </el-row>
            <el-row style="height:50%;display: flex;">
              <el-button type="success"
                style="display:inline-block;font-size:70px;width:100%;height:100%;align-self:center"
                class="bigButton"
                @click="goTwo()">
                <h3>智慧</h3>
                <h3>饭堂</h3>
              </el-button>
            </el-row>
          </el-col>

        </el-row>

      </el-main>
    </el-container>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
Vue.prototype.$ajax = axios

export default {
  data: function () {
    return {
      testValue: false,
      imgUrl: [require('d:/img/1.jpg'), require('d:/img/2.jpg')],
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down']
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
    testMethod() {
      console.log('66666666666')
    },
    goTwo(event) {
      this.$router.push({
        path: '/two'
      })
      console.log(this)
    },
    gotoPaiCan() {
      window.location.href = 'http://www.baidu.com'
      window.open()
    }
  }
}
</script>

<style>
.backgroundClass {
  background: url("../img/278010.jpg") no-repeat;
  height: 900px;
  background-size: 100% 100%;

  /* filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  -khtml-opacity: 0.5;
  opacity: 0.5;
  width: 100%;
  height: 900px;
  position: absolute;
  background: url("../img/278010.jpg") no-repeat;
  background-attachment: fixed; */
}

.bigButton {
  height: 38%;
  width: 80%;
}

/* 毛玻璃 */
.pub-position {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.glass-wrap {
  width: 325px;
  height: 185px;
  margin: 200px auto;
  background: url("../img/278010.jpg") no-repeat;
  background-size: contain;
  position: relative;
}
.word-wrap,
.content {
  width: 200px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  overflow: hidden;
  color: #fff;
}
/* 这里使用同级元素解决文字容器做滤镜被覆盖的问题 */
.word-wrap::before {
  content: "";
  width: 325px;
  height: 185px;
  position: absolute;
  left: -10px; /* 这个值影响背景图片的位置 */
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  filter: blur(10px);
  background: url("../img/278010.jpg") no-repeat;
  background-size: contain;
}
</style>