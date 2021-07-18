# author:liuyang
# time:2021/7/13
from ..models.get_openid import *
from flask import Blueprint
from flask import request
import requests
import json
from ..models.ClientSearchInfo import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/user/perinfo/resident/get
client_search_info = Blueprint('client_search_info', __name__)

@client_search_info.route('/user/perinfo/resident/get', methods=['POST'])
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
        db = ClientSearchinfo()
        data = db.search(wecharid)

        if data == 2:
            datas = {"errcode": 2, "message": "没有该订单", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        elif data:
            datas = {"errcode": 0, "datalist": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 3,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove})
