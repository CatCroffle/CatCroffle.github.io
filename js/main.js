(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });

    // Single-page nav highlight + animated scroll
    var $sectionLinks = $('.navbar .navbar-nav .nav-link[href^="#"]');

    function setActiveNavByScroll() {
        var scrollTop = $(window).scrollTop();
        var scrollPos = scrollTop + 130;
        var currentId = 'home';

        // When near page bottom, force the last section (Contact) active.
        if (scrollTop + $(window).height() >= $(document).height() - 2) {
            var lastHref = $sectionLinks.last().attr('href');
            if (lastHref) {
                currentId = lastHref.substring(1);
            }

            $sectionLinks.removeClass('active');
            $sectionLinks.filter('[href="#' + currentId + '"]').addClass('active');
            return;
        }

        $sectionLinks.each(function () {
            var targetId = $(this).attr('href');
            var $target = $(targetId);

            if ($target.length && scrollPos >= $target.offset().top) {
                currentId = targetId.substring(1);
            }
        });

        $sectionLinks.removeClass('active');
        $sectionLinks.filter('[href="#' + currentId + '"]').addClass('active');
    }

    $sectionLinks.on('click', function (e) {
        var targetId = $(this).attr('href');
        var $target = $(targetId);

        if (!$target.length) {
            return;
        }

        // Close mobile dropdown when a nav link is clicked
        var $collapse = $('#navbarCollapse');
        if ($collapse.hasClass('show')) {
            $collapse.collapse('hide');
        }

        e.preventDefault();
        $('html, body').animate({
            scrollTop: $target.offset().top - 90
        }, 200, 'easeInOutExpo');

        $sectionLinks.removeClass('active');
        $(this).addClass('active');
    });

    $(window).on('scroll', setActiveNavByScroll);
    setActiveNavByScroll();

    // Menu image lightbox
    var $menuLightbox = $('#menuImageLightbox');
    var $menuLightboxImg = $('#menuImageLightboxImg');
    var $menuLightboxMeta = $('#menuImageLightboxMeta');
    var menuGalleryItems = [];
    var menuGalleryAlt = 'Menu item image';
    var menuGalleryIndex = 0;

    function renderMenuGalleryImage() {
        if (!menuGalleryItems.length) {
            return;
        }

        $menuLightboxImg.attr({
            src: menuGalleryItems[menuGalleryIndex],
            alt: menuGalleryAlt
        });

        $menuLightboxMeta.text((menuGalleryIndex + 1) + ' / ' + menuGalleryItems.length);
    }

    function stepMenuGallery(step) {
        if (!menuGalleryItems.length) {
            return;
        }

        menuGalleryIndex = (menuGalleryIndex + step + menuGalleryItems.length) % menuGalleryItems.length;
        renderMenuGalleryImage();
    }

    function closeMenuImageLightbox() {
        $menuLightbox.removeClass('is-open').attr('aria-hidden', 'true');
        $('body').removeClass('menu-lightbox-open');
        $menuLightboxImg.attr('src', '');
        $menuLightboxMeta.text('');
        menuGalleryItems = [];
        menuGalleryIndex = 0;
    }

    $('#menu .tab-content .flex-shrink-0 img').on('click', function () {
        var fallbackAlt = $(this).closest('.d-flex').find('h5').first().text().trim();
        var imageAlt = $(this).attr('alt') || fallbackAlt || 'Menu item image';
        var imageSrc = $(this).attr('src');

        // Temporary gallery implementation: duplicate the same image.
        menuGalleryItems = [imageSrc, imageSrc, imageSrc];
        menuGalleryAlt = imageAlt;
        menuGalleryIndex = 0;
        renderMenuGalleryImage();

        $menuLightbox.addClass('is-open').attr('aria-hidden', 'false');
        $('body').addClass('menu-lightbox-open');
    });

    $('#menuImageLightboxClose').on('click', closeMenuImageLightbox);
    $('#menuImageLightboxPrev').on('click', function () { stepMenuGallery(-1); });
    $('#menuImageLightboxNext').on('click', function () { stepMenuGallery(1); });

    $menuLightbox.on('click', function (e) {
        if (e.target === this) {
            closeMenuImageLightbox();
        }
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $menuLightbox.hasClass('is-open')) {
            closeMenuImageLightbox();
            return;
        }

        if (!$menuLightbox.hasClass('is-open')) {
            return;
        }

        if (e.key === 'ArrowLeft') {
            stepMenuGallery(-1);
        } else if (e.key === 'ArrowRight') {
            stepMenuGallery(1);
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 450, 'swing');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

