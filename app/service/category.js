const category = require('../dao').category;

const collection = {
    queryAll: async () => {
        const result = await category.queryAll();
        return result;
    },
    addOne: async (name) => {
        const result = await category.addOne(name);
        return result;
    },
    updateOne: async (catid, name) => {
        const result = await category.updateOne(catid, name);
        return result;
    },
    deleteOne: async (catid) => {
        const result = await category.deleteOne(catid);
        return result;
    },
};

module.exports = collection;