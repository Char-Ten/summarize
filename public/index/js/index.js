var ajax = axios.create({
    baseURL: '/api/site'
});
var userData = {
    username: localStorage.getItem('username'),
    accessToken: localStorage.getItem('accessToken')
};
var Eet = new Vue();
(function() {
    window.app = new Vue({
        el: '#app',
        data: {
            iframeIndex: 0,
            iframeSrcList: ['./dataCollect', './dataManage', './deviceSetting', './setting'],
            userData: userData,
            deviceList: []
        },
        methods: {
            eventAsideItemClick: function(i) {
                this.iframeIndex = i
            },
            eventLogout: function() {
                localStorage.clear();
                window.location.href = '/login'
            },
            reqGetDeviceList: function() {
                return ajax({
                    url: '/dataCollection/listSiteset',
                    method: 'get',
                    params: {
                        username: this.userData.username,
                        accessToken: this.userData.accessToken
                    }
                }).then(function(res) {
                    if (res.data.msg === 'ok') {
                        app.deviceList = res.data.data
                    }
                })
            },
            reqGetUserData: function() {
                return ajax({
                    url: '/index/getUserInfo',
                    params: {
                        username: this.userData.username,
                        accessToken: this.userData.accessToken
                    }
                }).then(function(res) {

                })
            }
        },
        mounted: function() {
            var self = this;
            this.reqGetUserData().then(function(res) {
                if (res.msg === 'ok') {
                    console.log(res)
                }
            });
            this.reqGetDeviceList()
            Eet.$on('reloadDeviceList', function() {
                self.reqGetDeviceList();
            })

        }
    })
})();