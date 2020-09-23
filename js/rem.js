window.onload = function(){
    getRem(750,100)
};
window.onresize = function(){
    getRem(750,100)
};
function getRem(designWidth,prem){
	//disignWidth 设计稿宽度
	//prem 比例 prem = 100 则1rem 就是 100px
    var html = document.getElementsByTagName("html")[0];
    var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    //实际真实设备环境的body宽度除以设计稿宽度乘以比例就是实际的设备环境的字体大小
    //例如iphone6 375px 则375/750*100=50，1rem就是50px
    html.style.fontSize = oWidth/designWidth*prem + "px";
}