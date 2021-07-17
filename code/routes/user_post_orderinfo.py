# author:liuyang
# time:2021/7/13

from flask import Blueprint
from flask import request
import requests
import json
from ..models.UserPushOrderinfo import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/order/perinfo/resident/post
user_post_orderinfo = Blueprint('user_post_orderinfo', __name__)

@user_post_orderinfo.route('/order/perinfo/resident/post', methods=['POST'])
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
        # url = 'https://test.com/onLogin'
        # data = {
        #     'code': get_info['resCode']
        # }
        # wecharid = requests.post(url=url, data=data)
        # wecharid = wecharid.text
        wecharid = 'wxid_ux57m1gafdh524'

        print(wecharid)
        get_info['wecharid'] = wecharid
        get_info['stamp_h'] = stamp_h
        db = UserPushOrder()
        flag = db.insert(get_info)

        if flag == 1:
            datas = {"errcode": flag, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        elif flag == 2:
            datas = {"errcode": flag, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        else:
            # 此时flag = 0
            datas = {"errcode": flag, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 2, "message": "你不对劲！你是faker！", "stamp": stamp_h, "tableProve": table_prove})
