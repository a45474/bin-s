console.clear();


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
        var html = '<div class="autoplay-btn-box"><div class="btn-start-play"><i class="fas fa-caret-square-right"></i></div><div class="btn-stop-play"><i class="fas fa-pause-circle"></i></div></div>';
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

// 탭 메뉴 함수

$('.tab-bn-box > .tab-bn > .tab-head > .row > .cell').click(function() {
    

    var index = $(this).index();
    
    $(this).addClass('active');
    $(this).siblings('.active').removeClass('active');
    
    var $tabBn = $(this).closest('.tab-bn');
    
    // console.log($tabBn.length);
    
    $tabBn.find(' > .tab-contents > .carousel-box.active').removeClass('active');
    $tabBn.find(' > .tab-contents > .carousel-box').eq(index).addClass('active');
});

$('.tab-bn > .tab-contents .owl-carousel').owlCarousel({
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
    margin:0,
    loop:true,
    pagination:false,
    items:5,
    nav:true,
    dots:false,
});

$('.tab-bn-box > .tab-bn > .tab-contents > .side-btns > div:nth-of-type(2)').click(function() {
    $('.owl-carousel').trigger('next.owl.carousel');
});

$('.tab-bn-box > .tab-bn > .tab-contents > .side-btns > div:nth-of-type(1)').click(function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
});

// 정보 배너

$('body > .slider-box > .slider > .slides > .slide').click(function () {
    
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    
});

$('body > .slider-box').mouseleave(function () {
    
     $('body >.slider-box > .slider > .slides > .slide').removeClass('active');
    
     $('body >.slider-box > .slider > .slides > .slide-4').addClass('active');
});

// 탑바
console.clear();


$('.top-bar > .inner > .main-menu > div').click(function () {
    
    var $this = $(this);
    var index = $this.index();
    
    $this.siblings('.active').removeClass('active');
    $this.addClass('active');
    
    $('.top-bar > .main-menu-contents').addClass('active');
    
    $('.top-bar > .main-menu-contents >.inner> ul > li').eq(index).addClass('active');
    $('.top-bar > .main-menu-contents >.inner> ul > li').eq(index).siblings('.active').removeClass('active');
    
});

$('.top-bar > .main-menu-contents > .inner>ul > li').mouseenter(function (){
    
    var index = $(this).index();
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    var $topBar = $(this).closest('.top-bar');
$topBar.find('>.inner > .main-menu > div').eq(index).siblings('.active').removeClass('active');   
    $topBar.find('>.inner > .main-menu > div').eq(index).addClass('active');    
    
});

$('.top-bar').mouseleave(function () {
    
    $(this).find('.main-menu-contents').removeClass('active');
    $('.top-bar > .inner > .main-menu > div').removeClass('active');
    
});

$('.top-bar > .inner > .top-bar-more-menu > div:nth-of-type(1) > span').click(function () {
    
    $(this).parent().toggleClass('active');
    
});

 $('.top-bar > .inner > .top-bar-more-menu > div:nth-of-type(1)').mouseleave(function () {
    
     $(this).removeClass('active');
    
 });

// 탑바 픽스드 전환 함수
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();

    if ( scrollTop > 150 ) {
        $('html').addClass('not-scroll-top-0');
        $('.top-bar').addClass('active');
    }
    else {
        $('html').removeClass('not-scroll-top-0');
        $('.top-bar').removeClass('active');
    }

});

// 기관 소개 배너
$('.bn-box-3 > .inner > .side-tab > div').click(function () {
    
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
});

$('.bn-box-3 > .inner > .side-tab > div > ul > li').click(function () {
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    
});


function IndexActive__show(groupCode, no) {
    $('.index-active-group-' + groupCode).removeClass('active');
    $('.index-active-group-' + groupCode + '-' + no).addClass('active');
}

// 레일 배너함수 시작

var $railSlider__carousel = $('.rail-slider-box > .inner > .rail-slider');

$railSlider__carousel.owlCarousel({
    autoplay:2000,
    margin:0,
    nav:false,
    loop:true,
    dots:true,
    responsive:{
        0:{
            items:7
        }
    }
});

// sns 메뉴 함수

$('.sns-bn > .tab-contents .owl-carousel').owlCarousel({
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:false,
    margin:0,
    loop:true,
    pagination:false,
    items:5,
    nav:true,
    dots:false,
});

$('.sns-bn-box > .sns-bn > .tab-contents > .side-btns > div:nth-of-type(2)').click(function() {
    $('.owl-carousel').trigger('next.owl.carousel');
});

$('.sns-bn-box > .sns-bn > .tab-contents > .side-btns > div:nth-of-type(1)').click(function() {
    $('.owl-carousel').trigger('prev.owl.carousel');
});

