var ajax = axios.create({
    baseURL: '/api/site'
});

;
(function() {
    Vue.component('device-table-1', {
        template: '#deviceTable1Tpl',
        props: {
            linkStatusData: Object
        },
    })
})();

;
(function() {
    Vue.component('device-item', {
        template: '#deviceItemTpl',
        props: ['en', 'site'],
        data: function() {
            return {
                isShowTable: false,
                linkStausList: []
            }
        },
        methods: {
            eventSearchLinkStatus: function() {
                var self = this;
                this.reqSearchLinkStatus().then(function(res) {
                    self.linkStausList = res;
                    self.isShowTable = true;
                })
            },
            reqSearchLinkStatus: function() {
                return ajax({
                    url: '/dataCollection/getEnStatus',
                    method: 'get',
                    params: {
                        accessToken: window.parent.userData.accessToken,
                        en: this.en
                    }
                }).then(function(res) {
                    if (res.data.msg === 'ok') {
                        return res.data.data
                    } else {
                        throw '请求错误'
                    }
                })
            }
        }
    })
})();


;
(function() {
    window.app = new Vue({
        el: '#deviceList',
        data: {
            deviceList: []
        },
        mounted: function() {
            this.deviceList = window.parent.app.deviceList;
            var self = this;
            window.parent.Eet.$on('loadDeviceListEnd', function() {
                self.deviceList = window.parent.app.deviceList;
            })
        }
    })
})();