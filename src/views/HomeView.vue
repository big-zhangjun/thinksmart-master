<template>
  <div class="container">
    <div class="content">
      <div class="head">
        <head_logo></head_logo>
      </div>
      <h6 class="title">Select a room and start conference setup</h6>
      <div class="box-container">
        <div class="box" id="box" v-show="show">
          <div class="cover" id="cover">
            <div class="coverContent"></div>
          </div>
          <div
            class="item"
            v-for="(item, index) in list"
            @click="jump(item)"
            style="margin:0 10px;"
            :key="index"
          >
            <div class="pic">
              <img :src="item.pic" 
              :style="item.name == 'Small' ? 'margin:0 auto;width:85%;' : 'margin:0 10px;width:90%;' "

              alt="" srcset="" />

            </div>
            <div class="card-carousel--card--footer">
              <p>{{ item.name }}</p>
              <p>{{ item.tag }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import head_logo from "@/components/head_logo.vue";
export default {
  name: "HomeView",
  data() {
    return {
      show: false,
      list: [
         {
          name: "Medium",
          tag: "（7-11）",
          pic: require("../assets/img/middle-room.svg"),
          link: "https://dev5.acktec.co/events-announcement/"
        },
        {
          name: "Large",
          tag: "（11-18）",
          pic: require("../assets/img/Large-room.svg"),
          link: "https://dev5.acktec.co/moments/"
        },
        {
          name: "XL",
          tag: "up to 30",
          pic: require("../assets/img/xl-room.svg"),
          link: "https://dev5.acktec.co/insta-post/"
        },
        {
          name: "Small",
          tag: "（<7）",
          pic: require("../assets/img/small-room.svg"),
          link: "https://dev5.acktec.co/word-of-the-day/"
        },
        {
          name: "Medium",
          tag: "（7-11）",
          pic: require("../assets/img/middle-room.svg"),
          link: "https://dev5.acktec.co/events-announcement/"
        },
        {
          name: "Large",
          tag: "（11-18）",
          pic: require("../assets/img/Large-room.svg"),
          link: "https://dev5.acktec.co/moments/"
        },
        {
          name: "XL",
          tag: "up to 30",
          pic: require("../assets/img/xl-room.svg"),
          link: "https://dev5.acktec.co/insta-post/"
        },
        {
          name: "Small",
          tag: "（<7）",
          pic: require("../assets/img/small-room.svg"),
          link: "https://dev5.acktec.co/word-of-the-day/"
        },
        {
          name: "Medium",
          tag: "（7-11）",
          pic: require("../assets/img/middle-room.svg"),
          link: "https://dev5.acktec.co/events-announcement/"
        },
        {
          name: "Large",
          tag: "（11-18）",
          pic: require("../assets/img/Large-room.svg"),
          link: "https://dev5.acktec.co/moments/"
        },
        {
          name: "XL",
          tag: "up to 30",
          pic: require("../assets/img/xl-room.svg"),
          link: "https://dev5.acktec.co/insta-post/"
        },
        {
          name: "Small",
          tag: "（<7）",
          pic: require("../assets/img/small-room.svg"),
          link: "https://dev5.acktec.co/word-of-the-day/"
        },
      ],
      W: 0,
      H: 0,
      L: 0,
      T: 0
    };
  },
  components: {
    head_logo
  },
  mounted() {
    window.onresize = () => {
      // 定义窗口大小变更通知事件
      setTimeout(() => {
        this.init();
        this.W = 1200;
        this.H = document.body.clientHeight;
        this.L = -this.W / 2 + (this.W * 0.13) / 2;
        this.T = -this.H / 2 + (this.H * 0.45) / 2;
      }, 300);
    };
    this.$nextTick(() => {
      this.init()
    });
  },
  methods: {
    jump(item) {
      // if(index == 0 || index ==6|| index == 10) {
      //   this.$router.push({ path: "/choose_device" });
      // }
      if(item.name == 'Medium') {
        this.$router.push({ path: "/choose_device" });
      }
    },
    init(){
      //1.获取元素
      var oWrap = document.getElementById("box");
      var cover = document.getElementById("cover");
      var oImg = oWrap.getElementsByClassName("item");
      this.W = document.body.clientWidth;
      this.H = document.body.clientHeight;
      this.L = -this.W / 2 + (this.W * 0.13) / 2;
      this.T = -this.H / 2 + (this.H * 0.45) / 2;
      // var oImgLen=oImg.length;
      var deg = 360 / oImg.length; //3.每个需要旋转的度数
      // 定义一个开始的度数
      //var roX = -10;
      var roY = 0;
      var x,
        y,
        x_,
        y_,
        xN,
        yN,
        time = null;
      //2.遍历所有的img标签
      for (var i = 0; i < oImg.length; i++) {
        // oImg[i].style.cssText='transform:rotateY('+i*deg+'deg ) translateZ(350px);transition:1s'+ (oImgLen-i)*0.1 +'s;';
        oImg[i].style.transform =
          "rotateX(0)rotateY(" + i * deg + "deg) translateZ("+(this.W-(this.W/5))/2+"px)";
        // oImg[i].style.transition =
        //   "all 1s " + (oImg.length - i - 1) * 0.1 + "s";
        //transition:设置过渡
        this.show = true;
        oImg[i].ondragstart = function () {
          return false;
        };
      }
      //3.事件处理
      document.onmousedown = function (e) {
        clearInterval(time);
        e = e || window.event;
        x_ = e.clientX;
        y_ = e.clientY;
        // console.log ( "鼠标按下了" )
        this.onmousemove = function (e) {
          e = e || window.event;
          //获取滚动的X和Y轴
          //client:鼠标触发点相对于页面可视区域左上角距离
          x = e.clientX;
          y = e.clientY;
          //两点之间的差值:第一次走的时候两值相等,第二次走的时候x已经更新,但x_没更新,所以两个差值就是xN;
          xN = x - x_;
          yN = y - y_;
          //差值拼接到旋转的Y里面去
          roY += xN * 0.2; //水平拖影响Y轴;
          //roX -= yN * 0.2;
          oWrap.style.transform =
            "perspective(6000px) rotateX(" + 0 + "deg) rotateY(" + roY + "deg)";
            cover.style.transform = "rotateY(" + -roY + "deg)";
          x_ = e.clientX;
          y_ = e.clientY;
        };
        this.onmouseup = function () {
          //  console.log ( "鼠标抬起了" )
          this.onmousemove = null;
          //设置一个定时器,实现后面惯性效果8
          time = setInterval(function () {
            //无限乘以零点95它会接近0的状态
            xN *= 0.95;
            yN *= 0.95;
            //当它小到0.1时停止计时器
            if (Math.abs(xN) < 0.1 && Math.abs(yN) < 0.1) {
              //Math.abs()是返回绝对值
              clearInterval(time);
            }
            //差值拼接到旋转的Y里面去
            roY += xN * 0.2; //水平拖影响Y轴;
            //roX -= yN * 0.2;
            oWrap.style.transform =
              "perspective(6000px) rotateX(" +
              0 +
              "deg) rotateY(" +
              roY +
              "deg)";
              cover.style.transform = "rotateY(" + -roY + "deg)";
          }, 30);
        };
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  position: relative;
  background-color: #f4f4f4;
}
.title {
  font-size: 24px;
  color: #000000;
  margin-bottom:-50px;
  margin-top:30px;
}
.head {
  margin-top: 45px;
}
.content {
  margin: 0 auto;
}
.cover {
  width: 20vw;
  height: 31vw;
  transform-style: preserve-3d;
  /*2.transform–style属性指定嵌套元素是在三维空间中呈现。(使用此属性必须先使用transform 属性)*/
  /*perspective:800px;*/
  /*3.设置透视距离*/
  transform: perspective(6000px) rotateX(0deg) rotateY(0deg);
  .coverContent {
    width:100vw;
    height: 100vh;
    position: absolute;
    top: -10vh;
    left: -40vw;
    background-color: #f4f4f4;
  }
}
.box-container{
  height:100vh;
  display:flex;
  align-items:center;
}
.box {
  width: 20vw;
  height: 30vw;
  margin: 0 auto;
  position: relative;
  transform-style: preserve-3d;
  /*2.transform–style属性指定嵌套元素是在三维空间中呈现。(使用此属性必须先使用transform 属性)*/
  /*perspective:800px;*/
  /*3.设置透视距离*/
  transform: perspective(6000px) rotateX(0deg) rotateY(0deg);
  transform-origin: center center center;
}
.item {
  width: 20vw;
  height: 30vw;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: rgba($color: #ffffff, $alpha: 1);
  position: absolute;
  top: 0;
  left: 0;
  /*4.设置图片阴影*/
  // -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
  //       50%, rgba(0, 0, 0, 0.2));
  transition: 500ms all ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .pic {
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-position: center bottom;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-bottom: 0.6vw;
    img {
      display: block;
      width: 100%;
      height: auto;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
  p {
    font-size: 20px;
    font-weight: 400;
    color: #333;
    user-select: none;
  }
}

.fade-enter-active,
.fade-leave-active {
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
