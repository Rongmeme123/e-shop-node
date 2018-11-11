// deleteModal
$('#deleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var tr = button.closest('tr');
    var catid = tr.find('td:eq(0)').text();
    var name = tr.find('td:eq(1)').text();

    var modal = $(this);
    modal.find('.modal-body').text('Are you sure to delete category [' + name + ']?');
    modal.find('._cancel').off('click').on('click', function() {
        modal.modal('hide');
    });
    modal.find('._ok').off('click').on('click', function() {
        axios.post('/api/deleteCategory', {
            catid: catid
        })
        .then(function(response) {
            // hide modal
            modal.modal('hide');
            if (response.data && response.data.code === 200){
                // remove this record
                tr.remove();
            } else {
                alert(response.data.msg);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    });
});

function validateForm(name) {
    var flag = true;
    var msg = '';
    if (name.length === 0) {
        flag = false;
        msg = 'product name cannot be empty';
    } else if (name.length > 20) {
        flag = false;
        msg = 'length of product name cannot be lt 20';
    }
    msg && alert(msg);
    return flag;
}

// editModal
$('#editModal').on('show.bs.modal', function(event) {
    var modal = $(this);
    var button = $(event.relatedTarget);
    var catid;
    if (button.data('type') === 'update') {
        // update
        var tr = button.closest('tr');
        var name = tr.find('td:eq(1)').text();
        catid = tr.find('td:eq(0)').text();

        modal.find('#catNameInput').val(name);
        modal.find('#editModalTitle').val('update category');
    } else {
        modal.find('#editModalTitle').text('new category');
    }

    modal.find('._cancel').off('click').on('click', function() {
        modal.modal('hide');
    });
    modal.find('._ok').off('click').on('click', function() {
        var name = modal.find('#catNameInput').val();
        // validate
        var isOk = validateForm(name.trim());
        if (!isOk) return;

        axios.post('/api/updateCategory', {
            catid: catid,
            name: name,
        })
        .then(function(response) {
            if (response.data && response.data.code === 200){
                // console.log(response.data)
                location.reload();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    });
});