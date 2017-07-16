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
            deviceList: [],
            deviceNameList: []
        },
        methods: {
            eventAsideItemClick: function(i) {
                this.iframeIndex = i
            },
            eventLogout: function() {
                localStorage.clear();
                window.location.href = '/login'
            },
            /**获取设备列表 */
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
                        app.deviceList = res.data.data;
                        return res.data.data;
                    }
                }).then(function() {
                    Eet.$emit('loadDeviceListEnd');
                })
            },
            /**获取设备名字列表 */
            reqGetDeviceNameList: function() {
                return ajax({
                    url: '/instrumentConfig/getHost',
                    method: 'get',
                    params: {
                        currentUser: this.userData.username,
                        accessToken: this.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        app.deviceNameList = res.data;
                        Eet.$emit('reqDeviceNameListEnd')
                    }
                })
            },
            /**获取用户信息 */
            reqGetUserData: function() {
                return ajax({
                    url: '/index/getUserInfo',
                    params: {
                        username: this.userData.username,
                        accessToken: this.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        for (var attr in res.data) {
                            userData[attr] = res.data[attr];
                        }
                    } else {
                        throw 'error to get user msg'
                    }
                })
            },
        },
        mounted: function() {
            var self = this;
            this.reqGetUserData();
            this.reqGetDeviceList();
            this.reqGetDeviceNameList();
            Eet.$on('reloadDeviceList', this.reqGetDeviceList.bind(this))

        }
    })
})();