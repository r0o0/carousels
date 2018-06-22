(function (global, doc,  _) {
  'use strict';
  
  // globally accessible variables;
  var all_sliders = [];
  var btn_prev = _.el('.btn-prev');
  var btn_next = _.el('.btn-next');
  var curr_slider = [0];
  
  // slider btns trigger
  btn_prev.addEventListener('click', prevSlider);
  btn_next.addEventListener('click', nextSlider);

  // check slider number and store in all_sliders array
  (function getSliders() {
    var sliders = _.els('.slider');
    for(var i = 0, l = sliders.length; i < l; i++) {
      var target = sliders[i];
      console.log('target' + i, target);
      _.addClass(target, 'index' + [i + 1]);
      all_sliders.push(target);
    }
  })();

  function init() {
    _.addClass(all_sliders[0], 'is-active');
    currSlider(curr_slider[0]);
    // activeSlider();
  } 

  // init();
  // check which slider is active
  function currSlider(base) {
    var curr_index = base;
    
    // curr_index !== base ? curr_index = curr_slider[0] : curr_index = base;
    console.log('currSlider', curr_index);
    
    // get last index and store in variable
    var last_index = all_sliders.length - 1;
    var prev_index;
    var next_index;
    var curr_top;
    var curr_left;

    // check all sliders for...
    for (var i = 0, l = all_sliders.length; i < l; i++) {
      // get css top value of all sliders and store
      curr_top = _.getStyle(all_sliders[i], null, 'top');
      // get css left value of all sliders and store
      curr_left = _.getStyle(all_sliders[i], null, 'left');
      
      // if curr_top and curr_left value is equal to '0px'
      if (curr_top === '0px' && curr_left === '0px') {
        // store the current i in index
        curr_index = i;
        // console.log(index);
      }
    }

    curr_index === 0 ? prev_index = last_index : prev_index = curr_index - 1;
    curr_index === last_index ? next_index = 0  : next_index = curr_index + 1;
    
    (function positionPrev(index) {
      var target = all_sliders[index];
      // console.log(target);
      _.addClass(target, 'is-prev');
      // if (index === last_index) {
      //   _.removeClass(target, 'is-prev');
      //   _.addClass(target, 'is-next');
      // }
    })(prev_index);

    (function positionNext(index) {
      var target = all_sliders[index];
      _.addClass(target, 'is-next');
    })(next_index); 

    // positionPrev(prev_index);
    // positionNext(next_index);
    // when currSlider function is called give the value in variable index
    return curr_index;
  }

  function activeSlider(slider) {
    var target = all_sliders[slider];
    _.addClass(target, 'is-active');
    
  } 

  function disableSlider() {
    var curr_index = curr_slider[0];
    console.log('disable', curr_index); 
    var target;
    for (var i = 0, l = all_sliders.length; i < l; i++) {
      target = all_sliders[i];
      if (curr_index === i) {
        _.removeClass(target, 'is-prev');
        _.removeClass(target, 'is-next');
        // continue;
      } else {
        _.removeClass(target, 'is-active');
        _.removeClass(target, 'is-prev');
        _.removeClass(target, 'is-next');
      }
    } 
  }

  function prevSlider() {
    disableSlider();
    var curr_index = currSlider();
    console.log(curr_index);
    var target = all_sliders[curr_index];
    console.log(target);
    
    curr_index === 0 ? curr_index = all_sliders.length - 1 : curr_index = curr_index - 1;
    // _.setStyle(target, 'left', '-100%');
    // _.setStyle(target, 'transform', 'left 0.34s ease-in');
    // _.addClass(target, 'is-prev');
    
    console.log('last', curr_index);

    // _.setStyle(target, 'transform', 'left')
    // for (var i = 0, l = curr_slider[i]; i < l; i++) {
    //   console.log(curr_slide);
    //   curr_slider.shift(i);  
    // }
    curr_slider.push(curr_index);
    curr_slider.shift(0);
    activeSlider(curr_index);
    disableSlider();
    currSlider(curr_slider[0]);
    console.log('global', curr_slider[0]);
    
  }
  // console.log('global', curr_slider);
  function nextSlider() {
  //   var curr_index = currSlider();
  //   var next_index = curr_index + 1;
  //   var last = all_sliders[all_sliders.length - 1];
  //   var target;

  //   for (var i = 0, l = all_sliders.length; i < l; i++) {
  //     if (i === curr_index) {
  //       // console.log(i);
  //       continue;
  //     } else {
  //       // disableSlider(all_sliders[i], 'top', '-800px');
  //       disableSlider(all_sliders[i], 'is-active');
  //     }
  //   }

  //   if (next_index === all_sliders.length) {
  //     // disableSlider(last, 'top', '-800px');
  //     disableSlider(last, 'is-active');
  //     target = all_sliders[0];
  //     // activeSlider(target, 'top', '0');
  //     activeSlider(target, 'is-active');
  //   } else {
  //     target = all_sliders[next_index];
  //     // activeSlider(target, 'top', '0');
  //     activeSlider(target, 'is-active');
  //   }

  } 
  
  init();

})(window, document, DOM);