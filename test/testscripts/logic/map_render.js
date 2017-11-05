//初始化对应楼层图层
var currFloorData = layer_init();
//初始化地图容器并渲染
map = mapcontainer_init(layers);
//初始化起始楼层和终点楼层
stFloor = currFloorData.index;
edFloor = stFloor;