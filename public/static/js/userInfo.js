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
        if (response.data && response.data.code === 200){
            alert('update successfully!');
            location.reload();
        }
    })
    .catch(function (error) {
        console.log(error);
    });
});