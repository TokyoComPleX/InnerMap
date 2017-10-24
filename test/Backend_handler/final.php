<?php
require_once 'func.php';
// require_once "D:\programFile\wamp64\bin\php\php5.6.25\pear\PEAR.php";
// require_once "D:\programFile\wamp64\bin\php\php5.6.25\pear\Archive\Tar.php";
 


//发送GET请求（后期改为post）
if($_POST){
    $data = $_POST;
    $mapinfo['POST'] = $data['palce'];
}

$url = 'http://182.254.130.58:5000/maps/1';//这里是后台请求的url
$res = http($url);
$res = json_decode($res,true);
$res = $res['map'];
if (!$res) {
	echo '无法连接服务器';
}

//解析json
$mapinfo['map_name'] = $res['map_name'];
$map_url = $res['resource_path'];

//下载文件
if (!file_exists('1.tar.gz')) {//如果地图包不存在,则下载.
  httpcopy($map_url);
  echo '本地没有地图,正在尝试下载0';
}else{
  echo '本地已经存在地图文件,无需下载1';
}



if (!file_exists('1.tar.gz')) {//如果地图包不存在
  exit( "地图包没有下载!2");
}

//文件解压
if (filesize('1.tar.gz')) {
  $phar = new PharData('1.tar.gz');
  //路径 要解压的文件 是否覆盖
  $phar->extractTo('.././', null, true);
}else{
  unlink('1.tar.gz');
  exit('地图包下载失败!');
}


//获取文件信息
//指定文件目录
$dir = '../data/';
$jsdir = './data/';
if (is_dir($dir)) {
  if ($dh = opendir($dir)) {
    //遍历子文件/文件夹
    while (($file = readdir($dh)) !== false) {
      //跳过所有文件夹
      if(filetype($dir . $file) == 'dir')
        continue;
      //如果是地图图层
      if (get_extension($file) == 'geojson') {
        //判断楼层和地图图层名称
        $filename = explode("-",basename($file,'.geojson'));
                $mapinfo['floor'][$filename[0]."F"][$filename[1]] = $jsdir . $file;
      }
      if (get_extension($file) == 'json') {
        $filename = basename($file,'.json');
        $mapinfo['json'][$filename] = $dir . $file;
      }
    } closedir($dh);
  }
}
$mapinfo = json_encode($mapinfo);
printf("%s",$mapinfo);


?>