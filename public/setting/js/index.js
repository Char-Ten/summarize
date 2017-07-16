var ajax = axios.create({
    baseURL: '/api/site'
});;
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
        },
        mounted: function() {
            ajax({
                url: '/sysConf/getAdminInfo',
                params: {
                    currentPage: 0,
                    pageSize: 10,
                    accessToken: window.parent.userData.accessToken
                }
            }).then(function(res) {
                return res.data
            }).then(function(res) {
                console.log(res)
            })
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
                    accessToken: window.parent.userData.accessToken
                },
                checkPasswd: ''
            }
        },
        methods: {
            eventChange: function() {

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
            cpmtList: ['corresponded', '', 'changepsw']
        }
    })
})();