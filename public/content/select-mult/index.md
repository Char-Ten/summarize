# 多选下拉
---

### 标签
> 类型 | 参数 | 是否必填 | 说明|参数
    > ---|---|-------|-------
    > string | data-toggle | 是 | 标记当前组件是多选下拉|"select-multiple"
    > string | select-multiple-id | 否(如果data-selected-trigger-for存在就必须) | 当前组件的id|[唯一性]
    > string | data-select-option-mult | 是 | 标记可选择列表DOM|无
    > string | data-select-option-id | 是 | 可选择列表的对应id|id
    > string | select-selected-val | 是 | 标记存放已选中列表的id的DOM|无
    > string |data-selected-trigger-for | 否 | 标记对应的多选组件(和select-multiple-id保持一致)|[唯一性]
    > string |data-selected-trigger| 否(如果data-selected-trigger-fo存在就必须) | 要选中的data-select-option-id|[data-select-option-id]
    >
>
### 事件(select-multiple-blur-change.data-api)
> 参数 | 说明 
    > ---|---
    > type| 对应被修改input的name 
    > elem | 当前组件对应的jquery对象 
    > val | 被选中的值,例如："值1，值2，值3"
>

#### 事件使用

```javascript
 $(document).on("select-multiple-blur-change.data-api",  function (e, data) {
    if($(data.elem).parents("[data-toggle=select-multiple]).attr("id")=="你给组件自定义的ID"){
           //在这里写你的代码
    }
});

```

<div class="doc-views">
     <div class="ant-row ant-form-item">
    <div class="ant-form-item-control-wrapper">
        <div class="ant-form-item-control has-success">
            <!-- 切记不要遗漏tabindex="1" -->
            <div class="ant-select ant-select-enabled" style="max-width: 286px; width: 100%;" tabindex="1" data-toggle="select-multiple" select-multiple-id="select-order" id="selectUser">
                <div class="ant-select-selection ant-select-selection--multiple">
                    <input type="hidden" name="read">
                    <div class="ant-select-selection__rendered">
                        <input type="hidden" name="" select-selected-val="">
                        <ul data-select--mult-wrap class="ant-selected-wrap"></ul>
                        <div unselectable="unselectable" class="ant-select-selection__placeholder" style="user-select: none;">选择 owner</div>
                    </div>
                    <!-- 下拉列表 [-->
                    <div class="ant-select-dropdown ant-select-dropdown--multiple ant-select-dropdown-placement-bottomLeft  ant-select-dropdown-hidden" style="width: 286px;">
                        <div style="overflow: auto;">
                            <ul class="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" data-select-option-mult-wrap>
                                <!-- ant-select-dropdown-menu-item-selected 选中的选项添加这个class-->
                                <li unselectable="unselectable" class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option-mult data-select-option-id="我自己1">我自己</li>
                                <li unselectable="unselectable" class="ant-select-dropdown-menu-item " style="user-select: none;" data-select-option-mult data-select-option-id="吴家豪2">吴家豪</li>
                                <li unselectable="unselectable" class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option-mult data-select-option-id="周星星3">周星星</li>
                                <li unselectable="unselectable" class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option-mult data-select-option-id="赵丽颖4">赵丽颖</li>
                                <li unselectable="unselectable" class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option-mult data-select-option-id="姚明5">姚明</li>
                            </ul>
                        </div>
                    </div>
                    <!-- 下拉列表 [-->
                </div>
            </div>
            <a class="selfTrigger___i8k2l" data-selected-trigger="我自己1" data-selected-trigger-for="selectUser">只看自己的</a>
        </div>
    </div>
</div>

</div>

