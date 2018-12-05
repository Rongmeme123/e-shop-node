const orderService = require('../../service').order;
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ad_-lsmoGv3wEeWVqusHxyEsJkhWJ1iZGNe4rOmFT934BH1alBTCELa5dOiPIXU6XjNtz9u2hmcO_VLk',
    'client_secret': 'EAzcHokubQeRaA18hYD-fC985CcHVZRWIjSfWnz4XaQXuvhxdG_N7c4XXR5zM-upWHYPLXX6mZ65fWSd'
});

module.exports = {
    paySuccess: async (ctx, next) => {
        const payerId = ctx.request.query.PayerID;
        const paymentId = ctx.request.query.paymentId;

        const orderItem = await orderService.queryByPaymentId(paymentId);
        if (!orderItem) {
            ctx.redirect('/payFail')
        }
        const orderInfo = orderItem.orderinfo;
        const total = orderInfo.split(':')[0]

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "HKD",
                    "total": total
                }
            }]
        };

        let payment = await new Promise((resolve, reject) => {
            paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
                if (error) {
                    reject(error.response)
                } else {
                    resolve(payment);
                }
            });
        });

        // update order status
        await orderService.updateOne(orderItem.oid, 1);

        await ctx.redirect('/');
    },
    payFail: async (ctx, next) => {
        ctx.response.body = 'fail';
    }
}