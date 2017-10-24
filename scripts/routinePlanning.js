/******************************路径规划功能****************************************/
//为路径规划交换按钮绑定点击事件
$("body").delegate("#exchange", "touchstart", function(event) {
    var sourceVertex = document.getElementById("sourceVertex").value;
    var finalVertex = document.getElementById("finalVertex").value;
    document.getElementById("sourceVertex").value = finalVertex;
    document.getElementById("finalVertex").value = sourceVertex;
});

//初始化起点终点点标注
var startMarker = document.getElementById('start-marker');
var endMarker = document.getElementById('end-marker');
var startMarkerOverlay = new ol.Overlay(({
    element: startMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));
var endMarkerOverlay = new ol.Overlay(({
    element: endMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));

//路径规划主要业务逻辑
function myWay(certainPos) {
    var sourceVertex = document.getElementById("sourceVertex").value;
    var finalVertex = document.getElementById("finalVertex").value;

    $.ajax({
        url: "./data/1-parkingplace.geojson",
        success: function(result) {
            if((result.features[sourceVertex - 1] || sourceVertex == '您当前的位置') && result.features[finalVertex - 1]) {
                if(sourceVertex == '您当前的位置') {
                    sourceVertex = closestParkingPlace.get('Id');
                } else {
                    sourceVertex = result.features[sourceVertex - 1].properties.Rid;
                }
                //记录终点坐标
                localStorage.parkingplace = finalVertex;
                document.getElementById("finalVertex").value = finalVertex;
                //转换id和rid
                finalVertex = result.features[finalVertex - 1].properties.Rid;
            }
        },
        dataType: 'json',
        //设置ajax为同步执行
        async: false
    });

    $.ajax({
        url: "./data/1-circle.geojson",
        success: function(result) {
            if(result.features[sourceVertex - 1] && result.features[finalVertex - 1]) {
                var path = searchPath(sourceVertex, finalVertex);
                var pathPos = [];
                var pos;
                for(i = 0; i < path.length; i++) {
                    if(result.features[path[i]]) {
                        var pos = result.features[path[i]].properties.center;
                        pathPos[i] = pos;
                    }
                }
                //如果有确定的坐标则以此坐标为起点
                if(certainPos.toString() != "") {
                    pathPos[0] = certainPos;
                }
                //1.给起点终点加点标注
                var startPos = pathPos[0];
                startMarkerOverlay.setPosition(startPos);
                map.addOverlay(startMarkerOverlay);
                var endPos = pathPos[pathPos.length - 1];
                endMarkerOverlay.setPosition(endPos);
                map.addOverlay(endMarkerOverlay);
                findPath(pathPos);
                //先判断是否为摇一摇状态，如果是才有停止导航的按钮
                if(params) {
                    if(isTicket == "ticket" && ticket) {
                        document.getElementById('search').innerText = "停止导航";
                    }
                }
            } else {
                //该标志长期保持为true，当规划点出问题转化为false
                $(function() {
                    $.mytoast({
                        text: "请输入正确的起点和终点!",
                        type: "warning"
                    });
                });
            }
        },
        dataType: 'json',
        //设置ajax为同步执行
        async: false
    });

}

//记录离定位位置最近的车位
var closestParkingPlace, navigateSwitcher = false;

//为路径规划导航按钮绑定点击事件
$("body").delegate("#search", "click", function(event) {
    //关闭模态框
    $("#myModal").modal('hide');

    //先判断是否为摇一摇状态，如果是才有停止导航的按钮
    if(params) {
        if(isTicket == "ticket" && ticket) {
            if(!navigateSwitcher) {
                //生成起点终点标注
                startMarkerOverlay = new ol.Overlay(({
                    element: startMarker,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 100
                    }
                }));
                endMarkerOverlay = new ol.Overlay(({
                    element: endMarker,
                    autoPan: true,
                    autoPanAnimation: {
                        duration: 100
                    }
                }));
                myWay([]);
            } else {
                //清除图层
                if(lineLayer && startMarkerOverlay && endMarkerOverlay) {
                    map.removeLayer(lineLayer);
                    map.removeOverlay(startMarkerOverlay);
                    map.removeOverlay(endMarkerOverlay);
                }
                document.getElementById('search').innerText = "导航";
            }
            //启动导航的标志,根据点击次数自动置反
            navigateSwitcher = !navigateSwitcher;
        }
    } else {
        //直接进行路径规划
        myWay([]);
    }

});

//定位后为一键停车寻车按钮添加点击事件
$("body").delegate("#park-car", "click", function(event) {
    //找到最近空余车位
    var sourceVertex = document.getElementById("sourceVertex").value;
    sparePP1 = sparePP1.sort(function(a, b) {
        return Math.abs(a.get('Id') - sourceVertex) -
            Math.abs(b.get('Id') - sourceVertex);
    });
    if(sparePP1[t]) {
        document.getElementById("finalVertex").value = sparePP1[t++].get('Id');
        navigateSwitcher = true;
        myWay([]);
    }
});
$("body").delegate("#find-car", "click", function(event) {
    navigateSwitcher = true;
    myWay([]);
});
