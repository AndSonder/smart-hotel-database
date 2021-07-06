import datetime
import time
import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo

order_list = Blueprint('order_list', __name__)


def string2timestamp(str_value):
    if str_value is None:
        return 0
    str_value = str(str_value)
    d = datetime.datetime.strptime(str_value, "%Y-%m-%d %H:%M:%S")
    t = d.timetuple()
    timeStamp = int(time.mktime(t))
    timeStamp = float(str(timeStamp) + str("%06d" % d.microsecond)) / 1000000
    return int(timeStamp)


@order_list.route('/order/list', methods=['GET'])
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    sort = request.args.get("sort")
    id = request.args.get("id")
    name = request.args.get("name")
    if token is None or page is None or limit is None or sort is None:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    try:
        page = int(page)
        limit = int(limit)
    except:
        return json.dumps({"code": 20004, "message": "参数错误，请检查参数"})
    db = GetInfo()
    user_ingo = db.search(token)
    if user_ingo is None:
        return json.dumps({"code": 20005, "message": "用户不存在"})
    order_list, total_num = db.search_order(page, limit, sort, id, name)
    data = {
        "code": 20000,
        "data": {
            "total": total_num,
            "items": []
        }
    }
    for order in order_list:
        scid = string2timestamp(order[2])
        sgo = string2timestamp(order[3])
        cid = string2timestamp(order[4])
        go = string2timestamp(order[5])
        if cid == 0:
            status = 'draft'
        else:
            status = 'published'
        item = {
            "id": order[0],
            "pmoney": order[1],
            "scid": scid,
            "sgo": sgo,
            "cid": cid,
            "go": go,
            "wecharid": order[-3],
            "room_id": order[-2],
            "status": status,
            "name": order[-1]
        }
        data["data"]["items"].append(item)
    return json.dumps(data)
