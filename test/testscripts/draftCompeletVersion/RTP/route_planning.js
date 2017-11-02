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
    //获得起点终点文本框的内容
    var sourceVertex = document.getElementById("sourceVertex").value;
    var finalVertex = document.getElementById("finalVertex").value;
    //将起点终点转化成Rid
    var Id2Rid = parkingPlaceId2circleRid(sourceVertex,finalVertex,stFloor,edFloor);
    //获取路径圆点的坐标数组
    var finalPathPos = searchPath(Id2Rid.v,Id2Rid.d , stFloor, edFloor);
    if(certainPos.toString() != "") {
        finalPathPos.data[finalPathPos.keys[0]][0] = certainPos;
    }
    //先判断是否为摇一摇状态，如果是才有停止导航的按钮
    if(params) {
        if(isTicket == "ticket" && ticket) {
            document.getElementById('search').innerText = "停止导航";
        }
    }
//获取起点终点的坐标
    if (finalPathPos instanceof Dictionary){//如果返回了Dictionary类而不是字符串
        var startPos = finalPathPos.data[finalPathPos.keys[0]][0];
        var length = finalPathPos.data[finalPathPos.keys[1]].length;
        var endPos = finalPathPos.data[finalPathPos.keys[finalPathPos.length()-1]][length-1];
        startMarkerOverlay.setPosition(startPos);
        endMarkerOverlay.setPosition(endPos);
//初始化该条路径的图层
        pathLayerInit(finalPathPos);
//根据当前楼层判断是否要画路径
        drawPath(lineLayers);
    }

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

/*
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
*/
