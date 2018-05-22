$(document).ready(() => {
    const elementStrings = {
        // Slider, left-right
        curSlide: 'animated_slide--cur',
        nextSlide: 'animated_slide--next',
        prevSlide: 'animated_slide--prev',
        btnNextSlide: 'js__slide-btn--next',
        btnPrevSlide: 'js__slide-btn--prev',

        // Navi
        stickyNavi: 'sticky',
        activeNaviItem: 'nav-item--active',
        navItem: 'nav-item',
        navCheckbox: 'nav-menu--checkbox',

        // Projects
        project: 'project',
        projectPreview: 'project-preview',
        projectAnimation: 'fadeInLeft'
    };

    const elements = {
        socialLinks: $('.social-links'),
        banner: $(".banner")[0],
        content: $('#content'),

        // Navi
        nav: $("nav")[0],
        navList: $('.nav-list'),
        navSocialList: $('.contacts-navi'),
        navMobileMenu: $('.nav-menu'),
        navAboutMe: $('#nav-about-me'),
        navWork: $('#nav-work'),
        navEducation: $('#nav-education'),

        // Sections
        sectionAbout: $('#about-me'),
        sectionWork: $('#work'),
        sectionEducation: $('#education'),

        // Education
        slideNum: $(".slide-nums--num")
    };

    // toggle mobile menu
    $(elements.navMobileMenu).on('click', ({ target }) => {
        const navCheckbox = target.closest(`.${elementStrings.navCheckbox}`);
        if (navCheckbox) {
            $(navCheckbox)[0].checked ? showMobileMenu() : closeMobileMenu();
        }

    });

    elements.navList.on('click', ({ target }) => {
        const navItem = target.closest(`.${elementStrings.navItem}`);
        if (navItem) {
            if ($(`.${elementStrings.navCheckbox}`)[0].checked) {
                $(`.${elementStrings.navCheckbox}`)[0].checked = false;
                closeMobileMenu();
            }

            setActiveNaviItem(navItem);
        }
    });

    const closeMobileMenu = () => {
        $(elements.navList).addClass('nav-list--close');
        $(elements.navList).removeClass('nav-list--open');
    };

    const showMobileMenu = () => {
        $(elements.navList).addClass('nav-list--open');
        $(elements.navList).removeClass('nav-list--close');
    }

    /* -------------------------------
        On scroll
    ------------------------------- */
    $(window).scroll(() => {
        const offset = $('nav').height();
        const pagePosition = $(document).scrollTop() + offset;


        // Sticky navi, social links
        const contentPosition = $('#content').offset().top +
            parseInt(elements.content.css('padding-top').replace('px', ''));

        if (pagePosition >= contentPosition) {
            $(elements.nav).addClass(elementStrings.stickyNavi);
            elements.content.css('padding-top', $(elements.nav).height());
            elements.socialLinks.css('opacity', 1);
        }
        else {
            $(elements.nav).removeClass(elementStrings.stickyNavi);
            elements.content.css('padding-top', 0);
            elements.socialLinks.css('opacity', 0);
        }


        // Change active navi
        const aboutMePosition = elements.sectionAbout.offset().top;
        const workPosition = elements.sectionWork.offset().top;
        const educationPosition = elements.sectionEducation.offset().top;


        if (pagePosition + $(window).height() >= $(document).height() || pagePosition > educationPosition) {
            setActiveNaviItem(elements.navEducation)
        } else if (pagePosition > workPosition && pagePosition <= educationPosition) {
            setActiveNaviItem(elements.navWork);
        } else if (pagePosition > aboutMePosition && pagePosition <= workPosition) {
            setActiveNaviItem(elements.navAboutMe);
        } else {
            clearActiveNavi();
        }


        // Animated projects preview
        const projects = Array.from($(`.${elementStrings.project}`));
        projects.forEach(project => {
            if (pagePosition + $(window).height() > $(project).offset().top + $(project).height() / 2)
                $(project).find(`.${elementStrings.projectPreview}`).addClass(elementStrings.projectAnimation);
        });
    });

    const clearActiveNavi = () => {
        $(`.${elementStrings.activeNaviItem}`).removeClass(elementStrings.activeNaviItem);
    };

    const setActiveNaviItem = (item) => {
        clearActiveNavi();
        $(item).addClass(elementStrings.activeNaviItem);
    };


    /* ---------------- 
         Slide show 
       ---------------- */
    $('.js__slide-show').on('click', ({ target }) => {
        const btnNext = target.closest(`.${elementStrings.btnNextSlide}`);
        if (btnNext) switchSlide('next');

        const btnPrev = target.closest(`.${elementStrings.btnPrevSlide}`);
        if (btnPrev) switchSlide('prev');
    });

    const switchSlide = dir => {
        const imgs = Array.from($('.slider').children());
        const activeSlide = $(`.${elementStrings.curSlide}`),
            nextSlide = $(`.${elementStrings.nextSlide}`),
            prevSlide = $(`.${elementStrings.prevSlide}`);


        const { cur, prev, next } = findElementIndex(dir, imgs, imgs.indexOf(activeSlide[0]));

        // Clear
        activeSlide.removeClass(elementStrings.curSlide);
        nextSlide.removeClass(elementStrings.nextSlide);
        prevSlide.removeClass(elementStrings.prevSlide);

        // Active new
        $(imgs[cur]).addClass(elementStrings.curSlide);
        $(imgs[prev]).addClass(elementStrings.prevSlide);
        $(imgs[next]).addClass(elementStrings.nextSlide);

        $(elements.slideNum).text(cur + 1);
    };

    const findElementIndex = (dir, imgs, currentIndex) => {
        const result = {};

        switch (dir) {
            case 'prev':
                result.next = currentIndex;
                if (currentIndex === 0) {
                    result.cur = imgs.length - 1,
                        result.prev = imgs.length - 2;
                } else if (currentIndex - 1 === 0) {
                    result.cur = 0;
                    result.prev = imgs.length - 1;
                } else {
                    result.cur = currentIndex - 1,
                        result.prev = currentIndex - 2;
                }
                break;
            case 'next':
                result.prev = currentIndex;

                if (currentIndex === imgs.length - 1) {
                    result.cur = 0;
                    result.next = 1;
                } else if (currentIndex === imgs.length - 2) {
                    result.cur = currentIndex + 1;
                    result.next = 0;
                } else {
                    result.cur = currentIndex + 1;
                    result.next = currentIndex + 2;
                }
                break;
        }

        return result;
    };

    /* ------------------------------- 
      Smothy scroll on nav menu  
   ------------------------------- */
    $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            event.preventDefault();
            const target = $(this.hash);
            if (target) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 53
                }, 1000);
            }
        });

    const clipboard = {};
    ['social-link--email', 'navi--email', 'footer--email']
        .forEach(id => {
            const clipboard = new ClipboardJS(`#${id}`);
            clipboard.on('success', function (e) {
                const btn = $(`#${id}`).closest('.email-tooltip');

                $(btn).attr('tooltip', 'My email address has been copied to your clipboard.');
                $(btn).addClass('email-tooltip--success');

                $(btn).mouseleave(() => {
                    setTimeout(() => {
                        $(btn).attr('tooltip', 'Click to copy my email address to your clipboard.');
                        $(btn).removeClass('email-tooltip--success');
                    }, 300);
                });

                e.clearSelection();
            });
        });


    $('.btn-certificate').on('click', (e) => {
        e.preventDefault();
        $('.popup-img').attr('src', $(e.target).data('img-path'));
        $('.certificate-popup').addClass('certificate-popup--open');
    });

    $('.popup-btn-close').on('click', () => {
        $('.certificate-popup').removeClass('certificate-popup--open');
    })
});







