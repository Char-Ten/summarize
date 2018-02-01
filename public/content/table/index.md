# Table 表格
---
### 基本结构：
<div class="doc-views">
<div class="ant-table ant-table-small" style="background:#fff">
	<div class="ant-table-content">
		<div class="ant-table-body">
			<table>
				<colgroup>
					<col>
					<col>
					<col>
				</colgroup>
				<thead class="ant-table-thead">
					<tr>
						<th>
							<span>Name</span>
						</th>
						<th>
							<span>Age</span>
						</th>
						<th >
							<span>Address</span>
						</th>
					</tr>
				</thead>
				<tbody class="ant-table-tbody">
					<tr class="ant-table-row  ant-table-row-level-0">
						<td>
							<span class="ant-table-row-indent indent-level-0" style="padding-left: 0px;"></span>John Brown</td>
						<td>32</td>
						<td>New York No. 1 Lake </td>
					</tr>
					<tr class="ant-table-row  ant-table-row-level-0">
						<td>
							<span class="ant-table-row-indent indent-level-0" style="padding-left: 0px;"></span>Jim Green</td>
						<td>42</td>
						<td>London No. 1 Lake </td>
					</tr>
					<tr class="ant-table-row  ant-table-row-level-0">
						<td>
							<span class="ant-table-row-indent indent-level-0" style="padding-left: 0px;"></span>Joe Black</td>
						<td>32</td>
						<td> No. 1 Lake </td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</div>

因为在蚂蚁金服antd这个框架中，表格是相对来说功能比较复杂的，当然结合react来使用的话会很简单，不过要用于jq的话就不简单了，这里提供了一个  
[表格工具](/#/designer/table)  
用于简单地生成表格的html字符串。