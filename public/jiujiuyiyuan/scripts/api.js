var dev = 'http://192.168.1.57:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = test;

var api = {
	validate: ip + '/consumerActivity/jjyy/validate',								//防伪次数接口
	findEncodeFunction: ip + '/consumerActivity/jjyy/encodeFunction', 			// 防伪溯源展示接口

};