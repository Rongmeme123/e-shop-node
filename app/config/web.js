const hostnameMap = {
    'production': 'secure.s19.ierg4210.ie.cuhk.edu.hk',
    'development': 'localhost:3000'
}

module.exports = {
    hostname: hostnameMap[process.env.NODE_ENV]
}