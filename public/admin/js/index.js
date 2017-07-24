var ajax = axios.create({
    baseURL: '/api/site'
});;
(function() {
    // 用户列表
    var cpt = null;
    Vue.component('userList', {
        template: '#userListTpl',
        data: function() {
            return {
                manage: ['普通用户', '普通管理员', '超级管理员'],
                tableData: [],
                totalPage: 0,
                form: {
                    accessToken: window.parent.userData.accessToken,
                    username: window.parent.userData.username,
                    currentPage: 1,
                    pageSize: 10,
                },
                addUserForm: {
                    username: '',
                    password: '',
                    accessToken: window.parent.userData.accessToken,
                    customerName: window.parent.userData.username,
                }
            }
        },
        computed: {
            isSub: function() {
                return !(this.addUserForm.username && this.addUserForm.password)
            }
        },
        methods: {
            eventChangePage: function(value) {
                this.form.currentPage = value;
                this.reqGetUserList();
            },
            eventChange: function() {
                this.reqAddUser()
            },
            eventBlurUsername: function() {
                if (!/[\w\u2E80-\u9FFF]{1,6}/g.test(this.addUserForm.username)) {
                    this.addUserForm.username = '';
                    this.$message.error('用户名不合法')
                }
            },
            eventBlurPasswd: function() {
                if (this.addUserForm.password.length < 6) {
                    this.addUserForm.password = '';
                    this.$message.error('密码不合法')
                }
            },
            reqGetUserList: function() {
                ajax({
                    url: '/backstage/listMember',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.tableData = res.data.memberList;
                        cpt.totalPage = res.data.totalPage;
                    }
                })
            },
            reqAddUser: function() {
                ajax({
                    url: '/backstage/addMember',
                    method: 'post',
                    data: this.addUserForm
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.$message.success('用户添加成功');
                        cpt.addUserForm.username = cpt.addUserForm.password = '';
                        cpt.reqGetUserList();
                    } else {
                        cpt.$message(res.msg)
                    }
                })
            },
            reqRemoveUser: function(name) {
                ajax({
                    url: '/backstage/delMember',
                    method: 'post',
                    data: {
                        username: name,
                        accessToken: window.parent.userData.accessToken,
                        customerName: window.parent.userData.username,
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.$message.success('用户被成功删除');
                        cpt.reqGetUserList();
                    } else {
                        cpt.$message(res.msg)
                    }
                })
            },
            isDeleteUser: function(data) {
                return data.manager === 0
            }
        },
        mounted: function() {
            cpt = this;
            this.reqGetUserList();
        }
    })
})();

;
(function() {
    var cpt = null;
    Vue.component('allUser', {
        template: '#allUserTpl',
        data: function() {
            return {
                allUsersData: [],
                allUserTotalPage: 1,
                managersData: [],
                ManagerTotalPage: 1,
                form: {
                    username: ''
                },
                confirmUsername: ''
            }
        },
        computed: {
            isSub: function() {}
        },
        methods: {
            eventChangeAllUserPage: function() {},
            eventChangeManagersPage: function() {},
            eventBlurConfirmUsername: function() {},
            eventBlurUsername: function() {},
            eventAddManager: function() {},

            reqGetManagerList: function() {},
            reqAddManagerList: function() {}
        },
        mounted: function() {
            cpt = this;
        }
    })
})();

