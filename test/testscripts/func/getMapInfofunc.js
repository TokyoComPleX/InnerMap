/*
* @brief 请求代理服务器获取地图图层以及蓝牙设备信息
*
* @param url 代理服务器地址
* @param data 要POST的数据
*
* @return json对象 包含地点，各层地图信息，蓝牙设备信息
*
* 会新建data文件夹，
* */

function getMapInfo(url,data) {
    var a = 0;
    $.ajax({
        url:url,
        type:"POST",
        async:false,
        data:data,
        success:function (data) {
            a = data;
        },
        error:function (msg) {
            alert(msg.tostring());
        }
    });
    return a;
}






