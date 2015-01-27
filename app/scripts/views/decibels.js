/*global NoiseAlert, Backbone, JST*/

NoiseAlert.Views = NoiseAlert.Views || {};

(function () {
    'use strict';

    NoiseAlert.Views.Decibels = Backbone.View.extend({

        el: '#decibels-user-input',

        template: JST['app/scripts/templates/decibels.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'submit form': 'submitForm'
        },

        submitForm: function(event) {
            event.preventDefault();
            
        },

        initialize: function () {
            // this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            this.$el.html(this.template());
        }

    });

})();
