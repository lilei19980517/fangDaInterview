!function(){
const data = [
  {id:1,title:'应聘岗位',type:'text',isRequired:true},
  {id:2,title:'填表日期',type:'date',isRequired:true},
  {id:3,title:'姓名',type:'text',isRequired:true},
  { id:4,title:'性别',type:'select',
    selectItem:['男','女'],
    isRequired:true
  },
  {id:5,title:'出生日期',type:'date',isRequired:true},
  {id:6,title:'政治面貌',type:'text',isRequired:true},
  {
  	id:7,title:'婚否',type:'select',
  	selectItem:['已婚','未婚'],
  	isRequired:true
  },
  {id:8,title:'籍贯（省、市）',type:'text',isRequired:true},
  {id:9,title:'联系方式',type:'text',isRequired:true},
  {id:10,title:'电子邮箱',type:'text',isRequired:true},
  {id:11,title:'学历',type:'text',isRequired:true},
  {id:12,title:'现住地',type:'text',isRequired:true},
  {id:13,title:'目前是否在职',type:'text',isRequired:true},
  {id:14,title:'预计到岗时间',type:'date',isRequired:true},
  {id:15,title:'期望薪资',type:'text',isRequired:true},
  {id:16,title:'外语水平',type:'text',isRequired:true},
  {id:17,title:'计算机水平',type:'text',isRequired:true},
  {
    id:18,
    title:'教育经历',
    type:'table',
    isRequired:true,
    tableData:[
      {id:1,title:'时间',rows:3},
      {id:2,title:'毕业院校',rows:3},
      {id:3,title:'专业',rows:3},
      {id:4,title:'详细情况',rows:3},
    ]
  },
  {
    id:19,
    title:'工作经历',
    type:'table',
    isRequired:true,
    tableData:[
      {id:1,title:'时间',rows:3},
      {id:2,title:'公司名称',rows:3},
      {id:3,title:'职务',rows:3},
      {id:4,title:'职责',rows:3},
    ]
  },
  {id:20,title:'个人荣誉',type:'text',isRequired:true},
  {id:21,title:'兴趣特长',type:'text',isRequired:true},
  {id:22,title:'自我评价',type:'textArea',isRequired:true},
]

var form = document.getElementsByTagName('form')[0];
console.log(form)
// 创建元素
function createDom(title,type,selectItem,placeholder,isRequired,tableData){
  let div = document.createElement('div')
  div.classList.add('inputBox')
  div.style="display:flex;flex-direction:column;justify-content: space-between"
  let p = document.createElement('p')
  p.innerText=title
  isRequired&&p.classList.add('title','required')
  let ipt;
  let table;
  // 如果是select
  if(type === 'select'){
    ipt = document.createElement('select')
    let opt = document.createElement('option')
    opt.setAttribute('disabled',true)
    opt.setAttribute('selected',true)
    opt.innerText=placeholder;
    opt.style='display:none;'
  	ipt.classList.add('select')
    ipt.appendChild(opt)
    // 遍历设置option
    selectItem&&selectItem.map(item=>{
      let opt = document.createElement('option')
      opt.setAttribute('value',item)
      opt.innerText=item
      ipt.appendChild(opt)
    })
    
  }else if(type==='text'){//就是input
  	ipt = document.createElement('input')
    ipt.classList.add('inputItem')
    placeholder&&ipt.setAttribute('placeholder',placeholder)
  }else if(type==='textArea'){
  	//textArea
  	ipt = document.createElement('textArea')
    ipt.classList.add('inputItem')
    ipt.setAttribute('rows',10)
    placeholder&&ipt.setAttribute('placeholder',placeholder)
  }else if(type==='date'){
  	//date
  	ipt = document.createElement('input')
  	placeholder&&ipt.setAttribute('placeholder',placeholder)
  	ipt.setAttribute('id','dateSelect')
  	ipt.classList.add('select')
  }else{
    // table
    table=document.createElement('table')
    // table.setAttribute('border','1')
    console.log(isRequired)
    for(let i=0;i<=tableData[0].rows;i++){
      let tr=document.createElement('tr')
      table.appendChild(tr)
    }
    tableData.map(function(item){
      let th=document.createElement('th')
      th.innerText=item.title
      table.children[0].appendChild(th)
      for(let i = 1; i<=item.rows; i++){
        let td = document.createElement('td')
        let ipt = document.createElement('input')
        td.appendChild(ipt)
        table.children[i].appendChild(td)
      }
    })
    
  }
  div.appendChild(p)
  ipt&&div.appendChild(ipt)
  table&&div.appendChild(table)
  return div
}
// 创建日期选择空间
// 先根据ui稿完成样式，创建一个日期选择控件并隐藏，点击按钮展示，选择后隐藏
data.map(item=>{
  const { 
  	title,
    type,
    isRequired,
    selectItem,
    tableData } = item
  switch(type){
    case 'table': return form.appendChild(createDom(title,type,null,null,isRequired,tableData));
    case 'date':return form.appendChild(createDom(title,type,selectItem,'请选择  ▼',isRequired));
    case 'select':return form.appendChild(createDom(title,type,selectItem,'请选择  ▼',isRequired));
    default:return form.appendChild(createDom(title,type,selectItem,'请输入',isRequired)) ; 
  }	
})
// 最后添加提交按钮
let div = document.createElement('div')
let ipt = document.createElement('input')
ipt.setAttribute('type','submit')
ipt.setAttribute('value','提  交')
div.classList.add('submit')
div.appendChild(ipt)
form.appendChild(div)
}()
