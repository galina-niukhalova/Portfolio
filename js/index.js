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