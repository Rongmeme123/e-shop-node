axios.interceptors.request.use(function(config) {
    if(config.method=='post'){
        config.data = {
            ...config.data,
            _csrf: $('#_csrf').val(),
            _t: Date.parse(new Date())/1000,
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