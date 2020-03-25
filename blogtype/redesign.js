$(function () {
    $.scrollify({
        section: ".page",
        updateHash: true,
        touchScroll: true,
        scrollbars:false,
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
            $('html').attr('data-current-index', 1);
            $('.page-1').addClass('active');
            $('.page-1').addClass('visited');
        }
    });
});

