/********************全局变量*******************/

//初始化路径规划对话框内容(若之前扫过将在此载入位置)
if(localStorage.parkingplace !== undefined) {
    document.getElementById("finalVertex").value = localStorage.parkingplace;
}

/*关闭弹出框按钮*/
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};


/*
 * @func	弹出框函数
 * @param	pixel	点击的像素点
 * @return	点击车位时弹出框框并位移到屏幕中心
 */
function displayFeatureInfo (pixel) {
    var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        return feature;
    });
    if(feature) {
        if(feature.get('featuretype') == "Parkingplace" || "Point") {
            //记录车位基本信息
            var center = feature.get('center');
            var id = feature.get('Id');

            //******新增属性：车位所在楼层,地图properties新增属性
            var currf = feature.get('floor');

            var view = map.getView();
            view.animate({
                center: center
            }, {
                duration: 1
            });
            content.innerHTML = '<p>您点击的是:' + '<code>' + id + '</code>' + '号车位</p>';
            /*生成弹出框*/
            overlay.setPosition(center);
            map.addOverlay(overlay);
            //为弹出框的按钮添加点击事件
            $("#popup-btn-start").click(function() {
                //设为起点
                document.getElementById("sourceVertex").value = id;
                //****将currf赋给stFloor全局变量
                stFloor = currf;
                stPos = center;
                overlay.setPosition(undefined);
            });
            $("#popup-btn-end").click(function() {
                //设为终点
                document.getElementById("finalVertex").value = id;
                edFloor = currf;
                edPos = center;
                overlay.setPosition(undefined);
            });
        }
    }

}


//地图点击事件返回点击像素点
map.on('click', function(evt) {
    if(evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    // alert(pixel.toString());
    displayFeatureInfo(pixel);

});
