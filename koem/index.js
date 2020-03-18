console.clear();

// 페이지시작될때효과
$(document).ready(function () {
    
    $('.page-1 > .main-slider-box > .main-slider > .text-box > .title > span').addClass('active');
    
    $('.page-1 > .main-slider-box > .main-slider > .text-box > .text').addClass('active');
    
});


// 스크롤 다운 버튼 함수
$('.page-1 > .main-slider-box > .main-slider > .scroll-down-btn').click(function () {
    
    $('html, body').animate({scrollTop: '800'}, 500);
    
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
    
    var $textBox = $slider.find('> .text-box');
    
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
        $textBox.append(html);
        
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
// 메인배너 함수 끝


// 배너1(탭배너) 함수
$(".tab-bn > .contents > .owl-carousel-box > .owl-carousel").owlCarousel({
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    margin: 0,
    loop: true,
    pagination: false,
    items: 5,
    nav: true,
    navText:[],
    dots: false
});

$(".tab-bn-box > .tab-bn > .head > div").click(function() {
    
    var index = $(this).index();
    
    $(this).addClass('active');
    $(this).siblings('.active').removeClass('active');
    
    var $tabBn = $(this).closest('.tab-bn');
    
    // console.log($tabBn.length);
    
    $tabBn.find(' > .contents > div').removeClass('active');
    $tabBn.find(' > .contents > div').eq(index).addClass('active');
    
});

$(".tab-bn-box > .side-btn > div").click(function () {
    
    
});
// 배너1(탭배너) 함수 끝


// 카운트 슬라이드 함수 시작
$('.page-1 > .slider-box > .slider > .right-box > .btn-box > .img-box').click(function () {
    
    function counteSlider__countNo () {
    
    var totalSlideNo = $('.page-1 > .slider-box > .counte-slider .slide').length;
    $('.page-1 > .slider-box > .counte-slider').attr('date-total-items', totalSlideNo);
    
    $('.page-1 > .slider-box > .counte-slider .slide').each(function (index, node) {
        $(node).attr('data-no',index+1);
    });
    
    var currentSlideNo = $('.page-1 > .slider-box > .counte-slider .slide.active').attr('data-no');
    
    $('.page-1 > .slider-box > .counte-slider > .right-box > .slide-counter > .total-slide-no').html(totalSlideNo);
    $('.page-1 > .slider-box > .counte-slider > .right-box > .slide-counter > .current-slide-no').html(currentSlideNo);
    
}
    
    // console.log('hi');
    
    var $this = $(this);
    var index = $this.index();
    
    // console.log(index);
    
    var $slider = $this.closest('.page-1 > .slider-box > .slider');
    
    // console.log($slider.length);
    
    var $current = $slider.find('> .slide-box > .slides > .active');
    
    // console.log($current.length);
    
    var $post;
    
    if ( index == 0 ) {
        $post = $current.prev();
    }
    else {
        $post = $current.next();
    }
    
    if ( $post.length == 0 ) {
        if ( index == 0 ) {
        $post = $slider.find('> .slide-box > .slides > .slide:last-child');
        }
        else {
            $post = $slider.find('> .slide-box > .slides > .slide:first-child');
        }
    }
    
    $current.removeClass('active');
    $post.addClass('active');
    
    counteSlider__countNo();
    
});

function clickRightBtn () {
    
    $('.page-1 > .slider-box > .notice-slider > .right-box > .btn-box > .img-box:nth-of-type(2)').click();
    
}

setInterval(clickRightBtn, 2000);
// 카운트 슬라이드 함수 끝

// sns 배너함수
var $snsBnSliderOwl = $('.sns-bn-slider-box > .sns-bn-slider  > .owl-carousel');
$snsBnSliderOwl.owlCarousel({
    items:7,
    loop:true,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    nav:true,
    navText:["좌","우"],
    dots:false,
});


// 미디어배너 함수시작

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
    var $btn_box = $slider.parent().find('> .title > .btn-box');
    
    $btn_box.find('> .side-btns > div').click(function() {
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
    
    var $btn_box = $slider.parent().find('> .title > .btn-box');
    
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
        var html = '<div class="autoplay-btn-box"><div class="btn-start-play" style="display:none;"></div><div class="btn-stop-play"></div></div>';
        $btn_box.append(html);
        
        $btn_box.find('> .autoplay-btn-box > .btn-start-play').click(function() {
            $slider.attr('data-autoplay-now-work', 'Y');
            
            $btn_box.find('> .autoplay-btn-box > .btn-start-play').hide();
            $btn_box.find('> .autoplay-btn-box > .btn-stop-play').show();
        });

        $btn_box.find('> .autoplay-btn-box > .btn-stop-play').click(function() {
            $slider.attr('data-autoplay-now-work', 'N');
            $btn_box.find('> .autoplay-btn-box > .btn-start-play').show();
            $btn_box.find('> .autoplay-btn-box > .btn-stop-play').hide();
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

// 미디어배너 함수 끝



// 레일 배너함수 시작

var $railSlider__carousel = $('.page-1 > .rail-slider-box > .rail-slider');

$railSlider__carousel.owlCarousel({
    autoplay:2000,
    margin:8,
    nav:true,
    loop:true,
    dots:false,
    responsive:{
        0:{
            items:7
        }
    }
});

$('.page-1 > .rail-slider-bn-box > .left-prev-btn').click(function() {
    $railSlider__carousel.trigger('prev.owl.carousel');
});

$('.page-1 > .rail-slider-bn-box > .right-next-btn').click(function() {
    $railSlider__carousel.trigger('next.owl.carousel');
});


var windowWidth = $(window).width();


if ( windowWidth > 1665 ) {
    
    $railSlider__carousel.trigger('stop.owl.autoplay');
    
    }
else {
    
    $railSlider__carousel.trigger('play.owl.autoplay',[2000]);
    
}

// 레일 배너 함수 끝


// 푸터 함수 시작

$('.footer > .menu-box-2 > .menu-box-2-inner > .copyright > .link-list > .local-site-box').click(function () {
    
    alert('hi');
    var $this = $(this);
    
    // console.log('hi');
    
    if ($this.hasClass('active')) {
        $(this).removeClass('active');
    }
    else {
        $(this).addClass('active');
    }
    
});

// 푸터 함수 끝



// 헤더 함수 시작
// 탑바 픽스드 전환 함수
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    
    if ( scrollTop > 150 ) {
        $('html').addClass('not-scroll-top-0');
        $('.header').addClass('active');
    }
    else {
        $('html').removeClass('not-scroll-top-0');
        $('.header').removeClass('active');
    }
    
});


// 탑바 2차 메뉴 나오는 함수
$('.header > .top-bar > .inner > .main-menu-box > ul > li' ).hover(function () {
    
    var $this = $(this);
    var index = $this.index();
    
    console.log(index);
    
    $('.header').addClass('active');
    $('.header > .contents').addClass('active');
    $('.header > .contents > .inner > div.active').removeClass('active');
    $('.header > .contents > .inner > div').eq(index ).addClass('active');
    
});

$('.header > .contents').mouseleave(function () {
    
    $('.header > .contents.active').removeClass('active');
    $('.header.active').removeClass('active');
    
});

// 전체메뉴 함수

console.clear();

function popupClose () {
    $(".popup-bg").removeClass('active');
    $(".popup-menu-box").removeClass('active');   
}

function popupActive () {
    $(".popup-bg").addClass('active');
    $(".popup-menu-box").addClass('active');   
}

$(".popup-bg").click(popupClose);
$(".popup-menu-box .close-btn").click(popupClose);


$('.header > .top-bar > .inner > .ico-menu-box > ul > li:nth-of-type(3) > .ico-box').click(popupActive);



// 모바일 팝업 함수

$('.popup-mobile > .body > .side-bar > ul > li > a').click( function () {
    
    var $this = $(this);
    var $body = $this.closest('.body');
    var index = $this.parent().index();
    
    $this.parent().addClass('active');
    $this.parent().siblings('.active').removeClass('active');
    
    var $contentsPage = $($body.find('> .contents > ul').eq(index));
    
    $contentsPage.siblings('.active').removeClass('active');
    $contentsPage.addClass('active');
    
});

$('.popup-mobile > .body > .contents > ul > li > a').click( function () {
    
    var $this = $(this);
    var $parent = $this.parent();
    
    if ( $parent.hasClass('active') ) {
        $parent.removeClass('active');
    }
    else {
        $parent.siblings('.active').removeClass('active');
        $parent.addClass('active');
    }
    
});
// 헤더 함수 끝

// 페이지1 끝
// 페이지2 시작

$('a').click(function() {
    if ( $(this).attr('href') == '#' ) {
        return false;
     }
 });

// 메인 배너
$(document).ready(function () {
    
    $('body > .page-2 > .main-bn > .anymation-img').addClass('active');
    
});

// 주요업무 배너
$('.business-bn-box > .business-bn > .contents > .bn-list > .bn').hover(function () {
    
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    
});

// 레일슬라이드
console.clear();

var $railSlider__carousel = $('.rail-slider-box > .rail-slider');

$railSlider__carousel.owlCarousel({
    autoplay:true,
    margin:8,
    nav:true,
    loop:true,
    dots:false,
    responsive:{
        0:{
            items:7
        }
    }
});

$('.rail-slider-bn-box > .left-prev-btn').click(function() {
    $railSlider__carousel.trigger('prev.owl.carousel');
});

$('.rail-slider-bn-box > .right-next-btn').click(function() {
    $railSlider__carousel.trigger('next.owl.carousel');
});


var windowWidth = $(window).width();


if ( windowWidth > 1665 ) {
    console.log('hi');
    $railSlider__carousel.trigger('stop.owl.autoplay');
    
    }
else {
    
    $railSlider__carousel.trigger('play.owl.autoplay',[2000]);
    
}



// 푸터
$('.footer > .menu-box-2 > .menu-box-2-inner > .copyright > .link-list > .local-site-box').click(function () {
    
    var $this = $(this);
    
    // console.log('hi');
    
    if ($this.hasClass('active')) {
        $(this).removeClass('active');
    }
    else {
        $(this).addClass('active');
    }
    
});


// 사이드바
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    
    if ( scrollTop > 350 ) {
        $('html').addClass('not-scroll-top-0');
    }
    else {
        $('html').removeClass('not-scroll-top-0');
    }
    
});

$('.side-bar > ul > .arrow-btn').click(function () {
    
    var $this = $(this);
    var $sideBar = $this.closest('.side-bar');
    
    $sideBar.siblings('.active').removeClass('active');
    $sideBar.addClass('active');
    
    if ($('body').hasClass('active')) {
        $('body').removeClass('active');
    }
    else {
        $('body').addClass('active');
    }
    
});

