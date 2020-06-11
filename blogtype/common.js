var isProductMode = false;

// 사이드바

$('.side-bar').click(function () {

    $('.side-bar-bg').toggleClass('active');
    $(this).toggleClass('active');
    $('.side-bar > .menu-box > .list-1 > div').removeClass('active');

});

$('.side-bar > .menu-box').click(function (e) {
    e.stopPropagation();
});

$('.side-bar > .menu-box > .list-1 > div > .title').click(function () {

    $(this).parent().toggleClass('active');
});

$('.side-bar-bg').click(function () {

    $('.side-bar').removeClass('active');
    $(this).removeClass('active');
});

// 슬라이드 공통
$('.slider > .side-btns > div').click(function () {

    var $this = $(this);
    var index = $this.index();
    var $slider = $this.closest('.slider');
    var $slides = $slider.find('>.slides');
    var $current = $slider.find('.slides > .active');
    var $post;

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slides.find("> .slide:last-child");
        } else {
            $post = $slides.find("> .slide:first-child");
        }
    }

    $current.removeClass('active');
    $post.addClass('active');
});

function topBarSliderClickNextBtn() {
    $('.slider > .side-btns > div:nth-of-type(2)').click();
}

if (isProductMode) {
    setInterval(topBarSliderClickNextBtn, 3000);
}

$('a').click(function() {
    if ( $(this).attr('href') == '#' ) {
        return false;
    }
});
