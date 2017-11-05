//键值对数组构造函数
function Dictionary(depth) {
    this.keys = new Array();
    this.data = new Array();

    this.put = function (key, value) {
        if(jQuery) {
            if(value instanceof Array){
                this.data[key] = new Array();
                $.extend(true , this.data[key] , value);
            }else {
                this.data[key] = value;
            }
        }else if(!value.length){
            this.data[key] = value;
        }else
            console.log("NO jQuery,put operation fail.");
        this.keys.push(key);
    };

    this.getvalue = function (key) {
        if (this.keys.indexOf(key) != -1){//如果存在这个键值
            return this.data[key];
        }else{
            return null;
        }
    };

    this.getkey = function (i) {
        return this.keys[i];
    };

    this.getfloor = function () {
        if(this.data.floor){
            var floors = [];
            for(var F in this.data.floor){
                floors.push(F);
            }
        }
        return floors;
    };

    this.remove = function (key) {
        this.data[key] = null;
        var index = this.keys.indexOf(key);
        this.keys.splice(index,index+1);
    };

    this.isEmpty = function () {
        return this.data.length == 0;
    };

    this.length = function () {
        return this.keys.length;
    };

    //将this.data新建成Dictionary类,原有数据保持不变
    this.deepen = function (depth) {
        var temp = this.data;
        if (depth){
            this.data = new Dictionary();
            this.data.deepen(depth-1);
        }
        var that = this;
        for (var key in temp){
            that.put(key,temp[key]);
        }
        return depth;
    }
}
/**************************************************/
var floorPath = new Dictionary();
floorPath.put('1F', [1, 2, 3, 4, 5, 6, 7]);
floorPath.put('2F', [8, 9, 10, 11, 12, 85, 86, 87,88,89]);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
var tempPath = [];

//console.log(floorPath.getkey(1));
/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function () {
    var crossfloorFlag = (floorPath.length() > 1 ? 1 : 0);//是否跨楼层
    var index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    map.setLayerGroup(new ol.layer.Group({
        layers: [
            window["vectorLayer_" + (index + 1) + "_wall"],
            window["vectorLayer_" + (index + 1) + "_road"],
            window["vectorLayer_" + (index + 1) + "_circle"],
            window["vectorLayer_" + (index + 1) + "_parking"],
            window["vectorLayer_" + (index + 1) + "_elevator"],
            window["vectorLayer_" + (index + 1) + "_stairs"]
        ]


    }));
    //清除现有图层
    if(lineLayer)
        map.removeLayer(lineLayer);
    if(startMarkerOverlay)
        map.removeOverlay(startMarkerOverlay);
    if(endMarkerOverlay)
        map.removeOverlay(endMarkerOverlay);
    tempPath = floorPath;
    if (floorPath.getkey(0) == index) {//如果选择的楼层是起点的（仅一层则只有起点楼层）
        findPath(floorPath.getvalue(floorPath.getkey(0)));
        map.addLayer(startMarkerOverlay);
    }
    if (crossfloorFlag) {//如果跨楼层
        //css code goes here...
        if (floorPath.getkey(1) == index) {//如果选择终点楼层
            findPath(floorPath.getvalue(floorPath.getkey(1)));
            map.addLayer(endMarkerOverlay);
        }
    }else{
        map.addLayer(endMarkerOverlay);
    }
});

/**************************findpath函数重写*******************************/
var lineLayer;
/*
 * @des		画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 */
function findPath(pointList) {
    //0.清理原先图层
    if(lineLayer)
        map.removeLayer(lineLayer);
    if(startMarkerOverlay)
        map.removeOverlay(startMarkerOverlay);
    if(endMarkerOverlay)
        map.removeOverlay(endMarkerOverlay);
    tempPath = floorPath;


    //1.生成线路要素
    var feature = new ol.Feature({
        geometry: new ol.geom.LineString(pointList)
    });
    //2.线路样式
    var lineStyle = new ol.style.Style({
        stroke: new ol.style.Stroke({
            width: 3,
            color: [31, 250, 156, 1]
        })
    });
    feature.setStyle(lineStyle);

    //3.让要素生成图层加入地图
    var source = new ol.source.Vector({
        features: [feature]
    });
    lineLayer = new ol.layer.Vector({
        source: source
    });
    map.addLayer(startMarkerOverlay);
}



