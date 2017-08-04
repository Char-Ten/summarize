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

var step = {
    latlngs: [],
    deg: 0,
    space: 10,
    layer: L.layerGroup().addTo(map),
    group: null
}
step.group = L.featureGroup().addTo(step.layer)

var polygon = {
    latlngs: [],
    center: {},
    layer: L.layerGroup().addTo(map),
    group: null
}
polygon.group = L.featureGroup().addTo(polygon.layer)


function createPolygonBounds(latlngs) {
    var lats = [];
    var lngs = [];
    for (var i = 0; i < latlngs.length; i++) {
        lats.push(latlngs[i].lat);
        lngs.push(latlngs[i].lng);
    }
    var maxLat = Math.max.apply(null, lats);
    var maxLng = Math.max.apply(null, lngs);
    var minLat = Math.min.apply(null, lats);
    var minLng = Math.min.apply(null, lngs);
    var centerLat = (maxLat + minLat) / 2;
    var centerLng = (maxLng + minLng) / 2;
    return {
        nw: {
            lat: maxLat,
            lng: minLng
        },
        ne: {
            lat: maxLat,
            lng: maxLng,
        },
        se: {
            lat: minLat,
            lng: maxLng,
        },
        sw: {
            lat: minLat,
            lng: minLng
        },
        center: {
            lat: centerLat,
            lng: centerLng
        },
    }
}

function createStepPoints() {
    var latlngs = polygon.latlngs;

    var tr_latlngs = [];
    var tr = null;
    for (var i = 0; i < latlngs.length; i++) {
        tr = transform(
            latlngs[i].lng,
            latlngs[i].lat,
            polygon.center.lng,
            polygon.center.lat, deg
        )
        tr_latlngs.push({
            lat: tr[1],
            lng: tr[0],
        })
    }

    var bounds = createPolygonBounds(tr_latlngs);
    var nw = bounds.nw;
    var sw = bounds.sw;

    /**
     * 获取两个经纬度坐标的距离
     * 高德地图的写法为 var distance=new AMap.LngLat(nw.lat, nw.lng).distance([sw.lat, sw.lng]);
     * 百度地图的写法为 var distance=map.getDistance(new BMap.Point(nw.lat, nw.lng),new BMap.Point(sw.lat, sw.lng));
     */
    var distance = L.latLng(nw.lat, nw.lng).distanceTo(L.latLng(sw.lat, sw.lng));
    var steps = parseInt(distance / polygon.space / 2);
    var stepLat = (nw.lat - sw.lat) / steps;
    var points = [];
    var line = [];
    var check = null;

    //N*N
    for (var i = 0; i < steps; i++) {
        line = [];

        for (var j = 0; j < tr_latlngs.length; j++) {
            check = calcPointInLineWithY([
                tr_latlngs[j].lng,
                tr_latlngs[j].lat
            ], [
                tr_latlngs[si(j + 1, tr_latlngs.length)].lng,
                tr_latlngs[si(j + 1, tr_latlngs.length)].lat
            ], nw.lat - i * stepLat);
            if (check) {
                line.push(check);
            }
        }

        if (line.length < 2) {
            continue;
        }
        if (line[0][0] === line[1][0]) {
            continue;
        }
        if (i % 2) {
            points.push({
                lat: line[0][1],
                lng: Math.max(line[0][0], line[1][0]),
            }, {
                lat: line[0][1],
                lng: Math.min(line[0][0], line[1][0])
            })
        } else {
            points.push({
                lat: line[0][1],
                lng: Math.min(line[0][0], line[1][0]),
            }, {
                lat: line[0][1],
                lng: Math.max(line[0][0], line[1][0])
            })
        }
    }

    var _points = [];
    for (var i = 0; i < points.length; i++) {
        tr = transform(
            points[i].lng,
            points[i].lat,
            polygon.center.lng,
            polygon.center.lat, -deg
        )
        _points.push({
            lat: tr[1],
            lng: tr[0],
        });
    }
    return _points
}

function calcPointInLineWithY(p1, p2, y) {
    var s = p1[1] - p2[1];
    var x;
    if (s) {
        x = (y - p1[1]) * (p1[0] - p2[0]) / s + p1[0]
    } else {
        return false
    }
    if (x > p1[0] && x > p2[0]) {
        return false
    }
    if (x < p1[0] && x < p2[0]) {
        return false
    }
    return [x, y]
}

function si(i, l) {
    if (i > l - 1) {
        return i - l;
    }
    if (i < 0) {
        return l + i;
    }
    return i;
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