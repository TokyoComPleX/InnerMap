

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
 输入：

 说明：车位：状态，0表示空闲
 发送请求：地点，空闲车位数据
 */
function maprender_spare(url_parking,spareplace,index)
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

    //空闲车位的源,由于直接拷贝会影响原来的source,这里采用重新addFeature来构造
    var spareVectorSource = new ol.source.Vector({
        projection: projection,
        format: new ol.format.GeoJSON({
            extractStyles: false
        })
    });

    vectorSource.once('change', function(evt) {
        var source = evt.target;//获取所有车位
        var spare = spareplace[index];
        //没有设定feature属性,所以只能在函数里获得Id,这个id在哪里设定的?难道不是在那个文件里吗?
        //那个文件和source属性的关系

        if(source.getState() === 'ready') {
            // spareFeatures1 = source.getFeatures();//获取样式信息
            spareFeatures = source.getFeatures();//全局变量版

            var Ids = [];//该层的所有车位id
            // var first = spareFeatures[0].getProperties().Id;
            for (var i = 0 ; i < spareFeatures.length ; i++){
                var currId = spareFeatures[i].getProperties().Id;
                Ids.push(currId);//spareFeatures的Id属性并非按序排列
            }
            parkingPlacesIds.put(index,Ids);
            for(var i = 0; i <spare.length; i++){
                var id2key = Ids.indexOf(spare[i]);
                spareFeatures[id2key].setStyle(spareStyle);
                spareVectorSource.addFeature(spareFeatures[id2key]);
            }
            // console.log(spareVectorSource.getFeatures().length);
            spareVectorSources.put(index,spareVectorSource);
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
 初始化地图容器，第一次渲染图层时使用，会根据当前图层自动渲染对应楼层地图，但在此之前必须先使用layer_init()初始化该层的各个图层
 输入：全局变量layers
 输出：无
 */
function mapcontainer_init(layers) {
    // var index = $('#float-left a.on').index();
    var index = $('#float-left a.on').html();
    index = parseInt(index.substring(0,index.length-1));
    index = index - 1;
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
        layers:layers[index + 1 + 'F'],
        pixelRatio: 1
    });
    return map;
}
/*
* 根据楼层初始化对应的各图层
* return：{
        'index' : index+1,//楼层数 num
        'layergroup':layergroup,//各个图层 array
        'vectorsources':vectorsources//后面代码会用的图层的source，为圆图层和车位图层的源
    }
    全局变量layers增加一条记录，例如：‘1F’：layergroup
*
* */
function layer_init(index) {
    // var index = $('#float-left a.on').index();
    if (!arguments.length){//如果没有输入,则默认初始化当前楼层的图层
        var index = $('#float-left a.on').html();
    }
    var parkingplace = spare[index];
    // console.log( spare[index]);
    var renderInfo = mapRenderInfo.data.floor[index];
    var layergroup = [];

//图层顺序wrcpes
    //如果该层图层没有初始化过
    if(!layers[index]){
        vectorLayer_circle = maprender_circle(renderInfo['circle']);
        vectorLayer_elevator = maprender_elevator(renderInfo['elevator']);
        vectorLayer_parking = maprender_spare(renderInfo['parkingplace'],spare,index);
        vectorLayer_road = maprender_road(renderInfo['road']);
        vectorLayer_stairs = maprender_stairs(renderInfo['stairs']);
        vectorLayer_wall = maprender_wall(renderInfo['wall']);
        layergroup = [vectorLayer_wall,vectorLayer_road,vectorLayer_circle,vectorLayer_elevator,vectorLayer_parking,vectorLayer_stairs];
        layers[index] = layergroup;/*console.log(layers[index]);*/
        var vectorCircleSource = vectorLayer_circle.getSource();
        var vectorParkingPlaceSource = vectorLayer_parking.getSource();
        //装入全局变量
        vectorCircleSources.put(index,vectorCircleSource);
        vectorParkingPlaceSources.put(index,vectorParkingPlaceSource);
        var vectorsources = {
            vectorCircleSource :vectorCircleSource,
            vectorParkingPlaceSource:vectorParkingPlaceSource
        }
    }

    var result = {
        'index' : index,
        'layergroup':layergroup,
        'vectorsources':vectorsources
    };
    return result;
}