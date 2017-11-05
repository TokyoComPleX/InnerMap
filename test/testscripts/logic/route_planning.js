/******************************路径规划功能****************************************/
//初始化路径规划对话框内容(若之前扫过将在此载入位置)
if(localStorage.parkingplace !== undefined) {
    document.getElementById("finalVertex").value = localStorage.parkingplace;
}

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
    id:"startMarker",
    element: startMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));
var endMarkerOverlay = new ol.Overlay(({
    id:"endMarker",
    element: endMarker,
    autoPan: true,
    autoPanAnimation: {
        duration: 100
    }
}));

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
                //为什么又要初始化一遍?
                //生成起点终点标注
/*                startMarkerOverlay = new ol.Overlay(({
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
                }));*/
                myWay();
            } else {
                //清除图层
                if(temp)
                    map.removeLayer(temp);
                if(map.getOverlayById("startMarker"))
                    map.removeOverlay(startMarkerOverlay);
                if(map.getOverlayById("endMarker"))
                    map.removeOverlay(endMarkerOverlay);
                document.getElementById('search').innerText = "导航";
            }
            //启动导航的标志,根据点击次数自动置反
            navigateSwitcher = !navigateSwitcher;
        }
    } else {
        //直接进行路径规划
        myWay();
    }
});




//定位后为一键停车寻车按钮添加点击事件
$("body").delegate("#park-car", "click", function(event) {
    //找到最近空余车位
    var currF = $('#float-left a.on').html();
    //找到最近车位
    if (spareVectorSources.getvalue(currF).getFeatures().length) {//如果本层存在空闲车位
        closestParkingPlace = spareVectorSources.getvalue(currF).getClosestFeatureToCoordinate(stPos);
    }else{
        //代码段,按照里本层的远近一次得到其他楼层的排列
        var currentFloor = currF.split("F")[0];
        var floors = mapRenderInfo.getfloor();
        floors.forEach(function (t, number, ts) {
            t = t.split("F")[0];
        });
        floors.sort(function(a, b) {
            return Math.abs(a-currentFloor) - Math.abs(b-currentFloor);
        });
        floors.shift();
        //代码段结束
        for(var i = 0 ; i <floors.length ; i++){
            var featureAtFloorsI = spareVectorSources.getvalue(floors[i]+'F').getFeatures();
            if (featureAtFloorsI.length){
                closestParkingPlace = featureAtFloorsI[0];
            }
        }
    }
    document.getElementById("finalVertex").value = closestParkingPlace.get("Id");
    edFloor = closestParkingPlace.get("floor");
    edPos = closestParkingPlace.get("center");
    navigateSwitcher = true;
    myWay();

});
$("body").delegate("#find-car", "click", function(event) {
    navigateSwitcher = true;
    //这里之后会改成向服务器请求车位
    //检查本地是否有存储停车的地方,没有则toaster提示输入车牌号
    myWay();
});
