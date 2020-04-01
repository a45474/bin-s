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
            $('html').attr('data-current-index', 1);
            $('.page-1').addClass('active');
            $('.page-1').addClass('visited');
        }
    });
});

$('.page > .inner > .contents > ul > li').click(function () {
    $(this).toggleClass('active');
    $(this).siblings().toggleClass('hidden');
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
        autoplay:false, // 오토 플레이
        loop:true, // 끝에서 다시 처음으로 시작
        dots:false,
        margin:0,
        stagePadding:200,
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
        navText:['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
        responsive:{
            0:{
                items:5
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