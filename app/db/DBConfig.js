const dbMap = {
    'production': '127.0.0.1',
    'development': '18.136.50.163'
}

module.exports = {
    mysql: {
        // host: '18.136.50.163',
        host: dbMap[process.env.NODE_ENV],
        user: 'rongmeme',
        password: '930904',
        database: 'eshop', 
        port: 3306
    }
}