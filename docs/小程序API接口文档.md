# 用户权限

## 用户预订

### 用户提交个人信息

**request**

 url: https://www.supremeproger.com/user_post

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| name     | VARCHAR  | 酒店住户姓名                   |
| sex      | CHAR     | 酒店住户性别                   |
| id_card  | VARCHAR  | 酒店住户身份证号               |
| phone    | VARCHAR  | 酒店住户电话号码               |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 用户预订订单信息

**request**

url: "https://www.supremeproger.com/order_post",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| scid     | DATETIME | 预定入住日期                   |
| sgo      | DATETIME | 预定入住日期                   |
| pmoney   | INT      | 订单应付金额                   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 用户上传图片

**request**

url: "https://www.supremeproger.com/img",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| img      | jpg/png  | 图片类型，非json格式           |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                       |
| ----------- | -------- | -------------------------- |
| face_id     | VARCHAR  | 人脸算法生成的唯一人脸标志 |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳)   |

## 用户退订

###　用户退订订单信息

**request**

url: "https://www.supremeproger.com/unsubscribe"

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| id       | INT      | 订单编号                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 用户退房

### 用户退房订单信息

**request**

url: "https://www.supremeproger.com/check_out",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| go       | DATETIME | 结账离开日期                   |
| id       | INT      | 订单编号                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

# 管理员权限

## 住户

### 管理员修改住户姓名

**request**

url: "https://www.supremeproger.com/updata_user_name"

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| name     | VARCHAR  | 住户姓名                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 管理员修改住户性别

**request**

url: "https://www.supremeproger.com/updata_user_sex"

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| sex      | CHAR     | 住户性别                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

###　管理员修改住户身份证号

**request**

url: "https://www.supremeproger.com/updata_user_id_card"

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| id_card  | INT      | 住身份证号                     |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

###　管理员修改住户电话号码

**request**

url: "https://www.supremeproger.com/updata_user_phone"

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| phone    | VARCHAR  | 电话号码                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 订单

### 管理员添加实际入住时间

**request**

url: "https://www.supremeproger.com/admin_add_act_in",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| cid      | DATETIME | 实际入住日期                   |
| id       | INT      | 订单编号                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 管理员修改订单应付金额

**request**

url: "https://www.supremeproger.com/admin_updata_ord_money",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| pmoney   | INT      | 订单应付金额                   |
| id       | INT      | 订单编号                       |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 房间

### 管理员修改房间类型

**request**

url: "https://www.supremeproger.com/admin_updata_room_type",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| rtype    | VARCHAR  | 房间类型                       |
| id       | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 管理员修改房间价格

**request**

url: "https://www.supremeproger.com/admin_updata_room_price",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| money    | INT      | 房间金额/日                    |
| id       | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

### 管理员查询房间信息

**request**

url: "https://www.supremeproger.com/admin_room_inf",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| room_id     | INT      | 房间号                   |
| rtype       | CHAR     | 房间类型                 |
| money       | INT      | 房间金额/日              |
| temperatur  | FLOAT    | 房间当前温度             |
| humidity    | FLOAT    | 房间当前湿度             |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 开门

### 查询开门记录

**request**

url: "https://www.supremeproger.com/door_inf",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                         |
| ----------- | -------- | ---------------------------- |
| wecharid    | VARCHAR  | 微信id，微信用户的唯一标识； |
| room_id     | INT      | 房间号                       |
| identity    | VARCHAR  | 开门人身份                   |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳)     |

# 系统权限

## 身份确认

**request**

url: "https://www.supremeproger.com/ide_confirm",

| 字段     | 数据类型 | 备注                         |
| -------- | -------- | ---------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识； |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| identity    | VARCHAR  | 用户身份                 |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 记录开门

**request**

url: "https://www.supremeproger.com/door_record",

| 字段      | 数据类型 | 备注                           |
| --------- | -------- | ------------------------------ |
| wecharid  | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id   | INT      | 房间号                         |
| open_time | DATETIME | 开门的时间                     |
| prove     | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 查询订单信息

**request**

url: "https://www.supremeproger.com/order_inf",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| room_id     | INT      | 房间号                   |
| id          | INT      | 订单编号                 |
| pmoney      | INT      | 订单应付金额             |
| scid        | DATETIME | 预定入住日期             |
| sgo         | DATETIME | 预计离开日期             |
| cid         | DATETIME | 实际入住日期             |
| go          | DATETIME | 结账离开日期             |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 查询房间信息

**request**

url: "https://www.supremeproger.com/room_inf",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| room_id     | VARCHAR  | 房间号                   |
| rtype       | VARCHAR  | 房间类型                 |
| money       | INT      | 房间金额/日              |
| temperatur  | FLOAT    | 房间当前温度             |
| humidity    | FLOAT    | 房间当前湿度             |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 查询房间信息（访客）

**request**

url: "https://www.supremeproger.com/room_inf_visitor",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；   |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段        | 数据类型 | 备注                     |
| ----------- | -------- | ------------------------ |
| room_id     | INT      | 房间号                   |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳) |

## 查询硬件信息

**request**

url: "https://www.supremeproger.com/hardware_inf",

| 字段     | 数据类型 | 备注                           |
| -------- | -------- | ------------------------------ |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识     |
| room_id  | INT      | 房间号                         |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳) |

**response**

| 字段         | 数据类型 | 备注                     |
| ------------ | -------- | ------------------------ |
| air_status   | INT      | 空调开关状态             |
| air_tmp      | FLOAT    | 空调当前温度             |
| light_status | INT      | 灯开关状态               |
| light_value  | FLOAT    | 灯当前的亮度             |
| room_id      | INT      | 房间号                   |
| table_prove  | VARCHAR  | 表验证，MD5(表名+时间戳) |

