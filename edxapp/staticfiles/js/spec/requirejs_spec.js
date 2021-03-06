(function() {
  describe("RequireJS namespacing", function() {
    beforeEach(function() {
      return this.addMatchers({
        requirejsTobeUndefined: function() {
          return typeof requirejs === "undefined";
        },
        requireTobeUndefined: function() {
          return typeof require === "undefined";
        },
        defineTobeUndefined: function() {
          return typeof define === "undefined";
        }
      });
    });
    it("check that the RequireJS object is present in the global namespace", function() {
      expect(RequireJS).toEqual(jasmine.any(Object));
      return expect(window.RequireJS).toEqual(jasmine.any(Object));
    });
    return it("check that requirejs(), require(), and define() are not in the global namespace", function() {
      expect({}).requirejsTobeUndefined();
      expect({}).requireTobeUndefined();
      expect({}).defineTobeUndefined();
      expect(window.requirejs).not.toBeDefined();
      expect(window.require).not.toBeDefined();
      return expect(window.define).not.toBeDefined();
    });
  });

  describe("RequireJS module creation", function() {
    var inDefineCallback, inRequireCallback;
    inDefineCallback = void 0;
    inRequireCallback = void 0;
    return it("check that we can use RequireJS to define() and require() a module", function() {
      runs(function() {
        inDefineCallback = false;
        inRequireCallback = false;
        RequireJS.define("test_module", [], function() {
          inDefineCallback = true;
          return {
            module_status: "OK"
          };
        });
        return RequireJS.require(["test_module"], function(test_module) {
          inRequireCallback = true;
          return expect(test_module.module_status).toBe("OK");
        });
      });
      waitsFor((function() {
        if ((inDefineCallback !== true) || (inRequireCallback !== true)) {
          return false;
        }
        return true;
      }), "We should eventually end up in the defined callback", 1000);
      return runs(function() {
        expect(inDefineCallback).toBeTruthy();
        return expect(inRequireCallback).toBeTruthy();
      });
    });
  });

}).call(this);
