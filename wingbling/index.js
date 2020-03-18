console.clear();

// 헤더 함수
$('.header > .top-bar-2 > .inner > ul > li').click(function () {
    var $this = $(this);
    var index = $this.index();

    $('.header > .top-bar-2 > .contents-box').addClass('active');
    $this.siblings('.active').removeClass('active');
    $this.addClass('active');

    var $contentsBox = $('.header > .top-bar-2 > .contents-box');

    console.log($contentsBox.length);

    $contentsBox.find('> .inner > div.active').removeClass('active');
    $contentsBox.find('> .inner > div').eq(index).addClass('active');
});

$('.header > .top-bar-2').mouseleave(function () {
    var $cell = $('.header > .top-bar-2 > .inner > ul > li');
    var index = $cell.index();

    $('.header > .top-bar-2 > .contents-box').removeClass('active');
    $cell.removeClass('active');

    var $contentsBox = $('.header > .top-bar-2 > .contents-box');

    console.log($contentsBox.length);

    $contentsBox.find('> .inner > div.active').removeClass('active');
});

// 비쥬얼 배너 슬라이더 함수
$('.bn-box-1 > .inner > .cell > .slider-box > .slider > .side-btns > div').click(function () {

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

/* 기능 */
var SliderK__autoplayFunctions = [];

function SliderK__show($slider, index) {
    var $currentSlide = $slider.find('.slides > div.active');
    var $postSlide = $slider.find('.slides > div').eq(index);

    $currentSlide.removeClass('active');
    $postSlide.addClass('active');

    $slider.find('.page-nav > div.active').removeClass('active');
    $slider.find('.page-nav > div').eq(index).addClass('active');
}

function SliderK__showPrev($slider) {
    SliderK__showPost($slider, -1);
}

function SliderK__showNext($slider) {
    SliderK__showPost($slider, 1);
}

function SliderK__showPost($slider, change) {
    if (typeof $slider.attr('data-autoplay-timeout-id') != 'undefined') {
        var timeoutId = $slider.attr('data-autoplay-timeout-id') * 1;
        clearTimeout(timeoutId);

        var autoplayInterval = $slider.attr('data-autoplay-interval') * 1;

        var functionId = $slider.attr('data-autoplay-function-id');

        var timeoutId = setTimeout(SliderK__autoplayFunctions[functionId], autoplayInterval);
        $slider.attr('data-autoplay-timeout-id', timeoutId);
    }

    var $currentSlide = $slider.find('.slides > div.active');
    var $postSlide = null;
    var $firstSlide = $slider.find('.slides > div:first-child');
    var $lastSlide = $slider.find('.slides > div:last-child');

    if (change == 1) {
        $postSlide = $currentSlide.next();

        if ($postSlide.length == 0) {
            $postSlide = $firstSlide;
        }
    } else if (change == -1) {
        $postSlide = $currentSlide.prev();

        if ($postSlide.length == 0) {
            $postSlide = $lastSlide;
        }
    }

    SliderK__show($slider, $postSlide.index());
}

/* 초기화 */
function SliderK__init() {
    $('.slider-k').each(function (index, node) {
        var $slider = $(node);

        SliderK__initPageNav($slider);
        SliderK__initSideBtns($slider);
        SliderK__initAutoplay($slider);
    });
}

// 페이지 내비를 자동으로 만들어줍니다.
function SliderK__initPageNav($slider) {
    var currentIndex = $slider.find('.slides > div.active').index();
    var slidesCount = $slider.find('.slides > div').length;

    var html = '';

    for (var i = 0; i < slidesCount; i++) {
        if (i == currentIndex) {
            html += '<div class="active"></div>';
        } else {
            html += '<div></div>';
        }
    }

    html = '<div class="page-nav">' + html + '</div>';
    $slider.find('>.page-nav-box').append(html);

    $slider.find('.page-nav > div').click(function () {
        SliderK__show($slider, $(this).index());
    });
}

// 사이드 버튼에 이벤트를 겁니다.
function SliderK__initSideBtns($slider) {
    $slider.find('.side-btns > div').click(function () {
        var index = $(this).index();

        if (index == 0) {
            SliderK__showPrev($slider);
        } else {
            SliderK__showNext($slider);
        }
    });
}

function SliderK__initAutoplay($slider) {
    var autoplay = $slider.attr('data-autoplay');

    $slider.attr('data-autoplay-now-work', 'Y');

    if ($slider.attr('data-play-stop-button') !== 'Y') {
        $slider.mouseenter(function () {
            $slider.attr('data-autoplay-now-work', 'N');
        });

        $slider.mouseleave(function () {
            $slider.attr('data-autoplay-now-work', 'Y');
        });
    } else {
        var html = '<div class="autoplay-btn-box"><div class="btn-start-play">▶</div><div class="btn-stop-play">〓</div></div>';
        $slider.append(html);

        $slider.find('.btn-start-play').click(function () {
            $slider.attr('data-autoplay-now-work', 'Y');
        });

        $slider.find('.btn-stop-play').click(function () {
            $slider.attr('data-autoplay-now-work', 'N');
        });
    }

    if (autoplay != 'Y') {
        return false;
    }

    var autoplayInterval = $slider.attr('data-autoplay-interval');

    if (typeof autoplayInterval == 'undefined') {
        autoplayInterval = 3000;
    } else {
        // 문자열을 숫자화
        autoplayInterval = autoplayInterval * 1;
    }

    var autoplayDirIsLeft = $slider.attr('data-autoplay-dir') == 'left';

    var SliderK__autoplayFunctionId = SliderK__autoplayFunctions.length;

    $slider.attr('data-autoplay-function-id', SliderK__autoplayFunctionId);

    SliderK__autoplayFunctions[SliderK__autoplayFunctionId] = function () {
        console.log(SliderK__autoplayFunctionId);
        if ($slider.attr('data-autoplay-now-work') == 'Y') {
            if (autoplayDirIsLeft) {
                SliderK__showPrev($slider);
            } else {
                SliderK__showNext($slider);
            }
        } else {
            var timeoutId = setTimeout(SliderK__autoplayFunctions[SliderK__autoplayFunctionId], autoplayInterval);
            $slider.attr('data-autoplay-timeout-id', timeoutId);
        }
    };

    var timeoutId = setTimeout(SliderK__autoplayFunctions[SliderK__autoplayFunctionId], autoplayInterval);
    $slider.attr('data-autoplay-timeout-id', timeoutId);
}

SliderK__init();

// 사이드바 함수
$('.side-bar > .side-bar-tag').click(function () {

    if ($('.side-bar').hasClass('active')) {
        $('.side-bar').removeClass('active');
    } else {
        $('.side-bar').addClass('active');
    }

});

$('.side-bar > .slider-box > .slider > .side-btns > div').click(function () {

    var $this = $(this);
    var index = $this.index();
    var $slider = $this.closest('.slider');
    var $current = $slider.find('> .slides > .active');
    var $post;

    if (index == 0) {
        $post = $current.prev();
    } else {
        $post = $current.next();
    }

    if ($post.length == 0) {
        if (index == 0) {
            $post = $slider.find('>.slides > .slide:last-child');
        } else {
            $post = $slider.find('>.slides > .slide:first-child');
        }
    }
    $current.removeClass('active');
    $post.addClass('active');
});

function clickRightBtn() {

    $('.side-bar > .slider-box > .slider > .side-btns > div:nth-of-type(2)').click();

}

setInterval(clickRightBtn, 2000);
