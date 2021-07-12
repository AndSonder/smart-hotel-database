## 用户信息

### 住户

#### 住户提交个人详细信息

功能描述：**用户预定时提交个人详细信息到用户信息表中**。

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
| prove   | string   | 是   | 用户的cerCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功提交，1表示用户已存在，2表示未知错误。    |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "cerCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"张三",
    "sex":"男",
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看指定住户个人详细信息

功能描述：**查询指定住户的个人详细信息**。

API：/user/admin/superadmin/perinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| id_card     | string   | 是   | 用户身份证号                                                 |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

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
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 经理

#### 经理查看指定住户个人详细信息

功能描述：**查询指定住户的个人详细信息**。

API：/user/admin/manager/perinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| id_card     | string   | 是   | 用户身份证号                                                 |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

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
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 前台

#### 前台查看指定住户个人详细信息

功能描述：**查询指定住户的个人详细信息**。

API：/user/admin/reception/perinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharid    | string   | 是   | 用户的身份标识                                               |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | int      | 是   | 用户性别                                                     |
| id_card     | string   | 是   | 用户身份证号                                                 |
| phone       | string   | 是   | 用户电话号码                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

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
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 订单信息

### 住户

#### 住户查看所有个人订单简略信息

功能描述：**查询指定住户的所有订单简略信息**。

API：/user/admin/resident/orderinfs/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型     | 必填 | 备注                                                         |
| ----------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode     | int          | 是   | 状态标识。0表示成功查询，1表示订单不存在，2表示未知错误。    |
| order_list  | string(json) | 是   | 订单简略信息（订单号、实际入住时间、实际离开时间）           |
| stamp       | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "order_list":[{
        "id":123,
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },{
        "id":123,
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

#### 住户查看指定个人订单详细信息

功能描述：**查询指定住户的指定订单详细信息**。

API：/user/admin/resident/orderinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| id      | int      | 是   | 订单号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示订单不存在，2表示用户不存在，3表示未知错误。 |
| id          | string   | 是   | 订单号                                                       |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | string   | 是   | 用户性别                                                     |
| phone       | string   | 是   | 用户电话号码                                                 |
| room_id     | string   | 是   | 房间号                                                       |
| rtype       | string   | 是   | 房间类型                                                     |
| bedtype     | string   | 是   | 房间床型                                                     |
| deposit     | int      | 是   | 订金                                                         |
| pmoney      | int      | 是   | 应付金额                                                     |
| scid        | string   | 是   | 预计入住时间                                                 |
| sgo         | string   | 是   | 预计离开时间                                                 |
| cid         | string   | 是   | 实际入住时间                                                 |
| go          | string   | 是   | 实际离开时间                                                 |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| table_prove | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "id":123,
    "name":"穆刘杨",
    "sex":"男",
    "phone":18178346924,
    "room_id":102,
    "rtype":"豪华大床房",
    "bedtype":"特大床",
    "deposit":100,
    "pmoney":400,
    "scid":"2020-05-1618:55:49",
    "sgo":"2020-05-2518:55:49",
    "cid":"2020-05-1718:55:49",
    "go":"2020-05-2618:55:49",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 超级管理员

### 经理

### 前台

## 房间信息

## 硬件信息

## 记录信息

## 客房服务

## 系统

