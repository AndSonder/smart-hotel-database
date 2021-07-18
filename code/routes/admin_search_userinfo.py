# author:liuyang
# time:2021/7/13
from ..models.get_openid import *
from flask import Blueprint
from flask import request
import requests
import json
from ..models.AdminSearchUserinfo import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/user/admin/super_admin/perinf/get
admin_search_userinfo = Blueprint('admin_search_userinfo', __name__)
"""
传参举例：
{
    "adminCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "resCode":"083Hu7ll2TMK874FU0ol2cPhVk1Hu7ls",
    "stamp":"2020-05-21 18:55:49",
    "prove":"2ca41b85f1002f8202e85064e101c54c"
}
"""

@admin_search_userinfo.route('/user/admin/super_admin/perinf/get', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)

    print(get_info)
    stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['adminCode'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    str2 = 'admin' + stamp_h + salt
    table_prove = md5sum(str2)
    if prove_h == get_info['prove']:

        wecharid = get_wx_user_openid(get_info['adminCode'])

        print(wecharid)
        get_info['wecharid'] = wecharid
        db = AdminSearchinfo()
        data = db.search(wecharid)

        if data == 2:
            datas = {"errcode": 2, "message": "没有该订单", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
        elif data:
            datas = {"errcode": 0, "datalist": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas)
    else:
        return json.dumps({"errcode": 1,"message": "没有该管理员", "stamp": stamp_h, "tableProve": table_prove})
