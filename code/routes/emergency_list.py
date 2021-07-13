import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo
from ..models.emergency_option import EmergencyOption
from ..utils.parser import string2timestamp

emergency_list = Blueprint('emergency_list', __name__)


@emergency_list.route('/emergency/list', methods=['GET'])
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    room_id = request.args.get("room_id")
    if token is None or page is None or limit is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        page = int(page)
        limit = int(limit)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    emergency_db = EmergencyOption()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level not in [0, 3]:
        return json.dumps({"code": 20006, "message": "权限不足"})
    emergencies, total_num = emergency_db.search_emergency(page, limit, room_id)
    data = {
        "code": 20000,
        "data": {
            "total": total_num,
            "items": []
        }
    }
    for emergency in emergencies:
        item = {
            "id": emergency[0],
            "room_id": emergency[1],
            "abnormal_time": string2timestamp(emergency[2]),
            "accident": emergency[3],
        }
        data["data"]["items"].append(item)
    return json.dumps(data)
