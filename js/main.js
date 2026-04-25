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
    
    // All menu items with their images
    var allMenuItems = [
        { src: 'img/plain.png', alt: 'Plain' },
        { src: 'img/banana.png', alt: 'Banana' },
        { src: 'img/strawberries.png', alt: 'Strawberries' },
        { src: 'img/strawberr-nana.png', alt: 'Strawberr-Nana' },
        { src: 'img/blueberries.png', alt: 'Blueberries' },
        { src: 'img/mixed berries.png', alt: 'Mixed Berries' },
        { src: 'img/ham n cheese croffle.png', alt: 'Ham & Cheese' },
        { src: 'img/pizza.png', alt: 'Pizza Croffle' },
        { src: 'img/fruit cup.png', alt: 'Fruit Cup' },
        { src: 'img/ice cream.png', alt: 'Ice Cream Scoop' }
    ];
    
    var menuGalleryIndex = 0;

    function renderMenuGalleryImage() {
        if (!allMenuItems.length) {
            return;
        }

        var item = allMenuItems[menuGalleryIndex];
        $menuLightboxImg.attr({
            src: item.src,
            alt: item.alt
        });

        $menuLightboxMeta.text((menuGalleryIndex + 1) + ' / ' + allMenuItems.length);
    }

    function stepMenuGallery(step) {
        if (!allMenuItems.length) {
            return;
        }

        menuGalleryIndex = (menuGalleryIndex + step + allMenuItems.length) % allMenuItems.length;
        renderMenuGalleryImage();
    }

    function closeMenuImageLightbox() {
        $menuLightbox.removeClass('is-open').attr('aria-hidden', 'true');
        $('body').removeClass('menu-lightbox-open');
        $menuLightboxImg.attr('src', '');
        $menuLightboxMeta.text('');
        menuGalleryIndex = 0;
    }

    $('#menu .tab-content .flex-shrink-0 img').on('click', function () {
        var imageSrc = $(this).attr('src');
        
        // Find the clicked image in allMenuItems array
        var clickedIndex = -1;
        for (var i = 0; i < allMenuItems.length; i++) {
            if (allMenuItems[i].src === imageSrc) {
                clickedIndex = i;
                break;
            }
        }
        
        // If found, set the index; otherwise default to 0
        if (clickedIndex !== -1) {
            menuGalleryIndex = clickedIndex;
        } else {
            menuGalleryIndex = 0;
        }
        
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

