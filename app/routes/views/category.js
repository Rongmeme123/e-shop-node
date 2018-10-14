module.exports = (config) => async (ctx, next) => {
    console.log('category')
    await ctx.render('category', {
        title: 'category',
        ...config,
    })
}