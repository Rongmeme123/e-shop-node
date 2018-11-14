const router = require('koa-router')();
const business = require('./business');
const admin = require('./admin');
const user = require('./user');

// business
router.get('/', business.index);

router.get('/product', business.product);

// admin manage

router.get('/admin', admin.index);
router.get('/admin/category', admin.category);
router.get('/admin/product', admin.product);

// user

router.get('/signin', user.signin);
router.get('/signup', user.signup);
router.get('/user', user.info);
router.get('/user/changePwd', user.changePwd);

// other pages => 404

router.get('/favicon.ico', async (ctx, next) => {
    await(next);
});

router.get('*', async (ctx, next) => {
    let url = ctx.request.url;
    if (!/\.je*pg|\.png|\.js|\.css|\.map/.test(url)) {
        await ctx.redirect('/')
    }
});

module.exports = router;