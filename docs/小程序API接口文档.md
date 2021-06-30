# 用户权限

## 用户预订

### 用户提交个人信息

功能描述：**用户预定时提交个人信息**。

用户在入住前进行预定时提交个人信息。

API：`/userpush`

请求方法：POST

支持格式：JSON

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| name     | string   | 用户姓名                          |
| sex      | string   | 用户性别                          |
| id_card  | string   | 用户身份证号                      |
| phone    | string   | 用户电话号码                      |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 提交个人信息是否成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**example**

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 用户提交订单信息

功能描述：**用户提交预订订单信息**。

用户在入住前进行预定。

API：`/orderpush`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| scid     | string   | 预定入住日期                      |
| sgo      | string   | 预定入住日期                      |
| pmoney   | int      | 订单应付金额                      |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 提交订单是否成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "scid":"2020-05-21/19:00:00",
    "sgo":"2020-05-22/15:00:00",
    "pmoney":300,
    "room_id":101,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 用户退订

###　用户退订订单信息

功能描述：**用户取消预订的房间**。

用户在入住前取消订单，后端通过用户的weicharid和id联合确认前端请求。

API：`/chargeback_user`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| id       | int      | 订单编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 退单是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":000000123,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 用户退房

### 用户退房订单信息

功能描述：**用户结账离开**。

用户通过提交结账时间结账离开，后端通过用户的weicharid和id联合确认前端请求。

API：`/checkout_user`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| id       | int      | 订单编号                          |
| go       | string   | 结账离开时间                      |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 退房是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":000000123,
    "go":"2020-05-21/18:55:49",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

# 管理员权限

## 用户

### 管理员查询所有用户信息（小程序版）

功能描述：**管理员查询所有用户预定时的个人简略信息**。

管理员查询所有用户的简略信息，用户的wecharid、姓名、图片即可。

API：`/userinf_admin`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                       |
| ----------- | -------- | -------------------------- |
| result      | tinyint  | 所有用户信息是否查询成功   |
| name        | string   | 用户姓名                   |
| img         | jpg/png  | 用户的人脸图像             |
| stamp       | string   | 时间戳                     |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐 |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "name":"张三",
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
xxxx.jpg/xxxx.png
```



### 管理员查询指定用户信息

功能描述：**管理员查询指定用户预定时的个人信息**。

管理员查询指定用户的所有登记信息，后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/markuserinf_admin`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 用户信息是否查询成功        |
| name        | string   | 用户姓名                    |
| sex         | int      | 用户性别                    |
| id_card     | string   | 用户身份证号                |
| phone       | string   | 用户电话号码                |
| img         | jpg/png  | 用户的人脸图像              |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21/18:55:49",
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
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
xxxx.jpg/xxxx.png
```

### 管理员修改指定用户信息

功能描述：**管理员修改用户预定时个人信息中的姓名、性别、身份证号、电话号、图片**。

管理员修改指定用户的登记信息中具体信息，这是考虑到用户后知后觉自己的姓名等信息填写错误。后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/markuserinfmod_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| name           | string   | 用户姓名                          |
| sex            | int      | 用户性别                          |
| id_card        | string   | 用户身份证号                      |
| phone          | string   | 用户电话号码                      |
| img            | jpg/png  | 用户的人脸图像                    |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 用户信息是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"龙傲天",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 订单

### 管理员查询订单信息

功能描述：**管理员查询用户订单的具体信息**。

管理员获取所有房间信息。后端通过weicharid和id联合确认前端请求。

API：`/orderinf_admin`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| pmoney   | int      | 订单应付金额                      |
| id       | int      | 订单编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 订单价格是否修改成功        |
| pmoney      | int      | 订单应付金额                |
| scid        | string   | 预定入住日期                |
| sgo         | string   | 预计离开日期                |
| cid         | string   | 实际入住时间                |
| go          | string   | 结账离开日期                |
| room_id     | int      | 房间编号                    |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "pmoney":1000,
    "id":000000123,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "pmoney":400,
    "scid":"2020-05-16/18:55:49",
    "sgo":"2020-05-25/18:55:49",
    "cid":"2020-05-17/18:55:49",
    "go":"2020-05-26/18:55:49",
    "room_id":102,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```



### 管理员修改订单信息

功能描述：**管理员修改用户订单的应付金额、预定入住日期、预计离开日期、实际入住时间、结账离开日期、房间编号**。

