/*********************************部分全局变量的声明**************************/
//声明地图显示的范围
var extent = [0, 0, 3000, 3000];
//定义投影坐标系
var projection = new ol.proj.Projection({
	code: 'EPSG:4326',
	extent: extent
});
//判断用户使用的是哪种系统的手机分配不同的标准
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//获取当前页面的网址和所带信息
var currentUrl = window.location.href;
var params = currentUrl.split("?")[1];
//判断页面是否是摇一摇得到的
if(params) {
	var ticketStr = params.split("&")[0];
	var isTicket = ticketStr.split("=")[0];
	var ticket = ticketStr.split("=")[1];
}
//获得一层的空闲车位
var spareFeatures1;
var sparePP1 = [];
var t = 0;
//获得二层的空闲车位
var spareFeatures2;
var sparePP2 = [];
/****************************第一层图层****************************************/
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
		url: 'data/1-circle.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_circle
});
//第一层坐标圆的源
var vectorCircleSource = vectorLayer_1_circle.getSource();

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
		url: 'data/1-elevator.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_elevator
});

//第一层停车位
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
		url: 'data/1-parkingplace.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_parking
});
//第一层停车位的源
var vectorSource = vectorLayer_1_parking.getSource();

/******************************生成空闲车位********************************/
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
//随机模拟空闲车位
var rand = Math.random();
var num = Math.round(rand * 100);
vectorSource.once('change', function(evt) {
	var source = evt.target;
	if(source.getState() === 'ready') {
		spareFeatures1 = source.getFeatures();
		for(i = num; i < (num + 60); i = i + 2) {
			if(spareFeatures1[i]) {
				spareFeatures1[i].setStyle(spareStyle);
				sparePP1.push(spareFeatures1[i]);
			}
		}
	}
});

//第一层线路
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
		url: 'data/1-road.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_road
});

//第一层楼梯
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
		url: 'data/1-stairs.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_stairs
});

//第一层背景
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
		url: 'data/1-wall.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_wall
});

/******************************第二层图层**************************************/
//第二层坐标圆图层
var vectorLayer_2_circle = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-circle.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_circle
});
var vectorCircleSource_2 = vectorLayer_2_circle.getSource();

//第二层电梯
var vectorLayer_2_elevator = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-elevator.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_elevator
});

//第二层停车位
var vectorLayer_2_parking = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-parkingplace.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_parking
});
//第二层停车位的源
var vectorSource_2 = vectorLayer_2_parking.getSource();

/******************************生成空闲车位*******************************/
vectorSource_2.once('change', function(evt) {
	var source = evt.target;
	if(source.getState() === 'ready') {
		spareFeatures2 = source.getFeatures();
		for(i = num; i < (num + 60); i = i + 2) {
			if(spareFeatures2[i]) {
				spareFeatures2[i].setStyle(spareStyle);
				sparePP2.push(spareFeatures2[i]);
			}
		}
	}
});

//第二层线路
var vectorLayer_2_road = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-road.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_road
});

//第二层楼梯
var vectorLayer_2_stairs = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-stairs.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_stairs
});

//第二层背景
var vectorLayer_2_wall = new ol.layer.Vector({
	source: new ol.source.Vector({
		url: 'data/2-wall.geojson',
		projection: projection,
		format: new ol.format.GeoJSON({
			extractStyles: false
		})
	}),
	style: style_1_wall
});

/***********************初始化地图视图***********************************/
var mapView = new ol.View({
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
});

/********************初始化地图容器**************************************/
var map = new ol.Map({
	target: 'map',
	layers: [
		vectorLayer_1_wall,
		vectorLayer_1_road,
		vectorLayer_1_circle,
		vectorLayer_1_parking,
		vectorLayer_1_elevator,
		vectorLayer_1_stairs,
		//文字图层
		/*new ol.layer.Image({
			source: new ol.source.ImageStatic({
				url: 'images/textbg.png',
				projection: projection,
				imageExtent: [0, -1165, 890, -150],
				imageSize: [450,500]
			})
		}),*/
	],
	view: mapView,
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
	pixelRatio: 1
});

/********************************单击弹出对话框**********************************/
//初始化路径规划对话框内容(若之前扫过将在此载入位置)
if(localStorage.parkingplace !== undefined) {
    document.getElementById("finalVertex").value = localStorage.parkingplace;
}

