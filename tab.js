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
        //设置自动播放
        if (config.auto) {
            this.timer = null;
            this.loop = 0;
            this.autoPlay(); //自动播放

            this.tab.hover(function() {
                window.clearInterval(_this.timer);
            }, function() {
                _this.autoPlay();
            })
        }

        //设置默认显示第几个tab
        if (config.invoke > 1) {
            this.invoke(this.tabItems.eq(config.invoke - 1));
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
        //切换tab驱动函数
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
            //注意，如果配置了自动切换，记得把当前的loop的值设置成当前tab的index
            if (this.config.auto) {
                this.loop = index;
            }
        },
        //自动播放函数
        autoPlay: function() {
            var _this = this;
            var tabItems = this.tabItems; //临时保存tab列表
            var tabLength = this.tabItems.length; //tab的个数
            var config = this.config;
            this.timer = window.setInterval(function() {
                _this.loop++;
                if (_this.loop >= tabLength) {
                    _this.loop = 0;
                }
                tabItems.eq(_this.loop).trigger(config.triggerType);
            }, config.auto)
        }
    }
    window.Tab = Tab;

})(jQuery)