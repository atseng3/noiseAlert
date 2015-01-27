/*global NoiseAlert, Backbone*/

NoiseAlert.Models = NoiseAlert.Models || {};

(function () {
    'use strict';

    NoiseAlert.Models.Decibel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
