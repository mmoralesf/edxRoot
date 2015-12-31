(function() {
  describe('Courseware', function() {
    describe('start', function() {
      it('create the navigation', function() {
        spyOn(window, 'Navigation');
        Courseware.start();
        return expect(window.Navigation).toHaveBeenCalled();
      });
      return it('binds the Logger', function() {
        spyOn(Logger, 'bind');
        Courseware.start();
        return expect(Logger.bind).toHaveBeenCalled();
      });
    });
    return describe('render', function() {
      beforeEach(function() {
        jasmine.stubRequests();
        this.courseware = new Courseware;
        spyOn(window, 'Histogram');
        spyOn(window, 'Problem');
        spyOn(window, 'Video');
        spyOn(XBlock, 'initializeBlocks');
        setFixtures("<div class=\"course-content\">\n  <div id=\"video_1\" class=\"video\" data-streams=\"1.0:abc1234\"></div>\n  <div id=\"video_2\" class=\"video\" data-streams=\"1.0:def5678\"></div>\n  <div id=\"problem_3\" class=\"problems-wrapper\" data-problem-id=\"3\" data-url=\"/example/url/\">\n    <div id=\"histogram_3\" class=\"histogram\" data-histogram=\"[[0, 1]]\" style=\"height: 20px; display: block;\">\n  </div>\n</div>");
        return this.courseware.render();
      });
      it('ensure that the XModules have been loaded', function() {
        return expect(XBlock.initializeBlocks).toHaveBeenCalled();
      });
      return it('detect the histrogram element and convert it', function() {
        return expect(window.Histogram).toHaveBeenCalledWith('3', [[0, 1]]);
      });
    });
  });

}).call(this);
