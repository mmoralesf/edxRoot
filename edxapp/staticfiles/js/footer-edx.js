var edx=edx||{};!function($){"use strict";edx.footer=function(){var _fn={el:"#footer-edx-v3",analytics:{init:function(){_fn.$el=_fn.$el||$(_fn.el),_fn.$el.length&&_fn.analytics.eventListener()},eventListener:function(){window.analytics&&_fn.$el.on("click","a",_fn.analytics.track)},track:function(event){var $link=$(event.currentTarget);$link.hasClass("external")&&window.analytics.track("edx.bi.footer.link",{category:"outbound_link",label:$link.attr("href")})}}};return{analytics:_fn.analytics.init}}(),edx.footer.analytics()}(jQuery);