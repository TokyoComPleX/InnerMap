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
    /**
     * 判断楼层
     * 如果是起点层就。。。。
     * 如果终点层。。。。
     **/
    //获取楼层
     var index = $('#float-left a.on').text();//1F/2F...
     var stpath = pointList.data[pointList.getkey(0)];//起始楼层路径
     if (pointList.length>1) {
         var edpath = pointList.data[pointList.getkey(1)];//如果跨楼层，终点楼层路径
     }
     if (pointList.getkey(0) == index) {//如果选择的楼层是起点的（仅一层则只有起点楼层）
         //1.生成线路要素
         var feature = new ol.Feature({
             geometry: new ol.geom.LineString(stpath)
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
        map.addOverlay(startMarkerOverlay);
    }
    if (pointList.length>1) {//如果跨楼层
        if (pointList.getkey(1) == index) {//如果选择的楼层是起点的（仅一层则只有起点楼层）
            //1.生成线路要素
            var feature = new ol.Feature({
                geometry: new ol.geom.LineString(edpath)
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
            map.addOverlay(endMarkerOverlay);
        }
    }else{
        map.addLayer(endMarkerOverlay);//不跨楼层则直接添加终点图标
    }
}
