layui.define(['config', 'admin', 'layer', 'laytpl', 'element'], function (exports) {
    var $ = layui.$;
    var config = layui.config;
    var admin = layui.admin;
    var layer = layui.layer;
    var laytpl = layui.laytpl;
    var element = layui.element;

    var index = {
        // 渲染左侧导航栏
        initLeftNav: function () {
            // 判断权限
            for (var i = config.menus.length - 1; i >= 0; i--) {
                var tempMenu = config.menus[i];
                if (tempMenu.auth && !admin.hasPerm(tempMenu.auth)) {
                    config.menus.splice(i, 1);
                    continue;
                }
                if (!tempMenu.subMenus) {
                    continue;
                }
                for (var j = tempMenu.subMenus.length - 1; j >= 0; j--) {
                    var jMenus = tempMenu.subMenus[j];
                    if (jMenus.auth && !admin.hasPerm(jMenus.auth)) {
                        tempMenu.subMenus.splice(j, 1);
                        continue;
                    }
                    if (!jMenus.subMenus) {
                        continue;
                    }
                    for (var k = jMenus.subMenus.length - 1; k >= 0; k--) {
                        if (jMenus.subMenus[k].auth && !admin.hasPerm(jMenus.subMenus[k].auth)) {
                            jMenus.subMenus.splice(k, 1);
                            continue;
                        }
                    }
                }
            }
            // 去除空的目录
            for (var i = config.menus.length - 1; i >= 0; i--) {
                var tempMenu = config.menus[i];
                if (tempMenu.subMenus && tempMenu.subMenus.length <= 0) {
                    config.menus.splice(i, 1);
                    continue;
                }
                if (!tempMenu.subMenus) {
                    continue;
                }
                for (var j = tempMenu.subMenus.length - 1; j >= 0; j--) {
                    var jMenus = tempMenu.subMenus[j];
                    if (jMenus.subMenus && jMenus.subMenus.length <= 0) {
                        tempMenu.splice(j, 1);
                        continue;
                    }
                }
            }
            // 渲染
            $('.layui-layout-admin .layui-side').load('components/side.html', function () {
                laytpl(sideNav.innerHTML).render(config.menus, function (html) {
                    $('#sideNav').after(html);
                });
                element.render('nav');
                admin.activeNav(Q.lash);
            });
        },
        // 路由注册
        initRouter: function () {
            index.regRouter(config.menus);
            Q.init({
                index: 'console'
            });
        },
        // 使用递归循环注册
        regRouter: function (menus) {
            $.each(menus, function (i, data) {
                if (data.url && data.url.indexOf('#!') == 0) {
                    Q.reg(data.url.substring(2), function () {
                        admin.loadView('components/' + data.path);
                    });
                }
                if (data.subMenus) {
                    index.regRouter(data.subMenus);
                }
            });
        },
        // 从服务器获取登录用户的信息
        getUser: function (success) {
            layer.load(2);
            admin.req('userInfo.json', {}, function (data) {
                layer.closeAll('loading');
                if (200 == data.code) {
                    config.putUser(data.user);
                    success(data.user);
                } else {
                    layer.msg('获取用户失败', {icon: 2});
                }
            }, 'GET');
        },
        // 页面元素绑定事件监听
        bindEvent: function () {
            // 退出登录
            $('#btnLogout').click(function () {
                layer.confirm('确定退出登录？', function (i) {
                    layer.close(i);
                    config.removeToken();
                    location.replace('login.html');
                });
            });
            // 修改密码
            $('#setPsw').click(function () {
                admin.popupRight('components/tpl/password.html');
            });
            // 个人信息
            $('#setInfo').click(function () {

            });
            // 消息
            $('#btnMessage').click(function () {
                admin.popupRight('components/tpl/message.html');
            });
        }
    };

    exports('index', index);
});
