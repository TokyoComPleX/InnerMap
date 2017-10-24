/*
* 寻优算法输出之后的内容
* */

//******寻优算法获得的路径
var pathget = new Dictionary();
// pathget.put('1F',[ 1, 2, 3, 4, 5, 6, 7, 8, 32, 33 ]);
// pathget.put('2F',[33,34,35,38,45,56]);

var path = searchPath(sourceVertex, finalVertex);//代码块输入：Dictionary版的
pathget.put('1F',path);

function circle_Id2Pos(floor,pathdata) {
    var url = mapRenderInfo.data.floor[floor].circle;
    /*ajax*/
    // $.ajax({
    //     url: url,
    //     success: function(result) {
            var result = circle1;
            var pathPos=[];
            var pos;
            for(var i = 0; i < pathdata.length; i++) {
                if(result.features[pathdata[i]]) {
                    pos = result.features[pathdata[i]].properties.center;
                    pathPos[i] = pos;
                }
            }
        // },
    //     dataType: 'json',
    //     //设置ajax为同步执行
    //     async: false
    // });
    // result = circle1;

    /*ajax*/
/*    if(certainPos.toString() != "") {
        pathPos[0] = certainPos;
    }*/
    return pathPos;
}
var pathPosition = new Dictionary();//代码块输出，同为Dictionary版的

floor = stFloor;
//获取该层的cirle_id路径数组
var pathdata = pathget.data[pathget.getkey(0)];
var pathPos = circle_Id2Pos(floor,pathdata);
pathPosition.put(floor,pathPos);
//如果有两层
if(stFloor != edFloor){
    floor = edFloor;
    var pathdata = pathget.data[pathget.getkey(1)];
    var pathPos = circle_Id2Pos(floor,pathdata);
    pathPosition.put(floor,pathPos);
}

//设置SE坐标
var startPos = pathPosition.data[pathPosition.getkey(0)][0];//获取pathPos-data-第一层-第一个坐标
startMarkerOverlay.setPosition(startPos);
if (pathPosition.length() == 1){
    var tempPath = pathPosition.data[pathPosition.getkey(0)];
    var endPos = tempPath[tempPath.length-1];
}else{
    var tempPath = pathPosition.data[pathPosition.getkey(1)];
    var endPos = tempPath[tempPath.length-1];
}
endMarkerOverlay.setPosition(endPos);
//初始化该条路径的图层
pathLayerInit(pathPosition);
//根据当前楼层判断是否要画路径
drawPath(lineLayers);


    // map.removeOverlay(map.getOverlays());

/*
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
*/

