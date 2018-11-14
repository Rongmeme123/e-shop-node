function validate(password, repeatPassword) {
    var flag = true;
    var msg = '';
    if (password === '') {
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

$('#_changePwd').off('click').on('click', function() {
    var password = $('#password').val().trim();
    var repeatPassword = $('#repeatPassword').val().trim();

    if (!validate(password, repeatPassword)) {
        return false;
    }

    axios.post('/api/changePassword', {
        password: password
    })
    .then(function(response) {
        if (response.data && response.data.code === 200){
            alert('update successfully!');
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});