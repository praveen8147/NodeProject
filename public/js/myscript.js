$(document).ready(function() {

  $("#clear").click(function() {
    $(this).closest('form').find("input[type=text], textarea").val("");
  });

  $("#formApp").validate({
    rules: {
      Name: {
        required: true
      },

      Category: {
        required: true
      },
      Price: {
        required: true

      }

    }

  });
  $('#btnSubmit').click(function() {
    if ($("#formApp").valid()) {
      alert('Product Added!!');
      return;
    }
  });
});
