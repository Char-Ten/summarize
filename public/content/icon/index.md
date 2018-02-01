# Icon 图标
---
蚂蚁金服的antDesign框架提供一个字体图标库。
## 使用方式
1. 约定，所有字体图标都放在`<i></i>`标签里面。
2. 给`i`标签添加类名`anticon anticon-*`，这里的*指的是蚂蚁金服提供的图标类名.
例子：
<div class="doc-views">
<div style="font-size:18px">
	<i class="anticon anticon-wechat"></i>
	<i class="anticon anticon-gitlab"></i>
	<i class="anticon anticon-android"></i>
</div>
</div>

3. 因为是字体图标，具有字体的特性，因此可以通过css样式color给图标上色:
<div class="doc-views">
<div style="font-size:18px;">
	<i class="anticon anticon-wechat" style="color:#6f0"></i>
	<i class="anticon anticon-gitlab" style="color:#f60"></i>
	<i class="anticon anticon-android" style="color:#6f0"></i>
	<i class="anticon anticon-youtube" style="color:#f00"></i>
	<i class="anticon anticon-alipay" style="color:#6cf"></i>
</div>
</div>

4. 通过css样式font-size设置图标大小，因为其字体的矢量特性，因此图标不会失真:
<div class="doc-views">
<div style="font-size:18px;">
	<i class="anticon anticon-wechat" style="color:#6f0;font-size:50px"></i>
	<i class="anticon anticon-gitlab" style="color:#f60;font-size:30px"></i>
	<i class="anticon anticon-android" style="color:#6f0"></i>
	<i class="anticon anticon-youtube" style="color:#f00;font-size:25px"></i>
	<i class="anticon anticon-alipay" style="color:#6cf;font-size:12px"></i>
</div>
</div>

5. 同样也可以加阴影等其他字体特性等
<div class="doc-views">
<div style="font-size:50px;">
	<i class="anticon anticon-wechat" style="color:#6f0;text-shadow:0 0 15px #00f"></i>
</div>
</div>

6. 字体图标后缀列表  
==>请访问 [ant-design官方文档](https://ant.design/components/icon-cn/)  
将官方文档下的图标描述拼接到 `anticon-` 后面即可

7. 关于字体图标更多信息、内容、玩法，请访问[iconfont](http://www.iconfont.cn/)，阿里的矢量图标网站