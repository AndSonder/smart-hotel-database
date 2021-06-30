# author:liuyang
# time:2021/6/18
from flask import Blueprint
from flask import request
from ..models.identity_verification import Db_link
import json

#https://www.supremeproger.com/ide_confirm
login = Blueprint('login', __name__)

@login.route('/login', methods=['GET'])
def index():
    data = request.get_data()
    data = json.loads(data)
    checker = Db_link()
    try:
        wecharid= data['wecharid']
    except:
        return json.dumps({"message": "用户名或密码为空"})
    data = checker.search(wecharid)
    identity = data[0]
    table_prove = data[1]



