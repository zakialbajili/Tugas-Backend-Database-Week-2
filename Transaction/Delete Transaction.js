function removeClass(element,className) {
    var currentClassName = element.getAttribute("class");
    if (typeof currentClassName!== "undefined" && currentClassName) {
  
      var class2RemoveIndex = currentClassName.indexOf(className);
      if (class2RemoveIndex != -1) {
          var class2Remove = currentClassName.substr(class2RemoveIndex, className.length);
          var updatedClassName = currentClassName.replace(class2Remove,"").trim();
          element.setAttribute("class",updatedClassName);
      }
    }
    else {
      element.removeAttribute("class");   
    } 
}