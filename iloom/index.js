console.clear();

// 탑바 스크롤 함수 시작
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 250) {
        $('html').addClass('not-scroll-top-0');
    } else {
        $('html').removeClass('not-scroll-top-0');
    }
});
// 탑바 스크롤 함수 끝


// 팝업메뉴함수 시작
$(".top-bar > .menu-1 > .btn").click(function () {

    // alert("hi");
    var $btn_menu = $(".popup-menu");
    var $btn_menu = $(".popup-menu");
    var scrollTop = $(window).scrollTop();

    $btn_menu.addClass('active');
    $(".popup-bg").addClass('active');

    return false;

});


function btnMenuClose() {
    var $btn_menu = $(".popup-menu");

    $btn_menu.removeClass('active');
    $(".popup-bg").removeClass('active');

    return false;
}

$(".popup-bg").click(btnMenuClose);

$(".popup-menu > .close-btn").click(btnMenuClose);

// 팝업메뉴함수 끝


// 슬라이드바 함수 시작
$(".iloom-main-slider > .side-btn > .btn").click(function () {

    var totalSlideNo = $('.iloom-main-slider > .slides > .slide').length;

    $('.iloom-main-slider').attr('date-total-items', totalSlideNo);

    $('.iloom-main-slider > .slides > .slide').each(function (index, node) {
        $(node).attr('data-no', index + 1);
    });

    var currentSlideNo = $('.iloom-main-slider > .slides > .slide.active').attr('data-no');

    $('.iloom-main-slider > .slide-counter > .total-slide-no').html(totalSlideNo);
    $('.iloom-main-slider > .slide-counter > .current-slide-no').html(currentSlideNo);

    // console.log("슬라이더의 갯수 = " + $(".iloom-main-slider > .slides > .slide").length);

    var $this = $(this);
    var index = $this.index;
    var $slider = $this.closest(".slider");

    // console.log("가장 가까운 슬라이더 몸체의 갯수 = " + $slider.length);

    var $slides = $slider.find("> .slides");

    // console.log($slides.length);

    var $current = $slides.find("> .active");

    // console.log("지금 보이는 슬라이드의 갯수 = " + $current.length);

    var $post;

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slides.find("> div:last-child");
        } else {
            $post = $slides.find("> div:first-child");
        }
    }

    $current.removeClass("active");
    $post.addClass("active");

});


function slideMoveNext() {
    $(".iloom-main-slider > .side-btn > .btn:nth-of-type(2)").click();
}

setInterval(slideMoveNext, 3000);
// 슬라이드바 함수 끝


// 탑바 검색창 팝업 함수 시작
$('.top-bar > .search-box > .search-ico').click(function () {

    $('.top-bar > .search-popup').addClass('active');
    return false;

});

$('.top-bar > .search-popup').mouseleave(function () {

    $('.top-bar .search-popup').removeClass('active');

});


// 탑바 검색창 팝업 함수 끝
