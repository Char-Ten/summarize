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
            },
            parseTitle: function() {
                return this.info.title.split('\\n');
            }
        },
        methods: {
            render: function() {
                this.ctx.fillStyle = this.fillColor;
                this.ctx.clearRect(0, 0, 600, 840);
                this.ctx.fillRect(25.2, 0, 554.4, 14.4);
                this.ctx.fillRect(25.2, 481.2, 554.4, 37.2);
            },
            renderTitle: function(txt) {
                this.ctx.save();
                this.font = "73.2px sans-serif";
                this.parseTitle.forEach(function() {

                })

                this.ctx.restore();
            },
            renderLBTxt: function(txt) {

            },
            renderRBTxt: function(txt) {

            }

        },
        mounted: function() {
            this.cvs = this.$refs['cvs'];
            this.ctx = this.cvs.getContext('2d');
            this.render();
        }
    })
})();

function W(n) {
    return 600 * n / 500
}

function H(n) {
    return 840 * n / 700
}