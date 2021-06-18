from flask import Blueprint
from flask import request
from ..models.login_check import LoginCheck
import json

admin_login = Blueprint('admin_login', __name__)

@admin_login.route('/user/login', methods=['POST'])
def index():
    data = request.get_data()
    data = json.loads(data)
    checker = LoginCheck()
    try:
        username = data['username']
        password = data['password']
    except:
        return json.dumps({"code": 20001, "message": "用户名或密码为空"})
    data = checker.search(username)
    if data is None:
        return json.dumps({"code": 20002, "message": "用户名或密码错误"})
    t_password = data[0]
    token = data[1]
    if t_password == password:
        return json.dumps({"code": 20000, "data": {"token": token}})
    else:
        return json.dumps({"code": 20002, "message": "用户名或密码错误"})

