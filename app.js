const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const render = require('./middleware/koa-render');
const Handler = require('./middleware/koa-handler');
const loadingVueStatic = require('./middleware/loading-vue-static');

const home = require('./routes/home');

const app = new Koa();

// 处理错误
app.use(Handler());

// 处理模板
app.use(render('views', {
	root: __dirname,
	extension: '.html',
	cache: false,
	debug: false
}));

// 处理静态资源
app.use(static(__dirname + '/public'));

// 处理vue项目静态资源
// app.use(loadingVueStatic('static', {
// 	root: __dirname
// }));

// 处理日志
app.use(logger());

// 处理表单
app.use(bodyParser({
	multipart: true
}));

app.use(home.routes());

app.listen(3001, () => {
	console.log('listening on 3001');
});