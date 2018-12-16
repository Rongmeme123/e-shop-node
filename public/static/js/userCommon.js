var _user = window._user || {
    initNavLogin: function() {
        var isLogin = (document.cookie.match(/isLogin=([^;]+)/) || [])[1] || '';
        if (!isLogin) return;
        axios.post('/api/getLoginfo', {
            _csrf: $('#_csrf').val()
        })
        .then(function(response) {
            if (response.data && response.data.code === 200){
                data = response.data.data;
                $('._userName').text(data.name);
            }
        })
    }
};

// _user.initNavLogin();