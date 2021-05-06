> response里的data里的数据到时会转化成json格式再发送

# 用户权限

## 用户预订

### 用户提交个人信息

<!-- 提交：订单编号、wecharid、性别、联系电话、身份证-->

**request**

url: "https://www.supremeproger.com/user_post",

data: {

​	"user_ord_num": that.data.ord_num,

​    "user_wecharid": that.data.openid,

​	"user_sex": that.data.user_sex，

​	"user_phone": that.data.user_phone,

​	"user_ID_card": that.data.user_ID_card,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

### 用户预订订单信息

<!-- 提交：订单编号、预计入住时间、预计离开时间-->

* 用户的实际入住时间由前台(管理员）决定，所以不在data里传输数据

**request**

url: "https://www.supremeproger.com/order_post",

data: {

​	"user_ord_num": that.data.ord_num,

​    "ord_exp_in": that.data.ord_startTime,

​	"ord_exp_out": that.data.ord_endTime,

 },

header: {

​	 "Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

## 用户退订

###　用户退订订单信息

<!-- 提交：结账离开时间-->

**request**

url: "https://www.supremeproger.com/unsubscribe",

data: {

​	"user_ord_num": that.data.user_ord_num,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

## 用户退房

### 用户退房订单信息

<!-- 提交：结账离开时间-->

**request**

url: "https://www.supremeproger.com/check_out",

data: {

​	"act_out": that.data.act_endTime,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- 获取：应付金额-->

{

​	"ord_money":""

}

# 管理员权限

## 订单

### 管理员添加实际入住时间

<!-- 提交：用户实际入住时间-->

**request**

url: "https://www.supremeproger.com/admin_add_act_in",

data: {

​	"act_in": that.data.act_startTime,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

### 管理员修改实订单应付金额

<!-- 提交：用户实际入住时间-->

**request**

url: "https://www.supremeproger.com/admin_updata_ord_money",

data: {

​	"admin_ord_money": that.data.admin_ord_money,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

## 房间

### 管理员修改房间类型

<!-- 提交：用户实际入住时间-->

**request**

url: "https://www.supremeproger.com/admin_updata_room_type",

data: {

​	"admin_room_type": that.data.admin_room_money,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

### 管理员修改房间价格

<!-- 提交：用户实际入住时间-->

**request**

url: "https://www.supremeproger.com/admin_updata_room_price",

data: {

​	"admin_room_price": that.data.admin_room_price,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

### 管理员修改房间押金

<!-- 提交：用户实际入住时间-->

**request**

url: "https://www.supremeproger.com/admin_updata_room_depce",

data: {

​	"admin_room_dep": that.data.admin_room_dep,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

## 开门

### 查询开门记录

<!-- 提交：房间号-->

**request**

url: "https://www.supremeproger.com/door_inf",

data: {

​	"admin_room_id": that.data.admin_room_id,

 },

header: {

​	"Content-Type": "application/json"

},

method:"GET",

**response**

<!-- 获取：开门时间、身份-->

{

​	"door_openTime":""，

​	"ide":0/1/2,

}

# 系统权限

## 身份确认

<!-- 提交：wecharid-->

**request**

url: "https://www.supremeproger.com/ide_confirm",

data: {

​	"ide_wecharid": that.data.ide_openid,

 },

header: {

​	 "Content-Type": "application/json"

},

method: "GET",

**response**

<!-- 获取：身份-->

{

​	"ide":0/1/2

}

## 记录开门

<!-- 提交：开门时间、wecharid、房间号-->

**request**

url: "https://www.supremeproger.com/door_record",

data: {

​	"door_openTime": that.data.door_openTime,

​	"door_wecharid": that.data.door_openid,

​	"room_id":that.data.door_id,

 },

header: {

​	"Content-Type": "application/x-www-form-urlencoded"

},

method:"POST",

**response**

<!-- {"code": 200} (意为正常返回)-->

## 查询房间信息

<!-- 提交：房间号-->

**request**

url: "https://www.supremeproger.com/room_inf",

data: {

​	"room_id": that.data.room_id,

 },

header: {

​	"Content-Type": "application/json"

},

method:"GET",

**response**

<!-- 获取：房间类型、价格、温度、湿度、押金-->

{

​	"room_type":""，

​	"room_price": ,

​	"room_tem": ,

​	"room_hun": ,

​	"room_dep": 

}

## 查询硬件信息

<!-- 提交：房间号-->

**request**

url: "https://www.supremeproger.com/hardware_inf",

data: {

​	"room_id": that.data.room_id,

 },

header: {

​	"Content-Type": "application/json"

},

method:"GET",

**response**

<!-- 获取：硬件种类、状态、数值-->

{

​	"hardware_type": ，

​	"hardware_status": ,

​	"hardware_value":  

}

