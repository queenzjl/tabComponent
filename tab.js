;
(function($) {
    var Tab = function(tab) {
        var _this = this;
        //保存单个tab组件
        this.tab = tab;
        //设置默认参数
        this.config = {
                "triggerType": "mouseover", //用来定义鼠标的触发类型，是click还是mouseover
                "effect": "default", //用来定义内容切换效果，是直接切换，还是淡入淡出效果
                "invoke": 1, //默认展示第几个tab
                "auto": false //用来定义tab是否自动切换，当指定了时间间隔，就表示自动切换，并且切换时间为指定时间间隔
            }
            //扩展配置参数
        if (this.getConfig()) {
            $.extend(this.config, this.getConfig());
        }
        // console.log(this.config);

        //保存tab标签列表，对应的内容列表
        this.tabItems = this.tab.find('ul.tab-nav li');
        this.contentItems = this.tab.find('div.content div.content-item');

        //保存配置参数
        var config = this.config;

        if (config.triggerType === 'click') {
            this.tabItems.bind(config.triggerType, function() {
                _this.invoke($(this));
                console.log($(this))
                    // this.tabItems.addClass('actived').siblings().removeClass('actived');
            })
        } else if (config.triggerType === 'mouseover' || config.triggerType !== 'click') {
            this.tabItems.mouseover(function() {
                _this.invoke($(this));
            })
        }
    }

    Tab.prototype = {
        //获取配置参数
        getConfig: function() {
            //拿一下tab elem节点上的data-config
            var config = this.tab.attr('data-config');
            //确保有配置参数
            if (config && config != '') {
                return $.parseJSON(config);
            } else {
                return null;
            }
        },
        //切换
        invoke: function(current) {
            //显示li
            current.addClass('actived').siblings().removeClass('actived');
            var index = current.index();
            console.log(index)
                //显示对应的内容区域
            var effect = this.config.effect;
            if (effect === 'fade') {
                this.contentItems.eq(index).fadeIn().siblings().fadeOut();
            } else if (effect === 'default' || effect !== 'fade') {
                this.contentItems.eq(index).addClass('current').siblings().removeClass('current');
            }
        }
    }
    window.Tab = Tab;

})(jQuery)