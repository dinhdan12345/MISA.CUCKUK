


$(document).ready(function () {
    // Load dữ liệu
    /* Khởi tạo 1 đối tượng*/
    customerJS = new CustomerJS();
})



class CustomerJS extends Base {

    /**
     * Hàm khởi tạo
     * Author: LDDan(25/11/2019)
     * */
    constructor() {
        super();
        this.initForm();
        this.initEvent();
        this.loadData();
        this.resizeTable();
        self = this;
    }
    /**
     * Init
     * Có những thuộc tính riêng biệt
     * Author: LDDan(25/11/2019)
     * */
    init() {
        this.GetUrl = "/Customer";
        this.Data = "Customers";
        this.TableMain = "#tblCustomer";
    }
    /**
     * Hàm gán khởi tạo các dialog
     * Author: LDDan(25/11/2019)
     * */
    initForm() {
        // Khởi tạo dialog chi tiết thông tin khách hàng
        this.FrmCustomerFromDetail = $(".form-dialog").dialog({
            autoOpen: false,
            modal: true,
            minWidth: 700,
            minHeight: 335,
            fluid: true,
            title: "Khách hàng",
            open: function () {

            }
        });
        this.FrmCustomerFromDelete = $(".dialog-delete").dialog({
            autoOpen: false,
            modal: true,
            title: "Xóa khách hàng",
            minWidth: 400,
            minHeight: 125,
            open: function () {

            }

        });
    }
    /**
     * Hàm gán khởi tạo các sự kiện
     * Author: LDDan(25/11/2019)
     * */

