//地图信息相关数据的所有url
var b = {
    POST: "abc",
    map_name: "CenterMall",
    floor: {
        '1F': {
            circle: "data/1-circle.geojson",
            elevator: "data/1-elevator.geojson",
            parkingplace: "data/1-parkingplace.geojson",
            road: "data/1-road.geojson",
            stairs: "data/1-stairs.geojson",
            wall : "data/1-wall.geojson",
            matrix : "data/1-matrix.json",
            beacons : "data/ibeacons.json"
        },
        '2F': {
            circle: "data/2-circle.geojson",
            elevator: "data/2-elevator.geojson",
            parkingplace: "data/2-parkingplace.geojson",
            road: "data/2-road.geojson",
            stairs: "data/2-stairs.geojson",
            wall : "data/2-wall.geojson",
            matrix : "data/2-matrix.json",
            beacons : "data/ibeacons.json"
        }
    }/*,
    json: {
        'ibeacons': "data/ibeacons.json"
    }*/
};
var mapRenderInfo  = new Dictionary();
$.extend(true,mapRenderInfo.data,b);

/*
map_render.js
*/
//地图变量
var map ;
//空闲车位
var spare = {
    '1F':[50],
    '2F':[200]
};

var stFloor;//记录起点所在楼层
var edFloor;//记录终点所在楼层
var stPos;//起点车位坐标
var edPos;//终点车位坐标

var spareVectorSources = new Dictionary();
var parkingPlacesIds = new Dictionary();//存放每层车位Id,按照spareFeatures中的顺序,注意不是按Id从大到小的顺序
//定义投影坐标系，仅在地图渲染部分被引用
var layers = {};//每层图层初始化之后将存放在这里图层变量存放处

var vectorParkingPlaceSources = new Dictionary();
var vectorCircleSources = new Dictionary();//圆图层的source
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: [0, 0, 3000, 3000]
});



/*
画路径函数
*/
var lineLayers = new Dictionary();


/*
* popup.js
* */
/**
 * 组成弹出框的元素,注意框架里要有
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/*生成弹出框*/
var overlay = new ol.Overlay(({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 100 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
    }
}));


//获取当前页面的网址和所带信息
var currentUrl = window.location.href;
var params = currentUrl.split("?")[1];
//判断页面是否是摇一摇得到的
if(params) {
    var ticketStr = params.split("&")[0];
    var isTicket = ticketStr.split("=")[0];
    var ticket = ticketStr.split("=")[1];
}



/*
* routinePlanning
* */
//记录离定位位置最近的车位
var closestParkingPlace, navigateSwitcher = false;


/*

/!*
globalVar.js
*!/
//声明地图显示的范围
var extent = [0, 0, 3000, 3000];
//定义投影坐标系
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: extent
});
//判断用户使用的是哪种系统的手机分配不同的标准
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//获取当前页面的网址和所带信息
var currentUrl = window.location.href;
var params = currentUrl.split("?")[1];
//判断页面是否是摇一摇得到的
if(params) {
    var ticketStr = params.split("&")[0];
    var isTicket = ticketStr.split("=")[0];
    var ticket = ticketStr.split("=")[1];
}
//获得一层的空闲车位
var spareFeatures1;//vectorSource.once，空闲车位style样式
var sparePP1 = [];//vectorSource.once，一维数组
var t = 0;
//获得二层的空闲车位
var spareFeatures2;
var sparePP2 = [];


/!*
map_render.js
*!/
//第一层坐标圆图层
var vectorLayer_1_circle;
var vectorCircleSource = vectorLayer_1_circle.getSource();
var vectorLayer_1_elevator;
var vectorLayer_1_parking ;
var vectorSource = vectorLayer_1_parking.getSource();
//第一层线路
var vectorLayer_1_road ;

//第一层楼梯
var vectorLayer_1_stairs;

//第一层背景
var vectorLayer_1_wall ;

/!******************************第二层图层**************************************!/
//第二层坐标圆图层
var vectorLayer_2_circle ;
var vectorCircleSource_2 = vectorLayer_2_circle.getSource();

//第二层电梯
var vectorLayer_2_elevator ;

//第二层停车位
var vectorLayer_2_parking;
//第二层停车位的源
var vectorSource_2 = vectorLayer_2_parking.getSource();

//第二层线路
var vectorLayer_2_road;

//第二层楼梯
var vectorLayer_2_stairs ;

//第二层背景
var vectorLayer_2_wall;
var map ;



/!*
linelayer.js
*!/
var lineLayer;

/!*
popup.js
*!/
//组成弹出框的元素
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
/!*生成弹出框*!/
var overlay = new ol.Overlay(({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 100 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）
    }
}));


/!*
routinePlanning.js
*!/
//初始化起点终点点标注
var startMarker = document.getElementById('start-marker');
var endMarker = document.getElementById('end-marker');
var startMarkerOverlay = new ol.Overlay(({
    element: startMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));
var endMarkerOverlay = new ol.Overlay(({
    element: endMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));
*/