/**
 * 组成弹出框的元素 
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

/*生成弹出框*/
var overlay = new ol.Overlay(({
	element: container,
	autoPan: true,
	autoPanAnimation: {
		duration: 100 //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度. 单位为毫秒（ms）  
	}
}));

/*关闭弹出框按钮*/
closer.onclick = function() {
	overlay.setPosition(undefined);
	closer.blur();
	return false;
};

/*
 * @des		弹出框函数
 * @param	pixel	点击的像素点 
 * @return	点击车位时弹出框框并位移到屏幕中心
 */
var displayFeatureInfo = function(pixel) {
	var feature = map.forEachFeatureAtPixel(pixel, function(feature, layer) {
		return feature;
	});

	if(feature) {
		if(feature.get('featuretype') == "Parkingplace" || "Point") {
			var center = feature.get('center');
			var id = feature.get('Id');
			mapView.animate({
				center: center
			}, {
				duration: 1
			});
			content.innerHTML = '<p>您点击的是:' + '<code>' + id + '</code>' + '号车位</p>';
			overlay.setPosition(center);
			map.addOverlay(overlay);
			//为弹出框的按钮添加点击事件
			$("#popup-btn-start").click(function() {
				//设为起点
				document.getElementById("sourceVertex").value = id;
				overlay.setPosition(undefined);
			});
			$("#popup-btn-end").click(function() {
				//设为终点
				document.getElementById("finalVertex").value = id;
				overlay.setPosition(undefined);
			});
		}
	}

};

//地图点击事件返回点击像素点
map.on('click', function(evt) {
	if(evt.dragging) { //如果是拖动地图造成的鼠标移动，则不作处理  
		return;
	}
	var pixel = map.getEventPixel(evt.originalEvent);
	displayFeatureInfo(pixel);
});


var lineLayer;
/*
 * @des		画路径函数
 * @param	pointList	路线点集合
 * @return	让两点之间最短路径显示在图上
 */
function findPath(pointList) {
	//0.清理原先图层
	if(lineLayer) {
		map.removeLayer(lineLayer);
	}
	//1.生成线路要素
	var feature = new ol.Feature({
		geometry: new ol.geom.LineString(pointList)
	});
	//2.线路样式
	var lineStyle = new ol.style.Style({
		stroke: new ol.style.Stroke({
			width: 3,
			color: [31, 250, 156, 1]
		})
	});
	feature.setStyle(lineStyle);

	//3.让要素生成图层加入地图
	var source = new ol.source.Vector({
		features: [feature]
	});
	lineLayer = new ol.layer.Vector({
		source: source
	});
	map.addLayer(lineLayer);
}

/******************************楼层转换控件点击事件绑定****************************/
$('#float-left a').on('click', function() {
	var index = $(this).index();
	$(this).addClass('on').siblings().removeClass('on');
	map.setLayerGroup(new ol.layer.Group({
		layers: [
			window["vectorLayer_" + (index + 1) + "_wall"],
			window["vectorLayer_" + (index + 1) + "_road"],
			window["vectorLayer_" + (index + 1) + "_circle"],
			window["vectorLayer_" + (index + 1) + "_parking"],
			window["vectorLayer_" + (index + 1) + "_elevator"],
			window["vectorLayer_" + (index + 1) + "_stairs"]
		]
	}));
});

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
				findPath(pathPos)
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

/****************************扫一扫定位************************************/
/*
 * @des		扫描定位的函数
 * @param	locx,locy	车位坐标
 * 			parkingplace	车位号
 * @return	让定位的位置显示在图上
 */
