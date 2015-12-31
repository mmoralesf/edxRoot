// Generated by CoffeeScript 1.6.1
(function() {

  describe("DiscussionThreadView", function() {
    var assertContentVisible, assertExpandedContentVisible, assertResponseCountAndPaginationCorrect, renderWithContent;
    beforeEach(function() {
      DiscussionSpecHelper.setUpGlobals();
      DiscussionSpecHelper.setUnderscoreFixtures();
      jasmine.Clock.useMock();
      this.threadData = DiscussionViewSpecHelper.makeThreadWithProps({});
      this.thread = new Thread(this.threadData);
      this.discussion = new Discussion(this.thread);
      spyOn($, "ajax");
      spyOn(DiscussionThreadShowView.prototype, "convertMath");
      spyOn(DiscussionContentView.prototype, "makeWmdEditor");
      spyOn(DiscussionUtil, "makeWmdEditor");
      return spyOn(ThreadResponseView.prototype, "renderShowView");
    });
    renderWithContent = function(view, content) {
      DiscussionViewSpecHelper.setNextResponseContent(content);
      view.render();
      return jasmine.Clock.tick(100);
    };
    assertContentVisible = function(view, selector, visible) {
      var content;
      content = view.$el.find(selector);
      expect(content.length).toBeGreaterThan(0);
      return content.each(function(i, elem) {
        return expect($(elem).is(":visible")).toEqual(visible);
      });
    };
    assertExpandedContentVisible = function(view, expanded) {
      expect(view.$el.hasClass("expanded")).toEqual(expanded);
      assertContentVisible(view, ".post-extended-content", expanded);
      assertContentVisible(view, ".forum-thread-expand", !expanded);
      return assertContentVisible(view, ".forum-thread-collapse", expanded);
    };
    assertResponseCountAndPaginationCorrect = function(view, countText, displayCountText, buttonText) {
      expect(view.$el.find(".response-count").text()).toEqual(countText);
      if (displayCountText) {
        expect(view.$el.find(".response-display-count").text()).toEqual(displayCountText);
      } else {
        expect(view.$el.find(".response-display-count").length).toEqual(0);
      }
      if (buttonText) {
        return expect(view.$el.find(".load-response-button").text()).toEqual(buttonText);
      } else {
        return expect(view.$el.find(".load-response-button").length).toEqual(0);
      }
    };
    describe("closed and open Threads", function() {
      var checkCommentForm, checkVoteDisplay, createDiscussionThreadView,
        _this = this;
      createDiscussionThreadView = function(originallyClosed, mode) {
        var discussion, thread, threadData, view;
        threadData = DiscussionViewSpecHelper.makeThreadWithProps({
          closed: originallyClosed
        });
        thread = new Thread(threadData);
        discussion = new Discussion(thread);
        view = new DiscussionThreadView({
          model: thread,
          el: $("#fixture-element"),
          mode: mode,
          course_settings: DiscussionSpecHelper.makeCourseSettings()
        });
        renderWithContent(view, {
          resp_total: 1,
          children: [{}]
        });
        if (mode === "inline") {
          view.expand();
        }
        spyOn(DiscussionUtil, "updateWithUndo").andCallFake(function(model, updates, safeAjaxParams, errorMsg) {
          return model.set(updates);
        });
        return view;
      };
      checkCommentForm = function(originallyClosed, mode) {
        var view;
        view = createDiscussionThreadView(originallyClosed, mode);
        expect(view.$('.comment-form').closest('li').is(":visible")).toBe(!originallyClosed);
        expect(view.$(".discussion-reply-new").is(":visible")).toBe(!originallyClosed);
        view.$(".action-close").click();
        expect(view.$('.comment-form').closest('li').is(":visible")).toBe(originallyClosed);
        return expect(view.$(".discussion-reply-new").is(":visible")).toBe(originallyClosed);
      };
      checkVoteDisplay = function(originallyClosed, mode) {
        var view;
        view = createDiscussionThreadView(originallyClosed, mode);
        expect(view.$('.action-vote').is(":visible")).toBe(!originallyClosed);
        expect(view.$('.display-vote').is(":visible")).toBe(originallyClosed);
        view.$(".action-close").click();
        expect(view.$('.action-vote').is(":visible")).toBe(originallyClosed);
        return expect(view.$('.display-vote').is(":visible")).toBe(!originallyClosed);
      };
      return _.each(["tab", "inline"], function(mode) {
        it('Test that in #{mode} mode when a closed thread is opened the comment form is displayed', function() {
          return checkCommentForm(true, mode);
        });
        it('Test that in #{mode} mode when a open thread is closed the comment form is hidden', function() {
          return checkCommentForm(false, mode);
        });
        it('Test that in #{mode} mode when a closed thread is opened the vote button is displayed and vote count is hidden', function() {
          return checkVoteDisplay(true, mode);
        });
        return it('Test that in #{mode} mode when a open thread is closed the vote button is hidden and vote count is displayed', function() {
          return checkVoteDisplay(false, mode);
        });
      });
    });
    describe("tab mode", function() {
      beforeEach(function() {
        return this.view = new DiscussionThreadView({
          model: this.thread,
          el: $("#fixture-element"),
          mode: "tab",
          course_settings: DiscussionSpecHelper.makeCourseSettings()
        });
      });
      return describe("response count and pagination", function() {
        it("correctly render for a thread with no responses", function() {
          renderWithContent(this.view, {
            resp_total: 0,
            children: []
          });
          return assertResponseCountAndPaginationCorrect(this.view, "0 responses", null, null);
        });
        it("correctly render for a thread with one response", function() {
          renderWithContent(this.view, {
            resp_total: 1,
            children: [{}]
          });
          return assertResponseCountAndPaginationCorrect(this.view, "1 response", "Showing all responses", null);
        });
        it("correctly render for a thread with one additional page", function() {
          renderWithContent(this.view, {
            resp_total: 2,
            children: [{}]
          });
          return assertResponseCountAndPaginationCorrect(this.view, "2 responses", "Showing first response", "Load all responses");
        });
        it("correctly render for a thread with multiple additional pages", function() {
          renderWithContent(this.view, {
            resp_total: 111,
            children: [{}, {}]
          });
          return assertResponseCountAndPaginationCorrect(this.view, "111 responses", "Showing first 2 responses", "Load next 100 responses");
        });
        return describe("on clicking the load more button", function() {
          beforeEach(function() {
            renderWithContent(this.view, {
              resp_total: 5,
              children: [{}]
            });
            return assertResponseCountAndPaginationCorrect(this.view, "5 responses", "Showing first response", "Load all responses");
          });
          it("correctly re-render when all threads have loaded", function() {
            DiscussionViewSpecHelper.setNextResponseContent({
              resp_total: 5,
              children: [{}, {}, {}, {}]
            });
            this.view.$el.find(".load-response-button").click();
            return assertResponseCountAndPaginationCorrect(this.view, "5 responses", "Showing all responses", null);
          });
          it("correctly re-render when one page remains", function() {
            DiscussionViewSpecHelper.setNextResponseContent({
              resp_total: 42,
              children: [{}, {}]
            });
            this.view.$el.find(".load-response-button").click();
            return assertResponseCountAndPaginationCorrect(this.view, "42 responses", "Showing first 3 responses", "Load all responses");
          });
          return it("correctly re-render when multiple pages remain", function() {
            DiscussionViewSpecHelper.setNextResponseContent({
              resp_total: 111,
              children: [{}, {}]
            });
            this.view.$el.find(".load-response-button").click();
            return assertResponseCountAndPaginationCorrect(this.view, "111 responses", "Showing first 3 responses", "Load next 100 responses");
          });
        });
      });
    });
    describe("inline mode", function() {
      beforeEach(function() {
        return this.view = new DiscussionThreadView({
          model: this.thread,
          el: $("#fixture-element"),
          mode: "inline",
          course_settings: DiscussionSpecHelper.makeCourseSettings()
        });
      });
      describe("render", function() {
        it("shows content that should be visible when collapsed", function() {
          this.view.render();
          return assertExpandedContentVisible(this.view, false);
        });
        return it("does not render any responses by default", function() {
          this.view.render();
          expect($.ajax).not.toHaveBeenCalled();
          return expect(this.view.$el.find(".responses li").length).toEqual(0);
        });
      });
      return describe("expand/collapse", function() {
        it("shows/hides appropriate content", function() {
          DiscussionViewSpecHelper.setNextResponseContent({
            resp_total: 0,
            children: []
          });
          this.view.render();
          this.view.expand();
          assertExpandedContentVisible(this.view, true);
          this.view.collapse();
          return assertExpandedContentVisible(this.view, false);
        });
        it("switches between the abbreviated and full body", function() {
          var expectedAbbreviation, longBody;
          DiscussionViewSpecHelper.setNextResponseContent({
            resp_total: 0,
            children: []
          });
          longBody = new Array(100).join("test ");
          expectedAbbreviation = DiscussionUtil.abbreviateString(longBody, 140);
          this.thread.set("body", longBody);
          this.view.render();
          expect($(".post-body").text()).toEqual(expectedAbbreviation);
          expect(DiscussionThreadShowView.prototype.convertMath).toHaveBeenCalled();
          DiscussionThreadShowView.prototype.convertMath.reset();
          this.view.expand();
          expect($(".post-body").text()).toEqual(longBody);
          expect(DiscussionThreadShowView.prototype.convertMath).toHaveBeenCalled();
          DiscussionThreadShowView.prototype.convertMath.reset();
          this.view.collapse();
          expect($(".post-body").text()).toEqual(expectedAbbreviation);
          return expect(DiscussionThreadShowView.prototype.convertMath).toHaveBeenCalled();
        });
        it("strips script tags appropriately", function() {
          var longMaliciousBody, maliciousAbbreviation;
          DiscussionViewSpecHelper.setNextResponseContent({
            resp_total: 0,
            children: []
          });
          longMaliciousBody = new Array(100).join("<script>alert('Until they think warm days will never cease');</script>\n");
          this.thread.set("body", longMaliciousBody);
          maliciousAbbreviation = DiscussionUtil.abbreviateString(this.thread.get('body'), 140);
          this.view.render();
          expect($(".post-body").html()).not.toEqual(maliciousAbbreviation);
          expect($(".post-body").text()).toEqual(maliciousAbbreviation);
          expect($(".post-body").html()).not.toContain("<script");
          this.view.expand();
          expect($(".post-body").html()).not.toEqual(longMaliciousBody);
          expect($(".post-body").text()).toEqual(longMaliciousBody);
          expect($(".post-body").html()).not.toContain("<script");
          this.view.collapse();
          expect($(".post-body").html()).not.toEqual(maliciousAbbreviation);
          expect($(".post-body").text()).toEqual(maliciousAbbreviation);
          return expect($(".post-body").html()).not.toContain("<script");
        });
        return it("re-renders the show view correctly when leaving the edit view", function() {
          DiscussionViewSpecHelper.setNextResponseContent({
            resp_total: 0,
            children: []
          });
          this.view.render();
          this.view.expand();
          assertExpandedContentVisible(this.view, true);
          this.view.edit();
          assertContentVisible(this.view, ".edit-post-body", true);
          expect(this.view.$el.find(".post-actions-list").length).toBe(0);
          this.view.closeEditView(DiscussionSpecHelper.makeEventSpy());
          expect(this.view.$el.find(".edit-post-body").length).toBe(0);
          return assertContentVisible(this.view, ".post-actions-list", true);
        });
      });
    });
    return describe("for question threads", function() {
      var renderTestCase;
      beforeEach(function() {
        this.thread.set("thread_type", "question");
        return this.view = new DiscussionThreadView({
          model: this.thread,
          el: $("#fixture-element"),
          mode: "tab",
          course_settings: DiscussionSpecHelper.makeCourseSettings()
        });
      });
      renderTestCase = function(view, numEndorsed, numNonEndorsed) {
        var generateContent;
        generateContent = function(idStart, idEnd) {
          return _.map(_.range(idStart, idEnd), function(i) {
            return {
              "id": "" + i
            };
          });
        };
        renderWithContent(view, {
          endorsed_responses: generateContent(0, numEndorsed),
          non_endorsed_responses: generateContent(numEndorsed, numEndorsed + numNonEndorsed),
          non_endorsed_resp_total: numNonEndorsed
        });
        expect(view.$(".js-marked-answer-list .discussion-response").length).toEqual(numEndorsed);
        expect(view.$(".js-response-list .discussion-response").length).toEqual(numNonEndorsed);
        return assertResponseCountAndPaginationCorrect(view, "" + numNonEndorsed + " " + (numEndorsed ? "other " : "") + (numNonEndorsed === 1 ? "response" : "responses"), numNonEndorsed ? "Showing all responses" : null, null);
      };
      _.each({
        "no": 0,
        "one": 1,
        "many": 5
      }, function(numEndorsed, endorsedDesc) {
        return _.each({
          "no": 0,
          "one": 1,
          "many": 5
        }, function(numNonEndorsed, nonEndorsedDesc) {
          return it("renders correctly with " + endorsedDesc + " marked answer(s) and " + nonEndorsedDesc + " response(s)", function() {
            return renderTestCase(this.view, numEndorsed, numNonEndorsed);
          });
        });
      });
      return it("handles pagination correctly", function() {
        renderWithContent(this.view, {
          endorsed_responses: [
            {
              id: "1"
            }, {
              id: "2"
            }
          ],
          non_endorsed_responses: [
            {
              id: "3"
            }, {
              id: "4"
            }, {
              id: "5"
            }
          ],
          non_endorsed_resp_total: 42
        });
        DiscussionViewSpecHelper.setNextResponseContent({
          endorsed_responses: [
            {
              id: "1"
            }, {
              id: "2"
            }, {
              id: "6"
            }
          ],
          non_endorsed_responses: [
            {
              id: "7"
            }, {
              id: "8"
            }, {
              id: "9"
            }
          ],
          non_endorsed_resp_total: 41
        });
        this.view.$el.find(".load-response-button").click();
        expect($(".js-marked-answer-list .discussion-response").length).toEqual(3);
        expect($(".js-response-list .discussion-response").length).toEqual(6);
        return assertResponseCountAndPaginationCorrect(this.view, "41 other responses", "Showing first 6 responses", "Load all responses");
      });
    });
  });

}).call(this);
