var dev = 'http://192.168.1.41:8085/qdwz';
var test = 'https://test-api.lxcyhd.com/qdwz';
var production = 'https://api.lxcyhd.com/qdwz';

var ip = production;

var api = {

	findEncodeFunction: ip + '/consumerActivity/findEncodeFunction', 			// 防伪溯源展示接口
	validate: ip + '/consumerActivity/validate', 						// 防伪溯源展示接口
};