/**
 * Dijkstra算法
 * @author JunJie Ding
 * @date 2017/10/14
 */

/**
 * @const
 */
var MAX = Infinity;

/**
 * @func 采用地杰斯特拉算法获得最短路径的结点和距离键值对
 * @param {number} sourceV 源点的索引，从0开始
 * @param {array} adjMatrix 图的邻接矩阵，是一个二维数组
 *
 * @return {key-value} 路径和距离的键值对
 */

function dijkstra(sourceV, adjMatrix) {
    var set = [],
        path = [],

        dist = [];
    var distCopy = [],
        vertexNum = adjMatrix.length;

    var temp, u,
        count = 0;

    // 初始化
    for(var i = 0; i < vertexNum; i++) {
        distCopy[i] = dist[i] = MAX;
        set[i] = false;
    }
    distCopy[sourceV] = dist[sourceV] = 0;

    while(count < vertexNum) {
        u = distCopy.indexOf(Math.min.apply(Math, distCopy));
        set[u] = true;
        distCopy[u] = MAX;

        for(var i = 0; i < vertexNum; i++) {
            if(!set[i] && ((temp = dist[u] + adjMatrix[u][i]) < dist[i])) {
                distCopy[i] = dist[i] = temp;
                path[i] = u;
            }
        }
        count++;
    }

    return {
        path: path,
        dist: dist
    };
}

/**
 * @func 矩阵转置函数
 * @param {array} arr 待转置的矩阵
 *
 * @return {array} res 转置后的矩阵
 * */
function transposition(arr) {
    var res = [];
    var row = arr[0].length;
    for(var k = 0; k < row; k++) {
        res[k] = [];
    }
    for(var i = 0; i < arr.length; i++) {
        for(var j = 0; j < arr[i].length; j++) {
            res[j][i] = arr[i][j];
        }
    }
    return res;
}

/**
 * @func 矩阵拼接函数
 * @param {array} arr1 矩阵一
 * @param {array} arr2 矩阵二
 * @param {integer} flag 标志位，flag为1则横向拼接，否则纵向拼接
 *
 * @return {array} res 拼接后的矩阵
 * */
function matrixConcat(arr1, arr2, flag) {
    var res = [];
    if(flag) {
        var tempArr1 = arr1.concat();
        for(var i = 0; i < tempArr1.length; i++) {
            res.push(tempArr1[i].concat(arr2[i]));
        }
    } else {
        var tempArr1 = arr1.concat();
        var tempArr2 = arr2.concat();
        for(var i = 0; i < tempArr2.length; i++) {
            tempArr1.push(tempArr2[i]);
        }
        res = tempArr1;
    }
    return res;
}

/**
 * @func 邻接矩阵拼接
 * @param {array} 楼层一的邻接矩阵
 * @param {array} d2 楼层二的邻接矩阵
 * @param {array} e 关联矩阵，其中只有相通节点权值为0
 *
 * @return {array} res 拼接后的大邻接矩阵
 * */
function adjmatrixConcat(d1, d2, e) {
    var e2 = transposition(e);
    var temp1 = matrixConcat(d1, e2);
    var temp2 = matrixConcat(e, d2);
    var res = matrixConcat(temp1, temp2, 1);
    return res;
}

/**
 * @func 将车位Id转换成为圆点Rid
 * @param {number} sourceVertex 起点车位Id, 从1开始
 * @param {number} finalVertex 终点车位Id, 从1开始
 * @param {string} sf 起始楼层,例如"1F"
 * @param {string} ef 终点楼层，例如"1F"
 *
 * @return {object} res res.v 距离sourceVertex车位最近的圆点Rid
 *                       res.d 距离finalVertex车位最近的圆点Rid
 */
