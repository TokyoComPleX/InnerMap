/****************************第一层图层****************************************/
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
        url: 'data/1-circle.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_circle
});
//第一层坐标圆的源
var vectorCircleSource = vectorLayer_1_circle.getSource();

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
        url: 'data/1-elevator.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_elevator
});

//第一层停车位
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
        url: 'data/1-parkingplace.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_parking
});
//第一层停车位的源
var vectorSource = vectorLayer_1_parking.getSource();

/******************************生成空闲车位********************************/
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
//随机模拟空闲车位
var rand = Math.random();
var num = Math.round(rand * 100);
vectorSource.once('change', function(evt) {
    var source = evt.target;
    if(source.getState() === 'ready') {
        spareFeatures1 = source.getFeatures();
        for(i = num; i < (num + 60); i = i + 2) {
            if(spareFeatures1[i]) {
                spareFeatures1[i].setStyle(spareStyle);
                sparePP1.push(spareFeatures1[i]);
            }
        }
    }
});

//第一层线路
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
        url: 'data/1-road.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_road
});

//第一层楼梯
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
        url: 'data/1-stairs.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_stairs
});

//第一层背景
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
        url: 'data/1-wall.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_wall
});

/******************************第二层图层**************************************/
//第二层坐标圆图层
var vectorLayer_2_circle = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-circle.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_circle
});
var vectorCircleSource_2 = vectorLayer_2_circle.getSource();

//第二层电梯
var vectorLayer_2_elevator = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-elevator.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_elevator
});

//第二层停车位
var vectorLayer_2_parking = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-parkingplace.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_parking
});
//第二层停车位的源
var vectorSource_2 = vectorLayer_2_parking.getSource();

/******************************生成空闲车位*******************************/
vectorSource_2.once('change', function(evt) {
    var source = evt.target;
    if(source.getState() === 'ready') {
        spareFeatures2 = source.getFeatures();
        for(i = num; i < (num + 60); i = i + 2) {
            if(spareFeatures2[i]) {
                spareFeatures2[i].setStyle(spareStyle);
                sparePP2.push(spareFeatures2[i]);
            }
        }
    }
});

//第二层线路
var vectorLayer_2_road = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-road.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_road
});

//第二层楼梯
var vectorLayer_2_stairs = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-stairs.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_stairs
});

//第二层背景
var vectorLayer_2_wall = new ol.layer.Vector({
    source: new ol.source.Vector({
        url: 'data/2-wall.geojson',
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    }),
    style: style_1_wall
});

/***********************初始化地图视图***********************************/
var mapView = new ol.View({
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
});

/********************初始化地图容器**************************************/
var map = new ol.Map({
    target: 'map',
    layers: [
        vectorLayer_1_circle,
        vectorLayer_1_road,
        vectorLayer_1_parking,
        vectorLayer_1_elevator,
        vectorLayer_1_stairs,
        vectorLayer_1_wall,
//文字图层
        /*new ol.layer.Image({
            source: new ol.source.ImageStatic({
                url: 'images/textbg.png',
                projection: projection,
                imageExtent: [0, -1165, 890, -150],
                imageSize: [450,500]
            })
        }),*/
    ],
    view: mapView,
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
