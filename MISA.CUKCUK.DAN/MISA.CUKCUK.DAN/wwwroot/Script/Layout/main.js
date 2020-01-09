$(document).ready(function () {
    mainJs = new Main();
});

class Main {
    constructor() {
        this.initEvent();
    }
    initEvent() {
        $('.user-state').click(this.showAccountActionMenu);
        $('button.filter-btn').click(this.activeButtonFilterSelected);
        $('button.filter-btn').blur(this.deactiveButtonFilterSelected);
        $(document).click(function () {
            $('.hide-outside-click').hide();
        });
    }
    activeButtonFilterSelected() {
        $('button.filter-btn').removeClass('filter-btn-active');
        this.classList.add('filter-btn-active');
    }
    deactiveButtonFilterSelected() {
        this.classList.remove('filter-btn-active');
    }
    /**
     * Hiển thị menu của tài khoản người dùng khi nhấn vào thông tin người dùng
     * Author: LDDAN (17/11/2019)
     * */
    showAccountActionMenu() {
        $(this).find('.account-action-box').show();
        event.stopPropagation();
    }
}