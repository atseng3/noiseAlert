/*global NoiseAlert, Backbone*/

NoiseAlert.Collections = NoiseAlert.Collections || {};

(function () {
    'use strict';

    NoiseAlert.Collections.Decibels = Backbone.Collection.extend({

    		highPoints: [],

        model: NoiseAlert.Models.Decibels

    });

})();
