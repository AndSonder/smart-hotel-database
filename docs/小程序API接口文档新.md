## 用户信息

### 住户

#### 住户提交个人详细信息

功能描述：**用户预定时提交个人详细信息到用户信息表中**。

API：/user/resident/perinf/post

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

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功提交，1表示用户已存在，2表示未知错误。    |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"张三",
    "sex":"男",
    "idCard":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看住户个人详细信息

功能描述：**查询指定住户的个人详细信息**。

API：/user/admin/super_admin/perinf/get

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

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharId   | string   | 是   | 用户的身份标识                                               |
| name       | string   | 是   | 用户姓名                                                     |
| sex        | int      | 是   | 用户性别                                                     |
| idCard     | string   | 是   | 用户身份证号                                                 |
| phone      | string   | 是   | 用户电话号码                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "idCard":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 经理

#### 经理查看住户个人详细信息

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

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharId   | string   | 是   | 用户的身份标识                                               |
| name       | string   | 是   | 用户姓名                                                     |
| sex        | int      | 是   | 用户性别                                                     |
| idCard     | string   | 是   | 用户身份证号                                                 |
| phone      | string   | 是   | 用户电话号码                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "idCard":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 前台

#### 前台查看住户个人详细信息

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

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示用户不存在，2表示未知错误。    |
| wecharId   | string   | 是   | 用户的身份标识                                               |
| name       | string   | 是   | 用户姓名                                                     |
| sex        | int      | 是   | 用户性别                                                     |
| idCard     | string   | 是   | 用户身份证号                                                 |
| phone      | string   | 是   | 用户电话号码                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "name":"张三",
    "sex":1,
    "idCard":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 订单信息

### 住户

#### 住户查看个人订单简略信息

功能描述：**查询指定住户的所有订单简略信息**。

