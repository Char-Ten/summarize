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
                time: {
                    d: 0,
                    h: 0,
                    m: 0,
                    s: 300
                },

            }
        },
        computed: {
            isSub: function() {
                return !(this.form.en && this.form.site)
            },
        },
        methods: {
            eventBlurTime: function() {
                for (var attr in this.time) {
                    this.time[attr] = this.time[attr] ? this.time[attr] : 0;
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
            reqOpenHost: function() {},
            eventEnChange: function() {}
        },
        mounted: function() {
            cpt = this;
        },
    })
})();

;
(function() {
    var app = new Vue({
        el: '#app',
        data: {
            normalManage: ['成员列表', '主机管理'],
            normalContent: ['userList', 'hostManage'],
            superManage: ['超级管理员', '收起面板'],
            superContent: ['allUser'],
            diveceNameList: []
        },
        methods: {
            setDiveceNameList: function() {
                console.log(window.parent.app.deviceNameList)
                this.diveceNameList = window.parent.app.deviceNameList
            }
        },
        mounted: function() {
            this.setDiveceNameList();
            window.parent.Eet.$on('reqDeviceNameListEnd', this.setDiveceNameList);
        }
    })
})();