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
                console.log(currentPage)
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
                }).catch(function(res) {
                    console.log(res)
                })

            },
        }
    });
})();

;
(function() {
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
                return ajax({
                    url: '/dataManage/singleSensorQuery',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.tableData = res.data
                    }
                })
            },
        }
    });
})();

;
(function() {
    Vue.component('search-many-device', {
        template: '#searchManyDeviceTpl',
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
                endTime: ''
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
                return ajax({
                    url: '/dataManage/singleSensorQuery',
                    params: this.form
                })
            },
        }
    });
})();

;
(function() {
    Vue.component('search-point', {
        template: '#searchPointTpl',
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

// ;
// (function() {
//     var charts;
//     Vue.component('charts', {
//         template: '#chartTpl',
//         props: ['chartData'],
//         computed: {
//             setOption: function() {
//                 var options = {};
//                 var options = {
//                     title: {
//                         text: '主机过程线'
//                     },
//                     legend: {
//                         data: []
//                     },
//                     xAxis: {
//                         data: []
//                     },
//                     dataZoom: {
//                         type: 'slider',
//                         realtime: true,
//                         start: 0,
//                         end: 50
//                     },
//                     yAxis: [{
//                         type: 'value',
//                         splitNumber: 2,
//                         scale: true,
//                         splitLine: {
//                             show: false
//                         },
//                         axisLine: {
//                             show: false,
//                             lineStyle: {
//                                 color: '#dbdbdb'
//                             }
//                         },
//                         axisTick: {
//                             show: false
//                         }
//                     }],
//                     series: [{
//                         name: '',
//                         type: 'line',
//                         data: []
//                     }]
//                 };
//                 if (Array.isArray(this.chartData)) {
//                     console.log(this.chartData)
//                     options.legend.data = [this.chartData[0].ch];
//                     var series = {
//                         name: this.chartData[0].ch,
//                         type: 'line',
//                         data: []
//                     }
//                     for (var i = 0; i < this.chartData.length; i++) {
//                         series.data.push(this.chartData[i].value);
//                         options.xAxis.data.push(this.chartData[i].alltime)
//                     }
//                 } else if (typeof this.chartData === 'object' && this.chartData) {

//                 }
//                 console.log(options)

//                 charts.setOption(options);
//                 return 0
//             }
//         },
//         mounted: function() {
//             charts = echarts.init(this.$refs['echarts']);
//             var options = {
//                 title: {
//                     text: '主机过程线'
//                 },
//                 legend: {
//                     data: []
//                 },
//                 xAxis: {
//                     data: []
//                 },
//                 dataZoom: {
//                     type: 'slider',
//                     realtime: true,
//                     start: 0,
//                     end: 50
//                 },
//                 yAxis: [{
//                     type: 'value',
//                     splitNumber: 2,
//                     scale: true,
//                     splitLine: {
//                         show: false
//                     },
//                     axisLine: {
//                         show: false,
//                         lineStyle: {
//                             color: '#dbdbdb'
//                         }
//                     },
//                     axisTick: {
//                         show: false
//                     }
//                 }],
//                 series: [{
//                     name: '',
//                     type: 'line',
//                     data: []
//                 }]
//             };
//             if (Array.isArray(this.chartData)) {
//                 console.log(this.chartData)
//                 options.legend.data = [this.chartData[0].ch];
//                 var series = {
//                     name: this.chartData[0].ch,
//                     type: 'line',
//                     data: []
//                 }
//                 for (var i = 0; i < this.chartData.length; i++) {
//                     series.data.push(this.chartData[i].value);
//                     options.xAxis.data.push(this.chartData[i].alltime)
//                 }
//             } else if (typeof this.chartData === 'object' && this.chartData) {

//             }
//             console.log(options)

//             charts.setOption(options)
//         }
//     })
// })();

;
(function() {
    window.app = new Vue({
        el: '#dataMange',
        data: {
            navList: ['表格查询', '单传感器查询', '多传感器查询', '定点查询', '速率变化查询'],
            navAtv: 0,
            navCtList: ['search-table', 'search-single-device', 'search-many-device', 'search-point', 'search-speed'],
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