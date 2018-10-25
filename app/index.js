const path = require('path');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const router = require('koa-router')();
const kstatic = require('koa-static');

const webRoutes = require('./routes');


// apply body parser
app.use(bodyParser({
    "formLimit": "10mb",
}));

// apply ejs view template
app.use(views(path.join(__dirname, 'views'), {
    extension: 'ejs'
}));

// apply static
app.use(kstatic(path.resolve(__dirname, '../public')));

// apply router
app.use(router.routes());

router.use('', webRoutes.routes(), webRoutes.allowedMethods());

module.exports = app;
