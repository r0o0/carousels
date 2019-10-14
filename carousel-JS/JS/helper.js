  var doc = document;
  var global = window;
  // var namespace = 'DOM';

  //-------------------------------------
  // HELPER FUNCTIONS
  // querySelector
  function el(target, parent) {
    return (parent || doc).querySelector(target);
  }

  // querySelectorAll
  function els(target, parent) {
    return (parent || doc).querySelectorAll(target);
  }

  //------------ 
  // css 속성 확인해주는 helper 함수
  function getStyle(target, pseudo, property) {
    var target;
    typeof target === 'string' ? target = global.getComputedStyle(el(target), pseudo) : target = global.getComputedStyle(target, pseudo);
    return target.getPropertyValue(property);
  }
  
  //------------
  // css 속성 바꿔주는 helper 함수
  function setStyle(target, property, value) {
    var set_style;
    typeof target === 'string' ? set_style = el(target).style.setProperty(property, value) : set_style = target.style.setProperty(property, value);
    return set_style;   
  }
  //------------

  //------------
  // css class 추가 && 제거
  function toggleClass(target, name) {
    // 해당 요소의 classList를 확인해서
    var target_class;
    // target 값이 문자열이면 target 요소를 선택한 후 classList 반환
    typeof target === 'string' ? target_class = el(target).classList : target_class = target.classList;
    // 클랙스 리스트에 name값이 없으면 클래스 리스트에 추가해주고 있으면 리스트에서 제거
    target_class.contains(name) !== true ? target_class.add(name) : target_class.remove(name);
  }

  //------------
  // css class 추가
  function addClass(target, name) {
    var target_class;
    // 해당 요소의 classList를 확인해서
    typeof target === 'string' ? target_class = el(target).classList : target_class = target.classList;
    console.log(target_class);
    // 클래스 리스트에 추가
    target_class.add(name);
  }

  //------------
  // css class 제거
  function removeClass(target, name) {
    var target_class;
    // 해당 요소의 classList를 확인해서
    typeof target === 'string' ? target_class = el(target).classList : target_class = target.classList;
    // 클래스 리스트에 제거
    target_class.remove(name);
  }