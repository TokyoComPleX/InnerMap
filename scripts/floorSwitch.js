/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function() {
    var index = $(this).index();
    $(this).addClass('on').siblings().removeClass('on');
    map.setLayerGroup(new ol.layer.Group({
        layers: [
            window["vectorLayer_" + (index + 1) + "_wall"],
            window["vectorLayer_" + (index + 1) + "_road"],
            window["vectorLayer_" + (index + 1) + "_circle"],
            window["vectorLayer_" + (index + 1) + "_parking"],
            window["vectorLayer_" + (index + 1) + "_elevator"],
            window["vectorLayer_" + (index + 1) + "_stairs"]
        ]
    }));
});