# author:liuyang
# time:2021/7/14
from ..models.get_openid import *
from flask import Blueprint
from flask import request
import requests
import json
from ..models.MD5 import *
import time

#https://www.supremeproger.com/server/call_cleaning/resident/post
user_call_cleaning = Blueprint('user_call_cleaning', __name__)

@user_call_cleaning.route('/server/call_cleaning/resident/post', methods=['POST'])
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

        datas = {"errcode": 0, "stamp": stamp_h, "tableProve": table_prove}
        return json.dumps(datas)
    else:
        return json.dumps({"errcode": 4,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove})
"""
传参举例
{
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "roomId":1,
    "stamp":"2020-05-21 18:55:49",
    "prove":"2ca41b85f1002f8202e85064e101c54c"
}
"""