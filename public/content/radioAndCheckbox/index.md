# checkbox,radio
---

## radio
<div class="doc-views">
   <label class="ant-radio-wrapper">
	    <span class="ant-radio">
	        <input type="radio" class="ant-radio-input" value="on3" name="typex" >
	        <span class="ant-radio-inner"></span>
	    </span>
	    <span>不公开</span>
	</label>
	<label class="ant-radio-wrapper">
	    <span class="ant-radio">
	        <input type="radio" class="ant-radio-input" value="on1" name="typex" >
	        <span class="ant-radio-inner"></span>
	    </span>
	    <span>公开</span>
	</label>
</div>

---
## checkbox
<div class="doc-views">
<label class="ant-checkbox-wrapper">
    <span class="ant-checkbox">
        <input type="checkbox" class="ant-checkbox-input" value="on" checkbox-select-item="">
        <span class="ant-checkbox-inner"></span>
    </span>
</label>
</div>

---
## checkbox组
### 标签
> 类型 | 参数 | 是否必填 | 说明|参数
    > ---|---|-------|-------
    > string | checkbox-select-group | 是 | 标记当前组件是是checkbox组|无
    > string | checkbox-select-all | 是 | 标记可以触发所有checkbox选中的DOM|无
    > string | checkbox-select-item | 是 | 标记可以被全选checkbox触发选中的checkbox的DOM|无
    >
>

<div class="doc-views">
	<div checkbox-select-group>
		<label class="ant-checkbox-wrapper">
		    <span class="ant-checkbox">
		        <input type="checkbox" class="ant-checkbox-input" value="on" name="selectAll" checkbox-select-all="">
		        <span class="ant-checkbox-inner"></span>
		    </span>
		    选择全部
		</label>
		<label class="ant-checkbox-wrapper">
		    <span class="ant-checkbox">
		        <input type="checkbox" class="ant-checkbox-input" value="on1" checkbox-select-item="" name="s">
		        <span class="ant-checkbox-inner"></span>
		    </span>
		</label>
		<label class="ant-checkbox-wrapper">
		    <span class="ant-checkbox">
		        <input type="checkbox" class="ant-checkbox-input" value="on2" checkbox-select-item="" name="s">
		        <span class="ant-checkbox-inner"></span>
		    </span>
		</label>
		<label class="ant-checkbox-wrapper">
		    <span class="ant-checkbox">
		        <input type="checkbox" class="ant-checkbox-input" value="on3" checkbox-select-item="" name="s">
		        <span class="ant-checkbox-inner"></span>
		    </span>
		</label>
		<label class="ant-checkbox-wrapper">
		    <span class="ant-checkbox">
		        <input type="checkbox" class="ant-checkbox-input" value="on4" checkbox-select-item="" name="s">
		        <span class="ant-checkbox-inner"></span>
		    </span>
		</label>
	</div>
</div>

---

## checkbox与表格(高亮选择的行)
<div class="doc-views">
	<div class="ant-table ant-table-small" style="background:#fff">
    <div class="ant-table-content">
        <div class="ant-table-body">
              <table checkbox-select-group>
    <colgroup>
        <col>
        <col>
        <col>
    </colgroup>
    <thead class="ant-table-thead">
        <tr>
            <th>
                <span>
                    <label class="ant-checkbox-wrapper">
                        <span class="ant-checkbox">
                            <input type="checkbox" class="ant-checkbox-input" value="on" name="selectAll" checkbox-select-all="">
                            <span class="ant-checkbox-inner"></span>
                        </span>
                        选择全部
                    </label>
                </span>
            </th>
            <th>
                <span>Age</span>
            </th>
            <th>
                <span>Address</span>
            </th>
        </tr>
    </thead>
    <tbody class="ant-table-tbody">
        <tr class="ant-table-row  ant-table-row-level-0">
            <td>
				 <label class="ant-checkbox-wrapper">
                    <span class="ant-checkbox">
                        <input type="checkbox" class="ant-checkbox-input" value="on2" checkbox-select-item="" name="s">
                        <span class="ant-checkbox-inner"></span>
                    </span>
                </label>
            </td>
            <td>32</td>
            <td>New York No. 1 Lake </td>
        </tr>
        <tr class="ant-table-row  ant-table-row-level-0">
            <td>
                <label class="ant-checkbox-wrapper">
                    <span class="ant-checkbox">
                        <input type="checkbox" class="ant-checkbox-input" value="on2" checkbox-select-item="" name="s">
                        <span class="ant-checkbox-inner"></span>
                    </span>
                </label>
            </td>
            <td>42</td>
            <td>London No. 1 Lake </td>
        </tr>
        <tr class="ant-table-row  ant-table-row-level-0">
            <td>
                <label class="ant-checkbox-wrapper">
                    <span class="ant-checkbox">
                        <input type="checkbox" class="ant-checkbox-input" value="on2" checkbox-select-item="" name="s">
                        <span class="ant-checkbox-inner"></span>
                    </span>
                </label>
            </td>
            <td>32</td>
            <td> No. 1 Lake </td>
        </tr>
    </tbody>
</table>
        </div>
</div>
</div>

---