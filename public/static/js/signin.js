function validateEmail(email) {
    var emailReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return emailReg.test(email);
}

function validateSignin(email, password) {
    var flag = true;
    var msg = '';
    if (email === '') {
        flag = false;
        msg = 'email cannot be empty';
    } else if (!validateEmail(email)) {
        flag = false;
        msg = 'email you input is not a email format';
    } else if (password === '') {
        flag = false;
        msg = 'password cannot be empty';
    } else if (password.length < 6) {
        flag = false;
        msg = 'length of password cannot be less than 6';
    }
    msg && alert(msg);
    return flag;
}

function validateSignup(email, username, password, repeatPassword) {
    var flag = true;
    var msg = '';
    if (email === '') {
        flag = false;
        msg = 'email cannot be empty';
    } else if (!validateEmail(email)) {
        flag = false;
        msg = 'email you input is not a email format';
    } else if (username === '') {
        flag = false;
        msg = 'username cannot be empty';
    } else if (password === '') {
        flag = false;
        msg = 'password cannot be empty';
    } else if (password.length < 6) {
        flag = false;
        msg = 'length of password cannot be less than 6';
    } else if (repeatPassword === '') {
        flag = false;
        msg = 'repeatPassword cannot be empty';
    } else if (password !== repeatPassword) {
        flag = false;
        msg = 'repeatPassword should be equal to password';
    }
    msg && alert(msg);
    return flag;
}

// signin
$('#signin').on('click', function() {
    var email = $('#signinEmail').val().trim();
    var password = $('#signinPassword').val().trim();
    var isRemember = $('#isRemember').is(':checked');
    if (!validateSignin(email, password)) {
        return false;
    }
    axios.post('/api/signin', {
        email: email,
        password: password,
        isRemember: isRemember,
        _csrf: $('#_csrf').val()
    })
    .then(function(response) {
        if (response.data && response.data.code === 200){
            location.href = '/';
        } else {
            alert(response.data.msg)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});

// signup
$('#signup').on('click', function() {
    var email = $('#signupEmail').val();
    var username = $('#signupUsername').val().trim();
    var password = $('#signupPassword').val();
    var repeatPassword = $('#repeatPassword').val();
    if (!validateSignup(email, username, password, repeatPassword)) {
        return false;
    }
    axios.post('/api/signup', {
        email: email,
        name: username,
        password: password,
        _csrf: $('#_csrf').val()
    })
    .then(function(response) {
        if (response.data && response.data.code === 200){
            $('#sign-in').click();
        } else {
            alert(response.data.msg)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});