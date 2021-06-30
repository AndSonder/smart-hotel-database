<<<<<<< HEAD
# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.user_push_info import UserPush
import json

#https://www.supremeproger.com/userpush
userpush = Blueprint('userpush', __name__)

@userpush.route('/userpush', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    db = UserPush
    if data is None:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:

        flag = db.insert(data)
        if flag == 1:
            datas = {"result": 1, "stamp": data["stamp"], "table_prove": data["prove"]}
            return json.dumps(datas)
        else:
            return json.dumps({"result": 0,"message": "数据提交失败！"})
=======
# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.user_push_info import UserPush
import json

#https://www.supremeproger.com/userpush
userpush = Blueprint('userpush', __name__)

@userpush.route('/userpush', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    db = UserPush
    if data is None:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:

        flag = db.insert(data)
        if flag == 1:
            datas = {"result": 1, "stamp": data["stamp"], "table_prove": data["prove"]}
            return json.dumps(datas)
        else:
            return json.dumps({"result": 0,"message": "数据提交失败！"})
>>>>>>> ae1d36bd60697f5aa89d4186f1bd8170cd10dcda
