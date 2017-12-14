simple-agent-emq-rest
---
#### 简单API服务代理Node.js Express实现  
1. 配置  
    `config/index.js`
    ```js
    url_pix: '/api', // URL前缀
    ```  
    
2. 启动(需要Node.js 7.0.X以上版本支持)  
    ```bash
    
    # 安装依赖
    npm install
    
    # 开发模式
    npm dev  // port = 5000
    
    # 控制台启动
    npm start // port = 3000
    
    # 守护进程启动
    npm product // port = 3000
    ```



3. 请求示例
    
    `POST example.com:5000/api`  
    
    参数(必须是JSON类型请求)  
    
    ```json 
    {
      "url": "http://ecc.com:18083/api/v2/users",
      "auth": {
        "username": "admin",
        "password": "public"
      },
      "method": "get",
      "payload": {}
    }
    
    ```
    
    信息  
    ```json
    [
        {
            "username": "wivwiv",
            "tags": "1"
        },
        {
            "username": "admin",
            "tags": "administrator"
        }
    ]

    ```
    demo代码  
    ```js
    var data = {
      // EMQ REST API完整地址: 中间件可跨域
      url: 'http://ecc.com:18083/api/v2/users',
      
      // 认证信息
      auth: {
        username: 'admin',
        password: 'public',
      },
       
      // 请求方法
      method: "get",
   
      // 数据体: 适用于 POST, PUT等方法
      payload: {},
    }
 
    // jQuery 所有代理请求都是POST方法, 该接口可以跨域支持
    $.post('http://example.com:5000/api', data, function(res) {
       // 业务逻辑
       console.log(res)
    })

    ```
    
    