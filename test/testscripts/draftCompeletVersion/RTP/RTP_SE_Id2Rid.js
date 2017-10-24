/************************************************************/
/*
* 起点终点由车位id转成Rid,即circle_id
*
* */


if(sourceVertex == '您当前的位置'){
    sourceVertex = closestParkingPlace.get('Id');
    stFloor = closestParkingPlace.get('floor');
}



if(stFloor == edFloor){
    //获取车位的url
    var url = mapRenderInfo.data.floor[stFloor].parkingplace;
    /*    $.ajax({
            url: url,
            success: function(result) {*/

    var result = pp1;
    //id转换成数组下标
    var stid = result.features[0].properties.Id;
    sourceVertex = sourceVertex - stid;
    finalVertex = finalVertex - stid;

    //判断SE的id是否合法
    if(result.features[sourceVertex] && result.features[finalVertex]) {
        sourceVertex = result.features[sourceVertex].properties.Rid;
        //记录终点坐标
        localStorage.parkingplace = finalVertex;
        // document.getElementById("finalVertex").value = finalVertex;
        //转换id和rid
        finalVertex = result.features[finalVertex].properties.Rid;
    }else{
        //如果不合法，弹出警示
        $(function() {
            $.mytoast({
                text: "请在地图上选择起点和终点",
                type: "warning"
            });
        });
    }
    /*        },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });*/
}else{
    //如果在不同楼层
    //分别获取起点，终点楼层的车位图层url
    sfurl = mapRenderInfo.data.floor[stFloor].parkingplace;
    edurl = mapRenderInfo.data.floor[edFloor].parkingplace;
    //分别请求对应楼层的图层，然后分别转换成Rid
    /*    $.ajax({
            url: sfurl,
            success: function(result) {*/
    result = pp1;
    var stid = result.features[0].properties.Id;
    sourceVertex = sourceVertex - stid;
    if(result.features[sourceVertex]) {
        sourceVertex = result.features[sourceVertex].properties.Rid;
    }else{
        $(function() {
            $.mytoast({
                text: "请在地图上选择起点和终点",
                type: "warning"
            });
        });
    }
    /*        },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });*/
    /*    $.ajax({
            url: edurl,
            success: function(result) {*/
    result = pp2;
    var stid = result.features[0].properties.Id;
    finalVertex = finalVertex - stid;
    if(result.features[finalVertex]) {
        localStorage.parkingplace = finalVertex;
        // document.getElementById("finalVertex").value = finalVertex;
        //转换id和rid
        finalVertex = result.features[finalVertex].properties.Rid;
    } else{
        $(function() {
            $.mytoast({
                text: "请在地图上选择起点和终点",
                type: "warning"
            });
        });
    }
    /*        },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });*/
}
//SE的id转换成了Rid
