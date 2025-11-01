# Noteswall API 部署指南

## 部署步骤

### 1. 准备工作

- 注册 Cloudflare 账户

### 2. 创建 KV Namespace

1. 登录 Cloudflare Dashboard
2. 进入 "存储和数据库" > "Workers KV"
3. 点击右上角 "Create Instance"
4. 输入名称 `NOTESWALL_MESSAGES_STORE`
5. 点击 "创建"

### 3. 创建 Worker

1. 进入 "Workers 和 Pages"
2. 点击 "创建应用程序"
3. 选择 "Workers" > "从 Hello World! 开始"
4. 修改名称为： `noteswall-api`
5. 点击 "部署"

### 4. 配置 KV Binding

1. 进入刚创建的 Worker
2. 点击导航栏中的 **"绑定"**
3. 选择 "KV 命名空间"
4. Variable name 填写 `MESSAGES_STORE`
5. 选择刚才创建的 KV namespace
6. 点击 "添加绑定"

### 5. 上传代码

1. 在 Worker 编辑页面，删除默认代码
2. 粘贴 `worker.js` 文件内容
3. 点击 "部署"

### 6. 配置自定义域名

> 建议使用 “自定义域名”，不然自带的 **“.dev”** 域名可能不是很好使！

1. 进入刚创建的 Worker，进入设置
2. 找到 “域和路由” ，点击 “添加”， 点击 “自定义域名”
3. 输入你托管在 Cloudflare 的域名，例如： **`example.com`**
4. 输入完成后，cloud Flare 会自动向你的域名 DNS 添加一个 CNAME 记录
5. 前端调用 API 时，直接使用你的域名即可

### 7. 初始化/查询数据

这里我使用的是 API Fox 进行的测试。

1. 访问 `https://noteswall-api.example.com/api/messages`

    - 如果你使用 **`PUT`** 请求，**不出错时** 会返回 `true`
    - 如果使用 **`GET`** 请求，会返回一个数组，里面包含所有便签消息

2. 访问 `https://noteswall-api.example.com/api/colors`

    - 如果使用 **`PUT`** 请求，**不出错时** 会返回 `true`
    - 如果使用 **`GET`** 请求，会返回一个数组，里面包含所有便签颜色

### 8. 前端调用

#### 接口调用 API

1. 便签信息相关API：[messagesApi.js](../assets/api/messagesApi.js)

2. 便签颜色相关API：[colorsApi.js](../assets/api/colorsApi.js)



#### 下面给一段调用示例：

```javascript
   // 引入API函数
   import { getColors, updateColors } from './assets/api/colorsApi.js';
   import { getMessages, updateMessages } from './assets/api/messagesApi.js';
   
   // 获取数据
   async function fetchData() {
      try {
         const colors = await getColors();
         const messages = await getMessages();
         console.log('颜色:', colors);
         console.log('消息:', messages);
      } catch (error) {
         console.error('获取数据失败:', error);
      }
   }
   
   // 更新数据
   async function updateData() {
      try {
         const newColors = [
            "#FFCDD2",
            "#F8BBD0",
            "#E1BEE7"
         ];
   
         const newMessages = [
            "保持好心情",
            "多喝水哦",
            "今天辛苦啦！"
         ];
   
         await updateColors(newColors);
         await updateMessages(newMessages);
         console.log('数据更新成功');
      } catch (error) {
         console.error('更新数据失败:', error);
      }
   }
```


































