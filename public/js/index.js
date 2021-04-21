window.onload = function () {
    $('#btn_add').on('click', function () {
        $('#list_add').on('shown.bs.modal', function () {
        })
        $('.btn_new').on('click', function () {
            window.location.assign("/index/add")
        })

    })

    $('.btn_delete').on('click', function () {
        var r = confirm("确认删除该任务？");
        if (r == true) {
            var id = $(this).attr('data-id')
            window.location.assign("/index/remove?id=" + id)
        }
    })

    $('.btn_edit').on('click', function () {
        var id = $(this).attr('data-id')
        $.ajax({
            type: "get",
            url: "/index/edit?id=" + id,
            success: function (data) {
                $('#list_edit').modal({ show: true })
                $('#list_edit input[name="id"]').val(id)
                $('#list_edit input[name="text"]').val(data.text)
            },
            error: function () {
                console.log('请求失败');
            }
        })
    })

    $('.btn_save').on('click', function () {
        var id = $('#list_edit').find('input[name="id"]').val()
        window.location.assign("/index/edit?id=" + id)
    })


    $('.checkbox_status').on('click', function () {
        $.ajax({
            type: "post",
            url: "/index/edit",
            data: {
                id: $(this).attr('data-id'),
                status: $(this).prop('checked')
            },
            success: function (res) {
                console.log(res)
                window.location.reload()
            },
            error: function () {
                console.log('请求失败');
            }
        })
    })


}

