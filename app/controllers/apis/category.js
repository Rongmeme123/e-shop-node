const productService = require('../../service').product;
const categoryService = require('../../service').category;

// category

module.exports = {
    getAllCategories: async (ctx, next) => {
        const result = await categoryService.queryAll();
    
        ctx.body = {
            code: 200,
            data: result,
        };
        await next(ctx);
    },
    updateCategory: async (ctx, next) => {
        const catid = ctx.request.body['catid'];
        const name = ctx.request.body['name'];
        let result = null;
        let ret = {
            code: 200,
            data: null,
            msg: ''
        }
    
        // validate
        if (!name) {
            ret.code = 201;
            ret.msg = 'name is required';
        }
    
        if (name.length > 20) {
            ret.code = 201;
            ret.msg = 'length of category name must be less than 20';
        } else if (!catid) {
            result = await categoryService.addOne(name);
        } else {
            result = await categoryService.updateOne(catid, name);
        }
    
        ctx.body = ret;
        await next(ctx);
    },
    deleteCategory: async (ctx, next) => {
        const catid = ctx.request.body['catid'];
        let products = await productService.queryProductsByCatid(catid);
    
        let bd = {
            code: 200,
            data: null,
        }
    
        // products with catid bigger than 0
        if (products.length > 0) {
            bd.code = 500;
            bd.msg = 'You cannot delete this category because there are still products in the category';
        } else {
            let result = await categoryService.deleteOne(catid);
            console.log(result);
        }
    
        ctx.body = bd;
        await next(ctx);
    }
}