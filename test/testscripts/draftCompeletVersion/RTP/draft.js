function Dictionary() {
    this.data = new Array();

    this.put = function (key, value) {
        if(jQuery) {
            if(value instanceof Array){
                this.data[key] = new Array();
                $.extend(true , this.data[key] , value);
            }
        }else if(!value.length){
            this.data[key] = value;
        }else
            console.log("NO jQuery,put operation fail.")
    };

    this.getvalue = function (key) {
        return this.data[key];
    };

    this.getkey = function (i) {
        var keys = [];
        for (var key in this.data) {
            keys.push(key);
        }
        return keys[i];
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
    };

    this.isEmpty = function () {
        return this.data.length == 0;
    };

    this.length = function () {
        var i = 0;
        for (a in this.data)
            i++;
        return i;
    };
}
var c = [];
c['1F'] = '22';
// var b = [[1,1],[2,2]];
//
// $.extend(true,c,b[0]);
console.log(c instanceof Array);
var a  = new Dictionary();
a.put('1F',[[1,1],[2,2]]);
var b = {
    POST: "abc",
    map_name: "CenterMall",
    floor: {
        '1F': {
            circle: "data/1-circle.geojson",
            elevator: "data/1-elevator.geojson",
            parkingplace: "data/1-parkingplace.geojson",
            road: "data/1-road.geojson",
            stairs: "data/1-stairs.geojson",
            wall : "data/1-wall.geojson"
        },
        '2F': {
            circle: "data/2-circle.geojson",
            elevator: "data/2-elevator.geojson",
            parkingplace: "data/2-parkingplace.geojson",
            road: "data/2-road.geojson",
            stairs: "data/2-stairs.geojson",
            wall : "data/2-wall.geojson"
        }
    },
    json: {
        'ibeacons': "data/ibeacons.json"
    }
};
var mapRenderInfo  = new Dictionary();
$.extend(true,mapRenderInfo.data,b);
console.log(JSON.stringify(a));

console.log(1);