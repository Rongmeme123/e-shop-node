const product = require('../dao').product;

const updateProductsByImage = (products) => products.map(product => Object.assign({}, product, {
    image: `/static/upload/product${product.pid}.jpg`,
    image_thumbnail: `/static/upload/product${product.pid}_thumbnail.jpg`
}))

const collection = {
    queryAll: async () => {
        const result = await product.queryAll();
        return updateProductsByImage(result);
    },
    queryProductsByCatid: async (catid) => {
        const result = await product.queryByCatid(catid);
        return updateProductsByImage(result);
    },

    queryOneByPid: async (pid) => {
        const result = await product.queryOne(pid);
        return updateProductsByImage([result])[0];
    },

    queryByPids: async (pids) => {
        const result = await product.queryByPids(pids);
        return updateProductsByImage(result);
    },

    addOne: async (catid, name, price, description) => {
        const result = await product.addOne(catid, name, price, description);
        return result;
    },
    updateOne: async (pid, name, price, description) => {
        const result = await product.updateOne(pid, name, price, description)
        return result;
    },
    
    deleteOne: async (pid) => {
        const result = await product.deleteOne(pid);
        return result;
    },
};

module.exports = collection;