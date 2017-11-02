/***********************全局变量层*************************/
function Dictionary() {
    this.data = new Array();
    this.keys = new Array();

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
}   var b = {
    POST: "abc",
    map_name: "CenterMall",
    floor: {
        '1F': {
            circle: "data/1-circle.geojson",
            elevator: "data/1-elevator.geojson",
            parkingplace: "data/1-parkingplace.geojson",
            road: "data/1-road.geojson",
            stairs: "data/1-stairs.geojson",
            wall : "data/1-wall.geojson"
        },
        '2F': {
            circle: "data/2-circle.geojson",
            elevator: "data/2-elevator.geojson",
            parkingplace: "data/2-parkingplace.geojson",
            road: "data/2-road.geojson",
            stairs: "data/2-stairs.geojson",
            wall : "data/2-wall.geojson"
        }
    },
    json: {
        'ibeacons': "data/ibeacons.json"
    }
};
var mapRenderInfo  = new Dictionary();
$.extend(true,mapRenderInfo.data,b);
//空闲车位
spare = {
    '1F':[5,6,7,22],
    '2F':[5]
};
sparePP={};//替换掉sparePP1&sparePP2
var layers = {};//全局变量
var vectorsources = {};//图层的source
//****
/*
globalVar.js
*/
//仅在地图渲染部分被引用
//定义投影坐标系
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: [0, 0, 3000, 3000]
});
var t = 0;
var map ;
/************************功能层***************************/
/********************************地图渲染函数***************************************/
/*圆图层*/
function maprender_circle(url_circle) {
    //第一层坐标圆图层
    var style_1_circle = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 255, 255, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_circle = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_circle,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_circle
    });
    //第一层坐标圆的源
    return vectorLayer_1_circle;
}
/*
 电梯
 初始化渲染全部是红色（占用状态）
 */
function maprender_elevator(url_elevator)
{
    //第一层电梯
    var style_1_elevator = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255,215,0, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_elevator = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_elevator,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_elevator
    });
    return vectorLayer_1_elevator;
}
/*空闲车位*/
/*
 输入：

 说明：车位：状态，0表示空闲
 发送请求：地点，空闲车位数据
 */
function maprender_spare(url_parking,spareplace,index)
{
    //初始设置所有车位为红色（占用状态）
    var style_1_parking = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 192, 203, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_parking = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_parking,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_parking
    });
    //第一层停车位的源
    var vectorSource = vectorLayer_1_parking.getSource();

    //空闲车位样式
    var spareStyle = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(124, 205, 124, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    vectorSource.once('change', function(evt) {
        var source = evt.target;//获取所有车位
        var spare = spareplace[index +1 + 'F'];

        sparePP[index + 1 + 'F'] = [];

        if(source.getState() === 'ready') {
            spareFeatures1 = source.getFeatures();//获取样式信息
            spareFeatures = source.getFeatures();//全局变量版
            for(var i = 0; i <spare.length; i++){

                spareFeatures1[spare[i]].setStyle(spareStyle);
                sparePP1.push(spareFeatures1[i]);

                spareFeatures[spare[i]].setStyle(spareStyle);
                sparePP[index + 1 + 'F'].push(spareFeatures[i]);//全局变量版

            }

        }
    });
    return vectorLayer_1_parking;
}
/*路线*/
function maprender_road(url_road){
    var style_1_road = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(209,209,209, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_road = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_road,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_road
    });
    return vectorLayer_1_road;
}
/*楼梯*/
function maprender_stairs(url_stairs){
    var style_1_stairs = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(175,238,238, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_stairs = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_stairs,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_stairs
    });
    return vectorLayer_1_stairs;
}
/*背景*/
function maprender_wall(wall_url){
    var style_1_wall = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(180, 180, 180, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_wall = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: wall_url,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_wall
    });
    return vectorLayer_1_wall;
}
/*
 初始化地图容器，第一次渲染图层时使用，会根据当前图层自动渲染对应楼层地图，但在此之前必须先使用layer_init()初始化该层的各个图层
 输入：全局变量layers
 输出：无
 */