function scanPos(locx, locy, parkingplace) {
	//记录定位位置
	var loc = [locx, locy];
	//定位到该点
	mapView.animate({
		center: loc
	}, {
		duration: 1
	});
	content.innerHTML = '<p>扫码定位的车位是:' + '<code>' + parkingplace + '</code>' + '号车位</p>';
	overlay.setPosition(loc);
	map.addOverlay(overlay);
	//为弹出框的按钮添加点击事件
	$("#popup-btn-start").click(function() {
		//设为起点
		document.getElementById("sourceVertex").value = parkingplace;
		overlay.setPosition(undefined);
	});
	$("#popup-btn-end").click(function() {
		//设为终点
		document.getElementById("finalVertex").value = parkingplace;
		overlay.setPosition(undefined);
		//将位置存储到本地
		if(typeof(Storage) !== "undefined") {
			//支持 localStorage  sessionStorage 对象!
			localStorage.parkingplace = parkingplace;
			document.getElementById("finalVertex").value = parkingplace;
		} else {
			// 抱歉! 不支持 web 存储。
			$(function() {
				$.mytoast({
					text: "您目前的浏览器版本不支持记忆功能，请手动输入车位号。",
					type: "error"
				});
			});
		}
	});

	//弹出吐司提示用户
	$(function() {
		$.mytoast({
			text: "已为您记录当前位置，点击右上角可查看。",
			type: "success"
		});
	});

}

wx.ready(function() {
	//为扫一扫按钮绑定点击事件
	document.querySelector('#scanhref').onclick = function() {
		wx.scanQRCode({
			needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，  
			scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有  
			success: function(res) {
				resultStr = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				//1.解析二维码
				var parkInfo = JSON.parse(resultStr);
				if(parkInfo) {
					//2.分析扫码结果得出属于哪个停车场
					//3.根据分析结果进入对应停车场并标注对应点
					var parkinglot = parkInfo.parkinglot;
					if(parkinglot == "nanligong") {
						var locx = parkInfo.locx;
						var locy = parkInfo.locy;
						var parkingplace = parkInfo.parkingplace;
						scanPos(locx, locy, parkingplace);
					}
				}
			}
		});
	};
});

/*********************************区段峰值分权定位算法***************************************/
/*
 * @params loc1 距离最近的设备坐标
 * 		   loc2	距离次近的设备坐标
 * 		   minDis 与最近设备间的距离
 * @return 定位的坐标
 * */
function calculateLoc(loc1, loc2, minDis) {
	/*加入模糊控制??????*/
	if (isIOS) {
		if(loc1 && loc2 && minDis) {
			if(minDis <= 1) {
				return loc1;
			} else if(minDis > 1 && minDis < 2) {
				//比例系数
				var lambda = 1 / 2;
				var loc = [(loc1[0] + lambda * loc2[0]) / (1 + lambda), (loc1[1] + lambda * loc2[1]) / (1 + lambda)];
				return loc;
			} else {
				var loc = [(loc1[0] + loc2[0]) / 2, (loc1[1] + loc2[1]) / 2];
				return loc;
			}
		}
	} else{
		if(loc1 && loc2 && minDis) {
			if(minDis <= 0.5) {
				return loc1;
			} else if(minDis > 0.5 && minDis < 4.5) {
				//比例系数
				var lambda = 1 / 2;
				var loc = [(loc1[0] + lambda * loc2[0]) / (1 + lambda), (loc1[1] + lambda * loc2[1]) / (1 + lambda)];
				return loc;
			} else {
				var loc = [(loc1[0] + loc2[0]) / 2, (loc1[1] + loc2[1]) / 2];
				return loc;
			}
		}
	}
}

/*
 * @params beacons 搜索得到的设备集合 
 * @return 返回所在道路两端的设备
 * */
