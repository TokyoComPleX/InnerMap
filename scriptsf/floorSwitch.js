/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function() {
    alert(1);
    $(this).addClass('on').siblings().removeClass('on');
    var index = $('#float-left a.on').html();
    index = parseInt(index.substring(0,index.length-1));
    index = index-1;
    alert(index);
        layer_init();
    map.setLayerGroup(new ol.layer.Group({
        layers: layers[index + 1 + 'F']
    }));
    // findPath(pathPos);
});


// 关于findpath函数，路径初始化和画路径两者分开，就和地图渲染函数一样