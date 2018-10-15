const db = require('../db');

module.exports = {
    queryAll: async () => {
        const result = await db.query('select * from category');
        return result;
    },
    addOne: async (name) => {
        const result = await db.query(`insert into category(name) values('${name}')`);
        return result;
    },
    updateOne: async (catid, name) => {
        const result = await db.query(`update category set name='${name}' where catid=${catid}`);
        return result;
    },
    deleteOne: async (catid) => {
        const result = await db.query(`delete from category where catid=${catid}`);
        return result;
    },
}