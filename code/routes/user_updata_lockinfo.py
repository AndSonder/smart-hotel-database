# author:liuyang
# time:2021/7/14

from flask import Blueprint
from flask import request
import requests
import json
from ..models.UserUpdateLock import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/hardware/lock/user/push
user_updata_lockinfo = Blueprint('user_updata_lockinfo', __name__)

@user_updata_lockinfo.route('/hardware/lock/user/push', methods=['POST'])
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
        db = UserUpdate()
        flag = db.update(get_info)
        if flag == 0:
            datas = {"errcode": flag, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        else:
            datas = {"errcode": flag, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 4,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove})
