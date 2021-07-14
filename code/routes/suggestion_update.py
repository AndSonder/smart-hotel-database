import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.suggestion_option import SuggestionOption
from ..models.get_info import GetInfo
from urllib import parse

suggestion_update = Blueprint('suggestion_update', __name__)


@suggestion_update.route('/suggestion/update', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        id = data['id']
        message = data['message']
        token = data['token']
    except Exception as e:
        print(e)
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    if message is not None:
        message = parse.unquote(message)

    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足"})
    db = SuggestionOption()
    try:
        re = db.update(id, message)
    except:
        return json.dumps({"code": 20007, "message": "非法操作"})
    if re:
        message = "用户建议更新成功"
    else:
        message = "非法操作"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
