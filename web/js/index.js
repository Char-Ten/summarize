var Eet = new Vue();
var tooltipTpl = document.getElementById('tooltipTpl').innerHTML;
var opt = {
    legend: {
        orient: 'vertical',
        right: 0,
        padding: 0,
        itemGap: 1,
        tooltip: {
            show: false
        },
        data: [{
            name: '当地平均价格',
            textStyle: {
                color: '#2E91E6',
            },
        }, {
            name: '全国平均价格',
            textStyle: {
                color: '#A0E227'
            }
        }]
    },
    xAxis: [{
        type: 'category',
        name: '日期',
        splitNumber: 5,
        boundaryGap: false,
        data: [],
        axisLine: {
            lineStyle: {
                color: '#dbdbdb'
            }
        }
    }],
    yAxis: [{
        type: 'value',
        splitNumber: 2,
        scale: true,
        splitLine: {
            show: false
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
    grid: {
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '25%',
        containLabel: true
    },
    tooltip: {
        trigger: 'axis',
        backgroundColor: null,
        borderWidth: 0,
        padding: 0,
        textStyle: {
            color: '#505050'
        },
        alwaysShowContent: true,
        position: 'bottom',
        formatter: function(obj) {
            var val0 = '';
            var val1 = '';
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].seriesName === '当地平均价格') {
                    val0 = obj[i].value;
                } else {
                    val1 = obj[i].value;
                }
            }
            return tooltipTpl
                .replace('{0}', val0)
                .replace('{1}', val1)
        }
    },
    dataZoom: {
        type: 'slider',
        realtime: true,
        start: 0,
        end: 50
    },
    series: [{
        name: '当地平均价格',
        type: 'line',
        areaStyle: {
            normal: {
                color: 'rgba(0,136,228,0.2)'
            }
        },
        itemStyle: {
            normal: {
                color: '#2E91E6'
            }
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        smooth: true,
        data: []
    }, {
        name: '全国平均价格',
        type: 'line',
        areaStyle: {
            normal: {
                color: 'rgba(157,225,14,0.2)'
            }
        },
        itemStyle: {
            normal: {
                color: '#A0E227'
            }
        },
        lineStyle: {
            normal: {
                width: 1
            }
        },
        smooth: true,
        data: []
    }]
}

axios.defaults.baseURL = '/api'

;
(function() {
    Vue.component('e-charts', {
        template: '#chartTpl',
        data: function() {
            return {
                c: null,
                date: [],
                dateT: [],
                nation: [],
                local: []
            }
        },
        methods: {
            eventEndChartData: function(res) {
                opt.xAxis[0].data = this.setDate(res[0]);
                opt.series[0].data = this.setSeriesData(res[0]);
                opt.series[1].data = this.setSeriesData(res[1]);
                this.c.setOption(opt)
            },
            setDate: function(arr) {
                var d = new Date();
                var toDay = d.getFullYear() + '/' + setDate(d.getTime());
                var toDayT = new Date(toDay).getTime();
                var dateT = [];
                for (var i = 0; i < 15; i++) {
                    dateT[i] = toDayT - i * 86400000;
                }
                this.dateT = dateT;
                var date = [];
                for (var i = 14; i > 0; i--) {
                    date.push(setDate(dateT[i]));
                }
                return date;
            },
            setSeriesData: function(arr) {
                var a = [];
                var json = {};
                for (var i = 0; i < arr.length; i++) {
                    json[arr[i].publish_date] = arr[i];
                }
                for (var i = 0; i < 15; i++) {
                    a[i] = (json[this.dateT[i]] && json[this.dateT[i]].price) || 0

                }
                return a;
            }
        },
        mounted: function() {
            var chart = this.c = echarts.init(document.getElementById('chart'));
            chart.setOption(opt);
            Eet.$on('endChartData', this.eventEndChartData)
        }
    });

    Vue.component('page-price', {
        template: '#priceChartPageTpl',
        props: ['pageData', 'localPrices', 'nationPrices', 'meanPrices'],
        data: function() {
            return {
                meanPricesList: this.meanPrices
            }
        },
        computed: {
            _meanPricesList: function() {
                return this.meanPrices
            }
        },
        mounted: function() {}
    });

    Vue.component('page-market', {
        template: '#marketPageTpl',
        props: {
            nearMarket: {
                type: Array
            }
        },
        data: function() {
            return {
                th: ['市场', '价格', '幅度']
            }
        },
        computed: {
            nearMarketList: function() {
                return this.nearMarket
            }
        },
        methods: {
            eventClickTr: function(item) {
                location.hash = item.crop + '/' + item.market_name
            }
        }
    });


    Vue.component('price-list', {
        template: '#priceListTpl',
        props: {
            'list': {
                type: Array,
                defaults: [{ price: 0 }]
            }
        },
        data: function() {
            return {
                items: this.list || [{ price: 0 }]
            }
        },
        computed: {
            backSortList: function() {
                if (this.list.length === 0) {
                    return [{ price: 0 }]
                }
                return this.list.sort(function(a, b) {
                    return b.price - a.price
                })
            },
            backMean: function() {
                var all = 0;
                var len = this.backSortList.length;
                for (var i = 0; i < len; i++) {
                    all += this.backSortList[i].price
                }
                return isNaN(all / len) ? 0 : all / len;
            },
            backLineLeft: function() {
                return { left: this.backMean * 100 / this.backSortList[0].price + '%' }
            },
            backPanleLeft: function() {
                var left = this.backMean * 100 / this.backSortList[0].price
                return {
                    left: left + '%',
                    transform: 'translateX(-' + (left - 6) + '%)'
                }
            }
        },
        methods: {
            backBarWidth: function(item) {
                if (!this.backSortList[0]) {
                    return null
                }
                var max = this.backSortList[0].price;
                return { width: item * 100 / max + '%' }
            },
            backOutMeanWidth: function(item) {
                var out = item - this.backMean;
                if (out < 0) {
                    return { width: 0 }
                }
                var max = this.backSortList[0].price;
                return { width: out * 100 / item + '%' }
            },
            handleFixed2: function(item) {
                return item.toFixed(2)
            }
        },
        mounted: function() {
            var self = this;
            Eet.$on('endChartData', function(res) {
                self.items = res[2]
            })
        }
    });


    Vue.component('price-range', {
        template: '#priceRangeTpl',
        props: ['value', 'prevValue'],
        computed: {
            backRange: function() {
                var num = this.value - this.prevValue;
                if (isNaN(num)) {
                    return 0
                }
                return num
            },
            backColor: function() {
                if (this.backRange > 0) {
                    return '#ff4470'
                }
                return '#36d2a0'
            },
            backImage: function() {
                if (this.backRange > 0) {
                    return './img/range_up.png'
                }
                return './img/range_down.png'
            }
        }
    })
})();

; /**main */
(function() {
    window.app = new Vue({
        el: '#app',
        data: {
            tabIndex: 0,
            tabPage: ['page-price', 'page-market'],
            token: '',
            pageData: {},
            localPrices: [],
            nationPrices: [],
            meanPricesList: [],
            nearMarkeList: []
        },
        computed: {
            createTime: function() {
                var d = new Date();
                if (this.pageData.publish_date) {
                    d = new Date(this.pageData.publish_date)
                }
                return setDouble(d.getMonth() + 1) + '月' + setDouble(d.getDate()) + '日'

            }
        },
        methods: {
            backClass4TabItem: function(i) {
                if (i === this.tabIndex) {
                    return 'bd__tab-item--active'
                }
                return ''
            },
            eventClickTabItem: function(i) {
                this.tabIndex = i;
                if (i === 1) {
                    this.eventGetMarket();
                }
            },
            eventGetMarket: function() {
                this.reqGetNearMarketPrices().then(function(res) {
                    app.nearMarkeList = res;
                })
            },
            reqGetToken: function() {
                return axios({
                    url: '/ae/oauth/token',
                    method: 'post',
                    params: {
                        'client_id': 'airag',
                        'client_secret': 'airag',
                        'grant_type': 'password',
                        'username': 'defaultuser',
                        'password': 'defaultuser',
                    }
                }).then(function(res) {
                    return res.data.access_token
                })
            },
            reqGetMarketPrice: function() {
                var hash = location.hash.replace('#', '');
                var data = hash.split('/');
                return axios({
                    url: '/ae/app/price_quotation/price_trend/',
                    method: 'get',
                    params: {
                        'crop': data[0],
                        'market_name': data[1],
                        'access_token': this.token
                    },
                }).then(function(res) {
                    var data = res.data;
                    if (data.code === 0) {
                        return data.obj
                    }
                })
            },
            reqGetLocal15DaysPrices: function() {
                return axios({
                    url: '/ae/app/price_quotation/price_trend/days',
                    method: 'get',
                    params: setParam({
                        'city_id': this.pageData.city_id,
                        'county_id': this.pageData.county_id,
                        'nation_id': this.pageData.nation_id,
                        'province_id': this.pageData.province_id,
                        'crop': this.pageData.crop,
                        'access_token': this.token
                    })
                }).then(function(res) {
                    return res.data.obj
                })
            },
            reqGetNation15DaysPrices: function() {
                return axios({
                    url: '/ae/app/price_quotation/price_trend/days',
                    method: 'get',
                    params: setParam({
                        'nation_id': this.pageData.nation_id,
                        'crop': this.pageData.crop,
                        'access_token': this.token
                    })
                }).then(function(res) {
                    return res.data.obj
                })
            },
            reqGetMeanPrices: function() {
                return axios({
                    url: '/ae/app/price_quotation/price_trend/range',
                    method: 'get',
                    params: setParam({
                        'nation_id': this.pageData.nation_id,
                        'crop': this.pageData.crop,
                        'access_token': this.token
                    })
                }).then(function(res) {
                    return res.data.obj
                })
            },
            reqGetNearMarketPrices: function() {
                var self = this;
                return axios({
                    url: '/ae/app/price_quotation/price_trend',
                    method: 'get',
                    params: setParam({
                        'city_id': this.pageData.city_id,
                        'nation_id': this.pageData.nation_id,
                        'province_id': this.pageData.province_id,
                        'crop': this.pageData.crop,
                        'access_token': this.token
                    })
                }).then(function(res) {
                    var a = res.data.obj;
                    var b = [];
                    for (var i = 0; i < a.length; i++) {
                        if (a[i].id !== self.pageData.id) {
                            b.push(a[i])
                        }
                    }
                    return b
                })
            },
            handleInit: function() {
                this.tabIndex = 0;
                this.reqGetToken()
                    .then(function(token) {
                        app.token = token;
                        return app.reqGetMarketPrice()
                    })
                    .then(function(data) {
                        app.pageData = data[0];
                        return axios.all([app.reqGetLocal15DaysPrices(), app.reqGetNation15DaysPrices(), app.reqGetMeanPrices()])
                    })
                    .then(function(res) {
                        app.localPrices = res[0];
                        app.nationPrices = res[1];
                        app.meanPricesList = res[2];
                        Eet.$emit('endChartData', res);
                        return app.reqGetNearMarketPrices();
                    });
            }
        },
        mounted: function() {
            window.addEventListener('load', this.handleInit);
            window.addEventListener('hashchange', this.handleInit);
        }
    })
})();

function setParam(obj) {
    var json = {};
    for (var attr in obj) {
        if (obj[attr] || obj[attr] === 0) {
            json[attr] = obj[attr]
        }
    }
    return json
}

function setDate(num) {
    var d = new Date(num);
    return setDouble(d.getMonth() + 1) + '/' + setDouble(d.getDate())
}

function setDouble(num) {
    if (num < 10) {
        return '0' + num.toString()
    }
    return num
}