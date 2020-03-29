$('.top-bar > .inner > .right-menu-list > .cell').click(function () {
    
    $(this).toggleClass('active');
    

});

$('.top-bar > .inner > .right-menu-list > .cell-right').click(function () {

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
            $('html').attr('data-current-index', i);
            var ref = page[i].attr("data-section-name");
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");

        },
        afterRender: function () {
            $(".pagination-box a").on("click", $.scrollify.move);
        }
    });
});

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

function nextBtnClick () {
    $('.slider-box > .slider > .side-btns > div:nth-of-type(2)').click();
}

setInterval(nextBtnClick, 5000);
