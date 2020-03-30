$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 350) {
        $('html').addClass('not-scroll-top-0');
    } else {
        $('html').removeClass('not-scroll-top-0');
    }

});

$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 150) {
        $('html').addClass('not-scroll-top-0');
        $('.top-bar').addClass('active');
    } else {
        $('html').removeClass('not-scroll-top-0');
        $('.top-bar').removeClass('active');
    }

});

$('.top-bar > .inner > .row:nth-of-type(1) > .cell').click(function () {

    $(this).parent().toggleClass('active');

});

$('.top-bar > .inner > .right-box > .cell:nth-of-type(1) > .btn').click(function () {

    $(this).parent().toggleClass('active');

});


$('.top-bar > .inner > .right-box > .cell:nth-of-type(2)').click(function () {

    $('.popup-bg').addClass('active');
    $('.popup-all-menu').addClass('active');

});

$('.popup-all-menu > .close-btn').click(function () {
    $('.popup-bg').removeClass('active');
    $('.popup-all-menu').removeClass('active');
});

$('.popup-bg').click(function () {
    $('.popup-bg').removeClass('active');
    $('.popup-all-menu').removeClass('active');
});


$(function () {
    $.scrollify({
        section: ".page",
        updateHash: true,
        touchScroll: true,
        setHeights: false,
        interstitialSection: ".footer",
        before: function (i, page) {
            $(".page.active").removeClass('active');
            page[i].addClass('active');
            page[i].addClass('visited');
            $('html').attr('data-current-index', i);

            var ref = page[i].attr("data-section-name");
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");

        },
        afterRender: function () {
            $(".pagination-box a").on("click", $.scrollify.move);
            $('.top-bar > .inner > .row > .cell > ul > li > a').on("click", $.scrollify.move);
            $('.popup-all-menu > div > ul > li > ul > li > a').on("click", $.scrollify.move);
            $('html').attr('data-current-index', 0);
            $('.page-0').addClass('active');
            $('.page-0').addClass('visited');
        }
    });
});

//
//$(function () {
//    $.scrollify({
//        section: ".page",
//        updateHash: true,
//        touchScroll: true,
//        setHeights: false,
//        interstitialSection: ".footer",
//        before: function (i, page) {
//            $(".page.active").removeClass('active');
//        
//        page[i].addClass('active');
//        page[i].addClass('visited');
//            $('html').attr('data-current-index', i);
//            var ref = page[i].attr("data-section-name");
//            $(".pagination .active").removeClass("active");
//            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
//
//        },
//        afterRender: function () {
//            $(".pagination-box a").on("click", $.scrollify.move);
//            $('html').attr('data-current-index', 0);
//            $('.page-0').addClass('active');
//            $('.page-0').addClass('visited');
//        }
//    });
//});

$('.slider-box > .slider > .side-btns > div').click(function () {
    var $this = $(this);
    var index = $this.index();
    var $slider = $this.closest('.slider');
    var $slides = $slider.find('> .slides');
    var $current = $slider.find('> .slides > div.active');
    var $post;

    // console.log($slider.length);

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slides.find(':last-child');
        } else {
            $post = $slides.find(':first-child');
        }
    }

    $current.removeClass('active');
    $post.addClass('active');
});

function nextBtnClick() {
    $('.slider-box > .slider > .side-btns > div:nth-of-type(2)').click();
}

setInterval(nextBtnClick, 5000);

$('a').click(function () {
    if ($(this).attr('href') == '#') {
        return false;
    }
});
