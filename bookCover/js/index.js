;
(function() {
    window.app = new Vue({
        el: '#app',
        data: {
            cvs: null,
            ctx: null,
            width: 600,
            height: 840,
            info: {
                title: 'javascript \\n 从面向对象到没有对象',
                topTxt: '你大爷的',
                coverImgIndex: 0,
                author: 'charten',
                animalIndex: 0,
                color: 'rgba(0,0,0,.2)',
                guidTxt: "2333"
            },
            dialogFormVisible: false
        },
        computed: {
            fillColor: function() {
                return this.info.color
            }
        },
        methods: {
            draw: function() {
                this.ctx.fillStyle = this.fillColor
                this.ctx.clearRect(0, 0, 600, 840);
                this.ctx.fillRect(30, 0, 540, 30);
            },

        },
        mounted: function() {
            this.cvs = this.$refs['cvs'];
            this.ctx = this.cvs.getContext('2d');
            this.draw();
        }
    })
})();