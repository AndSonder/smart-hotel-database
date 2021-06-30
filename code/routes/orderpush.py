# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
import json

#https://www.supremeproger.com/orderpush
orderpush = Blueprint('orderpush', __name__)

@orderpush.route('/orderpush', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    if data is None:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:
        datas = {"result": 1,"stamp": data["stamp"], "table_prove": data["prove"]}
        return json.dumps(datas)
