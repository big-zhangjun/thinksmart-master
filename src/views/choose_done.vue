<template>
  <div class="container">
    <div class="header">
      <div class="headerContent">
        <head_logo></head_logo>
        <div class="navContainer">
          <!-- <router-link class="home" tag="div" :to="{ path: '/' }"></router-link> -->
          <ul>
            <li
              v-for="(item, index) in navList"
              :key="index"
              class="navActive"
            >
              <img
                :src="item.iconA"
                alt=""
                srcset=""
              />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="room" id="room">
        <div class="subTitle">
          <h6>Your conference is ready. </h6>
          <h6>Click device for details. </h6>
          <p>Medium Conference Room</p>
        </div>
        <div class="imageBox">
          <div class="centerBox">
            <img src="../assets/img/middle-room.svg">
            <div class="pointBox">
              <div class="clickArea" style="left:3.587rem;top:2.635rem;" @click="showInfo(0)"></div>
              <div class="clickArea" style="left:4.538rem;top:1.757rem;" @click="showInfo(1)"></div>
              <div class="clickArea" style="left:4.538rem;top:1.098rem;" @click="showInfo(2)"></div>
              <div class="clickArea" style="left:2.562rem;top:3.221rem;" @click="showInfo(3)"></div>
            </div>
          </div>
        </div>
      </div>
     
    </div>

    <div class="imgPopup" v-show="imgShow" @click="imgShow = false">
      <!-- <img :src="imgSrc"> -->
      <van-icon name="cross" />
      <iframe :src="imgSrc"></iframe>
    </div>

    <div class="imgPopup" v-if="videoShow" >
      <!-- <img :src="imgSrc"> -->
      <van-icon name="cross" />
      <!-- <iframe :src="imgSrc"></iframe> -->
      <video :src="videoSrc" controls="true" autoplay="true" v-click-outside="onClickOutside">
        
      </video>
    </div>

  </div>
</template>
<script>
import head_logo from "@/components/head_logo.vue";
import vClickOutside from 'v-click-outside'
//import { SVG } from "@svgdotjs/svg.js";
export default {
  data() {
    return {
     imgSrc:'',
     // imgArr:[
     //    require('../assets/img/d1.png'),
     //    require('../assets/img/d2.png'),
     //    require('../assets/img/d3.png'),
     //    require('../assets/img/d4.png'),
     // ],
     imgArr:[
      'https://vr.acktec.cn/thinksmart/pdf/core.mp4',
      'https://vr.acktec.cn/thinksmart/pdf/bar1.pdf',
      'https://vr.acktec.cn/thinksmart/pdf/camera.mp4',
      'https://vr.acktec.cn/thinksmart/pdf/access.pdf'
     ],
     imgShow:false,
     videoShow:false,
     videoSrc:'',
     navList: [
        {
          name: "System",
          icon: require("../assets/img/nav_icon_01.png"),
          iconA: require("../assets/img/nav_icon_01_a.png"),
        },
        {
          name: "Audio Device",
          icon: require("../assets/img/nav_icon_02.png"),
          iconA: require("../assets/img/nav_icon_02_a.png")
        },
        {
          name: "Video Device",
          icon: require("../assets/img/nav_icon_03.png"),
          iconA: require("../assets/img/nav_icon_03_a.png")
        },
        {
          name: "Accessories",
          icon: require("../assets/img/nav_icon_04.png"),
          iconA: require("../assets/img/nav_icon_04_a.png")
        }
      ],
    };
  },
  components: {
    head_logo
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  mounted() {
    this.$nextTick(() => {
      this.initRoom();
    });
  },
  methods: {
    onClickOutside (event) {
      // console.log('Clicked outside. Event: ', event)
      this.videoShow = false;
    },
    initRoom() {},
    next(){
      this.navIndex ++;
      this.go_next = false;
      this.selectDivice = false;
      if(this.step == 3) {
        this.next_text = 'complete'
      }
    },
    clickIcon(index){
      console.log(index)
      console.log(this.step)
      console.log(this.navIndex)
      console.log(this.go_next)
      if(this.selectDivice == false) {
        return;
      }
      switch (this.navIndex) {

        case 0:
          if(index == 1) {
            this.go_next = true;
            this.circleShap1 = false;

            this.step++;
          }
        break;
        case 1:
          if(index == 2) {
            this.go_next = true;
            this.circleShap2 = false;
            this.step++;
          }
        break;
        case 2:
          if(index == 3) {
            this.go_next = true;
            this.circleShap3 = false;
            this.step++;
          }
        break;
        case 3:
          if(index == 0) {
            this.go_next = true;
            this.circleShap0 = false;
            this.step++;
          }
        break;
      }
    },
    showInfo(index){
      console.log(index)
      if(index == 0 || index == 2) {
        this.videoSrc = this.imgArr[index];
        this.videoShow = true;
      }else{
        this.imgSrc = this.imgArr[index];
        this.imgShow = true;
      }
    } 
  }
};
</script>
<style scoped lang="scss">
.container {
  width:100%;
  margin: 0 auto;
  background-color: #f4f4f4;

}
.headerContent {
  width: 1200px;
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
  width: 1200px;
  margin: 0 auto;
}
.navContainer {
  display: flex;
  align-items: center;
  .home {
    width: 44px;
    height: 44px;
    background: url("../assets/img/right.png") no-repeat center center/100%;
    cursor: pointer;
  }
  ul {
    display: flex;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    padding: 0 23px;
    border: 1px solid rgb(97, 116, 243);
    border-radius: 18px;
    box-sizing: border-box;
    font-size: 14px;
    color: #666;
    margin-left: 18px;
    cursor: pointer;
    img {
      display: block;
      max-height: 20px;
      width: auto;
      margin-right: 9px;
    }
  }
  .navActive {
    color: #ffffff;
    background-color: rgb(97, 116, 243);
  }
}
.content {
  display: flex;
}
#room {
  width: 100%;
  .roomContent {
    width: 597px;
    height: 577px;
    margin: 0 auto;
    cursor: pointer;
    display:flex;
    align-items:center;
  }
}
.subTitle {
  text-align: left;
  margin-top: 32px;
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
.imageBox{
  width:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:-70px;
  .centerBox{
    position:relative;
    width:820px;
    height:729px;
  }
  img{
    width:820px;
    height:729px;
  }
  .pointBox{
    width:820px;
    height:729px;
    position:absolute;
    top:0;
    left:0;
  }
}

.clickArea{
  width:40px;
  height:40px;
  position:absolute;
  cursor:pointer;
  background:url('../assets/img/ee82e5250f8ed26a7e9f4a94900598a.png');
  background-size:100% 100%;
  background-repeat:no-repeat;
}

.imgPopup{
  position:absolute;
  top:0;
  right:0;
  width:100%;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
  background:rgba(0,0,0,.7);
  img{
    height:700px;
    max-width:1000px;
  }
  iframe{
    height:700px;
    width:1000px;
    border:none;
    outline:none;

  }
  video{
    height:700px;
    width:1000px;
    border:none;
    outline:none;
  }
  .van-icon{
    font-size:30px;
    position:absolute;
    top: 80px;
    right: 100px;
    color: #ffffff;
    cursor: pointer;
  }
}

@media screen and (min-height: 900px) {
  .container {
    height:100%;
  }
  

}




</style>
