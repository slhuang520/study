$(function () {
  $(document).ajaxStart(function () {
    $("#loading").show();
  });
  $(document).ajaxComplete(function () {
    $("#loading").hide();
  });
  function getDeptList(pageNo) {
    pageNo = pageNo || 1;
    // var deferred = $.Deferred();
    $.getJSON(getContextPath() + "/dept.do?method=list&pageNo="+pageNo, function (res) {
      console.log(res);
      if (!res) {
        alert("获取Dept列表失败。");
        return;
      }

      var $deptList = $("#dept_list");
      $deptList.empty();
      for (var idx in res.deptList) {
        var tr = $("<tr></tr>");
        var dept = res.deptList[idx];
        $("<td>" + dept.name + "</td>").appendTo(tr);
        $("<td>" + dept.creator.name + "</td>").appendTo(tr);
        $("<td>" + dept.createDate + "</td>").appendTo(tr);
        $("<td>" + dept.updater.name + "</td>").appendTo(tr);
        $("<td>" + dept.updateDate + "</td>").appendTo(tr);
        $deptList.append(tr);
      }

      // total = res.pager.total;
      createPager(res.pager);
      setPagerEvent(getDeptList, res.pager.total);
      // deferred.resolve();
    });
    // return deferred.promise();
  }
  getDeptList();
  // getDeptList().then(function () {
  //   setPagerEvent(getDeptList, total);
  // });
});