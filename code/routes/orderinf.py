# author:liuyang
# time:2021/7/12
from flask import Blueprint
from flask import request
import json
from ..models.search_room_info import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/orderinf
orderinf = Blueprint('orderinf', __name__)

@orderinf.route('/orderinf', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)
    stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['wecharid'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    if prove_h == get_info['prove']:
        db = SearchRoomInfo()
        data  = db.search_room_info(get_info['wecharid'], get_info['room_id'])
        str2 = 'user' + stamp_h + salt
        table_prove = md5sum(str2)
        print(get_info['wecharid'])
        # "id": data['id'], "pmoney": data['pmoney'], "scid": data['scid'], "sgo":data['sgo'], "cid": data['cid'], "go": data['go'], "wecharid": data['wecahid'], "room_id": data['room_id'], "id_status": data['id_status'], "depoist": data['depoist']
        datas = {"result": 1, "data": data, "table_prove":table_prove}
        return json.dumps(datas)
    else:
        return json.dumps({"result": 0,"message": "你不对劲！你是faker!"})
