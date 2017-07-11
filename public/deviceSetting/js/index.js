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
                }).then(function() {

                })
            }
        }
    })
})();

;
(function() {
    Vue.component('settingPreView', {
        template: '#settingPreViewTpl'
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
            navList: ['添加主机', '传感器配置预览', '传感器参数批量导出', '传感器参数批量导入'],
            navCtList: ['addDevice', 'settingPreView', 'outputDeviceSetting', 'inputDeviceSetting']
        }
    })
})();