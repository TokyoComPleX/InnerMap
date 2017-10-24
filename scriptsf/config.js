/*********************************部分全局变量的声明**************************/

//声明地图显示的范围
var extent = [0, 0, 3000, 3000];
//定义投影坐标系
var projection = new ol.proj.Projection({
    code: 'EPSG:4326',
    extent: extent
});

//获得一层的空闲车位
var spareFeatures1;
var sparePP1 = [];
var t = 0;
//获得二层的空闲车位
var spareFeatures2;
var sparePP2 = [];