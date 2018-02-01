# 分页
---
### 标签
> 类型 | 标签 | 是否必填 | 说明|参数
    > ---|---|-------|-------
    > string | data-toggle | 是 | 标记当前组件是分页|"pagination"
    > string | data-pagination-id| 是 | 当前分页组件的ID|[同类组件-唯一性]
    > string | data-show-data-array | 是 | 可选的(每页显示数量)|"10,25,20,100"
    > string | data-show-data | 是 | 每页显示的数量|10
    > number | data-current | 是 | 当前页数|1
    > number | data-total-data | 是 | 数据总数量|
    > string | data-jump | 否 | 显示输入分页的DOM|1
    > string | data-coping | 否 | 显示“...”|1
    >
>


### 事件
#### pagination-change.jump.data-api

分页跳转事件

> 参数 | 说明 
    > ---|---
    > showData| 对当前一页显示的数量
    > current | 当前分页
    > elem |  当前组件对应的jquery对象 
>
#### pagination-change.showDataOnePage.data-api

切换每页显示数量事件

> 参数 | 说明 
    > ---|---
    > showData| 对当前一页显示的数量
    > current | 当前分页
    > elem |  当前组件对应的jquery对象 
>

### 事件使用

```javascript
$(document).on("pagination-change.jump.data-api",function(e,data){
            console.log(e,data)
            //window.location.href="xxx?page="+data.current+"&showData="+data.showData;

            //$.ajax({...})
})

$(document).on("pagination-change.showDataOnePage.data-api",function(e,data){
    console.log(e,data)
})
```
<div class="doc-views">
<div data-toggle="pagination" data-show-data-array="10,25,20,100" data-total-data="100" , data-show-data="10" data-jump="1"
    data-coping="1" , data-current="1" data-pagination-id="1">
</div>
</div>

