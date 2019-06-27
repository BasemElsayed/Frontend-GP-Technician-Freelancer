/*global $, alert, console*/

$(function () {
    "use strict";
    var winHeight = $(window).height(),
        navBar = $('.navbar').innerHeight();

    $('.carousel-inner .content').height(winHeight - navBar);

});