    initEvent() {

        $('.button-insert').click(this.add.bind(this)); // chú ý không có () sau add.
        $('.button-edit').click(this.edit.bind(this));
        $('.btn-save').click(this.save.bind(this));

        // Khởi tạo sự kiện khi click vào tr sẽ chuyển màu sau khi loaddata xong.
        $(".grid #tblCustomer tbody").on('click', " tr", function () {
            $(".button-edit,.button-delete").removeAttr("disabled");
            $(".grid #tblCustomer tbody tr").removeClass("background-tr");
            $(this).addClass("background-tr");
            self.customerCode = $(this).children(":first").text(); /*Lấy giá trị cột td thứ nhất*/
            self.customerName = $(this).children(":first").next().text(); /*Lấy giá trị cột td thứ 2*/
            self.customerID = $(this).data("recordID");
            console.log(self.customerID);
        });
        $(".btn-cancel").click(this.closeDialog.bind(this));
        $(".button-delete").click(this.showDialogDelete.bind(this));
        $(".btn-ok").click(this.deleteData.bind(this));
        $(".btn-save-add").click(this.save.bind(this));
    }
    closeDialog() {
        if (confirm("Are you sure you want to close dialog this?")) {
            this.FrmCustomerFromDetail.dialog('close');
        }

    }
    /*
     Hàm binding dữ liệu từ tr vào dialog
     Author: LDDan(17/12/2019)
     */ 
    bindData() {
        var listInput = $(".form-dialog .dialog-main input[fieldName],.form-dialog .dialog-main textarea[fieldName]");
        try {
            var data = [];
            $.ajax({
                method: "GET",
                url: "/Customer",
                success: function (data) {
                    if (data) {
                        $.each(data, function (index, items) {
                            if (items.CustomerCode == self.customerCode) {
                                $.each(listInput, function (index, value) {
                                    let fieldName = value.getAttribute("fieldName");
                                    var fieldValue;
                                    let format = value.getAttribute("format");
                                    switch (format) {
                                        case "Birthday":
                                            fieldValue = items[fieldName] ? Common.formatDate(items[fieldName]) : "";
                                            break;
                                        default:
                                            fieldValue = items[fieldName];
                                            break;
                                    }
                                    $(value).val(fieldValue);
                                })
                            }
                        });
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }

    }
    /* Hàm định dạng đúng thông tin ô input dialog và đưa ra cảnh báo khi thiếu hoặc sai thông tin ô input dialog*/
    validDate() {
        var required = $('.form-dialog .dialog-main input[fieldName]');
        $.each(required, function (index, data) {
            var fieldName = data.getAttribute("fieldName");
            switch (fieldName) {
                case "CustomerCode":
                    $('#customerCode').on({
                        blur: function () {
                            var value = $(this).val();
                            if (!value) {
                                $(this).addClass("border-red").attr("title", "Bạn chưa điền mã khách hàng");
                            }
                        },
                        focus: function () {
                            $(this).removeClass("border-red").removeAttr("title");
                        }
                    })
                    break;
                case "CustomerName":
                    $('#customerName').on({
                        blur: function () {
                            var value = $(this).val();
                            if (!value) {
                                $(this).addClass("border-red").attr("title", "Bạn chưa điền tên");;
                            }
                        },
                        focus: function () {
                            $(this).removeClass("border-red").removeAttr("title");
                        }
                    })
                    break;
                case "Tel":
                    $('#tel').on({
                        blur: function () {
                            var value = $(this).val();
                            value = value.replace(".", ""); /*làm số điện thoại 2 dấu chấm k lỗi*/
                            console.log(value.length);
                            if (!value || $.isNumeric(value) == false || value.length < 10 || value.length > 11) {
                                $(this).addClass("border-red").attr("title", "Bạn chưa điền số điện thoại ");;
                            }
                        },
                        focus: function () {
                            $(this).removeClass("border-red").removeAttr("title");
                        }
                    })
                    break;
                case "Birthday":

                    $('#birthday').on({
                        blur: function () {
                            var value = $(this).val();
                            if (Common.checkDate(value) == false) {
                                $(this).addClass("border-red").attr("title", "dd/mm/yyyy");;
                            }
                        },
                        focus: function () {
                            $(this).removeClass("border-red").removeAttr("title");
                        }
                    })
                    $("#birthday").on("change", function () {
                        $(this).removeClass("border-red").removeAttr("title");
                    })
                    $("#birthday").datepicker({
                        dateFormat: "dd/mm/yy",
                        changeMonth: true,
                        changeYear: true
                    });
                    break;
                case "Email":
                    $('#email').on({
                        blur: function () {
                            var value = $(this).val();
                            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            var bool = re.test(value);
                            if (!bool) {
                                $(this).addClass("border-red").attr("title", "Bạn chưa nhập đúng định dạng email");;
                            }
                        },
                        focus: function () {
                            $(this).removeClass("border-red").removeAttr("title");
                        }
                    })
                    break;
                default:
                    break;
            }
        })
    }
    /**
     * Hàm thực hiện build nên 1 đối tượng khách hàng từ form chi tiết
     * Created by LDDan 06/02/2019
     * */

    buildObject() {
        var property = $(".form-dialog .dialog-main input[fieldName],.form-dialog .dialog-main textarea[fieldName]");
        var object = {};
        $.each(property, function (index, item) {
            var fieldName = item.getAttribute('fieldName');
            var fieldValue = $(item).val();
            if (fieldName === "Birthday") {
                fieldValue = fieldValue ? Common.changeToDateTime(fieldValue)  : null;
                object[fieldName] = fieldValue;
            }
            else if (fieldName === "PostalCode") {
                fieldValue = fieldValue ? fieldValue : null;
                // Phải chuyển đổi sang parseInt bởi vì bên customerJS kiểu dữ liệu là decimal. lúc này nếu không chuyển kiểu n sẽ nhận về kiểu string nên không nhận được
                object[fieldName] = fieldValue;
            }
            else {
                object[fieldName] = fieldValue;
            }
        });
        return object;
    }
    /**
     * Thêm dữ liệu
     * Author:LDDan (21/11/2019)
     * */
    add() {
        $(".btn-save").prop("disabled", false);
        $(".form-dialog .dialog-main input,.form-dialog .dialog-main textarea").val("").removeClass("border-red");
        this.FrmCustomerFromDetail.Mode = 'add';
        this.FrmCustomerFromDetail.dialog('open');
        $(".ipn-disabled").prop("disabled", false);
        this.validDate();

    }

    /**
     * Xóa dữ liệu
     * Author:LDDan (21/11/2019)
     */
    deleteData() {
        if (confirm("Are you sure you want to delete this?")) {
            $.ajax({
                method: "DELETE",
                url: `/Customer/${self.customerID}`,
                success: function () {
                    me.FrmCustomerFromDelete.dialog('close');
                    me.loadData();

                }
            });
        }
        var me = this;
        
    }
    /**
     * Show dialog delete
     * Author:LDDan (21/11/2019)
     */
    showDialogDelete() {
        $(".content-delete").html(`<p> Bạn có chắc chắn muốn xóa Khách hàng << ${self.customerCode} - ${self.customerName}>> không ?</p>`);
        this.FrmCustomerFromDelete.dialog("open");

    }
    /**
     * Sửa dữ liệu
     * Author:LDDan (21/11/2019)
     */
    edit() {
        $(".form-dialog .dialog-main input,.form-dialog .dialog-main textarea").val("").removeClass("border-red");
        $(".button-edit").prop("disabled", true);
        $(".ipn-disabled").prop("disabled", true);
        this.FrmCustomerFromDetail.Mode = 'edit';
        this.FrmCustomerFromDetail.dialog('open');
        this.bindData();
        this.validDate();
    }
    /* Nút Cất */
    save() {
        var mode = this.FrmCustomerFromDetail.Mode;
        switch (mode) {
            case "add":
                var me = this;
                var object = me.buildObject();

                if (object["CustomerCode"] && object["CustomerName"] && (object["Tel"] && $.isNumeric(object["Tel"]) == true && object["Tel"].length > 9 && object["Tel"].length < 12)) {
                    $.ajax({
                        method: 'POST',
                        url: '/Customer',
                        data: JSON.stringify(object),
                        contentType: 'application/json;charset = utf-8',
                        success: function (state) {

                            console.log(JSON.stringify(state));
                            //if (state == true) {
                                me.FrmCustomerFromDetail.dialog('close');
                                me.loadData();
                            //}
                            //else {
                            //    console.log("hihi");
                            //}
                        },
                        error: function (res) {
                        }
                    });
                }
                else {
                    alert("Bạn phải điền đủ các trường bắt buộc có dấu (*) !");
                }
                break;
            case "edit":
                var me = this;
                var object = me.buildObject();
                if (object["CustomerCode"] && object["CustomerName"] && (object["Tel"] && $.isNumeric(object["Tel"]) == true && object["Tel"].length > 9 && object["Tel"].length < 12)) {
                    $.ajax({
                        method: 'POST',
                        url: `/Customer/${self.customerID}`,
                        data: JSON.stringify(object),
                        contentType: 'application/json;charset = utf-8',
                        success: function (res) {

                                me.FrmCustomerFromDetail.dialog('close');
                                me.loadData();
                            
                            
                        },
                        error: function (res) {
                        }
                    });
                }
                else {
                    alert("Bạn phải điền đủ các trường bắt buộc có dấu (*) !");
                }
                break;
            default:
                break;
        }

    }
    /* Hàm sửa dữ liệu 
     * Createdby: LDDAN (10/12/2019)
     * */
    updateData() {

    }
    /*Resize Table*/
    resizeTable() {

        var startX, startWidth, $handle, $table, pressed = false;

        // mousedown
        $('#tblCustomer .resize-bar').on('mousedown', function (event) {
            // find index of 'td' in 'tr'
            let index = $(this).parent().index();
            // find 'th' according to the index value
            $handle = $(this).parents('table').find('th').eq(index);
            pressed = true;
            startX = event.pageX;
            startWidth = $handle.width();
            $table = $handle.closest('#tblCustomer').addClass('resizing');
        });

        // mousemove
        $('#tblCustomer  th, #tblCustomer  td').on('mousemove', function (event) {
            if (pressed) {
                $handle.css("min-width",(startWidth + (event.pageX - startX)));
            }
        });

        // mouseup
        $('#tblCustomer  th, #tblCustomer  td').on('mouseup', function () {
            if (pressed) {
                $table.removeClass('resizing');
                pressed = false;
            }
        });

        // reset column width
        $('#tblCustomer  thead').on('dblclick', function () {
            // Reset column sizes on double click
            $(this).find('th').css('width', '');
        });
    }
}