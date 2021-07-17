# author:liuyang
# time:2021/7/11
from flask import Blueprint
from flask import request
import requests
import json
from ..models.user_check import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/login
login = Blueprint('login', __name__)

@login.route('/login', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)
    stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['openid_code'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    if prove_h == get_info['prove']:
        url = 'https://test.com/onLogin'
        data = {
            'code': get_info['openid_code']
        }
        wecharid = requests.post(url=url, data=data)
        wecharid = wecharid.text
        # wecharid.josn()
        if wecharid:
            print('wecharid:  ' + wecharid)
            db = UserCheck()
            flag = db.search(wecharid)
            if flag:
                str2 = 'user' + stamp_h + salt
                table_prove = md5sum(str2)
                print(wecharid)
                datas = {"result": 1, "stamp": stamp_h, "table_prove": table_prove}
                return json.dumps(datas)
            else:
                return json.dumps({"result": 0, "message": "没有该用户！"})

        else:
            return json.dumps({"result": 0, "message": "获取wecharid失败！"})

    else:
        return json.dumps({"result": 0,"message": "你不对劲！你是faker!"})
