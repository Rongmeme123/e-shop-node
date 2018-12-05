const categoryService = require('../../service').category;
const productService = require('../../service').product;
const orderService = require('../../service').order;

module.exports = {
    index: async (ctx, next) => {
        await ctx.render('admin', {
            csrf: ctx.csrf,
            title: 'admin page',
            page: 'admin',
            css: '/static/css/admin',
            js: '/static/js/admin',
        });
    },
    category: async (ctx, next) => {
        const categories = await categoryService.queryAll();
        await ctx.render('admin/category', {
            csrf: ctx.csrf,
            title: 'admin category page',
            page: 'category',
            css: '/static/css/adminCategory',
            js: '/static/js/adminCategory',
            categories,
        });
    },
    product: async (ctx, next) => {
        const products = await productService.queryAll();
        const categories = await categoryService.queryAll();
    
        await ctx.render('admin/product', {
            csrf: ctx.csrf,
            title: 'admin product page',
            page: 'product',
            css: '/static/css/adminProduct',
            js: '/static/js/adminProduct',
            products,
            categories,
        });
    },
    orders: async (ctx, next) => {
        const orders = await orderService.getRecentOrders(10);
        await ctx.render('admin/orders', {
            csrf: ctx.csrf,
            title: 'admin orders page',
            page: 'orders',
            css: '/static/css/adminProduct',
            js: '/static/js/adminProduct',
            orders,
        });
    }
}
