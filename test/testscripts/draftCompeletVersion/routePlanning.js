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
 * @func 获得最短路径
 * @param {number} v 源点索引, 从0开始
 * @param {number} d 非源点索引, 从0开始
 * @param {string} sf 起始楼层,例如"1F"
 * @param {string} ef 终点楼层，例如"1F"
 *
 * @return {array} finalPathRid 路径节点的Rid数组
 */
function searchPath(v, d, sf, ef) {
    var finalPath = [];
    var floorArrConcat = [];
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
    // 输出总的邻接矩阵adjMatrix+圆点Rid数组floorArrConcat,同时将起点终点从Rid转成数组下标
    if(!crossFloorFlag) {//如果不跨层
        //同层导航,先获取该层的邻接矩阵与圆图层
        var i = sf.split("F")[0];
        var floorUrl = "../data1/" + i + "-matrix.json";
        var circleUrl = "../data1/" + i + "-circle.geojson";
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
                            floorArrConcat.push(result.features[i].properties.Id);
                        }
                    },
                    dataType: 'json',
                    //设置ajax为同步执行
                    async: false
                });
/*        switch (i){
            case '1':
                adjMatrix = matrix1;
                floorArrConcat = ca1;
                break;
            case '2' :
                adjMatrix = matrix2;
                floorArrConcat = ca2;
                break;
        }*/
        //起点终点转成数组下标
        v = floorArrConcat.indexOf(v);
        d = floorArrConcat.indexOf(d);
    } else {
        //异层导航，获取两层的邻接矩阵和楼层数组
        var sf_i = sf.split("F")[0];
        var ef_i = ef.split("F")[0];
        //楼层url
        var floorSfUrl = "../data1/" + sf_i + "-matrix.json";
        var floorEfUrl = "../data1/" + ef_i + "-matrix.json";
        //圆点url
        var circleSfUrl = "../data1/" + sf_i + "-circle.geojson";
        var circleEfUrl = "../data1/" + ef_i + "-circle.geojson";
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
                    floorArrSf.push(result.features[i].properties.Id);
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
                    floorArrEf.push(result.features[i].properties.Id);
                }
            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });
/*        switch (sf_i){
            case '1' :
                adjMatrixSf = matrix1;
                floorArrSf = ca1;
                break;
            case '2' :
                adjMatrixSf = matrix2;
                floorArrSf = ca2;
                break;
        }
        switch (ef_i){
            case '1' :
                adjMatrixEf = matrix1;
                floorArrEf = ca1;
                break;
            case '2' :
                adjMatrixEf = matrix2;
                floorArrEf = ca2;
                break;
        }*/
        //错误处理代码
        if(adjMatrixSf.length != floorArrSf.length ||
            adjMatrixEf.length != floorArrEf.length) {
            //图层数据出错
            return ["图层出错"];
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
        //拼接成一个邻接矩阵
        adjMatrix = adjmatrixConcat(adjMatrixSf, adjMatrixEf, incMatrix);
        //将起始点和终点的Rid转化为数组索引
        v = floorArrConcat.indexOf(v);
        d = floorArrConcat.indexOf(d);
    }

//if-else代码段结束
// 输出邻接矩阵,起点终点数组下标,连通点的Rid数组
    var finalPath = [];

//代码段输入:起点终点的数组下标,邻接矩阵
// 输出:路径Rid数组
    // console.log(adjMatrix.join('\n'));
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
    return dicFinalPth;

    /*    if (sf == ef) {
            //如果同楼层，不用逆映射回Rid
            return finalPath;
        } else{
            //如果不同楼层，将数组索引逆映射为Rid
            var finalPathRid = [];
            for(var i = 0; i < finalPath.length; i++) {
                finalPathRid[i] = floorArrConcat[finalPath[i]];
            }
            //如果数组里有重复的点即为连通点，在此处分成两个数组按名值对放入dictionary中
            var dicFinalPth = new Dictionary();
            for(var i = 0; i < finalPathRid.length; i++) {
                if(finalPathRid[i] == finalPathRid[i + 1]) {
                    //得到起始楼层的路径
                    var sfPath = finalPathRid.slice(0,i+1);
                    //得到终点楼层的数组
                    var efPath = finalPathRid.slice(i+1,finalPathRid.length);
                    dicFinalPth.put(sf,sfPath);
                    dicFinalPth.put(ef,efPath);
                    break;
                }
            }
            return dicFinalPth;
        }*/
}
//控制台打印路径
var t = searchPath(1,8 , "1F", "2F");
alert(t.data.join('\n'));
// alert();
console.log(searchPath(0, 8, "1F", "2F"));