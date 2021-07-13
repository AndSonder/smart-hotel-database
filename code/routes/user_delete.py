import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.room_option import RoomOption
from ..models.get_info import GetInfo

user_delete = Blueprint('user_delete', __name__)


@user_delete.route('/user/delete', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        id = data['wecharid']
        token = data['token']
    except Exception as e:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})

    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    db = RoomOption()
    re = db.delete(id)
    if re:
        message = "用户信息删除成功"
    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
