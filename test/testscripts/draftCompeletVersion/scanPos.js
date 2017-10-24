//获取信息并解析
// var res = '{"result": {"location": [11.256330002, -256.33259878], "parkingplace": 15, "floor": "1F"}}';
/*
* @brief 扫一扫定位，在用户端显示当前所在车位
* @param res 扫码获得的json字符串
*
* */
function scanPos(res){
    var posInfo = JSON.parse(res).result;
    console.log(posInfo);
    var loc = posInfo.location;
    var parkingplace = posInfo.parkingplace;
    var floor = posInfo.floor;

//楼层跳转
    $('#float-left').children(".on").removeClass('on').
    end().children().map(function(){
        if($(this).html()==floor){
            $(this).addClass('on');
        }
    });
//渲染地图
    layer_init();
    map.setLayerGroup(new ol.layer.Group({
        layers: layers[floor]
    }));
//画出该层路径，如果没有就不画
    drawPath(lineLayers);

//移动视角
    var view = map.getView();
    view.animate({
        center: loc
    }, {
        duration: 1
    });
//设置并弹出对话框
    content.innerHTML = '<p>扫码定位的车位是:' + '<code>' + parkingplace + '</code>' + '号车位</p>';
    overlay.setPosition(loc);
    map.addOverlay(overlay);
//为弹出框的按钮添加点击事件
    $("#popup-btn-start").click(function() {
        //设为起点
        document.getElementById("sourceVertex").value = parkingplace;
        stFloor = floor;
        overlay.setPosition(undefined);
    });
    $("#popup-btn-end").click(function() {
        //设为终点
        document.getElementById("finalVertex").value = parkingplace;
        edFloor = floor;
        overlay.setPosition(undefined);
        //将位置存储到本地
        if(typeof(Storage) !== "undefined") {
            //支持 localStorage  sessionStorage 对象!
            localStorage.parkingplace = parkingplace;
            document.getElementById("finalVertex").value = parkingplace;
        } else {
            // 抱歉! 不支持 web 存储。
            $(function() {
                $.mytoast({
                    text: "您目前的浏览器版本不支持记忆功能，请手动输入车位号。",
                    type: "error"
                });
            });
        }
    });


}

wx.ready(function() {
    //为扫一扫按钮绑定点击事件
    document.querySelector('#scanhref').onclick = function() {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function(res) {
                        scanPos(res);
            }
        });
    };
});




