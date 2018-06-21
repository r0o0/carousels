(function (global, doc,  _) {
  'use strict';
  
  var all_sliders = [];
  var btn_prev = _.el('.btn-prev');
  var btn_next = _.el('.btn-next');

  btn_prev.addEventListener('click', prevSlider);
  btn_next.addEventListener('click', nextSlider);

  (function getSliders() {
    var sliders = _.els('.slider');
    for(var i = 0, l = sliders.length; i < l; i++) {
      var target = sliders[i];
      console.log('target' + i, target);
      _.addClass(target, 'index' + [i + 1]);
      all_sliders.push(target);
    }
  })();

  function currSlider() {
    var curr_slider;
    var index;
    for (var i = 0, l = all_sliders.length; i < l; i++) {
      curr_slider = _.getStyle(all_sliders[i], null, 'top');
      
      if (curr_slider === '0px') {
        index = i;
      }
    }
    return index;
  }

  function activeSlider(target, property, value) {
    var activate = target;
    _.setStyle(target, property, value);

  } 

  function disableSlider(target, property, value) {
    var disable = target;
    _.setStyle(target, property, value);
  }

  function prevSlider() {
    var curr_index = currSlider();
    console.log('curr', curr_index);
    var prev_index = curr_index - 1;
    console.log('prev', prev_index);
    var last_index = all_sliders.length - 1;
    var target;

    for (var i = 0, l = all_sliders.length; i < l; i++) {
      if (curr_index !== prev_index) {
        disableSlider(all_sliders[i], 'top', '-800px');
      } else if (curr_index === last_index) {
        console.log('last i', i);
        disableSlider(all_sliders[last_index], 'top', '-800px');
      } else {
        continue;
      }
    }

    if (prev_index === -1) {
      // disableSlider(last, 'top', '-800px');
      target = all_sliders[last_index];
      activeSlider(target, 'top', '0');
    } else {
      target = all_sliders[prev_index];
      activeSlider(target, 'top', '0');
    }
  }

  function nextSlider() {
    var curr_index = currSlider();
    var next_index = curr_index + 1;
    var last = all_sliders[all_sliders.length - 1];
    var target;

    for (var i = 0, l = all_sliders.length; i < l; i++) {
      if (i === curr_index) {
        // console.log(i);
        continue;
      } else {
        disableSlider(all_sliders[i], 'top', '-800px');
      }
    }

    if (next_index === all_sliders.length) {
      disableSlider(last, 'top', '-800px');
      target = all_sliders[0];
      activeSlider(target, 'top', '0');
    } else {
      target = all_sliders[next_index];
      activeSlider(target, 'top', '0');
    }

  } 
  
  currSlider();

})(window, document, DOM);