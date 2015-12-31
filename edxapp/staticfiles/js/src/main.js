(function() {
  AjaxPrefix.addAjaxPrefix(jQuery, function() {
    return $("meta[name='path_prefix']").attr('content');
  });

  $(function() {
    $.ajaxSetup({
      headers: {
        'X-CSRFToken': $.cookie('csrftoken')
      },
      dataType: 'json'
    });
    window.onTouchBasedDevice = function() {
      return navigator.userAgent.match(/iPhone|iPod|iPad|Android/i);
    };
    if (onTouchBasedDevice()) {
      $('body').addClass('touch-based-device');
    }
    $('#csrfmiddlewaretoken').attr('value', $.cookie('csrftoken'));
    new Calculator;
    new FeedbackForm;
    if ($('body').hasClass('courseware')) {
      Courseware.start();
    }
    window.submit_circuit = function(circuit_id) {
      $("input.schematic").each(function(index, el) {
        return el.schematic.update_value();
      });
      schematic_value($("#schematic_" + circuit_id).attr("value"));
      return $.postWithPrefix("/save_circuit/" + circuit_id, {
        schematic: schematic_value
      }, function(data) {
        if (data.results === 'success') {
          return alert('Saved');
        }
      });
    };
    window.postJSON = function(url, data, callback) {
      return $.postWithPrefix(url, data, callback);
    };
    $('#login').click(function() {
      $('#login_form input[name="email"]').focus();
      return false;
    });
    $('#signup').click(function() {
      $('#signup-modal input[name="email"]').focus();
      return false;
    });
    if (!Array.prototype.indexOf) {
      return Array.prototype.indexOf = function(obj, start) {
        var ele, i, _i, _len, _ref;
        if (start == null) {
          start = 0;
        }
        _ref = this.slice(start);
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          ele = _ref[i];
          if (ele === obj) {
            return i + start;
          }
        }
        return -1;
      };
    }
  });

}).call(this);