;
(function() {
    var cpt = null;
    Vue.component('hostManage', {
        template: '#hostManageTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    en: '',
                    site: '',
                    time: 120,
                },
                siteList: [],
                time: {
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 300
                },
                chart: null,
                timer: null,
                isLoop: true,
                finalTime: 120,
                count: 0,
                noDataCount: 0,
                isReadData: false,
                isShowDialog: false,
                isSubmitClick: false,

                closeEn: '',
            }
        },
        computed: {
            isSub: function() {
                return !(this.form.en && this.form.site)
            },
            fomatTime: function() {
                var str = [];
                var keys = ['d', 'h', 'm', 's'];
                var unit = ['日', '时', '分', '秒']
                for (var i = 0; i < keys.length; i++) {
                    str.push(this.time[keys[i]] + unit[i])
                }
                return str.join('');
            },
            dataStatus: function() {
                return this.timer ? '数据采集中' : '数据监听停止'
            }
        },
        methods: {
            eventBlurTime: function() {
                for (var attr in this.time) {
                    this.time[attr] = this.time[attr] > 0 ? this.time[attr] : 0;
                }
                this.form.time = this.time.d * 3600 * 24 +
                    this.time.h * 3600 +
                    this.time.m * 60 +
                    this.time.s;
                if (this.form.time < 300) {
                    this.form.time = this.time.s = 300;
                }
            },
            eventSubmit: function() {},
            eventEnChange: function() {
                this.timer && this.handleCloseHost();
                this.siteList = [];
                this.form.site = ''
                this.reqGetSite();
            },
            eventSiteChange: function() {
                this.timer && this.handleCloseHost();
                this.reqOpenHost();
            },
            eventGetRealData: function() {
                this.reqOpenHost();
            },
            eventCloseHost: function() {
                this.reqCloseHost(this.closeEn)
            },
            eventDingbiao: function() {
                clearInterval(this.timer);
                this.timer = null;
                this.reqPicketageEn();
            },
            eventCloseDialog: function() {
                if (this.isSubmitClick) { return }
                this.handleCloseHost()
            },
            eventSaveTime: function() {
                this.isSubmitClick = true;
                this.reqSaveTime();
                this.isShowDialog = false
            },
            handleCloseHost: function() {
                this.reqCloseHost(this.form.en).then(function(res) {
                    cpt.handleClearAddData();
                });
            },
            handleClearAddData: function() {
                this.count = 0;
                this.finalTime = 120;
                this.noDataCount = 0;
                this.isReadData = false;
                this.isSubmitClick = false
            },
            reqOpenHost: function() {
                ajax({
                    url: '/backstage/startService',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*'
                    },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: {
                        en: this.form.en,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    if (res.data.errcode === 0) {
                        cpt.$message.success('服务开启成功，开始读取数据');
                        return true
                    } else if (res.data.errcode === 2) {
                        cpt.$message.success('服务已经开启')
                    } else {
                        cpt.$message.error('服务开启失败，请稍后重试')
                    }
                }, function() {
                    cpt.$message.error('服务开启失败，请稍后重试')
                }).then(function(res) {
                    if (!res) { return }
                    clearInterval(cpt.timer);
                    cpt.handleClearAddData();
                    cpt.timer = null;
                    var index = 0;
                    cpt.reqLoopGetChartsInfo();
                    cpt.isReadData = true;
                    cpt.timer = setInterval(function() {
                        index++;
                        if (index % 120 === 0) {
                            cpt.reqLoopGetChartsInfo();
                        }
                        cpt.finalTime = 120 - index % 120
                    }, 1000)
                })
            },
            reqLoopGetChartsInfo: function() {
                if (this.noDataCount > 5) {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.reqCloseHost(this.form.en);
                    this.count = 0;
                    this.finalTime = 120;
                    this.isReadData = false;
                    return false
                }
                return ajax({
                    url: '/backstage/getStartEnServiceData',
                    params: {
                        en: this.form.en,
                        accessToken: this.form.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.count++;
                        if (
                            (res.data.chs && res.data.chs.length === 0) ||
                            (res.data.serviceData && Object.keys(res.data.serviceData).length === 0)
                        ) {
                            cpt.noDataCount++;
                            if (cpt.count === 1) {
                                setCharts(cpt.charts, res.data);
                            }
                        } else {
                            cpt.noDataCount = 0;
                            setCharts(cpt.charts, res.data);
                        }
                    }
                })
            },
            reqPicketageEn: function() {
                ajax({
                    url: '/backstage/picketageEn',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*'
                    },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: {
                        en: this.form.en,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.isShowDialog = true;
                    }
                })
            },
            reqGetSite: function() {
                cpt.siteList = [];
                ajax({
                    url: '/dataManage/getSiteList',
                    params: {
                        accessToken: window.parent.userData.accessToken,
                        en: this.form.en
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.siteList = res.data
                    }
                })
            },
            reqCloseHost: function(en) {
                return ajax({
                    url: '/backstage/stopService',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*'
                    },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: {
                        en: en,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.$message.success('所选服务已经关闭')
                    } else {
                        cpt.$message.error('所选服务关闭失败，请稍后重试')
                    }
                    return res
                })
            },
            reqSaveTime: function() {
                var startTime = '';
                ajax({
                    url: '/backstage/saveCle',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*'
                    },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: {
                        en: this.form.en,
                        site: this.form.site,
                        startTime: nowDate(),
                        time: this.form.time,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.$message.success('服务开启成功')
                    } else {
                        cpt.$message.error('服务开启失败，请重试');
                        cpt.reqCloseHost(cpt.form.en);
                        cpt.reqCloseHost(cpt.form.en);
                    }
                    cpt.handleClearAddData()
                }, function() {
                    cpt.$message.error('服务开启失败，请重试');
                    cpt.handleClearAddData()
                    cpt.reqCloseHost(cpt.form.en);
                })
            }

        },
        mounted: function() {
            cpt = this;
            this.charts = echarts.init(this.$refs['echarts']);
        },
    })
})();

