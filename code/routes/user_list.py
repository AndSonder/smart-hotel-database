import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo
from ..models.user_option import UserOption
from ..utils.utils import black2none

user_list = Blueprint('user_list', __name__)

from ..utils.utils import catch_except

@user_list.route('/user/list', methods=['GET'])
@catch_except
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    search_level = request.args.get("level")
    phone = request.args.get("phone")
    name = request.args.get("name")
    search_level, phone, name = black2none(search_level, phone, name)
    if token is None or page is None or limit is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        page = int(page)
        limit = int(limit)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    user_db = UserOption()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    users, total_num = user_db.search_user(page, limit, level, name, phone, search_level)
    data = {
        "code": 20000,
        "data": {
            "total": total_num,
            "items": []
        }
    }
    for index, user in enumerate(users):
        item = {
            "id": index + 1,
            "wecharid": user[0],
            "name": user[1],
            "sex": user[2],
            "id_card": user[3],
            "phone": user[4],
            "level": user[5]
        }
        data["data"]["items"].append(item)
    return json.dumps(data)
