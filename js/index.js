$(document).ready(function () {

    /* -------------------------------*/
    /*  for sticky navigation */
    /* ------------------------------- */
    var waypoint = new Waypoint({
        element: $("nav")[0],
        handler: function (direction) {
            if (direction == 'down') {
                $('.social-links').css('opacity', 1);
            }
            else {
                $('.social-links').css('opacity', 0);
            }
        }, offset: 110
    });
});