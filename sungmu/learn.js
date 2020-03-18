$('.page > .inner > .contents > .tab-box > .tab').click(function () {


    var $textBox = $(this).next();
    var $tab = $(this).siblings('.tab');
    
    $(this).toggleClass('active');
    $textBox.toggleClass('active');
    $tab.toggleClass('hidden');
    
});
