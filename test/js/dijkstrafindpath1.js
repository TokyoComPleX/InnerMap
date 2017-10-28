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
	//若起点终点相同返回该点
	if(v == d) {
		finalPath = [v];
		return finalPath;
	}
	//地图邻接矩阵
	var adjMatrix = [];
	if(sf == ef) {
		//同层导航,先获取该层的邻接矩阵
		var i = sf.split("F")[0];
		var floorUrl = "./data/" + i + "-matrix.json";
		$.ajax({
			url: floorUrl,
			success: function(result) {
				adjMatrix = result.matrix;
			},
			dataType: 'json',
			//设置ajax为同步执行
			async: false
		});
	} else {
		//异层导航，获取两层的邻接矩阵和楼层数组
		var sf_i = sf.split("F")[0];
		var ef_i = ef.split("F")[0];
		//楼层url
		var floorSfUrl = "./data/" + sf_i + "-matrix.json";
		var floorEfUrl = "./data/" + ef_i + "-matrix.json";
		//圆点url
		var circleSfUrl = "./data/" + sf_i + "-circle.geojson";
		var circleEfUrl = "./data/" + ef_i + "-circle.geojson";
		//楼层邻接矩阵
		var adjMatrixSf = [];
		var adjMatrixEf = [];
		//楼层圆点数组
		var floorArrSf = [];
		var floorArrEf = [];

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
		//找出两个楼层数组里Rid相同的数组索引
		for(var i = 0; i < floorArrSf.length; i++) {
			for(var j = 0; j < floorArrEf.length; j++) {
				if(floorArrSf[i] == floorArrEf[j]) {
					//将关联矩阵中的相应节点权值设为0
					incMatrix[i][j] = 0;
				}
			}
		}
		adjMatrix = adjmatrixConcat(adjMatrixSf, adjMatrixEf, incMatrix);
		//将起始点和终点的Rid转化为数组索引
		for(var i = 0; i < floorArrConcat.length; i++) {
			if(floorArrConcat[i] == v) {
				v = i;
			}
			if(floorArrConcat[i] == d) {
				d = i;
			}
		}
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
	if (sf == ef) {
		//如果同楼层，不用逆映射回Rid
		return finalPath;
	} else{
		//如果不同楼层，将数组索引逆映射为Rid
		var finalPathRid = [];
		for(var i = 0; i < finalPath.length; i++) {
			finalPathRid[i] = floorArrConcat[finalPath[i]];
		}
		//如果数组里有重复的点即为连通点，删去一个
		for(var i = 0; i < finalPathRid.length; i++) {
			if(finalPathRid[i] == finalPathRid[i + 1]) {
				finalPathRid.splice(i, 1);
			}
		}
		return finalPathRid;
	}
}

//控制台打印路径
//console.log(searchPath(0, 8, "1F", "2F"));