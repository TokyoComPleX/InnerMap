/**
 * Created by 张叶涵 on 2017/8/2.
 */
/********************************地图渲染函数***************************************/
/*圆图层*/
function maprender_circle(url_circle) {
    //第一层坐标圆图层
    var style_1_circle = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 255, 255, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_circle = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_circle,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_circle
    });
    //第一层坐标圆的源
    return vectorLayer_1_circle;
}
/*
 电梯
 初始化渲染全部是红色（占用状态）
 */
function maprender_elevator(url_elevator)
{
    //第一层电梯
    var style_1_elevator = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255,215,0, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_elevator = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_elevator,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_elevator
    });
    return vectorLayer_1_elevator;
}

/*空闲车位*/
/*
 输入：空闲车位车牌号数组/所有车位的状态的json数据
 这里以json数据为例
 数据格式示例：
 {
     1:1,
     2:0,
     3:1
 };
 说明：车位：状态，0表示空闲
 发送请求：地点，空闲车位数据
 */
function maprender_spare(url_parking,json_spare)
{
    //初始设置所有车位为红色（占用状态）
    var style_1_parking = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(255, 192, 203, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_parking = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_parking,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_parking
    });
    //第一层停车位的源
    var vectorSource = vectorLayer_1_parking.getSource();

    //空闲车位样式
    var spareStyle = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(124, 205, 124, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    vectorSource.once('change', function(evt) {
        var source = evt.target;//获取所有车位
        if(source.getState() === 'ready') {
            spareFeatures1 = source.getFeatures();//获取样式信息
            //遍历这些对象，将属性state为0的对象对应的车位渲染成绿色
            for(var i in json_spare)
                if(!json_spare[i]){
                    spareFeatures1[i-1].setStyle(spareStyle);
                    sparePP1.push(spareFeatures1[i-1]);
                }

        }
    });
    return vectorLayer_1_parking;
}


/*路线*/
function maprender_road(url_road){
    var style_1_road = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(209,209,209, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_road = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_road,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_road
    });
    return vectorLayer_1_road;
}

/*楼梯*/
function maprender_stairs(url_stairs){
    var style_1_stairs = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(175,238,238, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_stairs = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url_stairs,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_stairs
    });
    return vectorLayer_1_stairs;
}

/*背景*/
function maprender_wall(wall_url){
    var style_1_wall = new ol.style.Style({
        fill: new ol.style.Fill({ //矢量图层填充颜色，以及透明度
            color: 'rgba(180, 180, 180, 1)'
        }),
        stroke: new ol.style.Stroke({ //边界样式
            color: '#c0c0c0',
            width: 1
        })
    });
    var vectorLayer_1_wall = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: wall_url,
            projection: projection,
            format: new ol.format.GeoJSON({
                extractStyles: false
            })
        }),
        style: style_1_wall
    });
    return vectorLayer_1_wall;
}


/*
 初始化地图容器
 输入：vector格式的layer，个数不限wrceps
 输出：无
 */
function mapcontainer_init() {
    var map = new ol.Map({
        target: 'map',
        view: new ol.View({
            projection: projection,
            //初始地图中心
            center: [350, -650],
            //初始缩放大小
            zoom: 2,
            //限制地图拖动范围
            extent: [-1000, -3000, 2000, 1000],
            //限制最大缩放倍数
            maxZoom: 5,
            //限制最小缩放倍数
            minZoom: 0,
            //禁止旋转
            enableRotation: false
        }),
        controls: ol.control.defaults().extend([
            //缩放控件
            new ol.control.Zoom({
                target: 'zoom'
            }),
            //适应屏幕控件
            new ol.control.ZoomToExtent({
                target: 'zoom_to_extent',
                extent: [100, -1300, 600, -100]
            }),
            //鼠标坐标显示控件
            new ol.control.MousePosition({
                target: 'mouse_position',
                projection: 'EPSG:4326'
            })
        ]),
        pixelRatio: 1
    });
    var vectorLayers = arguments;
    for(var i = 0; i <= vectorLayers.length-1;i++){
        map.addLayer(vectorLayers[i]);
    }
    return map;
}


/******************************************对话框函数**********************************/




