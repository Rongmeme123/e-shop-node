const router = require('koa-router')();
const categoryService = require('../../service').category;
const productService = require('../../service').product;

// business
router.get('/', async (ctx, next) => {
    const catid = parseInt(ctx.query.catid);
    const categories = await categoryService.queryAll();
    let currentCategory = categories.filter((item) => item.catid === catid)[0];

    // if no catid. choose the first category
    if(!currentCategory) currentCategory = categories[0];
    // redirect to the first category
    if (!catid) {
        await ctx.redirect(`/?catid=${currentCategory.catid}`)
        return;
    }
    
    const products = await productService.queryProductsByCatid(currentCategory.catid);

    await ctx.render('business/category', {
        title: 'category page',
        page: 'category',
        css: '/statics/css/businessCategory',
        js: '/statics/js/businessCategory',
        categories,
        products,
        currentCategory,
    });
});

router.get('/product', async (ctx, next) => {
    const pid = parseInt(ctx.query.pid);
    if (!pid) {
        await ctx.redirect('/');
        return;
    }

    const categories = await categoryService.queryAll();
    let product = await productService.queryOneByPid(pid);
    product = product[0]
    
    let currentCategory = {};
    if (!product) {
        currentCategory = categories.filter((item) => item.catid === product.catid)[0];
    } else {
        currentCategory = {
            pid: 0,
            catid: 0,
            name: '',
            price: 0,
            description: '',
            pic_big: 0,
            pic_small: 0
        }
    }

    await ctx.render('business/product', {
        title: 'product page',
        page: 'product',
        css: '/statics/css/businessProduct',
        js: '/statics/js/businessProduct',
        categories,
        product,
        currentCategory,
    });
});

// admin manage

router.get('/admin', async (ctx, next) => {
    await ctx.render('admin', {
        title: 'admin page',
        page: 'admin',
        css: '/statics/css/admin',
        js: '/statics/js/admin',
    });
});

router.get('/admin/category', async (ctx, next) => {
    const categories = await categoryService.queryAll();

    await ctx.render('admin/category', {
        title: 'admin category page',
        page: 'category',
        css: '/statics/css/adminCategory',
        js: '/statics/js/adminCategory',
        categories,
    });
});

router.get('/admin/product', async (ctx, next) => {
    const products = await productService.queryAll();
    const categories = await categoryService.queryAll();

    await ctx.render('admin/product', {
        title: 'admin product page',
        page: 'product',
        css: '/statics/css/adminProduct',
        js: '/statics/js/adminProduct',
        products,
        categories,
    });
});

module.exports = router;