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
| name     | string   | 酒店用户姓名                      |
| sex      | string   | 酒店用户性别                      |
| id_card  | string   | 酒店用户身份证号                  |
| phone    | string   | 酒店用户电话号码                  |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 提交个人信息是否成功        |
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
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
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
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 提交订单是否成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "scid":"2020-05-21 19:00:00",
    "sgo":"2020-05-22 15:00:00",
    "pmoney":300,
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
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
| result      | bool     | 退单是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":000000123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
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
| result      | bool     | 退房是否成功                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id":000000123,
    "go":"2020-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

# 管理员权限

## 用户

### 管理员查询所有用户

（待确认）

### 管理员查询指定用户信息

功能描述：**管理员修用户预定时的个人信息**。

管理员查询指定用户的所有登记信息，后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/userinf_admin`

请求方法：GET

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 用户信息是否修改成功        |
| name        | string   | 酒店用户姓名                |
| sex         | int      | 酒店用户性别                |
| id_card     | string   | 酒店用户身份证号            |
| phone       | string   | 酒店用户电话号码            |
| img         | jpg/png  | 用户的人脸图像              |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "name":"张三",
    "sex":1,
    "id_card":"230xxxxxxxxxxxxxxx",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
xxxx.jpg/xxxx.png
```

### 管理员修改用户姓名

功能描述：**管理员修改用户预定时的个人信息时的姓名**。

管理员修改指定用户的登记信息中的姓名，这是考虑到用户后知后觉自己的姓名信息填写错误。后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/username_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| name           | string   | 用户姓名                          |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 姓名是否修改成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "name":"龙傲天",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员修改用户性别

功能描述：**管理员修改用户预定时的个人信息时的性别**。

管理员修改指定用户的登记信息中的性别，这是考虑到用户后知后觉自己的性别信息填写错误。后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/usersex_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| sex            | string   | 用户性别                          |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 性别是否修改成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "sex":"女",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

###　管理员修改用户身份证号码

功能描述：**管理员修改用户预定时的个人信息时的身份证号码**。

管理员修改指定用户的登记信息中的身份证号码，这是考虑到用户后知后觉自己的身份证信息填写错误（数字错误或是他人身份证号码），因为此应用无法和公安局对接信息查询，所以无法直接验证本人真实身份。后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/userid_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| id_card        | string   | 住身份证号                        |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 身份证号码是否修改成功      |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "id_card":"230xxxxxxxxxxxxxxx",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

###　管理员修改用户电话号码

功能描述：**管理员修改用户预定时的个人信息时的电话号码**。

管理员修改指定用户的登记信息中的电话号码，这是考虑到用户想要更换联系手机号。后端通过管理员的weicharid和用户的weicharid联合确认前端请求。

API：`/userphone_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段           | 数据类型 | 备注                              |
| -------------- | -------- | --------------------------------- |
| wecharid_admin | string   | 用户（管理员）的身份标识          |
| wecharid_user  | string   | 用户的身份标识                    |
| phone          | string   | 电话号码                          |
| stamp          | string   | 时间戳                            |
| prove          | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 电话号码是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid_admin":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "wecharid_user":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "phone":"181xxxx6924",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 订单

### 管理员修改实际入住时间

功能描述：**管理员修改用户订单的实际入住时间**。

管理员修改指定订单的的实际入住时间，用户只提交过预计入住时间，然而实际入住时间是不定的，是变化的。后端通过weicharid和id联合确认前端请求。

API：`/ordercid_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| cid      | string   | 实际入住时间                      |
| id       | int      | 订单编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 入住时间是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "cid":"2020-05-21 18:55:49",
    "id":000000123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员修改订单应付金额

功能描述：**管理员修改用户订单的应付金额**。

管理员修改指定订单的的应付金额，就是结账时的金额。后端通过weicharid和id联合确认前端请求。

API：`/ordermoney_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| pmoney   | int      | 订单应付金额                      |
| id       | int      | 订单编号                          |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 订单价格是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "pmoney":1000,
    "id":000000123,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 房间

### 管理员修改房间类型

功能描述：**管理员修改房间的类型**。

管理员修改指定房间的具体居住类型，比如把双人房修复为单人房，把大床饭修改为情侣套房。后端通过weicharid和room_id联合确认前端请求。

API：`/roomptype_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| rtype    | int      | 房间类型                          |
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 房间类型是否修改成功        |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "rtype":1,
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员修改房间价格

功能描述：**管理员修改房间的每日单价**。

管理员修改指定房间的每日单价，后端通过weicharid和room_id联合确认前端请求。

API：`/roomprice_admin`

请求方法：POST

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| money    | int      | 房间金额/日                       |
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 价格是否修改成功            |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "money":200,
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

### 管理员查询房间信息

功能描述：**管理员查询房间信息**。

管理员获取所有房间信息，后端通过weicharid和room_id联合确认前端请求。房间类型返回数字标识即可。

API：`/roominf_admin`

请求方法：GET

支持格式：JSON

**request**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 查询此房间信息是否成功      |
| room_id     | int      | 房间号                      |
| rtype       | int      | 房间类型                    |
| money       | int      | 房间金额/日                 |
| temperature | int      | 房间当前温度                |
| humidity    | int      | 房间当前湿度                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "room_id":101,
    "rtype":1,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 开门

### 查询开门记录

