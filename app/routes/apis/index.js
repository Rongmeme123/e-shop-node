const router = require('koa-router')();
const productService = require('../../service').product;

router.post('/getProductsByCatid', async (ctx, next) => {
    const catid = ctx.request.body['catid'];
    const products = await productService.queryProductsByCatid(catid);
    ctx.body = {
        code: 200,
        data: products,
    };
    await next(ctx);
});


module.exports = router;