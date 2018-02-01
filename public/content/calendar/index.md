# 日期选择
---
## 选择时间范围
### 标签
> 类型 | 参数 | 是否必填 | 说明|参数
	> ---|---|-------|-------
	> string | trigger-calendar-start | 是 | 起始时间input|无
	> string | trigger-calendar-end | 是 | 接触时间input|无
	> string | trigger-calendar | 是 | 标记当前组件是日历|无
	>
>

### 带参数标签
> 类型 | 参数 | 是否必填 | 说明|默认
	> ---|---|-------|-------
	> string | data-range | 否 | 时间间隔|~
	> string | data-format | 否 | 时间格式|yyyy/M/d HH:mm:ss
	> string | data-min | 否 | 最小时间|今天
    > string | data-max | 否 | 最大时间|无限
	>
>

<div class="doc-views">

<div class="ant-row ant-form-item">
    <div class="ant-form-item-label ant-col-xs-24 ant-col-sm-7">
        <label for="date" class="ant-form-item-required" title="起止日期">起止日期</label>
    </div>
    <div class="ant-form-item-control-wrapper ant-col-xs-24 ant-col-sm-12 ant-col-md-10">
        <div class="ant-form-item-control ">
            <span class="ant-calendar-picker" tabindex="0" style="width: 100%;">
                <span class="ant-calendar-picker-input ant-input">
                    <input readonly="" value="" placeholder="开始日期" name="day-start" trigger-calendar-start="" class="ant-calendar-range-picker-input">
                    <span class="ant-calendar-range-picker-separator">
                        ~ </span>
                    <input readonly="" value="" name="day-end" placeholder="结束日期" trigger-calendar-end="" class="ant-calendar-range-picker-input">

                    <input type="text" readonly="" class="ant-calendar-range-place-holder" required id="calendar" trigger-calendar data-type='datetime'
                        data-range='~' data-format='yyyy/M/d HH:mm:ss' data-min="2018-01-24" data-max='2080-10-14'>

                    <span class="ant-calendar-picker-icon"></span>
                </span>
            </span>
        </div>
    </div>
</div>
</div>

---
## 简单时间选择
### 标签
> 类型 | 参数 | 是否必填 | 说明|参数
	> ---|---|-------|-------
	> string | trigger-calendar | 是 | 标记当前组件是日历|无
	>
>

### 带参数标签
> 类型 | 参数 | 是否必填 | 说明|默认
	> ---|---|-------|-------
	> string | data-format | 否 | 时间格式|yyyy/M/d HH:mm:ss
	> string | data-min | 否 | 最小时间|今天
    > string | data-max | 否 | 最大时间|无限
	>
>
<div class="doc-views">
 <div class="ant-form-item-control-wrapper">
    <div class="ant-form-item-control ">
        <span class="ant-time-picker " style="width: 100%;">
            <input type="text" name="tipstime" class="ant-time-picker-input" placeholder="提醒时间" value="" id="calendar-startTime" trigger-calendar
                data-type='datetime' data-format='yyyy/M/d HH:mm:ss' data-min="2018-01-20" data-max='2080-10-14' required>
            <span class="ant-time-picker-icon"></span>
        </span>
    </div>
</div>
</div>