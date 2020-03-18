console.clear();

// 탑바1
var $topBarCell8_a = $('.header > .top_bar_1 > .top_bar_1_inner > .row > .cell:nth-of-type(8) > a');

var $topBarCell8 = $('.header > .top_bar_1 > .top_bar_1_inner > .row > .cell:nth-of-type(8)');

$topBarCell8_a.click(function () {
    if ( $topBarCell8.hasClass('active') ) {
        $topBarCell8.removeClass('active');
    }
    else {
        $topBarCell8.addClass('active');
    }
});

$topBarCell8.mouseleave(function () {
    
    $topBarCell8.removeClass('active');
});


// 탑바3

$('.header > .top_bar_3').mouseenter(function () {
    
    $('.header > .top_bar_3').addClass('active');
    
});


$('.header > .top_bar_3').mouseleave(function () {
    
    $('.header > .top_bar_3').removeClass('active');
    
});

$('.header > .top_bar_2 > .top_bar_2_inner > .right-menu-box > .center-box > div:nth-of-type(3)').click(function () {
    
    if ($(this).hasClass('active')) {
         $(this).removeClass('active');
         
    }
    else {
        $(this).addClass('active'); 
    }
    
});

$('.header > .top_bar_2 > .top_bar_2_inner > .right-menu-box > .center-box > div:nth-of-type(3)').mouseleave(function () {
    
    $(this).parent().removeClass('active');
    
});
// 헤더 함수 끝

// 스크롤 다운 버튼 함수 시작
$('.page > .scroll-down-btn').click(function () {
    $ .scrollify.next ();
});

$(function() {
    $.scrollify({
        section:".page",
        updateHash: true,
        touchScroll: true,
        setHeights: false,
        interstitialSection:".footer",
        before:function(i,page) {
            $('html').attr('data-current-index', i);
            var ref = page[i].attr("data-section-name");
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
        },
        afterRender:function() {
            $(".pagination-box a").on("click", $.scrollify.move);
        }
    });
});

// 푸터 슬라이더 함수
function Carousel1__onTranslated() {
    $('.footer > .inner > .carousel-1 > .owl-carousel').trigger('play.owl.autoplay');
    
    $('.footer > .inner > .carousel-1').attr('data-carousel-1-autoplay-status', 'Y');
}

$('.footer > .inner > .carousel-1 > .owl-carousel').owlCarousel({
    autoplay:true, // 오토 플레이
    autoplayTimeout:3000, // 오토 플레이 시에 다음 슬라이드로 넘어가는 주기, 2초
    loop:true, // 끝에서 다시 처음으로 시작
    margin:0,
    nav:true,
    navText:[],
    items:5,
    autoplayHoverPause:false, /* 필수 */
    onTranslated: Carousel1__onTranslated,
    dots:false,
});

$('.footer > .inner > .carousel-1 .play').on('click',function(){
    $('.carousel-1 > .owl-carousel').trigger('play.owl.autoplay');
    
    $('.carousel-1').attr('data-carousel-1-autoplay-status', 'Y');
});

$('.footer > .inner > .carousel-1 .stop').on('click',function(){
    $('.carousel-1 > .owl-carousel').trigger('stop.owl.autoplay');
    
    $('.carousel-1').attr('data-carousel-1-autoplay-status', 'N');
});


// 푸터 리스트1 함수
$(".footer > .inner > .list-1 > .row > .cell").click(function () {
    $(this).addClass('active');
});

$(".footer > .inner > .list-1 > .row > .cell").mouseleave(function () {
    $(this).removeClass('active');
});

// 슬라이더-k
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
    if ( typeof $slider.attr('data-autoplay-timeout-id') != 'undefined' ) {
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
    
    if ( change == 1 ) {
        $postSlide = $currentSlide.next();
        
        if ( $postSlide.length == 0 ) {
            $postSlide = $firstSlide;
        }
    }
    else if ( change == -1 ) {
        $postSlide = $currentSlide.prev();
        
        if ( $postSlide.length == 0 ) {
            $postSlide = $lastSlide;
        }
    }
    
    SliderK__show($slider, $postSlide.index());
}

/* 초기화 */
function SliderK__init() {
    $('.slider-k').each(function(index, node) {
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
        
    for ( var i = 0; i < slidesCount; i++ ) {
        if ( i == currentIndex ) {
            html += '<div class="active"></div>';
        }
        else {
            html += '<div></div>';
        }
    }

    html = '<div class="page-nav">' + html + '</div>';
    $slider.append(html);
    
    $slider.find('.page-nav > div').click(function() {
        SliderK__show($slider, $(this).index());
    });
}

// 사이드 버튼에 이벤트를 겁니다.
function SliderK__initSideBtns($slider) {
    $slider.find('.side-btns > div').click(function() {
        var index = $(this).index();
        
        if ( index == 0 ) {
            SliderK__showPrev($slider);
        }
        else {
            SliderK__showNext($slider);
        }
    });
}

function SliderK__initAutoplay($slider) {
    var autoplay = $slider.attr('data-autoplay');
    
    $slider.attr('data-autoplay-now-work', 'Y');
    
    if ( $slider.attr('data-play-stop-button') !== 'Y' ) {
        $slider.mouseenter(function() {
            $slider.attr('data-autoplay-now-work', 'N');
        });

        $slider.mouseleave(function() {
            $slider.attr('data-autoplay-now-work', 'Y');
        });
    }
    else {
        var html = '<div class="autoplay-btn-box"><div class="btn-start-play"></div><div class="btn-stop-play"></div></div>';
        $slider.append(html);
        
        $slider.find('.btn-start-play').click(function() {
            $slider.attr('data-autoplay-now-work', 'Y');
        });

        $slider.find('.btn-stop-play').click(function() {
            $slider.attr('data-autoplay-now-work', 'N');
        });
    }
    
    if ( autoplay != 'Y' ) {
        return false;
    }
    
    var autoplayInterval = $slider.attr('data-autoplay-interval');
    
    if ( typeof autoplayInterval == 'undefined' ) {
        autoplayInterval = 3000;
    }
    else {
        // 문자열을 숫자화
        autoplayInterval = autoplayInterval * 1;
    }
    
    var autoplayDirIsLeft = $slider.attr('data-autoplay-dir') == 'left';
    
    var SliderK__autoplayFunctionId = SliderK__autoplayFunctions.length;
    
    $slider.attr('data-autoplay-function-id', SliderK__autoplayFunctionId);
    
    SliderK__autoplayFunctions[SliderK__autoplayFunctionId] = function() {
        console.log(SliderK__autoplayFunctionId);
        if ( $slider.attr('data-autoplay-now-work') == 'Y' ) {
            if ( autoplayDirIsLeft ) {
                SliderK__showPrev($slider);
            }
            else {
                SliderK__showNext($slider);
            }
        }
        else {
            var timeoutId = setTimeout(SliderK__autoplayFunctions[SliderK__autoplayFunctionId], autoplayInterval);
            $slider.attr('data-autoplay-timeout-id', timeoutId);
        }
    };
    
    var timeoutId = setTimeout(SliderK__autoplayFunctions[SliderK__autoplayFunctionId], autoplayInterval);
    $slider.attr('data-autoplay-timeout-id', timeoutId);
}

SliderK__init();

$('a').click(function() {
    if ( $(this).attr('href') == '#' ) {
        return false;
    }
})
