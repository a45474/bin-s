console.clear();


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
        var html = '<div class="autoplay-btn-box"><div class="btn-start-play"><i class="fas fa-caret-right"></i></div><div class="btn-stop-play"><i class="fas fa-stop"></i></div></div>';
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

// 스크롤 다운 버튼 함수 시작
$('.page > .scroll-down-btn').click(function () {
    $ .scrollify.next ();
});


// 페이지3
console.clear();


$('.page >.inner > .contents > .tab-box > .tab-box-btn').click(function () {
    $(this).parent().find('> .tab-list').toggleClass('active');
    
});

$('.page >.inner > .contents > .tab-box > .tab-list > .tab').click(function () {
 
    var $this=$(this);
    var index = $this.index();
    var $contetns = $this.parent().parent().parent();
    var $currentTabContents = $contetns.find('> .tab-contents-box > .contents.active');
    var $postTabContents = $contetns.find('> .tab-contents-box > .contents').eq(index);
    
    $currentTabContents.removeClass('active');
    $postTabContents.addClass('active');
});


function Carousel1__onTranslated() {
    $('.carousel-1 > .owl-carousel').trigger('play.owl.autoplay');
    
    $('.carousel-1').data('carousel-1-autoplay-status', 'Y');
    
    var no = $('.carousel-1 .owl-item.active > .item').attr('data-no') * 1;
    
    var menuItemVisible = $('.carousel-2 .owl-item.active > .item[data-no="' + no + '"]').length == 1;
    
    if ( menuItemVisible == false ) {
        $('.carousel-2 > .owl-carousel').trigger('to.owl.carousel', [no - 1, 0]);
    }
    
    $('.carousel-2 .owl-item > .item.active').removeClass('active');
    $('.carousel-2 .owl-item > .item[data-no="' + no + '"]').addClass('active');
}

function Carousel1__init() {
    // 데이터 개수 적어두기
    var totalItemNo = $('.carousel-1 .item').length;
    $('.carousel-1').data('total-items', totalItemNo);
    
    // 각 아이템에 번호 매기기
    $('.carousel-1 .item').each(function(index, node) {
        $(node).attr('data-no', index + 1);
    });
    
    $('.carousel-1 > .owl-carousel').owlCarousel({
        autoplay:true, // 오토 플레이
        loop:true, // 끝에서 다시 처음으로 시작
        dots:false,
        margin:0,
        stagePadding:50,
        nav:true,
        navText:['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive:{
            0:{
                items:1
            }
        },
        autoplayHoverPause:false, /* 필수 */
        onTranslated: Carousel1__onTranslated,
    });

    $('.carousel-1 .play').on('click',function(){
        $('.carousel-1 > .owl-carousel').trigger('play.owl.autoplay');

        $('.carousel-1').data('carousel-1-autoplay-status', 'Y');
    });

    $('.carousel-1 .stop').on('click',function(){
        $('.carousel-1 > .owl-carousel').trigger('stop.owl.autoplay');

        $('.carousel-1').data('carousel-1-autoplay-status', 'N');
    });
}

Carousel1__init();

/* 캐러셀 2 */
function Carousel2__itemClicked(el) {
    var $el = $(el);
    
    var no = $el.attr('data-no') * 1;
    var currentNo = $('.carousel-1 .owl-item.active > .item').attr('data-no') * 1;
    
    console.log('no : ' + no);
    console.log('currentNo : ' + currentNo);
 
    if ( no != currentNo ) {
        $('.carousel-1 > .owl-carousel').trigger('to.owl.carousel', [no - 1, 100]);
    }
}

function Carousel2__onTranslated() {
    $('.carousel-2 > .owl-carousel').trigger('play.owl.autoplay');
    
    $('.carousel-2').data('carousel-2-autoplay-status', 'Y');
}

function Carousel2__init() {
    // 데이터 개수 적어두기
    var totalItemNo = $('.carousel-2 .item').length;
    $('.carousel-2').data('total-items', totalItemNo);
    
    // 각 아이템에 번호 매기기
    $('.carousel-2 .item').each(function(index, node) {
        $(node).attr('data-no', index + 1);
    });
    
    $('.carousel-2 > .owl-carousel').owlCarousel({
        autoplay:false, // 오토 플레이
        loop:true, // 끝에서 다시 처음으로 시작
        margin:0,
        dots:false,
        nav:false,
        responsive:{
            0:{
                items:6
            }
        },
        autoplayHoverPause:false, /* 필수 */
        onTranslated: Carousel2__onTranslated,
    });

    $('.carousel-2 .play').on('click',function(){
        $('.carousel-2 > .owl-carousel').trigger('play.owl.autoplay');

        $('.carousel-2').data('carousel-2-autoplay-status', 'Y');
    });

    $('.carousel-2 .stop').on('click',function(){
        $('.carousel-2 > .owl-carousel').trigger('stop.owl.autoplay');

        $('.carousel-2').data('carousel-2-autoplay-status', 'N');
    });
}

Carousel2__init();
