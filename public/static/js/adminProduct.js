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
            pid: pid,
            _csrf: $('#_csrf').val()
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
    // 清空uploadImage
    window.uploadImage = null;
    if (button.data('type') === 'update') {
        // update
        var tr = button.closest('tr');
        pid = tr.find('td:eq(0)').text();
        var name = tr.find('td:eq(2)').text();
        var price = tr.find('td:eq(3)').text();
        var description = tr.find('td:eq(5)').text();
        // console.log(name, price, description)
        $('#cateSelectWrap').hide();
        modal.find('#pdNameInput').val(name);
        modal.find('#pdPriceInput').val(price);
        modal.find('#pdDesTextarea').val(description);
        modal.find('#editModalTitle').text('update product');
    } else {
        $('#cateSelectWrap').show();
        modal.find('#pdNameInput').val('');
        modal.find('#pdPriceInput').val('');
        modal.find('#pdDesTextarea').val('');
        modal.find('#editModalTitle').text('new product');
    }

    modal.find('._cancel').off('click').on('click', function() {
        modal.modal('hide');
    });
    modal.find('._ok').off('click').on('click', function() {
        // 上传图片要用FormData格式
        var formData = new FormData($('#productForm')[0]);
        var name = modal.find('#pdNameInput').val().trim();
        var price = modal.find('#pdPriceInput').val().trim();
        var description = modal.find('#pdDesTextarea').val().trim();
        // validate
        var isOk = validateForm(name, price, description);
        if (!isOk) return;

        pid && formData.append('pid', pid);
        // 如果uploadImage有值，说明拖拽了图片
        if (!formData.get('image') && window.uploadImage) {
            formData.append('image', window.uploadImage);
        }

        axios({
            url: '/api/updateProduct?_csrf=' +$('#_csrf').val(),
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data' // headers要指定内容类型为formdata格式
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

// https://blog.csdn.net/sqzhao/article/details/50736357
$('#editModal').on('dragenter dragleave dragover', function(e) {
    e.preventDefault();
});
document.querySelector('#editModal').addEventListener('drop', function(e) {
    e.preventDefault();
    var fileList = e.dataTransfer.files;
    console.log(fileList)

    //检测是否是拖拽文件到页面的操作
    if (fileList.length === 0) { return; };
    //检测文件是不是图片
    if (fileList[0].type.indexOf('image') === -1) { return; }

    // 存一下图片文件
    window.uploadImage = fileList[0];

    //实例化file reader对象
    var reader = new FileReader();
    var img = document.createElement('img');

    reader.onload = function(e) {
        img.src = this.result;
        // 页面上添加缩略图
        var parent = $('#pdImage').parent();
        $('#pdImage').remove();
        img.width = '100';
        parent.append(img)
    }
    reader.readAsDataURL(fileList[0]);
}, false)