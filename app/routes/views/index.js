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
        ctx.redirect(`/?catid=${currentCategory.catid}`)
    }
    
    const products = await productService.queryProductsByCatid(currentCategory.catid);

    await ctx.render('business/category', {
        title: 'category page',
        page: 'category',
        css: '/css/business/category',
        js: '/js/business/category',
        categories,
        products,
        currentCategory,
    });
});

router.get('/product/:pid', async (ctx, next) => {
    const categories = await categoryService.queryAll();
    let product = await productService.queryOneByPid(ctx.params.pid);
    product = product[0]
    const currentCategory = categories.filter((item) => item.catid === product.catid)[0];

    await ctx.render('business/product', {
        title: 'product page',
        page: 'product',
        css: '/css/business/product',
        js: '/js/business/product',
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
        css: '/css/admin/index',
        js: '/js/admin/index',
    });
});

router.get('/admin/category', async (ctx, next) => {
    const categories = await categoryService.queryAll();

    await ctx.render('admin/category', {
        title: 'admin category page',
        page: 'category',
        css: '/css/admin/category',
        js: '/js/admin/category',
        categories,
    });
});

router.get('/admin/product', async (ctx, next) => {
    const products = await productService.queryAll();
    const categories = await categoryService.queryAll();

    await ctx.render('admin/product', {
        title: 'admin product page',
        page: 'product',
        css: '/css/admin/product',
        js: '/js/admin/product',
        products,
        categories,
    });
});

module.exports = router;