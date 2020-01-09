$(document).ready(function () {
    /**
     * Sau khi load xong hết dữ liệu mới chạy cái này
     * Author: LDDan(25/11/2019)
     * */
    var employeeJs = new EmployeeJS();
})
class EmployeeJS extends Base {
    /**
     * Hàm khởi tạo
     * Author: LDDan(25/11/2019)
     * */
    constructor() {
        super();
        this.loadData();
    };
    /**
     * Init: Có những thuộc tính riêng biệt
     * Author: LDDan(25/11/2019)
     * */
    init() {
        this.GetUrl = "/Contents/data/data.json";
        this.Data = "Customers";
        this.TableMain = "#tblEmployee";
    }

}