;
(function() {
    var cpt = null;
    Vue.component('chsManage', {
        template: '#chsManageTpl',
        props: {
            diveceNameList: Array
        },
        data: function() {
            return {
                form: {
                    en: '',
                    accessToken: window.parent.userData.accessToken
                },
                tableData: [],
                chsForm: {
                    en: '',
                    ch: 0,
                    k: 0,
                    b: 0,
                    Bp: 0,
                    w: 0,
                    accessToken: window.parent.userData.accessToken
                },
                isShowDialog: false
            }
        },
        methods: {
            eventEnChange: function() {
                this.reqGetChsList()
            },
            eventEditChs: function(data) {
                this.chsForm = data;
                this.chsForm.en = this.form.en;
                this.chsForm.accessToken = this.form.accessToken;
                this.isShowDialog = true
            },
            eventUpdateCh: function() {
                this.reqUpdateCh();
                this.isShowDialog = false;
            },
            reqGetChsList: function() {
                return ajax({
                    url: '/backstage/listEqManagedet',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.tableData = res.data
                    } else {
                        cpt.$message.error(res.msg)
                    }
                }, function() {
                    cpt.$message.error('网络故障')
                })
            },
            reqUpdateCh: function() {
                return ajax({
                    url: '/backstage/alterEnEqitmentPa',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        'Accept': '*/*'
                    },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: this.chsForm
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        cpt.$message.success('修改成功')
                    } else {
                        cpt.$message.error(res.msg)
                    }
                }, function(res) {
                    cpt.$message.error('网络故障')
                }).then(function() {
                    cpt.reqGetChsList()
                })
            }
        },
        mounted: function() {
            cpt = this;
        }
    })
})();

;
(function() {
    var app = new Vue({
        el: '#app',
        data: {
            normalManage: ['成员列表', '主机管理', '子机管理'],
            normalContent: ['userList', 'hostManage', 'chsManage'],
            superManage: ['超级管理员', '收起面板'],
            superContent: ['allUser'],
            diveceNameList: []
        },
        methods: {
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
    if (!ec) {
        return
    }
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
            data: [1]
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
            data: [0],
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
        opts.xAxis.data = [];
        for (var i = 0; i < data.length; i++) {
            series.data.push(data[i].value);
            opts.xAxis.data.push(data[i].alltime)
        }
        opts.series = series;
    } else if (typeof data === 'object' && data) {
        if (data.serviceData) {
            opts.series = [];
            var bool = true;
            opts.xAxis.data = [];
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
    console.log(opts)
    ec.setOption(opts)
}

function nowDate() {
    var Dt = new Date();
    var Y = Dt.getFullYear();
    var M = Dt.getMonth() + 1;
    var D = Dt.getDate();
    var h = Dt.getHours();
    var m = Dt.getMinutes();
    var s = Dt.getSeconds();

    return Y + '-' + _(M) + '-' + _(D) + ' ' + _(h) + ':' + _(m) + ':' + _(s)

    function _(num) {
        if (num < 9 && num >= 0) {
            return '0' + num
        }
        return num
    }
}