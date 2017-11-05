
/*var lineLayer1,lineLayer2;
/!*
 * @des		画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 *!/
function findPath(pointList) {
    //1.生成线路要素
    var lineLayer;
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
    map.addLayer(lineLayer);
}*/
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
var lineLayers = new Dictionary();
var pathPosition = new Dictionary();

pathPosition.put('1F',[1,2,3,4,5,6,14]);
pathPosition.put('2F',[14,15,16,26,27]);

for (var floor in pathPosition.data) {
    var lineLayer;
    var pointList = pathPosition.data[floor];
    lineLayer = pointList;
    lineLayers.put(floor, lineLayer);
}



croFlrFlag = lineLayers.length()>1;
var currF = '-1F';
a='s';
b='p';
c='e';
if(currF in lineLayers.data) {//如果路径图层所属楼层有一个等于现在的楼层
    if (!croFlrFlag) {//如果不跨层，则三个都添加
        console.log(a, b, c);
    } else if (currF == lineLayers.getkey(0)) {
        // /否则就是跨层，如果为起点所在楼层，添加起始标识与该层路径
        console.log(a, b);
    } else if (currF == lineLayers.getkey(1)) {
        console.log(b, c);
    }
}