"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tb8_ChiTiet_TRKT_DatatableUI = function () {
  var gen = new Tb8DatatableSingletonGenerator();
  var tableContent; //return tableContent.selector.

  function maxIntValue(colSelector) {
    //console.log(tableContent);
    //return tableContent.rows().count();
    //console.log(valArrayTmp);
    var valArray = tableContent.columns(colSelector).data().eq(0).toArray(); //console.log(valArray);

    if (valArray.length <= 0) return 0;
    valArray = valArray.map(function (e) {
      if (!isNaN(e)) return parseInt(e);
    }); //valArray = valArray.sort().reverse();

    valArray.sort(function (a, b) {
      return b - a;
    }); //console.log(valArray);

    return valArray[0];
  }

  function renderSingleLink(col, data, file) {
    if (file != null && file != undefined && file != "") {
      col.empty();

      if (data == null || data == undefined || data == "") {
        var a = document.createElement('a');
        $(a).addClass("table-link").attr("href", file);
        var ie = document.createElement('i');
        $(ie).addClass('far fa-file-alt');
        $(a).append($(ie));
        col.append($(a));
      } else {
        var _a = document.createElement('a');

        $(_a).addClass("table-link").attr("href", file).html(data);
        col.append($(_a));
      }
    }
  }

  var Tb8_ChiTiet_TRKT_UIClass =
  /*#__PURE__*/
  function () {
    function Tb8_ChiTiet_TRKT_UIClass(tableSelector) {
      _classCallCheck(this, Tb8_ChiTiet_TRKT_UIClass);

      this.table = $(tableSelector); //this.modal = $(modalSelector);
      //  Handling Ajax exception:
      //  For rendering object to modal:
      //recordObj = null;
    }

    _createClass(Tb8_ChiTiet_TRKT_UIClass, [{
      key: "registerDatepicker",
      value: function registerDatepicker(selector) {
        $(selector).each(function () {
          $(this).datepicker({
            //uiLibrary: 'bootstrap4',            
            format: 'dd/mm/yyyy',
            autoclose: true
          });
        });
      }
    }, {
      key: "registerDatatable",
      value: function registerDatatable() {
        var _language;

        tableContent = this.table.DataTable({
          fixedHeader: true,
          responsive: true,
          drawCallback: function drawCallback(settings) {
            $("th").removeClass("sorting_asc");
            $(".table-link[data-processed!='true']").each(function () {
              var ftpserver_link = $("#fptserver-link").val();
              var href = $(this).attr("href");
              href = ftpserver_link + "/" + href;
              $(this).attr("href", href);
              $(this).attr("target", "_blank");
              $(this).attr("download", "");
              $(this).attr("data-processed", true);
            }); //$("tbody button[data-processed!='true']").each(function () {
            //    $(this).click(function () {
            //        console.log("button select")
            //        tableContent.$('tr.selected').removeClass('selected');
            //        $(this).closest("tr").addClass("selected");
            //    });
            //    $(this).attr("data-processed", true);
            //});
          },
          language: (_language = {
            "lengthMenu": "Số dòng hiển thị _MENU_ ",
            "zeroRecords": "Không có dữ liệu",
            "info": "Trang _PAGE_ trong _PAGES_",
            "infoEmpty": "Không có dữ liệu",
            "infoFiltered": "(Lọc từ _MAX_ dòng dữ liệu)"
          }, _defineProperty(_language, "lengthMenu", "Show _MENU_ entries"), _defineProperty(_language, "loadingRecords", "Đang tải dữ liệu...."), _defineProperty(_language, "processing", "Đang xử lý..."), _defineProperty(_language, "search", "Tìm kiếm:"), _defineProperty(_language, "zeroRecords", "Không tìm thấy"), _defineProperty(_language, "paginate", {
            "first": "Đầu tiên",
            "last": "Cuối cùng",
            "next": "Trang tiếp",
            "previous": "Trang trước"
          }), _language)
        });
        $(".dataTables_length").hide();
        $(".dataTables_filter").hide();
        $("tbody").on("click", "tr", function () {
          console.log("select");
          tableContent.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        });
      }
    }, {
      key: "registerDatatableButtons",
      value: function registerDatatableButtons(buttonContainerSelector) {
        new $.fn.dataTable.Buttons(tableContent, {
          buttons: [{
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
            customize: function customize(xlsx) {
              var sheet1 = xlsx.xl.worksheets['sheet1.xml']; //$('row[r=1] c', sheet1).attr('s', '2');

              $('row[r=2] c', sheet1).attr('s', '42');
              $('row[r!=1][r!=2] c', sheet1).attr('s', '51');
            }
          }]
        });
        tableContent.buttons().container().appendTo(buttonContainerSelector); //console.log();

        $(buttonContainerSelector).find("button").each(function () {
          //console.log("add class");
          $(this).addClass("btn-primary").removeClass("btn-secondary");
        });
        gen.setTableContent(tableContent);
      }
    }, {
      key: "registerDatatableSearchDate",
      value: function registerDatatableSearchDate(fromSelector, toSelector, colNum) {
        $(fromSelector + ", " + toSelector).change(function () {
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

          var startDate = moment(min, "DD/MM/YYYY"); //console.log("Start: " + startDate);

          var endDate = moment(max, "DD/MM/YYYY"); //console.log("End: " + endDate);

          var diffDate = moment(createdAt, "DD/MM/YYYY"); //console.log("diff: " + diffDate);

          if (!startDate.isValid() && !endDate.isValid() || startDate.isValid() && !endDate.isValid() && diffDate.isSameOrAfter(startDate) || !startDate.isValid() && endDate.isValid() && diffDate.isSameOrBefore(endDate) || startDate.isValid() && endDate.isValid() && diffDate.isBetween(startDate, endDate, undefined, '[]')) {
            return true;
          }

          return false;
        });
      }
    }, {
      key: "registerDatatableSearchBar",
      value: function registerDatatableSearchBar(selector) {
        $(selector).keyup(function () {
          //console.log($(this).val())
          tableContent.search($(this).val()).draw();
        });
      }
    }, {
      key: "addRow",
      value: function addRow(obj) {
        console.log("added!"); //console.log(obj);

        var num = maxIntValue(0) + 1 + ""; //console.log("row=" + num);

        var dateVal = moment(obj.NgayTao);
        if (dateVal.isValid()) obj.Ngaytao = dateVal.format('DD/MM/YYYY');
        dateVal = moment(obj.ThoiGianKiemTraFrom);
        if (dateVal.isValid()) obj.ThoiGianKiemTraFrom = dateVal.format('DD/MM/YYYY');
        dateVal = moment(obj.ThoiGianKiemTraTo);
        if (dateVal.isValid()) obj.ThoiGianKiemTraTo = dateVal.format('DD/MM/YYYY');
        var addedRow = tableContent.row.add([num, obj.DonViCoQuanBanHanh, obj.NoiDungTrichYeu, obj.HinhThuc == null ? "" : obj.HinhThuc == false ? "Kế hoạch" : "Đột xuất", obj.DonViDuocKiemTra, obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo, obj.TomTat, obj.KhacPhuc, obj.XuLyTrachNhiem, obj.Ngaytao, obj.GhiChu, ""]).node();
        addedRow = $(addedRow)[0].cells;
        console.log(addedRow); //  For HinhThuc FileDinhKem:

        var HTCol = 3;
        if (obj.Tb8_FileDinhKem_CanCus != null && obj.Tb8_FileDinhKem_CanCus != undefined) if (obj.Tb8_FileDinhKem_CanCus.length > 0) {
          var list = obj.Tb8_FileDinhKem_CanCus;
          var ftp = $("#FileServer").val();
          var linkDiv = document.createElement('div');

          for (var i = 0; i < list.length; i++) {
            var a = document.createElement('a');
            $(a).addClass('table-link').attr("href", list[i].FileDinhKem_CanCu).attr("target", "_blank");
            var ie = document.createElement('i');
            $(ie).addClass('far fa-file-alt');
            $(a).append($(ie));
            $(linkDiv).append($(a));
          }

          $(addedRow[HTCol]).append($(linkDiv));
        } //else if (obj.Tb8_FileDinhKem_CanCus.length == 1) {
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

        var SQDCol = 5;

        if (obj.FileDinhKem_QuyetDinhThongBao != null && obj.FileDinhKem_QuyetDinhThongBao != undefined && obj.FileDinhKem_QuyetDinhThongBao != "") {
          $(addedRow[SQDCol]).empty();

          if ((obj.SoCongVan == null || obj.SoCongVan == undefined || obj.SoCongVan != "") && (obj.ThoiGianKiemTraFrom == null || obj.ThoiGianKiemTraFrom == undefined || obj.ThoiGianKiemTraFrom == "") && (obj.ThoiGianKiemTraTo == null || obj.ThoiGianKiemTraTo == undefined || obj.ThoiGianKiemTraTo == "")) {
            var _a2 = document.createElement('a');

            $(_a2).addClass("table-link").attr("href", obj.FileDinhKem_QuyetDinhThongBao);

            var _ie = document.createElement('i');

            $(_ie).addClass('far fa-file-alt');
            $(_a2).append($(_ie));
            $(addedRow[SQDCol]).append($(_a2));
          } else {
            var content = obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo;

            var _a3 = document.createElement('a');

            $(_a3).addClass("table-link").attr("href", obj.FileDinhKem_QuyetDinhThongBao).html(content);
            $(addedRow[SQDCol]).append($(_a3));
          }
        } //const TTCol = 6;


        renderSingleLink($(addedRow[6]), obj.TomTat, obj.FileDinhKem_TomTat);
        renderSingleLink($(addedRow[7]), obj.KhacPhuc, obj.FileDinhKem_KhacPhuc);
        renderSingleLink($(addedRow[8]), obj.XuLyTrachNhiem, obj.FileDinhKem_XuLyTrachNhiem);
        var acCol = 11;
        var actionDiv = $.parseHTML("<div class=\"d-flex w-100\" >\n                    <button class=\"btn btn-sm btn-data\" type=\"button\" onclick=\"editGetCallback(this)\" data-id=\"".concat(obj.Tb8_id, "\">\n                        <span style=\"color:#007bff\"><i class=\"far fa-edit\"></i></span>\n                    </button >\n                    <button class=\"btn btn-sm btn-data\" type=\"button\" onclick=\"detailsGetCallback(this)\" data-id=\"").concat(obj.Tb8_id, "\">\n                        <span style=\"color:#007bff\"><i class=\"fas fa-info-circle\"></i></span>\n                    </button >\n                    <button class=\"btn btn-sm btn-data\" type=\"button\" onclick=\"deleteGetCallback(this)\" data-id=\"").concat(obj.Tb8_id, "\">\n                        <span style=\"color:#007bff\"><i class=\"far fa-trash-alt\"></i></span>\n                    </button >\n                </div >"));
        $(addedRow[acCol]).append(actionDiv); //  Draw but remain the paging: false option

        tableContent.draw(false);
      }
    }, {
      key: "editRow",
      value: function editRow(obj) {
        //  A little different to the add API.
        //  $(editedRow)[0]
        var dateVal = moment(obj.NgayTao);
        if (dateVal.isValid()) obj.Ngaytao = dateVal.format('DD/MM/YYYY');
        dateVal = moment(obj.ThoiGianKiemTraFrom);
        if (dateVal.isValid()) obj.ThoiGianKiemTraFrom = dateVal.format('DD/MM/YYYY');
        dateVal = moment(obj.ThoiGianKiemTraTo);
        if (dateVal.isValid()) obj.ThoiGianKiemTraTo = dateVal.format('DD/MM/YYYY');
        var editedRow = tableContent.row(".selected").node();
        editedRow = $(editedRow)[0].cells; //console.log(editedRow)

        $(editedRow[1]).html(obj.DonViCoQuanBanHanh);
        $(editedRow[2]).html(obj.NoiDungTrichYeu);
        var HTCol = 3;
        $(editedRow[HTCol]).empty();
        $(editedRow[HTCol]).html(obj.HinhThuc == null ? "" : obj.HinhThuc == false ? "Kế hoạch" : "Đột xuất"); //  For HinhThuc FileDinhKem:

        if (obj.Tb8_FileDinhKem_CanCus != null && obj.Tb8_FileDinhKem_CanCus != undefined) if (obj.Tb8_FileDinhKem_CanCus.length > 0) {
          var list = obj.Tb8_FileDinhKem_CanCus; //let ftp = $("#FileServer").val();

          var linkDiv = document.createElement('div');

          for (var i = 0; i < list.length; i++) {
            var a = document.createElement('a');
            $(a).addClass('table-link').attr("href", list[i].FileDinhKem_CanCu).attr("target", "_blank");
            var ie = document.createElement('i');
            $(ie).addClass('far fa-file-alt');
            $(a).append($(ie));
            $(linkDiv).append($(a));
          }

          $(editedRow[HTCol]).append($(linkDiv));
        }
        $(editedRow[4]).html(obj.DonViDuocKiemTra);
        var SQDCol = 5;
        $(editedRow[SQDCol]).html(obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo);

        if (obj.FileDinhKem_QuyetDinhThongBao != null && obj.FileDinhKem_QuyetDinhThongBao != undefined && obj.FileDinhKem_QuyetDinhThongBao != "") {
          $(editedRow[SQDCol]).empty();

          if ((obj.SoCongVan == null || obj.SoCongVan == undefined || obj.SoCongVan != "") && (obj.ThoiGianKiemTraFrom == null || obj.ThoiGianKiemTraFrom == undefined || obj.ThoiGianKiemTraFrom == "") && (obj.ThoiGianKiemTraTo == null || obj.ThoiGianKiemTraTo == undefined || obj.ThoiGianKiemTraTo == "")) {
            var _a4 = document.createElement('a');

            $(_a4).addClass("table-link").attr("href", obj.FileDinhKem_QuyetDinhThongBao);

            var _ie2 = document.createElement('i');

            $(_ie2).addClass('far fa-file-alt');
            $(_a4).append($(_ie2));
            $(editedRow[SQDCol]).append($(_a4));
          } else {
            var content = obj.SoCongVan + "/" + obj.ThoiGianKiemTraFrom + "-" + obj.ThoiGianKiemTraTo;

            var _a5 = document.createElement('a');

            $(_a5).addClass("table-link").attr("href", obj.FileDinhKem_QuyetDinhThongBao).html(content);
            $(editedRow[SQDCol]).append($(_a5));
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
    }, {
      key: "deleteRow",
      value: function deleteRow() {
        tableContent.row(".selected").remove().draw(false);
      }
    }]);

    return Tb8_ChiTiet_TRKT_UIClass;
  }();

  return Tb8_ChiTiet_TRKT_UIClass;
}();

var UI = new Tb8_ChiTiet_TRKT_DatatableUI("#Tb8-table"); //tableGen.setTableUI(UI);//Singleton
//Datepicker:

UI.registerDatepicker(".index-datepicker"); //Datatable:

UI.registerDatatable(); //   Most importance;

UI.registerDatatableButtons("#table-buttons"); //Search bar:

UI.registerDatatableSearchBar("#search-bar-input"); //  Search date:
//  Note: the colNum is the column that the date filter apply
//  col 9: Ngaytao.

UI.registerDatatableSearchDate("#date-from-input", "#date-to-input", 9);