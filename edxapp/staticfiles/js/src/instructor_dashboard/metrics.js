(function() {
  var Metrics, plantTimeout, std_ajax_err;

  plantTimeout = function() {
    return window.InstructorDashboard.util.plantTimeout.apply(this, arguments);
  };

  std_ajax_err = function() {
    return window.InstructorDashboard.util.std_ajax_err.apply(this, arguments);
  };

  Metrics = (function() {
    function Metrics($section) {
      this.$section = $section;
      this.$section.data('wrapper', this);
    }

    Metrics.prototype.onClickTitle = function() {};

    return Metrics;

  })();

  if (typeof _ !== "undefined" && _ !== null) {
    _.defaults(window, {
      InstructorDashboard: {}
    });
    _.defaults(window.InstructorDashboard, {
      sections: {}
    });
    _.defaults(window.InstructorDashboard.sections, {
      Metrics: Metrics
    });
  }

}).call(this);
