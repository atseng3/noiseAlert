/*global NoiseAlert, $*/


window.NoiseAlert = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        new NoiseAlert.Views.Decibels({
            collection: new NoiseAlert.Collections.Decibels()
        });
    }
};

$(document).ready(function () {
    'use strict';
    NoiseAlert.init();
});