<?php
/**
 * @brief 调用接口函数
 *
 * @param  string       $url     [接口地址]
 * @param  array        $params  [数组]
 * @param  string       $method  [GET\POST\DELETE\PUT]
 * @param  array        $header  [HTTP头信息]
 * @param  integer      $timeout [超时时间]
 * @return [type]                [接口返回数据]
 */
function http($url, $params=[], $method = 'GET', $header = array(), $timeout = 5)
{
    // POST 提交方式的传入 $set_params 必须是字符串形式
    $opts = array(
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_HTTPHEADER => $header
    );

    /* 根据请求类型设置特定参数 */
    switch (strtoupper($method)) {
        case 'GET':
            $opts[CURLOPT_URL] = $url . '?' . http_build_query($params);
            break;
        case 'POST':
            $params = http_build_query($params);
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_POST] = 1;
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        case 'DELETE':
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_HTTPHEADER] = array("X-HTTP-Method-Override: DELETE");
            $opts[CURLOPT_CUSTOMREQUEST] = 'DELETE';
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        case 'PUT':
            $opts[CURLOPT_URL] = $url;
            $opts[CURLOPT_POST] = 0;
            $opts[CURLOPT_CUSTOMREQUEST] = 'PUT';
            $opts[CURLOPT_POSTFIELDS] = $params;
            break;
        default:
            throw new Exception('不支持的请求方式！');
    }
  
    /* 初始化并执行curl请求 */
    $ch = curl_init();
    curl_setopt_array($ch, $opts);
    $data = curl_exec($ch);
    $error = curl_error($ch);
    return $data;
}


/**
*@brief 下载url指向的文件到特定目录
*
*@param string $url 要下载的文件的url
*@param string	$file 指定文件名，默认为$url所指定的文件名
*@param integer	$timeout 请求持续的最大时间（秒）
*
*@return 成功返回文件名，失败返回false
*/
function httpcopy($url, $file="", $timeout=60) {
  $file = empty($file) ? pathinfo($url,PATHINFO_BASENAME) : $file;
  $dir = pathinfo($file,PATHINFO_DIRNAME);
  !is_dir($dir) && @mkdir($dir,0755,true);
  $url = str_replace(" ","%20",$url);//将空格转换成编码形式,否则无法加载url
  
  if(function_exists('curl_init')) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_TIMEOUT, $timeout);//设置curl运行最长秒数
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);//以数据流形式保存到变量中
    $temp = curl_exec($ch);
    if(@file_put_contents($file, $temp) && !curl_error($ch)) {
      return $file;
    } else {
      return false;
    }
  } else {//如果不支持curl，则使用以下方法
    $opts = array(
      "http"=>array(
      "method"=>"GET",
      "header"=>"",
      "timeout"=>$timeout)
    );
    $context = stream_context_create($opts);
    if(@copy($url, $file, $context)) {
      //$http_response_header
      return $file;
    } else {
      return false;
    }
  }
}

//获取文件扩展名
function get_extension($file)
{
return pathinfo($file, PATHINFO_EXTENSION);
}

//求$b相对于$a的相对路径
function getRelativelyPath($a,$b){ 
	$a=explode('/',$a);
	$b=explode('/',$b);
	var_dump($a);
	//print_r($b);
	$c=array_values(array_diff($a,$b));
	$d=array_values(array_diff($b,$a));
	// var_dump($c);
	//var_dump($d);
	array_pop($c);
	foreach($c as &$v){
	$v='..';
	}
	var_dump($c);
	var_dump($d);
	$arr=array_merge($c,$d);
	var_dump($arr);
	$str=implode("/",$arr);
	echo $str;
}



?>