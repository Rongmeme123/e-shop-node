const router = require('koa-router')();
const business = require('./business');
const admin = require('./admin');
const user = require('./user');
const order = require('./order');

// business
router.get('/', business.index);

router.get('/product', business.product);

// admin manage

router.get('/admin', admin.index);
router.get('/admin/category', admin.category);
router.get('/admin/product', admin.product);
router.get('/admin/orders', admin.orders);

// user

router.get('/signin', user.signin);
router.get('/signup', user.signup);
router.get('/user', user.info);
router.get('/user/changePwd', user.changePwd);
router.get('/user/orders', user.orders);

router.get('/paySuccess', order.paySuccess);
router.get('/payFail', order.payFail);

// other pages => 404

router.get('/favicon.ico', async (ctx, next) => {
    await(next);
});

router.get('*', async (ctx, next) => {
    let url = ctx.request.url;
    // console.log(`request other ------- ${url}`);
    if (!/\.je*pg|\.png|\.js|\.css|\.map/.test(url)) {
        ctx.redirect('/')
    }
});

module.exports = router;