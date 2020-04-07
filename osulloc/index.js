console.clear();

$('.header>.top-bar-2>.inner>ul>li').mouseenter(function () {
    
    var index = $(this).index();
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    $('.top-bar-2-contents').addClass('active');
    $('.top-bar-2-contents').find('>.inner > ul > li.active').removeClass('active');
    $('.top-bar-2-contents').find('>.inner > ul > li').eq(index).addClass('active');
    
});

$('.top-bar-2-contents > .inner > ul > li').mouseenter(function (){
    var index = $(this).index();
    // console.log(index);
    $(this).siblings('.active').removeClass('active');
    $(this).addClass('active');
    
    $('.top-bar-2').find('>.inner > ul > li.active').removeClass('active');
    $('.top-bar-2').find('>.inner > ul > li').eq(index).addClass('active');
    
});

$('.header').mouseleave(function () {
    
    $('.top-bar-2-contents').removeClass('active');
     $('.top-bar-2').find('>.inner > ul > li.active').removeClass('active');
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
    $slider.find('>.progress-bar').append(html);
    
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
        $slider.find('.progress-bar').append(html);
        
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
        // console.log(SliderK__autoplayFunctionId);
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
});


function My1__updateCurrentPageNumber(event) {
    var totalItemNo = $('.carousel').data('total-items');
    var visibleItemsCount = $('.carousel').data('visible-items-count');
    var currentItemNo = parseInt($('.carousel >.owl-carousel > .owl-stage-outer > .owl-stage > .owl-item.active > .item').attr('data-no'));
    
    $('.carousel .item-counter .total-item-no').text(totalItemNo);
    $('.carousel .item-counter .current-item-no').text(currentItemNo);
    
    var widthP = currentItemNo / (totalItemNo - visibleItemsCount + 1) * 100;
    
    $('.carousel').parent().attr('data-current-item-is-first', currentItemNo == 1 ? 'Y' : 'N');
    $('.carousel').parent().attr('data-current-item-is-last', widthP == 100 ? 'Y' : 'N');
    
    $('.carousel > .indicator > div').stop().animate({width:widthP + '%'}, 300);
}

function My1__init() {
    // 전체 개수 세팅해서 `.my-1`의 `date-total-items` 속성에 값 넣기
    $('.carousel').each(function(index, node) {
        var $my1 = $(node);
        
        var totalItemNo = $my1.find(' .item').length;
        $my1.data('total-items', totalItemNo);

        // 각 아이템에 번호 매기기
        $my1.find('.item').each(function(index, node) {
            $(node).attr('data-no', index + 1);
        });

        var visibleItemsCount = parseInt($my1.attr('data-visible-items-count'));
        $my1.data('visible-items-count', visibleItemsCount);

        $my1.find(' > .owl-carousel').owlCarousel({
            // rewind:true,
            loop:false,
            nav:false,
            autoplay: false,
            dots:false,
            navText:['좌', '우'],
            singleItem : true,
            responsive:{
                0:{
                    items:visibleItemsCount
                },
            },
            animateOut: 'fadeOut',
            onInitialized: My1__updateCurrentPageNumber,
            onTranslated: My1__updateCurrentPageNumber,
        });
    });
}

My1__init();

$('.side-btns > div').click(function () {
    
    var index = $(this).index();
    
    // alert(index);
    
    if (index == 0) {
        $('.owl-carousel').trigger('prev.owl.carousel');
    }
    else {
        $('.owl-carousel').trigger('next.owl.carousel');
    }
    
});

// 푸터
$('.footer > .mobile-info-bar > .inner > div:nth-of-type(1) > .cell-right > .lang-btn').click(function () {
    
    $(this).parent().toggleClass('active');
    
});

$('.footer > .mobile-info-bar > .inner > div:nth-of-type(2) > div:nth-of-type(1) > .copyright-btn').click(function () {
    
     $(this).parent().toggleClass('active');
    
});

