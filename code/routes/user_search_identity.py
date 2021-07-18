# author:liuyang
# time:2021/7/14
from ..models.get_openid import *
from flask import Blueprint
from flask import request
import requests
import json
from ..models.UserSearchIdentity import *
from ..models.MD5 import *
import time
import datetime
#https://www.supremeproger.com/system/identity/user/get
user_search_identity = Blueprint('user_search_identity', __name__)

@user_search_identity.route('/system/identity/user/get', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)

    print(get_info)
    stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['resCode'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    str2 = 'user' + stamp_h + salt
    table_prove = md5sum(str2)
    if prove_h == get_info['prove']:

        wecharid = get_wx_user_openid(get_info['resCode'])

        print(wecharid)
        get_info['wecharid'] = wecharid
        db = ClientSearchIdentity()
        data = db.search(get_info)

        if data == 2:
            datas = {"errcode": data,  "message": "没有查询到数据", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        elif data:
            datas = {"errcode": 0, "datalist": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 3,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove}, cls=DateEncoder)

