# 时间戳用户权限

## 用户预订

### 用户提交个人信息

**request**

 url: https://www.supremeproger.com/user_post

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| name     | VARCHAR  | 酒店住户姓名                      |
| sex      | CHAR     | 酒店住户性别                      |
| id_card  | VARCHAR  | 酒店住户身份证号                  |
| phone    | VARCHAR  | 酒店住户电话号码                  |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

**example**

*request*

{"wecharid":"xxxxxxxxxx","name":"张三","sex":"男","id_card":"230xxxxxxxxxxxxxxx","phone":"181xxxx6924","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 用户预订订单信息

**request**

url: "https://www.supremeproger.com/order_post",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| scid     | DATETIME | 预定入住日期                      |
| sgo      | DATETIME | 预定入住日期                      |
| pmoney   | INT      | 订单应付金额                      |
| room_id  | INT      | 房间号                            |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","scid":"2021/5/20","sgo":"2021/5/20","pmoney":1314,"room_id":101,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 用户上传图片

**request**

url: "https://www.supremeproger.com/img",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| img      | jpg/png  | 图片类型，非json格式              |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| face_id     | VARCHAR  | 人脸算法生成的唯一人脸标志  |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

jpg/png

*response*

{"code":200,"face_id":"xxxxxxxxxx",stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

## 用户退订

###　用户退订订单信息

**request**

url: "https://www.supremeproger.com/unsubscribe"

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| id       | INT      | 订单编号                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","id":20200126,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

## 用户退房

### 用户退房订单信息

**request**

url: "https://www.supremeproger.com/check_out",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| go       | DATETIME | 结账离开日期                      |
| id       | INT      | 订单编号                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","go":"2021/5/20","id":20200126,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

# 管理员权限

## 住户

### 管理员修改住户姓名

**request**

url: "https://www.supremeproger.com/updata_user_name"

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| name     | VARCHAR  | 住户姓名                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","name":"李四","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 管理员修改住户性别

**request**

url: "https://www.supremeproger.com/updata_user_sex"

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| sex      | CHAR     | 住户性别                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","sex":"女","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

###　管理员修改住户身份证号

**request**

url: "https://www.supremeproger.com/updata_user_id_card"

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| id_card  | VARCHAR  | 住身份证号                        |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","id_card":"230xxxxxxxxxxxxxxx","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

###　管理员修改住户电话号码

**request**

url: "https://www.supremeproger.com/updata_user_phone"

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| phone    | VARCHAR  | 电话号码                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","phone":"181xxxx6924","stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

## 订单

### 管理员添加实际入住时间

**request**

url: "https://www.supremeproger.com/admin_add_act_in",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| cid      | DATETIME | 实际入住日期                      |
| id       | INT      | 订单编号                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","cid":"2021/5/20","id":20200126,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 管理员修改订单应付金额

**request**

url: "https://www.supremeproger.com/admin_updata_ord_money",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| pmoney   | INT      | 订单应付金额                      |
| id       | INT      | 订单编号                          |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","pmoney":1314,"id":20200126,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

## 房间

### 管理员修改房间类型

**request**

url: "https://www.supremeproger.com/admin_updata_room_type",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| rtype    | VARCHAR  | 房间类型                          |
| room_id  | INT      | 房间号                            |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","rtype":"双人房","room_id":101,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 管理员修改房间价格

**request**

url: "https://www.supremeproger.com/admin_updata_room_price",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| money    | INT      | 房间金额/日                       |
| room_id  | INT      | 房间号                            |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","money":1314,"room_id":101,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

### 管理员查询房间信息

**request**

url: "https://www.supremeproger.com/admin_room_inf",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id  | INT      | 房间号                            |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| code        | INT      | 返回状态                    |
| room_id     | INT      | 房间号                      |
| rtype       | CHAR     | 房间类型                    |
| money       | INT      | 房间金额/日                 |
| temperature | FLOAT    | 房间当前温度                |
| humidity    | FLOAT    | 房间当前湿度                |
| stamp       | DATETIME | 时间戳                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

*request*

{"wecharid":"xxxxxxxxxx","room_id":101,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200,"room_id":101,"rtype":"单人房","money":1314,"temperature":23.4,"humidity":50,"stamp":"2021/5/21","table_prove":"xxxxxxxxx"}

## 开门

### 查询开门记录

**request**

url: "https://www.supremeproger.com/door_inf",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id  | INT      | 房间号                            |
| stamp    | DATETIME | 时间戳                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型   | 备注                         |
| ----------- | ---------- | ---------------------------- |
| code        | INT        | 返回状态                     |
| wecharid    | INTVARCHAR | 微信id，微信用户的唯一标识； |
| room_id     | INT        | 房间号                       |
| identity    | VARCHAR    | 开门人身份                   |
| stamp       | DATETIME   | 时间戳                       |
| table_prove | VARCHAR    | 表验证，MD5(表名+时间戳+盐)  |

*request*

{"wecharid":"xxxxxxxxxx","room_id":101,"stamp":"2021/5/20","prove":"xxxxxxxxxx"}

*response*

{"code":200","wecharid":"xxxxxxxxxx","room_id":[101,102],"identity": ["客户","管理员"],"stamp":"2021/5/21","table_prove":"xxxxxxxxxx"}

# 系统权限

## 身份确认

**request**

url: "https://www.supremeproger.com/ide_confirm",

| 字段     | 数据类型 | 备注                         |
| -------- | -------- | ---------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识； |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| identity    | VARCHAR  | 用户身份                    |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

## 记录开门

**request**

url: "https://www.supremeproger.com/door_record",

| 字段      | 数据类型 | 备注                              |
| --------- | -------- | --------------------------------- |
| wecharid  | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id   | INT      | 房间号                            |
| open_time | DATETIME | 开门的时间                        |
| prove     | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

## 查询订单信息

**request**

url: "https://www.supremeproger.com/order_inf",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id  | INT      | 房间号                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| room_id     | INT      | 房间号                      |
| id          | INT      | 订单编号                    |
| pmoney      | INT      | 订单应付金额                |
| scid        | DATETIME | 预定入住日期                |
| sgo         | DATETIME | 预计离开日期                |
| cid         | DATETIME | 实际入住日期                |
| go          | DATETIME | 结账离开日期                |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

## 查询房间信息

**request**

url: "https://www.supremeproger.com/room_inf",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id  | INT      | 房间号                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| room_id     | INT      | 房间号                      |
| rtype       | VARCHAR  | 房间类型                    |
| money       | INT      | 房间金额/日                 |
| temperature | FLOAT    | 房间当前温度                |
| humidity    | FLOAT    | 房间当前湿度                |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

## 查询房间信息（访客）

**request**

url: "https://www.supremeproger.com/room_inf_visitor",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识；      |
| room_id  | INT      | 房间号                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段        | 数据类型 | 备注                        |
| ----------- | -------- | --------------------------- |
| room_id     | INT      | 房间号                      |
| table_prove | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

## 查询硬件信息

**request**

url: "https://www.supremeproger.com/hardware_inf",

| 字段     | 数据类型 | 备注                              |
| -------- | -------- | --------------------------------- |
| wecharid | VARCHAR  | 微信id，微信用户的唯一标识        |
| room_id  | INT      | 房间号                            |
| prove    | VARCHAR  | 身份验证，MD5(wecharid+时间戳+盐) |

**response**

| 字段         | 数据类型 | 备注                        |
| ------------ | -------- | --------------------------- |
| air_status   | INT      | 空调开关状态                |
| air_tmp      | FLOAT    | 空调当前温度                |
| light_status | INT      | 灯开关状态                  |
| light_value  | FLOAT    | 灯当前的亮度                |
| room_id      | INT      | 房间号                      |
| table_prove  | VARCHAR  | 表验证，MD5(表名+时间戳+盐) |

