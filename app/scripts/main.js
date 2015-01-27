/*global NoiseAlert, $*/


window.NoiseAlert = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';

        NoiseAlert.decibels = new NoiseAlert.Collections.Decibels();

        new NoiseAlert.Views.Decibels({
            collection: NoiseAlert.decibels
        });
    }
};

$(document).ready(function () {
    'use strict';
    NoiseAlert.init();

// need to set up sound and then need to have a interval to check if the sound crosses a certain amount, 
// and then need to update the sound model, and then need to redraw the canvas

// decibel.js is the model for sound. 

// Each sound recorded is a decibel model.

// if it is loud enough then record it in the collection as the highPoints

// where should the setInterval run?




    /*
     *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
     *
     *  Use of this source code is governed by a BSD-style license
     *  that can be found in the LICENSE file in the root of the source
     *  tree.
     */

    'use strict';

    // Meter class that generates a number correlated to audio volume.
    // The meter class itself displays nothing, but it makes the
    // instantaneous and time-decaying volumes available for inspection.
    // It also reports on the fraction of samples that were at or near
    // the top of the measurement range.
    function SoundMeter(context) {
      this.context = context;
      this.instant = 0.0;
      this.slow = 0.0;
      this.clip = 0.0;
      this.script = context.createScriptProcessor(2048, 1, 1);
      var that = this;
      this.script.onaudioprocess = function(event) {
        var input = event.inputBuffer.getChannelData(0);
        var i;
        var sum = 0.0;
        var clipcount = 0;
        for (i = 0; i < input.length; ++i) {
          sum += input[i] * input[i];
          if (Math.abs(input[i]) > 0.99) {
            clipcount += 1;
          }
        }
        that.instant = Math.sqrt(sum / input.length);
        that.slow = 0.95 * that.slow + 0.05 * that.instant;
        that.clip = clipcount / input.length;
      };
    }

    SoundMeter.prototype.connectToSource = function(stream) {
      console.log('SoundMeter connecting');
      this.mic = this.context.createMediaStreamSource(stream);
      this.mic.connect(this.script);
      // necessary to make sample run, but should not be.
      this.script.connect(this.context.destination);
    };

    SoundMeter.prototype.stop = function() {
      this.mic.disconnect();
      this.script.disconnect();
    };



     // *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
     // *
     // *  Use of this source code is governed by a BSD-style license
     // *  that can be found in the LICENSE file in the root of the source
     // *  tree.
     

    /* global AudioContext, SoundMeter */

    'use strict';

    var instantMeter = document.querySelector('#instant meter');
    var slowMeter = document.querySelector('#slow meter');
    var clipMeter = document.querySelector('#clip meter');

    var instantValueDisplay = document.querySelector('#instant .value');
    var slowValueDisplay = document.querySelector('#slow .value');
    var clipValueDisplay = document.querySelector('#clip .value');

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      window.audioContext = new AudioContext();
    } catch (e) {
      alert('Web Audio API not supported.');
    }

    // Put variables in global scope to make them available to the browser console.
    var constraints = window.constraints = {
      audio: true,
      video: false
    };

    navigator.getUserMedia = navigator.getUserMedia ||
      navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    function successCallback(stream) {
      // Put variables in global scope to make them available to the browser console.
      window.stream = stream;
      var soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
      soundMeter.connectToSource(stream);

      setInterval(function() {
        if(soundMeter.slow > 0.05) {

            // array

            var num = parseFloat(soundMeter.slow.toFixed(2));

            if(NoiseAlert.decibels.highPoints.length < 3) {
                NoiseAlert.decibels.highPoints.push(num);
            } else {
                var minHighPoint = NoiseAlert.decibels.highPoints.shift(); 
                if(num > minHighPoint) {
                    NoiseAlert.decibels.highPoints.push(num);
                } else {
                    NoiseAlert.decibels.highPoints.push(minHighPoint);
                }
            }
            NoiseAlert.decibels.highPoints.sort();
            
            console.log(NoiseAlert.decibels.highPoints);

            // payload.text = soundMeter.instant.toFixed(2);
            // doCORSRequest({
            //     method: 'POST',
            //     url: api,
            //     content: 'application/json',
            //     data: JSON.stringify(payload)
            //   }, function printResult(result) {
            //     console.log(result);
            // });
        }
        // instantMeter.value = instantValueDisplay.innerText =
        //   soundMeter.instant.toFixed(2);
        // slowMeter.value = slowValueDisplay.innerText =
        //   soundMeter.slow.toFixed(2);
        // clipMeter.value = clipValueDisplay.innerText =
        //   soundMeter.clip;
      }, 200);
    }

    function errorCallback(error) {
      console.log('navigator.getUserMedia error: ', error);
    }
    navigator.getUserMedia(constraints, successCallback, errorCallback);
});