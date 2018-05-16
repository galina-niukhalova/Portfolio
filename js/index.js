$(document).ready(function () {

    /* -------------------------------*/
    /*  for sticky navigation */
    /* ------------------------------- */
    var waypoint = new Waypoint({
        element: $(".banner")[0],
        handler: function (direction) {
            if (direction == 'down') {
                $('.social-links').css('opacity', 1);
            }
            else {
                $('.social-links').css('opacity', 0);
            }
        }, offset: -$(".banner")[0].clientHeight / 2
    });

});


/* ------------------------- */
/* -- Animation on scroll -- */
/* ------------------------- */
var waypoint = new Waypoint({
    element: $(".js--wp-1")[0],
    handler: () => {
        $(".js--wp-1").addClass('animated fadeInLeft');
    }, offset: $('.js--wp-1')[0].clientHeight
});

var waypoint = new Waypoint({
    element: $(".js--wp-2")[0],
    handler: () => {
        $(".js--wp-2").addClass('animated fadeInRight');
    }, offset: $('.js--wp-2')[0].clientHeight
});

var waypoint = new Waypoint({
    element: $(".js--wp-3")[0],
    handler: () => {
        $(".js--wp-3").addClass('animated fadeInLeft');
    }, offset: $(".js--wp-3")[0].clientHeight
});

var waypoint = new Waypoint({
    element: $(".js--wp-4")[0],
    handler: () => {
        $(".js--wp-4").addClass('animated fadeInRight');
    }, offset: $(".js--wp-4")[0].clientHeight
});



/* ---------------- */
/* -- Slide show -- */
/* ---------------- */
$('.slide-show').on('click', ({ target }) => {
    const targetClass = target.getAttribute("class");

    if (targetClass) {
        if (targetClass.includes('next')) switchSlide('next');
        if (targetClass.includes('prev')) switchSlide('prev');
    }
});

$('.slide-show1').on('click', ({ target }) => {
    const targetClass = target.getAttribute("class");

    if (targetClass) {
        if (targetClass.includes('next')) switchSlide1('next');
        if (targetClass.includes('prev')) switchSlide1('prev');
    }
});

$('.slide-show2').on('click', ({ target }) => {
    const targetClass = target.getAttribute("class");

    if (targetClass) {
        if (targetClass.includes('next')) switchSlide2('next');
        if (targetClass.includes('prev')) switchSlide2('prev');
    }
});

const elementStrings = {
    // Slider, left-right, left
    activeSlide: 'slide--active',
    nextSlide: 'slide--next',
    prevSlide: 'slide--prev',

    // Slider top-bottom, both
    activeSlide1: 'slide--active1',
    nextSlide1: 'slide--next1',
    prevSlide1: 'slide--prev1',

    // Slider top-bottom, left
    activeSlide2: 'slide--active2',
    nextSlide2: 'slide--next2',
    prevSlide2: 'slide--prev2'
}


const switchSlide = dir => {
    const imgs = Array.from($('.slider').children());
    const activeSlide = $(`.${elementStrings.activeSlide}`),
        nextSlide = $(`.${elementStrings.nextSlide}`),
        prevSlide = $(`.${elementStrings.prevSlide}`);


    const { cur, prev, next } = findElementIndex(dir, imgs, imgs.indexOf(activeSlide[0]));

    // Clear
    activeSlide.removeClass(elementStrings.activeSlide);
    nextSlide.removeClass(elementStrings.nextSlide);
    prevSlide.removeClass(elementStrings.prevSlide);

    // Active new
    $(imgs[cur]).addClass(elementStrings.activeSlide);
    $(imgs[prev]).addClass(elementStrings.prevSlide);
    $(imgs[next]).addClass(elementStrings.nextSlide);
}

const switchSlide1 = dir => {
    const imgs = Array.from($('.slider1').children());
    const activeSlide = $(`.${elementStrings.activeSlide1}`),
        nextSlide = $(`.${elementStrings.nextSlide1}`),
        prevSlide = $(`.${elementStrings.prevSlide1}`);


    const { cur, prev, next } = findElementIndex(dir, imgs, imgs.indexOf(activeSlide[0]));

    // Clear
    activeSlide.removeClass(elementStrings.activeSlide1);
    nextSlide.removeClass(elementStrings.nextSlide1);
    prevSlide.removeClass(elementStrings.prevSlide1);

    // Active new
    $(imgs[cur]).addClass(elementStrings.activeSlide1);
    $(imgs[prev]).addClass(elementStrings.prevSlide1);
    $(imgs[next]).addClass(elementStrings.nextSlide1);
}


const switchSlide2 = dir => {
    const imgs = Array.from($('.slider2').children());
    const activeSlide = $(`.${elementStrings.activeSlide2}`),
        nextSlide = $(`.${elementStrings.nextSlide2}`),
        prevSlide = $(`.${elementStrings.prevSlide2}`);


    const { cur, prev, next } = findElementIndex(dir, imgs, imgs.indexOf(activeSlide[0]));

    // Clear
    activeSlide.removeClass(elementStrings.activeSlide2);
    nextSlide.removeClass(elementStrings.nextSlide2);
    prevSlide.removeClass(elementStrings.prevSlide2);

    // Active new
    $(imgs[cur]).addClass(elementStrings.activeSlide2);
    $(imgs[prev]).addClass(elementStrings.prevSlide2);
    $(imgs[next]).addClass(elementStrings.nextSlide2);
}

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

window.findElementIndex = findElementIndex;
