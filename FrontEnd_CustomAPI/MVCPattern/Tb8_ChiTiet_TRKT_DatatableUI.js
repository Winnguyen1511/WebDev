var Tb8DatatableSingletonGenerator = (
    function () {
        var instance;
        var tableContent;
        var tableUI;
        return class Tb8DatatableSingletonGenClass {
            constructor() {
                if (!instance)
                    instance = this;
                return instance;
            }
            getTableContent() {
                return tableContent;
            }
            setTableContent(tbCont) {
                tableContent = tbCont;
            }
            getTableUI() { return tableUI; }
            setTableUI(ui) { tableUI = ui;}
        }
    }()    
);


var Tb8_ChiTiet_TRKT_DatatableUI = (
    function () {
        var gen = new Tb8DatatableSingletonGenerator();
        var tableContent;
        //return tableContent.selector.
        
        function maxIntValue(colSelector) {
            //console.log(tableContent);
            //return tableContent.rows().count();
            
            //console.log(valArrayTmp);
            var valArray = tableContent.columns(colSelector)
                .data()
                .eq(0)
                .toArray();
            //console.log(valArray);
            if (valArray.length <= 0) return 0;
            valArray = valArray.map(e => {
                if (!isNaN(e))
                return parseInt(e)
            });
            
            //valArray = valArray.sort().reverse();
            valArray.sort(function (a, b) { return b - a });
            //console.log(valArray);
            return valArray[0];
        }

        function renderSingleLink(col, data, file) {
            if (file != null &&
                file != undefined &&
                file != "") {
                col.empty();
                if (data == null || data == undefined || data == "") {
                    let a = document.createElement('a'); $(a).addClass("table-link")
                        .attr("href", file);
                    let ie = document.createElement('i'); $(ie).addClass('far fa-file-alt');
                    $(a).append($(ie));
                    col.append($(a));
                }
                else {
                    let a = document.createElement('a'); $(a).addClass("table-link")
                        .attr("href", file).html(data);
                    col.append($(a));
                }
            }
        }

        class Tb8_ChiTiet_TRKT_UIClass {
            constructor(tableSelector) {
                this.table = $(tableSelector);
                //this.modal = $(modalSelector);
                //  Handling Ajax exception:

                //  For rendering object to modal:
                //recordObj = null;
            }     
            registerDatepicker(selector) {
                $(selector).each(function () {
                    $(this).datepicker({
                        //uiLibrary: 'bootstrap4',            
                        format: 'dd/mm/yyyy',

                        autoclose: true
                    });
                });
            }

            registerDatatable() {
                tableContent = this.table.DataTable({
                    fixedHeader: true,
                    responsive: true,
                    drawCallback: function (settings) {
                        $("th").removeClass("sorting_asc");
                        $(".table-link[data-processed!='true']").each(function () {
                            var ftpserver_link = $("#fptserver-link").val();
                            var href = $(this).attr("href");
                            href = ftpserver_link + "/" + href;
                            $(this).attr("href", href);
                            $(this).attr("target", "_blank");
                            $(this).attr("download", "");
                            $(this).attr("data-processed", true);
                        });

                        //$("tbody button[data-processed!='true']").each(function () {
                        //    $(this).click(function () {
                        //        console.log("button select")
                        //        tableContent.$('tr.selected').removeClass('selected');
                        //        $(this).closest("tr").addClass("selected");
                        //    });
                        //    $(this).attr("data-processed", true);
                        //});

                    },
                    language: {
                        "lengthMenu": "Số dòng hiển thị _MENU_ ",
                        "zeroRecords": "Không có dữ liệu",
                        "info": "Trang _PAGE_ trong _PAGES_",
                        "infoEmpty": "Không có dữ liệu",
                        "infoFiltered": "(Lọc từ _MAX_ dòng dữ liệu)",
                        "lengthMenu": "Show _MENU_ entries",
                        "loadingRecords": "Đang tải dữ liệu....",
                        "processing": "Đang xử lý...",
                        "search": "Tìm kiếm:",
                        "zeroRecords": "Không tìm thấy",
                        "paginate": {
                            "first": "Đầu tiên",
                            "last": "Cuối cùng",
                            "next": "Trang tiếp",
                            "previous": "Trang trước"
                        }
                    }
                });

                $(".dataTables_length").hide();
                $(".dataTables_filter").hide();
                $("tbody").on("click", "tr", function () {
                    console.log("select");
                    tableContent.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
            }
            registerDatatableButtons(buttonContainerSelector) {
                new $.fn.dataTable.Buttons(tableContent, {
                    buttons: [
                        {
                            extend: 'excelHtml5',
                            text: 'Xuất Excel',
                            exportOptions: {
                                columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
                                modifier: {
                                    search: 'applied',
                                    order: 'current'
                                }
                            },
                            key: {
                                key: 's',
                                ctrlKey: true,
                                shiftKey: true
                            },
                            customize: function (xlsx) {
                                var sheet1 = xlsx.xl.worksheets['sheet1.xml'];
                                //$('row[r=1] c', sheet1).attr('s', '2');
                                $('row[r=2] c', sheet1).attr('s', '42');
                                $('row[r!=1][r!=2] c', sheet1).attr('s', '51');
                            }
                        }
                    ]
                });

                tableContent.buttons().container()
                    .appendTo(buttonContainerSelector);
                //console.log();
                $(buttonContainerSelector).find("button").each(function () {
                    //console.log("add class");

                    $(this).addClass("btn-primary")
                        .removeClass("btn-secondary");
                })
                gen.setTableContent(tableContent);
            }
            registerDatatableSearchDate(fromSelector, toSelector, colNum) {
                $(fromSelector + ", " +toSelector).change(function () {
                    tableContent.draw();
                });
                $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
                    var min = $(fromSelector).val();
                    var max = $(toSelector).val();
                    var createdAt = data[colNum]; // NgayTao
                    //console.log("Created at", createdAt);
                    //var today = moment().format('mm/dd/yyyy');
                    //createdAt = createdAt.replace('-', '/');
                    //min = min.replace('-', '/');
                    //max = max.replace('-', '/');
                    var startDate = moment(min, "DD/MM/YYYY");
                    //console.log("Start: " + startDate);
                    var endDate = moment(max, "DD/MM/YYYY");
                    //console.log("End: " + endDate);
                    var diffDate = moment(createdAt, "DD/MM/YYYY");
                    //console.log("diff: " + diffDate);
                    if (
                        (!startDate.isValid() && !endDate.isValid())
                        || (startDate.isValid() && !endDate.isValid() && diffDate.isSameOrAfter(startDate))
                        || (!startDate.isValid() && endDate.isValid() && diffDate.isSameOrBefore(endDate))
                        || (startDate.isValid() && endDate.isValid() && (diffDate.isBetween(startDate, endDate, undefined, '[]')))
                    ) {
                        return true;
                    }
                    return false;
                });
            }
            registerDatatableSearchBar(selector) {
                $(selector).keyup(function () {
                    //console.log($(this).val())
                    tableContent.search($(this).val()).draw();
                });
            }
            addRow(obj) {
                console.log("added!");
                //console.log(obj);
                
                var num = maxIntValue(0) + 1 +"";
                //console.log("row=" + num);
                var dateVal = moment(obj.NgayTao);
                if (dateVal.isValid())
                    obj.Ngaytao = dateVal.format('DD/MM/YYYY');
                dateVal = moment(obj.ThoiGianKiemTraFrom);
                if (dateVal.isValid())
                    obj.ThoiGianKiemTraFrom = dateVal.format('DD/MM/YYYY');
                dateVal = moment(obj.ThoiGianKiemTraTo);
                if (dateVal.isValid())
                    obj.ThoiGianKiemTraTo = dateVal.format('DD/MM/YYYY');
                var addedRow = tableContent.row.add([
                    num,
                    obj.DonViCoQuanBanHanh,
                    obj.NoiDungTrichYeu,
                    obj.HinhThuc == null ? "":obj.HinhThuc == false ?"Kế hoạch":"Đột xuất",
                    obj.DonViDuocKiemTra,
                    obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo,
                    obj.TomTat,
                    obj.KhacPhuc,
                    obj.XuLyTrachNhiem,
                    obj.Ngaytao,
                    obj.GhiChu,
                    ""
                ]).node();
                addedRow = $(addedRow)[0].cells;
                console.log(addedRow);

                //  For HinhThuc FileDinhKem:
                const HTCol = 3;
                if(obj.Tb8_FileDinhKem_CanCus != null && obj.Tb8_FileDinhKem_CanCus != undefined)
                    if (obj.Tb8_FileDinhKem_CanCus.length > 0) {
                        let list = obj.Tb8_FileDinhKem_CanCus;
                        let ftp = $("#FileServer").val();
                        let linkDiv = document.createElement('div');
                        for (let i = 0; i < list.length; i++) {
                            let a = document.createElement('a');
                            $(a).addClass('table-link')
                                .attr("href", list[i].FileDinhKem_CanCu)
                                .attr("target", "_blank");
                            let ie = document.createElement('i');
                            $(ie).addClass('far fa-file-alt')
                            $(a).append($(ie));
                            $(linkDiv).append($(a));
                        }
                        $(addedRow[HTCol]).append($(linkDiv));
                    }
                //else if (obj.Tb8_FileDinhKem_CanCus.length == 1) {
                //    if (obj.HinhThuc != "" && obj.HinhThuc != null && obj.HinhThuc != undefined) {
                //        let list = obj.Tb8_FileDinhKem_CanCus;
                //        $(addedRow[HTCol]).empty();
                //        let a = document.createElement('a');
                //        $(a).addClass('table-link')
                //            .attr("href", list[0].FileDinhKem_CanCu)
                //            .attr("target", "_blank")
                //            .html(obj.HinhThuc);
                //        $(addedRow[HTCol]).append($(a));
                //    }
                //    else {
                //        let list = obj.Tb8_FileDinhKem_CanCus;
                //        let a = document.createElement('a');
                //        $(a).addClass('table-link')
                //            .attr("href", list[0].FileDinhKem_CanCu)
                //            .attr("target", "_blank");
                //        let ie = document.createElement('i');
                //        $(ie).addClass('far fa-file-alt')
                //        $(a).append($(ie));
                //        $(addedRow[HTCol]).append($(a));
                //    }
                //}

                const SQDCol = 5;
                if (obj.FileDinhKem_QuyetDinhThongBao != null &&
                    obj.FileDinhKem_QuyetDinhThongBao != undefined &&
                    obj.FileDinhKem_QuyetDinhThongBao != "") {
                    $(addedRow[SQDCol]).empty();
                    if ((obj.SoCongVan == null || obj.SoCongVan == undefined || obj.SoCongVan != "") &&
                        (obj.ThoiGianKiemTraFrom == null || obj.ThoiGianKiemTraFrom == undefined || obj.ThoiGianKiemTraFrom == "") &&
                        (obj.ThoiGianKiemTraTo == null || obj.ThoiGianKiemTraTo == undefined || obj.ThoiGianKiemTraTo == "")) {
                        let a = document.createElement('a'); $(a).addClass("table-link")
                                                                    .attr("href", obj.FileDinhKem_QuyetDinhThongBao);
                        let ie = document.createElement('i'); $(ie).addClass('far fa-file-alt');
                        $(a).append($(ie));
                        $(addedRow[SQDCol]).append($(a));
                    }
                    else {
                        let content = obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo;
                        let a = document.createElement('a'); $(a).addClass("table-link")
                            .attr("href", obj.FileDinhKem_QuyetDinhThongBao)
                            .html(content);
                        $(addedRow[SQDCol]).append($(a));
                    }
                }

                //const TTCol = 6;
                renderSingleLink($(addedRow[6]), obj.TomTat, obj.FileDinhKem_TomTat);
                renderSingleLink($(addedRow[7]), obj.KhacPhuc, obj.FileDinhKem_KhacPhuc);
                renderSingleLink($(addedRow[8]), obj.XuLyTrachNhiem, obj.FileDinhKem_XuLyTrachNhiem);
                

                const acCol = 11;
                var actionDiv = $.parseHTML(
                `<div class="d-flex w-100" >
                    <button class="btn btn-sm btn-data" type="button" onclick="editGetCallback(this)" data-id="${obj.Tb8_id}">
                        <span style="color:#007bff"><i class="far fa-edit"></i></span>
                    </button >
                    <button class="btn btn-sm btn-data" type="button" onclick="detailsGetCallback(this)" data-id="${obj.Tb8_id}">
                        <span style="color:#007bff"><i class="fas fa-info-circle"></i></span>
                    </button >
                    <button class="btn btn-sm btn-data" type="button" onclick="deleteGetCallback(this)" data-id="${obj.Tb8_id}">
                        <span style="color:#007bff"><i class="far fa-trash-alt"></i></span>
                    </button >
                </div >`);
                $(addedRow[acCol]).append(actionDiv);
                //  Draw but remain the paging: false option
                tableContent.draw(false);
            }
            editRow(obj) {
                //  A little different to the add API.
                //  $(editedRow)[0]

                var dateVal = moment(obj.NgayTao);
                if (dateVal.isValid())
                    obj.Ngaytao = dateVal.format('DD/MM/YYYY');
                dateVal = moment(obj.ThoiGianKiemTraFrom);
                if (dateVal.isValid())
                    obj.ThoiGianKiemTraFrom = dateVal.format('DD/MM/YYYY');
                dateVal = moment(obj.ThoiGianKiemTraTo);
                if (dateVal.isValid())
                    obj.ThoiGianKiemTraTo = dateVal.format('DD/MM/YYYY');

                var editedRow = tableContent.row(".selected").node();
                editedRow = $(editedRow)[0].cells;
                //console.log(editedRow)
                $(editedRow[1]).html(obj.DonViCoQuanBanHanh);

                $(editedRow[2]).html(obj.NoiDungTrichYeu);

                const HTCol = 3;
                $(editedRow[HTCol]).empty();
                $(editedRow[HTCol]).html(obj.HinhThuc == null ? "" : obj.HinhThuc == false ? "Kế hoạch" : "Đột xuất");
                //  For HinhThuc FileDinhKem:
                
                if (obj.Tb8_FileDinhKem_CanCus != null && obj.Tb8_FileDinhKem_CanCus != undefined)
                    if (obj.Tb8_FileDinhKem_CanCus.length > 0) {
                        let list = obj.Tb8_FileDinhKem_CanCus;
                        //let ftp = $("#FileServer").val();
                        let linkDiv = document.createElement('div');
                        for (let i = 0; i < list.length; i++) {
                            let a = document.createElement('a');
                            $(a).addClass('table-link')
                                .attr("href", list[i].FileDinhKem_CanCu)
                                .attr("target", "_blank");
                            let ie = document.createElement('i');
                            $(ie).addClass('far fa-file-alt')
                            $(a).append($(ie));
                            $(linkDiv).append($(a));
                        }
                        $(editedRow[HTCol]).append($(linkDiv));
                    }

                $(editedRow[4]).html(obj.DonViDuocKiemTra);

                const SQDCol = 5;
                $(editedRow[SQDCol]).html(obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo);

                if (obj.FileDinhKem_QuyetDinhThongBao != null &&
                    obj.FileDinhKem_QuyetDinhThongBao != undefined &&
                    obj.FileDinhKem_QuyetDinhThongBao != "") {
                    $(editedRow[SQDCol]).empty();
                    if ((obj.SoCongVan == null || obj.SoCongVan == undefined || obj.SoCongVan != "") &&
                        (obj.ThoiGianKiemTraFrom == null || obj.ThoiGianKiemTraFrom == undefined || obj.ThoiGianKiemTraFrom == "") &&
                        (obj.ThoiGianKiemTraTo == null || obj.ThoiGianKiemTraTo == undefined || obj.ThoiGianKiemTraTo == "")) {
                        let a = document.createElement('a'); $(a).addClass("table-link")
                            .attr("href", obj.FileDinhKem_QuyetDinhThongBao);
                        let ie = document.createElement('i'); $(ie).addClass('far fa-file-alt');
                        $(a).append($(ie));
                        $(editedRow[SQDCol]).append($(a));
                    }
                    else {
                        let content = obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo;
                        let a = document.createElement('a'); $(a).addClass("table-link")
                            .attr("href", obj.FileDinhKem_QuyetDinhThongBao)
                            .html(content);
                        $(editedRow[SQDCol]).append($(a));
                    }
                }
                $(editedRow[6]).html(obj.TomTat);
                renderSingleLink($(editedRow[6]), obj.TomTat, obj.FileDinhKem_TomTat);

                $(editedRow[7]).html(obj.KhacPhuc);
                renderSingleLink($(editedRow[7]), obj.KhacPhuc, obj.FileDinhKem_KhacPhuc);

                $(editedRow[8]).html(obj.XuLyTrachNhiem);
                renderSingleLink($(editedRow[8]), obj.XuLyTrachNhiem, obj.FileDinhKem_XuLyTrachNhiem);

                $(editedRow[10]).html(obj.Ngaytao);

                $(editedRow[10]).html(obj.GhiChu);

                tableContent.draw(false);
            }
            deleteRow() {
                tableContent.row(".selected").remove().draw(false);
            }
        }
        return Tb8_ChiTiet_TRKT_UIClass;
    }()
);

$(document).ready(function () {
    var tableGen = new Tb8DatatableSingletonGenerator();

    const UI = new Tb8_ChiTiet_TRKT_DatatableUI("#Tb8-table");
    tableGen.setTableUI(UI);
    
    //Datepicker:
    UI.registerDatepicker(".index-datepicker");

    //Datatable:
    UI.registerDatatable();
    UI.registerDatatableButtons("#table-buttons");

    //Search bar:
    UI.registerDatatableSearchBar("#search-bar-input");

    //  Search date:
    //  Note: the colNum is the column that the date filter apply
    //  col 9: Ngaytao.
    UI.registerDatatableSearchDate("#date-from-input", "#date-to-input", 9);
    //  col ...:

});



