>  stamp：时间戳，前端/后端获取的当前日期和时间。验证用，不用加入数据库。
>
> prove：用户的wecharid+stamp时间戳+盐（自定义的一个字段）后得到的字段进行MD5加密。验证用，不用加入数据库。
>
> result：返回的认为字段，用途为确定没有因为如人工导致的失误。
>
> table_prove：功能与用法和prove一致，只不过把wecharid换成表的名称。(如果涉及到联合查询，表名就用站主要返回属性的表名)

# 用户权限

## 用户预订

### 用户提交个人信息

功能描述：**用户预定时提交个人信息**。

用户在入住前进行预定时提交个人信息（请求参数的前五行参数），并发送时间戳和身份验证信息。后端返回result和后端获取的时间戳和表验证信息。

API：`/userpush`

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| name     | string   | 用户姓名                          |
| sex      | string   | 用户性别                          |
| id_card  | string   | 用户身份证号                      |
| phone    | string   | 用户电话号码                      |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 提交个人信息是否成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
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

### 用户提交订单信息

功能描述：**用户提交预订订单信息**。

用户在入住前进行预定，提交订单信息（请求参数的前五行参数），并发送时间戳和身份验证信息。后端返回result和后端获取的时间戳和表验证信息。

API：`/orderpush`

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| scid     | string   | 预定入住日期                      |
| sgo      | string   | 预定入住日期                      |
| pmoney   | int      | 订单应付金额                      |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 提交订单是否成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "scid":"2020-05-2119:00:00",
    "sgo":"2020-05-2215:00:00",
    "pmoney":300,
    "room_id":101,
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

## 用户退订

###　用户退订订单信息

功能描述：**用户取消预订的房间**。

用户在入住前取消订单，提交请求退单信息（请求参数的前两行参数），并发送时间戳和身份验证信息。后端通过用户的weicharid和id联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/chargeback_user`

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| id       | int      | 订单编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 退单是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
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

## 用户退房

### 用户退房订单信息

功能描述：**用户结账离开**。

用户在入住后退房，提交请求退房信息（请求参数的前三行参数），并发送时间戳和身份验证信息。后端通过用户的weicharid和id联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/checkout_user`

请求方法：POST

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| id       | int      | 订单编号                          |
| go       | string   | 结账离开时间                      |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 退房是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
    "go":"2020-05-2118:55:49",
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

# 管理员权限

## 用户

### 管理员查询所有用户信息

功能描述：**管理员查询所有用户预定时的个人简略信息**。

管理员查询所有用户的简略信息，提交管理员的wecharid，并发送时间戳和身份验证信息。后端通过管理员的weicharid确认前端请求，并返回result、用户姓名、性别、用户的wecharid和后端获取的时间戳和表验证信息。

