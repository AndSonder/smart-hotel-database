# author:liuyang
# time:2021/7/18
from ..models.get_openid import *
from flask import Blueprint
from flask import request
import requests
import json
from ..models.RoomRecommend import *
from ..models.MD5 import *
import time
import datetime
#https://www.supremeproger.com/room/roomsinf_boutique/resident/get
better_room_recommend = Blueprint('better_room_recommend', __name__)
@better_room_recommend.route('/room/roomsinf_boutique/resident/get', methods=['POST'])
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
        db = Roomrecommend()
        data = db.search(get_info)
        if data == 2:
            datas = {"errcode": data,  "message": "没有查询到数据", "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
        elif data:
            datas = {"errcode": 0, "dataList ": data, "stamp": stamp_h, "tableProve": table_prove}
            return json.dumps(datas, cls=DateEncoder)
    else:
        return json.dumps({"errcode": 3,"message": "你不对劲！你是faker!", "stamp": stamp_h, "tableProve": table_prove}, cls=DateEncoder)



class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)