功能描述：**管理员查询房间的开门信息**。

管理员指定查询某个房间的开门信息，前端会给后端查询范围，如果所给的范围的起始时间和结束时间超过数据表内所记录范围，以数据表的时间极值为准。后端会返回查询时间范围内的所有人的身份和开门时间，两个数组顺序一一对应。后端通过weicharid和room_id联合确认前端请求。身份类型返回数字标识即可。

API：`/doorinf`

请求方法：GET

支持格式：JSON

**request**

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | string   | 用户的身份标识                    |
| room_id   | int      | 房间号                            |
| starttime | string   | 查询时间范围的起始时间            |
| endtime   | string   | 查询时间范围的结束时间            |
| stamp     | string   | 时间戳                            |
| prove     | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                         |
| ----------- | -------- | ---------------------------- |
| result      | bool     | 查询此房间的开门信息是否成功 |
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
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
    
}
```

**response**

```json
{
    "result":true,
    "wecharid":"1c054ecb0e947af1661e9f4ae63053c6",
    "identity":[1,0.1,0],
    "opentime":["2020-05-21 18:55:29","2020-05-11 18:55:29","2020-05-31 18:55:29","2020-05-01 18:55:29"],
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

# 系统权限

## 登录（获取openid）

功能描述：**确认用户微信身份**。

前端给后端发送openid_code，后端拿这个code和微信服务器请求获取wecharid（其实就是openid），再返回给前端。

API：`/login`

请求方法：GET

支持格式：JSON

**请求参数：**

| 参数名称    | 类型   | 必填 | 说明           |
| ----------- | ------ | ---- | -------------- |
| openid_code | string | 是   | 获取openid必备 |

**返回参数：**

| 参数名称 | 类型   | 说明               |
| -------- | ------ | ------------------ |
| result   | bool   | openid是否获取成功 |
| wecharid | string | 用户的身份标识     |

请求示例：

**request**

```json
{
    "openid_code":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49"
    "openid":"1c054ecb0e947af1661e9f4ae63053c5",
}
```

## 身份确认

功能描述：**查询用户身份**。

系统要确认当前使用者的具体身份是用户还是管理员等身份。身份类型返回数字标识即可。

API：`/userconf`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注           |
| -------- | -------- | -------------- |
| wecharid | string   | 用户的身份标识 |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 身份是否确认成功            |
| identity    | int      | 用户身份                    |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls"
}
```

**response**

```json
{
    "result":true,
    "identity":1,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```

## 记录开门

功能描述：**记录开门信息**。

用来记录开门的信息，后端要记录开门者的身份、房间号和开门时间。

API：`/recdoor`

请求方法：POST

支持格式：JSON

**请求参数：**

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | string   | 用户的身份标识                    |
| room_id   | int      | 房间号                            |
| open_time | string   | 开门的时间                        |
| stamp     | string   | 时间戳                            |
| prove     | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 开门信息是否被记录          |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "open_time":"2021-05-21 18:55:49",
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "stamp":"2020-05-21 18:55:49",
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
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 订单信息是否查询成功        |
| room_id     | int      | 房间号                      |
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
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "room_id":101,
    "orderid":1,
    "pmoney":300,
    "scid":"2020-05-21 18:00:00",
    "sgo":"2020-05-22 19:00:00",
    "cid":"2020-05-21 19:00:00",
    "go":"2020-05-22 15:00:00",
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx"
}
```



## 查询房间信息

功能描述：**系统加载房间信息**。

系统获取所有房间信息，后端通过weicharid和room_id联合确认前端请求。房间类型返回数字标识即可。

API：`/roominf`

请求方法：GET

支持格式：JSON

**请求参数：**

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | string   | 用户的身份标识                    |
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**返回参数：**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 房间信息是否查询成功        |
| room_id     | int      | 房间号                      |
| rtype       | int      | 房间类型                    |
| money       | int      | 房间金额/日                 |
| temperature | int      | 房间当前温度                |
| humidity    | int      | 房间当前湿度                |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "room_id":101,
    "rtype":1,
    "money":300,
    "temperature":27,
    "humidity":38,
    "stamp":"2020-05-21 18:55:49",
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
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| result      | bool     | 房间信息是否查询成功        |
| room_id     | int      | 房间号                      |
| stamp       | string   | 时间戳                      |
| table_prove | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
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
| room_id  | int      | 房间号                            |
| stamp    | string   | 时间戳                            |
| prove    | string   | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段         | 数据类型 | 备注                        |
| ------------ | -------- | --------------------------- |
| result       | bool     | 房间信息是否查询成功        |
| air_status   | bool     | 空调开关状态                |
| air_tmp      | int      | 空调当前温度                |
| light_status | int      | 灯开关状态                  |
| light_value  | bool     | 灯当前的亮度                |
| room_id      | int      | 房间号                      |
| stamp        | string   | 时间戳                      |
| table_prove  | string   | 表验证，MD5(表名+时间戳+盐) |

请求示例：

**request**

```json
{
    "wecharid":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "prove":"xxxxxxxxxx",
}
```

**response**

```json
{
    "result":true,
    "air_status":true,
    "air_tmp":27,
    "light_status":true,
    "light_value":50,
    "room_id":101,
    "stamp":"2020-05-21 18:55:49",
    "table_prove":"xxxxxxxxxxx",
}
```
