(function() {
  jasmine.stubbedMetadata = {
    slowerSpeedYoutubeId: {
      id: 'slowerSpeedYoutubeId',
      duration: 300
    },
    normalSpeedYoutubeId: {
      id: 'normalSpeedYoutubeId',
      duration: 200
    },
    bogus: {
      duration: 100
    }
  };

  jasmine.stubbedCaption = {
    start: [0, 10000, 20000, 30000],
    text: ['Caption at 0', 'Caption at 10000', 'Caption at 20000', 'Caption at 30000']
  };

  jasmine.stubRequests = function() {
    return spyOn($, 'ajax').andCallFake(function(settings) {
      var match;
      if (match = settings.url.match(/youtube\.com\/.+\/videos\/(.+)\?v=2&alt=jsonc/)) {
        return settings.success({
          data: jasmine.stubbedMetadata[match[1]]
        });
      } else if (match = settings.url.match(/static\/subs\/(.+)\.srt\.sjson/)) {
        return settings.success(jasmine.stubbedCaption);
      } else if (settings.url.match(/modx\/.+\/problem_get$/)) {
        return settings.success({
          html: readFixtures('problem_content.html')
        });
      } else if (settings.url === '/calculate' || settings.url.match(/modx\/.+\/goto_position$/) || settings.url.match(/event$/) || settings.url.match(/modx\/.+\/problem_(check|reset|show|save)$/)) {

      } else {
        throw "External request attempted for " + settings.url + ", which is not defined.";
      }
    });
  };

  jasmine.stubYoutubePlayer = function() {
    return YT.Player = function() {
      return jasmine.createSpyObj('YT.Player', ['cueVideoById', 'getVideoEmbedCode', 'getCurrentTime', 'getPlayerState', 'getVolume', 'setVolume', 'loadVideoById', 'playVideo', 'pauseVideo', 'seekTo']);
    };
  };

  jasmine.stubVideoPlayer = function(context, enableParts, createPlayer) {
    var currentPartName, part, suite, _i, _len, _ref;
    if (createPlayer == null) {
      createPlayer = true;
    }
    if (!$.isArray(enableParts)) {
      enableParts = [enableParts];
    }
    suite = context.suite;
    while (suite = suite.parentSuite) {
      currentPartName = suite.description;
    }
    enableParts.push(currentPartName);
    _ref = ['VideoCaption', 'VideoSpeedControl', 'VideoVolumeControl', 'VideoProgressSlider'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      if (!($.inArray(part, enableParts) >= 0)) {
        spyOn(window, part);
      }
    }
    loadFixtures('video.html');
    jasmine.stubRequests();
    YT.Player = void 0;
    context.video = new Video('example', '.75:slowerSpeedYoutubeId,1.0:normalSpeedYoutubeId');
    jasmine.stubYoutubePlayer();
    if (createPlayer) {
      return new VideoPlayer({
        video: context.video
      });
    }
  };

  spyOn(window, 'onunload');

  window.YT = {
    PlayerState: {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
    }
  };

  $.cookie = jasmine.createSpy('jQuery.cookie').andReturn('1.0');

  $.fn.qtip = jasmine.createSpy('jQuery.qtip');

  $.fn.scrollTo = jasmine.createSpy('jQuery.scrollTo');

}).call(this);
