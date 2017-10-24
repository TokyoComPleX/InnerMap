//键值对数组构造函数
function Dictionary() {

    this.data = new Array();

    this.put = function (key, value) {
        if(jQuery) {
            if(value.length)
                this.data[key] = new Array();
            $.extend(true , this.data[key] , value);
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
