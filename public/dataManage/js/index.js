;
(function() {
    Vue.component('search-table', {
        template: '#searchTableTpl',
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
    Vue.component('search-single-device', {
        template: '#searchSingleDeviceTpl',
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
    Vue.component('search-many-device', {
        template: '#searchManyDeviceTpl',
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

;
(function() {
    window.app = new Vue({
        el: '#dataMange',
        data: {
            navList: ['表格查询', '单传感器查询', '多传感器查询', '定点查询', '速率变化查询'],
            navAtv: 0,
            navCtList: ['search-table', 'search-single-device', 'search-many-device', 'search-point', 'search-speed'],
        },
        methods: {
            eventNavItemClick: function(index) {
                this.navAtv = index
            }
        }
    })
})();