/*********************************区段峰值分权定位算法***************************************/
/*
 * @params loc1 距离最近的设备坐标
 * 		   loc2	距离次近的设备坐标
 * 		   minDis 与最近设备间的距离
 * @return 定位的坐标
 * */
function calculateLoc(loc1, loc2, minDis) {
    /*加入模糊控制??????*/
/*    if (isIOS) {*/
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
 /*   } else{
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
    }*/
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
        // $.ajax({
        //     url: myjsonRoot,
        //     success: function(result) {
        result = {
            "ibeacons":[
                {
                    "minor":13027,
                    "location":[338,-553],
                    "adjacentbeacons":[
                        13029,13030,13031
                    ]
                },
                {
                    "minor":13028,
                    "location":[125,-553],
                    "adjacentbeacons":[
                        13029
                    ]
                },
                {
                    "minor":13029,
                    "location":[230,-553],
                    "adjacentbeacons":[
                        13027,13028
                    ]
                },
                {
                    "minor":13030,
                    "location":[336,-440],
                    "adjacentbeacons":[
                        13027
                    ]
                },
                {
                    "minor":13031,
                    "location":[338,-664],
                    "adjacentbeacons":[
                        13027
                    ]
                }
            ]
        };
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
/*            },
            dataType: 'json',
            //设置ajax为同步执行
            async: false
        });*/
        //alert("min:"+minDisBeacon.minor + "sec:"+secDisBeacon.minor + "  "+ beaconsArr[0].accuracy + "  "+ beaconsArr[1].accuracy);
        return pos;
    }
}