API：`/userinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型     | 备注                        |
| ----------- | ------------ | --------------------------- |
| result      | int          | 所有用户信息是否查询成功    |
| stamp       | string       | 时间戳                      |
| user_list   | string(json) | 用户信息                    |
| table_prove | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "user_list":[{
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "name":"张三",
        "sex":1,
    },{
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "name":"张三",
        "sex":1,
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员查询所有管理员信息

功能描述：**管理员查询管理员的简略信息**。

管理员查询所有管理员的简略信息，提交管理员的wecharid，并发送时间戳和身份验证信息。后端通过管理员的weicharid确认前端请求，并返回result、管理员姓名、性别、管理员的wecharid和后端获取的时间戳和表验证信息。

API：`/admininf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型     | 备注                        |
| ----------- | ------------ | --------------------------- |
| result      | int          | 所有管理员信息是否查询成功  |
| stamp       | string       | 时间戳                      |
| admin_list  | string(json) | 用户信息                    |
| table_prove | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "user_list":[{
        "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "name":"张三",
        "sex":1,
    },{
        "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "name":"张三",
        "sex":1,
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 管理员查询指定用户信息

功能描述：**管理员查询指定用户预定时的个人信息**。

管理员查询指定用户的所有登记信息，提交管理员和用户/管理员(被查询)的wecharid，并发送时间戳和身份验证信息。后端通过管理员的weicharid和用户的weicharid联合确认前端请求，并返回result、用户的wecharid、姓名、性别、身份证号、电话号码和后端获取的时间戳和表验证信息。

API：`/markuserinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段                                 | 数据类型 | 备注                                    |
| ------------------------------------ | -------- | --------------------------------------- |
| wecharid_admin                       | string   | 管理员的身份标识                        |
| wecharid_user/wecharid_admin-queried | string   | 用户/管理员(被查询)的身份标识           |
| stamp                                | string   | 时间戳                                  |
| prove                                | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 用户信息是否查询成功        |
| wecharid    | string   | 用户的身份标识              |
| name        | string   | 用户姓名                    |
| sex         | int      | 用户性别                    |
| id_card     | string   | 用户身份证号                |
| phone       | string   | 用户电话号码                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
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

### 管理员修改用户信息

功能描述：**管理员修改用户预定时个人信息中的部分属性（姓名、性别、身份证号、电话号、图片）**。

管理员修改指定用户的登记信息中具体信息，这是考虑到用户后知后觉自己的姓名等信息填写错误。提交管理员和用户的wecharid、用户需修改的属性（姓名、性别、身份证号、电话号码）中的一项或多项，并发送时间戳和身份验证信息。后端通过管理员的weicharid和用户的weicharid联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/markuserinfmod_admin`

请求方法：POST

支持格式：JSON

**请求参数**

> 修改参数数量和名称不定，故全列。

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| wecharid_user  | string   | 用户的身份标识                          |
| name           | string   | 用户姓名                                |
| sex            | int      | 用户性别                                |
| id_card        | string   | 用户身份证号                            |
| phone          | string   | 用户电话号码                            |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 用户信息是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"龙傲天",
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

## 订单

### 管理员查询指定时间段的订单信息

功能描述：**管理员查询指定时间段的用户订单的具体信息**。

管理员获取一定时间内的全部订单信息，提交管理员的wecharid和指定时间段的起始时间和结束时间，并发送时间戳和身份验证信息。后端通过管理员的weicharid和指定时间段的起始时间&结束时间联合确认前端请求，并返回result、时间段内所有订单的订单编号、应付金额、预计入住&预计离开&实际入住&结账离开时间、房间编号、用户的weicharid和后端获取的时间戳和表验证信息。

API：`/orderinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| strarttime     | string   | 指定时间段的起始时间                    |
| endtime        | string   | 指定时间段的结束时间                    |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型     | 备注                        |
| ----------- | ------------ | --------------------------- |
| result      | int          | 订单信息是否查询成功        |
| order_list  | string(json) | 订单信息                    |
| stamp       | string       | 时间戳                      |
| table_prove | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "starttime":"2020-05-2118:55:49",
    "endtime":"2020-05-2118:55:49",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "order_list":[{
        "id":1,
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },{
        "id":2,
    	"wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
  	},{
        "id":3,
    	"wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
  	},
  	],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 管理员查询指定的订单信息

功能描述：**管理员查询指定的用户订单的具体信息**。

管理员获取指定某类属性的订单信息（有时间段限制），提交管理员的wecharid和订单编号/用户姓名/房间编号，并发送时间戳和身份验证信息。后端通过管理员的weicharid和id/用户姓名name/房间编号/房间编号+用户姓名name联合确认前端请求，并返回result、指定某类属性的订单的订单编号、应付金额、预计入住&预计离开&实际入住&结账离开时间、房间编号、用户的weicharid和后端获取的时间戳和表验证信息。

API：`/orderinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段                                  | 数据类型              | 备注                                                         |
| ------------------------------------- | --------------------- | ------------------------------------------------------------ |
| wecharid_admin                        | string                | 管理员的身份标识                                             |
| wecharid_user/id/name/room_id/name_id | int/string/int/string | 用户的身份标识/订单编号/用户姓名/房间编号/房间编号和用户姓名 |
| stamp                                 | string                | 时间戳                                                       |
| prove                                 | string                | 身份验证，MD5(wecharid_admin+时间戳+盐)                      |

**返回参数**

| 字段        | 数据类型     | 备注                        |
| ----------- | ------------ | --------------------------- |
| result      | int          | 订单信息是否查询成功        |
| order_list  | string(json) | 订单信息                    |
| stamp       | string       | 时间戳                      |
| table_prove | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

> 因为按照用户姓名和房间编号查询得到的订单可能不是单个订单，只有订单号查询得到的订单是单个订单，所以返回结果都采用数组的形式。

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
     "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",/"id":123,/"name":"张飒",/"room_id":101,/"name_id":"123-张飒",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "order_list":[{
        "id":123,
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },{
        "id":123,
    	"wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 管理员修改订单信息

功能描述：**管理员修改用户订单的部分属性（应付金额、预定入住日期、预计离开日期、实际入住时间、结账离开日期、房间编号）**。

管理员修改指定指定订单的的具体信息，订单中可变属性不少。比如用户想换房间预订又不想再填写订单，就需要管理员去修改，用户的实际入住时间和预计离开时间是有差异的，可能会涉及人工修改。但是订单的wecharid（用户）属性是不变的，要想改变wecharid（用户）属性就要重新预订。前端提交管理员的wecharid、订单需修改的属性（请求参数的第三行到第八行）中的一项或多项，并发送时间戳和身份验证信息。后端通过管理员的weicharid和id联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/orderinfmod_admin`

请求方法：POST

支持格式：JSON

**请求参数**

> 修改参数数量和名称不定，故全列。

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| id             | int      | 订单编号                                |
| pmoney         | int      | 订单应付金额                            |
| scid           | string   | 预定入住日期                            |
| sgo            | string   | 预计离开日期                            |
| cid            | string   | 实际入住时间                            |
| go             | string   | 结账离开日期                            |
| room_id        | int      | 房间编号                                |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 订单信息是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":123,
    "pmoney":400,
    "scid":"2020-05-1618:55:49",
    "sgo":"2020-05-2518:55:49",
    "cid":"2020-05-1718:55:49",
    "go":"2020-05-2618:55:49",
    "room_id":102,
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

## 房间

### 管理员查询所有房间信息

功能描述：**管理员查询房间信息**。

管理员查询所有房间信息，前端提交管理员的wecharid，并发送时间戳和身份验证信息。后端通过管理员的weicharid确认前端请求，并返回result、当前房间住户的wecharid、住户姓名、性别、订单号、房间编号、房间类型、房间锁的状态、房间当前温度、房间当前湿度、和后端获取的时间戳和表验证信息。

API：`/roominf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型     | 备注                        |
| ----------- | ------------ | --------------------------- |
| result      | int          | 查询所有房间信息是否成功    |
| room_list   | string(json) | 房间列表信息                |
| stamp       | string       | 时间戳                      |
| table_prove | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_list":[{
    	"wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    	"name":"张三",
    	"sex":1
    	"order_id":123,
    	"room_id":101,
        "rtype":"温馨大床房",
    	"rlock":0,
        "temperature":27,
        "humidity":38,
    },{
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    	"name":"张三",
    	"sex":1
    	"order_id":123,
    	"room_id":101,
        "rtype":"温馨大床房",
        "rlock":1,
        "temperature":27,
        "humidity":38,
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员查询指定房间信息

功能描述：**管理员查询房间信息**。

管理员查询指定房间信息，前端提交管理员的wecharid和房间编号，并发送时间戳和身份验证信息。后端通过管理员的weicharid和房间编号联合确认前端请求，并返回result、当前房间的房间编号、房间类型、房间床型、房间居住人数上限、房间面积、房间有窗有无、房间锁的状态、房间金额/日、房间当前温度、房间当前湿度和后端获取的时间戳和表验证信息。

API：`/roominf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 管理员的身份标识                        |
| room_id        | int      | 房间编号                                |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段         | 数据类型     | 备注                        |
| ------------ | ------------ | --------------------------- |
| result       | int          | 查询指定房间信息是否成功    |
| roominf_list | string(json) | 房间具体信息                |
| stamp        | string       | 时间戳                      |
| table_prove  | string       | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "roominf_list":[{
    	"room_id":101,
        "rtype":"温馨大床房",
        "bedtype":"特大床",
        "maxnum":3,
        "area":"25",
        "rwin":1,
    	"rlock":0,
        "money":300,
        "temperature":27,
        "humidity":38,
    },{
       "room_id":101,
        "rtype":"温馨大床房",
        "bedtype":"特大床",
        "maxnum":3,
        "area":"25",
        "rwin":1,
    	"rlock":0,
        "money":300,
        "temperature":27,
        "humidity":38,
  	},
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 管理员修改房间信息

功能描述：**管理员修改房间的名称、类型、居住人数上限、面积、窗户有无、价格、温度和湿度**。

管理员修改指定房间的具体信息，比如修改房间类型，把“温馨大床房”修改为“情侣套房”；比如修改房间床型，把“特大床”修改为“单人床”。前端提交管理员的wecharid、房间需修改的属性（请求参数的第三行到第六行）中的一项或多项，并发送时间戳和身份验证信息。后端通过管理员的weicharid和房间编号联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/roominfmod_admin`

请求方法：POST

支持格式：JSON

**请求参数**

> 修改参数数量和名称不定，故全列。

| 字段           | 数据类型    | 备注                                    |
| -------------- | ----------- | --------------------------------------- |
| wecharid_admin | string      | 用户的身份标识                          |
| room_id        | int         | 房间编号                                |
| rtype          | string      | 房间名                                  |
| bedtype        | string      | 房间床型                                |
| maxnum         | int         | 房间居住人数上限                        |
| area           | VARCHAR(50) | 房间面积                                |
| rin            | int         | 房间是否有窗                            |
| rlock          | int         | 房间锁的状态                            |
| money          | int         | 房间金额/日                             |
| temperature    | int         | 房间当前温度                            |
| humidity       | int         | 房间当前湿度                            |
| stamp          | string      | 时间戳                                  |
| prove          | string      | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 房间信息是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "rtype":"温馨大床房"
    "bedtype":"特大床",
    "maxnum":3,
    "area":"30",
    "rin":true,
    "money":300,
    "temperature":27,
    "humidity":38,
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

## 开门

### 查询开门记录

功能描述：**管理员查询房间的开门信息**。

管理员指定查询某个房间的开门信息，前端会给后端管理员的weicharid、房间编号、查询时间范围，并发送时间戳和身份验证信息。如果所给的范围的起始时间和结束时间超过数据表内所记录范围，以数据表的时间极值为准。后端通过weicharid和房间编号联合确认前端请求，后端会返回查询时间范围内的所有人的身份和开门时间，两个数组顺序一一对应，并返回result和后端获取的时间戳和表验证信息。身份类型返回数字标识即可。

API：`/doorinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 用户的身份标识                          |
| room_id        | int      | 房间编号                                |
| starttime      | string   | 查询时间范围的起始时间                  |
| endtime        | string   | 查询时间范围的结束时间                  |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                         |
| ----------- | -------- | ---------------------------- |
| result      | int      | 查询此房间的开门信息是否成功 |
| wecharid    | string   | 用户的身份标识               |
| identity    | int      | 开门人身份                   |
| opentime    | string   | 开门时间                     |
| stamp       | string   | 时间戳                       |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐)  |

请求示例：

**request**

```json
{
    "wecharid":"1c054ecb0e947af1661e9f4ae63053c5",
    "room_id":101,
    "starttime":"2020-05-1918:55:49",
    "endtime":"2020-05-1920:55:49"
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
    
}
```

**response**

```json
{
    "result":1,
    "wecharid":"1c054ecb0e947af1661e9f4ae63053c6",
    "identity":[1,0,1,0],
    "opentime":["2020-05-2118:55:29","2020-05-1118:55:29","2020-05-3118:55:29","2020-05-0118:55:29"],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 开/关门

功能描述：**管理员打开房门**。

管理员指定打开某个房间的房门，前端会给后端管理员的weicharid、房间编号，并发送时间戳和身份验证信息。后端通过weicharid和房间编号联合确认前端请求，后端会返回当前房间门锁状态，并返回result和后端获取的时间戳和表验证信息。

API：`/doorinf_admin`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段           | 数据类型 | 备注                                    |
| -------------- | -------- | --------------------------------------- |
| wecharid_admin | string   | 用户的身份标识                          |
| room_id        | int      | 房间编号                                |
| stamp          | string   | 时间戳                                  |
| prove          | string   | 身份验证，MD5(wecharid_admin+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 开门是否成功                |
| rlock       | int      | 房间门锁状态                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"1c054ecb0e947af1661e9f4ae63053c5",
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
    
}
```

**response**

```json
{
    "result":1,
    "rlock":0,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxx",
}
```



# 系统权限

## 登录（获取openid）

功能描述：**确认用户微信身份**。

前端给后端发送openid_code，并发送时间戳和身份验证信息。后端拿这个code和微信服务器请求获取wecharid（其实就是openid），再返回其给前端，并返回result和后端获取的时间戳和表验证信息。

API：`/login`

请求方法：GET

支持格式：JSON

**请求参数**

| 参数名称    | 类型   | 说明                                 |
| ----------- | ------ | ------------------------------------ |
| openid_code | string | 获取openid必备                       |
| stamp       | string | 时间戳                               |
| prove       | string | 身份验证，MD5(openid_code+时间戳+盐) |

**返回参数**

| 参数名称    | 类型   | 说明                              |
| ----------- | ------ | --------------------------------- |
| result      | int    | openid是否获取成功                |
| wecharid    | string | 用户的身份标识                    |
| stamp       | string | 时间戳                            |
| table_prove | string | 表验证，MD5(身份表表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "openid_code":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "openid":"1c054ecb0e947af1661e9f4ae63053c5",
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 身份确认

功能描述：**查询用户身份**。

前端给后端发送wecharid，并发送时间戳和身份验证信息。后端通过weicharid确认前端请求，返回用户身份给前端，并返回result和后端获取的时间戳和表验证信息。

API：`/userconf`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                              |
| ----------- | -------- | --------------------------------- |
| result      | int      | 身份是否确认成功                  |
| identity    | int      | 用户身份                          |
| stamp       | string   | 时间戳                            |
| table_prove | string   | 表验证，MD5(身份表表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "identity":1,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 记录开门

功能描述：**记录开门信息**。

用来记录开门的信息，后端要记录开门者的身份、房间编号和开门时间。

前端给后端发送wecharid，房间编号、开门时间，并发送时间戳和身份验证信息。后端通过weicharid和房间编号联合确认前端请求，并返回result和后端获取的时间戳和表验证信息。

API：`/recdoor`

请求方法：POST

支持格式：JSON

**请求参数**

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | string   | 用户的身份标识                    |
| room_id   | int      | 房间编号                          |
| open_time | string   | 开门的时间                        |
| stamp     | string   | 时间戳                            |
| prove     | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                                      |
| ----------- | -------- | ----------------------------------------- |
| result      | int      | 开门信息是否被记录                        |
| stamp       | string   | 时间戳                                    |
| table_prove | string   | 表验证，MD5(开门记录信息表表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "open_time":"2021-05-2118:55:49",
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx"
}
```



## 查询订单信息

功能描述：**系统加载订单信息**。

前端给后端发送wecharid，房间编号，并发送时间戳和身份验证信息。后端通过weicharid和房间编号联合确认前端请求，后端返回订单信息，并返回result和后端获取的时间戳和表验证信息。

API：`/orderinf`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型     | 备注                                  |
| ----------- | ------------ | ------------------------------------- |
| result      | int          | 订单信息是否查询成功                  |
| order_list  | string(json) | 订单信息                              |
| room_id     | int          | 房间编号                              |
| orderid     | int          | 订单编号                              |
| pmoney      | int          | 订单应付金额                          |
| scid        | string       | 预定入住时间                          |
| sgo         | string       | 预计离开时间                          |
| cid         | string       | 实际入住时间                          |
| go          | string       | 结账离开时间                          |
| stamp       | string       | 时间戳                                |
| table_prove | string       | 表验证，MD5(订单信息表表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "order_list":[{
        "id":1,
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },{
        "id":2,
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },{
        "id":3,
        "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
        "room_id":102,
        "pmoney":400,
        "scid":"2020-05-1618:55:49",
        "sgo":"2020-05-2518:55:49",
        "cid":"2020-05-1718:55:49",
        "go":"2020-05-2618:55:49",
    },
    ],
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx"
}
```



## 查询房间信息

功能描述：**系统加载房间信息**。

系统获取所有房间信息，后端通过weicharid和房间编号联合确认前端请求。

API：`/roominf`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型    | 备注                        |
| ----------- | ----------- | --------------------------- |
| result      | int         | 房间信息是否查询成功        |
| room_id     | int         | 房间编号                    |
| rtype       | string      | 房间名                      |
| bedtype     | string      | 房间床型                    |
| maxnum      | int         | 房间居住人数上限            |
| area        | VARCHAR(50) | 房间面积                    |
| rin         | int         | 房间是否有窗                |
| money       | int         | 房间金额/日                 |
| temperature | int         | 房间当前温度                |
| humidity    | int         | 房间当前湿度                |
| stamp       | string      | 时间戳                      |
| table_prove | string      | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "rtype":"温馨大床房"
    "bedtype":"特大床",
    "maxnum":3,
    "area":"30",
    "rin":true,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 查询房间信息（访客）

功能描述：这个接口干啥的我忘了，可以暂时不写。

API：`/roominf_visitor"`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | int      | 房间信息是否查询成功        |
| room_id     | int      | 房间编号                    |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 查询硬件信息

功能描述：**系统加载房间内的硬件信息**。

系统获取所有房间信息，后端通过weicharid和房间编号联合确认前端请求。

获取指定房间内硬件信息，前端提交管理员的wecharid和房间编号，并发送时间戳和身份验证信息。后端通过管理员的weicharid和房间编号联合确认前端请求，并返回result、当前房间空调开关状态、空调当前温度、灯开关状态、灯当前的亮度，和后端获取的时间戳和表验证信息。

API：`/hardwareinf`

请求方法：GET

支持格式：JSON

**请求参数**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数**

| 字段         | 数据类型 | 备注                        |
| ------------ | -------- | --------------------------- |
| result       | int      | 房间信息是否查询成功        |
| air_status   | int      | 空调开关状态                |
| air_tmp      | int      | 空调当前温度                |
| light_status | int      | 灯开关状态                  |
| light_value  | int      | 灯当前的亮度                |
| room_id      | int      | 房间编号                    |
| stamp        | string   | 时间戳                      |
| table_prove  | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "air_status":true,
    "air_tmp":27,
    "light_status":true,
    "light_value":50,
    "room_id":101,
    "stamp":"2020-05-2118:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```
