/***********************全局变量层*************************/
// function Dictionary() {
//     this.data = new Array();
//     this.keys = new Array();
//
//     this.put = function (key, value) {
//         if(jQuery) {
//             if(value instanceof Array){
//                 this.data[key] = new Array();
//                 $.extend(true , this.data[key] , value);
//             }else {
//                 this.data[key] = value;
//             }
//         }else if(!value.length){
//             this.data[key] = value;
//         }else
//             console.log("NO jQuery,put operation fail.");
//         this.keys.push(key);
//     };
//
//     this.getvalue = function (key) {
//         if (this.keys.indexOf(key) != -1){//如果存在这个键值
//             return this.data[key];
//         }else{
//             return null;
//         }
//     };
//
//     this.getkey = function (i) {
//         return this.keys[i];
//     };
//
//     this.getfloor = function () {
//         if(this.data.floor){
//             var floors = [];
//             for(var F in this.data.floor){
//                 floors.push(F);
//             }
//         }
//         return floors;
//     };
//
//     this.remove = function (key) {
//         this.data[key] = null;
//         var index = this.keys.indexOf(key);
//         this.keys.splice(index,index+1);
//     };
//
//     this.isEmpty = function () {
//         return this.data.length == 0;
//     };
//
//     this.length = function () {
//         return this.keys.length;
//     };
// }
// var b = {
//     POST: "abc",
//     map_name: "CenterMall",
//     floor: {
//         '1F': {
//             circle: "../data/1-circle.geojson",
//             elevator: "../data/1-elevator.geojson",
//             parkingplace: "../data/1-parkingplace.geojson",
//             road: "../data/1-road.geojson",
//             stairs: "../data/1-stairs.geojson",
//             wall : "../data/1-wall.geojson"
//         },
//         '2F': {
//             circle: "../data/2-circle.geojson",
//             elevator: "../data/2-elevator.geojson",
//             parkingplace: "../data/2-parkingplace.geojson",
//             road: "../data/2-road.geojson",
//             stairs: "../data/2-stairs.geojson",
//             wall : "../data/2-wall.geojson"
//         }
//     },
//     json: {
//         'ibeacons': "../data/ibeacons.json"
//     }
// };
// var mapRenderInfo  = new Dictionary();
// for(var i in b){
//     mapRenderInfo.put(i,b[i]);
// }

/**********************逻辑层******************************/
//获取楼层索引数组
var floor = mapRenderInfo.getfloor();

// 获取起始楼层与终点楼层
var sF = floor[0];
sF = parseInt(sF.substring(0,sF.length-1));
// console.log(sF);
var eF = floor[floor.length-1];
eF = parseInt(eF.substring(0,eF.length-1)) ;
// console.log(eF);

//动态生成楼层控件
floorCtrl(sF,eF);