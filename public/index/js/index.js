;
(function() {
    window.app = new Vue({
        el: '#app',
        data: {
            iframeIndex: 0,
            iframeSrcList: ['./dataCollect', './dataManage', './deviceSetting', './setting']
        },
        methods: {
            eventAsideItemClick: function(i) {
                this.iframeIndex = i
            }
        }
    })
})();