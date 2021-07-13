import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.emergency_option import EmergencyOption
from ..models.get_info import GetInfo

emergency_delete = Blueprint('emergency_delete', __name__)


@emergency_delete.route('/emergency/delete', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        id = data['id']
        token = data['token']
    except Exception as e:
        print(e)
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})

    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level not in [0, 3]:
        return json.dumps({"code": 20006, "message": "权限不足"})
    db = EmergencyOption()
    re = db.delete(id)
    if re:
        message = "意外事件删除成功"
    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