function getLoc(beacons) {
	if(beacons) {
		var minDisBeacon, secDisBeacon;
		//1.将设备数组按距离从小到大排好
		var beaconsArr = beacons.sort(function(a, b) {
			return a.accuracy - b.accuracy;
		});
		//剔除无效数据(返回值为-1说明距离过远)
		for (i=0;i<beaconsArr.length;i++) {
			if (beaconsArr[i] > 0) {
				beaconsArr = beaconsArr.slice(i);
				break;
			}
		}
		//2.预先找出距离最近的两个设备
		minDisBeacon = beaconsArr[0];
		secDisBeacon = beaconsArr[1];
		var minDis = minDisBeacon.accuracy;
		var loc1, loc2, pos;
		var myjsonRoot = "./data/ibeacons.json";
		$.ajax({
			url: myjsonRoot,
			success: function(result) {
				//3.遍历关系文件找出距离最近设备的具体信息
				for(i = 0; i < result.ibeacons.length; i++) {
					if(result.ibeacons[i].minor == minDisBeacon.minor) {
						minDisBeacon = result.ibeacons[i];
						//4.查看与最近设备临近的设备，以判断最近和次近的设备是否相连
						var inArrayFlag1 = false;
						var inArrayFlag2 = false;
						var arrAdjacentBeacons = [];
							//测试这一段的可行性
							for(j = 0; j < minDisBeacon.adjacentbeacons.length; j++) {
								arrAdjacentBeacons.push(minDisBeacon.adjacentbeacons[j]);
							}
							if(arrAdjacentBeacons.indexOf(secDisBeacon.minor) != -1) {
								//5.如若相连则去寻找次近设备的信息
								for(k = 0; k < result.ibeacons.length; k++) {
									if(result.ibeacons[k].minor == secDisBeacon.minor) {
										secDisBeacon = result.ibeacons[k];
									}
								}
								//6.获得两设备在地图上的坐标
								loc1 = minDisBeacon.location;
								loc2 = secDisBeacon.location;
								//7.根据以上信息将最终坐标计算出来
								pos = calculateLoc(loc1, loc2, minDis);
								//alert("1min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							} else {
								//5.1如若不相连,则寻找第三近的设备作为次近设备
								secDisBeacon = beaconsArr[2];
								if(arrAdjacentBeacons.indexOf(secDisBeacon.minor) != -1) {
									//6.1.如若相连则去寻找该设备的信息
									for(k = 0; k < result.ibeacons.length; k++) {
										if(result.ibeacons[k].minor == secDisBeacon.minor) {
											secDisBeacon = result.ibeacons[k];
										}
									}
									//7.1.获得两设备在地图上的坐标
									loc1 = minDisBeacon.location;
									loc2 = secDisBeacon.location;
									//8.1.根据以上信息将最终坐标计算出来
									pos = calculateLoc(loc1, loc2, minDis);
								} else {
									pos = [];
								}
								//alert("2min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							}

						/*if(isIOS) {
							for(j = 0; j < minDisBeacon.adjacentbeacons.length; j++) {
								arrAdjacentBeacons.push(minDisBeacon.adjacentbeacons[j]);
							}
							if($.inArray(secDisBeacon.minor,arrAdjacentBeacons) != -1) {
								//5.如若相连则去寻找次近设备的信息
								for(k = 0; k < result.ibeacons.length; k++) {
									if(result.ibeacons[k].minor == secDisBeacon.minor) {
										secDisBeacon = result.ibeacons[k];
									}
								}
								//6.获得两设备在地图上的坐标
								loc1 = minDisBeacon.location;
								loc2 = secDisBeacon.location;
								//7.根据以上信息将最终坐标计算出来
								pos = calculateLoc(loc1, loc2, minDis);
								//alert("1min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							} else {
								//5.1如若不相连,则寻找第三近的设备作为次近设备
								secDisBeacon = beaconsArr[2];
								if($.inArray(secDisBeacon.minor,arrAdjacentBeacons) != -1) {
									//6.1.如若相连则去寻找该设备的信息
									for(k = 0; k < result.ibeacons.length; k++) {
										if(result.ibeacons[k].minor == secDisBeacon.minor) {
											secDisBeacon = result.ibeacons[k];
										}
									}
									//7.1.获得两设备在地图上的坐标
									loc1 = minDisBeacon.location;
									loc2 = secDisBeacon.location;
									//8.1.根据以上信息将最终坐标计算出来
									pos = calculateLoc(loc1, loc2, minDis);
								} else {
									pos = [];
								}
								//alert("2min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							}
						} else {
							for(j = 0; j < minDisBeacon.adjacentbeacons.length; j++) {
								arrAdjacentBeacons.push(minDisBeacon.adjacentbeacons[j]);
								if(minDisBeacon.adjacentbeacons[j] == secDisBeacon.minor) {
									inArrayFlag1 = true;
								}
							}
							if(inArrayFlag1) {
								//5.如若相连则去寻找次近设备的信息
								for(k = 0; k < result.ibeacons.length; k++) {
									if(result.ibeacons[k].minor == secDisBeacon.minor) {
										secDisBeacon = result.ibeacons[k];
									}
								}
								//6.获得两设备在地图上的坐标
								loc1 = minDisBeacon.location;
								loc2 = secDisBeacon.location;
								//7.根据以上信息将最终坐标计算出来
								pos = calculateLoc(loc1, loc2, minDis);
								//alert("1min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							} else {
								//5.1如若不相连,则寻找第三近的设备作为次近设备
								secDisBeacon = beaconsArr[2];
								if(inArrayFlag2) {
									//6.1.如若相连则去寻找该设备的信息
									for(k = 0; k < result.ibeacons.length; k++) {
										if(result.ibeacons[k].minor == secDisBeacon.minor) {
											secDisBeacon = result.ibeacons[k];
										}
									}
									//7.1.获得两设备在地图上的坐标
									loc1 = minDisBeacon.location;
									loc2 = secDisBeacon.location;
									//8.1.根据以上信息将最终坐标计算出来
									pos = calculateLoc(loc1, loc2, minDis);
								} else {
									pos = [];
								}
								//alert("2min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
							}
						}*/
					}
				}
			},
			dataType: 'json',
			//设置ajax为同步执行
			async: false
		});
		//alert("min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
		return pos;
	}
}

/****************************摇一摇定位************************************/
if(params) {
	if(isTicket == "ticket" && ticket) {
		//1.摇一摇关注公众号
		BeaconAddContactJsBridge.ready(function() {
			//判断是否关注
			BeaconAddContactJsBridge.invoke('checkAddContactStatus', {}, function(apiResult) {
				if(apiResult.err_code == 0) {
					var status = apiResult.data;
					if(status == 1) {} else {
						//跳转到关注页
						BeaconAddContactJsBridge.invoke('jumpAddContact');
					}
				} else {
					alert("出错了："+apiResult.err_msg);
				}
			});
		});
		//2.调用jssdk搜索ibeacon
		//将文本框中内容改为当前位置
		document.getElementById("sourceVertex").value = "您当前的位置";
		wx.ready(function() {
			//开始搜索beacon设备
			wx.startSearchBeacons({
				ticket: ticket,
				complete: function(argv) {
					//回调函数
					if(argv.errMsg == "startSearchBeacons:ok") {
						wx.onSearchBeacons({
							complete: function(argv) {
								var beacons = argv.beacons;
								var tempPos = getLoc(beacons);
								if(tempPos.toString() != "") {
									imgPos = tempPos;
									//获得离定位点最近的车位信息(以最近节点显示)
									closestParkingPlace = vectorCircleSource.getClosestFeatureToCoordinate(imgPos);
								}
								if(document.getElementById("finalVertex").value != "请输入终点车位号" && navigateSwitcher == true) {
									myWay(imgPos);
								}
								if(imgPos.toString() != "") {
									startMarkerOverlay.setPosition(imgPos);
									map.addOverlay(startMarkerOverlay);
								}
							}
						});
					}
				}
			});
		});
	}
}

//测试用例
/*var beacons1 = {
   "beacons":[
           	{
           	"major":10008,
           	"minor":13027,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"0.5",
           	"rssi":"-66",
           	"proximity":"1",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13028,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"5",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13029,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"5",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13030,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"1.8",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	},
           	{
           	"major":10008,
           	"minor":13031,
           	"uuid":"FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
           	"accuracy":"3.7",
           	"rssi":"-49",
           	"proximity":"2",
           	"heading":"288.1355"
           	}
           	]
};
//getLocation(beacons1.beacons);

vectorCircleSource.once('change', function(evt){
	var source=evt.target;
	if(source.getState() === 'ready'){
		var tempPos = getLoc(beacons1.beacons);
		//alert(tempPos);
		if(tempPos.toString() != "") {
			imgPos = tempPos;
			//获得离定位点最近的车位信息并记录在文本框中
			closestParkingPlace = vectorCircleSource.getClosestFeatureToCoordinate(imgPos);
		}
		//点击导航后
		if(document.getElementById("finalVertex").value != "请输入终点车位号" && navigateSwitcher == true) {
			myWay(imgPos);
		}
		if(imgPos.toString() != "") {
			startMarkerOverlay.setPosition(imgPos);
			map.addOverlay(startMarkerOverlay);
		}	    	    
	}
});*/