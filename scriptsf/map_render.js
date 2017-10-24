//第一层坐标圆图层
var vectorLayer_1_circle = maprender_circle('data/1-circle.geojson');
var vectorLayer_1_elevator = maprender_elevator('data/1-elevator.geojson');
var spare = {
    2:0
};
var vectorLayer_1_parking = maprender_spare('data/1-parkingplace.geojson',spare);
var vectorLayer_1_road = maprender_road('data/1-road.geojson');
var vectorLayer_1_stairs = maprender_stairs('data/1-stairs.geojson');
var vectorLayer_1_wall = maprender_wall('data/1-wall.geojson');
var vectorLayer_2_circle = maprender_circle('data/2-circle.geojson');
var vectorLayer_2_elevator = maprender_elevator('data/2-elevator.geojson');
var vectorLayer_2_parking = maprender_spare('data/2-parkingplace.geojson',spare);
var vectorLayer_2_road = maprender_road('data/2-road.geojson');
var vectorLayer_2_stairs = maprender_stairs('data/2-stairs.geojson');
var vectorLayer_2_wall = maprender_wall('data/2-wall.geojson');

var map = mapcontainer_init(vectorLayer_1_wall,vectorLayer_1_road,vectorLayer_1_circle,vectorLayer_1_parking,vectorLayer_1_elevator,vectorLayer_1_stairs);




