# 单选下拉
---
### 标签
> 类型 | 参数 | 是否必填 | 说明|参数
    > ---|---|-------|-------
    > string | data-toggle | 是 | 标记当前组件是单选下拉|"select-single"
    > string | data-select-option | 是 | 标记可选择列表DOM|无
    > string | data-select-option-id | 是 | 可选择列表的对应id|id
    > string | select-selected-key | 是 | 标记存放已选中列表的id的DOM|无
    > string | select-selected-val | 是 | 标记显示已选列表对应的文案的DOM|无
    >
>
### 事件(select-single-change.data-api)
> 参数 | 说明 
    > ---|---
    > type| 对应被修改input的name 
    > elem | 当前组件对应的jquery对象 
    > val | 被选中的值 
>

### 事件使用

```javascript
 $(document).on("select-single-change.data-api", function (e, data) {
    if($(data.elem).parents("[data-toggle=select-single]).attr("id")=="你给组件自定义的ID"){
           //在这里写你的代码
    }
});

```
<div class="doc-views">
    <form style="width:251px;">
    <div class="ant-select ant-select-enabled">
        <div class="ant-select-selection ant-select-selection--single" tabindex="0" data-toggle="select-single">
            <div class="ant-select-selection__rendered">

                <div unselectable="unselectable" class="ant-select-selection-selected-value" style="display: block; user-select: none;" select-selected-val="">优秀3</div>
                <input type="text" name="commentchangku" select-selected-key="" required="" class="ant-select-picker-input valid" aria-invalid="false">
            </div>
            <span class="ant-select-arrow" unselectable="unselectable" style="user-select: none;">
                <b></b>
            </span>
            <div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft  ant-select-dropdown-hidden">
                <div style="overflow: auto;">
                    <ul class="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu">
                        <!-- ant-select-dropdown-menu-item-active -->
                        <li class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option="" data-select-option-id="优秀1">优秀1</li>
                        <li class="ant-select-dropdown-menu-item " style="user-select: none;" data-select-option="" data-select-option-id="优秀2">优秀2</li>
                        <li class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option="" data-select-option-id="优秀3">优秀3</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</form>
</div>
---

## 下拉和input搭配

<div class="doc-views">
    <form>
         <div class="ant-form-item-control ">
            <span class="ant-input-group ant-input-group-compact">
                <div class="ant-select ant-select-enabled" style="width: 100px;">
                    <div class="ant-select-selection     ant-select-selection--single" tabindex="0" data-toggle="select-single">
                        <div class="ant-select-selection__rendered">
                            <div class="ant-select-selection-selected-value" title="支付宝" style="display: block; opacity: 1;" select-selected-val="">支付宝</div>
                            <input type="text" select-selected-key=""  name="payTypex" class="ant-select-picker-input">
                        </div>
                        <span class="ant-select-arrow" unselectable="unselectable" style="user-select: none;">
                            <b></b>
                        </span>
                        <div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft  ant-select-dropdown-hidden">
                            <div style="overflow: auto;">
                                <ul class="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu">
                                    <li class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option="" data-select-option-id="优秀1">优秀1</li>
                                    <li class="ant-select-dropdown-menu-item " style="user-select: none;" data-select-option="" data-select-option-id="优秀2">优秀2</li>
                                    <li class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option="" data-select-option-id="优秀3">优秀3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <input type="text" placeholder="test@example.com" id="receiverAccount" class="ant-input" style="width: calc(100% - 100px);"
                    name="email" required="">
            </span>
        </div>
    </form>
</div>