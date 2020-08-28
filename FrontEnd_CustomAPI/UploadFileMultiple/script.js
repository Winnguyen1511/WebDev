

linklistContext = gen.getLinklistContext(); // Just an object {}, should use singleton here
var fileExt = ".doc,.docx,.pdf,.odt,.txt,.rtf"
+ ",.ods,.xls,.xlsm,.xlsx"
+ ",.ppt,.pptx,.ppts"
+ ",.jpeg,.jpg,.ai,.png,.bmp,.gif,.ps,.psd,.svg,.tif,.tiff,.ico"
+ ",.rar,.7z,.deb,.zip,.tar.gz";
$("input[type='file']").each(function () {
$(this).attr("accept", fileExt);
});
var FileSize = 50;// in MB
$.xhrPool = [];
$.xhrPool.abortAll = function () {
    $(this).each(function (idx, jqXHR) {
        console.log("abort");
        jqXHR.abort();
    });
};


// Must have GhiChu <---> textarea , FileDinhKemCancu <---> path
var Tb8_FileDinhKem_CanCu = (
    function () {
        var serverDateFormat = 'YYYY-MM-DD';
        var clientDateFormat = 'dd/mm/yyyy';
        var clientDateFormatMoment = 'DD/MM/YYYY';
        var linkList = new WeakMap();
        var _ = function (instance) { return linkList.get(instance) };

        class Tb8_FileDinhKem_CanCuClass {
            constructor(obj) {
                //  Note: "path" private member is relative path receive from backend:
                //  this is the interface for data binding: path <---> FileDinhKem_CanCu.
                var linkRow = { link: null, edit: null, textarea: null, del: null, path: null, note: null };
                linkList.set(this, linkRow);
                if (obj != null && obj != undefined) {


                    if (typeof (obj) == "string") {
                        obj = JSON.parse(obj);
                        if (typeof (obj) == "string") {
                            obj = jQuery.parseJSON(obj);
                        }
                    }
                    this.Tb8_FileDinhKem_CanCu_id = obj.Tb8_FileDinhKem_CanCu_id;
                    this.HinhThuc = obj.HinhThuc;
                    this.SoVanBanKetLuan = obj.SoVanBanKetLuan;
                    var dateformat = serverDateFormat;
                    var dateVal;
                    dateVal = moment(obj.NgayCongVan, dateformat);
                    if (dateVal.isValid()) {
                        this.NgayCongVan = dateVal.format(clientDateFormatMoment);
                    }

                    this.DonViCoQuanBanHanh = obj.DonViCoQuanBanHanh;
                    this.NoiDungTrichYeu = obj.NoiDungTrichYeu;
                    this.FileDinhKem_CanCu = obj.FileDinhKem_CanCu;
                    this.Tb8_id = obj.Tb8_id;

                    this.GhiChu = obj.GhiChu;

                    // For Generic Path:
                    _(this).path = this.FileDinhKem_CanCu;
                    _(this).note = this.GhiChu;
                }
                else {
                    this.Tb8_FileDinhKem_CanCu_id = -1;
                }
            }

            bind() {
                this.GhiChu = _(this).textarea.val();
                this.FileDinhKem_CanCu = _(this).path;
            }

            get note() { return _(this).note; }
            set note(txt) { _(this).note = txt; }

            get path() { return _(this).path; }
            set path(url) { _(this).path = url; }

            get link() { return _(this).link; }
            set link(obj) { _(this).link = obj; }

            get edit() { return _(this).edit }
            set edit(obj) { _(this).edit = obj }

            get textarea() { return _(this).textarea; }
            set textarea(obj) { _(this).textarea = obj };

            get del() { return _(this).del; }
            set del(obj) { _(this).del = obj; }
        }
        return Tb8_FileDinhKem_CanCuClass;
    }()
);


