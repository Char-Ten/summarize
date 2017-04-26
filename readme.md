## 面试总结

--------------

### css布局方法
1. **position**  
   
   ```css
    .class{
      postion:absolute;/*绝对定位*/
      top:20px;
      bottom:0;
      left:0;
      right:0;
    }
    
  ```
常用于：一边定宽，另一边自适应，如给出头部空出一个20px的高，下面自适应.
 2. **float**
  + **html:**
 ```html
    <div class="box">
      <div class="lt">
          <div></div>
      </div>
      <div class="rt">
          <div></div>
      </div>
     </div>
 ```

  + **css**
   ```css 
  .box{
      overflow:hidden;
  }
  .box>div{
      float:left;
      overflow:hidden;
  }
  .lt{
      width:40%;
  }
  .rt{
      width:60%;
  }
  .box>div>div{
      width:100%
  }
  ```
 标签嵌套，防止左右栏挤出
3. **display:box;**  
又称弹性布局，[具体demo](https://github.com/Char-Ten/summarize/tree/master/box%E5%B8%83%E5%B1%80);

### css3动画
1. **transform**
   ```css
  .class{
    background:red;
    transform:all 0.5s;
  }
  .class:hover{
    background:blue;
  }
  ```
transform的正确用法

2. **@keyFrames**
   ```css
  
  .class{
    animation:animat 5s;
  }
  @keyframes animat{
    from{
      background:red;
    }
    to{
      background:blue;
    }
  }
  ```
css3的动画，没什么可说的

### 面向对象
  * **封装**
    ```javascript

    function setName(name){
      this.name=name;
    }
    setName.prototype.sayName=function(){
      console.log(this.name);
    }

    //调用
    new setName('CharTen').sayName();
    ```
  * **继承**
    ```javascript

    function setSex(name,sex){
      //setName.apply(this,[name]);
      setName.call(this,name);
      this.sex=sex;
    }
    setSex.prototype=new setName();
    setSex.prototype.constructor=setSex;
    setSex.prototype.satSex=function(){
      console.log(this.sex);
    }

    var a=new setSex('CharTen','♂');
    a.sayName();
    a.saySex();
    ```
  继承方面不大熟悉。。。有错误的请指出

### ajax的封装
  * **参数**  
  ```javascript

    //按照jq的封装样子，我们希望这样调用：
    ajax({
      type:'get',
      url:'http://charten.ml',
      data:{
        'name':'charTen',
        'sex':'man'
      },
      async:true;
      success:function(data){
        console.log(data);
      }
    })
  ```
  * **处理**
  ```javascript

    function ajax(json){
      var xhr=new XMLHttpRequest();//这里不做对ie的兼容
      if(typeof json.type=='string'){
          switch(json.type.toLowerCase()){
            case 'get':
              json.url+='?'+setSearch();
              xhr.open('get',json.url,json.async);
              xhr.send(null);
              break;
            case 'post':
              xhr.open('post',json.url,json.async);
              xhr.send(data);
              break;
            default :
              return;
          }
          xhr.onreadystatechange=function(){
            if(xhr.readystate==4&&xhr.status=200){
              json.success&&json.success(xhr.responseText);
            }
          }
          return
      }
      function setSearch(){
        if(typeof json.data=='string'){
          return json.data;
        }
        if(typeof json.data=='object'){
          var search=[];
          json.data.forEach(function(i,e){
            search.push(i+'='+json.data[i]);
          });
          search=search.join('&');
          return search;
        }
      }
    }
  ```

### 数组的复制
* 浅复制
 ```javascript
     var arr=[1,2,3,4,5,6];
     var copyArray=arr.concat();
 ```

* 深复制
 ```javascript
     Array.prototype.deepcopy=function(){
         var copy=[];
         a(this,copy);
         return copy;
         function a(source,target){
            source.forEach(function(item,index){
               if(typeof item==Object){
                   a(item,target[index]);
               }else{
                   target[index]=item
               }
            })
         }
     }
     
     var arr=[1,2,3,4,5,6]
     var copyArray=arr.deepcopy();
 ```


### 页面优化
+ **动画**——setTimeout setInterval requestAnimationFrame
  1. 不考虑兼容情况下使用新的动画框架
  2. 页面动画逻辑集中处理，减少页面定时器计时器的数量
+ dom **页面优化重点在dom这里**
  1. 有jq的情况下，dom操作尽量交给jq完成
  2. 在原生的情况下，需要大量插入dom的情况下，最好先插入于fragment里面，然后再append到页面里面
  3. 布局方面能不用table就不用table，减少页面重绘
  4. 样式改变通过修改元素class类名，利用css一次性修改
  5. 隐藏节点不会触发浏览器重绘
  6. 缓存节点  
      ```javascript

        var dom=document.getElementById('id');
        dom.style.left=dom.offsetLeft+10+'px';
      ```
+ **cdn**
  1. 压缩代码，创建cdn链接
  2. 将页面图标做成雪碧图
  3. 建议使用字体图标iconfont，这里推荐[马云爸爸的字体图标库](http://www.iconfont.cn/)
+ **异步**
  1. 学会异步编程，ajax用异步操作
  2. 避免回调地狱（回调多了就变同步了
  3. 如果存在多个异步函数，要拿到所有异步处理完后的数据再进行处理的：
  ```javascript
  /*回调标志*/
  var flag=new Array(3);
  var index=0;
  var result={};

  /*callback回调函数*/
  function cb(){			
    flag[index]=1;
    index++;
    /*判断所有回调是否完成*/
    for(var i in flag){
      if(!flag[i]){
        return
      }
    }
    /*共同处理 result.ajax1 result.ajax2*/
    /*other code*/
  }

  $.ajax({
    ...//请求参数略
    success:function(r){
      result.ajax1=r;
      cb();
    }
  })

  $.ajax({
    ...//请求参数略
    success:function(r){
      result.ajax2=r;
      cb();
    }
  })

  /*上面两个*/
  ```
+ **请求**  
  1. 图片懒加载化
  2. 脚本放在页面底部
  3. 减少http请求。。。这个需要后台配合

### 组件化？模块化？  
* 组件化：ng,vue,react
* 模块化：requirejs
