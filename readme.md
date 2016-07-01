## 面试总结

--------------

* ###css布局方法
    1. ####position

        ```css

        .class{
            postion:absolute;/*绝对定位*/
            top:20px;
            bottom:0;
            left:0;
            right:0;
        }
        ```
        常用于：一边定宽，另一边自适应，如给出头部空出一个20px的高，下面自适应。
    2. ####float
        **html:**
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

       **css**
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
    3. ####display:box;  
        又称弹性布局，[具体demo](https://github.com/Char-Ten/summarize/tree/master/box%E5%B8%83%E5%B1%80);

* ###css3动画
    1. ####transform
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
    2. ####@keyFrames
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
* ###面向对象
    * ####封装
    * ####原型链
    * ####继承
* ###ajax的封装
    * ####参数
    * ####处理
    * ####回调
* ###页面优化
    * ####动画：setTimeout setInterval requestAnimationFrame
    * ####dom
    * ####cdn
    * ####异步
    * ####雪碧图
* ###组件化？模块化？
    * ####组件化：ng,vue,react
    * ####模块化：requirejs
