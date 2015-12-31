(function() {
  describe('Calculator', function() {
    var KEY;
    KEY = {
      TAB: 9,
      ENTER: 13,
      ALT: 18,
      ESC: 27,
      SPACE: 32,
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      DOWN: 40
    };
    beforeEach(function() {
      loadFixtures('coffee/fixtures/calculator.html');
      return this.calculator = new Calculator;
    });
    describe('bind', function() {
      it('bind the calculator button', function() {
        return expect($('.calc')).toHandleWith('click', this.calculator.toggle);
      });
      it('bind key up on calculator', function() {
        return expect($('#calculator_wrapper')).toHandle('keyup', this.calculator.handleKeyUpOnHint);
      });
      it('bind the help button', function() {
        return expect($('#calculator_hint')).toHandle('click');
      });
      it('bind the calculator submit', function() {
        return expect($('form#calculator')).toHandleWith('submit', this.calculator.calculate);
      });
      return it('prevent default behavior on form submit', function() {
        jasmine.stubRequests();
        $('form#calculator').submit(function(e) {
          expect(e.isDefaultPrevented()).toBeTruthy();
          return e.preventDefault();
        });
        return $('form#calculator').submit();
      });
    });
    describe('toggle', function() {
      it('focuses the input when toggled', function() {
        var didFocus;
        didFocus = false;
        runs(function() {
          spyOn($.fn, 'focus').andCallFake(function(elementName) {
            return didFocus = true;
          });
          return this.calculator.toggle(jQuery.Event("click"));
        });
        waitsFor((function() {
          return didFocus;
        }), "focus() should have been called on the input", 1000);
        return runs(function() {
          return expect($('#calculator_wrapper #calculator_input').focus).toHaveBeenCalled();
        });
      });
      return it('toggle the close button on the calculator button', function() {
        this.calculator.toggle(jQuery.Event("click"));
        expect($('.calc')).toHaveClass('closed');
        this.calculator.toggle(jQuery.Event("click"));
        return expect($('.calc')).not.toHaveClass('closed');
      });
    });
    describe('showHint', function() {
      return it('show the help overlay', function() {
        this.calculator.showHint();
        expect($('.help')).toHaveClass('shown');
        return expect($('.help')).toHaveAttr('aria-hidden', 'false');
      });
    });
    describe('hideHint', function() {
      return it('show the help overlay', function() {
        this.calculator.hideHint();
        expect($('.help')).not.toHaveClass('shown');
        return expect($('.help')).toHaveAttr('aria-hidden', 'true');
      });
    });
    describe('handleClickOnHintButton', function() {
      return it('on click hint button hint popup becomes visible ', function() {
        var e;
        e = jQuery.Event('click');
        $('#calculator_hint').trigger(e);
        return expect($('.help')).toHaveClass('shown');
      });
    });
    describe('handleClickOnDocument', function() {
      return it('on click out of the hint popup it becomes hidden', function() {
        var e;
        this.calculator.showHint();
        e = jQuery.Event('click');
        $(document).trigger(e);
        return expect($('.help')).not.toHaveClass('shown');
      });
    });
    describe('handleClickOnHintPopup', function() {
      return it('on click of hint popup it remains visible', function() {
        var e;
        this.calculator.showHint();
        e = jQuery.Event('click');
        $('#calculator_input_help').trigger(e);
        return expect($('.help')).toHaveClass('shown');
      });
    });
    describe('selectHint', function() {
      it('select correct hint item', function() {
        var element;
        spyOn($.fn, 'focus');
        element = $('.hint-item').eq(1);
        this.calculator.selectHint(element);
        expect(element.focus).toHaveBeenCalled();
        expect(this.calculator.activeHint).toEqual(element);
        return expect(this.calculator.hintPopup).toHaveAttr('aria-activedescendant', element.attr('id'));
      });
      it('select the first hint if argument element is not passed', function() {
        this.calculator.selectHint();
        return expect(this.calculator.activeHint.attr('id')).toEqual($('.hint-item').first().attr('id'));
      });
      return it('select the first hint if argument element is empty', function() {
        this.calculator.selectHint([]);
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').first().attr('id'));
      });
    });
    describe('prevHint', function() {
      it('Prev hint item is selected', function() {
        this.calculator.activeHint = $('.hint-item').eq(1);
        this.calculator.prevHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(0).attr('id'));
      });
      it('if this was the second item, select the first one', function() {
        this.calculator.activeHint = $('.hint-item').eq(1);
        this.calculator.prevHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(0).attr('id'));
      });
      it('if this was the first item, select the last one', function() {
        this.calculator.activeHint = $('.hint-item').eq(0);
        this.calculator.prevHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(2).attr('id'));
      });
      return it('if this was the last item, select the second last', function() {
        this.calculator.activeHint = $('.hint-item').eq(2);
        this.calculator.prevHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(1).attr('id'));
      });
    });
    describe('nextHint', function() {
      it('if this was the first item, select the second one', function() {
        this.calculator.activeHint = $('.hint-item').eq(0);
        this.calculator.nextHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(1).attr('id'));
      });
      it('If this was the second item, select the last one', function() {
        this.calculator.activeHint = $('.hint-item').eq(1);
        this.calculator.nextHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(2).attr('id'));
      });
      return it('If this was the last item, select the first one', function() {
        this.calculator.activeHint = $('.hint-item').eq(2);
        this.calculator.nextHint();
        return expect(this.calculator.activeHint.attr('id')).toBe($('.hint-item').eq(0).attr('id'));
      });
    });
    describe('handleKeyDown', function() {
      var assertHintIsHidden, assertHintIsVisible, assertNothingHappens;
      assertHintIsHidden = function(calc, key) {
        var e, value;
        spyOn(calc, 'hideHint');
        calc.showHint();
        e = jQuery.Event('keydown', {
          keyCode: key
        });
        value = calc.handleKeyDown(e);
        expect(calc.hideHint).toHaveBeenCalled;
        expect(value).toBeFalsy();
        return expect(e.isDefaultPrevented()).toBeTruthy();
      };
      assertHintIsVisible = function(calc, key) {
        var e, value;
        spyOn(calc, 'showHint');
        spyOn($.fn, 'focus');
        e = jQuery.Event('keydown', {
          keyCode: key
        });
        value = calc.handleKeyDown(e);
        expect(calc.showHint).toHaveBeenCalled;
        expect(value).toBeFalsy();
        expect(e.isDefaultPrevented()).toBeTruthy();
        return expect(calc.activeHint.focus).toHaveBeenCalled();
      };
      assertNothingHappens = function(calc, key) {
        var e, value;
        spyOn(calc, 'showHint');
        e = jQuery.Event('keydown', {
          keyCode: key
        });
        value = calc.handleKeyDown(e);
        expect(calc.showHint).not.toHaveBeenCalled;
        expect(value).toBeTruthy();
        return expect(e.isDefaultPrevented()).toBeFalsy();
      };
      it('hint popup becomes hidden on press ENTER', function() {
        return assertHintIsHidden(this.calculator, KEY.ENTER);
      });
      it('hint popup becomes visible on press ENTER', function() {
        return assertHintIsVisible(this.calculator, KEY.ENTER);
      });
      it('hint popup becomes hidden on press SPACE', function() {
        return assertHintIsHidden(this.calculator, KEY.SPACE);
      });
      it('hint popup becomes visible on press SPACE', function() {
        return assertHintIsVisible(this.calculator, KEY.SPACE);
      });
      it('Nothing happens on press ALT', function() {
        return assertNothingHappens(this.calculator, KEY.ALT);
      });
      return it('Nothing happens on press any other button', function() {
        return assertNothingHappens(this.calculator, KEY.DOWN);
      });
    });
    describe('handleKeyDownOnHint', function() {
      return it('Navigation works in proper way', function() {
        var calc, cases, eventToShowHint;
        calc = this.calculator;
        eventToShowHint = jQuery.Event('keydown', {
          keyCode: KEY.ENTER
        });
        $('#calculator_hint').trigger(eventToShowHint);
        spyOn(calc, 'hideHint');
        spyOn(calc, 'prevHint');
        spyOn(calc, 'nextHint');
        spyOn($.fn, 'focus');
        cases = {
          left: {
            event: {
              keyCode: KEY.LEFT,
              shiftKey: false
            },
            returnedValue: false,
            called: {
              'prevHint': calc
            },
            isPropagationStopped: true
          },
          leftWithShift: {
            returnedValue: true,
            event: {
              keyCode: KEY.LEFT,
              shiftKey: true
            },
            not_called: {
              'prevHint': calc
            }
          },
          up: {
            event: {
              keyCode: KEY.UP,
              shiftKey: false
            },
            returnedValue: false,
            called: {
              'prevHint': calc
            },
            isPropagationStopped: true
          },
          upWithShift: {
            returnedValue: true,
            event: {
              keyCode: KEY.UP,
              shiftKey: true
            },
            not_called: {
              'prevHint': calc
            }
          },
          right: {
            event: {
              keyCode: KEY.RIGHT,
              shiftKey: false
            },
            returnedValue: false,
            called: {
              'nextHint': calc
            },
            isPropagationStopped: true
          },
          rightWithShift: {
            returnedValue: true,
            event: {
              keyCode: KEY.RIGHT,
              shiftKey: true
            },
            not_called: {
              'nextHint': calc
            }
          },
          down: {
            event: {
              keyCode: KEY.DOWN,
              shiftKey: false
            },
            returnedValue: false,
            called: {
              'nextHint': calc
            },
            isPropagationStopped: true
          },
          downWithShift: {
            returnedValue: true,
            event: {
              keyCode: KEY.DOWN,
              shiftKey: true
            },
            not_called: {
              'nextHint': calc
            }
          },
          esc: {
            returnedValue: false,
            event: {
              keyCode: KEY.ESC,
              shiftKey: false
            },
            called: {
              'hideHint': calc,
              'focus': $.fn
            },
            isPropagationStopped: true
          },
          alt: {
            returnedValue: true,
            event: {
              which: KEY.ALT
            },
            not_called: {
              'hideHint': calc,
              'nextHint': calc,
              'prevHint': calc
            }
          }
        };
        return $.each(cases, function(key, data) {
          var e, value;
          calc.hideHint.reset();
          calc.prevHint.reset();
          calc.nextHint.reset();
          $.fn.focus.reset();
          e = jQuery.Event('keydown', data.event || {});
          value = calc.handleKeyDownOnHint(e);
          if (data.called) {
            $.each(data.called, function(method, obj) {
              return expect(obj[method]).toHaveBeenCalled();
            });
          }
          if (data.not_called) {
            $.each(data.not_called, function(method, obj) {
              return expect(obj[method]).not.toHaveBeenCalled();
            });
          }
          if (data.isPropagationStopped) {
            expect(e.isPropagationStopped()).toBeTruthy();
          } else {
            expect(e.isPropagationStopped()).toBeFalsy();
          }
          return expect(value).toBe(data.returnedValue);
        });
      });
    });
    return describe('calculate', function() {
      beforeEach(function() {
        $('#calculator_input').val('1+2');
        spyOn($, 'getWithPrefix').andCallFake(function(url, data, callback) {
          return callback({
            result: 3
          });
        });
        return this.calculator.calculate();
      });
      it('send data to /calculate', function() {
        return expect($.getWithPrefix).toHaveBeenCalledWith('/calculate', {
          equation: '1+2'
        }, jasmine.any(Function));
      });
      return it('update the calculator output', function() {
        return expect($('#calculator_output').val()).toEqual('3');
      });
    });
  });

}).call(this);
