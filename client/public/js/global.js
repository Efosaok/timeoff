/*
 * Book Leave request pop-up window.
 *
 * */



/*
 * Bootstrap-datepicker
 *
 * */
!function(a){
  a.fn.datepicker.dates["en-GB"] = {
    days : [
      "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
    ],
    daysShort : [
      "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ],
    daysMin : [
      "Su","Mo","Tu","We","Th","Fr","Sa"
    ],
    months : [
      "January","February","March","April","May","June","July","August","September","October","November","December"
    ],
    monthsShort : [
      "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    today       : "Today",
    monthsTitle : "Months",
    clear       : "Clear",
    weekStart   : 1,
    format      : "dd/mm/yyyy"
  }
}(jQuery);

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$(function () {
  $('[data-toggle="popover"]').popover()
})


/*
 *  Given URL string return its query paramters as object.
 *
 *  If URL is not provided location of current page is used.
 * */

function getUrlVars(url){
  if ( ! url ) {
    url = window.location.href;
  }
  var vars = {}, hash;
  var hashes = url.slice( url.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars[hash[0]] = hash[1];
  }
  return vars;
}


$(document).ready(function(){

  $('[data-tom-color-picker] a')
    .on('click', function(e){
      e.stopPropagation();

      // Close dropdown
      $(e.target).closest('.dropdown-menu').dropdown('toggle');

      var new_class_name =  $(e.target).data('tom-color-picker-css-class');

      // Ensure newly selected color is on triggering element
      $(e.target).closest('[data-tom-color-picker]')
        .find('button.dropdown-toggle')
        .attr('class', function(idx, c){ return c.replace(/leave_type_color_\d+/g, '') })
        .addClass( new_class_name );

      // Capture newly picked up color in hidden input for submission
      $(e.target).closest('[data-tom-color-picker]')
        .find('input[type="hidden"]')
        .attr('value', new_class_name);

      return false;
    });
});
