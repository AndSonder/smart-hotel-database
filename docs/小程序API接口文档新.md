## s用户信息

### 住户

#### 住户提交个人信息

功能描述：**用户预定时提交个人信息到用户信息表中**。

API：/user/resident/perinf/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| cerCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| name    | string   | 是   | 用户姓名                                                     |
| sex     | string   | 是   | 用户性别                                                     |
| idCard  | string   | 是   | 用户身份证号                                                 |
| phone   | string   | 是   | 用户电话号码                                                 |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 用户的wecharid+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| result      | int      | 是   | 提交个人信息是否成功                                         |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把wecharid换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "cerCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看所有住户个人信息

功能描述：**查询指定住户的具体个人信息**。

API：/user/admin/perinfs/get

请求方法：GET

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 用户的wecharid+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| result      | int      | 是   | 用户信息是否查询成功                                         |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把wecharid换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "name":"张三",
    "sex":1,
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

#### 超级管理员查看指定住户个人信息

功能描述：**查询指定住户的具体个人信息**。

API：/user/admin/perinf/get

请求方法：GET

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 用户的wecharid+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| result      | int      | 是   | 用户信息是否查询成功                                         |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| id_card     | string   | 是   | 用户身份证号                                                 |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把wecharid换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 安保人员

#### 安保经理查看住户个人信息

功能描述：**查询所有订单当前时间实际入住时间和预计离开时间之间时间段在段住户的部分个人信息**。

API：/user/secman/perinf/get

请求方法：GET

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为安保经理 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 用户的wecharid+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| result      | int      | 是   | 用户信息是否查询成功                                         |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把wecharid换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```



#### 安保队员查看住户个人信息

### 保洁人员

## 订单

## 房间

## 硬件

## 门锁

## 系统

