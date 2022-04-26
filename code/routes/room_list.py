import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo
from ..models.room_option import RoomOption
from ..utils.utils import black2none

room_list = Blueprint('room_list', __name__)

from ..utils.utils import catch_except


@room_list.route('/room/list', methods=['GET'])
@catch_except
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    sort = request.args.get("sort")
    id = request.args.get("id")
    rtype = request.args.get("rtype")
    id, rtype = black2none(id, rtype)
    if token is None or page is None or limit is None or sort is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        page = int(page)
        limit = int(limit)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    room_db = RoomOption()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    # 身份等级验证
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    rooms, total_num = room_db.search_room(page, limit, sort, id, rtype)
    data = {
        "code": 20000,
        "data": {
            "total": total_num,
            "items": []
        }
    }
    for room in rooms:
        item = {
            "id": room[0],
            "rtype": room[1],
            "bedtype": room[2],
            "maxnum": room[3],
            "area": room[4],
            "rwin": room[5],
            "money": room[6],
            "temperature": room[7],
            "humidity": room[8],
            "rlock": room[9],
        }
        data["data"]["items"].append(item)
    return json.dumps(data)
