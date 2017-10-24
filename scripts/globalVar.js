/*********************************部分全局变量的声明**************************/
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
var spareFeatures1;
var sparePP1 = [];
var t = 0;
//获得二层的空闲车位
var spareFeatures2;
var sparePP2 = [];