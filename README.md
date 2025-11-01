# 便签弹窗网页版使用方法

分为本地数据和 `notes-api` 服务端数据，默认使用本地数据，如果要使用服务端数据，请自行修改 `isServer` 数据开关。

## 项目特色

**自定义右键菜单：** 在用户选择使用服务端数据时，页面右键时会显示：”便签信息管理“ 和 ”便签颜色管理“；

**便签信息管理：** 每一行为一条 `便签信息数据` ，添加/修改/删除便签信息后，点击 `保存到服务器` 按钮即可；

**便签颜色管理：** 每一行为一条 `便签颜色数据` ，添加/修改/删除便签颜色后，点击 `保存到服务器` 按钮即可；

---

## 本地数据使用方法
1. 克隆本项目
2. 把 `index.html` 的 `script` 标签的 `isServer` 改为 `local`;
    ```javascript
    // 是否使用服务器数据，默认使用本地数据
    // server | local
    let isServer = "local"
    ```
3. 进入 `assets/js/messages.js` 文件，修改 `messages` 数组，添加便签信息数据。
4. 进入 `assets/js/colors.js` 文件，修改 `colors` 数组，添加便签颜色数据。

---

## 服务端数据使用方法
1. 克隆本项目
2. 把 `index.html` 的 `script` 标签的 `isServer` 改为 `server`;
    ```javascript
    // 是否使用服务器数据，默认使用本地数据
    // server | local
    let isServer = "server"
    ```
3. 进入 `notes-api/`目录，阅读 [noteswall-api.md](noteswall-api/noteswall-api.md) 文档创建并配置你的 `workers`;
4. 在 `workers.js` 文件中，修改 `token` 为你的自定义检验字符 `token` ，示例如下：

   ```javascript
   // 简单的 Token 验证
   function isValidToken(authHeader) {
       const token = authHeader.replace('Bearer ', '');
       return token === '设置你自定义的字符串';
   }
   ```
   
5. 在 `messagesApi.js` 和 `coloes.js` 文件中，修改 `Bearer ` 后的密钥与上方相同，示例如下：

   > 注意不要把空格删了！！！

   ```javascript
   // 配置Token密钥
   myHeaders.append("Authorization", `Bearer 你自定义的字符串`);
   ```
   
6. 运行项目目录下的 `index.html` 文件，打开看效果。

---

## CF Pages 托管页面

1. 新建一个应用程序，选择 `pages`  类型
2. 选择 `拖放文件` ，点击 `开始使用`
3. 输入一个你自定义的名字，使用英文，这个将作为你的 `pages` 的二级域名例如：[noteswall.pages.dev](https://noteswall.pages.dev)
4. 点击 `创建项目` ，而后选择上传文件夹，选择本项目目录，点击上传即可
5. 等待部署成功，点击 `继续处理项目` ，然后点击你的域名（.pages.dev结尾的）即可访问你的 `便签墙` 了！




