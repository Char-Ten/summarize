;
(function() {
    Vue.component('addDevice', {
        template: '#addDeviceTpl',
        data: function() {
            return {}
        },
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