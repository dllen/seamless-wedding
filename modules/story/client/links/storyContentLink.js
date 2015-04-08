"use strict";
module.exports = function (scope, element, attrs) {
    element.addClass(attrs.id);

    var $window = $(window);
    var $body = $("body");
    var $image = element.find('.image');
    var $container = element.find(".container");

    var $headline = $container.find(".headline");
    if (attrs.nextSet) {
      
    }
    var $text = element.find(".text");
    //Add correct image class so we can continue using css to load background images
    var imageClass = attrs.id + "-image";
    $image.addClass(imageClass);
};