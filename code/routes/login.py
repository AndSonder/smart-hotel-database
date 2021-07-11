# author:liuyang
# time:2021/7/11
from flask import Blueprint
from flask import request
import requests
from ..models.user_push_info import UserPush
import json

#https://www.supremeproger.com/userpush
userpush = Blueprint('login', __name__)

@userpush.route('/login', methods=['GET'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)
    data  = get_info['openid_code']
    url = 'https://test.com/onLogin'
    data =  {
        'code': get_info['openid_code']
    }
    res = requests.post(url=url,data=data)
    res = res.text
    # res.josn()
    print(res)
    if res:
        return json.dumps({"result": 0,"message": "获取数据失败！"})
    else:
        print(res)
        datas = {"result": 1, "openid": res, "stamp": get_info["stamp"], "table_prove": get_info["prove"]}
        return json.dumps(datas)


