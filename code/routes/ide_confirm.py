# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.login_check import LoginCheck
import json

#https://www.supremeproger.com/ide_confirm
ide_confirm = Blueprint('ide_confirm', __name__)

@ide_confirm.route('/ide_confirm', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    checker = LoginCheck()
    try:
        wecharid= data['wecharid']
    except:
        return json.dumps({"message": "用户名或密码为空"})
    data = checker.search(wecharid)
    identity = data[0]
    table_prove = data[1]



