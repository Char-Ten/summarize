;
(function() {
    Vue.component('corresponded', {
        template: '#correspondedTpl',
        data: function() {
            return {
                tableData: [{
                    userName: 'afdsa',
                    person: 'fdsf',
                    telphone: 18888888888,
                    email: '18888888888@233.com'
                }, {
                    userName: 'afdsa',
                    person: 'fdsf',
                    telphone: 18888888888,
                    email: '18888888888@233.com'
                }]
            }
        }
    })
})();

;
(function() {
    window.app = new Vue({
        el: '#setting',
        data: {
            navList: ['通讯方式', '连接方式', '修改密码'],
            cpmtList: ['corresponded', ]
        }
    })
})();