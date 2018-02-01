# grid 栅栏
---

## 基础使用
栅栏布局，与**Bootstrap**的栅栏布局类似，先添加一个行`div`，然后在行`div`里面添加列：
```html
<div class="ant-row">
	<div class="ant-col-24"></div>
</div>
```
蚂蚁金服将他们的栅栏总共分成24等份，通过在`ant-col-*`后面添加不同的数字，达到不同的宽度占比效果：
* 占据100%：
<div class="doc-views">
<div class="ant-row">
	<div class="ant-col-24" style="text-align:center;background:#6cf">100%</div>
</div>
</div>

* 占据50%：
<div class="doc-views">
<div class="ant-row">
	<div class="ant-col-12" style="text-align:center;background:#6cf">50%</div>
	<div class="ant-col-12" style="text-align:center;background:#6c0">50%</div>
</div>
</div>

* 多行：
<div class="doc-views">
<div class="ant-row">
	<div class="ant-col-24" style="text-align:center;background:#af0">100%</div>
</div>
<div class="ant-row">
	<div class="ant-col-12" style="text-align:center;background:#6cf">50%</div>
	<div class="ant-col-12" style="text-align:center;background:#6c0">50%</div>
</div>
</div>

---

## 左右偏移
只要添加`ant-col-offset-*`这个类名，添加24以内的数字向右偏移等比例的距离：
<div class="doc-views">
<div class="ant-row">
	<div class="ant-col-12 ant-col-offset-6" style="text-align:center;background:#6c0">50%</div>
</div>
</div>

---

## Flex布局
Flex布局是css3里面的一个新的布局方式，蚂蚁金服将其抽象成类，将表示一行的类名`ant-row`改为`ant-row-flex`，开启flex布局效果，通过添加不同的类名，可以达到：
* 添加类名`ant-row-flex-start`，实现左对齐：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-start">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加类名`ant-row-flex-end`，实现右对齐：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-end">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加类名`ant-row-flex-center`，实现水平居中：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-center">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加类名`ant-row-flex-ant-row-flex-space-between`，实现紧贴两端的分散布局：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-space-between">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加类名`ant-row-flex-ant-row-flex-space-around`，实现分散布局：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-space-around">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加类名`ant-row-flex-top`,实现垂直顶对齐：
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-top">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px;height:50px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加`ant-row-flex-middle`,实现垂直居中
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-middle">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px;height:50px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>

* 添加`ant-row-flex-bottom`,实现底部对齐
<div class="doc-views">
<div class="ant-row-flex ant-row-flex-bottom">
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px;height:50px">ant-col-4</div>
	<div class="ant-col-4" style="text-align:center;background:#6cf;margin:5px">ant-col-4</div>
</div>
</div>