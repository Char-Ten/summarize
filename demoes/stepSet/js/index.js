; //eventEmiter
(function() {
    function Eet() {
        this.actionsData = {}
        this.saveData = {}
    }
    Eet.prototype.$on = function(actions, handle) {
        if (typeof handle !== 'function') {
            return
        }
        if (this.actionsData[actions] instanceof Array) {
            this.actionsData[actions].push(handle);
        } else {
            this.actionsData[actions] = [handle];
        }
    }
    Eet.prototype.$emit = function(actions, context) {
        if (!context) {
            context = window;
        }

        if (!(this.actionsData[actions] instanceof Array)) {
            return
        }
        var arg = arguments;
        var argArray = [];
        for (var i = 2; i < arg.length; i++) {
            if (arg[i]) {
                argArray.push(arg[i])
            }
        }
        for (var i = 0; i < this.actionsData[actions].length; i++) {
            this.actionsData[actions][i].apply(context, argArray);
        }
    }
    Eet.prototype.$set = function(name, data) {
        if (typeof name !== 'string') {
            return
        }
        this.saveData[name] = data;
    }
    Eet.prototype.$get = function(name) {
        if (typeof name !== 'string') {
            return
        }
        return this.saveData[name]
    }
    window.Eet = new Eet();
})();

;
(function() {
    var map = new L.Map('app', {
        center: new L.LatLng(23.171250699015506, 113.41127783060074),
        zoom: 19,
        zoomControl: false,
        attributionControl: false,
        doubleClickZoom: false,
        scrollWheelZoom: true
    });
    var osm = L.tileLayer('https://app.airag.cn/gmaps/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        attribution: ''
    });
    osm.addTo(map);

    var center = {
        layer: L.layerGroup().addTo(map),
        group: {},
        radius: 0,
        latlng: new L.LatLng(23.171250699015506, 113.41127783060074)
    }
    center.group = L.featureGroup().addTo(center.layer)

    var rect = {
        layer: L.layerGroup().addTo(map),
        group: {},
        center: center.latlng,
        x: 0,
        y: 0,
        deg: 0,
        aeroIntervals: 5,
        points: [],
        output: [],
    }
    rect.group = L.featureGroup().addTo(rect.layer);

    var ctrl = {
        layer: L.layerGroup().addTo(map),
        group: {},
        resize: [],
        rotate: [],
        center: {},
    }
    ctrl.group = L.featureGroup().addTo(ctrl.layer)

    var state = {
        isReadyRenderCenterCircle: false,
        isReadySetRect: false,
        hasCenterCircleRender: false,
        isRenderCtrl: false
    }

    map.on('zoom', function() {
        if (center.radius !== 0) {
            Eet.$emit('render')
        }
    });

    /**
     * @method 设置rtk范围
     * @param {array} array*/
    Eet.$on('setRTKRange', function(msg) {
        if (!Array.isArray(msg)) {
            return
        }
        var value = parseFloat(msg[0]);
        if (isNaN(value)) {
            return
        }
        center.radius = value;
        rect.x = rect.y = Math.sqrt(Math.pow(0.8 * value, 2) / 2);
    });

    /**
     * @method 设置无人机飞行间隔
     * @param {array} msg */
    Eet.$on('setAeroIntervals', function(msg) {
        if (!Array.isArray(msg)) {
            return
        }
        var value = parseFloat(msg[0]);
        if (isNaN(value)) {
            return
        }
        if (value < 1) {
            return
        }
        rect.aeroIntervals = value;
    });

    /**设置数据
     * @param {array} msg
     * msg[0]=飞行间隔
     * msg[1]=设置rtk范围
     * msg[2]=设置中心 0,0
     */
    Eet.$on('setDataAndRender', function(msg) {
        if (!Array.isArray(msg)) {
            return
        }
        var aeroIntervals = parseFloat(msg[0]);
        if (!isNaN(aeroIntervals) && aeroIntervals > 1) {
            rect.aeroIntervals = aeroIntervals;
        }
        var rtkRange = parseFloat(msg[1]);
        if (!isNaN(rtkRange) && rtkRange !== 0) {
            center.radius = rtkRange;
            rect.x = rect.y = Math.sqrt(Math.pow(0.8 * rtkRange, 2) / 2);
        }
        var ct = msg[2].split(',');
        if (ct.length === 2) {
            var latlng = L.latLng(ct[0], ct[1])
            map.setView(latlng);
            center.latlng = latlng;
            rect.center = latlng;
        }
        Eet.$emit('render');

    })

    /**
     * @method 设置rtk的中心
     * @param {String} msg - lat,lng */
    Eet.$on('setRTKCenter', function(msg) {
        if (!Array.isArray(msg)) {
            return
        }
        var a = msg[0].split(',');
        for (var i = 0; i < a.length; i++) {
            a[i] = parseFloat(a[i]);
            if (isNaN(a[i])) {
                alert(1)
                return
            }
        }
        center.latlng = L.latLng(a[0], a[1]);
        state.hasCenterCircleRender = true;
        renderCenterCircle();
    });

    /**
     * @method 渲染
     */
    Eet.$on('render', function() {
        state.hasRectAndCtrlRender = true;
        renderRect();
        renderCenterCircle();
        console.log(state.isRenderCtrl)
        if (!state.isRenderCtrl) {
            renderResizeCtrl();
            renderRotateCtrl();
            renderRectCenterCtrl();
            if (ctrl.resize.length && ctrl.rotate.length) {
                state.isRenderCtrl = true
            }
        } else {
            updateResizeCtrl();
            updateRotateCtrl();
            updateRectCenterCtrl();
        }

    });

    /**
     * @method 设置地图中心
     * @param {Array} msg
     */
    Eet.$on('setMapCenter', function(msg) {
        if (!Array.isArray(msg)) {
            return
        }
        var a = msg[0].split(',');
        map.setView(L.latLng(a[0], a[1]));
    });



    Eet.$on('output', function() {
        // console.log(JSON.stringify(rect.output))
        // WebViewBridge.send('dataStart|' + rect.output.length)
        WebViewBridge.send('data|' + rect.output.length + '|' + JSON.stringify(rect.output))
            // WebViewBridge.send('dataEnd|' + rect.output.length)
            // var str='data|'+rect.output.length;
            // for(var i=0;i<rect.output.length;i++){

        // }
    })

    /**@method 清除矩形 */
    Eet.$on('clearRect', function() {
        state.hasRectAndCtrlRender = false;
        center.group.clearLayers();
    });

    /**@method 清除rtk */
    Eet.$on('clearRTKRange', function() {
        center.group.clearLayers();
    });

    /**@method 清除所有 */
    Eet.$on('clear', function() {
        state.hasRectAndCtrlRender = false;
        state.isRenderCtrl = false;
        ctrl.group.clearLayers();
        rect.group.clearLayers();
        center.group.clearLayers();
        ctrl.resize = [];
        ctrl.rotate = [];
        ctrl.center = {};
    });

    /**像素与米的比例关系，1px=?m */
    function px2m() {
        var mapCenterLatLng = map.getCenter(); // 先获取当前地图中心点
        var pointC = map.latLngToContainerPoint(mapCenterLatLng); // 把中心点从经纬度转为像素
        var pointX = L.point(pointC.x + 10, pointC.y); // 横向加10个像素，得到一个新的点
        var latLngX = map.containerPointToLatLng(pointX); //将这个新的点转回经纬度
        return mapCenterLatLng.distanceTo(latLngX) / 10; // 两点距离为10px,获取10px的现实距离再除以10，得1px有多少米
    }

    /**防止溢出的i
     * @param {Number} i - 索引
     * @param {Number} length - 长度
     */
    function $i(i, length) {
        if (i >= length) {
            i -= length;
            return i
        }
        if (i < 0) {
            i += length;
            return i
        }
        return i
    }

    /**绕某个点（tx,ty）旋转deg角度，再缩放sx,sy倍数 */
    function transform(x, y, tx, ty, deg, sx, sy) {
        var deg = deg * Math.PI / 180;
        if (!sy) sy = 1;
        if (!sx) sx = 1;
        return [
            sx * ((x - tx) * Math.cos(deg) - (y - ty) * Math.sin(deg)) + tx,
            sy * ((x - tx) * Math.sin(deg) + (y - ty) * Math.cos(deg)) + ty
        ]
    }

    /**创建一个矩形 */
    function createRect() {
        var data = {
            latlngs: [],
            points: [],
            flyPathLatlngs: [],
            flyPathPoints: [],
            resLatlngs: [],
            resPoints: [],
            resFlyPathLatlngs: [],
            resFlyPathPoints: []
        }
        if (!rect.center) {
            return data
        }
        if (typeof rect.x !== 'number' || rect.x === 0) {
            return data
        }
        if (typeof rect.y !== 'number' || rect.y === 0) {
            return data
        }
        if (typeof rect.deg !== 'number') {
            return data
        }
        if (typeof rect.aeroIntervals !== 'number' || rect.aeroIntervals === 0) {
            return data
        }
        var center = rect.center;
        var x = rect.x;
        var y = rect.y;
        var deg = rect.deg;
        var aeroIntervals = rect.aeroIntervals

        /**生成四个点*/
        var w = [-1, 1, 1, -1];
        var h = [-1, -1, 1, 1];
        var cp = map.latLngToContainerPoint(center);
        var p, _x, _y, rp;
        for (var i = 0; i < 4; i++) {
            _x = cp.x + w[i] * x / px2m();
            _y = cp.y + h[i] * y / px2m()
            p = L.point(_x, _y);
            data.points.push(p);
            data.latlngs.push(map.containerPointToLatLng(p));

            /**旋转*/
            rp = transform(_x, _y, cp.x, cp.y, deg);
            p = L.point(rp[0], rp[1]);
            data.resPoints.push(p);
            data.resLatlngs.push(map.containerPointToLatLng(p));
        }

        /**生成轨迹*/
        var lt = data.points[0];
        var rt = data.points[1];
        var lb = data.points[3];
        var height = lt.distanceTo(lb);
        var count = height * px2m() / aeroIntervals / 2;
        var distPx = ((lt.y - lb.y) + aeroIntervals / px2m()) / count;
        var p1, p2;
        for (var i = 0; i < count + 1; i++) {
            var x1, x2;
            var Y = lt.y - distPx * i;
            if (i % 2) {
                x1 = rt.x + aeroIntervals * 2 / px2m();
                x2 = lt.x - aeroIntervals * 2 / px2m();
            } else {
                x1 = lt.x - aeroIntervals * 2 / px2m();
                x2 = rt.x + aeroIntervals * 2 / px2m();
            }
            if (i === 0) {
                x1 = lt.x;
                x2 = rt.x + aeroIntervals * 2 / px2m()
            }
            p1 = L.point(x1, Y);
            p2 = L.point(x2, Y);
            data.flyPathPoints.push(p1, p2);
            data.flyPathLatlngs.push(
                map.containerPointToLatLng(p1),
                map.containerPointToLatLng(p2)
            )
            rp = transform(x1, Y, cp.x, cp.y, deg);
            p1 = L.point(rp[0], rp[1]);
            rp = transform(x2, Y, cp.x, cp.y, deg);
            p2 = L.point(rp[0], rp[1]);
            data.resFlyPathPoints.push(p1, p2);
            data.resFlyPathLatlngs.push(
                map.containerPointToLatLng(p1),
                map.containerPointToLatLng(p2)
            )
        }
        rect.points = data.resLatlngs;
        rect.output = data.resFlyPathLatlngs;
        return data
    }
    /**渲染一个矩形 */
    function renderRect() {
        var data = createRect();
        rect.group.clearLayers();
        L.polyline(rect.output, { color: '#0000ff', weight: 3, opacity: 1 }).addTo(rect.group);
        L.polygon(rect.points, { color: '#ff0000', weight: 1, opacity: 0.5, fillOpacity: 0.1 }).addTo(rect.group);
    }

    /**
     * 获取偏移后的经纬度
     * @param {Number} i - 索引 
     * @param {Number} x - x方向的偏移值
     * @param {Number} y - y方向的偏移值
     */
    function getLatlngOffset(i, x, y) {
        var cp = map.latLngToContainerPoint(rect.center);
        var w = [-1, 1, 1, -1];
        var h = [-1, -1, 1, 1];
        var X = cp.x + x * w[i] / px2m();
        var Y = cp.y + y * h[i] / px2m();
        var rp = transform(X, Y, cp.x, cp.y, rect.deg);
        return map.containerPointToLatLng(L.point(rp[0], rp[1]))
    }

    /**
     * 渲染调整大小的控制器
     */
    function renderResizeCtrl() {
        var latlngs = rect.points;
        if (latlngs.length === 0) return;
        var sc, startLatlng, diagonalLatlng;
        var index = 0;
        for (var i = 0; i < 4; i++) {
            sc = L.marker(latlngs[i], {
                icon: L.icon({
                    iconUrl: './images/resize.png',
                    iconSize: [20, 20]
                }),
                draggable: true,
                index: i
            }).addTo(ctrl.group);

            sc.on('dragstart', function(e) {
                index = e.target.options.index;
                startLatlng = e.target._latlng;
                diagonalLatlng = rect.points[$i(index + 2, 4)];
            });

            sc.on('drag', function(e) {
                var nowLatlng = e.target._latlng;
                var rp1 = transform(
                    nowLatlng.lng,
                    nowLatlng.lat,
                    rect.center.lng,
                    rect.center.lat,
                    rect.deg
                );
                var rp2 = transform(
                    diagonalLatlng.lng,
                    diagonalLatlng.lat,
                    rect.center.lng,
                    rect.center.lat,
                    rect.deg
                );
                rect.x = L.latLng(rp2[1], rp2[0]).distanceTo(L.latLng(rp2[1], rp1[0])) / 2;
                rect.y = L.latLng(rp2[1], rp2[0]).distanceTo(L.latLng(rp1[1], rp2[0])) / 2;
                rect.center = L.latLng(
                    (nowLatlng.lat + diagonalLatlng.lat) / 2,
                    (nowLatlng.lng + diagonalLatlng.lng) / 2
                );
                renderRect();
                updateRotateCtrl();
                updateRectCenterCtrl();
                for (var j = -1; j < 2; j++) {
                    ctrl.resize[$i(index + j, 4)].setLatLng(rect.points[$i(index + j, 4)]);
                }
            });

            sc.on('dragend', function() {
                updateResizeCtrl();
                updateRotateCtrl();
                updateRectCenterCtrl();
            });

            ctrl.resize.push(sc)
        }
    }

    /**
     * 更新调整大小的控制器
     */
    function updateResizeCtrl() {
        var latlngs = rect.points;
        for (var i = 0; i < 4; i++) {
            ctrl.resize[i].setLatLng(latlngs[i])
        }
    }

    /**
     * 渲染旋转的控制权
     */
    function renderRotateCtrl() {
        var latlngs = rect.points;
        if (latlngs.length === 0) return;
        var startDeg = 0;
        var moveDeg = 0;
        var rc, offsetLatlng
        for (var i = 0; i < 4; i++) {
            var offsetLatlng = getLatlngOffset(i, rect.x + 30, rect.y + 30)
            rc = L.marker(offsetLatlng, {
                icon: L.icon({
                    iconUrl: './images/rotate.png',
                    iconSize: [20, 20]
                }),
                draggable: true,
                index: i,
            }).addTo(ctrl.group);

            rc.on('dragstart', function(e) {
                var startLatlng = e.target._latlng;
                startDeg = Math.atan2(
                    (startLatlng.lat - rect.center.lat),
                    (startLatlng.lng - rect.center.lng)
                ) * 180 / Math.PI + rect.deg;
            });

            rc.on('drag', function(e) {
                var startLatlng = e.target._latlng;
                var index = e.target.options.index;
                moveDeg = Math.atan2(
                    (startLatlng.lat - rect.center.lat),
                    (startLatlng.lng - rect.center.lng)
                ) * 180 / Math.PI;
                rect.deg = startDeg - moveDeg;
                rect.deg = $i(rect.deg, 360)
                renderRect();
                updateResizeCtrl();
                updateRectCenterCtrl();
                for (var j = 1; j < 4; j++) {
                    ctrl.rotate[$i(index + j, 4)].setLatLng(
                        getLatlngOffset($i(index + j, 4), rect.x + 30, rect.y + 30)
                    )
                }
            });

            rc.on('dragend', function() {
                updateResizeCtrl();
                updateRotateCtrl();
                updateRectCenterCtrl();
            });

            ctrl.rotate.push(rc);
        }
    }

    /**
     * 更新旋转的控制权
     */
    function updateRotateCtrl() {
        for (var i = 0; i < 4; i++) {
            ctrl.rotate[i].setLatLng(
                getLatlngOffset(i, rect.x + 30, rect.y + 30)
            )
        }
    }

    /**
     * 渲染矩形中心控制器
     */
    function renderRectCenterCtrl() {
        if (rect.points.length === 0) return;
        ctrl.center = L.marker(rect.center, {
            icon: L.icon({
                iconUrl: './images/location.png',
                iconSize: [50, 50]
            }),
            draggable: true
        }).addTo(ctrl.group);

        ctrl.center.on('drag', function(e) {
            rect.center = e.target._latlng;
            renderRect();
            updateResizeCtrl();
            updateRotateCtrl();
        });

        ctrl.center.on('dragend', function() {
            updateRectCenterCtrl();
            updateResizeCtrl();
            updateRotateCtrl();
        })
    }

    /**更新矩阵中心控制器 */
    function updateRectCenterCtrl() {
        ctrl.center.setLatLng(rect.center)
    }

    function clearCtrlLayer() {
        ctrl.group.clearLayers();
    }

    /**渲染无线电范围 */
    function renderCenterCircle() {
        center.group.clearLayers();
        var centerCircle = L.circle(center.latlng, center.radius, {
            color: '#66ccff',
            weight: 3,
            fill: false,
            opacity: 1
        }).addTo(center.group);
    }
})();

/**@func
 * @param {string} sMsg - 与app通讯数据
 */
function receive(sMsg) {
    if (typeof sMsg !== 'string') {
        return false
    }
    var arg = sMsg.split('|');
    Eet.$emit(arg.shift(), null, arg)
}