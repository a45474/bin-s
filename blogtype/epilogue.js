
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
            
            $('.first-menu-1 .second-menu a').each(function(index, node) {
                var $node = $(node);
                var href = $node.attr('href').trim().replace('./epilogue.html', '');
                
                $node.attr('href', href);
            });
            
            $('.first-menu-1 .second-menu a').on("click", $.scrollify.move);
            $('.first-menu-1 .second-menu a').on("click", function() {
                $('.side-bar-bg').click();
            });
            
            $('html').attr('data-current-index', 0);
            $('.page-0').addClass('active');
            $('.page-0').addClass('visited');
        }
    });
});