API：/user/resident/ordersinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| cerCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示订单不存在，2表示未知错误。    |
| orderlist  | string(json) | 是   | 订单简略信息（订单号、实际入住时间、实际离开时间、订单状态） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "orderlist":[{
        "orderId":123,
        "actLive":"2020-05-17 18:55:49",
        "actAway":"2020-05-26 18:55:49",
        "orderStatus":0,
    },{
        "orderId":123,
        "actLive":"2020-05-17 18:55:49",
        "actAway":"2020-05-26 18:55:49",
        "orderStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户查看个人订单详细信息（包含查询住户个人详细信息）

功能描述：**查询指定住户的指定订单详细信息**。

API：/user/resident/orderinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| orderId | int      | 是   | 订单号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示订单不存在，2表示用户不存在，3表示未知错误。 |
| orderId     | string   | 是   | 订单号                                                       |
| name        | string   | 是   | 用户姓名                                                     |
| sex         | string   | 是   | 用户性别                                                     |
| phone       | string   | 是   | 用户电话号码                                                 |
| roomId      | string   | 是   | 房间号                                                       |
| roomType    | string   | 是   | 房间类型                                                     |
| bedType     | string   | 是   | 房间床型                                                     |
| deposit     | int      | 是   | 订金                                                         |
| amountsPay  | int      | 是   | 应付金额                                                     |
| expLive     | string   | 是   | 预计入住时间                                                 |
| expAway     | string   | 是   | 预计离开时间                                                 |
| actLive     | string   | 是   | 实际入住时间                                                 |
| actAway     | string   | 是   | 实际离开时间                                                 |
| orderStatus | int      | 是   | 订单状态                                                     |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "orderId":123,
    "name":"穆刘杨",
    "sex":"男",
    "phone":18178346924,
    "roomId":102,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "deposit":100,
    "amountsPay":400,
    "expLive":"2020-05-16 18:55:49",
    "expAway":"2020-05-25 18:55:49",
    "actLive":"2020-05-17 18:55:49",
    "actAway":"2020-05-26 18:55:49",
    "orderStatus":2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户修改个人订单信息

功能描述：**修改指定住户订单信息**。

API：/user/resident/orderinf/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| orderId | int      | 是   | 订单号                                                       |
| phone   | string   | 否   | 住户手机号                                                   |
| expLive | string   | 否   | 预计入住时间                                                 |
| expAway | string   | 否   | 预计离开时间                                                 |
| actLive | string   | 否   | 实际入住时间                                                 |
| actAway | string   | 否   | 实际离开时间                                                 |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示管理员拒绝修改申请，2表示订单不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "phone":"18178346924"
    "expLive":"2020-05-1618:55:49",
    "expAway":"2020-05-2518:55:49",
    "actLive":"",
    "actAway":"",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看订单详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/user/admin/super_admin/orderinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示当前时间该房间无进行中订单，2表示未知错误。 |
| id         | string   | 是   | 订单号                                                       |
| deposit    | int      | 是   | 订金                                                         |
| amountsPay | int      | 是   | 应付金额                                                     |
| expLive    | string   | 是   | 预计入住时间                                                 |
| expAway    | string   | 是   | 预计离开时间                                                 |
| actLive    | string   | 是   | 实际入住时间                                                 |
| actAway    | string   | 是   | 实际离开时间                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "id":123,
    "deposit":100,
    "amountsPay":400,
    "expLive":"2020-05-1618:55:49",
    "expAway":"2020-05-2518:55:49",
    "actLive":"2020-05-17 18:55:49",
    "actAway":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 经理

#### 经理查看订单详细信息

功能描述：**查询指定时间和房间号的订单详细信息**。

API：/user/admin/manager/orderinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode   | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId      | int      | 是   | 房间号                                                       |
| currentTime | string   | 是   | 时间戳，前端获取的当前日期和时间。配合房间号联合查询指定房间的当前订单。 |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示当前时间该房间无进行中订单，2表示未知错误。 |
| id         | string   | 是   | 订单号                                                       |
| deposit    | int      | 是   | 订金                                                         |
| amountsPay | int      | 是   | 应付金额                                                     |
| expLive    | string   | 是   | 预计入住时间                                                 |
| expAway    | string   | 是   | 预计离开时间                                                 |
| actLive    | string   | 是   | 实际入住时间                                                 |
| actAway    | string   | 是   | 实际离开时间                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "id":123,
    "deposit":100,
    "amountsPay":400,
    "expLive":"2020-05-1618:55:49",
    "expAway":"2020-05-2518:55:49",
    "actLive":"2020-05-17 18:55:49",
    "actAway":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```



### 前台

#### 前台查看订单详细信息

功能描述：**查询指定时间和房间号的订单详细信息**。

API：/user/admin/reception/orderinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| :---------- | :------- | :--- | :----------------------------------------------------------- |
| adminCode   | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId      | int      | 是   | 房间号                                                       |
| currentTime | string   | 是   | 时间戳，前端获取的当前日期和时间。配合房间号联合查询指定房间的当前订单。 |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示当前时间该房间无进行中订单，2表示未知错误。 |
| id         | string   | 是   | 订单号                                                       |
| deposit    | int      | 是   | 订金                                                         |
| amountsPay | int      | 是   | 应付金额                                                     |
| expLive    | string   | 是   | 预计入住时间                                                 |
| expAway    | string   | 是   | 预计离开时间                                                 |
| actLive    | string   | 是   | 实际入住时间                                                 |
| actAway    | string   | 是   | 实际离开时间                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "id":123,
    "deposit":100,
    "amountsPay":400,
    "expLive":"2020-05-1618:55:49", 
    "expAway":"2020-05-2518:55:49",
    "actLive":"2020-05-17 18:55:49",
    "actAway":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 房间信息

### 住户

#### 住户查看所有房间简略信息

功能描述：**查询指定房间类型和指定时间段内的所有的房间简略信息**。

API：/user/resident/roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| cerCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomType  | string   | 否   | 房间类型                                                     |
| startTime | string   | 是   | 预计入住起始时间                                             |
| endTime   | string   | 是   | 预计入住结束时间                                             |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示无房间信息，2表示未知错误。    |
| roomList   | string(json) | 是   | 房间简略信息（房间类型、房间床型、限住人数、房间价格）       |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房"/"roomType":"",
    "startTime":"2020-05-17 18:55:49",
    "endTime":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "roomList":[{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400
    },{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户查看个人所有房间简略信息(包含查询硬件详细信息)

功能描述：**查询指定住户和指定时间的所有已预定状态和进行中状态订单的房间简略信息**。

后端返回数组中，进行中状态订单的房间简略信息下标靠前。

API：/user/resident/per_roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| cerCode     | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| currentTime | string   | 是   | 时间戳，前端获取的当前日期和时间。配合住户身份标识联合查询已预定状态和进行中状态的订单的房间信息。 |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型     | 必填 | 备注                                                         |
| ----------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode     | int          | 是   | 状态标识。0表示成功查询，1表示无已预定状态和进行中状态的订单的房间，2表示未知错误。 |
| perRoomList | string(json) | 是   | 进行中订单房间简略信息（房间号、房间类型、温湿度、硬件状态、硬件模式、硬件数值）。已预订订单房间简略信息房间号、房间类型） |
| stamp       | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "currentTime":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2,
    "perRoomListroomList":[{
        "romId":101,			//进行中订单房间简略信息
        "roomType":"豪华大床房",
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "airMode":1,
        "lightMode":1,
        "airValue":26,
        "lightValue":5,
        
        
    },{
        "romId":102,			//已预订订单房间简略信息
        "roomType":"情侣套房",
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看住户房间简略信息

功能描述：**查询所有房间简略信息**。

API：/user/admin/super_admin/roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型 | 必填 | 备注                                                         |
| --------------- | -------- | ---- | ------------------------------------------------------------ |
| errcode         | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| liveRoomList    | string   | 是   | 进行中状态订单的房间简略信息(房间号、温湿度、硬件状态)       |
| notliveRoomList | string   | 是   | 非“进行中状态订单的房间”房间（剩余所有房间）简略信息(房间号、温湿度、硬件状态) |
| stamp           | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "perRoomListroomList":[{
        "romId":101,			//进行中订单房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },{
        "romId":102,			//非“进行中状态订单的房间”房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 超级管理员查看住户房间详细信息

功能描述：**查询指定房间的进行中状态订单的房间详细信息**。

API：/user/admin/super_admin/roominf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示订单不存在，3表示未知错误。 |
| roomId     | string   | 是   | 房间号                                                       |
| roomType   | string   | 是   | 房间类型                                                     |
| bedType    | string   | 是   | 房间床型                                                     |
| roomArea   | int      | 是   | 房间面积                                                     |
| maximum    | int      | 是   | 居住人数上限                                                 |
| roomWindow | int      | 是   | 窗户有无                                                     |
| roomPrice  | int      | 是   | 房间价格                                                     |
| roomTemp   | float    | 是   | 温度                                                         |
| roomHum    | int      | 是   | 湿度                                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "id":123,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "roomArea":25,
    "maximum":3,
    "roomWindow":1,
    "roomPrice":300,
    "roomTemp":26,
    "roomHum":40,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 经理

#### 经理查看住户房间简略信息

功能描述：**查询所有房间简略信息**。

API：/user/admin/manager/roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型 | 必填 | 备注                                                         |
| --------------- | -------- | ---- | ------------------------------------------------------------ |
| errcode         | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| liveRoomList    | string   | 是   | 进行中状态订单的房间简略信息(房间号、温湿度、硬件状态)       |
| notliveRoomList | string   | 是   | 非“进行中状态订单的房间”房间（剩余所有房间）简略信息(房间号、温湿度、硬件状态) |
| stamp           | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "perRoomListroomList":[{
        "romId":101,			//进行中订单房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },{
        "romId":102,			//非“进行中状态订单的房间”房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 经理查看住户房间详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/user/admin/manager/roominf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| roomId     | string   | 是   | 房间号                                                       |
| roomType   | string   | 是   | 房间类型                                                     |
| bedType    | string   | 是   | 房间床型                                                     |
| roomArea   | int      | 是   | 房间面积                                                     |
| maximum    | int      | 是   | 居住人数上限                                                 |
| roomWindow | int      | 是   | 窗户有无                                                     |
| roomPrice  | int      | 是   | 房间价格                                                     |
| roomTemp   | float    | 是   | 温度                                                         |
| roomHum    | int      | 是   | 湿度                                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "id":123,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "roomArea":25,
    "maximum":3,
    "roomWindow":1,
    "roomPrice":300,
    "roomTemp":26,
    "roomHum":40,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 前台

#### 前台查看住户房间简略信息

功能描述：**查询所有房间简略信息**。

API：/user/admin/reception/roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型 | 必填 | 备注                                                         |
| --------------- | -------- | ---- | ------------------------------------------------------------ |
| errcode         | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| liveRoomList    | string   | 是   | 进行中状态订单的房间简略信息(房间号、温湿度、硬件状态)       |
| notliveRoomList | string   | 是   | 非“进行中状态订单的房间”房间（剩余所有房间）简略信息(房间号、温湿度、硬件状态) |
| stamp           | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "perRoomListroomList":[{
        "romId":101,			//进行中订单房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },{
        "romId":102,			//非“进行中状态订单的房间”房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 前台查看住户房间详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/user/admin/reception/roominf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| roomId     | string   | 是   | 房间号                                                       |
| roomType   | string   | 是   | 房间类型                                                     |
| bedType    | string   | 是   | 房间床型                                                     |
| roomArea   | int      | 是   | 房间面积                                                     |
| maximum    | int      | 是   | 居住人数上限                                                 |
| roomWindow | int      | 是   | 窗户有无                                                     |
| roomPrice  | int      | 是   | 房间价格                                                     |
| roomTemp   | float    | 是   | 温度                                                         |
| roomHum    | int      | 是   | 湿度                                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "id":123,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "roomArea":25,
    "maximum":3,
    "roomWindow":1,
    "roomPrice":300,
    "roomTemp":26,
    "roomHum":40,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 安保人员

#### 安保人员查看住户房间简略信息

功能描述：**查询所有房间简略信息**。

API：/user/admin/security/roomsinf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型 | 必填 | 备注                                                         |
| --------------- | -------- | ---- | ------------------------------------------------------------ |
| errcode         | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| liveRoomList    | string   | 是   | 进行中状态订单的房间简略信息(房间号、温湿度、硬件状态)       |
| notliveRoomList | string   | 是   | 非“进行中状态订单的房间”房间（剩余所有房间）简略信息(房间号、温湿度、硬件状态) |
| stamp           | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "perRoomListroomList":[{
        "romId":101,			//进行中订单房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },{
        "romId":102,			//非“进行中状态订单的房间”房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 安保人员查看住户房间详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/user/admin/security/roominf/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| roomId     | string   | 是   | 房间号                                                       |
| roomType   | string   | 是   | 房间类型                                                     |
| bedType    | string   | 是   | 房间床型                                                     |
| roomArea   | int      | 是   | 房间面积                                                     |
| maximum    | int      | 是   | 居住人数上限                                                 |
| roomWindow | int      | 是   | 窗户有无                                                     |
| roomPrice  | int      | 是   | 房间价格                                                     |
| roomTemp   | float    | 是   | 温度                                                         |
| roomHum    | int      | 是   | 湿度                                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "id":123,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "roomArea":25,
    "maximum":3,
    "roomWindow":1,
    "roomPrice":300,
    "roomTemp":26,
    "roomHum":40,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 清洁人员

#### 清洁人员查看住户房间简略信息

功能描述：**查询所有房间简略信息**。

API：/user/admin/reception/cleaner/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| :-------- | :------- | :--- | :----------------------------------------------------------- |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型 | 必填 | 备注                                                         |
| :-------------- | :------- | :--- | :----------------------------------------------------------- |
| errcode         | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| liveRoomList    | string   | 是   | 进行中状态订单的房间简略信息(房间号、温湿度、硬件状态)       |
| notliveRoomList | string   | 是   | 非“进行中状态订单的房间”房间（剩余所有房间）简略信息(房间号、温湿度、硬件状态) |
| stamp           | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "perRoomListroomList":[{
        "romId":101,            //进行中订单房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },{
        "romId":102,            //非“进行中状态订单的房间”房间简略信息
        "roomTemp":26,
        "roomHum":40,
        "airStatus":0,
        "lightStatus":0,
        "lockStatus":0,
    },
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 清洁人员查看住户房间详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/user/admin/security/cleaner/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示未知错误。                     |
| roomId     | string   | 是   | 房间号                                                       |
| roomType   | string   | 是   | 房间类型                                                     |
| bedType    | string   | 是   | 房间床型                                                     |
| roomArea   | int      | 是   | 房间面积                                                     |
| maximum    | int      | 是   | 居住人数上限                                                 |
| roomWindow | int      | 是   | 窗户有无                                                     |
| roomPrice  | int      | 是   | 房间价格                                                     |
| roomTemp   | float    | 是   | 温度                                                         |
| roomHum    | int      | 是   | 湿度                                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "id":123,
    "roomType":"豪华大床房",
    "bedType":"特大床",
    "roomArea":25,
    "maximum":3,
    "roomWindow":1,
    "roomPrice":300,
    "roomTemp":26,
    "roomHum":40,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 硬件信息

### 住户

#### 住户修改空调硬件信息

功能描述：**修改房间内空调的硬件信息**。

API：/user/resident/hardwareinf/air_conditioning/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId    | int      | 是   | 房间号                                                       |
| airStatus | int      | 否   | 空调状态                                                     |
| airMode   | int      | 否   | 空调模式                                                     |
| airValue  | int      | 否   | 空调数值                                                     |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示空调不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "airStatus":1,
    "airMode":"",
    "airValue":"",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户修改空调硬件信息

功能描述：**修改房间内灯的硬件信息**。

API：/user/resident/hardwareinf/light/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| resCode     | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId      | int      | 是   | 房间号                                                       |
| lightStatus | int      | 否   | 灯状态                                                       |
| lightMode   | int      | 否   | 灯模式                                                       |
| lightValue  | int      | 否   | 灯数值                                                       |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示灯不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lightStatus":"",
    "lightMode":0,
    "lightValue":6,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户修改门锁硬件信息

功能描述：**修改房间内门锁的硬件信息**。

API：/user/resident/hardwareinf/lock/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| resCode    | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示门锁不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 超级管理员

#### 超级管理员查看空调硬件详细信息

功能描述：**查询指定房间的进行中状态订单的空调硬件详细信息**。

API：/user/admin/super_admin/hardwareinf/air_conditioning/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示空调不存在，3表示未知错误。 |
| airId      | int      | 是   | 空调编号                                                     |
| airStatus  | int      | 否   | 空调状态                                                     |
| airMode    | int      | 否   | 空调模式                                                     |
| airValue   | int      | 否   | 空调数值                                                     |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "airId":12,
    "airStatus":1,
    "airMode":1,
    "airValue":25,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 超级管理员查看灯硬件详细信息

功能描述：**查询指定房间的进行中状态订单的灯硬件详细信息**。

API：/user/admin/super_admin/hardwareinf/light/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示灯不存在，3表示未知错误。 |
| lightId     | int      | 是   | 灯编号                                                       |
| lightStatus | int      | 否   | 灯状态                                                       |
| lightMode   | int      | 否   | 灯模式                                                       |
| lightValue  | int      | 否   | 灯数值                                                       |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "lightId":12,
    "lightStatus":1,
    "lightMode":0,
    "lightValue":6,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 超级管理员修改门锁硬件信息

功能描述：**修改房间内门锁的硬件信息**。

API：/user/super_admin/hardwareinf/lock/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示门锁不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 经理

#### 经理查看空调硬件详细信息

功能描述：**查询指定房间的进行中状态订单的空调硬件详细信息**。

API：/user/admin/super_admin/manager/air_conditioning/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示空调不存在，3表示未知错误。 |
| airId      | string   | 是   | 空调编号                                                     |
| airStatus  | int      | 否   | 空调状态                                                     |
| airMode    | int      | 否   | 空调模式                                                     |
| airValue   | int      | 否   | 空调数值                                                     |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "airId":12,
    "airStatus":1,
    "airMode":1,
    "airValue":25,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 经理查看灯硬件详细信息

功能描述：**查询指定房间的进行中状态订单的灯硬件详细信息**。

API：/user/admin/manager/hardwareinf/light/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示灯不存在，3表示未知错误。 |
| lightId     | string   | 是   | 灯编号                                                       |
| lightStatus | int      | 否   | 灯状态                                                       |
| lightMode   | int      | 否   | 灯模式                                                       |
| lightValue  | int      | 否   | 灯数值                                                       |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "lightId":12,
    "lightStatus":1,
    "lightMode":0,
    "lightValue":6,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 经理修改门锁硬件信息

功能描述：**修改房间内门锁的硬件信息**。

API：/user/admin/manager/hardwareinf/lock/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示门锁不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 前台

####　前台查看空调硬件详细信息

功能描述：**查询指定房间的进行中状态订单的空调硬件详细信息**。

API：/user/admin/reception/manager/air_conditioning/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示空调不存在，3表示未知错误。 |
| airId      | string   | 是   | 空调编号                                                     |
| airStatus  | int      | 否   | 空调状态                                                     |
| airMode    | int      | 否   | 空调模式                                                     |
| airValue   | int      | 否   | 空调数值                                                     |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "airId":12,
    "airStatus":1,
    "airMode":1,
    "airValue":25,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 前台查看灯硬件详细信息

功能描述：**查询指定房间的进行中状态订单的灯硬件详细信息**。

API：/user/admin/reception/hardwareinf/light/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomId    | int      | 是   | 房间号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| errcode     | int      | 是   | 状态标识。0表示成功查询，1表示房间不存在，2表示灯不存在，3表示未知错误。 |
| lightId     | string   | 是   | 灯编号                                                       |
| lightStatus | int      | 否   | 灯状态                                                       |
| lightMode   | int      | 否   | 灯模式                                                       |
| lightValue  | int      | 否   | 灯数值                                                       |
| stamp       | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "lightId":12,
    "lightStatus":1,
    "lightMode":0,
    "lightValue":6,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 安保人员

#### 安保人员修改门锁硬件信息

功能描述：**修改房间内门锁的硬件信息**。

API：/user/admin/security/hardwareinf/lock/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示门锁不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

### 清洁人员

#### 清洁人员修改门锁硬件信息

功能描述：**修改房间内门锁的硬件信息**。

API：/user/admin/cleaner/hardwareinf/lock/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| adminCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功修改，1表示房间不存在，2表示门锁不存在，3表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 记录信息

### 提交

#### 用户提交开门记录

功能描述：**记录所有身份用户开门记录**。

API：/user/record/unlock/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 必填 | 备注                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| cerCode  | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| roomId   | int      | 是   | 房间号                                                       |
| openTime | string   | 否   | 开门时间                                                     |
| stamp    | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove    | string   | 是   | 管理员的cerCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功记录，1表示未知错误                       |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "openTime":"2020-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 客房服务

### 提交

#### 住户提交呼叫保洁申请

功能描述：**住户呼叫保洁人员**。

API：/server/call_cleaning/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| :------ | :------- | :--- | :----------------------------------------------------------- |
| resCode | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| roomId  | int      | 是   | 房间号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功呼叫，1表示无保洁人员，2表示保洁人员现无法提供服务，3表示意外错误 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

#### 住户提交意见反馈

功能描述：**住户提交对酒店的意见或建议**。

API：/server/feedback/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| :------ | :------- | :--- | :----------------------------------------------------------- |
| resCode | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| message | string   | 是   | 用户的反馈留言                                               |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库     |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功留言，1表示意外错误                       |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库     |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

## 系统

### 查询

#### 用户查询身份

功能描述：**住户提交对酒店的意见或建议**。

API：/system/identity/user/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| :------ | :------- | :--- | :----------------------------------------------------------- |
| cerCode | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库     |
| prove   | string   | 是   | 管理员的cerCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示不是用户                       |
| identity   | int      | 是   | 用户身份标识                                                 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库     |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

**request**

```json
{
    "cerCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "identity":0/1/2/3/4/5,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx",
}
```

