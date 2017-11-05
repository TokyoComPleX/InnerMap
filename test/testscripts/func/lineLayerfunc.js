//
// var lineLayer;
// /*
//  * @des		画路径函数
//  * @param	pointList	路线点集合
//  * @return	让两点之间最短路径显示在图上
//  */
// function findPath(pointList) {
//     //0.清理原先图层
//     if(lineLayer)
//         map.removeLayer(lineLayer);
//     if(startMarkerOverlay)
//         map.removeOverlay(startMarkerOverlay);
//     if(endMarkerOverlay)
//         map.removeOverlay(endMarkerOverlay);
//     tempPath = floorPath;
//     //1.生成线路要素
//     var feature = new ol.Feature({
//         geometry: new ol.geom.LineString(pointList)
//     });
//     //2.线路样式
//     var lineStyle = new ol.style.Style({
//         stroke: new ol.style.Stroke({
//             width: 3,
//             color: [31, 250, 156, 1]
//         })
//     });
//     feature.setStyle(lineStyle);
//
//     //3.让要素生成图层加入地图
//     var source = new ol.source.Vector({
//         features: [feature]
//     });
//     lineLayer = new ol.layer.Vector({
//         source: source
//     });
//
//     map.addLayer(lineLayer);
// }
/**
 * 图层初始化函数，全局变量linelayer
 * 输入：Dictionary的路径，
 * */
var temp;
function pathLayerInit(pathPosition){
    if(temp) {
        //虽然不知道为什么,但加了这句话原来的路径就可以去掉,否则只靠drawPath里的那句话没法去掉
        map.removeOverlay(temp);
    }

    if(lineLayers.length()){//清空上一次导航产生的路径数组
        for(var i in lineLayers.data)
            lineLayers.remove(i);
    }
    for (var floor in pathPosition.data){
        var pointList = pathPosition.data[floor];
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
        var linelayer = new ol.layer.Vector({
            source: source
        });
        lineLayers.put(floor,linelayer);
        if (!temp){
            temp = linelayer;
        }
        return linelayer;
    }
}
//如何清掉已经有的路径图层?
function drawPath(lineLayers) {
    //清理原图层
    // var a =map.getOverlays();
    // if(temp)
    //     map.removeLayer(temp);
    if(map.getOverlayById("startMarker"))
        map.removeOverlay(startMarkerOverlay);
    if(map.getOverlayById("endMarker"))
        map.removeOverlay(endMarkerOverlay);

    //获取跨层flag
    var croFlrFlag = lineLayers.length()>1;
    //获取楼层
    var currF = $('#float-left a.on').html();

    temp = lineLayers.getvalue(currF);


    //判断是否需要画出路径
    if(lineLayers.getvalue(currF)){//如果路径图层所属楼层有一个等于现在的楼层
        if (!croFlrFlag){//如果不跨层，则三个都添加
            map.addOverlay(startMarkerOverlay);
            map.addOverlay(endMarkerOverlay);
            map.addOverlay(lineLayers.data[currF]);
        }else if(currF == lineLayers.getkey(0)) {
            // /否则就是跨层，如果为起点所在楼层，添加起始标识与该层路径
            map.addOverlay(startMarkerOverlay);
            map.addOverlay(lineLayers.data[currF]);
        }else if (currF == lineLayers.getkey(1)){
            //如果是终点所在楼层，添加终点标识与该层路径
            map.addOverlay(endMarkerOverlay);
            map.addOverlay(lineLayers.data[currF]);
        }
    }
    //如果为起始楼层
}