//************************************************************************ */
//Remark list[i].bind():
// This function should be call from some model obj
// Because the obj is actually a model on the server.
var CustomLinkList = (
    function () {
        var priv = new WeakMap();
        var _ = function (instance) { return priv.get(instance) };

        function edit_button_handler() {
            var textarea = $(this).closest(".link-row").find(".file-desc");
            textarea.toggle('blind');
        }

        function del_button_handler(event) {
            console.log("clicked!");
            customFileList = event.data.customFileList;
            var link = $(this).closest(".link-row").find("a");
            var edit = $(this).siblings(".btn-edit-link");
            var textarea = $(this).closest(".link-row").find(".file-desc");
            //console.log(link);
            //var jqXHR_instance =
            //console.log(listAjax);
            var indexPending = _(customFileList).listAjax.map(function (e) {
                return e.link[0];
            }).indexOf(link[0]);

            if (indexPending != -1) {
                //abort pending ajax:
                console.log("aborted!")
                _(customFileList).listAjax[indexPending].jqXHR_obj.abort();
                _(customFileList).listAjax.splice(indexPending, 1);
            }

            _(customFileList).listObj = _(customFileList).listObj.filter(item => {
                return item.link.attr("href") != link.attr("href");
            });

            link.remove();
            edit.remove();
            textarea.remove();
            $(this).remove();
            //console.log(listAjax)
            if (customFileList.loadingDiv != undefined && customFileList.loadingDiv != null) {
                if (_(customFileList).listAjax.length == 0) {
                    customFileList.loadingDiv.hide();
                }
            }
            //console.log(listFile);
            //console.log(_(customFileList).listObj);
        }
        function createLinkRow(customFileListIntance) {
            //  Create link:
            //console.log(_(customFileListIntance).listAjax);
            var row = document.createElement("div");
            row.classList.add("row", "link-row");
            var link = document.createElement("div");
            link.classList.add("file-link", "col-lg-10");
            var a = document.createElement("a");
            //a.innerHTML = postedFiles.name;
            a.classList.add(_(customFileListIntance).opace_class);
            link.appendChild(a);

            var btnDiv = document.createElement("div");
            btnDiv.classList.add("col-lg-2");
            var btnSpan = document.createElement("span");

            var btnEdit = document.createElement("button");
            btnEdit.type = "button";
            btnEdit.classList.add("btn-edit-link", "btn", "btn-sm");
            var icon = document.createElement("i"); icon.classList.add("far", "fa-edit");
            btnEdit.appendChild(icon);

            var btnTrash = document.createElement("button");
            btnTrash.type = "button";
            btnTrash.classList.add("btn-del-link", "btn", "btn-sm");
            var icon = document.createElement("i"); icon.classList.add("far", "fa-trash-alt");
            btnTrash.appendChild(icon);

            btnSpan.appendChild(btnEdit);
            btnSpan.appendChild(btnTrash);

            btnDiv.appendChild(btnSpan);
            var textareaDiv = document.createElement("div");
            textareaDiv.classList.add("file-desc", "col-lg-10", "p-0");
            var textarea = document.createElement("textarea");
            textarea.classList.add("form-control");
            textareaDiv.appendChild(textarea);

            row.appendChild(link);
            row.appendChild(btnDiv);
            row.appendChild(textareaDiv);
            $(textareaDiv).hide();
            customFileListIntance.linkListDiv.append(row);

            $(btnEdit).bind("click", edit_button_handler);

            $(btnTrash).bind("click", { customFileList: customFileListIntance }, del_button_handler);

            return { link: $(a), edit: $(btnEdit), textarea: $(textarea), del: $(btnTrash) };
        }
        class CustomLinkListClass {
            constructor(linkListDiv) {
                //*************************************************
                //  Additional feature: loading div
                this.loadingDiv = null;
                //*************************************************

                this.linkListDiv = linkListDiv;
                var privateMembers = { objConstructor: null, listAjax: [], listObj: [], opace_class: "opace-30" };
                priv.set(this, privateMembers);
            }

            bind() {
                var list = _(this).listObj;
                for (let i = 0; i < list.length; i++) {
                    //  Data binding each elements in the listObj:
                    //  This canbe custom binding depends on specific type of obj.
                    list[i].bind();
                }
            }

            render() {
                if (_(this).objConstructor == null) {
                    throw new Error("Require register constructor!");
                }

                this.linkListDiv.empty();
                var list = _(this).listObj;
                if (list.length > 0) {
                    var fileServer = $("#fptserver-link").val();
                    for (let i = 0; i < list.length; i++) {
                        var ret = createLinkRow(this);
                        var href = list[i].path;

                        href = fileServer + href;
                        ret.link.removeClass(_(this).opace_class);
                        ret.link.attr("href", href);
                        ret.link.attr("target", "_blank");
                        ret.link.attr("download", "")
                        var fileName = href.split("\\").pop();
                        fileName = href.split("/").pop();
                        ret.link.html(fileName);

                        list[i].link = ret.link;
                        list[i].edit = ret.edit;

                        ret.textarea.val(list[i].note); ret.textarea.html(list[i].note);
                        list[i].textarea = ret.textarea;

                        list[i].del = ret.del;
                    }
                }
            }

            registerNewLink() {
                return createLinkRow(this);
            }

            registerLoadingDiv(loadingDiv) {
                this.loadingDiv = loadingDiv;
            }

            GetNewObj() {
                return new (_(this).objConstructor)();
            }
            get objConstructor() { return _(this).objConstructor; }
            set objConstructor(con) { _(this).objConstructor = con; }

            get opace_class() { return _(this).opace_class; }
            set opace_class(style) { _(this).opace_class = style; }

            get listObj() { return _(this).listObj; }
            set listObj(list) { _(this).listObj = list; }

            get listAjax() { return _(this).listAjax; }
            set listAjax(list) { _(this).listAjax = list; }

        }

        return CustomLinkListClass;
    }()
);



