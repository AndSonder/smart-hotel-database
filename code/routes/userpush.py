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
    db = UserPush()

    sql = f"INSERT INTO user (wecharid, name, sex, id_card, phone, level) VALUES ({data['wecharid']},'{data['name']}','{data['sex']}',{data['id_card']},{data['phone']},{data['level']})"
    print(sql)
    if data is None:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:
        print(data)
        print(type(data))
        flag = db.insert(data)
        if flag == 1:
            datas = {"result": 1, "stamp": data["name"], "table_prove": data["sex"]}
            return json.dumps(datas)
        else:
            return json.dumps({"result": 0,"message": "数据提交失败！"})


