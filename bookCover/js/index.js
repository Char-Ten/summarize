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
            },
        },
        methods: {
            render: function() {
                this.ctx.clearRect(0, 0, 600, 840);
                this.ctx.fillStyle = '#fff';
                this.ctx.fillRect(0, 0, 600, 840);
                this.ctx.fillStyle = this.fillColor;
                this.ctx.fillRect(25.2, 0, 554.4, 14.4);
                this.ctx.fillRect(25.2, 481.2, 554.4, 80 * this.parseTitle.length);
                this.renderTitle();
                this.renderAuthor();
                this.renderTopText();
                this.renderImage();
            },
            renderTitle: function() {
                var self = this;
                this.ctx.save();
                this.ctx.font = "73.2px sans-serif";
                this.parseTitle.forEach(function(item, i) {
                    self.ctx.fillStyle = '#fff';
                    self.ctx.fillText(item, 35.5, 553.7 + i * 73.2, 520.4)
                });
                this.ctx.restore();
            },
            renderAuthor: function() {
                this.ctx.save();
                this.ctx.font = "25.2px Comic Sans MS"
                this.ctx.fillStyle = '#000';
                this.ctx.textAlign = "end";
                this.ctx.fillText(this.info.author, 574.8, 506.4 + this.parseTitle.length * 80)
                this.ctx.restore();
            },
            renderTopText: function() {
                this.ctx.save();
                this.ctx.font = "18px Courier New";
                this.ctx.textAlign = "center";
                this.ctx.fillText(this.info.topTxt, 300, 14.4 + 18)
                this.ctx.restore();
            },
            renderImage: function() {
                var img = document.createElement('img');
                var self = this
                img.onload = function() {
                    self.ctx.drawImage(img, 100, 100, 420, 400)
                }
                img.src = '../img/animal2.png';

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