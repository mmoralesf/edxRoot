
/*
Analytics Section

imports from other modules.
wrap in (-> ... apply) to defer evaluation
such that the value can be defined later than this assignment (file load order).
 */

(function() {
  var GradeDistributionDisplay, InstructorAnalytics, ProfileDistributionWidget, plantTimeout, std_ajax_err;

  plantTimeout = function() {
    return window.InstructorDashboard.util.plantTimeout.apply(this, arguments);
  };

  std_ajax_err = function() {
    return window.InstructorDashboard.util.std_ajax_err.apply(this, arguments);
  };

  ProfileDistributionWidget = (function() {
    function ProfileDistributionWidget(_arg) {
      var template_html, template_params;
      this.$container = _arg.$container, this.feature = _arg.feature, this.title = _arg.title, this.endpoint = _arg.endpoint;
      template_params = {
        title: this.title,
        feature: this.feature,
        endpoint: this.endpoint
      };
      template_html = $("#profile-distribution-widget-template").text();
      this.$container.html(Mustache.render(template_html, template_params));
    }

    ProfileDistributionWidget.prototype.reset_display = function() {
      this.$container.find('.display-errors').empty();
      this.$container.find('.display-text').empty();
      this.$container.find('.display-graph').empty();
      return this.$container.find('.display-table').empty();
    };

    ProfileDistributionWidget.prototype.show_error = function(msg) {
      return this.$container.find('.display-errors').text(msg);
    };

    ProfileDistributionWidget.prototype.load = function() {
      this.reset_display();
      return this.get_profile_distributions(this.feature, {
        error: std_ajax_err((function(_this) {
          return function() {
            // Translators: "Distribution" refers to a grade distribution. This error message appears when there is an error getting the data on grade distribution.;
            return _this.show_error(gettext("Error fetching distribution."));
          };
        })(this)),
        success: (function(_this) {
          return function(data) {
            var columns, feature_res, graph_data, graph_placeholder, grid, grid_data, options, table_placeholder;
            feature_res = data.feature_results;
            if (feature_res.type === 'EASY_CHOICE') {
              options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                forceFitColumns: true
              };
              columns = [
                {
                  id: _this.feature,
                  field: _this.feature,
                  name: data.feature_display_names[_this.feature]
                }, {
                  id: 'count',
                  field: 'count',
                  name: 'Count'
                }
              ];
              grid_data = _.map(feature_res.data, function(value, key) {
                var datapoint;
                datapoint = {};
                datapoint[_this.feature] = feature_res.choices_display_names[key];
                datapoint['count'] = value;
                return datapoint;
              });
              table_placeholder = $('<div/>', {
                "class": 'slickgrid'
              });
              _this.$container.find('.display-table').append(table_placeholder);
              return grid = new Slick.Grid(table_placeholder, grid_data, columns, options);
            } else if (feature_res.feature === 'year_of_birth') {
              graph_placeholder = $('<div/>', {
                "class": 'graph-placeholder'
              });
              _this.$container.find('.display-graph').append(graph_placeholder);
              graph_data = _.map(feature_res.data, function(value, key) {
                return [parseInt(key), value];
              });
              return $.plot(graph_placeholder, [
                {
                  data: graph_data
                }
              ]);
            } else {
              console.warn("unable to show distribution " + feature_res.type);
              return _this.show_error(gettext('Unavailable metric display.'));
            }
          };
        })(this)
      });
    };

    ProfileDistributionWidget.prototype.get_profile_distributions = function(feature, handler) {
      var settings;
      settings = {
        dataType: 'json',
        url: this.endpoint,
        data: {
          feature: feature
        }
      };
      if (typeof handler === 'function') {
        _.extend(settings, {
          success: handler
        });
      } else {
        _.extend(settings, handler);
      }
      return $.ajax(settings);
    };

    return ProfileDistributionWidget;

  })();

  GradeDistributionDisplay = (function() {
    function GradeDistributionDisplay(_arg) {
      var template_html, template_params;
      this.$container = _arg.$container, this.endpoint = _arg.endpoint;
      template_params = {};
      template_html = $('#grade-distributions-widget-template').text();
      this.$container.html(Mustache.render(template_html, template_params));
      this.$problem_selector = this.$container.find('.problem-selector');
    }

    GradeDistributionDisplay.prototype.reset_display = function() {
      this.$container.find('.display-errors').empty();
      this.$container.find('.display-text').empty();
      return this.$container.find('.display-graph').empty();
    };

    GradeDistributionDisplay.prototype.show_error = function(msg) {
      return this.$container.find('.display-errors').text(msg);
    };

    GradeDistributionDisplay.prototype.load = function() {
      return this.get_grade_distributions({
        error: std_ajax_err((function(_this) {
          return function() {
            return _this.show_error(gettext("Error fetching grade distributions."));
          };
        })(this)),
        success: (function(_this) {
          return function(data) {
            var block_id, full_time_updated, grade_info, label, module_id, time_updated, _i, _len, _ref, _ref1;
            time_updated = gettext("Last Updated: <%= timestamp %>");
            full_time_updated = _.template(time_updated, {
              timestamp: data.time
            });
            _this.$container.find('.last-updated').text(full_time_updated);
            _this.$problem_selector.empty();
            _ref = data.data;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              _ref1 = _ref[_i], module_id = _ref1.module_id, block_id = _ref1.block_id, grade_info = _ref1.grade_info;
              label = block_id;
              if (label == null) {
                label = module_id;
              }
              _this.$problem_selector.append($('<option/>', {
                text: label,
                data: {
                  module_id: module_id,
                  grade_info: grade_info
                }
              }));
            }
            _this.$problem_selector.change(function() {
              var $opt;
              $opt = _this.$problem_selector.children('option:selected');
              if (!($opt.length > 0)) {
                return;
              }
              _this.reset_display();
              return _this.render_distribution({
                module_id: $opt.data('module_id'),
                grade_info: $opt.data('grade_info')
              });
            });
            return _this.$problem_selector.change();
          };
        })(this)
      });
    };

    GradeDistributionDisplay.prototype.render_distribution = function(_arg) {
      var $display_graph, full_msg, grade_info, graph_data, graph_placeholder, module_id, msg, total_students;
      module_id = _arg.module_id, grade_info = _arg.grade_info;
      $display_graph = this.$container.find('.display-graph');
      graph_data = grade_info.map(function(_arg1) {
        var grade, max_grade, num_students;
        grade = _arg1.grade, max_grade = _arg1.max_grade, num_students = _arg1.num_students;
        return [grade, num_students];
      });
      total_students = _.reduce([0].concat(grade_info), function(accum, _arg1) {
        var grade, max_grade, num_students;
        grade = _arg1.grade, max_grade = _arg1.max_grade, num_students = _arg1.num_students;
        return accum + num_students;
      });
      msg = gettext("<%= num_students %> students scored.");
      full_msg = _.template(msg, {
        num_students: total_students
      });
      this.$container.find('.display-text').text(full_msg);
      graph_placeholder = $('<div/>', {
        "class": 'graph-placeholder'
      });
      $display_graph.append(graph_placeholder);
      graph_data = graph_data;
      return $.plot(graph_placeholder, [
        {
          data: graph_data,
          bars: {
            show: true
          },
          color: '#1d9dd9'
        }
      ]);
    };

    GradeDistributionDisplay.prototype.get_grade_distributions = function(handler) {
      var settings;
      settings = {
        dataType: 'json',
        url: this.endpoint,
        data: {
          aname: 'ProblemGradeDistribution'
        }
      };
      if (typeof handler === 'function') {
        _.extend(settings, {
          success: handler
        });
      } else {
        _.extend(settings, handler);
      }
      return $.ajax(settings);
    };

    return GradeDistributionDisplay;

  })();

  InstructorAnalytics = (function() {
    function InstructorAnalytics($section) {
      this.$section = $section;
      this.$section.data('wrapper', this);
      this.$pd_containers = this.$section.find('.profile-distribution-widget-container');
      this.$gd_containers = this.$section.find('.grade-distributions-widget-container');
      this.pdws = _.map(this.$pd_containers, (function(_this) {
        return function(container) {
          return new ProfileDistributionWidget({
            $container: $(container),
            feature: $(container).data('feature'),
            title: $(container).data('title'),
            endpoint: $(container).data('endpoint')
          });
        };
      })(this));
      this.gdws = _.map(this.$gd_containers, (function(_this) {
        return function(container) {
          return new GradeDistributionDisplay({
            $container: $(container),
            endpoint: $(container).data('endpoint')
          });
        };
      })(this));
    }

    InstructorAnalytics.prototype.refresh = function() {
      var gdw, pdw, _i, _j, _len, _len1, _ref, _ref1, _results;
      _ref = this.pdws;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        pdw = _ref[_i];
        pdw.load();
      }
      _ref1 = this.gdws;
      _results = [];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        gdw = _ref1[_j];
        _results.push(gdw.load());
      }
      return _results;
    };

    InstructorAnalytics.prototype.onClickTitle = function() {
      return this.refresh();
    };

    return InstructorAnalytics;

  })();

  _.defaults(window, {
    InstructorDashboard: {}
  });

  _.defaults(window.InstructorDashboard, {
    sections: {}
  });

  _.defaults(window.InstructorDashboard.sections, {
    InstructorAnalytics: InstructorAnalytics
  });

}).call(this);