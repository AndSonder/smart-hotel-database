## 用户信息

### 提交

#### 住户提交个人详细信息

功能描述：**住户预定时提交个人详细信息到用户信息表中**。

API：/user/perinfo/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，将openid录入用户数据表中 |
| name    | string   | 是   | 用户姓名                                                     |
| sex     | string   | 是   | 用户性别                                                     |
| idCard  | string   | 是   | 用户身份证号                                                 |
| phone   | string   | 是   | 用户电话号码                                                 |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 用户的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功提交，1表示住户已存在，2表示未知错误。    |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

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
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

### 查询

#### 住户查询住户个人详细信息

功能描述：**查询指定住户的个人详细信息**。

API：/user/perinfo/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、4表示未知错误。    |
| datalist   | string(json) | 是   | 住户详细信息（姓名、性别、电话号码）                         |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "datalist":[{
        "name":"张三",
    	"sex":1,
    	"phone":"181xxxx6924",
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```



#### 管理员查询住户个人详细信息

功能描述：**根据订单号查询指定住户的个人详细信息**。

API：/user/perinf/admin/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| orderId   | string   | 是   | 订单号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该管理员、2表示没有该住户、4表示未知错误。 |
| datalist   | string(json) | 是   | 住户详细信息（姓名、性别、电话号码、身份证号）               |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "name":"张三",
        "sex":1,
        "idCard":"230xxxxxxxxxxxxxxx",
        "phone":"181xxxx6924",
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

## 订单

### 提交

####　住户提交订单详细信息

功能描述：**住户预定时提交订单详细信息到订单信息表中**。

API：/order/perinfo/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 必填 | 备注                                                         |
| -------- | -------- | ---- | ------------------------------------------------------------ |
| resCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，将openid录入订单数据表中 |
| roomType | string   | 是   | 房间类型                                                     |
| expLive  | string   | 是   | 预计入住时间                                                 |
| expAway  | string   | 是   | 预计离开时间                                                 |
| stamp    | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove    | string   | 是   | 用户的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功提交、1表示订单已存在、2表示未知错误。    |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房",
    "expLive":"2020-05-1618:55:49",
    "expAway":"2020-05-2518:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

### 查询

#### 住户查询个人订单简略信息

功能描述：**查询指定住户的所有订单简略信息**。

API：/order/ordersinf/resident/get

订单列表元素按照下单时间由近及远的排序放入数组中。

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示订单不存在、3表示未知错误。 |
| orderlist  | string(json) | 是   | 订单简略信息（订单号、房间号、订单下单时间、订单状态）       |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "orderlist":[{
        "orderId":123,
        "roomId":101,
        "orderTime":"2020-05-17 18:55:49",
        "orderStatus":0,
    },{
        "orderId":123,
        "roomId":102,
        "orderTime":"2020-05-17 18:55:49",
        "orderStatus":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询个人订单消费明细

功能描述：**查询指定住户的指定订单消费明细**。

API：/order/orderinf_amountsPay/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| orderId | int      | 是   | 订单号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示订单不存在、4表示未知错误。 |
| datalist   | int      | 是   | 订单信息（应付金额）                                         |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "amountsPay":400,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询个人订单详细信息

功能描述：**查询指定住户的指定订单详细信息**。

API：/order/orderinf/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| orderId | int      | 是   | 订单号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示订单不存在、4表示未知错误。 |
| datalist   | string(json) | 是   | 订单详细信息（订单号、订金、应付金额、预计入住时间、预计离开时间、实际入住时间、实际离开时间、订单下单时间、订单状态） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "orderId":123,
        "deposit":100,
        "amountsPay":400,
        "expLive":"2020-05-16 18:55:49",
        "expAway":"2020-05-25 18:55:49",
        "actLive":"2020-05-17 18:55:49",
        "orderTime":"2020-05-17 18:55:49",
        "actAway":"2020-05-26 18:55:49",
        "orderStatus":2,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```



#### 管理员查询订单详细信息

功能描述：**查询指定房间的进行中状态的订单详细信息**。

API：/order/orderinf/admin/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| orderId   | int      | 是   | 订单号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员、2表示当前时间该房间无进行中订单，4表示未知错误。 |
| datalist   | string(json) | 是   | 订单详细信息（订单号、订金、应付金额、预计入住时间、预计离开时间、实际入住时间、实际离开时间、订单下单时间） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "orderId":123,
        "deposit":100,
        "amountsPay":400,
        "expLive":"2020-05-1618:55:49",
        "expAway":"2020-05-2518:55:49",
        "actLive":"2020-05-17 18:55:49",
        "actAway":"2020-05-26 18:55:49",
        "orderTime":"2020-05-17 18:55:49",
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

### 修改

#### 住户修改个人订单详细信息

功能描述：**修改指定住户订单详细信息**。

API：/order/orderinf/resident/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| resCode     | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| orderId     | int      | 是   | 订单号                                                       |
| expLive     | string   | 否   | 预计入住时间                                                 |
| expAway     | string   | 否   | 预计离开时间                                                 |
| actLive     | string   | 否   | 实际入住时间                                                 |
| actAway     | string   | 否   | 实际离开时间                                                 |
| orderStatus | int      | 否   | 订单状态，默认值为空                                         |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功修改、1表示没有该住户、2表示管理员拒绝修改申请，3表示订单不存在，4表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "expLive":"2020-05-1618:55:49",
    "expAway":"2020-05-2518:55:49",
    "actLive":"",
    "actAway":"",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

## 房间

### 查询

#### 住户查询所有房间简略信息

功能描述：**查询指定房间类型和指定时间段内的所有的房间简略信息**。

API：/room/roomsinf/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| resCode   | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomType  | string   | 是   | 房间类型，默认值为“全选”                                     |
| maximum   | int      | 是   | 房间限住人数，默认值为“全选”                                 |
| startTime | string   | 是   | 预计入住起始时间                                             |
| endTime   | string   | 是   | 预计入住结束时间                                             |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示无房间信息、3表示未知错误。 |
| roomList   | string(json) | 是   | 房间简略信息（房间类型、房间床型、限住人数、房间价格、窗户有无） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "maximum"：2,
    "roomType":"豪华大床房"/"roomType":"",
    "startTime":"2020-05-17 18:55:49",
    "endTime":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "roomList":[{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400,
        "roomWindow":1,
    },{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400,
        "roomWindow":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询精品推荐房间简略信息

功能描述：**查询系统推送的精品房间简略信息**。

API：/room/roomsinf_boutique/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示无房间信息、4表示未知错误。 |
| datalist   | string(json) | 是   | 精品房间简略信息（房间类型、房间床型、限住人数、房间价格、窗户有无） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400,
        "roomWindow":1,
    },{
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "maximum":3,
        "roomPrice":400,
        "roomWindow":0,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询个人所有房间简略信息 （改）

功能描述：**查询指定住户和指定时间的所有已预定状态和进行中状态订单的房间简略信息**。

后端返回数组中，进行中状态订单的房间简略信息下标靠前。

API：/room/per_roomsinf/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段        | 数据类型 | 必填 | 备注                                                         |
| ----------- | -------- | ---- | ------------------------------------------------------------ |
| resCode     | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| currentTime | string   | 是   | 时间戳，前端获取的当前日期和时间。配合住户身份标识联合查询已预定状态和进行中状态的订单的房间信息。 |
| stamp       | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove       | string   | 是   | 管理员的数据类型必填备注resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段        | 数据类型     | 必填 | 备注                                                         |
| ----------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode     | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示无已预定状态和进行中状态的订单的房间、4表示未知错误。 |
| perRoomList | string(json) | 是   | 进行中订单房间简略信息（房间号、订单号、房间类型、温湿度、门锁状态、订单状态）。已预订订单房间简略信息（房间号、订单号、房间类型、订单状态） |
| stamp       | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve  | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "currentTime":"2020-05-26 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "perRoomList":[{
        "orderId":123,
        "roomId":101,			//进行中订单房间简略信息
        "roomType":"豪华大床房",
        "roomTemp":26,
        "roomHum":40,
        "lockStatus":1,
        "orderStatus":0,
        
    },{
        "orderId":123,
        "roomId":102,			//已预订订单房间简略信息
        "roomType":"情侣套房",
        "orderStatus":3,
  	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询指定房间详细信息（改）

**查询指定房间类型或房间号的详细信息**。

API：/room/per_roominf/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 必填 | 备注                                                         |
| -------- | -------- | ---- | ------------------------------------------------------------ |
| resCode  | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId   | int      | 否   | 房间号                                                       |
| roomType | string   | 否   | 房间类型                                                     |
| stamp    | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove    | string   | 是   | 管理员的数据类型必填备注resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询、1表示没有该住户、2表示没有该房间、4表示未知错误。 |
| datalist   | string(json) | 是   | 房间详细信息（房间号、房间类型、房间床型、房间面积、限住人数、窗户有无、房间价格、房间温度、房间湿度） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3,
    "datalist":[{
        "roomId":123,
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "roomArea":25,
        "maximum":3,
        "roomWindow":1,
        "roomPrice":300,
        "roomTemp":26,
        "roomHum":40,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 管理员查询住户房间简略信息(新增原有接口，原本的在过往版本更改中被误删)

功能描述：**查询指定房间的房间简略信息**。

API：/room/roomsinf/admin/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomType  | string   | 是   | 房间类型，默认值为“全选”                                     |
| startTime | string   | 是   | 实际入住时间的查询最小值，默认值为“display-all”              |
| endTime   | string   | 是   | 实际入住时间的查询最大值，默认值为“display-all”              |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段            | 数据类型     | 必填 | 备注                                                         |
| --------------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode         | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员、2表示房间不存在，3表示订单不存在，4表示未知错误。 |
| liveRoomList    | string(json) | 是   | 房间简略信息（房间号、温湿度、锁状态、灯状态、空调状态、订单号）（后端若保存过字段名则更新为原字段名） |
| notliveRoomList | string(json) | 是   | 房间简略信息（房间号、硬件状态）（后端若保存过字段名则更新为原字段名） |
| stamp           | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve      | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房",
    "startTime":"2020-05-21 18:55:49",
    "endTime":"2020-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "liveRoomList":[{	//进行中状态订单
        "orderId":123,
        "roomId":123,
        "roomTemp":26,
        "roomHum":45,
        "lockStatus":1,
        "airStatus":1,
        "lightStatus":1,
	},
    ],
    "notliveRoomList":[{	//非进行中状态订单
        "roomId":123,
        "lockStatus":1,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 管理员根据指定因素查询住户房间简略信息(新增接口)

功能描述：**查询指定房间简略信息**。

API：/room/extra_roomsinf/admin/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 必填 | 备注                                                         |
| --------- | -------- | ---- | ------------------------------------------------------------ |
| adminCode | string   | 是   | 管理员的登录凭证，后端借其获取openid，验证用户身份是否为超级管理员 |
| roomType  | string   | 是   | 房间类型，默认值为“全选”                                     |
| startTime | string   | 是   | 实际入住时间的查询最小值，默认值为“display-all”              |
| endTime   | string   | 是   | 实际入住时间的查询最大值，默认值为“display-all”              |
| orderId   | int      | 否   | 订单号                                                       |
| stamp     | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove     | string   | 是   | 管理员的adminCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员、2表示房间不存在，3表示订单不存在，4表示未知错误。 |
| datalist   | string(json) | 是   | 如果查询的房间是进行中状态订单的房间，返回房间简略信息（房间号、温湿度、锁状态、灯状态、空调状态、订单号、订单状态）；如果是非进行中状态订单的房间。返回房间简略信息（房间号、硬件状态、订单状态） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomType":"豪华大床房",
    "startTime":"2020-05-21 18:55:49",
    "endTime":"2020-05-21 18:55:49",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{		
        "orderId":123,
        "roomId":123,
        "roomTemp":26,
        "roomHum":45,
        "lockStatus":1,
        "airStatus":1,
        "lightStatus":1,
        "orderStatus":0,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

####

#### 管理员查询住户房间详细信息

功能描述：**查询指定房间的进行中状态订单的房间详细信息**。

API：/room/roominf/admin/get

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

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员、2表示房间不存在，3表示订单不存在，4表示未知错误。 |
| datalist   | string(json) | 是   | 房间详细信息（房间号、房间类型、房间床型、房间面积、居住人数上限、窗户有无、房间价格、温度、湿度） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{
        "roomId":123,
        "roomType":"豪华大床房",
        "bedType":"特大床",
        "roomArea":25,
        "maximum":3,
        "roomWindow":1,
        "roomPrice":300,
        "roomTemp":26,
        "roomHum":40,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

## 硬件

### 查询

#### 住户查询空调详细信息

功能描述：**查询指定房间的空调详细信息**。

API：/hardware/air_condition/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId  | int      | 是   | 房间号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该住户，2表示房间不存在，3表示空调不存在、4表示未知错误。 |
| airStatus  | int          | 否   | 空调状态                                                     |
| airMode    | int          | 否   | 空调模式                                                     |
| airValue   | int          | 否   | 空调数值                                                     |
| datalist   | string(json) | 是   | 空调详细信息（空调状态、空调模式、空调数值）                 |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{
        "airStatus":1,
        "airMode":1,
        "airValue":25,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询灯详细信息

功能描述：**查询指定房间的灯详细信息**。

API：/hardware/light/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| ------- | -------- | ---- | ------------------------------------------------------------ |
| resCode | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId  | int      | 是   | 房间号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该住户，2表示房间不存在，3表示灯不存在、4表示未知错误。 |
| datalist   | string(json) | 是   | 灯详细信息（灯状态、灯模式、灯数值）                         |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{
        "lightStatus":1,
        "lightMode":0,
        "lightValue":6,
	},
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 管理员查看空调详细信息

功能描述：**查询指定房间的进行中状态订单的空调详细信息**。

API：/hardware/air_condition/admin/get

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

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员，2表示房间不存在，3表示空调不存在、4表示未知错误。 |
| datalist   | string(json) | 是   | 空调详细信息（空调编号、空调状态、空调模式、空调数值）       |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{
        "airId":12,
        "airStatus":1,
        "airMode":1,
        "airValue":25,
	},
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 管理员查看灯详细信息

功能描述：**查询指定房间的进行中状态订单的灯详细信息**。

API：/hardware/light/admin/get

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

| 字段       | 数据类型     | 必填 | 备注                                                         |
| ---------- | ------------ | ---- | ------------------------------------------------------------ |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该管理员，2表示房间不存在，3表示灯不存在、4表示未知错误。 |
| datalist   | string(json) | 是   | 灯详细信息（灯编号、灯状态、灯模式、灯数值）                 |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把adminCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "datalist":[{
        "lightId":12,
        "lightStatus":1,
        "lightMode":0,
        "lightValue":6,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

### 修改



#### 用户修改空调详细信息(新增接口)

功能描述：**修改房间内空调的详细信息**。

API：/hardware/air_condition/user/push

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
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示没有该用户，2表示房间不存在，3表示灯不存在、4表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "airStatus":1,
    "airMode":1,
    "airValue":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 用户修改灯详细信息(新增接口)

功能描述：**修改房间内灯的详细信息**。

API：/hardware/light/user/push

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
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示没有该用户，2表示房间不存在，3表示灯不存在、4表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lightStatus":1,
    "lightMode":1,
    "lightValue":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 用户修改门锁详细信息

功能描述：**修改房间内门锁的详细信息**。

API：/hardware/lock/user/push

请求方法：POST

支持格式：JSON

**请求参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| cerCode    | string   | 是   | 住户的登录凭证，后端借其获取openid，验证用户身份是否为住户   |
| roomId     | int      | 是   | 房间号                                                       |
| lockStatus | int      | 否   | 门锁状态                                                     |
| stamp      | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove      | string   | 是   | 管理员的cerCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| ---------- | -------- | ---- | ------------------------------------------------------------ |
| errcode    | int      | 是   | 状态标识。0表示成功查询，1表示没有该用户，2表示房间不存在，3表示门锁不存在、4表示未知错误。 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "lockStatus":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

## 记录

### 提交

#### 用户提交开门记录

功能描述：**记录所有身份用户开门记录**。

API：/record/unlock/user/post

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
| errcode    | int      | 是   | 状态标识。0表示成功记录，1表示没有该用户，2表示未知错误      |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "openTime":"2020-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
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
| errcode    | int      | 是   | 状态标识。0表示成功呼叫，1表示没有该住户、2表示无保洁人员，3表示保洁人员现无法提供服务、4表示意外错误 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户提交叫醒服务申请（新增接口）

功能描述：**住户申请酒店提供叫醒服务**。

API：/server/wake/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 必填 | 备注                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| resCode  | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| roomId   | int      | 是   | 房间号                                                       |
| wakeTime | string   | 是   | 叫醒时间                                                     |
| stamp    | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库。   |
| prove    | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功呼叫，1表示没有该住户、2表示现在无法提供叫醒服务、4表示意外错误 |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库。   |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":101,
    "wakeTime":"08:55"
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/3/4,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户提交意见反馈（新增message_time字段）

功能描述：**住户提交对酒店的意见或建议**。

API：/server/feedback/resident/post

请求方法：POST

支持格式：JSON

**请求参数**

| 字段         | 数据类型 | 必填 | 备注                                                         |
| :----------- | :------- | :--- | :----------------------------------------------------------- |
| resCode      | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是用户           |
| message      | string   | 是   | 用户的反馈留言                                               |
| message_time | string   | 是   | 用户的反馈留言的时间                                         |
| stamp        | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库     |
| prove        | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型 | 必填 | 备注                                                         |
| :--------- | :------- | :--- | :----------------------------------------------------------- |
| errcode    | int      | 是   | 状态标识。0表示成功留言，1表示没有该住户、2表示意外错误      |
| stamp      | string   | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库     |
| tableProve | string   | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "message":"浴室需要改进",
    "message_time":"2020-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

## 系统

### 查询

#### 用户查询身份

功能描述：**查询用户身份**。

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

| 字段       | 数据类型     | 必填 | 备注                                                         |
| :--------- | :----------- | :--- | :----------------------------------------------------------- |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该用户、2表示不是用户      |
| datalist   | string(json) | 是   | 用户身份信息（用户身份标识）                                 |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库     |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把cerCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2,
    "datalist":[{
        "identity":0/1/2/3/4/5,
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

#### 住户查询时间范围

功能描述：**查询某订单的预计入住时间和预计离开时间的可修改范围**。

API：/system/time_limit/resident/get

请求方法：POST

支持格式：JSON

**请求参数**

| 字段    | 数据类型 | 必填 | 备注                                                         |
| :------ | :------- | :--- | :----------------------------------------------------------- |
| resCode | string   | 是   | 用户的登录凭证，后端借其获取openid，验证是否是住户           |
| orderId | int      | 是   | 订单号                                                       |
| stamp   | string   | 是   | 时间戳，前端获取的当前日期和时间。验证用，不用加入数据库     |
| prove   | string   | 是   | 管理员的resCode+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。身份验证验证用，不用加入数据库。 |

**返回参数**

| 字段       | 数据类型     | 必填 | 备注                                                         |
| :--------- | :----------- | :--- | :----------------------------------------------------------- |
| errcode    | int          | 是   | 状态标识。0表示成功查询，1表示没有该住户、2表示没有该订单、4表示未知错误 |
| datalist   | string(json) | 是   | 系统的可选时间范围（客户发送过来的订单的预计入住时间的最小时间、客户发送过来的订单的预计离开时间的最大时间） |
| stamp      | string       | 是   | 时间戳，后端获取的当前日期和时间。验证用，不用加入数据库     |
| tableProve | string       | 是   | 表验证，功能与用法和prove一致，只不过把resCode换成表的名称。(如果涉及到联合查询，表名就用占主要返回属性的表名) |

请求示例：

**request**

```json
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "orderId":123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx"
}
```

**response**

```json
{
    "errcode":0/1/2/4,
    "datalist":[{
        "startTime":"2020-05-21 18:55:49",
    	"endTime":"2020-05-21 18:55:49",
	},
    ],
    "stamp":"2020-05-21 18:55:49",
    "tableProve":"xxxxxxxxxxx"
}
```

