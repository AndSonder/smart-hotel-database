# author:liuyang
# time:2021/7/13

from flask import Blueprint
from flask import request
import requests
import json
from ..models.AdminSearchOrderinfoDetail import *
from ..models.MD5 import *
import time
import datetime
#https://www.supremeproger.com/order/orderinf/admin/get
admin_search_orderinfo_detail = Blueprint('admin_search_orderinfo_detail', __name__)

@admin_search_orderinfo_detail.route('/order/orderinf/admin/get', methods=['POST'])
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
        # url = 'https://test.com/onLogin'
        # data = {
        #     'code': get_info['resCode']
        # }
        # wecharid = requests.post(url=url, data=data)
        # wecharid = wecharid.text
        wecharid = 'wxid_ux57m1gafdh523'

        print(wecharid)
        get_info['wecharid'] = wecharid
        db = ClientSearchinfo()
        data = db.search(get_info['roomId'])

        if data == 2:
            datas = {"errcode": 2, "message": "没有该订单", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
        else:
            datas = {"errcode": 0, "data ": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
    else:
        return json.dumps({"errcode": 4,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove}, cls=DateEncoder)



class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)


