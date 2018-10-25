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
        // check price is number
        if (!/^\d+$/.test(formData.get('price'))) {
            alert('price is not a number');
            return;
        }
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