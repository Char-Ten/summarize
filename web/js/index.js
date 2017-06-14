/**echarts 图表 */

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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        data: [10, 25, 15, 45, 68, 22, 33]
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
        data: [10, 25, 15, 45, 55, 22, 33]
    }]

}

;
(function() {
    Vue.component('e-charts', {
        template: '#chartTpl',
        data: function() {
            return {
                opt: opt
            }
        },
        mounted: function() {
            var chart = echarts.init(document.getElementById('chart'))
            chart.setOption(opt);
        }
    });

    Vue.component('page-price', {
        template: '#priceChartPageTpl',
        data: function() {
            return {}
        }
    });

    Vue.component('page-market', {
        template: '#marketPageTpl',
        data: function() {
            return {
                th: ['市场', '价格', '幅度']
            }
        }
    });

    Vue.component('price-list', {
        template: '#priceListTpl',
        data: function() {
            var items = [];
            for (var i = 0; i < 10; i++) {
                items.push(Math.random() * 2);
                //items.push(1)
            }
            return {
                items: items
            }
        },
        props: ['data'],
        computed: {
            backSortList: function() {
                return this.items.sort(function(a, b) {
                    return a < b
                })
            },
            backMean: function() {
                var all = 0;
                var len = this.backSortList.length;
                for (var i = 0; i < len; i++) {
                    all += this.backSortList[i]
                }
                return (all / len)
            },
            backLineLeft: function() {
                return { left: this.backMean * 100 / this.backSortList[0] + '%' }
            },
            backPanleLeft: function() {
                var left = this.backMean * 100 / this.backSortList[0]
                return {
                    left: left + '%',
                    transform: 'translateX(-' + (left - 6) + '%)'
                }
            }
        },
        methods: {
            backBarWidth: function(item) {
                var max = this.backSortList[0];
                return { width: item * 100 / max + '%' }
            },
            backOutMeanWidth: function(item) {
                var out = item - this.backMean;
                if (out < 0) {
                    return { width: 0 }
                }
                var max = this.backSortList[0];
                return { width: out * 100 / item + '%' }
            },
            handleFixed2: function(item) {
                return item.toFixed(2)
            }
        }
    });

    Vue.component('price-range', {
        template: '#priceRangeTpl',
        props: ['value', 'prevValue'],
        computed: {
            backRange: function() {
                return this.value - this.prevValue;
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




;
(function() {
    var app = new Vue({
        el: '#app',
        data: {
            tabIndex: 0,
            tabPage: ['page-price', 'page-market']
        },
        methods: {
            backClass4TabItem: function(i) {
                if (i === this.tabIndex) {
                    return 'bd__tab-item--active'
                }
            },
            eventClickTabItem: function(i) {
                this.tabIndex = i;
            }
        },
        mounted: function() {

        }
    })
})();