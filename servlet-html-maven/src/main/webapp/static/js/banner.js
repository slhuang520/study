$(function () {
  var banner = {
    pho: [{
      img: '/static/img/basic/bg1.jpg',
      color: '#e7e9e8'
    }, {
      img: '/static/img/basic/bg2.jpg',
      color: '#ecf0fc'
    }, {
      img: '/static/img/basic/bg3.jpg',
      color: '#e2e2e2'
    }, {
      img: '/static/img/basic/bg4.jpg',
      color: '#ffffff'
    }, {
      img: '/static/img/basic/bg5.jpg',
      color: '#f3f3f3'
    }, {
      img: '/static/img/basic/bg6.jpg',
      color: '#ebdebe'
    }],
    index: 1,
    banner_timer: 0
  };
  $('#logDiv ul li').first().css("color", "#333");
  $('#logDiv ul li').hover(function () {
    clearInterval(banner.banner_timer);
    bannerFn(this);
  }, function () {
    banner.index = $(this).index() + 1;
    banner.banner_timer = setInterval(banner_fn, 5000);
  });
  banner.banner_timer = setInterval(banner_fn, 5000);

  function bannerFn(obj) {
    $('#logDiv ul li').css('color', "#bbb");
    $(obj).css('color', "#333");
    $("#header").css("background-color", banner.pho[$(obj).index()].color);
    $("#logDiv").css('background', "url(" + getContextPath() + banner.pho[$(obj).index()].img + ") no-repeat center");
  }

  function banner_fn() {
    if (banner.index >= $('#logDiv ul li').length) banner.index = 0;
    bannerFn($('#logDiv ul li').eq(banner.index).first());
    banner.index++;
  }

});