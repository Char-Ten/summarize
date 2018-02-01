# 简单表单校验
---


## 基础配置
> 标签 | 说明
    > ---|-------
    > novalidate="false" | 禁止HTML5校验
    > single-form-valid | 标记当前form使用简单校验,不使用javascript实例(<font color="red" face="黑体">如果使用js实例，请不要使用该标签</font>)
    >
>
<div style="margin-bottom:10px;"></div>

> 规则使用 | 说明
    > ---|-------
    > required:true | 必须输入的字段 
    > remote:"check.php" | 使用 ajax 方法调用 check.php 验证输入值。后端响应true或者false字符串
    > email:true | 必须输入正确格式的电子邮件。
    > url:true | 必须输入正确格式的网址。 
    > date:true | 日期校验 ie6 出错，慎用。
    > dateISO:true | 必须输入正确格式的日期（ISO），例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。
    > number:true | 必须输入合法的数字（负数，小数）。建议配合type="number"使用
    > digits:true | 必须输入整数。
    > equalTo:"#field" | 输入值必须和 #field 相同。
    > accept     | 输入拥有合法后缀名的字符串（上传文件的后缀）。 
    > maxlength:5 | 输入长度最多是 5 的字符串（汉字算一个字符）。
    > minlength:10  | 输入长度最小是 10 的字符串（汉字算一个字符）
    > rangelength:[5,10] |输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。
    > range:[5,10| 输入值必须介于 5 和 10 之间。
    > max:5| 输入值不能大于 5。
    > min:10 | 输入值不能小于 10。
    >
>

## 说明
> - 详细文档参考http://www.runoob.com/jquery/jquery-plugin-validate.html
> - 一个form里面不要出现重复的name，否则值校验第一个
> - 以下实例不需要写javascript

<div class="doc-views">
  <form  novalidate="false" single-form-valid>
     <div>
        <input type="text" required name="required"  class="ant-input" placeholder="必填" >
     </div>
      <div>
        <input type="text"  name="maxlength" maxlength="5" required placeholder="最大长度为10" class="ant-input">
     </div>
      <div>
        <input type="number"  name="max" required  max="2" placeholder="最大为2"  class="ant-input">
     </div>
      <div>
        <input type="number" required name="minlength"  minlength="2" placeholder="最小长度为2"  class="ant-input">
     </div>
      <div>
        <input type="text" required name="eq1" id="eq1" placeholder="我是eq1"  class="ant-input">
     </div>
      <div>
        <input type="text" required name="equalTo" equalTo="#eq1" placeholder="和eq1等于"  class="ant-input">
     </div>
      <div>
        <input type="number" required name="digits" digits="true" placeholder="整数"  class="ant-input">
     </div>
      <div>
        <input type="email" required name="email" email="true" placeholder="email"  class="ant-input">
     </div>
     <div>
                  <div class="ant-select ant-select-enabled">
                        <div class="ant-select-selection ant-select-selection--single" tabindex="0" data-toggle="select-single">
                            <div class="ant-select-selection__rendered">
                               <div unselectable="unselectable" class="ant-select-selection__placeholder" style="display: block; user-select: none;" select-selected-val="">请选择管理员</div>
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
     </div>
     <div>
        <label class="ant-radio-wrapper">
            <span class="ant-radio">
                <input type="radio" class="ant-radio-input" value="on3" name="typex" required>
                <span class="ant-radio-inner"></span>
            </span>
            <span>不公开</span>
        </label>
        <label class="ant-radio-wrapper">
            <span class="ant-radio">
                <input type="radio" class="ant-radio-input" value="on1" name="typex" required>
                <span class="ant-radio-inner"></span>
            </span>
            <span>公开</span>
        </label>
     </div>
      <div>
          <label class="ant-checkbox-wrapper">
                  <span class="ant-checkbox">
                      <input type="checkbox" class="ant-checkbox-input" value="on1"  name="spam[]" minlength="2" required>
                      <span class="ant-checkbox-inner"></span>
                  </span>
                  多选1
          </label>
          <label class="ant-checkbox-wrapper">
                  <span class="ant-checkbox">
                      <input type="checkbox" class="ant-checkbox-input" value="on2"  name="spam[]" >
                      <span class="ant-checkbox-inner"></span>
                  </span>
                  多选2
          </label>
          <label class="ant-checkbox-wrapper">
                  <span class="ant-checkbox">
                      <input type="checkbox" class="ant-checkbox-input" value="on3"  name="spam[]">
                      <span class="ant-checkbox-inner"></span>
                  </span>
                  多选3
          </label>
          <label class="ant-checkbox-wrapper">
                  <span class="ant-checkbox">
                      <input type="checkbox" class="ant-checkbox-input" value="on4"  name="spam[]">
                      <span class="ant-checkbox-inner"></span>
                  </span>
                  多选4
          </label>
          <span style="margin-left:20px;">必选<font color="red">2</font>项以上(checkbox只会给第一个checkbox标红，注意给文字提示)</span>
          
      </div>
     <div>
        <button type="submit" class="ant-btn ant-btn-primary">提交</button>
     </div>
  </form>
</div>

