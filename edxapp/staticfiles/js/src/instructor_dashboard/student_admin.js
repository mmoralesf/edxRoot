
/*
Student Admin Section

imports from other modules.
wrap in (-> ... apply) to defer evaluation
such that the value can be defined later than this assignment (file load order).
 */

(function() {
  var PendingInstructorTasks, create_task_list_table, find_and_assert, std_ajax_err;

  std_ajax_err = function() {
    return window.InstructorDashboard.util.std_ajax_err.apply(this, arguments);
  };

  create_task_list_table = function() {
    return window.InstructorDashboard.util.create_task_list_table.apply(this, arguments);
  };

  PendingInstructorTasks = function() {
    return window.InstructorDashboard.util.PendingInstructorTasks;
  };

  find_and_assert = function($root, selector) {
    var item;
    item = $root.find(selector);
    if (item.length !== 1) {
      console.error("element selection failed for '" + selector + "' resulted in length " + item.length);
      throw "Failed Element Selection";
    } else {
      return item;
    }
  };

  this.StudentAdmin = (function() {
    function StudentAdmin($section) {
      this.$section = $section;
      this.$section.data('wrapper', this);
      this.$field_student_select_progress = find_and_assert(this.$section, "input[name='student-select-progress']");
      this.$field_student_select_grade = find_and_assert(this.$section, "input[name='student-select-grade']");
      this.$progress_link = find_and_assert(this.$section, "a.progress-link");
      this.$field_problem_select_single = find_and_assert(this.$section, "input[name='problem-select-single']");
      this.$btn_reset_attempts_single = find_and_assert(this.$section, "input[name='reset-attempts-single']");
      this.$btn_delete_state_single = this.$section.find("input[name='delete-state-single']");
      this.$btn_rescore_problem_single = this.$section.find("input[name='rescore-problem-single']");
      this.$btn_task_history_single = this.$section.find("input[name='task-history-single']");
      this.$table_task_history_single = this.$section.find(".task-history-single-table");
      this.$field_entrance_exam_student_select_grade = this.$section.find("input[name='entrance-exam-student-select-grade']");
      this.$btn_reset_entrance_exam_attempts = this.$section.find("input[name='reset-entrance-exam-attempts']");
      this.$btn_delete_entrance_exam_state = this.$section.find("input[name='delete-entrance-exam-state']");
      this.$btn_rescore_entrance_exam = this.$section.find("input[name='rescore-entrance-exam']");
      this.$btn_skip_entrance_exam = this.$section.find("input[name='skip-entrance-exam']");
      this.$btn_entrance_exam_task_history = this.$section.find("input[name='entrance-exam-task-history']");
      this.$table_entrance_exam_task_history = this.$section.find(".entrance-exam-task-history-table");
      this.$field_problem_select_all = this.$section.find("input[name='problem-select-all']");
      this.$btn_reset_attempts_all = this.$section.find("input[name='reset-attempts-all']");
      this.$btn_rescore_problem_all = this.$section.find("input[name='rescore-problem-all']");
      this.$btn_task_history_all = this.$section.find("input[name='task-history-all']");
      this.$table_task_history_all = this.$section.find(".task-history-all-table");
      this.instructor_tasks = new (PendingInstructorTasks())(this.$section);
      this.$request_response_error_progress = find_and_assert(this.$section, ".student-specific-container .request-response-error");
      this.$request_response_error_grade = find_and_assert(this.$section, ".student-grade-container .request-response-error");
      this.$request_response_error_ee = this.$section.find(".entrance-exam-grade-container .request-response-error");
      this.$request_response_error_all = this.$section.find(".course-specific-container .request-response-error");
      this.$progress_link.click((function(_this) {
        return function(e) {
          var error_message, full_error_message, unique_student_identifier;
          e.preventDefault();
          unique_student_identifier = _this.$field_student_select_progress.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_progress.text(gettext("Please enter a student email address or username."));
          }
          error_message = gettext("Error getting student progress url for '<%= student_id %>'. Make sure that the student identifier is spelled correctly.");
          full_error_message = _.template(error_message, {
            student_id: unique_student_identifier
          });
          return $.ajax({
            dataType: 'json',
            url: _this.$progress_link.data('endpoint'),
            data: {
              unique_student_identifier: unique_student_identifier
            },
            success: _this.clear_errors_then(function(data) {
              return window.location = data.progress_url;
            }),
            error: std_ajax_err(function() {
              return _this.$request_response_error_progress.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_reset_attempts_single.click((function(_this) {
        return function() {
          var error_message, full_error_message, full_success_message, problem_to_reset, send_data, success_message, unique_student_identifier;
          unique_student_identifier = _this.$field_student_select_grade.val();
          problem_to_reset = _this.$field_problem_select_single.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_grade.text(gettext("Please enter a student email address or username."));
          }
          if (!problem_to_reset) {
            return _this.$request_response_error_grade.text(gettext("Please enter a problem location."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier,
            problem_to_reset: problem_to_reset,
            delete_module: false
          };
          success_message = gettext("Success! Problem attempts reset for problem '<%= problem_id %>' and student '<%= student_id %>'.");
          error_message = gettext("Error resetting problem attempts for problem '<%= problem_id %>' and student '<%= student_id %>'. Make sure that the problem and student identifiers are complete and correct.");
          full_success_message = _.template(success_message, {
            problem_id: problem_to_reset,
            student_id: unique_student_identifier
          });
          full_error_message = _.template(error_message, {
            problem_id: problem_to_reset,
            student_id: unique_student_identifier
          });
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_reset_attempts_single.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function() {
              return alert(full_success_message);
            }),
            error: std_ajax_err(function() {
              return _this.$request_response_error_grade.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_delete_state_single.click((function(_this) {
        return function() {
          var confirm_message, error_message, full_confirm_message, full_error_message, problem_to_reset, send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_student_select_grade.val();
          problem_to_reset = _this.$field_problem_select_single.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_grade.text(gettext("Please enter a student email address or username."));
          }
          if (!problem_to_reset) {
            return _this.$request_response_error_grade.text(gettext("Please enter a problem location."));
          }
          confirm_message = gettext("Delete student '<%= student_id %>'s state on problem '<%= problem_id %>'?");
          full_confirm_message = _.template(confirm_message, {
            student_id: unique_student_identifier,
            problem_id: problem_to_reset
          });
          if (window.confirm(full_confirm_message)) {
            send_data = {
              unique_student_identifier: unique_student_identifier,
              problem_to_reset: problem_to_reset,
              delete_module: true
            };
            error_message = gettext("Error deleting student '<%= student_id %>'s state on problem '<%= problem_id %>'. Make sure that the problem and student identifiers are complete and correct.");
            full_error_message = _.template(error_message, {
              student_id: unique_student_identifier,
              problem_id: problem_to_reset
            });
            return $.ajax({
              dataType: 'json',
              url: _this.$btn_delete_state_single.data('endpoint'),
              data: send_data,
              success: _this.clear_errors_then(function() {
                return alert(gettext('Module state successfully deleted.'));
              }),
              error: std_ajax_err(function() {
                return _this.$request_response_error_grade.text(full_error_message);
              })
            });
          } else {
            return _this.clear_errors();
          }
        };
      })(this));
      this.$btn_rescore_problem_single.click((function(_this) {
        return function() {
          var error_message, full_error_message, full_success_message, problem_to_reset, send_data, success_message, unique_student_identifier;
          unique_student_identifier = _this.$field_student_select_grade.val();
          problem_to_reset = _this.$field_problem_select_single.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_grade.text(gettext("Please enter a student email address or username."));
          }
          if (!problem_to_reset) {
            return _this.$request_response_error_grade.text(gettext("Please enter a problem location."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier,
            problem_to_reset: problem_to_reset
          };
          success_message = gettext("Started rescore problem task for problem '<%= problem_id %>' and student '<%= student_id %>'. Click the 'Show Background Task History for Student' button to see the status of the task.");
          full_success_message = _.template(success_message, {
            student_id: unique_student_identifier,
            problem_id: problem_to_reset
          });
          error_message = gettext("Error starting a task to rescore problem '<%= problem_id %>' for student '<%= student_id %>'. Make sure that the the problem and student identifiers are complete and correct.");
          full_error_message = _.template(error_message, {
            student_id: unique_student_identifier,
            problem_id: problem_to_reset
          });
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_rescore_problem_single.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function() {
              return alert(full_success_message);
            }),
            error: std_ajax_err(function() {
              return _this.$request_response_error_grade.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_task_history_single.click((function(_this) {
        return function() {
          var error_message, full_error_message, problem_to_reset, send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_student_select_grade.val();
          problem_to_reset = _this.$field_problem_select_single.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_grade.text(gettext("Please enter a student email address or username."));
          }
          if (!problem_to_reset) {
            return _this.$request_response_error_grade.text(gettext("Please enter a problem location."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier,
            problem_location_str: problem_to_reset
          };
          error_message = gettext("Error getting task history for problem '<%= problem_id %>' and student '<%= student_id %>'. Make sure that the problem and student identifiers are complete and correct.");
          full_error_message = _.template(error_message, {
            student_id: unique_student_identifier,
            problem_id: problem_to_reset
          });
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_task_history_single.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function(data) {
              return create_task_list_table(_this.$table_task_history_single, data.tasks);
            }),
            error: std_ajax_err(function() {
              return _this.$request_response_error_grade.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_reset_entrance_exam_attempts.click((function(_this) {
        return function() {
          var send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_entrance_exam_student_select_grade.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_ee.text(gettext("Please enter a student email address or username."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier,
            delete_module: false
          };
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_reset_entrance_exam_attempts.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function() {
              var full_success_message, success_message;
              success_message = gettext("Entrance exam attempts is being reset for student '{student_id}'.");
              full_success_message = interpolate_text(success_message, {
                student_id: unique_student_identifier
              });
              return alert(full_success_message);
            }),
            error: std_ajax_err(function() {
              var error_message, full_error_message;
              error_message = gettext("Error resetting entrance exam attempts for student '{student_id}'. Make sure student identifier is correct.");
              full_error_message = interpolate_text(error_message, {
                student_id: unique_student_identifier
              });
              return _this.$request_response_error_ee.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_rescore_entrance_exam.click((function(_this) {
        return function() {
          var send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_entrance_exam_student_select_grade.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_ee.text(gettext("Please enter a student email address or username."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier
          };
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_rescore_entrance_exam.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function() {
              var full_success_message, success_message;
              success_message = gettext("Started entrance exam rescore task for student '{student_id}'. Click the 'Show Background Task History for Student' button to see the status of the task.");
              full_success_message = interpolate_text(success_message, {
                student_id: unique_student_identifier
              });
              return alert(full_success_message);
            }),
            error: std_ajax_err(function() {
              var error_message, full_error_message;
              error_message = gettext("Error starting a task to rescore entrance exam for student '{student_id}'. Make sure that entrance exam has problems in it and student identifier is correct.");
              full_error_message = interpolate_text(error_message, {
                student_id: unique_student_identifier
              });
              return _this.$request_response_error_ee.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_skip_entrance_exam.click((function(_this) {
        return function() {
          var confirm_message, full_confirm_message, send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_entrance_exam_student_select_grade.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_ee.text(gettext("Enter a student's username or email address."));
          }
          confirm_message = gettext("Do you want to allow this student ('{student_id}') to skip the entrance exam?");
          full_confirm_message = interpolate_text(confirm_message, {
            student_id: unique_student_identifier
          });
          if (window.confirm(full_confirm_message)) {
            send_data = {
              unique_student_identifier: unique_student_identifier
            };
            return $.ajax({
              dataType: 'json',
              url: _this.$btn_skip_entrance_exam.data('endpoint'),
              data: send_data,
              type: 'POST',
              success: _this.clear_errors_then(function(data) {
                return alert(data.message);
              }),
              error: std_ajax_err(function() {
                var error_message;
                error_message = gettext("An error occurred. Make sure that the student's username or email address is correct and try again.");
                return _this.$request_response_error_ee.text(error_message);
              })
            });
          }
        };
      })(this));
      this.$btn_delete_entrance_exam_state.click((function(_this) {
        return function() {
          var send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_entrance_exam_student_select_grade.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_ee.text(gettext("Please enter a student email address or username."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier,
            delete_module: true
          };
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_delete_entrance_exam_state.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function() {
              var full_success_message, success_message;
              success_message = gettext("Entrance exam state is being deleted for student '{student_id}'.");
              full_success_message = interpolate_text(success_message, {
                student_id: unique_student_identifier
              });
              return alert(full_success_message);
            }),
            error: std_ajax_err(function() {
              var error_message, full_error_message;
              error_message = gettext("Error deleting entrance exam state for student '{student_id}'. Make sure student identifier is correct.");
              full_error_message = interpolate_text(error_message, {
                student_id: unique_student_identifier
              });
              return _this.$request_response_error_ee.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_entrance_exam_task_history.click((function(_this) {
        return function() {
          var send_data, unique_student_identifier;
          unique_student_identifier = _this.$field_entrance_exam_student_select_grade.val();
          if (!unique_student_identifier) {
            return _this.$request_response_error_ee.text(gettext("Enter a student's username or email address."));
          }
          send_data = {
            unique_student_identifier: unique_student_identifier
          };
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_entrance_exam_task_history.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function(data) {
              return create_task_list_table(_this.$table_entrance_exam_task_history, data.tasks);
            }),
            error: std_ajax_err(function() {
              var error_message, full_error_message;
              error_message = gettext("Error getting entrance exam task history for student '{student_id}'. Make sure student identifier is correct.");
              full_error_message = interpolate_text(error_message, {
                student_id: unique_student_identifier
              });
              return _this.$request_response_error_ee.text(full_error_message);
            })
          });
        };
      })(this));
      this.$btn_reset_attempts_all.click((function(_this) {
        return function() {
          var confirm_message, error_message, full_confirm_message, full_error_message, full_success_message, problem_to_reset, send_data, success_message;
          problem_to_reset = _this.$field_problem_select_all.val();
          if (!problem_to_reset) {
            return _this.$request_response_error_all.text(gettext("Please enter a problem location."));
          }
          confirm_message = gettext("Reset attempts for all students on problem '<%= problem_id %>'?");
          full_confirm_message = _.template(confirm_message, {
            problem_id: problem_to_reset
          });
          if (window.confirm(full_confirm_message)) {
            send_data = {
              all_students: true,
              problem_to_reset: problem_to_reset
            };
            success_message = gettext("Successfully started task to reset attempts for problem '<%= problem_id %>'. Click the 'Show Background Task History for Problem' button to see the status of the task.");
            full_success_message = _.template(success_message, {
              problem_id: problem_to_reset
            });
            error_message = gettext("Error starting a task to reset attempts for all students on problem '<%= problem_id %>'. Make sure that the problem identifier is complete and correct.");
            full_error_message = _.template(error_message, {
              problem_id: problem_to_reset
            });
            return $.ajax({
              dataType: 'json',
              url: _this.$btn_reset_attempts_all.data('endpoint'),
              data: send_data,
              success: _this.clear_errors_then(function() {
                return alert(full_success_message);
              }),
              error: std_ajax_err(function() {
                return _this.$request_response_error_all.text(full_error_message);
              })
            });
          } else {
            return _this.clear_errors();
          }
        };
      })(this));
      this.$btn_rescore_problem_all.click((function(_this) {
        return function() {
          var confirm_message, error_message, full_confirm_message, full_error_message, full_success_message, problem_to_reset, send_data, success_message;
          problem_to_reset = _this.$field_problem_select_all.val();
          if (!problem_to_reset) {
            return _this.$request_response_error_all.text(gettext("Please enter a problem location."));
          }
          confirm_message = gettext("Rescore problem '<%= problem_id %>' for all students?");
          full_confirm_message = _.template(confirm_message, {
            problem_id: problem_to_reset
          });
          if (window.confirm(full_confirm_message)) {
            send_data = {
              all_students: true,
              problem_to_reset: problem_to_reset
            };
            success_message = gettext("Successfully started task to rescore problem '<%= problem_id %>' for all students. Click the 'Show Background Task History for Problem' button to see the status of the task.");
            full_success_message = _.template(success_message, {
              problem_id: problem_to_reset
            });
            error_message = gettext("Error starting a task to rescore problem '<%= problem_id %>'. Make sure that the problem identifier is complete and correct.");
            full_error_message = _.template(error_message, {
              problem_id: problem_to_reset
            });
            return $.ajax({
              dataType: 'json',
              url: _this.$btn_rescore_problem_all.data('endpoint'),
              data: send_data,
              success: _this.clear_errors_then(function() {
                return alert(full_success_message);
              }),
              error: std_ajax_err(function() {
                return _this.$request_response_error_all.text(full_error_message);
              })
            });
          } else {
            return _this.clear_errors();
          }
        };
      })(this));
      this.$btn_task_history_all.click((function(_this) {
        return function() {
          var send_data;
          send_data = {
            problem_location_str: _this.$field_problem_select_all.val()
          };
          if (!send_data.problem_location_str) {
            return _this.$request_response_error_all.text(gettext("Please enter a problem location."));
          }
          return $.ajax({
            dataType: 'json',
            url: _this.$btn_task_history_all.data('endpoint'),
            data: send_data,
            success: _this.clear_errors_then(function(data) {
              return create_task_list_table(_this.$table_task_history_all, data.tasks);
            }),
            error: std_ajax_err(function() {
              return _this.$request_response_error_all.text(gettext("Error listing task history for this student and problem."));
            })
          });
        };
      })(this));
    }

    StudentAdmin.prototype.clear_errors_then = function(cb) {
      this.$request_response_error_progress.empty();
      this.$request_response_error_grade.empty();
      this.$request_response_error_ee.empty();
      this.$request_response_error_all.empty();
      return function() {
        return cb != null ? cb.apply(this, arguments) : void 0;
      };
    };

    StudentAdmin.prototype.clear_errors = function() {
      this.$request_response_error_progress.empty();
      this.$request_response_error_grade.empty();
      this.$request_response_error_ee.empty();
      return this.$request_response_error_all.empty();
    };

    StudentAdmin.prototype.onClickTitle = function() {
      return this.instructor_tasks.task_poller.start();
    };

    StudentAdmin.prototype.onExit = function() {
      return this.instructor_tasks.task_poller.stop();
    };

    return StudentAdmin;

  })();

  _.defaults(window, {
    InstructorDashboard: {}
  });

  _.defaults(window.InstructorDashboard, {
    sections: {}
  });

  _.defaults(window.InstructorDashboard.sections, {
    StudentAdmin: StudentAdmin
  });

}).call(this);