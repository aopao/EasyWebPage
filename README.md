# EasyWeb 2.0 前端页面


## 1.简介

> 基于jquery、layui的管理系统模板，单页面、响应式、支持mvvm、极易上手！

* 演示地址：[http://47.98.107.251:8088/login.html](http://47.98.107.251:8088/login.html)
* 演示账号：admin &emsp;&emsp; 密码：admin 


### 1.1.使用框架 

描述 | 框架 
:---|:---
核心框架 | [Layui](http://www.layui.com/)、[jQuery](http://jquery.cuishifeng.cn/)
路由框架 | [Q.js](https://github.com/itorr/q.js) (纯js轻量级路由框架)
mvvm框架 | [pandyle.js](https://gitee.com/pandarrr/pandyle) (专为jquery编写的mvvm)
主要特色 | 单页面 / 响应式 / 简约 / 极易上手

### 1.2.项目结构

```
|-assets
|     |-css                     // 样式
|     |-images                  // 图片
|     |-libs                    // 第三方库
|
|-components            // html组件
|     |-system                  // 系统管理页面
|     |-xxxxxx                  // 其他业务页面
|     |-tpl                     // 公用组件
|     |     |-message.html                 // 消息
|     |-console.html            // 主页一
|     |-header.html             // 头部
|     |-side.html               // 侧导航
|
|-module                // js模块 (使用layui的模块开发方式)
|     |-admin.js                // admin模块
|     |-config.js                // config模块
|     |-index.js                // index模块
|
|-index.html            // 主界面
|-login.html            // 登陆界面
```

## 2.快速开始

### 2.1.导入项目

1. 直接下载项目，或使用git下载
2. 使用IDEA（WebStorm）或者HBuilder等前端开发工具进行开发

### 2.2.添加一个业务界面
比如你要做一个CMS系统，添加一个文章管理界面：

- **第一步：<br>**
   在components文件夹下面建一个目录cms，然后新建一个页面article.html
   
   ![添加业务页面示例](https://ws1.sinaimg.cn/large/006a7GCKgy1fswocatj9yj30bm0chglu.jpg)
   
   article.html完整代码：
   
   ```html
    <div class="layui-card">
        <div class="layui-card-header">
            <h2 class="header-title">文章管理</h2>
            <span class="layui-breadcrumb pull-right">
              <a href="#!console">首页</a>
              <a><cite>文章管理</cite></a>
            </span>
        </div>
        <div class="layui-card-body">
            <div class="layui-form toolbar">
                搜索：<input id="art-edit-search" class="layui-input search-input" type="text" placeholder="输入关键字"/>&emsp;
                <button id="art-btn-search" class="layui-btn icon-btn"><i class="layui-icon">&#xe615;</i>搜索</button>
            </div>
    
            <!-- 数据表格 -->
            <table class="layui-table" id="art-table" lay-filter="art-table"></table>
        </div>
    </div>
    
    <!-- 表格操作列 -->
    <script type="text/html" id="art-table-bar">
        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="edit">修改</a>
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
    </script>
    
    <script>
        layui.use(['table', 'util', 'config'], function () {
            var table = layui.table;
            var config = layui.config;
            var util = layui.util;
    
            //渲染表格
            table.render({
                elem: '#art-table',
                url: config.base_server + 'article.json',
                where: {
                    access_token: config.getToken().access_token
                },
                page: false,
                cols: [[
                    {type: 'numbers'},
                    {field: 'id', sort: true, title: '文章ID'},
                    {field: 'label', sort: true, title: '文章标签'},
                    {field: 'title', sort: true, title: '文章标题'},
                    {field: 'author', sort: true, title: '作者'},
                    {
                        field: 'uploadtime', sort: true, templet: function (d) {
                            return util.toDateString(d.createTime);
                        }, title: '发布时间'
                    },
                    {align: 'center', toolbar: '#art-table-bar', title: '操作'}
                ]]
            });
        });
    
    </script>
    ```
   
- **第二步：<br>**
   在module/config.js里面找到menus变量，添加如下所示：
   
   ![配置menus示例](https://ws1.sinaimg.cn/large/006a7GCKgy1fswp9fu8h4j30lx0fxq44.jpg)

- **第三步：<br>**
   运行项目，查看效果
   
   ![添加业务界面效果](https://ws1.sinaimg.cn/large/006a7GCKgy1fswpb4ieu3j30vo0i475m.jpg)

### 2.3.添加第三方layui扩展模块
请参考项目里面formSelects的添加方法。
- 第一步： 把下载的模块放在module文件夹下面
- 第二步： 打开index.html <br>

   ```javascript
    layui.config({
        base: 'module/'
    }).extend({
        formSelects: 'formSelects/formSelects-v4'
    }).use(['config', 'admin', 'formSelects'], function () {
        var config = layui.config;
        var admin = layui.admin;
        var formSelects = layui.formSelects;

    });
    ```

&emsp;&emsp;如果你的模块没有文件夹直接在module里面就不需要写extend了，如果你的模块有独立的文件夹，向formSelects一样，
就需要在extend里面明确指出模块的位置。

![添加模块示例](https://ws1.sinaimg.cn/large/006a7GCKgy1fswoa7omxej30bh0cgwes.jpg)


---

## 3.开发指南

### 3.1.开发规范
&emsp;&emsp;阅读开发规范之前请先了解前面“项目结构”的介绍。

- css、图片、第三方lib（layui扩展模块除外）全部放在“/assets/”下面
- layui扩展模块放在“module”下面，例如项目里面“formSelects”模块
- 页面html放在“components”下面

### 3.2.入口index.html
&emsp;&emsp;index.html是项目的主入口，打开index.html你会看到如下代码:

```javascript
layui.config({
    base: 'module/'
}).extend({
    formSelects: 'formSelects/formSelects-v4'
}).use(['config', 'admin','index'], function () {

});
```

&emsp;&emsp;这段代码首先告诉了lauyui扩展模块都位于“module/”下面，然后扩展模块因为都使用了文件夹
存放，所以需要在“extend”中明确指出模块js的位置。&emsp;接着使用了“config”、“admin”等模块，所以
admin模块里面的一些方法也就即可执行了。

### 3.3.“config”模块介绍
&emsp;&emsp;“config”模块主要是配置项目的一些基本参数。

名称 | 类型 | 描述 
:---|:--- |:--- 
base_server | 变量 | 服务器接口地址
tableName | 变量 | 本地存储表名（token等都会存储在本地中）
getToken | 方法 | 获取缓存的token
putToken | 方法 | 缓存token
removeToken | 方法 | 清除缓存的token
menus | 变量 | 侧导航菜单数组，侧导航根据menus自动渲染
getUser | 方法 | 获取缓存的用户信息
putUser | 方法 | 缓存用户的信息

> 注意：因为我这边的后台返回的token是这样的<br>
> {"access_token":"950a7cc9-5a8a-42c9-a693-40e817b1a4b0","token_type":"bearer","refresh_token":"773a0fcd-6023-45f8-8848-e141296cb3cb","expires_in":27036,"scope":"select"}
> <br>所以我这边的token不是一个字符串存储的，是用json存储的，getToken返回的是一个json对象，
> 如果你的token只是一个字符串，请修改getToken方法和admin里面的req方法

#### 3.3.1.“config”使用示例
```javascript
layui.use(['config'], function () {
    var config = layui.config;

    var token = config.getToken();  // 获取token
    var access_token = token.access_token;  //获取access_token
    
    config.putToken(xxx);
});
```

### 3.4.admin模块介绍
&emsp;&emsp;admin模块做了很多的操作，这里只重点介绍admin对外封装的一些操作方法。

#### 3.4.1.admin提供的默认事件
使用示例：
```html
<a ew-event="fullScreen">全屏</a>
<a ew-event="flexible">折叠导航</a>
```
只需要在DOM节点上面添加ew-event="xx"即可。全部事件如下表：

事件 | 描述
:---|:--- 
flexible | 折叠侧导航 
refresh | 刷新主体部分 
back | 浏览器后退
theme | 打开主题设置弹窗 
fullScreen | 全屏切换

#### 3.4.2.admin提供的方法
使用示例：
```javascript
layui.use(['admin'], function () {
    var admin = layui.admin;

    admin.flexible(true);    // 折叠侧导航
});
```

全部方法：

方法 | 参数 | 描述
:---|:--- |:--- 
flexible(expand) | true和false | 折叠侧导航 
activeNav(url) | a标签里面的href值 | 设置侧导航栏选中
popupRight(path) | html地址 | 右侧弹出弹窗
closePopupRight() | 无 | 关闭右侧弹出
popupCenter(object) | 见单独说明 | 中间弹出弹窗
finishPopupCenter() | 无 | 关闭中间弹出弹窗并回调finish方法
closePopupCenter() | 无 | 关闭中间弹出弹窗
req(url, data, success, method) | 见单独说明 | 封装的ajax请求
hasPerm(auth) | 权限标识 | 判断用户是否有权限
putTempData(key, value) | key,value | 缓存临时数据
getTempData(key,) | key | 获取缓存的临时数据

##### 3.4.2.1.右侧弹出弹窗popupRight
使用示例：
```javascript
admin.popupRight('components/tpl/message.html');
```
“message.html”里面也可以有js代码，如下所示：
```html
<div>
    <ul>
        <li class="layui-this">通知</li>
        <li>私信</li>
        <li>待办</li>
    </ul>
</div>

<script>
    layui.use('element', function () {
        var element = layui.element;

    });
</script>
```
效果图：

![右侧弹出示例](https://ws1.sinaimg.cn/large/006a7GCKgy1fswkiisvg1j30b406g3z3.jpg)

##### 3.4.2.2.中间弹出弹窗popupCenter
&emsp;&emsp;你可能会问中间弹出的弹窗不是很普通吗，为什么admin还要封装一下，因为admin封装的带有回调功能。

使用示例（一般用在表单弹窗，如添加、修改用户等）：
```javascript
admin.popupCenter({
    title: '添加用户',
    path: 'components/system/user_form.html',
    finish: function () {
        
        // 这个方法就是回调的功能，用户添加成功之后让表格reload
        table.reload('user-table', {});  
        
    }
});
```

“user_form.html”内容如下：
```html
<form id="user-form" lay-filter="user-form" class="layui-form model-form">
    <!-- ...省略表单内容 -->
</form>

<script>
    layui.use(['admin', 'form'], function () {
        var admin = layui.admin;
        var form = layui.form;

        // 表单提交事件
        form.on('submit(user-form-submit)', function (data) {
            layer.load(2);
            // 这里是用admin封装的ajax请求
            admin.req('user', data.field, function (data) {
                layer.closeAll('loading');
                if (data.code == 200) {
                    layer.msg('添加成功', {icon: 1});
                    
                    // 这里是关键，调用这个方法就触发finish回调并且关闭弹窗
                    admin.finishPopupCenter();
                    
                } else {
                    layer.msg('添加失败', {icon: 2});
                }
            }, 'POST');
            return false;
        });
    });
</script>
```

**参数说明：**

参数 | 类型 | 是否必须 | 描述
:---|:--- |:--- |:--- 
title | 变量 | 否 | 标题，不写没有标题 
path | 变量 | 是 | html路径
success | 方法 | 否 | html渲染完毕的回调
finish | 方法 | 否 | finish回调
end | 方法 | 否 | 弹窗关闭的回调

示例图：

![中间弹窗示例](https://ws1.sinaimg.cn/large/006a7GCKgy1fswla4k4bmj30b407wmxb.jpg)


##### 3.4.2.3.封装的ajax请求req
&emsp;&emsp;admin模块封装的ajax请求会自动传递token（access_token），并且会自动把PUT、DELETE请求转成POST、GET请求
然后加参数_method，因为浏览器不支持PUT、DELETE请求的参数传递，具体原因请百度一下。

使用示例：

```javascript
// 不传递参数的写法
admin.req('user', {}, function (data) {
    console.log(JSON.stringify(data));
}, 'GET');

// 传递参数的写法
admin.req('user', {
    userId: 'xxx',
    userName: '张三'
}, function (data) {
    console.log(JSON.stringify(data));
}, 'POST');
```

**方法参数说明：**

- 第一个参数： 接口地址
- 第二个参数： 传给服务器的参数
- 第三个参数： 请求成功的回调（如果出现http错误404,401等，也会进入这个回调，并且data里面会有code、msg两个参数，
   code是http的错误码，msg是错误信息）
- 第四个参数： 请求的方法（GET、POST、PUT、DELETE）

req还会自动判断token是否过期，如果token过期会自动跳转到登录页面。


##### 3.4.2.4.判断是否有权限hasPerm
&emsp;&emsp;这个方法是用来判断当前登录的用户是否有某一权限的操作，使用这个方法的前提是在index.js里面有一个获取
服务器的user信息并使用config.putUser方法缓存，并且user里面包含了权限列表，因为admin会调用config.getUser获取
用户信息从而获取用户的权限列表。

&emsp;&emsp;我这里面服务器返回的用户json信息如下所示，如果你的服务器返回的信息跟下面不一样，请修改相关方法：

```json
{
	"userId": "admin",
	"username": "admin",
	"nickName": "管理员",
	"authorities": [{
		"authority": "get:/role"
	}, {
		"authority": "put:/role"
	}]
}
```

使用示例，下面的示例是演示没有删除用户的权限隐藏删除按钮：
```html
<div>
    <button id="btn-delete">删除</button>
</div>

<script>
    layui.use(['admin'], function () {
        var admin = layui.admin;
        
        if(!admin.hasPerm('delete:user')) {
            $('#btn-delete').hide();  // remove()也可以
        }
    });
</script>
```

> 如果你担心把按钮隐藏了没有什么卵用，会点技术就可以把按钮在弄出来了，这个担心完全是多余的。
> 因为后台的接口也会有权限验证的，如果没有权限接口会返回{code:401, msg:"没有访问权限"}，
> 那你可能会问了既然后台限制了，界面为什么还要限制，因为这是需求，如你项目没有隐藏按钮的需求可以不用隐藏。


##### 3.4.2.5.缓存临时数据putTempData
&emsp;&emsp;这个方法是用来把一些临时数据放在session中，页面关闭数据就会失效。

使用示例：
```javascript

admin.putTempData('t_name', '张三');    // 缓存数据

var tName = admin.getTempData('t_name');    // 获取缓存数据

console.log(tName);

```

**使用场景：**

&emsp;&emsp;前面讲了popupCenter弹出添加用户的界面，如果是修改用户，是不是应该传递user的信息呢，
因为修改界面需要回显user的信息，这时就可以用putTempData了，当然也有别的办法传递，这里就不一一演示了。

修改用户按钮的界面：
```html
<button id="btn-update">修改用户</button>

<script>
    layui.use(['admin'], function () {
        var admin = layui.admin;
        
        admin.putTempData('t_user', {name: 'xx', sex: 'male'});  // 关键代码
        
        admin.popupCenter({
            title: '修改用户',
            path: 'components/system/user_form.html',
            finish: function () {
                
            }
        });
    });
</script>
```
修改用户弹窗的界面：
```html
<form id="user-form" lay-filter="user-form" class="layui-form model-form">
    <!-- ...省略表单内容 -->
</form>

<script>
    layui.use(['admin', 'form'], function () {
        var admin = layui.admin;
        var form = layui.form;

        var user = admin.getTempData('t_user');  // 关键代码
        
        form.val('user-form', user);
    });
</script>
```

### 3.5.admin提供的css公共类

#### 3.5.1.辅助类

类名（class） | 说明
:---|:--- 
icon-btn | 带图标的按钮，如果你的按钮用了图标加上类这个更好看 
date-icon | 在元素的右边加入日期的图标 
layui-link | 用于a标签，字体颜色为layui的绿色风格 
layui-text | 用于a标签的上层，a标签字体颜色为蓝色 
pull-right | 右浮动
inline-block | 设置元素display为inline-block

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswq54bfacj307h01ft8h.jpg)

---

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswq5i3hvbj304v01l3ya.jpg)

---

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswq6m1i5zj309p01gt8h.jpg)

---

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswq5ucrwrj309404l3yg.jpg)

```html
<!-- 日期图标 -->
<input class="layui-input date-icon" type="text" placeholder="请选择日期范围"/>

<!-- 图标按钮 -->
<button class="layui-btn icon-btn"><i class="layui-icon layui-icon-search"></i>搜索</button>
<button class="layui-btn icon-btn"><i class="layui-icon layui-icon-add-1"></i>添加</button>

<!-- 绿色超链接 -->
<a href="javascript:;" class="layui-link">帐号注册</a>
<a href="javascript:;" class="layui-link pull-right">忘记密码？</a>

<!-- 蓝色超链接 -->
<div class="layui-text">
    <a href="http://www.layui.com/">layui-v2.3.0</a>
    <a href="https://github.com/itorr/q.js">q.js</a>
    <a href="https://gitee.com/pandarrr/pandyle">pandyle.js</a>
</div>

```


#### 3.5.2.表格上方的工具栏

类名（class） | 说明
:---|:--- 
search-input | 表格上面的输入框样式 
toolbar | 表格上方工具栏样式 
model-form | 弹窗里面的表单样式 
model-form-footer | 弹窗里面表单底部操作按钮容器的样式 

```html
<div class="layui-card-body">
    <div class="layui-form toolbar">
        搜索：
        <select>
            <option value="">-请选择-</option>
            <option value="user_id">ID</option>
            <option value="username">账号</option>
        </select>&emsp;
        
        <input class="layui-input search-input" type="text" placeholder="输入关键字"/>&emsp;
        
        <button class="layui-btn icon-btn"><i class="layui-icon">&#xe615;</i>搜索</button>
        <button class="layui-btn icon-btn"><i class="layui-icon">&#xe654;</i>添加</button>
    </div>

    <table class="layui-table" id="user-table" lay-filter="user-table"></table>
</div>
```

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswqb6x89hj30mz098dg2.jpg)


#### 3.5.3.弹窗里面的表单

类名（class） | 说明
:---|:--- 
model-form | 弹窗里面的表单样式 
model-form-footer | 弹窗里面表单底部操作按钮容器的样式 

```html
<form class="layui-form model-form">
    <div class="layui-form-item">
        <label class="layui-form-label">账号</label>
        <div class="layui-input-block">
            <input name="username" placeholder="请输入账号" type="text" class="layui-input"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">性别</label>
        <div class="layui-input-block">
            <input type="radio" name="sex" value="男" title="男" checked/>
            <input type="radio" name="sex" value="女" title="女"/>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">角色</label>
        <div class="layui-input-block">
            <select name="roleId" xm-select="roleId" lay-verify="required">
            </select>
        </div>
    </div>
    <div class="layui-form-item model-form-footer">
        <button class="layui-btn layui-btn-primary close" type="button">取消</button>
        <button class="layui-btn" lay-filter="user-form-submit" lay-submit>保存</button>
    </div>
</form>
```

![](https://ws1.sinaimg.cn/large/006a7GCKgy1fswqdrhhpvj30h30cnweo.jpg)


## 4.项目截图

![登录](https://ws1.sinaimg.cn/large/006a7GCKgy1fswqs955sdj316v0qmdj1.jpg) 

![主页一](https://ws1.sinaimg.cn/large/006a7GCKgy1fstc7ldhlbj315y0q6415.jpg)

![消息弹窗](https://ws1.sinaimg.cn/large/006a7GCKgy1fstc7lye0jj30vq0i8gmv.jpg)

![角色管理](https://ws1.sinaimg.cn/large/006a7GCKgy1fstc7logerj30vq0i8js2.jpg)

---

## 5.更新日志

**2018-06-28 - 发布全新2.0版本**

- 引入pandyle.js（mvvm框架），填补layui模板引擎的短板
- 采用模块化开发方式，定义admin、config等公用模块，封装ajax请求
- 界面优化，借鉴layadmin的设计风格，改版登录页面

**2018-02-11 - 发布EasyWeb1.0版本**

- 基于layui后台大布局、q.js路由框架搭建出第一个版本

---

## 6.联系方式
### 6.1.欢迎加入“前后端分离技术交流群”：
![群二维码](https://ws1.sinaimg.cn/large/006a7GCKgy1fstbxycj1xj305k07m75h.jpg)

### 6.2.我要打赏：
都是猿友，撸码不易，如果这个轮子对你有用，不妨打赏一下！

![赞赏码](https://ws1.sinaimg.cn/large/88052d6bgy1fsvn3kbkrjj20go06e40f.jpg)
