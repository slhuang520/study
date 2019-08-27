
function getContextPath() {
  console.log(document.location);
  var pathName = document.location.pathname;
  console.log(pathName);
  var index = pathName.substr(1).indexOf("/");
  return pathName.substr(0, index + 1);
}

function setPagerEvent(cb, total) {
  $(".page-item").unbind("click").click(function () {
    if ($(this).hasClass("disabled")) {
      return;
    }

    if ($(this).hasClass("first-page")) {
      cb(1);
      return
    }

    var curPage = 1;
    if ($(this).hasClass("active")) {
      curPage = $(this).text();
    } else {
      curPage = parseInt($(this).siblings(".active").text()||1);
    }

    if ($(this).hasClass("pre-page")) {
      cb(curPage - 1);
      return
    }

    if ($(this).hasClass("last-page")) {
      cb(total);
      return
    }

    if ($(this).hasClass("next-page")) {
      cb(curPage + 1);
      return
    }

    var clickPage = $(this).find(".page-link").text();
    if (clickPage === String(curPage)) {
      return;
    }

    cb(clickPage);
  });
}

function createPager($el, pager) {
  $el.find(".new-item").remove();
  $el.find(".list-records").text(pager.records);
  $el.find(".list-total").text(pager.total);
  $el.find(".list-page-size").text(pager.pageSize);
  var $base = $el.find(".pre-page");
  if (pager.pageNo === 1) {
    $el.find(".first-page").addClass("disabled");
    $base.addClass("disabled");
  } else {
    $el.find(".first-page").removeClass("disabled");
    $base.removeClass("disabled");
  }
  if (pager.pageNo === pager.total) {
    $el.find(".last-page").addClass("disabled");
    $el.find(".next-page").addClass("disabled");
  } else {
    $el.find(".last-page").removeClass("disabled");
    $el.find(".next-page").removeClass("disabled");
  }
  for (var i = pager.start; i <= pager.end; i++) {
    var active = "";
    if (pager.pageNo === i) {
      active = "active";
    }
    $base.after($base = $("<li class='page-item new-item " + active + "'><span class='page-link'><span aria-hidden='true'>" + i + "</span></span></li>"));
  }
}