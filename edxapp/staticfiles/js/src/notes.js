(function() {
  var StudentNotes,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  StudentNotes = (function() {
    StudentNotes.prototype._debug = false;

    StudentNotes.prototype.targets = [];

    function StudentNotes($, el) {
      this.onInitNotes = __bind(this.onInitNotes, this);
      var events;
      if (this._debug) {
        console.log('student notes init', arguments, this);
      }
      if (!$(el).data('notes-instance')) {
        events = {
          'notes:init': this.onInitNotes
        };
        $(el).delegate('*', events);
        $(el).data('notes-instance', this);
      }
    }

    StudentNotes.prototype.onInitNotes = function(event, uri, storage_url, token) {
      var courseid, found, idDUdiv, idUdiv, options, ova, parts, uri_root;
      if (uri == null) {
        uri = null;
      }
      if (storage_url == null) {
        storage_url = null;
      }
      if (token == null) {
        token = null;
      }
      event.stopPropagation();
      found = this.targets.some(function(target) {
        return target === event.target;
      });
      if (uri.substring(0, 4) !== "http") {
        uri_root = window.location.href.split(/#|\?/).shift() || "";
        uri = uri_root + uri.substring(1);
      }
      parts = window.location.href.split("/");
      courseid = parts[4] + "/" + parts[5] + "/" + parts[6];
      idUdiv = $(event.target).parent().find(".idU")[0];
      idDUdiv = $(event.target).parent().find(".idDU")[0];
      idUdiv = (typeof idUdiv !== "undefined" ? idUdiv.innerHTML : "");
      idDUdiv = (typeof idDUdiv !== "undefined" ? idDUdiv.innerHTML : "");
      options = {
        optionsAnnotator: {
          permissions: {
            user: {
              id: idUdiv,
              name: idDUdiv
            },
            userString: function(user) {
              if (user && user.name) {
                return user.name;
              }
              return user;
            },
            userId: function(user) {
              if (user && user.id) {
                return user.id;
              }
              return user;
            }
          },
          auth: {
            token: token
          },
          store: {
            prefix: storage_url,
            annotationData: {
              uri: uri
            },
            urls: {
              create: '/create',
              read: '/read/:id',
              update: '/update/:id',
              destroy: '/delete/:id',
              search: '/search'
            },
            loadFromSearch: {
              limit: 10000,
              uri: uri,
              user: idUdiv
            }
          }
        },
        optionsVideoJS: {
          techOrder: ["html5", "flash", "youtube"],
          customControlsOnMobile: true
        },
        optionsOVA: {
          posBigNew: 'none',
          NumAnnotations: 20
        },
        optionsRichText: {
          tinymce: {
            selector: "li.annotator-item textarea",
            plugins: "media image insertdatetime link code",
            menubar: false,
            toolbar_items_size: 'small',
            extended_valid_elements: "iframe[src|frameborder|style|scrolling|class|width|height|name|align|id]",
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media rubric | code "
          }
        }
      };
      if (found) {
        if (Annotator._instances.length !== 0) {
          $(event.target).annotator("destroy");
        }
        return ova = new OpenVideoAnnotation.Annotator($(event.target), options);
      } else {
        if (event.target.id === "annotator-viewer") {
          return ova = new OpenVideoAnnotation.Annotator($(event.target), options);
        } else {
          return this.targets.push(event.target);
        }
      }
    };

    return StudentNotes;

  })();

  $(document).ready(function($) {
    return new StudentNotes($, this);
  });

}).call(this);
