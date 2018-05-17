$(document).ready(() => {
    const elementStrings = {
        // Slider, left-right
        curSlide: 'animated_slide--cur',
        nextSlide: 'animated_slide--next',
        prevSlide: 'animated_slide--prev',
        btnNextSlide: 'js__slide-btn--next',
        btnPrevSlide: 'js__slide-btn--prev',
    };

    const elements = {
        socialLinks: $('.social-links'), 
        banner: $(".banner")[0],
        workPreview1: $(".animated_fadeIn1"), 
        workPreview2: $(".animated_fadeIn2") 
    };

    /* -------------------------------
           sticky social links 
       ------------------------------- */
    new Waypoint({
        element: elements.banner,
        handler: function (direction) {
            if (direction == 'down') {
                elements.socialLinks.css('opacity', 1);
            }
            else {
                elements.socialLinks.css('opacity', 0);
            }
        }, offset: -elements.banner.clientHeight / 2
    });


    /* -------------------------------
        animate my work section
    ------------------------------- */
    new Waypoint({
        element: elements.workPreview1[0],
        handler: () => {
            elements.workPreview1.addClass('fadeInLeft');
        }, offset: elements.workPreview1[0].clientHeight + 60
    });

    new Waypoint({
        element: elements.workPreview2[0],
        handler: () => {
            elements.workPreview2.addClass('fadeInLeft');
        }, offset: elements.workPreview2[0].clientHeight + 60
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