function parkingPlaceId2circleRid(sourceVertex,finalVertex,stFloor,edFloor,flag) {
    if(sourceVertex == '您当前的位置'){
        sourceVertex = closestParkingPlace.get('Id');
        stFloor = closestParkingPlace.get('floor');
    }

    var sf_i = stFloor.split("F")[0];
    var ef_i = edFloor.split("F")[0];
    var Rid_IdFlag = !!arguments[4];
    var Rid_Id = new Dictionary();
    if(stFloor == edFloor){
        //获取车位的url
        var url = "../data/" + sf_i + "-parkingplace.geojson";
        $.ajax({
            url: url,
            success: function(result) {
                // var result = pp1;
                //id转换成数组下标
                var stid = result.features[0].properties.Id;
                sourceVertex = sourceVertex - stid;
                finalVertex = finalVertex - stid;

                //判断SE的id是否合法
                if(result.features[sourceVertex] && result.features[finalVertex]) {
                    sourceVertex = result.features[sourceVertex].properties.Rid;
                    // document.getElementById("finalVertex").value = finalVertex;
                    //记录终点坐标
                    localStorage.parkingplace = finalVertex;
                    //转换id和rid
                    finalVertex = result.features[finalVertex].properties.Rid;

                    //TODO 检查是否有错
                    if(Rid_IdFlag){
                        result.features.forEach(function (value,index,arr) {
                            Rid_Id.put(value.properties.Rid,value.properties.Id);
                        })
                    }
                }else{
                    //如果不合法，弹出警示
                    $(function() {
                        $.mytoast({
                            text: "请在地图上选择起点和终点",
                            type: "warning"
                        });
                    });
                }
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
    }else{
        //如果在不同楼层
        //分别获取起点，终点楼层的车位图层url
        sfurl = "../data/" + sf_i + "-parkingplace.geojson";
        edurl = "../data/" + ef_i + "-parkingplace.geojson";
        //分别请求对应楼层的图层，然后分别转换成Rid
        $.ajax({
            url: sfurl,
            success: function(result) {
                // result = pp1;
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
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        $.ajax({
            url: edurl,
            success: function(result) {
                // result = pp2;
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
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
    }
    var res = {
        v:sourceVertex,
        d:finalVertex
    };
    if (Rid_IdFlag)
        res.Rid_Id = Rid_Id;
    return res;
}



/**
 * @func 获得最短路径
 * @param {number} v 源点索引, 从0开始
 * @param {number} d 非源点索引, 从0开始
 * @param {string} sf 起始楼层,例如"1F"
 * @param {string} ef 终点楼层，例如"1F"
 *
 * @return {array} finalPathRid 路径节点的Rid数组
 */
function searchPath(v, d, sf, ef) {
    var finalPathPos = new Dictionary();//路径坐标
    var finalPath = [];//路径Rid
    var floorArrConcat = [];//圆点Rid数组
    var floorCirclePosArr = new Dictionary();//圆点坐标数组
    var crossFloorFlag = sf!=ef;//跨层flag

    //若起点终点相同返回该点
    if(v == d) {
        finalPath = [v];
        return finalPath;
    }

    //地图邻接矩阵
    var adjMatrix = [];
//if-else代码段
    // 输入楼层
    // 输出总的邻接矩阵adjMatrix
    // 圆点Rid数组floorArrConcat,
    // 圆点id-center键值对floorCirclePosArr
    // 同时将起点终点从Rid转成数组下标
    if(!crossFloorFlag) {//如果不跨层
        //同层导航,先获取该层的邻接矩阵与圆图层
        var i = sf.split("F")[0];
        var floorUrl = "data/" + i + "-matrix.json";
        var circleUrl = "data/" + i + "-circle.geojson";
        $.ajax({
            url: floorUrl,
            success: function(result) {
                adjMatrix = result.matrix;
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        $.ajax({
            url: circleUrl,
            success: function(result) {
                for(var i = 0; i < result.features.length; i++) {
                    var Id = result.features[i].properties.Id;
                    floorArrConcat.push(Id);//Rid数组
                    var center = result.features[i].properties.center;
                    floorCirclePosArr.put(Id.toString(),center);//Rid-center键值对
                }
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        //起点终点转成数组下标
        v = floorArrConcat.indexOf(v);
        d = floorArrConcat.indexOf(d);
    } else {
        //异层导航，获取两层的邻接矩阵和楼层数组
        var sf_i = sf.split("F")[0];
        var ef_i = ef.split("F")[0];
        //楼层url
        var floorSfUrl = "data/" + sf_i + "-matrix.json";
        var floorEfUrl = "data/" + ef_i + "-matrix.json";
        //圆点url
        var circleSfUrl = "data/" + sf_i + "-circle.geojson";
        var circleEfUrl = "data/" + ef_i + "-circle.geojson";
        //楼层邻接矩阵
        var adjMatrixSf = [];
        var adjMatrixEf = [];
        //楼层圆点数组
        var floorArrSf = [];
        var floorArrEf = [];
        //获取数据
        $.ajax({
            url: floorSfUrl,
            success: function(result) {
                adjMatrixSf = result.matrix;
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        $.ajax({
            url: floorEfUrl,
            success: function(result) {
                adjMatrixEf = result.matrix;
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        $.ajax({
            url: circleSfUrl,
            success: function(result) {
                for(var i = 0; i < result.features.length; i++) {
                    var Id = result.features[i].properties.Id;
                    floorArrSf.push(Id);
                    var center = result.features[i].properties.center;
                    floorCirclePosArr.put(Id.toString(),center);//Rid-center键值对
                }
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        $.ajax({
            url: circleEfUrl,
            success: function(result) {
                for(var i = 0; i < result.features.length; i++) {
                    var Id = result.features[i].properties.Id;
                    floorArrEf.push(Id);
                    var center = result.features[i].properties.center;
                    floorCirclePosArr.put(Id.toString(),center);//Rid-center键值对
                }
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
        //错误处理代码
        if(adjMatrixSf.length != floorArrSf.length ||
            adjMatrixEf.length != floorArrEf.length) {
            //图层数据出错
            toastr.options = {
                "positionClass": "toast-top-center",
                "preventDuplicates": true,
                "showDuration": "3000",
                "hideDuration": "1000",
                "timeOut": "1500",
                "extendedTimeOut": "1000"

            };
            toastr["warning"]("图层出错");
            return ;
        }
        //合成两个楼层圆点数组
        var tempArr = floorArrSf.concat();
        floorArrConcat = tempArr.concat(floorArrEf);
        //求得关联矩阵incMatrix(初始化权值全为999)
        var incMatrix = new Array();
        for(var i = 0; i < floorArrSf.length; i++) {
            incMatrix[i] = [];
            for(var j = 0; j < floorArrEf.length; j++) {
                incMatrix[i][j] = 999;
            }
        }
        //代码段
        //找出两个楼层数组里Rid相同的数组索引,即特别设置的连通点
        //假设:所有的连通点均处于数组的尾部(故从末尾开始遍历)而且是连续的
        //输入:起点终点楼层的Rid数组
        //输出:包含连通点Rid的数组,邻接矩阵拼接要用的incMatrix
        var findFlag = 0;
        var getFlag = 0;
        var lostFlag = 0;
        var crossFloorArr = [];//存放连通点Rid的数组
        //代码块输入:起点楼层终点楼层的Rid数组
        //输出:拼接的邻接矩阵,包含连通点Rid的数组
        complete:{
            for(var i = floorArrSf.length-1; i > 0; i--) {
                if(!findFlag){//如果还没找到相同地方的开始处
                    for(var j = floorArrEf.length-1; j > 0 ; j--) {
                        if(floorArrSf[i] == floorArrEf[j]) {
                            //将关联矩阵中的相应节点权值设为0
                            incMatrix[i][j] = 0;
                            crossFloorArr.push(floorArrEf[j]);
                            //找到了连通点的连续数段
                            findFlag = 1;
                            lostFlag = 0;
                            break;//已经找到连通点floorArrSf[i],寻找下一个连通点
                        }
                    }
                }else if(!lostFlag){
                    j--//i,j保持同样的更新
                    for (var k = 0 ;; k++){
                        if (floorArrSf[i-k] == floorArrEf[j-k]){
                            crossFloorArr.push(floorArrEf[j-k]);
                        }else{
                            lostFlag = 0;
                            break complete;
                        }
                    }
                }
            }
        }
        //代码段结束,输出连通点数组,incMatrix
        //拼接成一个邻接矩阵
        adjMatrix = adjmatrixConcat(adjMatrixSf, adjMatrixEf, incMatrix);
        //将起始点和终点的Rid转化为数组索引
        v = floorArrConcat.indexOf(v);
        d = floorArrConcat.indexOf(d);
    }

//if-else代码段结束
// 输出邻接矩阵,起点终点数组下标,连通点的Rid数组

//代码段输入:起点终点的数组下标,邻接矩阵
// 输出:路径Rid数组
    // console.log(adjMatrix.join('\n'));
    if (v==-1 || d==-1){
        toaster.options = {
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "showDuration": "3000",
            "hideDuration": "1000",
            "timeOut": "1500",
            "extendedTimeOut": "1000"

        };
        toastr["warning"]("请选择正确的起点与终点!");
        return ["invalid Start Point Id of End Point Id"];
    }
    var graph = dijkstra(v, adjMatrix),
        path = graph.path,
        dist = graph.dist;

    var prev = path[d],
        queue = [];

    queue.push(d);
    while(prev != v) {
        queue.push(prev);
        prev = path[prev];
    }
    queue.push(v);

    for(var j = queue.length - 1; j >= 0; j--) {
        finalPath.push(queue.pop());
    }

    //如果不同楼层，将数组索引逆映射为Rid
    var finalPathRid = [];
    for(var i = 0; i < finalPath.length; i++) {
        finalPathRid[i] = floorArrConcat[finalPath[i]];
    }
//代码段结束,输出路径Rid数组
    //如果数组里有重复的点即为连通点，在此处分成两个数组按名值对放入dictionary中
    var dicFinalPth = new Dictionary();

    if (crossFloorFlag) {
        for (var i = 0; i < crossFloorArr.length; i++) {
            if (finalPathRid.some(function (t) { return t == crossFloorArr[i] })) {
                var crossPoint = finalPathRid.indexOf(crossFloorArr[i]);
                //得到起始楼层的路径
                var sfPath = finalPathRid.slice(0, crossPoint + 1);
                //得到终点楼层的数组
                var efPath = finalPathRid.slice(crossPoint + 1, finalPathRid.length);
                dicFinalPth.put(sf, sfPath);
                dicFinalPth.put(ef, efPath);
                break;
            }
        }
    }else {
        dicFinalPth.put(sf,finalPathRid);
    }
    // alert(floorCirclePosArr.data.join('\n'));
//代码段
    //将路径Rid数组dicFinalPth转成坐标数组floorCirclePosArr
    //设置起点终点的位置
    for(var i = 0 ; i < dicFinalPth.length() ; i++){
        var currentFloor = dicFinalPth.getkey(i);
        var floorPathRid = dicFinalPth.data[currentFloor];
        var floorPathPos = [];
        for (var j = 0 ; j < floorPathRid.length ; j++){
            floorPathPos[j] = [];
            floorPathPos[j] = floorCirclePosArr.data[floorPathRid[j].toString()];
            // $.extend(floorPathPos,floorCirclePosArr.data[floorPathRid[j].toString()]);
        }
        finalPathPos.put(currentFloor,floorPathPos);
    }
    return finalPathPos;


}

/** @func 路径规划主要业务
 *
 * @param {array} optional 当前定位到的位置
 *
 * @return 全局变量linelayers数组修改为新的路径变量
 *          startMarker 设置坐标为起点坐标
 *          endMarker   设置坐标为终点坐标
 *          将根据当前的楼层决定是否需要渲染路径
 * */
function myWay(certainPos) {
    //获得起点终点文本框的内容
    var sourceVertex = document.getElementById("sourceVertex").value;
    var finalVertex = document.getElementById("finalVertex").value;



    sourceVertex = parseInt(sourceVertex);
    finalVertex = parseInt(finalVertex);
//代码段,验证文本框内的车位Id是否存在于stFloor,edFloor所指向的楼层
/*    var keys = parkingPlacesIds.keys;
    var foundFlag = false;
    if(parkingPlacesIds.getvalue(stFloor).indexOf(sourceVertex) == -1){//如果本层没找到
        for (var i = 0 ; i < keys.length; i++){//遍历初始化过的所有楼层
            var floor = keys[i];
            if (floor == stFloor)
                continue;
            var currFloorIds = parkingPlacesIds.getvalue(floor);
            if (currFloorIds.indexOf(sourceVertex) != -1){
                stFloor = floor;
                foundFlag = true;
                break;
            }
        }
        if (!foundFlag){
           //如果初始化过的所有楼层中都没有
           var allFloors = mapRenderInfo.getfloor();
           keys.forEach(function (value,index,arr) {
               var n = allFloors.indexOf(value);//获取该层在总楼层中的索引
               allFloors = allFloors.slice(0,n).concat(allFloors.slice(n+1,allFloors.length));//删除该层
           });
           for (var j = 0 ; j < allFloors.length ; j++){
                var floor = allFloors[j];
                layer_init(floor);

               var currFloorIds = parkingPlacesIds.getvalue(floor);
               if (currFloorIds.indexOf(sourceVertex) != -1){
                   stFloor = floor;
                   foundFlag = true;
                   break;
               }
           }
            if (!foundFlag){//如果还是没找到
                toaster.options = {
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "showDuration": "3000",
                    "hideDuration": "1000",
                    "timeOut": "1500",
                    "extendedTimeOut": "1000"
                };
                toaster["warning"]("请选择正确的起点与终点!");
                return;
            }
        }
    }
    foundFlag = false;
    keys = parkingPlacesIds.keys;//更新楼层索引
    if(parkingPlacesIds.getvalue(edFloor).indexOf(finalVertex) == -1){//如果本层没找到
        for (var i = 0 ; i < keys.length; i++){//遍历初始化过的所有楼层
            var floor = keys[i];
            if (floor == edFloor)
                continue;
            var currFloorIds = parkingPlacesIds.getvalue(floor);
            if (currFloorIds.indexOf(finalVertex) != -1){
                edFloor = floor;
                foundFlag = true;
                break;
            }
        }
        if (!foundFlag){
            //如果初始化过的所有楼层中都没有
            var allFloors = mapRenderInfo.getfloor();
            keys.forEach(function (value,index,arr) {
                var n = allFloors.indexOf(value);//获取该层在总楼层中的索引
                allFloors = allFloors.slice(0,n).concat(allFloors.slice(n+1,allFloors.length));//删除该层
            });
            for (var j = 0 ; j < allFloors.length ; j++){
                var floor = allFloors[j];
                layer_init(floor);

                var currFloorIds = parkingPlacesIds.getvalue(floor);
                if (currFloorIds.indexOf(finalVertex) != -1){
                    edFloor = floor;
                    foundFlag = true;
                    break;
                }
            }
            if (!foundFlag){//如果还是没找到
                toaster.options = {
                    "positionClass": "toast-top-center",
                    "preventDuplicates": true,
                    "showDuration": "3000",
                    "hideDuration": "1000",
                    "timeOut": "1500",
                    "extendedTimeOut": "1000"
                };
                toaster["warning"]("请选择正确的起点与终点!");
                return;
            }
        }
    }*/
//代码段结束,起始楼层,终点楼层校验完毕

    //将起点终点转化成Rid
    var Id2Rid = parkingPlaceId2circleRid(sourceVertex,finalVertex,stFloor,edFloor,true);
    //获取路径圆点的坐标数组
    var finalPathPos = searchPath(Id2Rid.v,Id2Rid.d , stFloor, edFloor);
    if(!!arguments.length) {
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
        var floors = finalPathPos.length();
        var length = finalPathPos.data[floors + "F"].length;
        var endPos = finalPathPos.data[finalPathPos.keys[finalPathPos.length()-1]][length-1];
        startMarkerOverlay.setPosition(startPos);
        endMarkerOverlay.setPosition(endPos);
//初始化该条路径的图层
        pathLayerInit(finalPathPos);
//根据当前楼层判断是否要画路径

        drawPath(lineLayers);
    }else{
    //    已经在函数内部对对应的错误进行了toaster提示
    }

}
// alert();
// console.log(searchPath(0, 8, "1F", "2F"));