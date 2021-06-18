# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.login_check import LoginCheck
import json

#https://www.supremeproger.com/user_post
userpush = Blueprint('userpush', __name__)

@userpush.route('/userpush', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    if data is None:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:
        datas = {"result": 1,"stamp": data["stamp"], "table_prove": data["prove"]}
        return json.dumps(datas)