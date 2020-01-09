class Common {
    /**
     * Định giá ngày tháng năm
     * author: Lê Đình Dần (22/11/2019)
     *  
     */
    static formatDate( date) {
        date = new Date(date);
        var dateString = date.getDate();
        if (dateString < 10) {
            dateString = "0" + dateString;
        }
        var monthString = date.getMonth() + 1; // Vì hàm getMonth() có index bắt đầu từ 0
        if (monthString < 10) {
            monthString = "0" + monthString;
        }
        var yearString = date.getFullYear();
        return date = dateString + "/" + monthString + "/" + yearString;
    }
    /*Hàm check kiểm tra ngày tháng nhập vào input có chuẩn định dạng dd/mm/yyyy */
    static checkDate(strDate) {
        var comp = strDate.split('/')
        var d = parseInt(comp[0], 10)
        var m = parseInt(comp[1], 10)
        var y = parseInt(comp[2], 10)
        var date = new Date(y, m - 1, d);
        if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
            return true
        }
        return false
    }
    static changeToDateTime = function (date) {
        var arr = date.split("/");
        var day = parseInt(arr[0])+1;
        var month = parseInt(arr[1])-1;
        var year = parseInt(arr[2]);
        //var day = parseInt(date.substring(0, 2));
        //var month = parseInt(date.substring(3, 5)) - 1;/*Lỗi 4: nhập dialog 05/06/1998 ->> 04/07/1998*/
        //var year = parseInt(date.substring(6, 10));
        var dob = new Date(year, month, day);
        return dob;
    }
}