function mapcontainer_init(layers) {
    // var index = $('#float-left a.on').index();
    var index = $('#float-left a.on').html();
    index = parseInt(index.substring(0,index.length-1));
    index = index - 1;
    var map = new ol.Map({
        target: 'map',
        view: new ol.View({
            projection: projection,
            //初始地图中心
            center: [350, -650],
            //初始缩放大小
            zoom: 2,
            //限制地图拖动范围
            extent: [-1000, -3000, 2000, 1000],
            //限制最大缩放倍数
            maxZoom: 5,
            //限制最小缩放倍数
            minZoom: 0,
            //禁止旋转
            enableRotation: false
        }),
        controls: ol.control.defaults().extend([
            //缩放控件
            new ol.control.Zoom({
                target: 'zoom'
            }),
            //适应屏幕控件
            new ol.control.ZoomToExtent({
                target: 'zoom_to_extent',
                extent: [100, -1300, 600, -100]
            }),
            //鼠标坐标显示控件
            new ol.control.MousePosition({
                target: 'mouse_position',
                projection: 'EPSG:4326'
            })
        ]),
        layers:layers[index + 1 + 'F'],
        pixelRatio: 1
    });
    return map;
}
/*
* 根据楼层初始化对应的各图层
* return：{
        'index' : index+1,//楼层数 num
        'layergroup':layergroup,//各个图层 array
        'vectorsources':vectorsources//后面代码会用的图层的source，为圆图层和车位图层的源
    }
    全局变量layers增加一条记录，例如：‘1F’：layergroup
*
* */
function layer_init() {
    // var index = $('#float-left a.on').index();
    var index = $('#float-left a.on').html();
    index = parseInt(index.substring(0,index.length-1));
    index = index-1;
    var parkingplace = spare[index + 1 + 'F'];
    // console.log( spare[index + 1 + 'F']);
    var renderInfo = mapRenderInfo.data.floor[index + 1 + 'F'];
    var layergroup = [];

//图层顺序wrcpes
    //如果该层图层没有初始化过
    if(!layers[index + 1 + 'F']){
        vectorLayer_circle = maprender_circle(renderInfo['circle']);
        vectorLayer_elevator = maprender_elevator(renderInfo['elecator']);
        vectorLayer_parking = maprender_spare(renderInfo['parkingplace'],spare,index);
        vectorLayer_road = maprender_road(renderInfo['road']);
        vectorLayer_stairs = maprender_stairs(renderInfo['stairs']);
        vectorLayer_wall = maprender_wall(renderInfo['wall']);
        layergroup = [vectorLayer_wall,vectorLayer_road,vectorLayer_circle,vectorLayer_elevator,vectorLayer_parking,vectorLayer_stairs];
        layers[index + 1 + 'F'] = layergroup;console.log(layers[index + 1 + 'F']);
        vectorsources[index + 1 + 'F'] = [];
        var vectorCircleSource = vectorLayer_circle.getSource();
        var vectorSource = vectorLayer_parking.getSource();
        vectorsources[index + 1 + 'F'].push(vectorSource,vectorCircleSource);
    }

    var result = {
        'index' : index+1,
        'layergroup':layergroup,
        'vectorsources':vectorsources
    };
    return result;
}
//****
/*************************实例**********************************/

/*var parkingplace = spare[index + 1 + 'F'];
console.log( spare[index + 1 + 'F']);
var renderInfo = mapRenderInfo.data.floor[index + 1 + 'F'];
var layers = {};//全局变量
var layergroup = [];
// alert(renderInfo);
// console.log(renderInfo);
//wrcpes
vectorLayer_circle = maprender_circle(renderInfo['circle']);
vectorLayer_elevator = maprender_elevator(renderInfo['elecator']);
vectorLayer_parking = maprender_spare(renderInfo['parkingplace'],spare,index);
vectorLayer_road = maprender_road(renderInfo['road']);
vectorLayer_stairs = maprender_stairs(renderInfo['stairs']);
vectorLayer_wall = maprender_wall(renderInfo['wall']);
layergroup = [vectorLayer_wall,vectorLayer_road,vectorLayer_circle,vectorLayer_elevator,vectorLayer_parking,vectorLayer_stairs];
layers[index + 1 + 'F'] = layergroup;console.log(layers[index + 1 + 'F']);
var vectorCircleSource_2 = vectorLayer_circle.getSource();
var vectorSource_2 = vectorLayer_parking.getSource();*/
layer_init();
map = mapcontainer_init(layers);


