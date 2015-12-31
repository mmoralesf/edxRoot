
/*
Email Section

imports from other modules.
wrap in (-> ... apply) to defer evaluation
such that the value can be defined later than this assignment (file load order).
 */

(function() {
  var Email, KeywordValidator, PendingInstructorTasks, SendEmail, create_email_content_table, create_email_message_views, create_task_list_table, plantTimeout, std_ajax_err;

  plantTimeout = function() {
    return window.InstructorDashboard.util.plantTimeout.apply(this, arguments);
  };

  std_ajax_err = function() {
    return window.InstructorDashboard.util.std_ajax_err.apply(this, arguments);
  };

  PendingInstructorTasks = function() {
    return window.InstructorDashboard.util.PendingInstructorTasks;
  };

  create_task_list_table = function() {
    return window.InstructorDashboard.util.create_task_list_table.apply(this, arguments);
  };

  create_email_content_table = function() {
    return window.InstructorDashboard.util.create_email_content_table.apply(this, arguments);
  };

  create_email_message_views = function() {
    return window.InstructorDashboard.util.create_email_message_views.apply(this, arguments);
  };

  KeywordValidator = function() {
    return window.InstructorDashboard.util.KeywordValidator;
  };

  SendEmail = (function() {
    function SendEmail($container) {
      this.$container = $container;
      this.$emailEditor = XBlock.initializeBlock($('.xblock-studio_view'));
      this.$send_to = this.$container.find("select[name='send_to']'");
      this.$subject = this.$container.find("input[name='subject']'");
      this.$btn_send = this.$container.find("input[name='send']'");
      this.$task_response = this.$container.find(".request-response");
      this.$request_response_error = this.$container.find(".request-response-error");
      this.$content_request_response_error = this.$container.find(".content-request-response-error");
      this.$history_request_response_error = this.$container.find(".history-request-response-error");
      this.$btn_task_history_email = this.$container.find("input[name='task-history-email']'");
      this.$btn_task_history_email_content = this.$container.find("input[name='task-history-email-content']'");
      this.$table_task_history_email = this.$container.find(".task-history-email-table");
      this.$table_email_content_history = this.$container.find(".content-history-email-table");
      this.$email_content_table_inner = this.$container.find(".content-history-table-inner");
      this.$email_messages_wrapper = this.$container.find(".email-messages-wrapper");
      this.$btn_send.click((function(_this) {
        return function() {
          var confirm_message, full_confirm_message, message, send_data, send_to, subject, success_message, validation;
          if (_this.$subject.val() === "") {
            return alert(gettext("Your message must have a subject."));
          } else if (_this.$emailEditor.save()['data'] === "") {
            return alert(gettext("Your message cannot be blank."));
          } else {
            validation = KeywordValidator().validate_string(_this.$emailEditor.save()['data']);
            if (!validation.is_valid) {
              message = gettext("There are invalid keywords in your email. Please check the following keywords and try again:");
              message += "\n" + validation.invalid_keywords.join('\n');
              alert(message);
              return;
            }
            success_message = gettext("Your email was successfully queued for sending.");
            send_to = _this.$send_to.val().toLowerCase();
            if (send_to === "myself") {
              confirm_message = gettext("You are about to send an email titled '<%= subject %>' to yourself. Is this OK?");
            } else if (send_to === "staff") {
              confirm_message = gettext("You are about to send an email titled '<%= subject %>' to everyone who is staff or instructor on this course. Is this OK?");
            } else {
              confirm_message = gettext("You are about to send an email titled '<%= subject %>' to ALL (everyone who is enrolled in this course as student, staff, or instructor). Is this OK?");
              success_message = gettext("Your email was successfully queued for sending. Please note that for large classes, it may take up to an hour (or more, if other courses are simultaneously sending email) to send all emails.");
            }
            subject = _this.$subject.val();
            full_confirm_message = _.template(confirm_message, {
              subject: subject
            });
            if (confirm(full_confirm_message)) {
              send_data = {
                action: 'send',
                send_to: _this.$send_to.val(),
                subject: _this.$subject.val(),
                message: _this.$emailEditor.save()['data']
              };
              return $.ajax({
                type: 'POST',
                dataType: 'json',
                url: _this.$btn_send.data('endpoint'),
                data: send_data,
                success: function(data) {
                  return _this.display_response(success_message);
                },
                error: std_ajax_err(function() {
                  return _this.fail_with_error(gettext('Error sending email.'));
                })
              });
            } else {
              _this.$task_response.empty();
              return _this.$request_response_error.empty();
            }
          }
        };
      })(this));
      this.$btn_task_history_email.click((function(_this) {
        return function() {
          var url;
          url = _this.$btn_task_history_email.data('endpoint');
          return $.ajax({
            dataType: 'json',
            url: url,
            success: function(data) {
              if (data.tasks.length) {
                return create_task_list_table(_this.$table_task_history_email, data.tasks);
              } else {
                _this.$history_request_response_error.text(gettext("There is no email history for this course."));
                return _this.$history_request_response_error.css({
                  "display": "block"
                });
              }
            },
            error: std_ajax_err(function() {
              return _this.$history_request_response_error.text(gettext("There was an error obtaining email task history for this course."));
            })
          });
        };
      })(this));
      this.$btn_task_history_email_content.click((function(_this) {
        return function() {
          var url;
          url = _this.$btn_task_history_email_content.data('endpoint');
          return $.ajax({
            dataType: 'json',
            url: url,
            success: function(data) {
              if (data.emails.length) {
                create_email_content_table(_this.$table_email_content_history, _this.$email_content_table_inner, data.emails);
                return create_email_message_views(_this.$email_messages_wrapper, data.emails);
              } else {
                _this.$content_request_response_error.text(gettext("There is no email history for this course."));
                return _this.$content_request_response_error.css({
                  "display": "block"
                });
              }
            },
            error: std_ajax_err(function() {
              return _this.$content_request_response_error.text(gettext("There was an error obtaining email content history for this course."));
            })
          });
        };
      })(this));
    }

    SendEmail.prototype.fail_with_error = function(msg) {
      console.warn(msg);
      this.$task_response.empty();
      this.$request_response_error.empty();
      this.$request_response_error.text(msg);
      return $(".msg-confirm").css({
        "display": "none"
      });
    };

    SendEmail.prototype.display_response = function(data_from_server) {
      this.$task_response.empty();
      this.$request_response_error.empty();
      this.$task_response.text(data_from_server);
      return $(".msg-confirm").css({
        "display": "block"
      });
    };

    return SendEmail;

  })();

  Email = (function() {
    function Email($section) {
      this.$section = $section;
      this.$section.data('wrapper', this);
      plantTimeout(0, (function(_this) {
        return function() {
          return new SendEmail(_this.$section.find('.send-email'));
        };
      })(this));
      this.instructor_tasks = new (PendingInstructorTasks())(this.$section);
    }

    Email.prototype.onClickTitle = function() {
      return this.instructor_tasks.task_poller.start();
    };

    Email.prototype.onExit = function() {
      return this.instructor_tasks.task_poller.stop();
    };

    return Email;

  })();

  _.defaults(window, {
    InstructorDashboard: {}
  });

  _.defaults(window.InstructorDashboard, {
    sections: {}
  });

  _.defaults(window.InstructorDashboard.sections, {
    Email: Email
  });

}).call(this);
