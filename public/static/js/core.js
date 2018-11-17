axios.interceptors.request.use(function(config) {
    if(config.method=='post'){
        config.params = {
            _csrf: $('#_csrf').val(),
            ...config.params
        }
    }else if(config.method=='get'){
        config.params = {
            ...config.params
        }
    }
    return config;
}, function(error) {
    return Promise.reject(error);
})
