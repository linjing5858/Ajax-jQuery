/**
 * 功能：jQuery AJAX公共功能设置
 * 日期：2017/3/23
 **/
/****************************************/
/* 页面载入完成后执行 */
/****************************************/
$(function () {
	/* 写入导航文件 */
	$.ajax({
		type: "GET",
		url: "pages/header.html",
		context: $("header"),
		dataType: "html"
	}).done(function (elements) {
		$(this).html(elements);
	});
	/* 导航载入AJAX数据 */
	$('header').on("click", "a", function (e) {
		$(this).addClass("ckd").parent().siblings().children().removeClass("ckd");
		let anchorTxt = $(this).text();
		switch (anchorTxt) {
			case "$.get":
				loadTextFile();
				break;
			case "$.get2":
				loadTextFile2();
				break;
			case "$.getJSON":
				loadJSONFile();
				break;
			case "$.getScript":
				loadJavaScriptFile();
				break;
			case "$.post":
				loadHTMLFile();
				break;
			case "$.ajax":
				loadOtherFile("GET", "pages/ajaxHTMLFile.html", {"name": "aulence"});
				break;
			default:
				console.log("no");
		}
	});
	
	/* 请求完成后在控制台输出请求的文本 */
	$(document).ajaxComplete(function(event, xhr, set) {
		if(set.url === "doc/textFile.txt") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if(set.url === "json/test.json") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if(set.url === "js/javascriptFile.js") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if(set.url === "pages/htmlFile.html") {
			console.clear();
			console.log(xhr.responseText);
		}
		else if(set.url === "pages/ajaxHTMLFile.html?name=aulence") {
			console.clear();
			console.log(xhr.responseText);
		}
	});
});

/* 载入Text文件 */
function loadTextFile() {
	// 适用范围：html、txt、xml
	$.get("doc/textFile.txt", function (text) {
		$("main").html(text);
	});
}
/* 载入HTML文件 */
function loadTextFile2() {
	// 适用范围：html、txt、xml
	$.get("pages/htmlFile3.html").then(
		function (content) {
			$("main").html(content);
		},
		function (content) {
			$("main").html("<span style='color: #e00'>加载错误！</span>");
		}
	);
}
/* 载入JSON文件 */
function loadJSONFile() {
	// 适用范围：json
	$.getJSON("json/test.json", function (data) {
		var $main = $("main");
		$main.html(`
			<div class="userInfo">
				<div class="infoLine">
					<label>姓名：</label>
					<span>${data.name}</span>
				</div>
				<div class="infoLine">
					<label>年龄：</label>
					<span>${data.age}</span>
				</div>
				<div class="infoLine">
					<label>职业：</label>
					<span>${data.profession}</span>
				</div>
				<div class="infoLine">
					<label>技能：</label>
					<span></span>
				</div>
			</div>
		`);
		let str = "";
		$.each(data.skill, function (index,element) {
			str += element + "、";
		});
		str = str.slice(0, str.lastIndexOf("、"));
		$main.find(".infoLine").eq(3).children("span").text(str);
	});
}

/* 载入JavaScript文件 */
function loadJavaScriptFile() {
	$.getScript("js/javascriptFile.js");
}

var dataObj = {
	username: "xiaoluohao",
	age: 23,
	skill: "HTML"
}
function testGetParam() {
	var dataObjParam = $.param(dataObj);
	$.get("http://www.domain.php?" + dataObjParam);
}
/* 载入HTML文件 */
function loadHTMLFile() {
	$.post("pages/htmlFile.html", dataObj,function (data) {
		$(`main`).html(data);
	});
}

/* 使用$.ajax载入其它文件数据 */
function loadOtherFile(sendType, url, sendData) {
	$.ajax({
		type: sendType,// GET
		url: url,// "pages/ajaxHTMLFile.html"
		dataType: "html",
		data: sendData,// {"name": "aulence"}
		success: function (elements) {
			$(`main`).html(elements);
		},
		error: function (errMesg) {
			console.log(errMesg);
		}
	});
	// 等同于
	/*$.get("pages/ajaxHTMLFile.html?name=aulence",function (elements) {
		$(`main`).html(elements);
	});*/
}