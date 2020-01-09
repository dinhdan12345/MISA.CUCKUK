class Base {
    /**
     * Hàm khởi tạo
     * Author: LDDan(25/11/2019)
     * */
    constructor() {
        this.init();
        self = this;
    }

    init() {
        this.GetUrl = "";
        this.Data = "";
        this.TableMain = "";
    }
    /**
     * LoadData: Hàm load dữ liệu chung cho nhiều bảng
     * Author: LDDan(25/11/2019)*/
    // Code trước khi chưa dùng api, lấy dữ liệu là data.json
    //loadData() {
    //    var me = this;
    //    $.getJSON(me.GetUrl, function (data) {
    //        if (data && data[me.Data]) {
    //            var th = $(".grid th");
    //            $.each(data[me.Data], function (index, customer) {
    //                var tr = $(`<tr></tr>`).data("recordID", customer.CustomerID); // Mỗi lần duyệt một đối tượng trong customer sẽ tạo một thẻ tr
    //                $.each(th, function (index, value) {
    //                    var fieldName = value.getAttribute("fieldName");
    //                    var fieldValue = customer[fieldName];
    //                    fieldValue = fieldValue || "";
    //                    var format = value.getAttribute("format");
    //                    var type = value.getAttribute("type");
    //                    /*
    //                     Format tiền và ngày sinh theo đúng định dạng
    //                     */
    //                    switch (format) {
    //                        case "Date":
    //                            fieldValue = fieldValue ? Common.formatDate(fieldValue) : "";
    //                            break;
    //                        case "Money":
    //                            if (fieldValue == 0) {
    //                                fieldValue = "";
    //                            }
    //                            else {
    //                                fieldValue = parseFloat(fieldValue).toLocaleString();
    //                            }
    //                            break;
    //                        default:
    //                            break;
    //                    }
    //                    if (type) {
    //                        /*
    //                        Xử lý căn text: Phải với tiền, Trái với string, giữa với ngày sinh
    //                        */
    //                        switch (type) {
    //                            case "text":
    //                                tr.append(`<td class="type-text text-ellipsis" title="${fieldValue}">${fieldValue}</td>`)
    //                                break;
    //                            case "number":
    //                                tr.append(`<td class="type-money text-ellipsis" title="${fieldValue}">${fieldValue}</td>`)
    //                                break;
    //                            case "Date":
    //                                tr.append(`<td class="type-date text-ellipsis" title="${fieldValue}" >${fieldValue}</td>`)
    //                                break;
    //                            case "check":
    //                                tr.append(`<td><input type="checkbox" class="check" ` + (fieldValue == true ? "checked" : "") + ` /></td>`)
    //                            default:
    //                                break;
    //                        }
    //                    }
    //                });

    //                $(`.grid ` + me.TableMain + ` tbody`).append(tr);
    //            });
               

    //        };
    //    });

    //}

    loadData() {
        var me = this;
        var data = [];
        $(".grid #tblCustomer tbody").html(`<td colspan="12" style="background: url('/Contents/images/loadmask/loading.gif') no-repeat center;  height: 753px;margin-top:150px;margin-left:350px;"></td>`)
        $.ajax({
            method: "GET",
            url: "/Customer",
            success: function (data) {
                if (data) {
                    $(`.grid ` + me.TableMain + ` tbody`).html(""); // Để mỗi lần khi load lại sẽ xóa đi và load lại. Nếu không sẽ append vào sau
                        var th = $(".grid th");
                    $.each(data, function (index, customer) {
                        var tr = $(`<tr></tr>`).data("recordID", customer["CustomerID"]); // Mỗi lần duyệt một đối tượng trong customer sẽ tạo một thẻ tr
                            $.each(th, function (index, value) {
                                var fieldName = value.getAttribute("fieldName");
                                var fieldValue = customer[fieldName];
                                fieldValue = fieldValue || ""; // fieldValue có thì sẽ lấy giá trị nếu không có sẽ để trống
                                var format = value.getAttribute("format");
                                var type = value.getAttribute("type");
                                /*
                                 Format tiền và ngày sinh theo đúng định dạng
                                 */
                                switch (format) {
                                    case "Date":
                                        fieldValue = fieldValue ? Common.formatDate(fieldValue) : "";
                                        break;
                                    case "Money":
                                        if (fieldValue == 0) {
                                            fieldValue = "";
                                        }
                                        else {
                                            fieldValue = parseFloat(fieldValue).toLocaleString();
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                if (type) {
                                    /*
                                    Xử lý căn text: Phải với tiền, Trái với string, giữa với ngày sinh
                                    */
                                    switch (type) {
                                        case "text":
                                            tr.append(`<td class="type-text text-ellipsis" title="${fieldValue}">${fieldValue}<div class="resize-bar"></div></td>`)
                                            break;
                                        case "number":
                                            /* Nếu tiền không có giá trị thì default sẽ là 0*/
                                            fieldValue = fieldValue || 0;
                                            tr.append(`<td class="type-money text-ellipsis" title="${fieldValue}">${fieldValue}<div class="resize-bar"></div></td>`)
                                            break;
                                        case "Date":
                                            tr.append(`<td class="type-date text-ellipsis" title="${fieldValue}" >${fieldValue}<div class="resize-bar"></div></td>`)
                                            break;
                                        case "check":
                                            tr.append(`<td><input type="checkbox" class="check" ` + (fieldValue > 0 ? "checked" : "") + ` /><div class="resize-bar"></div></td>`)
                                        default:
                                            break;
                                    }
                                }
                            });

                            $(`.grid ` + me.TableMain + ` tbody`).append(tr);
                        });
                    };
                    
            },
            error: function (res) {
                console.log(res);
            }
        });
    }
    

}