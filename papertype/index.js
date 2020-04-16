console.clear();

$('body > .paper').mouseover(function () {
    
    $(this).parent().addClass('paper-hover');
});

$('body > .paper').mouseout(function () {
    
    $(this).parent().removeClass('paper-hover');
});

lightbox.option({
    resizeDuration: 300,
    wrapAround: true,
    disableScrolling: false,
    fitImagesInViewport:false
})

$('.paper > .inner > .body > .cell:nth-of-type(1) > .cell-inner > .graphic-design > .body > .cell > .img-box').click(function () {
    
    
    $(this).siblings('.active').removeClass('active');
    $(this).toggleClass('active');
    $('.popup-bg').toggleClass('active');
    
});

$('.popup-bg').click(function () {
    
    $('.paper > .inner > .body > .cell:nth-of-type(1) > .cell-inner > .graphic-design > .body > .cell > .img-box').removeClass('active');
    $(this).removeClass('active');
    
});