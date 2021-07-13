import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.order_option import OrderOption
from ..models.get_info import GetInfo

order_update = Blueprint('order_update', __name__)


@order_update.route('/order/update', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    try:
        cid = datetime.datetime.fromtimestamp(data['cid'] / 1000)
        id = data['id']
        id_status = data['id_status']
        pmoney = data['pmoney']
        scid = datetime.datetime.fromtimestamp(data['scid'] / 1000)
        sgo = datetime.datetime.fromtimestamp(data['sgo'] / 1000)
        go = datetime.datetime.fromtimestamp(data['go'] / 1000)
        token = data['token']
    except Exception as e:
        print(e)
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})

    db = GetInfo()
    user_info = db.search(token)
    if user_info is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    level = int(user_info[-1])
    if level > 2:
        return json.dumps({"code": 20006, "message": "权限不足，无法查看"})
    db = OrderOption()
    re = db.update(id, cid, id_status, pmoney, scid, sgo, go)
    if re:
        message = "订单更新成功"
    else:
        message = "操作失败，发生未知错误"
    data = {
        "code": 20000,
        "message": message
    }
    return json.dumps(data)
