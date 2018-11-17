function validate(userName) {
    var flag = true;
    var msg = '';
    if (userName === '') {
        flag = false;
        msg = 'userName cannot be empty';
    }
    msg && alert(msg);
    return flag;
}


$('#_changeUserName').off('click').on('click', function() {
    var userName = $('#userName').val().trim();

    if (!validate(userName)) {
        return false;
    }

    axios.post('/api/changeUserName', {
        userName: userName
    })
    .then(function(response) {
        var data = response.data;
        if (data)  {
            if (data.code === 200) {
                alert('update successfully!');
                location.reload();
            } else {
                alert(data.msg);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});