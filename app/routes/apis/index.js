const router = require('koa-router')();
const productService = require('../../service').product;
const categoryService = require('../../service').category;

// category

router.post('/getAllCategories', async (ctx, next) => {
    const result = await categoryService.queryAll();

    ctx.body = {
        code: 200,
        data: result,
    };
    await next(ctx);
});

router.post('/updateCategory', async (ctx, next) => {
    const catid = ctx.request.body['catid'];
    const name = ctx.request.body['name'];
    let result;
    if (!catid) {
        result = await categoryService.addOne(name);
    } else {
        result = await categoryService.updateOne(catid, name);
    }

    console.log(result);

    ctx.body = {
        code: 200,
        data: null,
    };
    await next(ctx);
});

router.post('/deleteCategory', async (ctx, next) => {
    const catid = ctx.request.body['catid'];
    let result = await categoryService.deleteOne(catid);

    console.log(result);

    ctx.body = {
        code: 200,
        data: null,
    };
    await next(ctx);
});

// product

router.post('/getProductsByCatid', async (ctx, next) => {
    const catid = ctx.request.body['catid'];
    const products = await productService.queryProductsByCatid(catid);
    ctx.body = {
        code: 200,
        data: products,
    };
    await next(ctx);
});

router.post('/getAllProducts', async (ctx, next) => {
    const products = await productService.queryAll();
    ctx.body = {
        code: 200,
        data: products,
    };
    await next(ctx);
});

router.post('/updateProduct', async (ctx, next) => {
    const pid = ctx.request.body['pid'];
    const catid = ctx.request.body['catid'];
    const name = ctx.request.body['name'];
    const price = ctx.request.body['price'];
    const description = ctx.request.body['description'];

    let result;
    if (!pid) {
        result = await productService.addOne(catid, name, price, description);
    } else {
        result = await productService.updateOne(pid, name, price, description);
    }

    console.log(result);

    ctx.body = {
        code: 200,
        data: null,
    };

    const products = await productService.queryAll();
    ctx.body = {
        code: 200,
        data: products,
    };
    await next(ctx);
});

router.post('/deleteProduct', async (ctx, next) => {
    const pid = ctx.request.body['pid'];
    let result = await productService.deleteOne(pid);

    console.log(result);

    ctx.body = {
        code: 200,
        data: null,
    };
    await next(ctx);
});

module.exports = router;