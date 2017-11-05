/*发送GET请求后，将收到消息为b*/
function Dictionary() {
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

/*    //将this.data新建成Dictionary类,原有数据保持不变
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
    }*/
}