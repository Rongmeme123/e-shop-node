// deleteModal
$('#deleteModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var tr = button.closest('tr');
    var pid = tr.find('td:eq(0)').text();
    var name = tr.find('td:eq(2)').text();

    var modal = $(this);
    modal.find('.modal-body').text('Are you sure to delete product [' + name + ']?');
    modal.find('._cancel').off('click').on('click', function() {
        modal.modal('hide');
    });
    modal.find('._ok').off('click').on('click', function() {
        axios.post('/api/deleteProduct', {
            pid: pid
        })
        .then(function(response) {
            if (response.data && response.data.code === 200){
                // hide modal
                modal.modal('hide');
                // remove this record
                tr.remove();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    });
});

function validateForm(name, price, description) {
    var flag = true;
    var msg = '';
    if (name.length === 0) {
        flag = false;
        msg = 'name cannot be empty';
    } else if (price.length === 0) {
        flag = false;
        msg = 'price cannot be empty';
    } else if (description.length === 0) {
        flag = false;
        msg = 'description cannot be empty';
    } else if (name.length > 20) {
        flag = false;
        msg = 'length of product name cannot be lt 20';
    } else if (!/^\d+$/.test(price)) {
        flag = false;
        msg = 'price is not a number';
    } else if (description.length > 1000) {
        flag = false;
        msg = 'length of product description cannot be lt 1000';
    }
    msg && alert(msg);
    return flag;
}

// editModal
$('#editModal').on('show.bs.modal', function(event) {
    var modal = $(this);
    var button = $(event.relatedTarget);
    var pid;
    if (button.data('type') === 'update') {
        // update
        var tr = button.closest('tr');
        pid = tr.find('td:eq(0)').text();
        var name = tr.find('td:eq(2)').text();
        var price = tr.find('td:eq(3)').text();
        var description = tr.find('td:eq(5)').text();
        // console.log(name, price, description)
        modal.find('#pdNameInput').val(name);
        modal.find('#pdPriceInput').val(price);
        modal.find('#pdDesTextarea').val(description);
        modal.find('#editModalTitle').val('update product');
    } else {
        $('#cateSelectWrap').show();
        modal.find('#editModalTitle').text('new product');
    }

    modal.find('._cancel').off('click').on('click', function() {
        modal.modal('hide');
    });
    modal.find('._ok').off('click').on('click', function() {
        let formData = new FormData($('#productForm')[0]);
        // validate
        var isOk = validateForm(formData.get('name').trim(), formData.get('price').trim(), formData.get('description').trim());
        if (!isOk) return;

        pid && formData.append('pid', pid);
        axios({
            url: '/api/updateProduct',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
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