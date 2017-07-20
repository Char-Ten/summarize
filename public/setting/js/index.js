var ajax = axios.create({
    baseURL: '/api/site'
});;
(function() {
    Vue.component('corresponded', {
        template: '#correspondedTpl',
        data: function() {
            return {
                tableData: [],
                form: {
                    currentPage: 1,
                    pageSize: 10,
                    accessToken: window.parent.userData.accessToken
                },
                totalPage: 1
            }
        },
        methods: {
            eventChangePage: function(value) {
                this.form.currentPage = value;
                this.reqAjax();
            },
            reqAjax: function() {
                var self = this;
                ajax({
                    url: '/sysConf/getUserInfo',
                    params: this.form
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.tableData = res.data.userlist
                        self.totalPage = res.data.totalPage
                    }
                })
            }
        },
        mounted: function() {
            this.reqAjax()
        }
    })
})();

;
(function() {
    Vue.component('changepsw', {
        template: '#changepswTpl',
        data: function() {
            return {
                form: {
                    prePasswd: '',
                    newPasswd: '',
                    username: window.parent.userData.username,
                    accessToken: window.parent.userData.accessToken,
                    checkPasswd: ''
                },
            }
        },
        computed: {
            isSub: function() {
                if (this.form.prePasswd === '') {
                    return true
                }
                if (this.form.checkPasswd === '') {
                    return true
                }
                return false
            }
        },
        methods: {
            eventBlurPrePasswd: function() {
                if (this.form.prePasswd === '') {
                    this.$message.error('请填写密码')
                }
            },
            eventBlurNewPasswd: function() {
                if (this.form.newPasswd === '') {
                    this.$message.error('请填写密码')
                }
            },
            eventCheckPsw: function() {
                if (this.form.checkPasswd !== this.form.newPasswd) {
                    this.form.checkPasswd = '';
                    this.$message.error('密码不一致！')
                }
            },
            eventChange: function() {
                var self = this;
                ajax({
                    url: '/sysConf/modifyPasswd',
                    method: 'post',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded ;charset=UTF-8' },
                    transformRequest: [function(data) {
                        var a = []
                        for (var attr in data) {
                            a.push(attr + '=' + data[attr])
                        }
                        return a.join('&')
                    }],
                    data: {
                        username: window.parent.userData.username,
                        prePasswd: this.form.prePasswd,
                        newPasswd: this.form.newPasswd,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {
                        self.$message({
                            message: '修改成功，即将跳转回登录页面重新登录',
                            type: 'success',
                            onClose: function() {
                                ajax({ url: '/index/logout' })
                                window.localStorage.removeItem('password');
                                window.parent.location.href = "/login";
                            }
                        })
                    } else {
                        self.$message.error(res.msg)
                    }
                })
            }
        }
    })
})();

;
(function() {
    window.app = new Vue({
        el: '#setting',
        data: {
            navList: ['通讯方式', '修改密码'],
            cpmtList: ['corresponded', 'changepsw'],
            superList: ['已注册用户', '管理员列表'],
            superCpmt: [],
            isShowM: window.parent.userData.manage
        }
    })
})();