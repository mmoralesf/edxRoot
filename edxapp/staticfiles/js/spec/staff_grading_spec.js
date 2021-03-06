(function() {
  describe('StaffGrading', function() {
    beforeEach(function() {
      spyOn(Logger, 'log');
      return this.mockBackend = new StaffGradingBackend('url', true);
    });
    return describe('constructor', function() {
      beforeEach(function() {
        return this.staff_grading = new StaffGrading(this.mockBackend);
      });
      return it('we are originally in the list view', function() {
        return expect(this.staff_grading.list_view).toBe(true);
      });
    });
  });

}).call(this);
