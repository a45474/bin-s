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
    fitImagesInViewport:true
})