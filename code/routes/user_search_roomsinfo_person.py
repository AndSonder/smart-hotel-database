# author:liuyang
# time:2021/7/14
from flask import Blueprint
from flask import request
import requests
import json
from ..models.UserSearchPersonRoomsinfo import *
from ..models.MD5 import *
import time
import datetime
#https://www.supremeproger.com/user/resident/per_roomsinf/get
user_search_roomsinfo_person = Blueprint('user_search_roomsinfo_person', __name__)

@user_search_roomsinfo_person.route('/user/resident/per_roomsinf/get', methods=['POST'])
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
        wecharid = 'wxid_ux57m1gafdh523'

        print(wecharid)
        get_info['wecharid'] = wecharid
        db = ClientSearchPersonRoominfo()
        data = db.search(get_info)

        if data:
            datas = {"errcode": 0, "perRoomList ": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
        else:
            datas = {"errcode": 2,  "message": "没有查询到数据", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
    else:
        return json.dumps({"errcode": 3,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove}, cls=DateEncoder)



class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)