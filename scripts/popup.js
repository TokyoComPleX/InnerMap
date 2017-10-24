//初始化路径规划对话框内容(若之前扫过将在此载入位置)
if(localStorage.parkingplace !== undefined) {
    document.getElementById("finalVertex").value = localStorage.parkingplace;
}

/**
 * 组成弹出框的元素
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

/*关闭弹出框按钮*/
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

/*
 * @des		弹出框函数
 * @param	pixel	点击的像素点
 * @return	点击车位时弹出框框并位移到屏幕中心
 */
var displayFeatureInfo = function(pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return feature;
    });

    if(feature) {
        if(feature.get('featuretype') == "Parkingplace" || "Point") {
            var center = feature.get('center');
            var id = feature.get('Id');
            mapView.animate({
                center: center
            }, {
                duration: 1
            });
            content.innerHTML = '<p>您点击的是:' + '<code>' + id + '</code>' + '号车位</p>';
            overlay.setPosition(center);
            map.addOverlay(overlay);
            //为弹出框的按钮添加点击事件
            $("#popup-btn-start").click(function() {
                //设为起点
                document.getElementById("sourceVertex").value = id;
                overlay.setPosition(undefined);
            });
            $("#popup-btn-end").click(function() {
                //设为终点
                document.getElementById("finalVertex").value = id;
                overlay.setPosition(undefined);
            });
        }
    }

};

//地图点击事件返回点击像素点
map.on('click', function(evt) {
    if(evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});
