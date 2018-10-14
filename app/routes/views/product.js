module.exports = (config) => async (ctx, next) => {
    console.log('product')
    await ctx.render('product', {
        title: 'product',
        ...config,
    })
}