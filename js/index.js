$(document).ready(function () {

    /* -------------------------------*/
    /*  for sticky navigation */
    /* ------------------------------- */
    // console.log($('.social-links'));
    var waypoint = new Waypoint({
        element: $("#header")[0],
        handler: function (direction) {
            if (direction == 'down') {
                $('.social-links').css('opacity', 1);
            }
            else {
                $('.social-links').css('opacity', 0);
            }
        }, offset: -$("#header")[0].clientHeight/2
    });
});