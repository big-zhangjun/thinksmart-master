let baseSize = 136.6;
// 设置 rem 函数
function setRem () {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    let clientW = document.documentElement.clientWidth;
    let scale = clientW / 1366;
    if(clientW>1366){
        document.documentElement.style.fontSize = '136.6px';
    }else{
        // 设置页面根节点字体大小
    document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px';
        
    }

}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}
