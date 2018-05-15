$(document).ready(function () {

    /* -------------------------------*/
    /*  for sticky navigation */
    /* ------------------------------- */
    console.log($(".banner")[0].clientHeight)
    var waypoint = new Waypoint({
        element: $(".banner")[0],
        handler: function (direction) {
            if (direction == 'down') {
                $('.social-links').css('opacity', 1);
            }
            else {
                $('.social-links').css('opacity', 0);
            }
        }, offset: -$(".banner")[0].clientHeight/2
    });
});


    /* ------------------------------- */
    /*  Animation on scroll  */
    /* ------------------------------- */

    var waypoint = new Waypoint({
        element: $(".js--wp-1")[0],
        handler: () => {
            $(".js--wp-1").addClass('animated fadeInLeft');
        }, offset: 'bottom-in-view'
        // }, offset: $(".js--wp-1")[0].clientHeight
    });

    var waypoint = new Waypoint({
        element: $(".js--wp-2")[0],
        handler: () => {
            $(".js--wp-2").addClass('animated fadeInRight');
        }, offset: 'bottom-in-view'//, offset: $(".js--wp-2")[0].clientHeight
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