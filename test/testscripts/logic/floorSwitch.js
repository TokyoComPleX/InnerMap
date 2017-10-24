/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function() {
    $(this).addClass('on').siblings().removeClass('on');
    var index = $('#float-left a.on').html();
    if(overlay.position){
        overlay.setPosition(undefined);
        closer.blur();
    }
    index = parseInt(index.substring(0,index.length-1));
    index = index-1;
    layer_init();
    map.setLayerGroup(new ol.layer.Group({
        layers: layers[index + 1 + 'F']
    }));
    //画出该层路径，如果没有就不画
    drawPath(lineLayers);
    //如果有弹出窗口则关闭

});

