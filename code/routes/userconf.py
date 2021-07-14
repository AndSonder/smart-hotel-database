# author:liuyang
# time:2021/7/12
from flask import Blueprint
from flask import request
import requests
import json
from ..models.search_user_level import *
from ..models.MD5 import *
import time

#https://www.supremeproger.com/userconf
userconf = Blueprint('userconf', __name__)

@userconf.route('/userconf', methods=['POST'])
def index():
    get_info = request.get_data()
    get_info = json.loads(get_info)
    stamp_h = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
    print(stamp_h)
    str = get_info['wecharid'] + get_info['stamp'] + salt
    print(str)
    prove_h = md5sum(str)
    if prove_h == get_info['prove']:
        db = SearchLevel()
        level = db.search(get_info['wecharid'])
        str2 = 'user' + stamp_h + salt
        table_prove = md5sum(str2)
        print(get_info['wecharid'])
        datas = {"result": 1, "identity": level, "stamp": stamp_h, "table_prove": table_prove}
        return json.dumps(datas)
    else:
        return json.dumps({"result": 0,"message": "你不对劲！你是faker!"})
