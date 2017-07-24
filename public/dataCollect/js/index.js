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
                charts: null,
                isShowTable: false,
                linkStausList: [],
                nowDataList: [],

                timer: null,
                finalTimes: 120,
                realTimeList: [],
                charts2: null,
                isFirst: true
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
            eventSearchNowData: function() {
                this.nowDataList = [];
                this.reqSearchNowData()
            },
            eventSearchRealTimeData: function() {
                // this.timer = new EventSource('/api/site/dataCollection/getRealTimeData?en=' + this.en + '&accessToken=' + window.parent.userData.accessToken + '&isFirst=true');
                // this.timer.onmessage = function(res) {
                //     console.log(res)
                // }
                var a1 = new Date().getTime();
                var self = this
                ajax({
                    url: '/dataCollection/getRealTimeData',
                    method: 'get',
                    params: {
                        en: this.en,
                        accessToken: window.parent.userData.accessToken,
                        isFirst: true
                    }
                }).then(function(res) {
                    var a2 = new Date().getTime();
                    console.log(a2 - a1)
                    return res.data
                }).then(function() {
                    var timer = new EventSource('/api/site/dataCollection/getRealTimeData?en=' + self.en + '&accessToken=' + window.parent.userData.accessToken + '&isFirst=true');
                    timer.onmessage = function(res) {
                        console.log(res)
                    }
                    timer.onerror = function(res) {
                        console.log(res)
                    }
                })

            },
            eventSearchRealTimeDataEnd: function() {},
            reqSearchLinkStatus: function() {
                var self = this;
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
                        self.$message.error(res.data.msg)
                    }
                }, function(res) {
                    self.$message.error('网络出现问题，请稍候重试')
                })
            },
            reqSearchNowData: function() {
                var self = this;
                self.nowDataList = [];
                return ajax({
                    url: '/dataCollection/getLatestData',
                    params: {
                        en: this.en,
                        site: this.site,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        return res.data;
                        //setCharts(self.charts, res.data)
                    } else {
                        self.$message.error(res.msg)
                    }
                }).then(function(res) {
                    if (res.chs && res.chs.length) {
                        self.nowDataList = res.data;
                        setCharts(self.charts, res)
                    } else {
                        self.$message.error('暂无数据')
                    }
                }, function(res) {
                    self.$message.error('网络出现问题，请稍候重试')
                })
            },
            reqSearchRealTime: function() {
                // var self = this;
                // ajax({
                //     url: '/dataCollection/getRealTimeData',
                //     params: {
                //         en: this.en,
                //         accessToken: window.parent.userData.accessToken,
                //         isFirst: this.isFirst
                //     }
                // }).then(function(res) {
                //     return res.data
                // }).then(function(res) {
                //     if (res.msg === 'ok') {
                //         this.isFirst = false
                //         return res.data
                //     } else {
                //         res.$message.error(res.msg)
                //         throw new Error('fuck data')
                //     }
                // }).then(function(res) {
                //     if (res.chs && res.chs.length) {
                //         self.realTimeList = res.data;
                //         setCharts(self.charts2, res);
                //     } else {
                //         self.$message('暂无数据')
                //     }
                // })
            },
            reqSearchRealTimeAfter: function() {

            }
        },
        mounted: function() {
            this.charts = echarts.init(this.$refs['echarts']);
            this.charts2 = echarts.init(this.$refs['echarts2']);
            var self = this;
            window.parent.addEventListener('unload', function() {
                self.reqSearchRealTimeAfter();
            });
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



function setCharts(ec, data) {
    var opts = {
        title: {
            text: '主机过程线'
        },
        legend: {
            data: []
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: []
        },
        dataZoom: {
            type: 'slider',
            realtime: true,
            start: 0,
            end: 50
        },
        tooltip: {
            trigger: 'axis'
        },
        yAxis: [{
            type: 'value',
            splitNumber: 2,
            scale: true,
            splitLine: {
                show: true
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#dbdbdb'
                }
            },
            axisTick: {
                show: false
            }
        }],
        series: [{
            name: '',
            type: 'line',
            data: [],
            smooth: false
        }]
    };
    if (Array.isArray(data)) {
        opts.legend.data = [data[0].ch];
        var series = {
            name: data[0].ch,
            type: 'line',
            data: [],
            smooth: false
        }
        for (var i = 0; i < data.length; i++) {
            series.data.push(data[i].value);
            opts.xAxis.data.push(data[i].alltime)
        }
        opts.series = series;
    } else if (typeof data === 'object' && data) {
        if (data.serviceData) {
            opts.series = [];
            var bool = true;
            for (var attr in data.serviceData) {
                opts.legend.data.push(attr);
                var series = {
                    name: attr,
                    type: 'line',
                    smooth: false,
                    data: []
                }
                for (var i = 0; i < data.serviceData[attr].length; i++) {
                    if (bool) {
                        opts.xAxis.data.push(data.serviceData[attr][i].alltime)
                    }
                    series.data.push(data.serviceData[attr][i].value);
                }
                bool = false
                opts.series.push(series)
            }

        }
    }
    ec.setOption(opts)
}