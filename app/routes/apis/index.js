const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const gm = require('gm');
const formidable = require('formidable');
const productService = require('../../service').product;
const categoryService = require('../../service').category;
const { imageConfig } = require('../../config');

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
    let upload = () => new Promise((resolve, reject) => {
        const form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = imageConfig.uploadDir;
        form.keepExtensions = true;
        form.maxFieldsSize = imageConfig.maxSize;

        let response;

        form.parse(ctx.req, async (err, fields, files) => {
            if (err) { throw err; return; }

            // 判空
            Object.keys(fields).forEach((key) => {
                if (!fields[key]) {
                    resolve({
                        code: 201,
                        msg: `${key} is required`,
                    });
                    return;
                }
            });

            const img = files.image;
            const { pid, catid, name, price, description } = fields;

            let packet;
            if (pid) {
                packet = await productService.updateOne(pid, name, price, description);
            } else {
                packet = await productService.addOne(catid, name, price, description);
            }

            if (img.size > 0) {
                let imgId = packet.insertId || pid;
                let imgUrl = path.join(imageConfig.uploadDir, `product${imgId}.jpg`);
                let imgThumbnailUrl = path.join(imageConfig.uploadDir, `product${imgId}_thumbnail.jpg`);

                // 修改图片名称
                try {
                    fs.rename(img.path, imgUrl, function(err) {
                        if (err) {
                            console.log(err)
                            response = { code: 201 };
                            resolve(response);
                        } else {
                            let s = gm(imgUrl).resize(100).write(imgThumbnailUrl, (err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log("上传成功");
                                    response = { code: 200 };
                                    resolve(response);
                                }
                            });
                        }
                    });
                } catch (e) {
                    console.log(e);
                    response = { code: 201 };
                    resolve(response);
                }
            } else {
                response = { code: 200 };
                resolve(response);
            }
        })
    });

    let result = await upload();

    ctx.body = result;
    await next(ctx);
});

router.post('/deleteProduct', async (ctx, next) => {
    const pid = ctx.request.body['pid'];
    let result = await productService.deleteOne(pid);

    ctx.body = {
        code: 200,
        data: null,
    };
    await next(ctx);
});

module.exports = router;