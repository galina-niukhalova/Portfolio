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

    // navi position
    const positionNavi = () => {
        // debugger
        const margin = $(elements.nav).width() -  1200;
        if(margin > 0) $(elements.navSocialList).css('margin-right', margin/2);
        else $(elements.navSocialList).css('margin-right', '1rem');
    };
    positionNavi();

    /* -------------------------------
        On scroll
    ------------------------------- */
    $(window).scroll(() => {
        const offset = 50;
        const pagePosition = $(document).scrollTop() + offset;


        // Sticky navi, social links
        const contentPosition = elements.content.offset().top;
        const padding = parseInt(elements.content.css('padding-top').replace('px', ''));

        if (pagePosition >= contentPosition + padding) {
            $(elements.nav).addClass(elementStrings.stickyNavi);
            elements.content.css('padding-top', $(elements.nav).height());
            elements.socialLinks.css('opacity', 1);
        } else {
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
            if (pagePosition + $(window).height() > $(project).offset().top + $(project).height()/2)
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


    elements.navList.on('click', ({ target }) => {
        setActiveNaviItem(target);
    });


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
});
