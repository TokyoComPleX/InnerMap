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