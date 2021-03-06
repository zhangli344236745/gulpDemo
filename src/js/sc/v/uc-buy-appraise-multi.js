/**
 *
 * @authors 谭子良
 * @date    2014-05-21 13:53:24
 * @version 1.0.0
 */

define(function (require, exports, module) {

	var $ = require('jquery');
	require('plugin/jquery.tab')($);
	require('plugin/jquery.inputFocus')($);
	require('plugin/jquery.moreTip')($);

	$(function() {

		// 头部右侧搜索
		$('.search-area').tab({
			titleActive: 'current', 	        // 标题激活样式
			cntActive: 	'current' 		        // 内容激活样式
		});
		
		//搜索输入框得到焦点，与失去焦点
		$('.search-area').find(".text").inputFocus();    //进入焦点时
		
		//星星评级
		$(".starLevel").find("i").click(function(){
			var index = $(this).index();
			$(this).parents(".starLevel").find("input:hidden").val(index+1);
			$(this).parent().find("i").removeClass("selected");
			$(this).prevAll().addClass("selected");
			$(this).addClass("selected");
		})

	});
			
});