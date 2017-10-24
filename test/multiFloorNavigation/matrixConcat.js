//矩阵转置函数
function transposition(arr) {
    var res = [];
    var row = arr[0].length;
    for (var k = 0 ; k < row ; k++){
        res[k] = [];
    }
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            res[j][i] = arr[i][j];
        }
    }
    return res;
}
//矩阵拼接函数
//flag为1则纵向拼接，否则横向拼接,arr1在前，arr2在后（下）
function matrixConcat(arr1,arr2,flag) {
    var res = [];
    if (flag){
        for (var i = 0; i < arr1.length ; i++){
            res.push(arr1[i].concat(arr2[i]));
        }
    }else{
        for (var i = 0; i < arr2.length ; i++){
            arr1.push(arr2[i]);
        }
        res = arr1;
    }
    return res;
}
//邻接矩阵拼接
function djmatrixConcat(d1,d2,e) {
    var e2 = transposition(e);
    var temp1 = matrixConcat(d1,e2);
    var temp2 = matrixConcat(e,d2);
    var res = matrixConcat(temp1,temp2,1);
    return res;
}

//测试实例
var a = [[1,2,3],[1,2,3],[1,2,3]];
var b = [[4,5],[4,5]];
var c  = [[6,6],[6,6],[6,6]];
var q = djmatrixConcat(a,b,c);
f1 = [4,5,6];
f2 = [6,7];
//找出相同的Rid功能

var e = [[],[],[]];
for (var i = 0; i < f2.length ; i++){
    var j = f2[i];
    e[f1.indexOf(6)][f2.indexOf(j)] = b[f2.indexOf(6)][f2.indexOf(j)];
}

console.log(e,a,b);





