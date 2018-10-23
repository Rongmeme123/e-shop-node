const db = require('../db');
const { webConfig } = require('../config');

const updateProductsByImage = (products) => products.map(product => Object.assign({}, product, {
    image: `//${webConfig.hostname}/statics/upload/product${product.pid}.jpg`,
    image_thumbnail: `//${webConfig.hostname}/statics/upload/product${product.pid}_thumbnail.jpg`
}))

module.exports = {
    queryAll: async () => {
        const result = await db.query(`select * from product`);
        return updateProductsByImage(result);
    },
    queryProductsByCatid: async (catid) => {
        const result = await db.query('select * from product where catid=?', [catid]);
        return updateProductsByImage(result);
    },

    queryOneByPid: async (pid) => {
        const result = await db.query('select * from product where pid=?', [pid]);
        return updateProductsByImage(result);
    },

    addOne: async (catid, name, price, description) => {
        const result = await db.query('insert into product(catid, name, price, description) values(?, ?, ?, ?)', [catid, name, price, description]);
        return result;
    },
    updateOne: async (pid, name, price, description) => {
        const result = await db.query('update product set name=?, price=?, description=? where pid=?', [name, price, description, pid]);
        return result;
    },
    
    deleteOne: async (pid) => {
        const result = await db.query('delete from product where pid=?', [pid]);
        return result;
    },
}