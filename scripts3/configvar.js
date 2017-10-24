
/*
globalVar.js
*/
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


/*
map_render.js
*/
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

/******************************第二层图层**************************************/
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



/*
linelayer.js
*/
var lineLayer;

/*
popup.js
*/
//组成弹出框的元素
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


/*
routinePlanning.js
*/
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