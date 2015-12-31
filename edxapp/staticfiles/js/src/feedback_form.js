(function() {
  this.FeedbackForm = (function() {
    function FeedbackForm() {
      $('#feedback_button').click(function() {
        var data;
        data = {
          subject: $('#feedback_subject').val(),
          message: $('#feedback_message').val(),
          url: window.location.href
        };
        return $.postWithPrefix('/send_feedback', data, function() {
          return $('#feedback_div').html('Feedback submitted. Thank you');
        }, 'json');
      });
    }

    return FeedbackForm;

  })();

}).call(this);
