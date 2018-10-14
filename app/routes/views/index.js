const router = require('koa-router')();
const categoryService = require('../../service').category;
const productService = require('../../service').product;

router.get('/:catid?', async (ctx, next) => {
    const catid = parseInt(ctx.params.catid);
    const categories = await categoryService.queryAll();
    let currentCategory = categories.filter((item) => item.catid === catid)[0];

    if(!currentCategory) currentCategory = categories[0];
    
    const products = await productService.queryProductsByCatid(currentCategory.catid);

    await ctx.render('category', {
        title: 'category page',
        page: 'category',
        css: '/css/category',
        js: '/js/category',
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

    await ctx.render('product', {
        title: 'product page',
        page: 'product',
        css: '/css/product',
        js: '/js/product',
        categories,
        product,
        currentCategory,
    });
});

module.exports = router;