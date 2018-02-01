# TAB
---
### 标签
> 类型 | 标签 | 是否必填 | 说明|参数
    > ---|---|-------|-------
    > string | data-toggle | 是 | 标记当前组件是tab|"tab"
    > string | tab-trigger-item| 是 | 标记tab列表|无
    > string | tab-content-item | 是 | 标记内容列表|无
    >
>
<div class="doc-views">
<div class="ant-tabs ant-tabs-top  ant-tabs-line" data-toggle="tab">
    <div role="tablist" class="ant-tabs-bar" tabindex="0">
        <div class="ant-tabs-nav-container">
            <div class="ant-tabs-nav-wrap">
                <div class="ant-tabs-nav-scroll">
                    <div class="ant-tabs-nav ant-tabs-nav-animated">
                        <div class="ant-tabs-tab-active  ant-tabs-tab j-ant-tabs-tab" tab-trigger-item="">通知
                            <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"></div>
                        </div>
                        <div class=" ant-tabs-tab j-ant-tabs-tab" tab-trigger-item="">消息
                            <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"></div>
                        </div>
                        <div class="ant-tabs-tab j-ant-tabs-tab" tab-trigger-item="">待办
                            <div class="ant-tabs-ink-bar ant-tabs-ink-bar-animated"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ant-tabs-content">
        <div role="tabpanel" class="ant-tabs-content-item" tab-content-item="">
            <p style="line-height:300px;text-align: center;">content1</p>
        </div>
        <div role="tabpanel" class="ant-tabs-content-item" tab-content-item="">
            <p style="line-height:300px;text-align: center;">content2</p>
        </div>
        <div role="tabpanel" class="ant-tabs-content-item" tab-content-item="">
            <p style="line-height:300px;text-align: center;">content3</p>
        </div>
    </div>
</div>
</div>

---

