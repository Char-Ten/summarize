var ajax = axios.create({
    baseURL: '/api/site'
});;
(function() {
    Vue.component('search-table', {
        template: '#searchTableTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    currentPage: 1,
                    en: '',
                    ch: '',
                    startTime: '',
                    endTime: '',
                    accessToken: window.parent.userData.accessToken
                },
                startTime: '',
                endTime: '',
                tableData: [],
                totalPage: 0
            }
        },
        methods: {
            eventSelectStartTime: function(date) {
                this.form.startTime = date;
            },
            eventSelectEndTime: function(date) {
                this.form.endTime = date
            },
            eventChangePage: function(currentPage) {
                this.form.currentPage = currentPage;
                this.eventSearch();
            },
            /**表格查询 */
            eventSearch: function() {
                var self = this;
                return ajax({
                    url: '/dataManage/tableQuery',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.tableData = res.data.tableData;
                        self.totalPage = res.data.totalPage
                        return res.data
                    } else {
                        throw res.msg;
                        return res.msg
                    }
                }).catch(function(res) {})

            },
        }
    });
})();

;
(function() {
    var charts;
    Vue.component('search-single-device', {
        template: '#searchSingleDeviceTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    en: '',
                    ch: '',
                    startTime: '',
                    endTime: '',
                    accessToken: window.parent.userData.accessToken
                },
                startTime: '',
                endTime: '',
                tableData: []
            }
        },
        methods: {
            eventSelectStartTime: function(date) {
                this.form.startTime = date;
            },
            eventSelectEndTime: function(date) {
                this.form.endTime = date
            },
            /**单传感器查询 */
            eventSearch: function() {
                var self = this;
                this.tableData = [];
                return ajax({
                    url: '/dataManage/singleSensorQuery',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.tableData = res.data;
                        setCharts(charts, res.data)
                    }
                })
            },
            setEcharts: setCharts
        },
        mounted: function() {
            charts = echarts.init(this.$refs['echarts']);
        }
    });
})();

;
(function() {
    var charts
    Vue.component('search-many-device', {
        template: '#searchManyDeviceTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    en: '',
                    chs: [],
                    startTime: '',
                    endTime: '',
                    accessToken: window.parent.userData.accessToken
                },
                startTime: '',
                endTime: '',
                tableData: [],
                charts: null
            }
        },
        methods: {
            eventSelectStartTime: function(date) {
                this.form.startTime = date;
            },
            eventSelectEndTime: function(date) {
                this.form.endTime = date
            },
            /**多传感器查询 */
            eventSearch: function() {
                var self = this;
                var params = [];
                this.tableData = [];
                for (var attr in this.form) {
                    if (Array.isArray(this.form[attr])) {
                        for (var i = 0; i < this.form[attr].length; i++) {
                            params.push(attr + '=' + this.form[attr][i])
                        }
                    } else {
                        params.push(attr + '=' + this.form[attr])
                    }
                }
                return ajax({
                    url: '/dataManage/multiSensorQuery?' + params.join('&'),
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.tableData = res.data;
                        setCharts(self.charts, res.data)
                    } else {
                        throw new Error(res.msg)
                    }
                })
            },
        },
        mounted: function() {
            this.charts = echarts.init(this.$refs['echarts']);
        }
    });
})();

;
(function() {
    Vue.component('search-point', {
        template: '#searchPointTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    en: '',
                    chs: [],
                    startTime: '',
                    endTime: '',
                    accessToken: window.parent.userData.accessToken,
                    timePont: ''
                },
                startTime: '',
                endTime: '',
                timeList: [],
                tableData: [],
            }
        },
        methods: {
            eventSelectStartTime: function(date) {
                this.form.startTime = date;
                this.reqGetTimeList();
            },
            eventSelectEndTime: function(date) {
                this.form.endTime = date;
                this.reqGetTimeList();
            },
            eventSearch: function() {
                var self = this;
                var params = [];
                for (var attr in this.form) {
                    if (Array.isArray(this.form[attr])) {
                        for (var i = 0; i < this.form[attr].length; i++) {
                            params.push(attr + '=' + this.form[attr][i])
                        }
                    } else {
                        params.push(attr + '=' + this.form[attr])
                    }
                }
                ajax({
                    url: '/dataManage/pointQuery?' + params.join('&')
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        var a = [];
                        for (var attr in res.data) {
                            a.push(res.data[attr])
                        }
                        self.tableData = a;
                        a = null
                    }
                })
            },
            reqGetTimeList: function() {
                var self = this;
                if (!this.form.en) {
                    return
                }
                if (!this.form.startTime) {
                    return
                }
                ajax({
                    url: '/dataManage/getAlltimePoint',
                    params: {
                        en: this.form.en,
                        startTime: this.form.startTime,
                        endTime: this.form.endTime || '',
                        accessToken: this.form.accessToken,
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.timeList = res.data
                    }
                })
            },

        },
        mounted: function() {}
    });
})();

;
(function() {
    Vue.component('search-speed', {
        template: '#searchSpeedTpl',
        data: function() {
            return {
                form: {
                    serviceName: '',
                    beginTime: ''
                },
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
            }
        }
    });
})();

;
(function() {
    window.app = new Vue({
        el: '#dataMange',
        data: {
            navList: ['表格查询', '单传感器查询', '多传感器查询', '定点查询' /*, '速率变化查询'*/ ],
            navAtv: 0,
            navCtList: ['search-table', 'search-single-device', 'search-many-device', 'search-point' /*, 'search-speed'*/ ],
            diveceNameList: [],
            diveceChildrenNameList: []
        },
        methods: {
            eventNavItemClick: function(index) {
                this.navAtv = index
            },
            setDiveceNameList: function() {
                this.diveceNameList = window.parent.app.deviceNameList
            }
        },
        mounted: function() {
            this.setDiveceNameList();
            window.parent.Eet.$on('reqDeviceNameListEnd', this.setDiveceNameList);
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