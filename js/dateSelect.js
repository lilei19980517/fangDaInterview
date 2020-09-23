!function(){
// 在对应元素填入id ='dateSelect'
// 点击对应input显示时间选择控件，浮动在页面上，通过top设置在对应位置
// 点击获取这个input的offsetTop 将时间选择控件展示在下面，
// 在时间选择完毕之后设置这个input的value
const dateEle = document.querySelectorAll('#dateSelect')
// 绑定点击事件 显示时间选择
Array.prototype.forEach.call(dateEle,function(item){
  item.onclick=function (e) {
    document.querySelector('#dateSelectBox').style.top=`${e.target.offsetTop+e.target.clientHeight+10}px`
    showDataSelect()
    let length = document.querySelector('#dateSelectBox').children.length
    document.querySelector('#dateSelectBox').children[length - 1].onclick=function(e){
      // console.log(e)
      console.log`${yearValue}年${monthValue}月${dayValue}日`
      item.value=`${yearValue}年${monthValue}月${dayValue}日`
      hiddenDataSelect()
   }
  }
})
// 创建时间选择控件
const div = document.createElement('div')
//年月日三个滑动	
const yearBox = document.createElement('ul')
const monthBox = document.createElement('ul')
const dayBox = document.createElement('ul')
yearBox.style=`
  overflow:scroll;
  flex:1;
`
monthBox.style=`
  flex:1;
  overflow:scroll;
`
dayBox.style=`
  overflow:scroll;
  flex:1;
`
div.style=`height:100%;
  overflow:hidden;
  display:flex;
  justify-content:space-between;
  background-color:#fff`;
div.classList.add('dateSelect')
 //获取当前年月日
 const date = new Date();
 const year = date.getFullYear()
 const month = date.getMonth()+1
 const day = date.getDate()
console.log(year,month,day)
 // 年是1990到今年
 for(let i = 1900;i<=year+20;i++){
 	let li = document.createElement('li')
 	li.innerText = i;
 	// 展示五个
 	li.style="height:20%;font-size:35%;text-align: center;"
  li.setAttribute('title',i)
 	yearBox.appendChild(li)
 }
 // 月是1-12
 for(let i = 1;i <= 12+2; i++){
 	let li = document.createElement('li')
  li.setAttribute('title',i)
  li.innerText = i<=12?i:'';
 	// 展示五个
 	li.style="height:20%;font-size:35%;text-align: center;"
 	monthBox.appendChild(li)
 }
 // 日1-31
  for(let i = 1;i <= 31+2; i++){
 	let li = document.createElement('li')
  li.setAttribute('title',i)
 	li.innerText = i<=31?i:'';
 	// 展示五个
 	li.style="height:20%;font-size:35%;text-align: center;"
 	dayBox.appendChild(li)
 }
div.appendChild(yearBox)
div.appendChild(monthBox)
div.appendChild(dayBox)
// 动态添加一个遮罩效果代表选中的值
const shadowBox = document.createElement('div')
shadowBox.style= `width:100%;height:20%;background-color:#ccc5;position:absolute;top:40%;`
// 外层一个大div包裹div和shadowBox和确定按钮
const submitBox = document.createElement('button')
submitBox.style='box-sizing:border-box;display:block;width:100%;height:20%;background-color:#055;color:#fff;font-size:35%'
submitBox.innerText="确 定"
const bigDiv = document.createElement('div')
bigDiv.style='height:26vh;width:100%;position:absolute;'
bigDiv.appendChild(div)
bigDiv.appendChild(shadowBox)
bigDiv.appendChild(submitBox)
bigDiv.setAttribute('id','dateSelectBox')
document.body.appendChild(bigDiv)
// 元素已成功渲染在页面，此时动态设置字体垂直居中对其，需要获取li的高度
const ulBoxs=document.querySelector('.dateSelect').children
const ulHeight=parseFloat(ulBoxs[0].currentStyle? ulBoxs[0].currentStyle.height : window.getComputedStyle(ulBoxs[0], null).height);
const liHeight=parseFloat(ulBoxs[0].children[0].currentStyle? ulBoxs[0].children[0].currentStyle.height : window.getComputedStyle(ulBoxs[0].children[0], null).height);
console.log(ulHeight,liHeight)
Array.prototype.forEach.call(ulBoxs,function(item){
  // 再遍历每一个li
  Array.prototype.forEach.call(item.children,function(item){
    item.style.lineHeight=`${liHeight}px`
  })
})
 // 设置滚动事件自动对齐
 // 思路 展示五个，每一个li的高度就是20%的ul的高度
 //      scrollTop/li的高度余数大于等于li的一半则凑齐，否则减掉
// 用来存储选择的年月日
let yearValue = year
let monthValue = month
let dayValue = day
Array.prototype.map.call(ulBoxs,function(item,index){
  let timerId = null
  item.onscroll=function(e){
    // console.log(e.target.scrollTop)
    // 每次滚动产生定时器，延迟0.2秒后对齐
    // 防止生成多个定时器 要进来先清楚上一个定时器
    timerId&&clearTimeout(timerId)
    const top = e.target.scrollTop
    timerId = setTimeout(function(){
      if( (top%liHeight) >= (liHeight/2) ){
        console.log(top%liHeight)
        e.target.scrollTop=top-top%liHeight+liHeight
        // 获取当前选中值，要加两个，因为第三个才是选中值
        switch(index){
          case 0:return yearValue = item.children[parseInt(top / liHeight)+3].title;
          case 1:return monthValue = item.children[parseInt(top / liHeight)+3].title;
          case 2:return dayValue = item.children[parseInt(top / liHeight)+3].title;
          default:return false
        }
      }else{
        e.target.scrollTop=top-top%liHeight
        switch(index){
          case 0:return yearValue = item.children[parseInt(top / liHeight)+2].title;
          case 1:return monthValue = item.children[parseInt(top / liHeight)+2].title;
          case 2:return dayValue = item.children[parseInt(top / liHeight)+2].title;
          default:return false
        }
      }
      console.log(item.scrollTop)
    },100)    
  }
  //默认展示当前年月日
  switch(index){
    case 0:return item.scrollTop=(yearValue-1900-2) * liHeight;
    case 1:return item.scrollTop=(monthValue-3) * liHeight;
    case 2:return item.scrollTop=(dayValue-3) * liHeight;
    default:return false
  }
})

Array.prototype.map.call(dateEle,function(item){
  //将每一个input禁止输入
  item.onfocus=function(){
    this.blur()
  }
})
hiddenDataSelect()

// 展示和隐藏时间空间
function showDataSelect(){
  document.querySelector('#dateSelectBox').style.display='block'
  yearValue=year
  monthValue=month
  dayValue=day
}
function hiddenDataSelect(){
  document.querySelector('#dateSelectBox').style.display='none'
}
}()

