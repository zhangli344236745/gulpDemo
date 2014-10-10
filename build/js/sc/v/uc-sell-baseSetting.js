/**
 * 
 * @authors 谭子良
 * @date    2014-08-07 14:36:22
 * @version $Id$
 */

define(function(require, exports, module) {

    var $ = require('jquery');

    $(function() {

        //页面顶部商品与商铺搜索
        require.async('sc/v/pub-ucTopSearch',function(o) {
            o.setTab();
        });
		
		//页面左侧导航菜单分组展开与收起
        require.async('sc/v/pub-ucSideMenu',function(o) {
            o.sMenu();
        });
		
		//当前左侧菜单导航定位
		$(".uc-mod-sideMenu").find("ul").eq(4).find("li").eq(1).addClass("current").append("<span></span>");

    });

    //编辑器尺寸大小
    var EditorOptions = {
        width: '96%',
        height: '300px',
        items:[
        'fontname','fontsize','forecolor','hilitecolor','lineheight','|', 'bold', 'italic','underline','strikethrough','removeformat', '|','justifyleft','justifycenter','justifyright','|','link','unlink']
    };
    exports.EditorOptions = EditorOptions;

});
