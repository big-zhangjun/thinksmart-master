<template>
  <div class="container">
    <div class="header">
      <div class="headerContent">
        <head_logo></head_logo>
        <div class="navContainer"></div>
      </div>
    </div>
    <div class="content">
      <div class="room" id="room">
        <div class="subTitle">
          <h6 v-html="title"></h6>
        </div>
        <div class="wrap">
          <!-- 左侧操作区 -->
          <div class="left-wrap">
            <ul class="tab">
              <li
                v-for="(item, index) in navList"
                @click="handleClick(index)"
                :key="index"
                :class="[{ active: index === navIndex }]"
              >
                <img
                  :src="navIndex === index ? item.iconA : item.icon"
                  alt=""
                  srcset=""
                />
                <span>{{ item.name }}</span>
              </li>
            </ul>
            <div class="device-container">
              <div class="scroll">
                <van-radio-group
                  v-model="deviceList[navIndex].value"
                  @change="changeFn"
                >
                  <ul>
                    <li
                      v-for="(item, index) in productList[navIndex]"
                      :key="index"
                    >
                      <van-radio
                        :name="item.radioValue"
                        :disabled="index > 0 ? true : false"
                        @click="deviceClick"
                      ></van-radio>
                      <img :src="item.pic" alt="" srcset="" />
                      <div class="name">
                        {{ item.name }}
                      </div>
                    </li>
                  </ul>
                </van-radio-group>
              </div>
            </div>
          </div>
          <div class="roomContent">
            <div class="imgBox">
              <img class="baseImg" src="../assets/img/room.png" />
              <img
                :src="item.url"
                v-for="(item, index) in imageList"
                :key="index"
                v-show="deviceList[index].isShow && deviceList[index].value"
                style="pointer-events: none; z-index: 90"
                z-index="90"
                class="devideImg"
              />

              <div
                class="point"
                v-for="(item, _index) in pointList[navIndex]"
                :key="item.x"
                :style="{ left: item.x + 'rem', top: item.y + 'rem' }"
                v-show="item.show && deviceList[navIndex].value != false"
                @click="clickIcon(_index, item)"
              >
                <p>{{ item.text }}</p>
                <img
                  src="../assets/img/ee82e5250f8ed26a7e9f4a94900598a.png"
                  alt=""
                />
              </div>
            </div>
            <div class="submit" :class="{disable}" @click="next">Submit</div>
          </div>
        </div>
      </div>
      <!-- <div class="device">
        <div class="deviceList">
          <van-radio-group v-model="selectDivice">
            <ul>
              <li v-for="(item, index) in productList[navIndex]" :key="index">
                <van-radio
                  :name="item.radioValue"
                  :disabled="index > 0 ? true : false"
                  @click="deviceClick"
                ></van-radio>
                <div class="divicePic">
                  <img :src="item.pic" alt="" srcset="" />
                </div>
                <div class="name">
                  {{ item.name }}
                </div>
              </li>
            </ul>
          </van-radio-group>
        </div>
        <div class="btnContainer">
          <div class="back" @click="backStep"></div>
          <div :class="go_next ? 'next' : 'next1'" @click="next">
            {{ step == 4 ? "Complete" : "Next" }}
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import head_logo from "@/components/head_logo.vue";
//import { SVG } from "@svgdotjs/svg.js";
export default {
  data() {
    return {
      selectDivice: "",
      active: 0,
      navList: [
        {
          name: "System",
          icon: require("../assets/img/system_icon_default.svg"),
          iconA: require("../assets/img/system_icon_selected.svg")
        },
        {
          name: "Audio Device",
          icon: require("../assets/img/audio_icon_default.svg"),
          iconA: require("../assets/img/audio_icon_selected.svg")
        },
        {
          name: "Video Device",
          icon: require("../assets/img/video_icon_ default.svg"),
          iconA: require("../assets/img/video_icon_ selected.svg")
        },
        {
          name: "Accessories",
          icon: require("../assets/img/accessories_icon_default.svg"),
          iconA: require("../assets/img/accessories_icon_selected.svg")
        }
      ],
      deviceList: [
        { value: "", idx: 0 },
        { value: "", idx: 1 },
        { value: "", idx: 2 },
        { value: "", idx: 3 }
      ],
      productList: [
        [
          {
            name: "ThinkSmart Core",
            radioValue: 1,
            pic: require("../assets/img/12.jpg")
          },
          {
            name: "ThinkSmart Hub 500",
            radioValue: 2,
            pic: require("../assets/img/ThinkSmart Hub 500.jpg")
          },
          {
            name: "ThinkSmart one",
            radioValue: 2,
            pic: require("../assets/img/ThinkSmart one.png")
          }
        ],
        [
          {
            name: "ThinkSmart Bar XL",
            radioValue: 4,
            pic: require("../assets/img/d2_2.png")
          }
          // {
          //   name: "ThinkSmart Mic pod",
          //   radioValue: 2,
          //   pic: require("../assets/img/d2.png")
          // }
        ],
        [
          {
            name: "ThinkSmart Cam",
            radioValue: 5,
            pic: require("../assets/img/d3.png")
          }
          // {
          //   name: "ThinkSmart Hub Gen2",
          //   radioValue: 2,
          //   pic: require("../assets/img/d3_2.png")
          // },

          // {
          //   name: "This is device 003",
          //   radioValue: 2,
          //   pic: require("../assets/img/d3_3.png")
          // }
          // ,
          // {
          //   name: "This is device 004",
          //   radioValue: 2,
          //   pic: require("../assets/img/d3_4.png")
          // }
        ],
        [
          {
            name: "ThinkSmart Controller",
            radioValue: 6,
            pic: require("../assets/img/d4.png")
          },
          {
            name: "ThinkSmart Controller",
            radioValue: 2,
            pic: require("../assets/img/d4_2.png")
          }
        ]
      ],
      navIndex: 0,
      go_next: false,
      circleShap0: false,
      circleShap1: true,
      circleShap2: true,
      circleShap3: true,
      imageList: [
        {
          url: require("../assets/img/system - on the table .png"),
          id: "core"
        },
        {
          url: require("../assets/img/Audio device  - below tv.png"),
          id: "bar"
        },
        {
          url: require("../assets/img/video device  - above tv .png"),
          id: "camera"
        },
        {
          url: require("../assets/img/accessries - on the table.png"),
          id: "access"
        }
      ],
      step: 0,
      next_text: "next",
      pointList: [
        [
          {
            text: "On the Wall",
            x: "4.319",
            y: "1.207"
          },
          {
            text: "On the Table",
            x: "2.855",
            y: "1.98",
            answer: true
          },
          {
            text: "Below the Table",
            x: "2.232",
            y: "1.811"
          }
        ],
        [
          {
            text: "On the Wall",
            x: "4.319",
            y: "1.207"
          },
          {
            text: "Above TV",
            x: "3.806",
            y: "0.695"
          },
          {
            text: "Below TV",
            x: "3.733",
            y: "1.134",
            answer: true
          }
        ],
        [
          {
            text: "On the Bar",
            x: "3.953",
            y: "1.573"
          },
          {
            text: "On the Wall",
            x: "4.319",
            y: "1.207"
          },
          {
            text: "Above TV",
            x: "3.806",
            y: "0.695",
            answer: true
          },
          {
            text: "Below TV",
            x: "3.733",
            y: "1.134"
          }
        ],
        [
          {
            text: "On the Wall",
            x: "4.319",
            y: "1.207"
          },
          {
            text: "On the Table",
            x: "1.903",
            y: "2.47",
            answer: true
          }
        ]
      ],
      main_title: "Choose device for your conference",
      main_title2: "Choose device location",
      main_title3:
        "Device installation is complete.<br> Click Next to proceed.",
      title: "",
      checkRadioFlag: false,
    };
  },
  components: {
    head_logo
  },
  computed: {
    disable() {
      let list = this.deviceList.filter(item=> item.isShow)
      console.log(list.length== this.deviceList.length);
      return list.length != this.deviceList.length
    }
  },
  created() {
    for (let i = 0; i < this.pointList.length; i++) {
      for (let j = 0; j < this.pointList[i].length; j++) {
        this.$set(this.pointList[i][j], "show", true);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initRoom();
    });
    this.title = this.main_title;
  },
  methods: {
    handleClick(idx) {
      this.navIndex = idx;
      this.title = this.main_title;
    },
    changeFn() {
      this.checkRadioFlag = false;
    },
    initRoom() {},
    next() {
      console.log(this.go_next);
      if(this.disable) return
      // if (this.go_next == false) {
      //   return;
      // }
      // this.title = this.main_title;
      // this.navIndex++;
      // this.selectDivice = false;
      // this.go_next = false;
      // if (this.step == 4) {
        this.$router.push("/choose_done");
      // }
    },
    clickIcon(index, item) {
      if (this.pointList[this.navIndex][index].answer == true) {
        this.go_next = true;
        this.step++;
        // this.$set(this.pointList[this.navIndex][index], "show", false);
        for (let i = 0; i < this.pointList[this.navIndex].length; i++) {
          this.$set(this.pointList[this.navIndex][i], "show", false);
          this.$set(this.deviceList[this.navIndex], "isShow", true);
        }
        this.title = this.main_title3;
      }
    },
    deviceClick() {
      this.title = this.main_title2;
      if (this.checkRadioFlag) {
        this.deviceList[this.navIndex].value = "";
        for (let i = 0; i < this.pointList[this.navIndex].length; i++) {
          this.$set(this.pointList[this.navIndex][i], "show", true);
          this.$set(this.deviceList[this.navIndex], "isShow", false);
        }
      }
      this.checkRadioFlag = true;
    },
    backStep() {
      if (this.go_next == true) {
        this.step--;
        this.go_next = false;

        for (let i = 0; i < this.pointList[this.navIndex].length; i++) {
          this.$set(this.pointList[this.navIndex][i], "show", true);
        }

        return;
      }

      if (this.navIndex == 0) {
        this.$router.push("/");
        return;
      }

      this.step--;
      if (this.step < 0) {
        this.step = 0;
      }

      this.navIndex--;
      this.selectDivice = false;
      for (let i = 0; i < this.pointList.length; i++) {
        for (let j = 0; j < this.pointList[i].length; j++) {
          this.pointList[i][j].show = true;
        }
      }
    }
  }
};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  background-color: #f4f4f4;
  padding-bottom: 50px;
}
.headerContent {
  width: 1280px;
  height: 98px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header {
  width: 100%;
  height: 98px;
  box-sizing: border-box;
  overflow: hidden;
}
.content {
  width: 1280px;
  margin: 0 auto;
  position: relative;
  display: flex;
  .left-wrap {
    display: flex;
    margin-right: 65px;
    .tab {
      width: 280px;
      li {
        height: 89px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 24px;
        color: #757575;
        margin-bottom: 16px;
        img {
          width: 40px;
          height: 46px;
          object-fit: scale-down;
          margin-right: 20px;
        }
      }
      .active {
        color: #6173f3;
        border-radius: 20px;
        background: #ebebeb;
        padding-left: 12px;
        &::before {
          content: "";
          display: block;
          width: 9px;
          height: 58px;
          background-color: #6173f3;
          border-radius: 9px;
          margin-right: 42px;
        }
      }
    }
    .device-container {
      width: 270px;
      height: 500px;
      margin-top: -23px;
      background-color: #ebebeb;
      border-radius: 20px;
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      padding: 23px 0;
      .scroll {
        overflow-y: auto;
        width: 210px;
        padding-right: 10px;
        margin: 0 auto;
      }
      li {
        width: 100%;
        height: 230px;
        border-radius: 10px;
        margin-bottom: 20px;
        padding: 20px;
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #eeeeee;
        img {
          display: block;
          width: 100%;
          height: 103px;
          object-fit: scale-down;
          margin-top: 24px;
        }
        .name {
          letter-spacing: 1px;
          font-size: 16px;
          font-weight: 600;
          color: #666666;
          margin-top: 16px;
        }
      }
      li:last-child {
        margin-bottom: 0;
      }
    }
  }
}
.navContainer {
  display: flex;
  align-items: center;
  .home {
    width: 44px;
    height: 44px;
    background: url("../assets/img/home.png") no-repeat center center/100%;
    cursor: pointer;
  }
  // ul {
  //   display: flex;
  // }
  // li {
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   height: 36px;
  //   padding: 0 23px;
  //   border: 1px solid rgb(97, 116, 243);
  //   border-radius: 18px;
  //   box-sizing: border-box;
  //   font-size: 14px;
  //   color: #666;
  //   margin-left: 18px;
  //   cursor: pointer;
  //   img {
  //     display: block;
  //     max-height: 20px;
  //     width: auto;
  //     margin-right: 9px;
  //   }
  // }
  .navActive {
    color: #ffffff;
    background-color: rgb(97, 116, 243);
  }
}

#room {
  width: 1280px;
  position: relative;
  right: 0;
  .roomContent {
    width: 960px;
    height: 100%;
    margin-top: -250px;
    transform-origin: 0 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .imgBox {
      position: relative;
      .baseImg {
        height: 600px;
        width: 673px;
        margin: 0 auto;
      }
      .devideImg {
        position: absolute;
        top: 0;
        left: 0;
        width: 673px;
        height: 600px;
      }
    }
    .pointBox {
      position: absolute;
      top: 0;
      left: 0;
      width: 673px;
      height: 600px;
    }
    .point {
      position: absolute;
      z-index: 99;
      p {
        background-color: rgba($color: #ffffff, $alpha: 0.7);
        border-radius: 5px;
        padding: 2px 5px;
      }
      img {
        display: block;
        width: 40px;
        height: 40px;
        margin: 0 auto;
      }
    }
  }
  .submit {
    width: 280px;
    line-height: 72px;
    border-radius: 72px;
    background-color: #6173f3;
    color: #fff;
    font-size: 24px;
    text-align: center;
    position: absolute;
    right: 0;
    bottom: -100px;
  }
  .disable {
    background-color: rgb(225, 225, 225);
  }
}
.subTitle {
  text-align: left;
  margin-bottom: 72.5px;
  margin-top: 164px;
  h6 {
    font-size: 30px;
    color: #000000;
  }
  p {
    font-size: 14px;
    color: #808080;
    margin-top: 13px;
  }
}
.wrap {
  display: flex;
}
.deviceList {
  height: 90%;
  overflow-y: auto;
  margin-top: 26px;
  li {
    width: 263px;
    height: 296px;
    border-radius: 10px;
    box-shadow: 10px 2px 27px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    border: 1px solid #eeeeee;
    .divicePic {
      height: 193px;
      width: 183px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      img {
        display: block;
        max-width: 100%;
        max-height: 100%;
      }
    }
    .name {
      letter-spacing: 1px;
      font-size: 16px;
      font-weight: 600;
      color: #666666;
    }
  }
  li:last-child {
    margin-bottom: 0;
  }
}
.btnContainer {
  display: flex;
  justify-content: center;
  margin-left: 50px;
  margin-top: -16px;
  .back {
    width: 44px;
    height: 44px;
    background: url("../assets/img/back.png") no-repeat center center/100%;
    cursor: pointer;
  }
  .next {
    width: 146px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    background-color: rgb(97, 116, 243);
    border-radius: 22.5px;
    margin-left: 18px;
    cursor: pointer;
  }
  .next1 {
    width: 146px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    border-radius: 22.5px;
    margin-left: 18px;
    background-color: rgb(214, 214, 214);
    cursor: pointer;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
  transition-delay: 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  left: 0;
  top: 0;
}
.slide-left-enter {
  left: 100%;
  opacity: 0;
}
.slide-left-leave-to {
  left: -100%;
  opacity: 0;
}
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 1s cubic-bezier(0.645, 0.045, 0.355, 1);
  position: absolute;
  right: 0;
  top: 0;
}
.slide-right-enter {
  right: 100%;
  opacity: 0;
}
.slide-right-leave-to {
  right: -100%;
}
.fade-up-enter-active,
.fade-up-leave-active {
  transition: transform 1s, opacity 1s;
}
.fade-up-enter,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
.lr-circles {
  width: 100px;
  height: 100px;
  -o-object-fit: contain;
  object-fit: contain;
  z-index: 99;
}
.lr-circles ellipse.c1 {
  -webkit-animation: spin 30s linear infinite;
  animation: spin 30s linear infinite;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  transition: all 30s linear;
}
.lr-circles ellipse.active {
  -webkit-animation: spin 30s linear infinite !important;
  animation: spin 30s linear infinite !important;
}
.lr-circles ellipse.c3 {
  -webkit-animation: spin-counter 30s linear infinite !important;
  animation: spin-counter 30s linear infinite !important;
}
@-webkit-keyframes fadeout {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}
@keyframes fadeout {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.2);
  }
}
@-webkit-keyframes spin {
  0% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 100%;
  }
}
@keyframes spin {
  0% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 100%;
  }
}
@-webkit-keyframes spin-counter {
  0% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -100%;
  }
}
@keyframes spin-counter {
  0% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: -100%;
  }
}

@media screen and (min-height: 1000px) {
  .container {
    height: 100%;
  }

  .roomContent {
    height: 100%;
  }
  .content {
    height: 80vh;
  }
}

@media screen and (max-height: 1000px) and (min-height: 800px) {
  .container {
    height: 100%;
  }
}

@media screen and (min-width: 1450px) and (max-height: 1920px){
  #room {
    width: 1440px;
    .roomContent {
      transform: scale(1.2);
      .submit {
        bottom: -50px;
        right: 70px;
      }
    }
  }
  .headerContent,
  .content {
    width: 1440px;
  }
  .container {
    padding-bottom: 0;
  }
}

@media screen and (min-width: 1930px) {
  #room {
    width: 1600px;
    .roomContent {
      transform: scale(1.3);
      .submit {
        right: 150px;
      }
    }
  }
  .headerContent,
  .content {
    width: 1600px;
  }
}
</style>
