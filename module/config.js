layui.define(function (exports) {

    var config = {
        base_server: 'json/', // 接口地址，实际项目请换成http形式的地址
        tableName: 'easyweb',  // 存储表名
        autoRender: false,  // 窗口大小改变后是否自动重新渲染表格，解决layui数据表格非响应式的问题
        // 获取缓存的token
        getToken: function () {
            var t = layui.data(config.tableName).token;
            if (t) {
                return JSON.parse(t);
            }
        },
        // 清除user
        removeToken: function () {
            layui.data(config.tableName, {
                key: 'token',
                remove: true
            });
        },
        // 缓存token
        putToken: function (token) {
            layui.data(config.tableName, {
                key: 'token',
                value: JSON.stringify(token)
            });
        },
        // 导航菜单
        menus: [{
            name: '主页',
            icon: 'layui-icon-home',
            subMenus: [{
                name: '主页一',
                url: 'console',
                path: 'console.html'
            }]
        }, {
            name: '系统管理',
            icon: 'layui-icon-set',
            subMenus: [{
                name: '用户管理',
                url: 'user',  // 这里url不能带斜杠，因为是用递归循环进行关键字注册，带斜杠会被q.js理解为其他注册模式
                path: 'system/user.html',
                auth: 'post:/user/query'
            }, {
                name: '角色管理',
                url: 'role',
                path: 'system/role.html',
                auth: 'get:/role'
            }, {
                name: '权限管理',
                url: 'authorities',
                path: 'system/authorities.html',
                auth: 'get:/authorities'
            }, {
                name: '登录日志',
                url: 'login_record',
                path: 'system/login_record.html',
                auth: 'get:/loginRecord'
            }]
        }, {
            name: 'CMS管理',
            icon: 'layui-icon-note',
            subMenus: [{
                name: '文章管理',
                url: 'article',
                path: 'cms/article.html'
            }]
        }],
        // 当前登录的用户
        getUser: function () {
            var u = layui.data(config.tableName).login_user;
            if (u) {
                return JSON.parse(u);
            }
        },
        // 缓存user
        putUser: function (user) {
            layui.data(config.tableName, {
                key: 'login_user',
                value: JSON.stringify(user)
            });
        }
    };
    exports('config', config);
});
