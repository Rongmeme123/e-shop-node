const path = require('path');
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const router = require('koa-router')();
const kstatic = require('koa-static');
const session = require('koa-session');
// const convert = require('koa-convert');
const CSRF = require('koa-csrf');

const webRoutes = require('./routes');
const middlewares = require('./middlewares');

// set the session keys 加密字符串
app.keys = [ 'e-shop secret keys' ];

// trust proxy header fields
app.proxy = true;

// add session support
app.use(session(app));

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

// add the CSRF middleware
app.use(new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidSessionSecretStatusCode: 403,
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
    excludedMethods: [ 'GET', 'HEAD', 'OPTIONS' ],
    disableQuery: false
}));

// apply custom middleware
app.use(middlewares);

// apply router
app.use(router.routes());

// router.use('', webRoutes.routes(), webRoutes.allowedMethods());
router.use(webRoutes.routes())

module.exports = app;
