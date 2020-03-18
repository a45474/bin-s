$('.page > .inner > .contents > ul > li').click(function () {
    $(this).toggleClass('active');
    $(this).siblings().toggleClass('hidden');
});