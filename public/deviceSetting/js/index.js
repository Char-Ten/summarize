var ajax = axios.create({
    baseURL: '/api/site'
});
(function() {
    Vue.component('addDevice', {
        template: '#addDeviceTpl',
        data: function() {
            return {
                form: {
                    en: '',
                    site: '',
                }
            }
        },
        methods: {
            reqAddDevice: function() {
                var self = this;
                if (!this.form.en) {
                    this.$message({
                        type: 'warning',
                        message: '请填写主机名'
                    })
                    return
                }
                if (!this.form.en) {
                    this.$message({
                        type: 'warning',
                        message: '请填写工地名'
                    })
                    return
                }

                ajax({
                    url: '/instrumentConfig/addHost',
                    params: {
                        en: this.form.en,
                        site: this.form.site,
                        currentUser: window.parent.userData.username,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    if (res.data.msg == 'ok') {
                        self.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                        window.parent.Eet.$emit('reloadDeviceList')
                    }
                })
            }
        }
    })
})();

;
(function() {
    Vue.component('settingPreView', {
        template: '#settingPreViewTpl',
        props: ['namelist'],
        data: function() {
            return {
                en: ''
            }
        },
        methods: {
            reqSearchSetting: function() {
                var self = this;
                ajax({
                    url: '/instrumentConfig/parameterPreview',
                    params: {
                        en: this.en,
                        accessToken: window.parent.userData.accessToken
                    }
                }).then(function(res) {
                    return res.data
                }).then(function(res) {
                    if (res.msg === 'ok') {

                    } else {
                        self.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }
        }
    })
})();

;
(function() {
    Vue.component('outputDeviceSetting', {
        template: '#outputDeviceSettingTpl'
    })
})();

;
(function() {
    Vue.component('inputDeviceSetting', {
        template: '#inputDeviceSettingTpl'
    })
})();

;
(function() {
    window.deviceSetting = new Vue({
        el: '#deviceSetting',
        data: {
            navList: ['传感器配置预览', '传感器参数批量导出', '传感器参数批量导入'],
            navCtList: ['settingPreView', 'outputDeviceSetting', 'inputDeviceSetting'],
            mList: ['添加主机', '服务管理', '设置采集时间'],
            mCtList: ['addDevice', ''],
            diveceNameList: [],
            isShowM: window.parent.userData.manager > 0
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