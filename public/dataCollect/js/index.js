try {
    var ajax = axios.create({
        baseURL: '/api/site'
    })
} catch (e) {
    loadindeFaile();
}

;
(function() {
    Vue.component('device-table-1', {
        template: '#deviceTable1Tpl',
        props: {
            linkStatusData: Object
        },
    });
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
                isFirst: true,
                isLoop: false,
                count: 0,
                sec: 0,
                isShowCharts2: false
            }
        },
        methods: {
            eventSearchLinkStatus: function() {
                var self = this;
                this.reqSearchLinkStatus().then(function(res) {
                    self.linkStausList = [{
                        en: self.en,
                        status: res
                    }];
                    self.isShowTable = true;
                })
            },
            eventSearchNowData: function() {
                this.nowDataList = [];
                this.reqSearchNowData()
            },
            eventSearchRealTimeData: function() {
                window.parent.Eet.$emit('endRealTime')
                var self = this;
                this.isShowCharts2 = true;
                this.reqSearchRealTimeBefore();

            },
            eventSearchRealTimeDataEnd: function() {
                this.isLoop && this.reqSearchRealTimeAfter();
                this.isLoop = false;
                this.count = 0;
                this.sec = 0;
                this.isShowCharts2 = false;
            },
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
            reqSearchRealTimeBefore: function() {
                var self = this;
                ajax({
                    url: '/dataCollection/getRealTimeDataBefore',
                    method: 'post',
                    params: {
                        en: this.en,
                        accessToken: window.parent.userData.accessToken,
                        isFirst: this.isFirst
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.isLoop = true;
                        self.sec = 0;
                        self.count = 0;
                        return res.data
                    } else {
                        res.$message.error(res.msg)
                        throw new Error('fuck data')
                    }
                }).then(this.reqSearchRealTime);
            },
            reqSearchRealTime: function() {
                var self = this;
                return ajax({
                    url: '/dataCollection/getRealTimeData',
                    params: {
                        en: this.en,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.count++;
                        clearInterval(self.timer)
                        self.timer = setInterval(function() {
                            if (!self.isLoop) {
                                clearInterval(self.timer)
                            }
                            self.sec++;
                            if (self.sec % 120 === 0) {
                                self.reqSearchRealTime();
                            }
                            self.finalTimes = 120 - self.sec % 120
                        }, 1000);
                        setCharts(self.charts2, res.data)
                    } else {
                        self.isFirst = false
                        self.reqSearchRealTimeBefore();
                    }
                })
            },
            reqSearchRealTimeAfter: function() {
                ajax({
                    url: '/dataCollection/getRealTimeDataAfter',
                    method: 'post',
                    params: {
                        en: this.en,
                        accessToken: window.parent.userData.accessToken
                    }
                })
            }
        },
        mounted: function() {
            this.charts = echarts.init(this.$refs['echarts']);
            this.charts2 = echarts.init(this.$refs['echarts2']);
            var self = this;
            window.parent.addEventListener('unload', function() {
                window.parent.Eet.$emit('endRealTime')
            });
            window.parent.Eet.$on('endRealTime', this.eventSearchRealTimeDataEnd)
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