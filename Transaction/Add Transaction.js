function addClass(element,className) {
    var currentClassName = element.getAttribute("class");
    if (typeof currentClassName!== "undefined" && currentClassName) {
      element.setAttribute("class",currentClassName + " "+ className);
    }
    else {
      element.setAttribute("class",className); 
    }
  }
