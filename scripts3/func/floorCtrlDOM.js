
/*********************功能层****************************/
/*
* @brief 根据输入的数据动态生成楼层控件
*
* @parm startF 起始楼层（num）
* @parm endF 终点楼层（num）（此二者输入大小关系随意）
* @parm currF 指定初始化显示哪一层（不填默认为楼层较高的一个）
*
* 注：引用的html文件中需添加id为float-left的div元素
* */
function floorCtrl(startF,endF,currF) {
    //sF始终为较高层，eF始终为较低层
    var sF = startF>endF ? startF : endF;
    var eF = startF>endF ? endF : startF;
    //如果当前楼层的初始化值不在
    if( currF < eF || currF > sF ){
        alert("floorCtrl函数参数设置错误");
    }
    //检测是否加载了jquery库
    if(typeof jQuery =='undefined'){
        alert("jQuery library is not found");
    }
    //设置currF默认值为1
    if(arguments.length == 2){
        var currF = sF;
    }
    var fcDiv = $('#float-left');
    for (var i = sF; i >= eF; i--) {
        if( i == 0 ) continue;
        fcDiv.append("<a href=\"javascript:;\">" + i + "F" + "</a>");
    }
    $('#float-left a').each(function (index,dom) {
        if($(dom).text() == (currF+"F")){
            $(dom).addClass("on");
        }
    });
}



