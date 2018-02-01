;/*!src/js/comment/index.js*/
// 基础类


 /*
    发布的事件
    click-dropdown-item  点击下拉列表时候的事件，接受自定义参数`releatedTarget`
*/

! function ($) {

    "use strict"; // jshint ;_;


    /* DROPDOWN CLASS DEFINITION
     * ========================= */

    var toggle = '[data-toggle=dropdown]',
        Dropdown = function (element,options) {
            //最外层组件
           
            console.log("type::",options)
            var $el=$(element);
            //触发方式
            switch(options.triggertype){
                case "hover":
                $el.on('mouseenter.dropdown.data-api', this.toggle);
                $el.on('mouseleave.dropdown.data-api', this.hide);
                break;
                default:
                $el.on('click.dropdown.data-api', this.toggle);
                break;
            }

            $('html').on('click', function (e) {
                if(!($el.find($(e.target)).length||$el.is($(e.target)))){
                    $el.parent().removeClass('ant-active')
                }
            })
           
        }

    Dropdown.prototype = {

        constructor: Dropdown,
        toggle: function (e) {
            var $this = $(this),
                $parent, isActive;

            if ($this.is('.disabled, :disabled')) return

            $parent = getParent($this)

            isActive = $parent.hasClass('ant-active')

            clearMenus()//这个清除只针对非js绑定的组件，如果是用js实例化组件就没有作用,有特定目的，不要修改
            //如果已经打开的class自动关闭
            if (!isActive) {

                $parent.addClass('ant-active')
            }

            $this.focus();

        },
        keydown: function (e) {
            var $this, $items, $active, $parent, isActive, index
            if (!/(38|40|27)/.test(e.keyCode)) return

            $this = $(this)

            e.preventDefault()
            // e.stopPropagation()

            if ($this.is('.disabled, :disabled')) return

            $parent = getParent($this)

            isActive = $parent.hasClass('ant-active')

            if (!isActive || (isActive && e.keyCode == 27)) {
                if (e.which == 27) $parent.find(toggle).focus()
                return $this.click()
            }

            $items = $('[role=menu] li')

            if (!$items.length) return

            index = $items.index($items.filter(':focus'))

            if (e.keyCode == 38 && index > 0) index-- // up
                if (e.keyCode == 40 && index < $items.length - 1) index++ // down
                    if (!~index) index = 0

            $items
                .eq(index)
                .focus()
        },
        hide: function (e) {
            //关闭当前
            $(this).parents(".ant-active").removeClass('ant-active')
        }

    }
    //默认配置
    Dropdown.prototype.DEFAULT={
        triggertype:"click" //触发方式
    }

    function clearMenus() {
        $(toggle).each(function () {
            getParent($(this)).removeClass('ant-active')
         
        })
    }

    function getParent($this) {
        var selector = $this.attr('data-target'),
            $parent

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = selector && $(selector)

        if (!$parent || !$parent.length){
            $parent = $this.parent()
        }

        return $parent
    }


    /* DROPDOWN PLUGIN DEFINITION
     * ========================== */

    var old = $.fn.dropdown
    //调用方法  $(".xx").dropdown({})
    //$(".xx")等同
    $.fn.dropdown = function (option) {
        var options=$.extend({},Dropdown.prototype.DEFAULT,option);
        return this.each(function () {
            var $this = $(this),
                data = $this.data('dropdown')
            //把对象存在在dom上面
            if (!data) $this.data('dropdown', (data = new Dropdown(this,options)))
            //if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* DROPDOWN NO CONFLICT
     * ==================== */

    $.fn.dropdown.noConflict = function () {
        $.fn.dropdown = old
        return this
    }


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
     * =================================== */


    $(document)
        .on('click.dropdown.data-api', function(e){
           // console.log($(toggle).has($(e.target)).length,$(e.target))
            if(!$(toggle).has($(e.target)).length){
                clearMenus();
            }
        })
        .on('click.dropdown.data-api', '.dropdown form', function (e) {
            e.stopPropagation()
        })
        .on('.dropdown-menu', function (e) {
            e.stopPropagation()
        })
         .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
        .on('keydown.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)

}(window.jQuery);;


// //拓展类
/*
自定义标签:
data-toggle="select-single  选择容器
data-select-option          //选项列表dom
select-selected-val       //选择后填写string的dom
select-selected-key         //选择后填写val的input
data-select-option-id="id" //列表id

触发事件：
select-single-change    //input填入数据
传递参数:
type:
val,
elem
*/
! function ($) {
    "use strict";
    var SeletSingle = function (element, option) {
        this.$element = $(element);
        this.super = this.$element.data('dropdown');
        this.options = option;
    };

    SeletSingle.prototype.constructor = SeletSingle;
    SeletSingle.prototype.toggle = function (e) {
        //重写父级方法
        this.super.toggle(e);
    };

    SeletSingle.prototype.selected = function (list) {

    };
    //预留
    SeletSingle.DEFAULTS = {
        inputdom: '[select-val]' //选择后的填入input的节点
            ,
        closeAfterCancel: true
    }

    $.fn.seletSingle = function (option, _relatedTarget) {
        var options = $.extend({}, InfoModal.DEFAULTS, $(this).data(), typeof option == 'object' && option)
        return this.each(function () {
            var $this = $(this),
                data = $this.data('select-single')
            //把对象存在在dom上面
            if (!data) $this.data('select-single', (data = new SeletSingle(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }
    var old = $.fn.seletSingle;

    $.fn.seletSingle.Constructor = SeletSingle;

    $.fn.seletSingle.noConflict = function () {
        $.fn.seletSingle = old
        return this
    }
    //实例下拉
    // $('[data-toggle="select-single"]').dropdown();
    //新建单选对象
    var SELECTSINGLE;
    $(document).on("mouseenter", '[data-toggle="select-single"]', function () {
        console.log($(this).data("dropdown"),$(this))
        if (!$(this).data("dropdown")) {
            //实例下拉
            $(this).dropdown();
            console.log($(this).data("dropdown"),$(this))
            //新建单选对象
            SELECTSINGLE = new SeletSingle($(this), {});
        }

    });
    //选中时候事件
    $(document).on('click.select-siggle-item', '[data-select-option]', function (e) {
        var elem = $(this);
        $(this).parents('[data-toggle="select-single"]').find("[select-selected-val]").text(elem.text()).addClass("ant-select-selection-selected-value").removeClass("ant-select-selection__placeholder")
        //填写value
        $(this).parents('[data-toggle="select-single"]').find("[select-selected-key]").val(elem.attr("data-select-option-id"));
        //填入数据的事件触发
        var inputDom = $(this).parents('[data-toggle="select-single"]').find("[select-selected-key]");
        console.log("::::", inputDom)
        $(document).trigger("select-single-change.data-api", {
            type: inputDom.attr("name"),
            val: inputDom.val(),
            elem: $(this)
        });
        //手动关闭列表
        SELECTSINGLE.super.hide.call($(this), e)
        e.stopPropagation();
    });

}(window.jQuery);;//单选列表
/*
自定义标签:
data-toggle="select-multiple  选择最外层容器
data-select-option-mult-wrap    //待选列表最外层容器
data-select-option-mult         //选项列表dom


data-select--mult-wrap                //展示选择后的列表容器
data-select-option-mult-end            //选中后的列表

data-selected-trigger="xx"   //重置多选项并且修改值

data-select-option-id       //选择后填写string的dom的值
select-selected-val         //选择后填写val的input的值

//触发的事件
select-multiple-blur-change
select-multiple-change

*/
! function ($) {
    "use strict";
    var SeletMultiple = function (element, option) {
        this.$element = $(element);
        this.super = this.$element.data('dropdown');
        this.options = option;
    };

    SeletMultiple.prototype.constructor = SeletMultiple;
    SeletMultiple.prototype.toggle = function (e) {
        //重写父级方法
        this.super.toggle(e);
    };
    /*选择列表
        obj {object}:
        id:对应的id
        text:对应的文字
    */
    SeletMultiple.prototype.selected = function (obj) {
        console.log($(this))
        var dom = '<li   unselectable="unselectable" data-select-option-mult-end data-select-option-id="' + obj.id + '" class="ant-select-selection__choice" title="' + obj.text + '" style="user-select: none;">' +
            '<div class="ant-select-selection__choice__content">' + obj.text + '</div>' +
            '<span class="ant-select-selection__choice__remove"></span>' +
            '</li>';
        $(this).parents("[data-toggle=select-multiple]").find("[data-select--mult-wrap]").append(dom);
        $(this).addClass("ant-select-dropdown-menu-item-selected");
        //填入input

        var selectedVal = $(this).parents("[data-toggle=select-multiple]").find("input[type=hidden]").val();
        selectedVal = selectedVal ? (selectedVal += "," + obj.id) : obj.id;
        $(this).parents("[data-toggle=select-multiple]").find("input[type=hidden]").val(selectedVal);
        //填入数据的事件触发
        $(document).trigger("select-multiple-change");
        $(document).trigger("select-multiple-change-selected");
    };
    /*
        放弃列表
    */
    SeletMultiple.prototype.unselected = function () {
        //判断点击的是【待选容器】下的列表还是【已选容器】下的列表删除按钮
        var id = $(this).attr("data-select-option-id") ? $(this).attr("data-select-option-id") : $(this).parents("[data-select-option-mult-end]").attr("data-select-option-id");
        //取出待选容器里面的列表的高亮
        $(this).parents("[data-toggle=select-multiple]").find("[data-select-option-mult-wrap] [data-select-option-id=" + id + "]").removeClass("ant-select-dropdown-menu-item-selected");

        //移除选择的值
        var selectedVal = $(this).parents("[data-toggle=select-multiple]").find("input[type=hidden]").val();
        console.log($(this).parents("[data-toggle=select-multiple]"))
        var tmp = [];
        $.each(selectedVal.split(","), function (index, item) {
            if (item != id) {
                tmp.push(item);
            }
        });
        var tmpToString = tmp.join(",");
        $(this).parents("[data-toggle=select-multiple]").find("input[type=hidden]").val(tmpToString);


        //移除数据的事件触发
        $(document).trigger("select-multiple-change");
        $(document).trigger("select-multiple-unselected");

        //已选容器里面的选项,请保持DOM移除在最后一行
        $(this).parents("[data-toggle=select-multiple]").find("[data-select--mult-wrap] [data-select-option-id=" + id + "]").remove();


    };
    SeletMultiple.prototype.isEmpty = function () {

    };

    //预留
    SeletMultiple.DEFAULTS = {
        inputdom: '[select-val]' //选择后的填入input的节点
            ,
        closeAfterCancel: true
    }

    $.fn.seletMultiple = function (option, _relatedTarget) {
        var options = $.extend({}, InfoModal.DEFAULTS, $(this).data(), typeof option == 'object' && option)
        return this.each(function () {
            var $this = $(this),
                data = $this.data('select-single')
            //把对象存在在dom上面
            if (!data) $this.data('select-single', (data = new SeletMultiple(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }
    var old = $.fn.seletSingle;

    $.fn.seletSingle.Constructor = SeletMultiple;

    $.fn.seletSingle.noConflict = function () {
        $.fn.seletSingle = old
        return this
    }
    //实例下拉
    //新建单选对象
    var SELECTMULTIPLE;
    $(document).on("mouseenter", '[data-toggle=select-multiple]', function () {
        console.log("多选", $(this).data("dropdown"))
        if (!$(this).data("dropdown")) {
            //实例下拉
            $(this).dropdown();
            //新建单选对象
            SELECTMULTIPLE = new SeletMultiple($(this), {});
        }
    });
    //下拉列表
    $(document).on('click.select-multiple-item.data-api', '[data-select-option-mult]', function (e) {
        var elem = $(this);
        if ($(this).hasClass("ant-select-dropdown-menu-item-selected")) {
            //放弃选择
            SELECTMULTIPLE.unselected.call($(this));
        } else {
            //选择
            var obj = {
                text: $(this).text(),
                id: $(this).attr("data-select-option-id")
            }
            SELECTMULTIPLE.selected.call($(this), obj);
        }

        e.stopPropagation();
    });
    //[已选容器]里面的列表
    $(document).on('click.select-multiple-end-item.data-api', '[data-select-option-mult-end] .ant-select-selection__choice__remove', function (e) {
        //console.log($(this).parents())
        SELECTMULTIPLE.unselected.call($(this));
    });
    var prevVal = ""; //获取焦点时候获取值
    $(document).on("focus", '[data-toggle="select-multiple"]', function () {
        prevVal = $(this).find("input[select-selected-val]").val();
        $(this).one("blur", function () {
            var inputDom = $(this).find("input[select-selected-val]");
            console.log(inputDom.val(), "||", prevVal)
            if (inputDom.val() != prevVal) {
                $(document).trigger("select-multiple-blur-change.data-api", {
                    type: inputDom.attr("name"),
                    val: inputDom.val(),
                    elem: $(this)
                });
            }
        })
    })
    $(document).on("click", '[data-selected-trigger]', function () {
        var id = $(this).attr("data-selected-trigger"); //当前要选择的ID
        var triggerSelect = $(this).attr("data-selected-trigger-for"); //触发对应的多选select
        $("#" + triggerSelect).find("[data-select--mult-wrap]").html("");
        $("#" + triggerSelect).find("input[type=hidden]").val("");
        var selectedDom = $("#" + triggerSelect).find("[data-select-option-mult-wrap] [data-select-option-id=" + id + "]"); //选中的下拉选项
        var obj = {
            text: selectedDom.text(),
            id: id,
        };
        var inputDom = $("#" + triggerSelect).find("input[type=hidden]");
        $(document).trigger("select-multiple-blur-change.data-api", {
            type: inputDom.attr("name"),
            val: id,
            elem: selectedDom
        });
        SELECTMULTIPLE.selected.call(selectedDom, obj);
    });



}(window.jQuery);;//多选列表



//其他
/*
    自定义属性:
    data-toggle="tab"
    tab-trigger-item  
    tab-content-item 
*/


! function ($) {

    "use strict"

    /* TAB CLASS DEFINITION
     * ==================== */

    var Tab = function (element) {
        this.element = $(element)
    }

    Tab.prototype = {

        constructor: Tab

            ,
        show: function () {
            var $this = $(this.element);
            var index = $this.parents('[data-toggle="tab"]').find("[tab-trigger-item]").index($this);
            $this.parents('[data-toggle="tab"]').find("[tab-trigger-item]").eq(index).addClass("ant-tabs-tab-active").siblings().removeClass("ant-tabs-tab-active");
            $this.parents('[data-toggle="tab"]').find("[tab-content-item]").eq(index).show().siblings().hide();
        }


    }


    /* TAB PLUGIN DEFINITION
     * ===================== */

    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('tab')
            if (!data) $this.data('tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tab.Constructor = Tab


    /* TAB DATA-API
     * ============ */

    $(function () {
        $('body').on('click.tab.data-api', '[tab-trigger-item]', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    })

}(window.jQuery);//多选列表
/*
 ==============这个功能暂时不能通过·js·调用控制================
 表单类型选择目录--隐藏超出和展示超出
自定义属性：
search-form-item-hidden-show-btn
search-form-item-hidden-hide-btn
data-toggle="search-form-bar"
data-max-height="32px"
search-form-item-hidden  
分类：
1:
    自定义属性:
    data-toggle="search-form-bar"
   data-max-height="32px"
   如果超出某个高度就显示【展开按钮】
2.子元素设置了
  自定义属性:
    data-toggle="search-form-bar"
    子类:
    默认隐藏的元素：search-form-item-hidden  

   
*/


! function ($) {

    "use strict"

    /* TAB CLASS DEFINITION
     * ==================== */

    var SearchFormBar = function (element, option) {
        //通过js调用
        this.element = $(element);
        this.DEFAULT = {
                wrap: "[data-toggle=search-form-bar]", //最外层容器
                maxHeight: 0, //最高控制
                hiddenItem: "[search-form-item-hidden]", //默认隐藏的子元素
                showHiddenItemBtn: "[search-form-item-hidden-show-btn]", //展示隐藏元素的按钮
                hideHiddenItemBtn: "[search-form-item-hidden-hide-btn]", //隐藏【已经展示的“隐藏”按钮】
            },
            this.options = $.extend({}, this.DEFAULT, option); //修改当前实例的默认配置
        this.init();
    }

    SearchFormBar.prototype = {

        constructor: SearchFormBar,

        show: function () {

        },
        hide: function () {

        },
        init: function () {

            //展开和搜索列表,搜索页面用到
            var maxHeight = parseInt($(this.options.wrap).attr("data-max-height")); //最大高度
            var currentHeight = $(this.options.wrap).height(); //当前高度
            var _this = this;
            if (maxHeight && (currentHeight > maxHeight)) {
                $(this.options.showHiddenItemBtn).show();
                $(this.options.wrap).css("max-height", maxHeight + "px");

                $(document).on("click.SearchFormBar.show.data-api", this.options.showHiddenItemBtn, function () {
                    $(this).parents(_this.options.wrap).css("max-height", "none");
                    $(this).hide();
                    $(_this.options.hideHiddenItemBtn).show();
                });
                $(document).on("click.SearchFormBar.hide.data-api", _this.options.hideHiddenItemBtn, function () {
                    $(this).parents(_this.options.wrap).css("max-height", maxHeight + "px");
                    $(this).hide();
                    $(_this.options.showHiddenItemBtn).show();
                });
            } else if ($(this.options.wrap).find("[search-form-item-hidden]").length) {
                //隐藏所有【隐藏选项】
                $(this.options.wrap).find("[search-form-item-hidden]").hide();
                $(_this.options.showHiddenItemBtn).show();
                $(document).on("click.SearchFormBar.show.data-api", this.options.showHiddenItemBtn, function () {
                    $(this).parents(_this.options.wrap).find("[search-form-item-hidden]").show();
                    $(this).hide();
                    $(_this.options.hideHiddenItemBtn).show();
                });
                $(document).on("click.SearchFormBar.hide.data-api", _this.options.hideHiddenItemBtn, function () {
                    $(this).parents(_this.options.wrap).find("[search-form-item-hidden]").hide();
                    $(this).hide();
                    $(_this.options.showHiddenItemBtn).show();
                });
            }
        }


    }


    /* TAB PLUGIN DEFINITION
     * ===================== */

    $.fn.SearchFormBar = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('SearchFormBar')
            if (!data) $this.data('SearchFormBar', (data = new SearchFormBar(this, option)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.SearchFormBar.Constructor = SearchFormBar;


    /* TAB DATA-API
     * ============ */

    $(function () {
        var SEARCHFORMBAR = new SearchFormBar();
    })

}(window.jQuery);//展开和隐藏部分列表元素
/*
    自定义属性:
    data-toggle="tab"
    tab-trigger-item  
    tab-content-item 
*/


! function ($) {

    "use strict"

    /* TAB CLASS DEFINITION
     * ==================== */

    var FromTypeSelectSubmit = function (element) {
        this.element = $(element)
    }

    FromTypeSelectSubmit.prototype = {
        constructor: FromTypeSelectSubmit
    }


    /* TAB PLUGIN DEFINITION
     * ===================== */

    $.fn.FromTypeSelectSubmit = function (option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('FromTypeSelectSubmit')
            if (!data) $this.data('FromTypeSelectSubmit', (data = new FromTypeSelectSubmit(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.FromTypeSelectSubmit.Constructor = FromTypeSelectSubmit


    /* TAB DATA-API
     * ============ */

    $(function () {
        $(document).on('click.form-label.data-api', '[form-label]', function (e) {
            $(this).parent().find("input[type=hidden]").val($(this).attr("form-label"));
            var type = $(this).parent().find("input[type=hidden]").val($(this).attr("form-label"));
            //window.location.href = TOOL.changeURLPar(type, $(this).attr("form-label"))
            $("[form-input-change-submit]").submit();
        })
        //单选项选中
        $(document).on("select-single-change.data-api", function (e, data) {
            console.log("单项选项", data,data.elem)
           // window.location.href = TOOL.changeURLPar(data.type, data.val);
           $("[form-input-change-submit]").submit();
        });

        $(document).on("select-multiple-blur-change.data-api",  function (e, data) {
            //window.location.href = TOOL.changeURLPar(data.type, data.val);
            $("[form-input-change-submit]").submit();
        })

    })

}(window.jQuery);//监听表单元素值修改提交表单
/**
 * pagination.js 1.5.1
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * @version 1.5.1
 * @author mss
 * @url https://github.com/Maxiaoxiang/jQuery-plugins
 *
 * @调用方法
 * $(selector).pagination(option, callback);
 * -此处callback是初始化调用，option里的callback是点击页码后调用
 * 
 * -- example --
 * $(selector).pagination({
 *     ... // 配置参数
 *     callback: function(api) {
 *         console.log('点击页码调用该回调'); //切换页码时执行一次回调
 *     }
 * }, function(){
 *     console.log('初始化'); //插件初始化时调用该方法，比如请求第一次接口来初始化分页配置
 * });
 */
;
(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        // AMD或CMD
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {

    //配置参数
    var defaults = {
        totalData: 0, //数据总条数
        showData: 10, //每页显示的条数
        showDataArray: [10, 25, 50], //显示切换分页数,
        pageCount: 0, //总页数,默认为9
        current: 1, //当前第几页
        prevCls: 'prev', //上一页class
        nextCls: 'next', //下一页class
        prevContent: '<', //上一页内容
        nextContent: '>', //下一页内容
        activeCls: 'ant-pagination-item-active', //当前页选中状态
        coping: false, //首页和尾页
        isHide: false, //当前页数为0页或者1页时不显示分页
        homePage: '', //首页节点内容
        endPage: '', //尾页节点内容
        keepShowPN: false, //是否一直显示上一页下一页
        mode: 'unfixed', //分页模式，unfixed：不固定页码数量，fixed：固定页码数量
        count: 4, //mode为unfixed时显示当前选中页前后页数，mode为fixed显示页码总数
        jump: false, //跳转到指定页数
        jumpIptCls: 'jump-ipt', //文本框内容
        jumpBtnCls: 'jump-btn', //跳转按钮
        jumpBtn: '跳转', //跳转按钮文本
        paginationId:"",//分页组件id
        callback: function () {}, //回调
        showDataCallback: function () {} //修改每页展示展示的条数
    };

    var Pagination = function (element, options) {
        //全局变量
        var opts = options, //配置
            current, //当前页
            $document = $(document),
            $obj = $(element); //容器

        /**
         * 设置总页数
         * @param {int} page 页码
         * @return opts.pageCount 总页数配置
         */
        this.setPageCount = function (page) {
            return opts.pageCount = page;
        };

        /**
         * 获取总页数
         * 如果配置了总条数和每页显示条数，将会自动计算总页数并略过总页数配置，反之
         * @return {int} 总页数
         */
        this.getPageCount = function () {
            return opts.totalData && opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
        };

        /**
         * 获取当前页
         * @return {int} 当前页码
         */
        this.getCurrent = function () {
            return current;
        };

        /**
         * 填充数据
         * @param {int} 页码
         */
        this.filling = function (index) {
            var html = '<div class="ant-list-pagination"><ul class="ant-pagination " unselectable="unselectable">';
            current = parseInt(index) || parseInt(opts.current); //当前页码
            var pageCount = this.getPageCount(); //获取的总页数
            switch (opts.mode) { //配置模式
                case 'fixed': //固定按钮模式
                    html += '<a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a>';
                    if (opts.coping) {
                        var home = opts.coping && opts.homePage ? opts.homePage : '1';
                        html += '<a href="javascript:;" data-page="1">' + home + '</a>';
                    }
                    var start = current > opts.count - 1 ? current + opts.count - 1 > pageCount ? current - (opts.count - (pageCount - current)) : current - 2 : 1;
                    var end = current + opts.count - 1 > pageCount ? pageCount : start + opts.count;
                    for (; start <= end; start++) {
                        if (start != current) {
                            html += '<li title="1" class="ant-pagination-item ant-pagination-item-1" tabindex="' + start + '"><a href="javascript:;" data-page="' + start + '">' + start + '</a></li>';
                        } else {
                            html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 ' + opts.activeCls + '"><span class=" tabindex="' + start + '">' + start + '**</span></li>';
                        }
                    }
                    if (opts.coping) {
                        var _end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                        html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" data-page="' + pageCount + '">' + _end + '</a></li>';
                    }
                    html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" class="' + opts.nextCls + '">' + opts.nextContent + '</a></li>';
                    break;
                case 'unfixed': //不固定按钮模式
                    if (opts.keepShowPN || current > 1) { //上一页
                        html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a></li>';
                    } else {
                        if (opts.keepShowPN == false) {
                            $obj.find('.' + opts.prevCls) && $obj.find('.' + opts.prevCls).remove();
                        }
                    }
                    if (current >= opts.count + 2 && current != 1 && pageCount != opts.count) {
                        var home = opts.coping && opts.homePage ? opts.homePage : '1';
                        html += opts.coping ? '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" data-page="1">' + home + '</a></li><li title="1" class="ant-pagination-item ant-pagination-item-1 "><span>...</span>' : '</li>';
                    }
                    var start = (current - opts.count) <= 1 ? 1 : (current - opts.count);
                    var end = (current + opts.count) >= pageCount ? pageCount : (current + opts.count);
                    for (; start <= end; start++) {
                        if (start <= pageCount && start >= 1) {
                            if (start != current) {
                                html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" data-page="' + start + '">' + start + '</a></li>';
                            } else {
                                html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 ' + opts.activeCls + '"><span class="">' + start + '</span></li>';
                            }
                        }
                    }
                    if (current + opts.count < pageCount && current >= 1 && pageCount > opts.count) {
                        var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                        html += opts.coping ? '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><span>...</span></li><li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" data-page="' + pageCount + '">' + end + '</a>' : '';
                    }
                    if (opts.keepShowPN || current < pageCount) { //下一页
                        html += '<li title="1" class="ant-pagination-item ant-pagination-item-1 "><a href="javascript:;" class="' + opts.nextCls + '">' + opts.nextContent + '</a></li>';
                    } else {
                        if (opts.keepShowPN == false) {
                            $obj.find('.' + opts.nextCls) && $obj.find('.' + opts.nextCls).remove();
                        }
                    }
                    break;
                case 'easy': //简单模式
                    break;
                default:
            }
            if (opts.showDataArray.length) {
                html += '<li class="ant-pagination-options"><div>' +
                    '<div class="ant-select-selection ant-select-selection--single" data-toggle="select-single" style="width:100px;">' +
                    '<div class="ant-select-selection__rendered">' +
                    '<div unselectable="unselectable" class="ant-select-selection-selected-value" style="display: block; user-select: none;" select-selected-val="">'+ opts.showData+' 条/页</div>' +
                    '<input type="hidden" name="statusxx" select-selected-key="" value="'+opts.showData+'">' +
                    '</div>' +
                    '<span class="ant-select-arrow" unselectable="unselectable" style="user-select: none;">' +
                    '<b></b>' +
                    '</span>' +
                    '<div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft  ant-select-dropdown-hidden">' +
                    '<div style="overflow: auto;">' +
                    '<ul class="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical" role="menu">';
                $.each(opts.showDataArray, function (index, elem) {
                    html += '<li class="ant-select-dropdown-menu-item" style="user-select: none;" data-select-option="" data-select-option-id="' + elem + '">' + elem + ' 条/页</li>';
                })
                html += '</ul>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div></li>';
            }
            html += opts.jump ? '<li class="ant-pagination-options"><div class="ant-pagination-options-quick-jumper">跳至<input type="text" value=""  class="' + opts.jumpIptCls + '">页</div></li></ul></div>' : '</ul></div>';


            var that = this;
            $(document).on("select-single-change.data-api", function (e, data) {
                //监听分页组件下的单选框选中事件
                var form = $(data.elem).parents("[data-toggle=pagination]");
                if (form.length) {
                    opts.showData = data.val;
                    opts.current = 1;
                    var maxPage=opts.totalData/opts.showData;
                    console.log("最大分页:",maxPage)
                    that.setPageCount(maxPage);
                    that.filling(opts.current);
                    typeof opts.showDataCallback === 'function' && opts.showDataCallback.call(that, {
                        showData: opts.showData,
                        current: opts.current
                    });

                    $(document).trigger("pagination-change.showDataOnePage.data-api", {
                        showData: opts.showData,
                        current: that.getCurrent(),
                        elem:form
                    });
                }
            });
            $obj.empty().html(html);
        };

        //绑定事件
        this.eventBind = function () {
            var that = this;
            var pageCount = that.getPageCount(); //总页数
            var index = 1;
            $obj.off().on('click', 'li a', function () {
                if ($(this).hasClass(opts.nextCls)) {
                    if ($obj.find('.' + opts.activeCls).text() >= pageCount) {
                        $(this).addClass('disabled');
                        return false;
                    } else {
                        index = parseInt($obj.find('.' + opts.activeCls).text()) + 1;
                    }
                } else if ($(this).hasClass(opts.prevCls)) {
                    if ($obj.find('.' + opts.activeCls).text() <= 1) {
                        $(this).addClass('disabled');
                        return false;
                    } else {
                        index = parseInt($obj.find('.' + opts.activeCls).text()) - 1;
                    }
                } else if ($(this).hasClass(opts.jumpBtnCls)) {
                    if ($obj.find('.' + opts.jumpIptCls).val() !== '') {
                        index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                    } else {
                        return;
                    }
                } else {
                    index = parseInt($(this).data('page'));
                }
                that.filling(index);
                typeof opts.callback === 'function' && opts.callback(that);
                var form = $obj.parents("[data-toggle=pagination]");
                $(document).trigger("pagination-change.jump.data-api", {
                    showData: opts.showData,
                    current: that.getCurrent(),
                    elem:$("[data-pagination-id="+opts.paginationId+"]")
                });
            });
            //输入跳转的页码
            $obj.on('input propertychange', '.' + opts.jumpIptCls, function () {
                pageCount = that.getPageCount(); //从新获取总页数
                var $this = $(this);
                var val = $this.val();
                var reg = /[^\d]/g;
                if (reg.test(val)) $this.val(val.replace(reg, ''));
                (parseInt(val) > pageCount) && $this.val(pageCount);
                if (parseInt(val) === 0) $this.val(1); //最小值为1
            });
            //回车跳转指定页码
            $document.keydown(function (e) {
                if (e.keyCode == 13 && $obj.find('.' + opts.jumpIptCls).val()) {
                    var index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                    that.filling(index);
                    typeof opts.callback === 'function' && opts.callback(that);
                    var form = $obj.parents("[data-toggle=pagination]");
                    $(document).trigger("pagination-change.jump.data-api", {
                        showData: opts.showData,
                        current: that.getCurrent(),
                        elem:$("[data-pagination-id="+opts.paginationId+"]")
                    });
                }
            });
        };

        //初始化
        this.init = function () {
            this.filling(opts.current);
            this.eventBind();
            if (opts.isHide && this.getPageCount() == '1' || this.getPageCount() == '0') {
                $obj.hide();
            } else {
                $obj.show();
            }
        };
        this.init();
    };

    $.fn.pagination = function (parameter, callback) {
        if (typeof parameter == 'function') { //重载
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var pagination = new Pagination(this, options);
            callback(pagination);
        });
    };

}));;//分页
//全局通用
$(function () {


    //简单小工具
    SINGTOOL = {
        toggleNav: function () {
            // //展开和搜索列表,搜索页面用到
            // var toggleMenu = $("[single-tool-toggle-nav]");
            // var currentHeight = toggleMenu.height();
            // var tootleMaxHeight = parseInt(toggleMenu.css("max-height"));
            // if (currentHeight > tootleMaxHeight) {
            //     $("[single-tool-toggle-nav-btn_open]").show();
            //     toggleMenu.css("max-height", tootleMaxHeight + "px");
            // }
            // //搜索页面，搜索导航
            // $("[single-tool-toggle-nav-btn_open]").click(function () {
            //     $(this).parents("[single-tool-toggle-nav]").css("max-height", "none");
            //     $(this).hide();
            //     $("[single-tool-toggle-nav-btn_close]").show();
            // });
            // $("[single-tool-toggle-nav-btn_close]").click(function () {
            //     $(this).parents("[single-tool-toggle-nav]").css("max-height", tootleMaxHeight + "px");
            //     $(this).hide();
            //     $("[single-tool-toggle-nav-btn_open]").show();
            // });
        }
    }
    //表单类型
    INPUT_SELECT = {
        /*单选下拉校验 */
        singleSelectValid: function () {
            $(document).on("select-single-change.data-api", function (e, data) {
                var form = $(data.elem).parents("form");
                var validInput = $(data.elem).parents("[data-toggle=select-single]").find("[select-selected-key]");
                if (form.length&&form.validate) {
                    form.validate().element(validInput);
                }

            });
        },
        calendar: function () {
            //日历选项表单
            var time = new Date();
            var DEFAULT = {
                elem: '#calendar', //指定元素
                type: 'datetime',
                // range: '~',
                format: 'yyyy/M/d HH:mm:ss',
                min: time.getFullYear() + "-" + time.getMonth() + 1 + "-" + time.getDate(),
                max: '2080-10-14',
                done: function (value, date) {
                    $("#signupForm").validate().element($("#day-start"));
                }
            };
            $(document).on("mouseenter", "[trigger-calendar]", function () {
                console.log($(this))
                // //已经实例就不在处理
                if ($(this).data("calendar")) {
                    return false;
                }
                //获取配置和ID
                var data = $(this).data();
                var options = $.extend({}, DEFAULT, data);
                var _this = $(this);
                options.done = function (value, date) {
                    var val = value.split("~")
                    _this.parent().find("[trigger-calendar-start]").val(val[0]);
                    _this.parent().find("[trigger-calendar-end]").val(val[1]);
                    if (_this.parents("form").data("validator")) {
                        _this.val(value)
                        _this.parents("form").validate().element(_this);
                    }
                }

                var elem = $(this).attr("id") ? "#" + $(this).attr("id") : "";

                if (!elem) {
                    console.error("calendar组件，缺少ID");
                    return false;
                }

                options.elem = elem;
                laydate.render(options)
            });
        },
        pagetion:function(){
            //分页组件
            var options = $("[data-toggle=pagination]").data();
            options.showDataArray?(options.showDataArray=options.showDataArray.split(",")):"";
            console.log(options)
            var elemId=$("[data-toggle=pagination]").data("pagination-id");
            if(elemId){
                $("[data-pagination-id="+elemId+"]").pagination(options);
            }
            $(document).on("pagination-change.jump.data-api",function(e,data){
                console.log(e,data)
            })
            //pagination-change.showDataOnePage.data-api
            $(document).on("pagination-change.showDataOnePage.data-api",function(e,data){
                console.log(e,data)
            })
        },
        formValid: function () {
            //简单表单校验
            if($("[single-form-valid]").length){
                $("[single-form-valid]").validate();
            }
           
        },
        tableCheckboxSelect:function(){
            //表格列表checkbox，全选和非全选
            $(document).on("change", "[checkbox-select-all]", function () {
                if ($(this).is(":checked")) {
                    $(this).parents("[checkbox-select-group]").find("[checkbox-select-item]").prop('checked', true).change();
                } else {
                    $(this).parents("[checkbox-select-group]").find("[checkbox-select-item]").prop('checked', false).change();
                }
            })
            //表格关联
            $(document).on("change", "[checkbox-select-item]", function () {
                console.log("checked")
                //和全选checkbox关联
                if ($("[checkbox-select-item]:checked").length == $(this).parents("[checkbox-select-group]").find(
                        "[checkbox-select-item]").length) {
                    $(this).parents("[checkbox-select-group]").find("[checkbox-select-all]").attr("checked", "true");
                } else {
                    $(this).parents("[checkbox-select-group]").find("[checkbox-select-all]").removeAttr("checked");
                }
                //和tr关联
                if ($(this).is(":checked")) {
                    $(this).parents("tr").addClass("ant-table-row-selected");
                }
                else{
                    $(this).parents("tr").removeClass("ant-table-row-selected");
                }
            })
        },
        init: function () {
            INPUT_SELECT.singleSelectValid();
            INPUT_SELECT.calendar();
            INPUT_SELECT.formValid();
            INPUT_SELECT.tableCheckboxSelect();
            INPUT_SELECT.pagetion();
        }
    };
    //工具类
    TOOL = {
        changeURLPar: function (par, par_value) {

            //修改浏览器地址栏
            var destiny = window.location.href;
            console.log(destiny, par, par_value)
            var pattern = par + '=([^&]*)';
            var replaceText = par + '=' + par_value;
            if (destiny.match(pattern)) {

                var tmp = '/' + par + '=[^&]*/';
                tmp = destiny.replace(eval(tmp), replaceText);
                return (tmp);
            } else {
                if (destiny.match('[\?]')) {
                    return destiny + '&' + replaceText;
                } else {
                    return destiny + '?' + replaceText;
                }
            }
            return destiny + '\n' + par + '\n' + par_value;
        }
    }
    //共用功能
    ENTRY = {
        common: {
            head: function () {
                /*======================
                 公共头部
                
                ===========================*/
                //操作
                $('#head-option').dropdown({
                    triggertype: "hover"
                });
                //通知=======================
                $('#head-inform').dropdown({});
                $("#head-inform .j-head-infor-clear").click(function () {
                    $(this).parents('[tab-content-item]').find(".j-ant-tab-content-list").remove();
                    $(this).parents('[tab-content-item]').find(".j-ant-tab-content-empty").show();
                    //j-count
                    var tparent = $(this).parents(".ant-tabs-content").find(".ant-tabs-content-item");
                    var lparent = $(this).parents(".ant-tabs-content-item");
                    var index = tparent.index(lparent);
                    $("#head-tab").find(".j-ant-tabs-tab").eq(index).find(".j-count").html(0);
                })
                //搜索==========================
                //动画结束，获取焦点
                $("#head-search-wrap").on("transitionend", function () {
                    $("#head-search-wrap input").focus();
                });
                //点击搜索按钮
                $("#head-search-trigger").click(function () {
                    if (!$("#head-search-wrap").hasClass("active")) {
                        $("#head-search-wrap").css("width", "210px").addClass("active");
                    } else {
                        $("#head-search-wrap").css("width", 0).removeClass("active")
                    }
                });
                //失去焦点
                $("#head-search-wrap input").blur(function () {
                    $("#head-search-wrap").css("width", 0).removeClass("active")
                });
            },
            siderbar: function () {
                //侧边栏开关样式
                var style = {
                    open: {
                        "flex": " 0 0 256px",
                        "max-width": "256px",
                        "min-width": "256px",
                        "width": "256px"
                    },
                    close: {
                        "flex": "0 0 80px",
                        "max-width": "80px",
                        "min-width": "80px",
                        "width": "80px"
                    }
                }
                var siderBarOpt = {
                    open: function (elem) {
                        elem.removeClass("anticon-menu-unfold"); //anticon-menu-fold
                        $("[sibar-wrap]").removeClass("ant-layout-sider-collapsed").css(style.open);
                        //ant-menu-submenu ant-menu-submenu-inline
                        $("[sibar-wrap]").find(".ant-menu-submenu").addClass("ant-menu-submenu-inline").removeClass("ant-menu-submenu-vertical");
                        $("[sibar-wrap]").find(".ant-menu-submenu").find("ul").css({
                            "width": "auto",
                            "height": "auto",
                            "overflow": "hidden"
                        })
                        $("[sibar-wrap]").find(".ant-layout-sider-children>ul").removeClass("ant-menu-inline-collapsed");
                    },
                    close: function (elem) {
                        elem.addClass("anticon-menu-unfold"); //anticon-menu-fold
                        $("[sibar-wrap]").addClass("ant-layout-sider-collapsed").css(style.close);
                        $("[sibar-wrap]").find(".ant-menu-submenu").addClass("ant-menu-submenu-vertical").removeClass("ant-menu-submenu-inline");

                        $("[sibar-wrap]").find(".ant-menu-submenu").find("ul").css({
                            "width": 0,
                            "height": 0,
                            "overflow": "hidden"
                        })
                        $("[sibar-wrap]").find(".ant-layout-sider-children>ul").addClass("ant-menu-inline-collapsed");
                    }
                }
                //侧边栏开关==========================================
                $("[sibar-trigger]").click(function () {

                    if ($(this).hasClass("anticon-menu-unfold")) {
                        siderBarOpt.open($(this));
                    } else {
                        siderBarOpt.close($(this));
                    }

                });
                //打开子菜单列表======================
                $("[sibar-wrap] .ant-menu-submenu-title").click(function () {
                    if ($(this).parent("li").hasClass("ant-menu-submenu-open")) {
                        // $(this).parent()
                        //
                        $(this).parent("li").removeClass("ant-menu-submenu-open").find("ul").removeClass("ant-menu-hidden")
                        $(this).next(".ant-menu").addClass("ant-menu-hidden");
                    } else {
                        $(this).parent("li").addClass("ant-menu-submenu-open").siblings("li").removeClass("ant-menu-submenu-open").find("ul").addClass("ant-menu-hidden")
                        $(this).next(".ant-menu").removeClass("ant-menu-hidden");
                    }

                    //控制一整个侧边栏的关闭可打开================
                    if ($("[sibar-trigger]").hasClass("anticon-menu-unfold")) {
                        siderBarOpt.open($("[sibar-trigger]"));
                    }

                });

                //侧边框小屏幕适配
                var smScreenSidebar = function () {
                    if ($(window).width() < 1200) {
                        siderBarOpt.close($("[sibar-trigger]"));
                    }
                }
                smScreenSidebar();
                window.onresize = smScreenSidebar;

                ///地址栏匹配
                // /search_app\.html/.test(location.href)
                var locationHref = encodeURIComponent(location.href);
                $(".ant-menu-item").each(function (index, item) {
                    var alink = $(item).find("a").attr("href");
                    var ismatch = new RegExp(encodeURIComponent(alink), "i").test(locationHref);
                    // console.log(alink,ismatch)
                    if (ismatch) {
                        $(item).addClass("ant-menu-item-selected");
                        //父级都打开
                        $(item).parents(".ant-menu-submenu").addClass("ant-menu-submenu-open")
                        $(this).parents(".ant-menu-sub").removeClass("ant-menu-hidden");
                    }
                })

            },
            searchBar: function () {
                SINGTOOL.toggleNav();
            }
        },
        init: function () {
            //公共头部
            ENTRY.common.head();
            //搜索页面的搜索条
            ENTRY.common.searchBar();
            //左侧栏目
            ENTRY.common.siderbar();
            //单选下拉校验
            INPUT_SELECT.init();
        }
    }
    ENTRY.init();
});;

