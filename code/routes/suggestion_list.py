import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo
from ..models.suggestion_option import SuggestionOption
from ..utils.parser import string2timestamp
from urllib import parse

suggestion_list = Blueprint('suggestion_list', __name__)


@suggestion_list.route('/suggestion/list', methods=['GET'])
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    sort = request.args.get("sort")
    message = request.args.get("message")
    if message is not None:
        message = parse.unquote(message)
    start_date = request.args.get("start_date")
    if start_date is not None:
        start_date = datetime.datetime.fromtimestamp(int(start_date) / 1000)
    end_date = request.args.get("end_date")
    if end_date is not None:
        end_date = datetime.datetime.fromtimestamp(int(end_date) / 1000)
    if token is None or page is None or limit is None or sort is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        page = int(page)
        limit = int(limit)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    su_db = SuggestionOption()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    rooms, total_num = su_db.search_suggestion(page, limit, message, start_date, end_date)
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
            "name": room[1],
            "wecharid": room[2],
            "phone": room[3],
            "message": room[4],
            "message_time": string2timestamp(room[5]),
        }
        data["data"]["items"].append(item)
    return json.dumps(data)
