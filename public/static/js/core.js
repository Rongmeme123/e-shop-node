axios.interceptors.request.use(function(config) {
    if(config.method=='post'){
        config.params = {
            _t: Date.parse(new Date())/1000,
            _csrf: $('#_csrf').val(),
            ...config.params
        }
    }else if(config.method=='get'){
        config.params = {
            _t: Date.parse(new Date())/1000,
            ...config.params
        }
    }
    return config;
}, function(error) {
    return Promise.reject(error);
})
