const orderService = require('../../service').order;
const productService = require('../../service').product;
const userService = require('../../service').user;
const paypal = require('paypal-rest-sdk');
const { webConfig } = require('../../config');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'Ad_-lsmoGv3wEeWVqusHxyEsJkhWJ1iZGNe4rOmFT934BH1alBTCELa5dOiPIXU6XjNtz9u2hmcO_VLk',
    'client_secret': 'EAzcHokubQeRaA18hYD-fC985CcHVZRWIjSfWnz4XaQXuvhxdG_N7c4XXR5zM-upWHYPLXX6mZ65fWSd'
});

module.exports = {
    payMoney: async (ctx, next) => {
        let { cart } = ctx.request.body;
        const authToken = ctx.cookies.get('auth');

        let pids = [];
        let cartObject = {};
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            pids.push(item.pid);
            cartObject[item.pid] = item.quantity;
        }

        let products = await productService.queryByPids(pids);
        let items = []; // create_payment_json里的items
        let total = 0; // create_payment_json里的total
        let description = ''; // create_payment_json里的description
        let orderInfo = []; // 数据库里要存的订单信息
        for (let i = 0; i < products.length; i++) {
            let item = products[i];
            let name = item.name;
            let price = item.price;
            let quantity = cartObject[item.pid];
            items.push({
                name: name,
                sku: item.pid,
                price: price,
                currency: 'HKD',
                quantity: quantity
            });
            total += price * quantity;
            description += name + ' x ' + quantity + ';';
            orderInfo.push(item.pid + ',' + quantity + ',' + price);
        }
        var create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `http://${webConfig.hostname}/paySuccess`,
                "cancel_url": `http://${webConfig.hostname}/payFail`
            },
            "transactions": [{
                "item_list": {
                    "items": items
                },
                "amount": {
                    "currency": "HKD",
                    "total": total
                },
                "description": description
            }]
        };

        let {redirectLink, payment}  = await new Promise((resolve) => {
            paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    console.log(payment)
                    for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                            resolve({
                                redirectLink: payment.links[i].href,
                                payment: payment
                            });
                        }
                    }
                }
            });
        })

        // store to db
        const user = await userService.getUserByToken(authToken);
        console.log(payment.id, user ? user.uid : 0, total + ':' + orderInfo.join('|'))
        const orderResult = await orderService.addOne(payment.id, user ? user.uid : 0, total + ':' + orderInfo.join('|'), description, redirectLink);
        console.log(orderResult)
        ctx.body = {
            code: 200,
            data: redirectLink,
            msg: '',
        };
        await next(ctx);
    }
};