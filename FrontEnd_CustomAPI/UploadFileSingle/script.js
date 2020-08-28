$(".file-single-group").each(function () {
    var fileInput = $(this).find(".custom-file-input");
    var label = fileInput.siblings(".custom-file-label");
    var desc = fileInput.siblings(".custom-file-description");
    //var del_button = $(this).find("button");
    
    $(this).find("a").each(function () {
        $(this).find(".file-loading-div").hide();
        $(this).attr("href", desc.val());
        if ($(this).attr("href") == "" || $(this).attr("href") == undefined) {
            $(this).siblings("button").hide();
            $(this).hide();
        }
        else {
            var href = $(this).attr("href");
            var fileServer = $("#fptserver-link").val();
            href = fileServer + href;
            $(this).attr("href", href);
            $(this).attr("target", "_blank");
            $(this).attr("download", "");
        }
    })

    var fileName = desc.val().split("\\").pop();
    fileName = desc.val().split("/").pop();
    label.html(fileName);
});

$(".file-single-group").each(function () {
    var fileInput = $(this).find(".custom-file-input");
    var label = fileInput.siblings(".custom-file-label");
    var desc = fileInput.siblings(".custom-file-description");
    var del_button = $(this).find("button");

    //  del button handler:
    var jqXHR_instance = null;
    $(this).find("button").click(function () {
        desc.val("");
        label.html("");
        $(this).siblings("a").hide();
        $(this).hide();
        if (jqXHR_instance != null) {
            jqXHR_instance.abort();
            var index = $.xhrPool.indexOf(jqXHR_instance);
            if (index > -1) {
                $.xhrPool.splice(index, 1);
            }
            jqXHR_instance = null;
        }
    });

    //  File choose events:
    fileInput.change(function () {

        //  INIT STATE:
        //console.log($.xhrPool);
        var _this = $(this);
        var baseUrl = $("form").data("url");
        var regex = /Index/;
        //var baseUrl;
        if (regex.test(baseUrl) == true) {
            baseUrl = baseUrl.replace("Index", "");
            //url = url.replace("Index", ext);
        }
        //console.log(baseUrl);
        //var obj_id = $("form").data("id");

        //console.log(obj_id);
        var postedFile = $(this).prop("files")[0];
        //console.log(postedFile);
        var label = $(this).siblings(".custom-file-label");
        var desc = $(this).siblings(".custom-file-description");
        //obj_id = parseInt(obj_id);
        var reqUrl = baseUrl + "/UploadFile";

        if ((postedFile.size / 1024 / 1024) > FileSize) {
            label.html("Error: Dung lượng file lớn hơn " + FileSize + " MB");
            label.addClass("text-danger");
            return;
        }
        label.removeClass("text-danger");
        //      DATA PROCESS:
        // Form data object:
        var formData = new FormData();
        //formData.append('id', obj_id);
        formData.append('file', postedFile);
        //$.getJSON(reqUrl, { id: obj_id, file: postedFile }, function (ret) {
        //    console.log(ret);
        //    //label.addClass("selected").html
        //});
        label.html("");
        del_button.siblings("a").attr("href", "").show();
        del_button.show();

        //console.log(reqUrl);
        jqXHR_instance = $.ajax({
            url: reqUrl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function (jqXHR) {
                //console.log(typeof (jqXHR));
                $.xhrPool.push(jqXHR);
                del_button.siblings("a").find(".file-loading-div").show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                //console.log(jqXHR, textStatus, errorThrown);

                label.html("Error: Upload file lỗi, vui lòng thử lại!");
                label.addClass("text-danger");

                del_button.siblings("a").hide();
                del_button.hide();
                var index = $.xhrPool.indexOf(jqXHR);
                if (index > -1) {
                    $.xhrPool.splice(index, 1);
                }
                jqXHR_instance = null;
            },
            success: function (ret, status, jqXHR) {
                //console.log(ret);

                let url = ret.url;
                let rel = ret.rel;
                let fileName = url.split("\\").pop();
                fileName = url.split("/").pop();
                desc.val(rel);
                label.html(fileName);
                del_button.siblings("a").attr("href", url);
                del_button.siblings("a").find(".file-loading-div").hide();

                //Ajax handler:
                var index = $.xhrPool.indexOf(jqXHR);
                if (index > -1) {
                    $.xhrPool.splice(index, 1);
                }
                jqXHR_instance = null;
            }
        }).done(function () {
            _this.prop("files", (new DataTransfer()).files);
        });
    });

});