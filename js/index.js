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

const elementStrings = {
    // Slider
    activeSlide: 'slide--active',
    nextSlide: 'slide--next',
    prevSlide: 'slide--prev',
    curSlideNum: 'slide-num--active'
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

    $(`.${elementStrings.curSlideNum}`).text(cur+1);
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
            } else if(currentIndex === imgs.length - 2) {
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
