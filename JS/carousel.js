(function (global, doc,  _) {
  'use strict';
  
  // globally accessible variables;
  var all_sliders = [];
  var btn_prev = _.el('.btn-prev');
  var btn_next = _.el('.btn-next');
  // stores number of slider user wants to show (for later use)
  var show = 1;
  
  // slider btns trigger
  btn_prev.addEventListener('click', prevSlider);
  btn_next.addEventListener('click', nextSlider);

  // when animation starts on slider disable previous and next buttons
  _.el('.slider').addEventListener('animationstart', function() {
    btn_prev.disabled = true;
    btn_next.disabled = true;
  });

  // when animation ends on slider enable previous and next buttons
  _.el('.slider').addEventListener('animationend', function(){
    btn_prev.disabled = false;
    btn_next.disabled = false;
  });

  // check slider number and store in all_sliders array
  var amount = (function getSliders() {
    var sliders = _.els('.slider');
    var slider_num;

    for(var i = 0, l = sliders.length; i < l; i++) {
      var target = sliders[i];
      // console.log('target' + i, target);
      _.addClass(target, 'index' + [i + 1]);
      all_sliders.push(target);
    }

    slider_num = all_sliders.length;
    return slider_num;
  })();

  // slider initial state
  function init() {
    _.addClass(all_sliders[0], 'is-active');
    _.addClass(all_sliders[1], 'next-is-active');
    _.addClass(all_sliders[amount - show], 'prev-is-active');
  }

  function activeSlider(slider, state) {
    var target = slider;
    _.addClass(target, state);
  } 

  function disableSlider(target) {
    _.removeClass(target, 'is-active');
    _.removeClass(target, 'next-is-active');
    _.removeClass(target, 'prev-is-active');
    _.removeClass(target, 'is-active_P');
    _.removeClass(target, 'is-active_N');
    _.removeClass(target, 'is-prev');
    _.removeClass(target, 'is-next');
    _.removeClass(target, 'is-prev-R');
    _.removeClass(target, 'is-next-R');
  }

  function prevSlider() {
    var curr_index;
    // last index is all sliders array length minus the number of slider to show
    var last_index = amount - show;

    // check for next slider to go out
    for (var i = amount - show; i >= 0; i--) {
      // if index is equal to 1
      // because next slider is always the second index in the array
      if (i === 1) {
        // add animation to get the slider out of the screen
        _.addClass(all_sliders[i], 'next-is-out');
      } else {
        // remove class in all other sliders
        _.removeClass(all_sliders[i], 'next-is-out');
        _.removeClass(all_sliders[i], 'prev-is-out');
      }
    }
  
    // run through all index in all_sliders array 
    for (var i = 0, l = amount - show; i < l; i++) {
      // disable sliders through all sliders
      disableSlider(all_sliders[i]);
      // push and shift all sliders until it reaches
      // the slider you want to show
      all_sliders.push(all_sliders[0]);
      all_sliders.shift(all_sliders[i])
    }

    // current index is always the first index of
    // the changed all_sliders array
    curr_index = all_sliders[0];

    // previous slider is always the last index of all_sliders array
    _.addClass(all_sliders[last_index], 'is-prev');
    // next slider is always the second index of all_sliders array
    _.addClass(all_sliders[1], 'is-next');
    activeSlider(curr_index, 'is-active_P');
  }

  function nextSlider() {
    var curr_index;
    var last_index = amount - show;

    // check for next slider to go out
    for (var i = amount - show; i >= 0; i--) {
      if (i === last_index) {
        _.addClass(all_sliders[i], 'prev-is-out');
      } else {
        _.removeClass(all_sliders[i], 'prev-is-out');
        _.removeClass(all_sliders[i], 'next-is-out');
      }
    }

    // to get the first slider when next button is triggered
    // index 1 is always the next slider so
    // push index 0, the first slider
    all_sliders.push(all_sliders[0]);
    // then just shift it once and next slider will be active
    all_sliders.shift(all_sliders[0]);

    // run through all index in all_sliders array 
    for (var i = 0, l = amount - show; i < l; i++) {
      // disable sliders through all sliders
      disableSlider(all_sliders[i]);
    }

    curr_index = all_sliders[0];
    _.addClass(all_sliders[last_index], 'is-prev-R');
    _.addClass(all_sliders[1], 'is-next-R');
    activeSlider(curr_index, 'is-active_N');
  } 
  
  init();

})(window, document, DOM);