const domainMap = {
    'production': 's19.ierg4210.ie.cuhk.edu.hk',
    'development': 'localhost' 
}

module.exports = {
    maxAge: 1000 * 3600 * 24 * 3,
    domain: domainMap[process.env.NODE_ENV],
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
}