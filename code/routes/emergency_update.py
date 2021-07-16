import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.emergency_option import EmergencyOption
from ..models.get_info import GetInfo

emergency_update = Blueprint('emergency_update', __name__)

from ..utils.utils import catch_except



@emergency_update.route('/emergency/update', methods=['POST'])
@catch_except
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        id = data['id']
        room_id = data['room_id']
        abnormal_time = datetime.datetime.fromtimestamp(data['abnormal_time'] / 1000)
        accident = data['accident']
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
    re = db.update(id, room_id, abnormal_time, accident)
    if re:
        message = "意外事件更新成功"
    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
