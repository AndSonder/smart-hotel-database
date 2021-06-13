# 网页端API接口

## 登录

### 功能描述

### 接口说明

url:  /user/login

request：

|   字段   | 数据类型 |  备注  |
| :------: | :------: | :----: |
| username |   str    | 用户名 |
| password |   str    |  密码  |

例如：{"username":"zhangsan", "password":"123456"}

response：

| 字段 | 数据类型 |               备注                |
| :--: | :------: | :-------------------------------: |
| code |   int    |             响应字段              |
| data |   dict   | 数据字典，包含账户的唯一标识token |

例如：{"code": 20000, "data":{"token":"xxxx"}}