管理员修改指定订单的的具体信息，订单中可变属性不少。比如用户想换房间预订又不想再填写订单，就需要管理员去修改，用户的实际入住时间和预计离开时间是有差异的，可能会涉及人工修改。但是订单的wecharid属性是不变的，要想改变wecharid属性就要重新预订。前端每次向后端发送完全匹配order数据表的属性及其值，相当于每次都是覆盖一遍数据表的某一行。后端通过weicharid和id联合确认前端请求。

API：`/orderinfmod_admin`

请求方法：POST

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| id       | int      | 订单编号                          |
| pmoney   | int      | 订单应付金额                      |
| scid     | string   | 预定入住日期                      |
| sgo      | string   | 预计离开日期                      |
| cid      | string   | 实际入住时间                      |
| go       | string   | 结账离开日期                      |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 入住时间是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":000000123,
    "pmoney":400,
    "scid":"2020-05-16 18:55:49",
    "sgo":"2020-05-25 18:55:49",
    "cid":"2020-05-17 18:55:49",
    "go":"2020-05-26 18:55:49",
    "room_id":102,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 房间

### 管理员查询房间信息

功能描述：**管理员查询房间信息**。

管理员获取所有房间信息，后端通过weicharid和room_id联合确认前端请求。

API：`/roominf_admin`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型    | 备注                        |
| ----------- | ----------- | --------------------------- |
| result      | tinyint     | 查询此房间信息是否成功      |
| room_id     | int         | 房间编号                    |
| rname       | string      | 房间名                      |
| rtype       | string      | 房间类型                    |
| maxnum      | int         | 房间居住人数上限            |
| area        | VARCHAR(50) | 房间面积                    |
| rin         | tinyint     | 房间是否有窗                |
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
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "rname":"温馨大床房"
    "rtype":"特大床",
    "maxnum":3,
    "area":"25-30",
    "rin":1,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员修改房间信息

功能描述：**管理员修改房间的名称、类型、居住人数上限、面积、窗户有无、价格、温度和湿度**。

管理员修改指定房间的具体信息，比如修改房间名称，把“温馨大床房”修改为“情侣套房”；比如修改房间类型，把“特大床”修改为“单人床”。前端每次向后端发送完全匹配room数据表的属性及其值，相当于每次都是覆盖一遍数据表的某一行。

后端通过weicharid和room_id联合确认前端请求。

API：`/roominfmod_admin`

请求方法：POST

支持格式：JSON

**请求参数：**

| 字段        | 数据类型    | 备注                              |
| ----------- | ----------- | --------------------------------- |
| wecharid    | string      | 用户的身份标识                    |
| room_id     | int         | 房间编号                          |
| rname       | string      | 房间名                            |
| rtype       | string      | 房间类型                          |
| maxnum      | int         | 房间居住人数上限                  |
| area        | VARCHAR(50) | 房间面积                          |
| rin         | tinyint     | 房间是否有窗                      |
| money       | int         | 房间金额/日                       |
| temperature | int         | 房间当前温度                      |
| humidity    | int         | 房间当前湿度                      |
| stamp       | string      | 时间戳                            |
| prove       | string      | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 房间信息是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "rname":"温馨大床房"
    "rtype":"特大床",
    "maxnum":3,
    "area":"30",
    "rin":true,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 开门

### 查询开门记录

功能描述：**管理员查询房间的开门信息**。

管理员指定查询某个房间的开门信息，前端会给后端查询范围，如果所给的范围的起始时间和结束时间超过数据表内所记录范围，以数据表的时间极值为准。后端会返回查询时间范围内的所有人的身份和开门时间，两个数组顺序一一对应。后端通过weicharid和room_id联合确认前端请求。身份类型返回数字标识即可。

