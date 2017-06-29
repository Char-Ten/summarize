;
(function() {
    window.app = new Vue({
        el: '#app',
        data: {
            iframeIndex: 0,
            iframeSrcList: ['/dataCollect', '/dataManage', '/dataManage', '/dataCollect']
        },
        methods: {
            eventAsideItemClick: function(i) {
                this.iframeIndex = i
            }
        }
    })
})();