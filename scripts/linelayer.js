
var lineLayer;
/*
 * @des		画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 */
function findPath(pointList) {
    //0.清理原先图层
    if(lineLayer) {
        map.removeLayer(lineLayer);
    }
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
    map.addLayer(lineLayer);
}
