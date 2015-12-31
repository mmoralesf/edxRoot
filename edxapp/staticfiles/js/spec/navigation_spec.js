(function() {
  describe('Navigation', function() {
    beforeEach(function() {
      loadFixtures('coffee/fixtures/accordion.html');
      return this.navigation = new Navigation;
    });
    describe('constructor', function() {
      describe('when the #accordion exists', function() {
        describe('when there is an active section', function() {
          beforeEach(function() {
            spyOn($.fn, 'accordion');
            $('#accordion').append('<ul><li></li></ul><ul><li class="active"></li></ul>');
            return new Navigation;
          });
          return it('activate the accordion with correct active section', function() {
            return expect($('#accordion').accordion).toHaveBeenCalledWith({
              active: 1,
              header: 'h3',
              autoHeight: false,
              heightStyle: 'content'
            });
          });
        });
        describe('when there is no active section', function() {
          beforeEach(function() {
            spyOn($.fn, 'accordion');
            $('#accordion').append('<ul><li></li></ul><ul><li></li></ul>');
            return new Navigation;
          });
          return it('activate the accordian with no section as active', function() {
            return expect($('#accordion').accordion).toHaveBeenCalledWith({
              active: 0,
              header: 'h3',
              autoHeight: false,
              heightStyle: 'content'
            });
          });
        });
        it('binds the accordionchange event', function() {
          return expect($('#accordion')).toHandleWith('accordionchange', this.navigation.log);
        });
        return it('bind the navigation toggle', function() {
          return expect($('#open_close_accordion a')).toHandleWith('click', this.navigation.toggle);
        });
      });
      return describe('when the #accordion does not exists', function() {
        beforeEach(function() {
          return $('#accordion').remove();
        });
        return it('does not activate the accordion', function() {
          spyOn($.fn, 'accordion');
          return expect($('#accordion').accordion).wasNotCalled();
        });
      });
    });
    describe('toggle', function() {
      return it('toggle closed class on the wrapper', function() {
        $('.course-wrapper').removeClass('closed');
        this.navigation.toggle();
        expect($('.course-wrapper')).toHaveClass('closed');
        this.navigation.toggle();
        return expect($('.course-wrapper')).not.toHaveClass('closed');
      });
    });
    return describe('log', function() {
      beforeEach(function() {
        return spyOn(Logger, 'log');
      });
      return it('submit event log', function() {
        this.navigation.log({}, {
          newHeader: {
            text: function() {
              return "new";
            }
          },
          oldHeader: {
            text: function() {
              return "old";
            }
          }
        });
        return expect(Logger.log).toHaveBeenCalledWith('accordion', {
          newheader: 'new',
          oldheader: 'old'
        });
      });
    });
  });

}).call(this);
