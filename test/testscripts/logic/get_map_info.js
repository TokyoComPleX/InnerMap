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
var mapInfo = getMapInfo('./Backend_handler/final.php',{palce:"abc"});
mapInfo = JSON.parse(mapInfo);
// $("<pre/>").append(mapInfo).appendTo('body');

var mapRenderInfo = new Dictionary();
for(var i in mapInfo){
    mapRenderInfo.put(i,mapInfo[i]);
}
// console.log(mapRenderInfo);
