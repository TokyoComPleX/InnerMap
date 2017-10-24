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
    if (!isNaN(sourceVertex)) {
        if (document.querySelector('.on').innerHTML == "1F") {
            sparePP1 = sparePP1.sort(function(a, b) {
                return Math.abs(a.get('Id')-sourceVertex) -
                    Math.abs(b.get('Id')-sourceVertex);
            });
            if (sparePP1[t++]) {
                document.getElementById("finalVertex").value = sparePP1[t++].get('Id');
                navigateSwitcher = true;
                myWay([]);
            }
        } else if(document.querySelector('.on').innerHTML == "2F"){
            sparePP2 = sparePP2.sort(function(a, b) {
                return Math.abs(a.get('Id')-sourceVertex) -
                    Math.abs(b.get('Id')-sourceVertex);
            });
            if (sparePP2[t++]) {
                document.getElementById("finalVertex").value = sparePP2[t++].get('Id');
                navigateSwitcher = true;
                myWay([]);
            }
        }
    }
});
$("body").delegate("#find-car", "click", function(event) {
    navigateSwitcher = true;
    myWay([]);
});