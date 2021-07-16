import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.order_option import OrderOption
from ..models.get_info import GetInfo
from ..utils.utils import black2none

order_check = Blueprint('order_check', __name__)

from ..utils.utils import catch_except

@order_check.route('/order/check', methods=['GET'])
@catch_except
def index():
    token = request.args.get("token")
    order_id = request.args.get("id")
    status = request.args.get("status")
    order_id, status = black2none(order_id, status)
    if token is None or order_id is None or status is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        order_id = int(order_id)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足，无法查看"})
    db = OrderOption()
    re = db.check(order_id, status)
    if re:
        message = "操作成功"

    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
