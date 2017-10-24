/*发送GET请求后，将收到消息为b*/
function Dictionary() {

    this.data = new Array();

    this.put = function (key, value) {
        if (value instanceof Array) {//高维数组拷贝
            if(jQuery) {
                this.data[key] = new Array();
                $.extend(true, this.data[key], value);
            }else
                console.log("NO jQuery,put operation fail.")
        }else
            this.data[key] = value;

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