API：`/doorinf_admin`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | string   | 用户的身份标识                    |
| room_id   | int      | 房间编号                          |
| starttime | string   | 查询时间范围的起始时间            |
| endtime   | string   | 查询时间范围的结束时间            |
| stamp     | string   | 时间戳                            |
| prove     | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                         |
| ----------- | -------- | ---------------------------- |
| result      | tinyint  | 查询此房间的开门信息是否成功 |
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
    "starttime":"2020-05-19 18:55:49",
    "endtime":"2020-05-19 20:55:49"
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
    
}
```

**response**

```json
{
    "result":1,
    "wecharid":"1c054ecb0e947af1661e9f4ae63053c6",
    "identity":[1,0.1,0],
    "opentime":["2020-05-21 18:55:29","2020-05-11 18:55:29","2020-05-31 18:55:29","2020-05-01 18:55:29"],
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

# 系统权限

## 登录（获取openid）

功能描述：**确认用户微信身份**。

前端给后端发送openid_code，后端拿这个code和微信服务器请求获取wecharid（其实就是openid），再返回给前端。

API：`/login`

请求方法：GET

支持格式：STRING

**请求参数：**

| 参数名称    | 类型   | 说明                              |
| ----------- | ------ | --------------------------------- |
| openid_code | string | 获取openid必备                    |
| stamp       | string | 时间戳                            |
| prove       | string | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 参数名称    | 类型    | 说明                        |
| ----------- | ------- | --------------------------- |
| result      | tinyint | openid是否获取成功          |
| wecharid    | string  | 用户的身份标识              |
| stamp       | string  | 时间戳                      |
| table_prove | string  | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "openid_code":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "openid":"1c054ecb0e947af1661e9f4ae63053c5",
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 身份确认

功能描述：**查询用户身份**。

系统要确认当前使用者的具体身份是用户还是管理员等身份。身份类型返回数字标识即可。

API：`/userconf`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 身份是否确认成功            |
| identity    | int      | 用户身份                    |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "identity":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 记录开门

功能描述：**记录开门信息**。

用来记录开门的信息，后端要记录开门者的身份、房间编号和开门时间。

API：`/recdoor`

请求方法：POST

支持格式：JSON

**请求参数：**

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | string   | 用户的身份标识                    |
| room_id   | int      | 房间编号                          |
| open_time | string   | 开门的时间                        |
| stamp     | string   | 时间戳                            |
| prove     | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 开门信息是否被记录          |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "open_time":"2021-05-21/18:55:49",
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx"
}
```



## 查询订单信息

功能描述：**系统加载订单信息**。

系统获取用户的订单信息，后端通过wecharid和room_id联合确认前端请求。

API：`/orderinf`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 订单信息是否查询成功        |
| room_id     | int      | 房间编号                    |
| orderid     | int      | 订单编号                    |
| pmoney      | int      | 订单应付金额                |
| scid        | string   | 预定入住时间                |
| sgo         | string   | 预计离开时间                |
| cid         | string   | 实际入住时间                |
| go          | string   | 结账离开时间                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "orderid":1,
    "pmoney":300,
    "scid":"2020-05-21/18:00:00",
    "sgo":"2020-05-22/19:00:00",
    "cid":"2020-05-21/19:00:00",
    "go":"2020-05-22/15:00:00",
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx"
}
```



## 查询房间信息

功能描述：**系统加载房间信息**。

系统获取所有房间信息，后端通过weicharid和room_id联合确认前端请求。

API：`/roominf`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型    | 备注                        |
| ----------- | ----------- | --------------------------- |
| result      | tinyint     | 房间信息是否查询成功        |
| room_id     | int         | 房间编号                    |
| rname       | string      | 房间名                      |
| rtype       | string      | 房间类型                    |
| maxnum      | int         | 房间居住人数上限            |
| area        | VARCHAR(50) | 房间面积                    |
| rin         | tinyint     | 房间是否有窗                |
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
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "rname":"温馨大床房"
    "rtype":"特大床",
    "maxnum":3,
    "area":"30",
    "rin":true,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 查询房间信息（访客）

功能描述：这个接口干啥的我忘了，可以暂时不写。

API：`/roominf_visitor"`

请求方法：GET

支持格式：JSON

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | tinyint  | 房间信息是否查询成功        |
| room_id     | int      | 房间编号                    |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21/18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":1,
    "room_id":101,
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 查询硬件信息

功能描述：**系统加载房间内的硬件信息**。

系统获取所有房间信息，后端通过weicharid和room_id联合确认前端请求。

API：`/hardwareinf`

请求方法：GET

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段         | 数据类型 | 备注                        |
| ------------ | -------- | --------------------------- |
| result       | tinyint  | 房间信息是否查询成功        |
| air_status   | tinyint  | 空调开关状态                |
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
    "stamp":"2020-05-21/18:55:49",
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
    "stamp":"2020-05-21/18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```
