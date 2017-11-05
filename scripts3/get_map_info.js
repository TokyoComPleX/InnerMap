/*
*函数返回结果如下所示
* array (size=4)
  'POST' => string 'abc' (length=3)
  'map_name' => string 'CenterMall' (length=10)
  'floor' =>
    array (size=2)
      '1F' =>
        array (size=6)
          'circle' => string '../data/1-circle.geojson' (length=24)
          'elevator' => string '../data/1-elevator.geojson' (length=26)
          'parkingplace' => string '../data/1-parkingplace.geojson' (length=30)
          'road' => string '../data/1-road.geojson' (length=22)
          'stairs' => string '../data/1-stairs.geojson' (length=24)
          'wall' => string '../data/1-wall.geojson' (length=22)
      '2F' =>
        array (size=6)
          'circle' => string '../data/2-circle.geojson' (length=24)
          'elevator' => string '../data/2-elevator.geojson' (length=26)
          'parkingplace' => string '../data/2-parkingplace.geojson' (length=30)
          'road' => string '../data/2-road.geojson' (length=22)
          'stairs' => string '../data/2-stairs.geojson' (length=24)
          'wall' => string '../data/2-wall.geojson' (length=22)
  'json' =>
    array (size=1)
      'ibeacons' => string '../data/ibeacons.json' (length=21)
* */
var mapInfo = getMapInfo('Backend_handler/final.php',{palce:"abc"});
mapInfo = JSON.parse(mapInfo);
// $("<pre/>").append(mapInfo).appendTo('body');
function Dictionary(depth) {
    this.keys = new Array();
    this.data = new Array();

    this.put = function (key, value) {
        if(jQuery) {
            if(value instanceof Array){
                this.data[key] = new Array();
                $.extend(true , this.data[key] , value);
            }else {
                this.data[key] = value;
            }
        }else if(!value.length){
            this.data[key] = value;
        }else
            console.log("NO jQuery,put operation fail.");
        this.keys.push(key);
    };

    this.getvalue = function (key) {
        if (this.keys.indexOf(key) != -1){//如果存在这个键值
            return this.data[key];
        }else{
            return null;
        }
    };

    this.getkey = function (i) {
        return this.keys[i];
    };

    this.getfloor = function () {
        if(this.data.floor){
            var floors = [];
            for(var F in this.data.floor){
                floors.push(F);
            }
        }
        return floors;
    };

    this.remove = function (key) {
        this.data[key] = null;
        var index = this.keys.indexOf(key);
        this.keys.splice(index,index+1);
    };

    this.isEmpty = function () {
        return this.data.length == 0;
    };

    this.length = function () {
        return this.keys.length;
    };

    //将this.data新建成Dictionary类,原有数据保持不变
    this.deepen = function (depth) {
        var temp = this.data;
        if (depth){
            this.data = new Dictionary();
            this.data.deepen(depth-1);
        }
        var that = this;
        for (var key in temp){
            that.put(key,temp[key]);
        }
        return depth;
    }
}var mapRenderInfo = new Dictionary();
for(var i in mapInfo){
    mapRenderInfo.put(i,mapInfo[i]);
}
console.log(mapRenderInfo);

