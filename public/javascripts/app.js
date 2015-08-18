$( function() {
  $("button").prop("disabled", true); // disable the submit button
  $("input.phone_number").formance("format_phone_number") // setup the formatter
                         .on( 'keyup change blur', function (event) { // setup the event listeners to validate the field whenever the user takes an action
                           if ( $('#inputOne').formance('validate_phone_number') && $('#inputTwo').formance('validate_phone_number'))
                             $("button").prop("disabled", false); // enable the submit button if valid phone number
                           else
                             $("button").prop("disabled", true); // disable the submit button if invalid phone number
                         });
});