$(".file-multiple-group").each(function () {

    //*********************IMPORTANCE*************************//
    //  Must have this
    //  Create the custom file list to handle events.
    var id_field = $(this).data("id");
    var linkListDiv = $(this).find(".link-list");
    linklistContext[id_field] = new CustomLinkList(linkListDiv);
    //********************END_IMPORTANCE**********************//

    //**********************************************************
    //  For additional feature:
    //
    var loadingDiv = $(this).find(".link-loading-div");
    loadingDiv.hide();
    linklistContext[id_field].registerLoadingDiv(loadingDiv);
    //var opace_class = linklistContext[id_field].opace_class;
    //**********************************************************

    //*********************IMPORTANCE*************************//
    //  Must have this
    //  Handling file upload events:
    var inputFiles = $(this).find(".custom-file-input");
    inputFiles.change(function () {
        var _this = $(this);
        //var baseUrl = $("form").data("url");
        var baseUrl = $("form").data("url");
        var regex = /Index/;
        //var baseUrl;
        if (regex.test(baseUrl) == true) {
            baseUrl = baseUrl.replace("Index", "");
            //url = url.replace("Index", ext);
        }
        //var obj_id = $("form").data("id");
        var reqUrl = baseUrl + "/UploadFile";
        var postedFiles = $(this).prop("files");
        for (let i = 0; i < postedFiles.length; i++) {
            var formData = new FormData();
            //formData.append("id", obj_id);
            formData.append("file", postedFiles[i]);
            var newLink = linklistContext[id_field].registerNewLink();

            $.ajax({
                url: reqUrl,
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                beforeSend: function (jqXHR) {
                    $.xhrPool.push(jqXHR);
                    linklistContext[id_field].listAjax.push({ jqXHR_obj: jqXHR, objLink: newLink });
                    loadingDiv.show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var index = linklistContext[id_field].listAjax.map(function (e) {
                        return e.jqXHR_obj;
                    }).indexOf(jqXHR);
                    var objLink = linklistContext[id_field].listAjax[index].objLink;
                    var link = objLink.link;
                    link.html("Error uploading file!");
                    link.addClass("text-danger");
                    link.removeClass(linklistContext[id_field].opace_class);
                    linklistContext[id_field].listAjax.splice(index, 1);
                    //console.log(listAjax);
                    index = $.xhrPool.indexOf(jqXHR);
                    if (index > -1) {
                        $.xhrPool.splice(index, 1);
                    }
                },
                success: function (ret, status, jqXHR) {
                    var index = linklistContext[id_field].listAjax.map(function (e) {
                        return e.jqXHR_obj;
                    }).indexOf(jqXHR);
                    var objLink = linklistContext[id_field].listAjax[index].objLink;
                    var link = objLink.link;
                    link.removeClass(linklistContext[id_field].opace_class);
                    link.attr("href", ret.url);
                    var filename = ret.url.split("\\").pop();
                    filename = ret.url.split("/").pop();
                    link.html(filename);
                    //var href = ret.url;
                    var relUrl = ret.rel;

                    link.attr("target", "_blank");
                    link.attr("download", "");

                    var newObj = linklistContext[id_field].GetNewObj();
                    //console.log(newObj);

                    newObj.link = objLink.link;
                    newObj.edit = objLink.edit;
                    newObj.textarea = objLink.textarea;
                    newObj.del = objLink.del;
                    newObj.path = relUrl;

                    linklistContext[id_field].listObj.push(newObj);
                    //console.log(linklistContext[id_field].listObj);
                    if (index > -1)
                        linklistContext[id_field].listAjax.splice(index, 1);
                    //Remove from ajax pool:
                    index = $.xhrPool.indexOf(jqXHR);
                    if (index > -1) {
                        $.xhrPool.splice(index, 1);
                    }

                }

            }).done(function () {
                _this.prop("files", (new DataTransfer()).files);
                if (linklistContext[id_field].listAjax.length == 0) {
                    loadingDiv.hide();
                }
            });;
        }
    });

    //********************END_IMPORTANCE**********************//

});

//Render function: Mỗi khi muốn update mới 1 list thì thực hiện 3 dòng này.
// **********************************************************************************
// User modify here
// Replace the id field:
linklistContext["Tb8_FileDinhKem_CanCus"].objConstructor = Tb8_FileDinhKem_CanCu;// Đổi chổ này bằng constructor của obj khác.
linklistContext["Tb8_FileDinhKem_CanCus"].listObj = this.model.Tb8_FileDinhKem_CanCus;
linklistContext["Tb8_FileDinhKem_CanCus"].render();
//********************************************************************************* */


//Trước khi gửi lên server thì thực hiện 2 dòng này
// The bind function in the View model
//bind()
//after call bind(), listlistContext[selector] will update the value, ready to use in the http post data:
linklistContext["Tb8_FileDinhKem_CanCus"].bind();
//after this, you can use the ret for any thing, it is an array of obj{}--> server
ret.Tb8_FileDinhKem_CanCus = linklistContext["Tb8_FileDinhKem_CanCus"].listObj;
                