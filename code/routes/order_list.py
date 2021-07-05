import json

from flask import Blueprint
from flask import request

from ..models.get_info import GetInfo

order_list = Blueprint('order_list', __name__)


@order_list.route('/order/list', methods=['GET'])
def index():
    token = request.args.get("token")
    page = request.args.get("page")
    limit = request.args.get("limit")
    sort = request.args.get("sort")
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
    order_list = db.search_order(page, limit, sort)
    print(order_list)
    return "aaa"

