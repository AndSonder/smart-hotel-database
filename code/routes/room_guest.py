import datetime
import time
import json
from urllib import parse
from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo
from ..models.room_option import RoomOption

room_guest = Blueprint('room_guest', __name__)


@room_guest.route('/room/guest', methods=['GET'])
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    sort = request.args.get("sort")
    bedtype = request.args.get("bedtype")
    if bedtype is not None:
        bedtype = parse.unquote(bedtype)
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")
    try:
        if start_date is not None:
            start_date = str(datetime.datetime.fromtimestamp(int(start_date) / 1000))
        if end_date is not None:
            end_date = str(datetime.datetime.fromtimestamp(int(end_date) / 1000))
    except Exception as e:
        print(e)
        return json.dumps({"code": 20006, "message": "操作失败，发生未知错误"})
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
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    rooms = room_db.search_guest(page, limit, bedtype, start_date, end_date)
    total_num = len(rooms)
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
