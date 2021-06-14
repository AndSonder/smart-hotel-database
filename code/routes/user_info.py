from flask import Blueprint
from flask import request
from ..models.get_info import GetInfo
import json

user_info = Blueprint('user_info', __name__)


@user_info.route('/user/info', methods=['GET'])
def index():
    token = request.args.get("token")
    db = GetInfo()
    print(token)
    # try:
    #     username = data['username']
    #     password = data['password']
    # except:
    #     return json.dumps({"code": 20001})
    # data = checker.search(username)
    # if data is None:
    #     return json.dumps({"code": 20002})
    # t_password = data[0]
    # token = data[1]
    # if t_password == password:
    #     return json.dumps({"code": 20000, "data": {"token": token}})
    # else:
    #     return json.dumps({"code": 20003})
