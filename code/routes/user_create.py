import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.user_option import UserOption
from ..models.get_info import GetInfo

user_create = Blueprint('user_create', __name__)

from ..utils.utils import catch_except

@user_create.route('/user/create', methods=['POST'])
@catch_except
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        wecharid = data['wecharid']
        name = data['name']
        sex = data['sex']
        id_card = data['id_card']
        phone = data['phone']
        new_level = data['level']
        token = data['token']
    except Exception as e:
        print(e)
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})

    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    if new_level <= level:
        if level != 0:
            return json.dumps({"code": 20006, "message": "权限不足"})
    db = UserOption()
    re = db.add(wecharid, name, sex, id_card, phone, new_level)
    if re:
        message = "用户添加成功"
    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
