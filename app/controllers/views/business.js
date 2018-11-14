const categoryService = require('../../service').category;
const productService = require('../../service').product;

module.exports = {
    index: async (ctx, next) => {
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
            csrf: ctx.csrf,
            title: 'category page',
            page: 'category',
            css: '/static/css/businessCategory',
            js: '/static/js/businessCategory',
            categories,
            products,
            currentCategory,
        });
    },
    product: async (ctx, next) => {
        const pid = parseInt(ctx.query.pid);
        if (!pid) {
            await ctx.redirect('/');
            return;
        }
    
        const categories = await categoryService.queryAll();
        let product = await productService.queryOneByPid(pid);
        
        let currentCategory = {};
        if (product) {
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
            csrf: ctx.csrf,
            title: 'product page',
            page: 'product',
            css: '/static/css/businessProduct',
            js: '/static/js/businessProduct',
            categories,
            product,
            currentCategory,
        });
    }
}
